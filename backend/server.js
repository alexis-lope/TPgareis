import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import supplierRoutes from "./routes/supplier.routes.js"
import movementRoutes from "./routes/movement.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import { errorHandler } from "./middleware/error.middleware.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/suppliers", supplierRoutes)
app.use("/api/movements", movementRoutes)
app.use("/api/dashboard", dashboardRoutes)

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Sistema de Inventario API funcionando correctamente",
    timestamp: new Date().toISOString(),
  })
})

// Middleware de manejo de errores
app.use(errorHandler)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  console.log(`📊 Ambiente: ${process.env.NODE_ENV}`)
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`)
})
