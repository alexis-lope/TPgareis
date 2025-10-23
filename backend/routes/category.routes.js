import express from "express"
import { body, validationResult } from "express-validator"
import { allQuery, runQuery } from "../config/database.js"
import { authenticate, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

// Obtener todas las categorías
router.get("/", authenticate, async (req, res, next) => {
  try {
    const categorias = await allQuery("SELECT * FROM categorias WHERE activo = 1 ORDER BY nombre ASC")

    res.json({ success: true, data: categorias })
  } catch (error) {
    next(error)
  }
})

// Crear categoría
router.post(
  "/",
  authenticate,
  authorize("admin", "gestor"),
  [body("nombre").trim().notEmpty().withMessage("El nombre es requerido")],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
      }

      const { nombre, descripcion } = req.body

      const result = await runQuery("INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)", [nombre, descripcion])

      res.status(201).json({
        success: true,
        message: "Categoría creada exitosamente",
        data: { id: result.id },
      })
    } catch (error) {
      next(error)
    }
  },
)

// Actualizar categoría
router.put("/:id", authenticate, authorize("admin", "gestor"), async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body

    await runQuery("UPDATE categorias SET nombre = ?, descripcion = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
      nombre,
      descripcion,
      req.params.id,
    ])

    res.json({ success: true, message: "Categoría actualizada exitosamente" })
  } catch (error) {
    next(error)
  }
})

// Eliminar categoría
router.delete("/:id", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    await runQuery("UPDATE categorias SET activo = 0 WHERE id = ?", [req.params.id])
    res.json({ success: true, message: "Categoría eliminada exitosamente" })
  } catch (error) {
    next(error)
  }
})

export default router
