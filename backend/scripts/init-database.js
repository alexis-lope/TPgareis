import { runQuery } from "../config/database.js"
import bcrypt from "bcryptjs"

const initDatabase = async () => {
  try {
    console.log("🔧 Inicializando base de datos...")

    // Tabla de Roles
    await runQuery(`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50) UNIQUE NOT NULL,
        descripcion TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de Usuarios
    await runQuery(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol_id INTEGER NOT NULL,
        activo BOOLEAN DEFAULT 1,
        reset_token VARCHAR(255),
        reset_token_expiry DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (rol_id) REFERENCES roles(id)
      )
    `)

    // Tabla de Categorías
    await runQuery(`
      CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        activo BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de Proveedores
    await runQuery(`
      CREATE TABLE IF NOT EXISTS proveedores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        contacto VARCHAR(100),
        telefono VARCHAR(20),
        email VARCHAR(100),
        direccion TEXT,
        activo BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de Productos
    await runQuery(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(50) UNIQUE NOT NULL,
        nombre VARCHAR(200) NOT NULL,
        descripcion TEXT,
        categoria_id INTEGER,
        proveedor_id INTEGER,
        precio_compra DECIMAL(10,2) NOT NULL,
        precio_venta DECIMAL(10,2) NOT NULL,
        stock_actual INTEGER DEFAULT 0,
        stock_minimo INTEGER DEFAULT 10,
        unidad_medida VARCHAR(20) DEFAULT 'unidad',
        activo BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id),
        FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
      )
    `)

    // Tabla de Movimientos de Inventario
    await runQuery(`
      CREATE TABLE IF NOT EXISTS movimientos_inventario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        producto_id INTEGER NOT NULL,
        tipo_movimiento VARCHAR(20) NOT NULL CHECK(tipo_movimiento IN ('entrada', 'salida', 'ajuste')),
        cantidad INTEGER NOT NULL,
        motivo TEXT,
        usuario_id INTEGER NOT NULL,
        stock_anterior INTEGER NOT NULL,
        stock_nuevo INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (producto_id) REFERENCES productos(id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `)

    // Tabla de Alertas
    await runQuery(`
      CREATE TABLE IF NOT EXISTS alertas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        producto_id INTEGER NOT NULL,
        tipo_alerta VARCHAR(50) NOT NULL,
        mensaje TEXT NOT NULL,
        leida BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (producto_id) REFERENCES productos(id)
      )
    `)

    console.log("✅ Tablas creadas exitosamente")

    // Insertar roles por defecto
    const roles = [
      { nombre: "admin", descripcion: "Administrador con acceso completo" },
      { nombre: "gestor", descripcion: "Gestor con acceso limitado al inventario" },
      { nombre: "usuario", descripcion: "Usuario estándar con acceso de solo lectura" },
    ]

    for (const rol of roles) {
      await runQuery("INSERT OR IGNORE INTO roles (nombre, descripcion) VALUES (?, ?)", [rol.nombre, rol.descripcion])
    }

    console.log("✅ Roles insertados")

    // Crear usuario administrador por defecto
    const hashedPassword = await bcrypt.hash("admin123", 10)
    await runQuery(
      `INSERT OR IGNORE INTO usuarios (nombre, email, password, rol_id) 
       VALUES (?, ?, ?, (SELECT id FROM roles WHERE nombre = 'admin'))`,
      ["Administrador", "admin@inventario.com", hashedPassword],
    )

    console.log("✅ Usuario administrador creado")
    console.log("📧 Email: admin@inventario.com")
    console.log("🔑 Password: admin123")

    // Insertar categorías de ejemplo
    const categorias = [
      { nombre: "Electrónica", descripcion: "Productos electrónicos y tecnología" },
      { nombre: "Alimentos", descripcion: "Productos alimenticios" },
      { nombre: "Ropa", descripcion: "Vestimenta y accesorios" },
      { nombre: "Hogar", descripcion: "Artículos para el hogar" },
    ]

    for (const cat of categorias) {
      await runQuery("INSERT OR IGNORE INTO categorias (nombre, descripcion) VALUES (?, ?)", [
        cat.nombre,
        cat.descripcion,
      ])
    }

    console.log("✅ Categorías de ejemplo insertadas")

    // Insertar proveedores de ejemplo
    const proveedores = [
      { nombre: "Proveedor Tech SA", contacto: "Juan Pérez", telefono: "1234567890", email: "contacto@tech.com" },
      {
        nombre: "Distribuidora Central",
        contacto: "María García",
        telefono: "0987654321",
        email: "ventas@central.com",
      },
    ]

    for (const prov of proveedores) {
      await runQuery("INSERT OR IGNORE INTO proveedores (nombre, contacto, telefono, email) VALUES (?, ?, ?, ?)", [
        prov.nombre,
        prov.contacto,
        prov.telefono,
        prov.email,
      ])
    }

    console.log("✅ Proveedores de ejemplo insertados")

    console.log("🎉 Base de datos inicializada correctamente")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error)
    process.exit(1)
  }
}

initDatabase()
