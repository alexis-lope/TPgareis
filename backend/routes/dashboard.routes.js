import express from "express"
import { getQuery, allQuery, runQuery } from "../config/database.js"
import { authenticate } from "../middleware/auth.middleware.js"

const router = express.Router()

// Obtener estadísticas del dashboard
router.get("/stats", authenticate, async (req, res, next) => {
  try {
    const totalProductos = await getQuery("SELECT COUNT(*) as total FROM productos WHERE activo = 1")

    const totalCategorias = await getQuery("SELECT COUNT(*) as total FROM categorias WHERE activo = 1")

    const totalProveedores = await getQuery("SELECT COUNT(*) as total FROM proveedores WHERE activo = 1")

    const productosStockBajo = await getQuery(
      "SELECT COUNT(*) as total FROM productos WHERE activo = 1 AND stock_actual <= stock_minimo",
    )

    const valorInventario = await getQuery(
      "SELECT SUM(stock_actual * precio_compra) as total FROM productos WHERE activo = 1",
    )

    const alertasNoLeidas = await getQuery("SELECT COUNT(*) as total FROM alertas WHERE leida = 0")

    res.json({
      success: true,
      data: {
        totalProductos: totalProductos.total,
        totalCategorias: totalCategorias.total,
        totalProveedores: totalProveedores.total,
        productosStockBajo: productosStockBajo.total,
        valorInventario: valorInventario.total || 0,
        alertasNoLeidas: alertasNoLeidas.total,
      },
    })
  } catch (error) {
    next(error)
  }
})

// Obtener productos más vendidos (últimos 30 días)
router.get("/top-products", authenticate, async (req, res, next) => {
  try {
    const productos = await allQuery(
      `SELECT p.nombre, p.codigo, SUM(m.cantidad) as total_salidas
       FROM movimientos_inventario m
       JOIN productos p ON m.producto_id = p.id
       WHERE m.tipo_movimiento = 'salida' 
       AND m.created_at >= datetime('now', '-30 days')
       GROUP BY p.id
       ORDER BY total_salidas DESC
       LIMIT 5`,
    )

    res.json({ success: true, data: productos })
  } catch (error) {
    next(error)
  }
})

// Obtener movimientos recientes
router.get("/recent-movements", authenticate, async (req, res, next) => {
  try {
    const movimientos = await allQuery(
      `SELECT m.*, p.nombre as producto_nombre, u.nombre as usuario_nombre
       FROM movimientos_inventario m
       JOIN productos p ON m.producto_id = p.id
       JOIN usuarios u ON m.usuario_id = u.id
       ORDER BY m.created_at DESC
       LIMIT 10`,
    )

    res.json({ success: true, data: movimientos })
  } catch (error) {
    next(error)
  }
})

// Obtener alertas
router.get("/alerts", authenticate, async (req, res, next) => {
  try {
    const alertas = await allQuery(
      `SELECT a.*, p.nombre as producto_nombre, p.codigo as producto_codigo
       FROM alertas a
       JOIN productos p ON a.producto_id = p.id
       WHERE a.leida = 0
       ORDER BY a.created_at DESC
       LIMIT 20`,
    )

    res.json({ success: true, data: alertas })
  } catch (error) {
    next(error)
  }
})

// Marcar alerta como leída
router.put("/alerts/:id/read", authenticate, async (req, res, next) => {
  try {
    await runQuery("UPDATE alertas SET leida = 1 WHERE id = ?", [req.params.id])
    res.json({ success: true, message: "Alerta marcada como leída" })
  } catch (error) {
    next(error)
  }
})

// Obtener datos para gráficos
router.get("/charts/stock-by-category", authenticate, async (req, res, next) => {
  try {
    const data = await allQuery(
      `SELECT c.nombre as categoria, COUNT(p.id) as cantidad, SUM(p.stock_actual) as stock_total
       FROM categorias c
       LEFT JOIN productos p ON c.id = p.categoria_id AND p.activo = 1
       WHERE c.activo = 1
       GROUP BY c.id
       ORDER BY stock_total DESC`,
    )

    res.json({ success: true, data })
  } catch (error) {
    next(error)
  }
})

router.get("/charts/movements-trend", authenticate, async (req, res, next) => {
  try {
    const data = await allQuery(
      `SELECT 
         DATE(created_at) as fecha,
         tipo_movimiento,
         COUNT(*) as cantidad
       FROM movimientos_inventario
       WHERE created_at >= datetime('now', '-30 days')
       GROUP BY DATE(created_at), tipo_movimiento
       ORDER BY fecha DESC`,
    )

    res.json({ success: true, data })
  } catch (error) {
    next(error)
  }
})

export default router
