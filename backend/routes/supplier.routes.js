import express from "express"
import { body, validationResult } from "express-validator"
import { allQuery, runQuery } from "../config/database.js"
import { authenticate, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

// Obtener todos los proveedores
router.get("/", authenticate, async (req, res, next) => {
  try {
    const proveedores = await allQuery("SELECT * FROM proveedores WHERE activo = 1 ORDER BY nombre ASC")

    res.json({ success: true, data: proveedores })
  } catch (error) {
    next(error)
  }
})

// Crear proveedor
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

      const { nombre, contacto, telefono, email, direccion } = req.body

      const result = await runQuery(
        "INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)",
        [nombre, contacto, telefono, email, direccion],
      )

      res.status(201).json({
        success: true,
        message: "Proveedor creado exitosamente",
        data: { id: result.id },
      })
    } catch (error) {
      next(error)
    }
  },
)

// Actualizar proveedor
router.put("/:id", authenticate, authorize("admin", "gestor"), async (req, res, next) => {
  try {
    const { nombre, contacto, telefono, email, direccion } = req.body

    await runQuery(
      `UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, email = ?, 
         direccion = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [nombre, contacto, telefono, email, direccion, req.params.id],
    )

    res.json({ success: true, message: "Proveedor actualizado exitosamente" })
  } catch (error) {
    next(error)
  }
})

// Eliminar proveedor
router.delete("/:id", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    await runQuery("UPDATE proveedores SET activo = 0 WHERE id = ?", [req.params.id])
    res.json({ success: true, message: "Proveedor eliminado exitosamente" })
  } catch (error) {
    next(error)
  }
})

export default router
