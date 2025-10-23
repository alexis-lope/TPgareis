import express from "express"
import bcrypt from "bcryptjs"
import { body, validationResult } from "express-validator"
import { getQuery, allQuery, runQuery } from "../config/database.js"
import { authenticate, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

// Obtener todos los usuarios (solo admin)
router.get("/", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    const usuarios = await allQuery(
      `SELECT u.id, u.nombre, u.email, u.activo, r.nombre as rol, u.created_at
         FROM usuarios u
         JOIN roles r ON u.rol_id = r.id
         ORDER BY u.created_at DESC`,
    )

    res.json({ success: true, data: usuarios })
  } catch (error) {
    next(error)
  }
})

// Obtener perfil del usuario actual
router.get("/profile", authenticate, async (req, res, next) => {
  try {
    const user = await getQuery(
      `SELECT u.id, u.nombre, u.email, u.activo, r.nombre as rol, u.created_at
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.id = ?`,
      [req.user.id],
    )

    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
})

// Actualizar usuario (solo admin)
router.put("/:id", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    const { nombre, email, rol_id, activo } = req.body

    await runQuery("UPDATE usuarios SET nombre = ?, email = ?, rol_id = ?, activo = ? WHERE id = ?", [
      nombre,
      email,
      rol_id,
      activo,
      req.params.id,
    ])

    res.json({ success: true, message: "Usuario actualizado exitosamente" })
  } catch (error) {
    next(error)
  }
})

// Cambiar contraseña
router.put(
  "/change-password",
  authenticate,
  [
    body("currentPassword").notEmpty().withMessage("Contraseña actual requerida"),
    body("newPassword").isLength({ min: 6 }).withMessage("La nueva contraseña debe tener al menos 6 caracteres"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
      }

      const { currentPassword, newPassword } = req.body

      const user = await getQuery("SELECT password FROM usuarios WHERE id = ?", [req.user.id])

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: "Contraseña actual incorrecta" })
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)

      await runQuery("UPDATE usuarios SET password = ? WHERE id = ?", [hashedPassword, req.user.id])

      res.json({ success: true, message: "Contraseña actualizada exitosamente" })
    } catch (error) {
      next(error)
    }
  },
)

// Obtener roles disponibles
router.get("/roles", authenticate, async (req, res, next) => {
  try {
    const roles = await allQuery("SELECT * FROM roles ORDER BY nombre")
    res.json({ success: true, data: roles })
  } catch (error) {
    next(error)
  }
})

export default router
