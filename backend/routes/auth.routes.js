import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { body, validationResult } from "express-validator"
import { getQuery, runQuery } from "../config/database.js"
import { sendPasswordResetEmail } from "../utils/email.service.js"

const router = express.Router()

// Registro de usuario
router.post(
  "/register",
  [
    body("nombre").trim().notEmpty().withMessage("El nombre es requerido"),
    body("email").isEmail().withMessage("Email inválido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
      }

      const { nombre, email, password } = req.body

      const existingUser = await getQuery("SELECT id FROM usuarios WHERE email = ?", [email])
      if (existingUser) {
        return res.status(400).json({ success: false, message: "El email ya está registrado" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const usuarioRole = await getQuery("SELECT id FROM roles WHERE nombre = ?", ["usuario"])

      const result = await runQuery("INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)", [
        nombre,
        email,
        hashedPassword,
        usuarioRole.id,
      ])

      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        userId: result.id,
      })
    } catch (error) {
      next(error)
    }
  },
)

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("password").notEmpty().withMessage("La contraseña es requerida"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
      }

      const { email, password } = req.body

      const user = await getQuery(
        `SELECT u.id, u.nombre, u.email, u.password, u.activo, r.nombre as rol
         FROM usuarios u
         JOIN roles r ON u.rol_id = r.id
         WHERE u.email = ?`,
        [email],
      )

      if (!user || !user.activo) {
        return res.status(401).json({ success: false, message: "Credenciales inválidas" })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Credenciales inválidas" })
      }

      const token = jwt.sign(
  { id: user.id, email: user.email, rol: user.rol },
  process.env.JWT_SECRET || "clave_temporal_segura",
  {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  }
)

      res.json({
        success: true,
        message: "Login exitoso",
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
      })
    } catch (error) {
      next(error)
    }
  },
)

// Solicitar recuperación de contraseña
router.post("/forgot-password", [body("email").isEmail().withMessage("Email inválido")], async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { email } = req.body
    const user = await getQuery("SELECT id, email FROM usuarios WHERE email = ?", [email])

    if (!user) {
      return res.json({ success: true, message: "Si el email existe, recibirás instrucciones" })
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hora

    await runQuery("UPDATE usuarios SET reset_token = ?, reset_token_expiry = ? WHERE id = ?", [
      resetToken,
      resetTokenExpiry.toISOString(),
      user.id,
    ])

    await sendPasswordResetEmail(user.email, resetToken)

    res.json({ success: true, message: "Si el email existe, recibirás instrucciones" })
  } catch (error) {
    next(error)
  }
})

// Restablecer contraseña
router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Token requerido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
      }

      const { token, password } = req.body

      const user = await getQuery(
        'SELECT id FROM usuarios WHERE reset_token = ? AND reset_token_expiry > datetime("now")',
        [token],
      )

      if (!user) {
        return res.status(400).json({ success: false, message: "Token inválido o expirado" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await runQuery("UPDATE usuarios SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?", [
        hashedPassword,
        user.id,
      ])

      res.json({ success: true, message: "Contraseña restablecida exitosamente" })
    } catch (error) {
      next(error)
    }
  },
)

export default router
