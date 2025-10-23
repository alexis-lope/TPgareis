import express from "express"
import { body, validationResult } from "express-validator"
import { getQuery, allQuery, runQuery } from "../config/database.js"
import { authenticate, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

// Obtener todos los productos con paginación y filtros
router.get("/", authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "", categoria = "", orderBy = "nombre", order = "ASC" } = req.query

    const offset = (page - 1) * limit
    let whereClause = "WHERE p.activo = 1"
    const params = []

    if (search) {
      whereClause += " AND (p.nombre LIKE ? OR p.codigo LIKE ?)"
      params.push(`%${search}%`, `%${search}%`)
    }

    if (categoria) {
      whereClause += " AND p.categoria_id = ?"
      params.push(categoria)
    }

    const validOrderBy = ["nombre", "codigo", "precio_venta", "stock_actual"]
    const validOrder = ["ASC", "DESC"]
    const safeOrderBy = validOrderBy.includes(orderBy) ? orderBy : "nombre"
    const safeOrder = validOrder.includes(order.toUpperCase()) ? order.toUpperCase() : "ASC"

    const productos = await allQuery(
      `SELECT p.*, c.nombre as categoria_nombre, pr.nombre as proveedor_nombre
       FROM productos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
       ${whereClause}
       ORDER BY p.${safeOrderBy} ${safeOrder}
       LIMIT ? OFFSET ?`,
      [...params, Number.parseInt(limit), offset],
    )

    const totalResult = await getQuery(`SELECT COUNT(*) as total FROM productos p ${whereClause}`, params)

    res.json({
      success: true,
      data: productos,
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

// Obtener producto por ID
router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const producto = await getQuery(
      `SELECT p.*, c.nombre as categoria_nombre, pr.nombre as proveedor_nombre
       FROM productos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
       WHERE p.id = ?`,
      [req.params.id],
    )

    if (!producto) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" })
    }

    res.json({ success: true, data: producto })
  } catch (error) {
    next(error)
  }
})

// Crear producto
router.post(
  "/",
  authenticate,
  authorize("admin", "gestor"),
  [
    body("codigo").trim().notEmpty().withMessage("El código es requerido"),
    body("nombre").trim().notEmpty().withMessage("El nombre es requerido"),
    body("precio_compra").isFloat({ min: 0 }).withMessage("Precio de compra inválido"),
    body("precio_venta").isFloat({ min: 0 }).withMessage("Precio de venta inválido"),
    body("stock_minimo").isInt({ min: 0 }).withMessage("Stock mínimo inválido"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
      }

      const {
        codigo,
        nombre,
        descripcion,
        categoria_id,
        proveedor_id,
        precio_compra,
        precio_venta,
        stock_actual = 0,
        stock_minimo,
        unidad_medida,
      } = req.body

      const existingProduct = await getQuery("SELECT id FROM productos WHERE codigo = ?", [codigo])
      if (existingProduct) {
        return res.status(400).json({ success: false, message: "El código ya existe" })
      }

      const result = await runQuery(
        `INSERT INTO productos (codigo, nombre, descripcion, categoria_id, proveedor_id, 
         precio_compra, precio_venta, stock_actual, stock_minimo, unidad_medida)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          codigo,
          nombre,
          descripcion,
          categoria_id,
          proveedor_id,
          precio_compra,
          precio_venta,
          stock_actual,
          stock_minimo,
          unidad_medida,
        ],
      )

      res.status(201).json({
        success: true,
        message: "Producto creado exitosamente",
        data: { id: result.id },
      })
    } catch (error) {
      next(error)
    }
  },
)

// Actualizar producto
router.put("/:id", authenticate, authorize("admin", "gestor"), async (req, res, next) => {
  try {
    const {
      nombre,
      descripcion,
      categoria_id,
      proveedor_id,
      precio_compra,
      precio_venta,
      stock_minimo,
      unidad_medida,
    } = req.body

    const producto = await getQuery("SELECT id FROM productos WHERE id = ?", [req.params.id])
    if (!producto) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" })
    }

    await runQuery(
      `UPDATE productos SET nombre = ?, descripcion = ?, categoria_id = ?, proveedor_id = ?,
         precio_compra = ?, precio_venta = ?, stock_minimo = ?, unidad_medida = ?, 
         updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
      [
        nombre,
        descripcion,
        categoria_id,
        proveedor_id,
        precio_compra,
        precio_venta,
        stock_minimo,
        unidad_medida,
        req.params.id,
      ],
    )

    res.json({ success: true, message: "Producto actualizado exitosamente" })
  } catch (error) {
    next(error)
  }
})

// Eliminar producto (soft delete)
router.delete("/:id", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    const producto = await getQuery("SELECT id FROM productos WHERE id = ?", [req.params.id])
    if (!producto) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" })
    }

    await runQuery("UPDATE productos SET activo = 0 WHERE id = ?", [req.params.id])

    res.json({ success: true, message: "Producto eliminado exitosamente" })
  } catch (error) {
    next(error)
  }
})

// Obtener productos con stock bajo
router.get("/alerts/low-stock", authenticate, async (req, res, next) => {
  try {
    const productos = await allQuery(
      `SELECT p.*, c.nombre as categoria_nombre
       FROM productos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.activo = 1 AND p.stock_actual <= p.stock_minimo
       ORDER BY p.stock_actual ASC`,
    )

    res.json({ success: true, data: productos })
  } catch (error) {
    next(error)
  }
})

export default router
