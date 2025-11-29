import express from "express"
import { body, validationResult } from "express-validator"
import { getQuery, allQuery, runQuery } from "../config/database.js"
import { authenticate, authorize } from "../middleware/auth.middleware.js"
import { notifyAdminsStockBajo } from "../utils/email.service.js"

const router = express.Router()

// Obtener movimientos con paginación
router.get("/", authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, producto_id = "" } = req.query
    const offset = (page - 1) * limit

    let whereClause = "WHERE 1=1"
    const params = []

    if (producto_id) {
      whereClause += " AND m.producto_id = ?"
      params.push(producto_id)
    }

    const movimientos = await allQuery(
      `SELECT m.*, p.nombre as producto_nombre, p.codigo as producto_codigo,
       u.nombre as usuario_nombre
       FROM movimientos_inventario m
       JOIN productos p ON m.producto_id = p.id
       JOIN usuarios u ON m.usuario_id = u.id
       ${whereClause}
       ORDER BY m.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, Number.parseInt(limit), offset],
    )

    const totalResult = await getQuery(
      `SELECT COUNT(*) as total FROM movimientos_inventario m ${whereClause}`,
      params
    )

    res.json({
      success: true,
      data: movimientos,
      pagination: {
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        total: totalResult.total,
        totalPages: Math.ceil(totalResult.total / limit),
      },
    })
  } catch (error) {
    next(error)
  }
})

// Registrar movimiento de inventario
router.post(
  "/",
  authenticate,
  authorize("admin", "gestor"),
  [
    body("producto_id").isInt().withMessage("ID de producto inválido"),
    body("tipo_movimiento").isIn(["entrada", "salida", "ajuste"]).withMessage("Tipo de movimiento inválido"),
    body("cantidad").isInt({ min: 1 }).withMessage("Cantidad inválida"),
    body("motivo").trim().notEmpty().withMessage("El motivo es requerido"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
      }

      const { producto_id, tipo_movimiento, cantidad, motivo } = req.body

      const producto = await getQuery(
        "SELECT nombre, stock_actual, stock_minimo FROM productos WHERE id = ?",
        [producto_id]
      )

      if (!producto) {
        return res.status(404).json({ success: false, message: "Producto no encontrado" })
      }

      let stockActual = Number(producto.stock_actual)
      let cantidadNum = Number(cantidad)
      let nuevoStock = stockActual

      if (tipo_movimiento === "entrada") {
        nuevoStock += cantidadNum
      } else if (tipo_movimiento === "salida") {
        if (producto.stock_actual < cantidad) {
          return res.status(400).json({
            success: false,
            message: "Stock insuficiente para realizar la salida",
          })
        }
        nuevoStock -= cantidad
      } else if (tipo_movimiento === "ajuste") {
        nuevoStock = cantidad
      }

      await runQuery(
        `INSERT INTO movimientos_inventario 
         (producto_id, tipo_movimiento, cantidad, motivo, usuario_id, stock_anterior, stock_nuevo)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [producto_id, tipo_movimiento, cantidad, motivo, req.user.id, producto.stock_actual, nuevoStock]
      )

      await runQuery(
        "UPDATE productos SET stock_actual = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [nuevoStock, producto_id]
      )

      // ========================================================
      // 🔥 DETECTAR STOCK BAJO Y ENVIAR ALERTA Y EMAIL
      // ========================================================
      if (nuevoStock <= producto.stock_minimo) {

        // Guardar alerta
        await runQuery(
          `INSERT INTO alertas (producto_id, tipo_alerta, mensaje)
           VALUES (?, 'stock_bajo', ?)`,
          [
            producto_id,
            `El stock del producto '${producto.nombre}' está por debajo del mínimo (${nuevoStock}/${producto.stock_minimo})`
          ]
        )

        // Obtener emails de todos los usuarios
        const usuarios = await allQuery("SELECT email FROM usuarios")
        const emails = usuarios.map(u => u.email)

        // Enviar email masivo
        await notifyAdminsStockBajo(emails, producto.nombre, nuevoStock, producto.stock_minimo)
      }

      res.status(201).json({
        success: true,
        message: "Movimiento registrado exitosamente",
        data: { stock_anterior: producto.stock_actual, stock_nuevo: nuevoStock },
      })
    } catch (error) {
      next(error)
    }
  },
)

export default router