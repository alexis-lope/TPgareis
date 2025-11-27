import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import nodemailer from "nodemailer"
import { allQuery } from "../config/database.js"   // 🔥 FALTABA ESTO

// ---------------------------------------------
// 🔹 Cargar archivo .env desde la raíz
// ---------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
  path: path.join(__dirname, "../.env"),
})

// ---------------------------------------------
// 🔹 DEBUG ENV
// ---------------------------------------------
console.log("🔍 CONFIG SMTP:")
console.log("HOST:", process.env.EMAIL_HOST)
console.log("PORT:", process.env.EMAIL_PORT)
console.log("USER:", process.env.EMAIL_USER)
console.log("PASS:", process.env.EMAIL_PASSWORD ? "CARGADA" : "VACÍA")

// ---------------------------------------------
// 🔹 Nodemailer Transporter
// ---------------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// ---------------------------------------------
// 🔹 Enviar email genérico
// ---------------------------------------------
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    })

    console.log("📩 Email enviado a:", to)
    return { success: true }
  } catch (error) {
    console.error("❌ ERROR enviando email:", error)
    return { success: false, error }
  }
}

// ==============================================
// 🔹 Recuperación de contraseña (NO TOCADO)
// ==============================================
export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

  const html = `
  <div style="
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    padding: 35px 30px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  ">

    <h2 style="
      color: #111827;
      font-size: 26px;
      margin-bottom: 15px;
      text-align: center;
      font-weight: 700;
    ">
      🔐 Recuperación de Contraseña
    </h2>

    <p style="color: #374151; font-size: 15px; line-height: 1.6;">
      Haz clic en el siguiente botón para crear una nueva contraseña:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetUrl}" style="
        background: linear-gradient(90deg, #2563eb, #1d4ed8);
        color: #ffffff;
        padding: 14px 28px;
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        border-radius: 8px;
        display: inline-block;
        box-shadow: 0 3px 10px rgba(37, 99, 235, 0.3);
      ">
        Restablecer Contraseña
      </a>
    </div>

    <p style="color: #6b7280; font-size: 14px;">
      Este enlace expirará en <strong>1 hora</strong>.
    </p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

    <p style="text-align: center; color: #9ca3af; font-size: 12px;">
      © ${new Date().getFullYear()} Sistema de Inventario  
    </p>
  </div>
  `

  return sendEmail({
    to: email,
    subject: "Recuperación de Contraseña",
    html,
  })
}

// ==============================================
// 🔹 Email de stock bajo con MISMO DISEÑO
// ==============================================
export const sendStockAlertEmail = async (email, producto, stock, minimo) => {
  const html = `
  <div style="
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    padding: 35px 30px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  ">

    <h2 style="
      color: #b91c1c;
      font-size: 26px;
      margin-bottom: 15px;
      text-align: center;
      font-weight: 700;
    ">
      ⚠️ ALERTA DE STOCK BAJO
    </h2>

    <p style="color: #374151; font-size: 15px; line-height: 1.6;">
      El siguiente producto se encuentra por debajo del nivel mínimo permitido:
    </p>

    <div style="
      background: #f8d7da;
      padding: 20px;
      border-radius: 10px;
      border-left: 6px solid #dc2626;
      margin: 25px 0;
    ">
      <p><strong>Producto:</strong> ${producto}</p>
      <p><strong>Stock Actual:</strong> ${stock}</p>
      <p><strong>Stock Mínimo:</strong> ${minimo}</p>
    </div>

    <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
      Por favor, repón el stock lo antes posible.
    </p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

    <p style="text-align: center; color: #9ca3af; font-size: 12px;">
      © ${new Date().getFullYear()} Sistema de Inventario  
    </p>
  </div>`

  return sendEmail({
    to: email,
    subject: `⚠️ Stock Bajo - ${producto}`,
    html,
  })
}

// ==============================================
// 🔥 Notificar a TODOS los admins
// ==============================================
export const notifyAdminsStockBajo = async (producto, stock, minimo) => {
  try {
    const admins = await allQuery(`
      SELECT u.email 
      FROM usuarios u
      JOIN roles r ON u.rol_id = r.id
      WHERE r.nombre = 'admin'
    `)

    if (!admins || admins.length === 0) {
      console.log("⚠️ No hay administradores para notificar.")
      return
    }

    console.log("📨 Enviando alerta de stock bajo a:", admins)

    for (const admin of admins) {
      if (!admin.email) continue
      await sendStockAlertEmail(admin.email, producto, stock, minimo)
    }

  } catch (error) {
    console.error("❌ Error enviando notificaciones a admins:", error)
  }
}
