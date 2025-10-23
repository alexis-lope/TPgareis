import jwt from "jsonwebtoken"
import { getQuery } from "../config/database.js"

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token no proporcionado",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await getQuery(
      `SELECT u.id, u.nombre, u.email, u.activo, r.nombre as rol
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.id = ?`,
      [decoded.id],
    )

    if (!user || !user.activo) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autorizado",
      })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    })
  }
}

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "No autenticado",
      })
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para realizar esta acción",
      })
    }

    next()
  }
}
