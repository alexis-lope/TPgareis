import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    })

    console.log("✅ Email enviado:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Error al enviar email:", error)
    throw error
  }
}

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Recuperación de Contraseña</h2>
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        Restablecer Contraseña
      </a>
      <p style="margin-top: 20px; color: #666;">Este enlace expirará en 1 hora.</p>
      <p style="color: #666;">Si no solicitaste este cambio, ignora este correo.</p>
    </div>
  `

  return sendEmail({
    to: email,
    subject: "Recuperación de Contraseña - Sistema de Inventario",
    html,
  })
}

export const sendStockAlertEmail = async (adminEmail, producto) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc3545;">⚠️ Alerta de Stock Bajo</h2>
      <p>El siguiente producto tiene stock bajo:</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Producto:</strong> ${producto.nombre}</p>
        <p><strong>Código:</strong> ${producto.codigo}</p>
        <p><strong>Stock Actual:</strong> ${producto.stock_actual}</p>
        <p><strong>Stock Mínimo:</strong> ${producto.stock_minimo}</p>
      </div>
      <p style="color: #666;">Por favor, considera realizar un pedido al proveedor.</p>
    </div>
  `

  return sendEmail({
    to: adminEmail,
    subject: `⚠️ Alerta: Stock Bajo - ${producto.nombre}`,
    html,
  })
}
