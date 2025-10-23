# Backend - Sistema de Inventario

Backend desarrollado con Node.js, Express y SQLite3 para el Sistema de Inventario.

## 🚀 Características

- **Autenticación JWT**: Login, registro y recuperación de contraseña
- **Roles y Permisos**: Admin, Gestor y Usuario con diferentes niveles de acceso
- **CRUD Completo**: Productos, Categorías, Proveedores, Usuarios
- **Gestión de Inventario**: Movimientos de entrada, salida y ajustes
- **Alertas Automáticas**: Notificaciones de stock bajo
- **Dashboard**: Estadísticas y gráficos del inventario
- **Envío de Emails**: Recuperación de contraseña y alertas
- **Paginación y Filtros**: En todas las consultas de listados

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🔧 Instalación

1. Navegar a la carpeta backend:
\`\`\`bash
cd backend
\`\`\`

2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configurar variables de entorno:
\`\`\`bash
cp .env.example .env
\`\`\`

Editar el archivo `.env` con tus configuraciones.

4. Inicializar la base de datos:
\`\`\`bash
npm run init-db
\`\`\`

Esto creará:
- Todas las tablas necesarias
- Roles por defecto (admin, gestor, usuario)
- Usuario administrador: `admin@inventario.com` / `admin123`
- Categorías y proveedores de ejemplo

5. Iniciar el servidor:
\`\`\`bash
npm run dev
\`\`\`

El servidor estará disponible en `http://localhost:5000`

## 📊 Estructura de la Base de Datos

### Tablas Principales:

1. **roles**: Roles del sistema (admin, gestor, usuario)
2. **usuarios**: Usuarios del sistema con autenticación
3. **categorias**: Categorías de productos
4. **proveedores**: Proveedores de productos
5. **productos**: Productos del inventario
6. **movimientos_inventario**: Historial de movimientos (entrada/salida/ajuste)
7. **alertas**: Alertas de stock bajo y otras notificaciones

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación.

### Endpoints de Autenticación:

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/forgot-password` - Solicitar recuperación de contraseña
- `POST /api/auth/reset-password` - Restablecer contraseña

### Uso del Token:

Incluir el token en el header de las peticiones:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## 📡 API Endpoints

### Productos
- `GET /api/products` - Listar productos (con paginación y filtros)
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto (admin/gestor)
- `PUT /api/products/:id` - Actualizar producto (admin/gestor)
- `DELETE /api/products/:id` - Eliminar producto (admin)
- `GET /api/products/alerts/low-stock` - Productos con stock bajo

### Categorías
- `GET /api/categories` - Listar categorías
- `POST /api/categories` - Crear categoría (admin/gestor)
- `PUT /api/categories/:id` - Actualizar categoría (admin/gestor)
- `DELETE /api/categories/:id` - Eliminar categoría (admin)

### Proveedores
- `GET /api/suppliers` - Listar proveedores
- `POST /api/suppliers` - Crear proveedor (admin/gestor)
- `PUT /api/suppliers/:id` - Actualizar proveedor (admin/gestor)
- `DELETE /api/suppliers/:id` - Eliminar proveedor (admin)

### Movimientos
- `GET /api/movements` - Listar movimientos
- `POST /api/movements` - Registrar movimiento (admin/gestor)

### Usuarios
- `GET /api/users` - Listar usuarios (admin)
- `GET /api/users/profile` - Perfil del usuario actual
- `PUT /api/users/:id` - Actualizar usuario (admin)
- `PUT /api/users/change-password` - Cambiar contraseña
- `GET /api/users/roles` - Listar roles disponibles

### Dashboard
- `GET /api/dashboard/stats` - Estadísticas generales
- `GET /api/dashboard/top-products` - Productos más vendidos
- `GET /api/dashboard/recent-movements` - Movimientos recientes
- `GET /api/dashboard/alerts` - Alertas activas
- `PUT /api/dashboard/alerts/:id/read` - Marcar alerta como leída
- `GET /api/dashboard/charts/stock-by-category` - Datos para gráfico de stock por categoría
- `GET /api/dashboard/charts/movements-trend` - Tendencia de movimientos

## 👥 Roles y Permisos

### Admin
- Acceso completo a todas las funcionalidades
- Gestión de usuarios y roles
- Eliminación de registros

### Gestor
- CRUD de productos, categorías y proveedores
- Registro de movimientos de inventario
- Visualización de reportes

### Usuario
- Solo lectura de productos y categorías
- Visualización de su perfil

## 📧 Configuración de Email

Para habilitar el envío de emails, configurar en `.env`:

\`\`\`env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_password_de_aplicacion
\`\`\`

**Nota**: Para Gmail, necesitas generar una "Contraseña de aplicación" en la configuración de seguridad de tu cuenta.

## 🛠️ Scripts Disponibles

- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo con auto-reload
- `npm run init-db` - Inicializar/resetear base de datos

## 📝 Notas Importantes

1. **Seguridad**: Cambiar `JWT_SECRET` en producción
2. **Base de Datos**: El archivo SQLite se crea en `backend/database/inventario.db`
3. **CORS**: Configurado para aceptar peticiones desde `http://localhost:5173` (frontend)
4. **Validación**: Todos los endpoints tienen validación de datos con express-validator

## 🐛 Troubleshooting

### Error de conexión a la base de datos
- Verificar que la carpeta `database` tenga permisos de escritura
- Ejecutar `npm run init-db` para recrear la base de datos

### Error de autenticación
- Verificar que el token JWT sea válido
- Verificar que `JWT_SECRET` esté configurado en `.env`

### Emails no se envían
- Verificar configuración SMTP en `.env`
- Para Gmail, usar contraseña de aplicación, no la contraseña normal
