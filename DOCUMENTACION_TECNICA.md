# Sistema de Inventario para Comercio
## Documentación Técnica Completa

**Proyecto:** Diseño e Implementación de Sistemas Computacionales  
**Curso:** 7°2  
**Grupo de Taller:** 7.4  
**Fecha:** 2025

---

## 1. Introducción

### 1.1 Objetivo del Sistema

El Sistema de Inventario para Comercio es una aplicación web completa diseñada para gestionar eficientemente el inventario de productos en un entorno comercial. El sistema permite controlar el stock, registrar movimientos de entrada y salida, gestionar proveedores y categorías, y generar alertas automáticas cuando el stock de productos está por debajo del mínimo establecido.

### 1.2 Alcance

El sistema cubre las siguientes funcionalidades principales:

- **Gestión de Usuarios**: Registro, autenticación y control de acceso basado en roles (Admin, Gestor, Usuario)
- **Gestión de Productos**: CRUD completo con información detallada de cada producto
- **Gestión de Categorías**: Organización de productos por categorías
- **Gestión de Proveedores**: Información de contacto y gestión de proveedores
- **Movimientos de Inventario**: Registro de entradas, salidas y ajustes de stock
- **Sistema de Alertas**: Notificaciones automáticas de stock bajo
- **Dashboard Administrativo**: Estadísticas, gráficos y reportes en tiempo real
- **Recuperación de Contraseña**: Sistema de recuperación mediante email

### 1.3 Tecnologías Utilizadas

**Backend:**
- Node.js v18+
- Express.js v4.18
- SQLite3 v5.1
- JWT para autenticación
- Bcrypt para encriptación de contraseñas
- Nodemailer para envío de emails

**Frontend:**
- React v18.3
- Vite v5.1
- React Router v6.22
- Axios para peticiones HTTP
- Recharts para gráficos
- Tailwind CSS v4 para estilos
- Lucide React para iconos

---

## 2. Diccionario de Datos

### 2.1 Tabla: roles

| Campo | Tipo | PK/FK | Descripción |
|-------|------|-------|-------------|
| id | INTEGER | PK | Identificador único del rol |
| nombre | VARCHAR(50) | - | Nombre del rol (admin, gestor, usuario) |
| descripcion | TEXT | - | Descripción del rol |
| created_at | DATETIME | - | Fecha de creación del registro |

### 2.2 Tabla: usuarios

| Campo | Tipo | PK/FK | Descripción |
|-------|------|-------|-------------|
| id | INTEGER | PK | Identificador único del usuario |
| nombre | VARCHAR(100) | - | Nombre completo del usuario |
| email | VARCHAR(100) | - | Email único del usuario |
| password | VARCHAR(255) | - | Contraseña encriptada con bcrypt |
| rol_id | INTEGER | FK | Referencia al rol del usuario |
| activo | BOOLEAN | - | Estado del usuario (1=activo, 0=inactivo) |
| reset_token | VARCHAR(255) | - | Token para recuperación de contraseña |
| reset_token_expiry | DATETIME | - | Fecha de expiración del token |
| created_at | DATETIME | - | Fecha de creación del registro |
| updated_at | DATETIME | - | Fecha de última actualización |

### 2.3 Tabla: categorias

| Campo | Tipo | PK/FK | Descripción |
|-------|------|-------|-------------|
| id | INTEGER | PK | Identificador único de la categoría |
| nombre | VARCHAR(100) | - | Nombre de la categoría |
| descripcion | TEXT | - | Descripción de la categoría |
| activo | BOOLEAN | - | Estado de la categoría |
| created_at | DATETIME | - | Fecha de creación del registro |
| updated_at | DATETIME | - | Fecha de última actualización |

### 2.4 Tabla: proveedores

| Campo | Tipo | PK/FK | Descripción |
|-------|------|-------|-------------|
| id | INTEGER | PK | Identificador único del proveedor |
| nombre | VARCHAR(100) | - | Nombre del proveedor |
| contacto | VARCHAR(100) | - | Persona de contacto |
| telefono | VARCHAR(20) | - | Teléfono de contacto |
| email | VARCHAR(100) | - | Email del proveedor |
| direccion | TEXT | - | Dirección física del proveedor |
| activo | BOOLEAN | - | Estado del proveedor |
| created_at | DATETIME | - | Fecha de creación del registro |
| updated_at | DATETIME | - | Fecha de última actualización |

### 2.5 Tabla: productos

| Campo | Tipo | PK/FK | Descripción |
|-------|------|-------|-------------|
| id | INTEGER | PK | Identificador único del producto |
| codigo | VARCHAR(50) | - | Código único del producto |
| nombre | VARCHAR(200) | - | Nombre del producto |
| descripcion | TEXT | - | Descripción detallada |
| categoria_id | INTEGER | FK | Referencia a la categoría |
| proveedor_id | INTEGER | FK | Referencia al proveedor |
| precio_compra | DECIMAL(10,2) | - | Precio de compra del producto |
| precio_venta | DECIMAL(10,2) | - | Precio de venta del producto |
| stock_actual | INTEGER | - | Cantidad actual en inventario |
| stock_minimo | INTEGER | - | Stock mínimo antes de alerta |
| unidad_medida | VARCHAR(20) | - | Unidad de medida (unidad, kg, litro, etc.) |
| activo | BOOLEAN | - | Estado del producto |
| created_at | DATETIME | - | Fecha de creación del registro |
| updated_at | DATETIME | - | Fecha de última actualización |

### 2.6 Tabla: movimientos_inventario

| Campo | Tipo | PK/FK | Descripción |
|-------|------|-------|-------------|
| id | INTEGER | PK | Identificador único del movimiento |
| producto_id | INTEGER | FK | Referencia al producto |
| tipo_movimiento | VARCHAR(20) | - | Tipo: entrada, salida o ajuste |
| cantidad | INTEGER | - | Cantidad del movimiento |
| motivo | TEXT | - | Motivo o descripción del movimiento |
| usuario_id | INTEGER | FK | Usuario que registró el movimiento |
| stock_anterior | INTEGER | - | Stock antes del movimiento |
| stock_nuevo | INTEGER | - | Stock después del movimiento |
| created_at | DATETIME | - | Fecha del movimiento |

### 2.7 Tabla: alertas

| Campo | Tipo | PK/FK | Descripción |
|-------|------|-------|-------------|
| id | INTEGER | PK | Identificador único de la alerta |
| producto_id | INTEGER | FK | Referencia al producto |
| tipo_alerta | VARCHAR(50) | - | Tipo de alerta (stock_bajo, etc.) |
| mensaje | TEXT | - | Mensaje descriptivo de la alerta |
| leida | BOOLEAN | - | Estado de la alerta (0=no leída, 1=leída) |
| created_at | DATETIME | - | Fecha de creación de la alerta |

---

## 3. Diagrama Entidad-Relación (DER)

\`\`\`
┌─────────────┐
│   roles     │
├─────────────┤
│ id (PK)     │
│ nombre      │
│ descripcion │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────┴──────────┐
│   usuarios      │
├─────────────────┤
│ id (PK)         │
│ nombre          │
│ email           │
│ password        │
│ rol_id (FK)     │
│ activo          │
│ reset_token     │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────┴────────────────┐
│ movimientos_inventario  │
├─────────────────────────┤
│ id (PK)                 │
│ producto_id (FK)        │
│ tipo_movimiento         │
│ cantidad                │
│ usuario_id (FK)         │
│ stock_anterior          │
│ stock_nuevo             │
└─────────────────────────┘
         │
         │ N:1
         │
┌────────┴──────────┐
│   productos       │
├───────────────────┤
│ id (PK)           │
│ codigo            │
│ nombre            │
│ categoria_id (FK) │
│ proveedor_id (FK) │
│ precio_compra     │
│ precio_venta      │
│ stock_actual      │
│ stock_minimo      │
└─────┬─────┬───────┘
      │     │
      │     │ N:1
      │     │
      │  ┌──┴────────────┐
      │  │ proveedores   │
      │  ├───────────────┤
      │  │ id (PK)       │
      │  │ nombre        │
      │  │ contacto      │
      │  │ telefono      │
      │  │ email         │
      │  └───────────────┘
      │
      │ N:1
      │
   ┌──┴────────────┐
   │ categorias    │
   ├───────────────┤
   │ id (PK)       │
   │ nombre        │
   │ descripcion   │
   └───────────────┘

┌─────────────────┐
│    alertas      │
├─────────────────┤
│ id (PK)         │
│ producto_id (FK)│──┐
│ tipo_alerta     │  │
│ mensaje         │  │ N:1
│ leida           │  │
└─────────────────┘  │
                     │
                     └──> productos
\`\`\`

---

## 4. Modelo Físico de Base de Datos

### 4.1 Índices

\`\`\`sql
-- Índices para mejorar el rendimiento
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_productos_codigo ON productos(codigo);
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_productos_proveedor ON productos(proveedor_id);
CREATE INDEX idx_movimientos_producto ON movimientos_inventario(producto_id);
CREATE INDEX idx_movimientos_fecha ON movimientos_inventario(created_at);
CREATE INDEX idx_alertas_producto ON alertas(producto_id);
CREATE INDEX idx_alertas_leida ON alertas(leida);
\`\`\`

### 4.2 Restricciones

- **Claves Primarias**: Todas las tablas tienen un campo `id` como clave primaria autoincremental
- **Claves Foráneas**: Se utilizan para mantener la integridad referencial
- **Unique**: Email en usuarios, código en productos
- **Check**: tipo_movimiento debe ser 'entrada', 'salida' o 'ajuste'
- **Not Null**: Campos esenciales como nombre, email, password, etc.

---

## 5. Casos de Uso

### 5.1 CU-01: Autenticarse en el Sistema

**Actor Principal**: Usuario, Gestor, Admin  
**Precondiciones**: El usuario debe estar registrado en el sistema  
**Flujo Principal**:
1. El usuario accede a la página de login
2. Ingresa su email y contraseña
3. El sistema valida las credenciales
4. Si son correctas, genera un token JWT
5. Redirige al dashboard según el rol del usuario

**Flujos Alternativos**:
- 3a. Credenciales incorrectas: Muestra mensaje de error
- 3b. Usuario inactivo: Muestra mensaje de cuenta deshabilitada

### 5.2 CU-02: Registrar Producto

**Actor Principal**: Admin, Gestor  
**Precondiciones**: Usuario autenticado con rol admin o gestor  
**Flujo Principal**:
1. El usuario accede a la sección de productos
2. Hace clic en "Nuevo Producto"
3. Completa el formulario con los datos del producto
4. El sistema valida que el código no exista
5. Guarda el producto en la base de datos
6. Muestra mensaje de confirmación

**Flujos Alternativos**:
- 4a. Código duplicado: Muestra error y solicita otro código
- 3a. Datos inválidos: Muestra errores de validación

### 5.3 CU-03: Registrar Movimiento de Inventario

**Actor Principal**: Admin, Gestor  
**Precondiciones**: Usuario autenticado, producto existente  
**Flujo Principal**:
1. El usuario accede a la sección de movimientos
2. Hace clic en "Registrar Movimiento"
3. Selecciona el producto
4. Elige el tipo de movimiento (entrada/salida/ajuste)
5. Ingresa la cantidad y motivo
6. El sistema valida el stock disponible (para salidas)
7. Actualiza el stock del producto
8. Registra el movimiento en el historial
9. Si el stock queda bajo el mínimo, crea una alerta

**Flujos Alternativos**:
- 6a. Stock insuficiente para salida: Muestra error
- 9a. Stock bajo: Genera alerta automática

### 5.4 CU-04: Notificar Stock Bajo

**Actor Principal**: Sistema  
**Precondiciones**: Producto con stock <= stock_minimo  
**Flujo Principal**:
1. El sistema detecta que un producto tiene stock bajo
2. Crea una alerta en la base de datos
3. Muestra la alerta en el dashboard
4. Opcionalmente envía email al administrador

### 5.5 CU-05: Administrar Usuarios

**Actor Principal**: Admin  
**Precondiciones**: Usuario autenticado con rol admin  
**Flujo Principal**:
1. El admin accede a la sección de usuarios
2. Visualiza la lista de todos los usuarios
3. Selecciona un usuario para editar
4. Modifica el rol o estado del usuario
5. Guarda los cambios
6. El sistema actualiza los permisos del usuario

### 5.6 CU-06: Recuperar Contraseña

**Actor Principal**: Usuario  
**Precondiciones**: Usuario registrado con email válido  
**Flujo Principal**:
1. El usuario hace clic en "¿Olvidaste tu contraseña?"
2. Ingresa su email
3. El sistema genera un token único
4. Envía un email con el enlace de recuperación
5. El usuario hace clic en el enlace
6. Ingresa su nueva contraseña
7. El sistema valida el token y actualiza la contraseña

**Flujos Alternativos**:
- 7a. Token expirado: Muestra error y solicita nuevo token

---

## 6. Diagramas de Secuencia

### 6.1 Secuencia: Recuperar Contraseña

\`\`\`
Usuario          Frontend         Backend          Base de Datos      Email Service
  |                 |                |                    |                  |
  |--Solicitar---|                |                    |                  |
  |  recuperación   |                |                    |                  |
  |                 |                |                    |                  |
  |                 |--POST /auth-|                    |                  |
  |                 | forgot-password|                    |                  |
  |                 |                |                    |                  |
  |                 |                |--Buscar usuario-|                  |
  |                 |                |                    |                  |
  |                 |                |<--Usuario----------|                  |
  |                 |                |                    |                  |
  |                 |                |--Generar token--|                  |
  |                 |                |                    |                  |
  |                 |                |--Enviar email-------------------|
  |                 |                |                    |                  |
  |                 |<--Respuesta----|                    |                  |
  |                 |                |                    |                  |
  |<--Confirmación--|                |                    |                  |
  |                 |                |                    |                  |
  |--Click enlace|                |                    |                  |
  |                 |                |                    |                  |
  |                 |--POST /auth-|                    |                  |
  |                 | reset-password |                    |                  |
  |                 |                |                    |                  |
  |                 |                |--Validar token--|                  |
  |                 |                |                    |                  |
  |                 |                |--Actualizar-----|                  |
  |                 |                |   contraseña       |                  |
  |                 |                |                    |                  |
  |                 |<--Éxito--------|                    |                  |
  |                 |                |                    |                  |
  |<--Redirigir-----|                |                    |                  |
  |   a login       |                |                    |                  |
\`\`\`

### 6.2 Secuencia: Registrar Movimiento de Inventario

\`\`\`
Usuario          Frontend         Backend          Base de Datos
  |                 |                |                    |
  |--Abrir modal-|                |                    |
  |  movimiento     |                |                    |
  |                 |                |                    |
  |--Completar---|                |                    |
  |  formulario     |                |                    |
  |                 |                |                    |
  |--Enviar------|                |                    |
  |                 |                |                    |
  |                 |--POST /api--|                    |
  |                 |  /movements    |                    |
  |                 |                |                    |
  |                 |                |--Obtener--------|
  |                 |                |  producto          |
  |                 |                |                    |
  |                 |                |<--Stock actual-----|
  |                 |                |                    |
  |                 |                |--Validar stock--|
  |                 |                |  (si es salida)    |
  |                 |                |                    |
  |                 |                |--Calcular-------|
  |                 |                |  nuevo stock       |
  |                 |                |                    |
  |                 |                |--Insertar-------|
  |                 |                |  movimiento        |
  |                 |                |                    |
  |                 |                |--Actualizar-----|
  |                 |                |  stock producto    |
  |                 |                |                    |
  |                 |                |--Verificar------|
  |                 |                |  stock mínimo      |
  |                 |                |                    |
  |                 |                |--Crear alerta---|
  |                 |                |  (si es necesario) |
  |                 |                |                    |
  |                 |<--Respuesta----|                    |
  |                 |                |                    |
  |<--Notificación--|                |                    |
  |  de éxito       |                |                    |
\`\`\`

---

## 7. Diagrama de Gantt

\`\`\`
Fase del Proyecto                    Semanas
                          1   2   3   4   5   6   7   8
────────────────────────────────────────────────────────
Diseño del Sitio         ███████
  - Wireframes           ███
  - Diseño UI/UX             ████

Frontend                     ████████████
  - Configuración              ██
  - Componentes                  ████
  - Páginas                        ████
  - Integración                        ████

Backend + Lógica                 ████████████
  - Configuración                  ██
  - Modelos y DB                     ███
  - Rutas y Controllers                ███
  - Middleware                           ███

Integración DB                       ████████
  - Scripts SQL                        ██
  - Conexiones                           ██
  - Pruebas                                ████

Pruebas                                  ████████
  - Unitarias                              ██
  - Integración                              ██
  - Usuario                                    ████

Documentación                            ████████████
  - Técnica                                ████
  - Usuario                                    ████
  - Presentación                                   ████

Presentación                                         ████
  - Preparación                                      ██
  - Ensayo                                             ██
\`\`\`

---

## 8. Guía de Instalación y Despliegue

### 8.1 Requisitos del Sistema

**Software Necesario:**
- Node.js 18 o superior
- npm 9 o superior
- Navegador web moderno (Chrome, Firefox, Edge)

**Hardware Mínimo:**
- Procesador: 2 GHz dual-core
- RAM: 4 GB
- Espacio en disco: 500 MB

### 8.2 Instalación del Backend

1. **Clonar o descargar el proyecto**
\`\`\`bash
cd backend
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env
\`\`\`

Editar el archivo `.env` con las configuraciones necesarias:
\`\`\`env
PORT=5000
JWT_SECRET=tu_clave_secreta_segura
DB_PATH=./database/inventario.db
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_password_aplicacion
\`\`\`

4. **Inicializar la base de datos**
\`\`\`bash
npm run init-db
\`\`\`

Este comando creará:
- Todas las tablas necesarias
- Roles por defecto (admin, gestor, usuario)
- Usuario administrador: `admin@inventario.com` / `admin123`
- Datos de ejemplo

5. **Iniciar el servidor**
\`\`\`bash
npm run dev
\`\`\`

El backend estará disponible en `http://localhost:5000`

### 8.3 Instalación del Frontend

1. **Navegar a la carpeta frontend**
\`\`\`bash
cd frontend
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Iniciar el servidor de desarrollo**
\`\`\`bash
npm run dev
\`\`\`

El frontend estará disponible en `http://localhost:5173`

### 8.4 Acceso al Sistema

1. Abrir el navegador en `http://localhost:5173`
2. Usar las credenciales por defecto:
   - **Email**: admin@inventario.com
   - **Password**: admin123

### 8.5 Despliegue en Producción

**Backend:**
\`\`\`bash
cd backend
npm install --production
npm start
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm run build
\`\`\`

Los archivos compilados estarán en `frontend/dist` y pueden ser servidos con cualquier servidor web estático.

---

## 9. Manual de Usuario

### 9.1 Inicio de Sesión

1. Acceder a la URL del sistema
2. Ingresar email y contraseña
3. Hacer clic en "Iniciar Sesión"
4. El sistema redirigirá al dashboard

### 9.2 Dashboard

El dashboard muestra:
- Total de productos, categorías y proveedores
- Productos con stock bajo
- Valor total del inventario
- Gráficos de productos más vendidos
- Distribución de stock por categoría

### 9.3 Gestión de Productos

**Crear Producto:**
1. Ir a "Productos" en el menú lateral
2. Hacer clic en "Nuevo Producto"
3. Completar el formulario:
   - Código único
   - Nombre del producto
   - Descripción (opcional)
   - Categoría
   - Proveedor
   - Precios de compra y venta
   - Stock inicial
   - Stock mínimo
   - Unidad de medida
4. Hacer clic en "Guardar Producto"

**Editar Producto:**
1. En la lista de productos, hacer clic en el ícono de editar
2. Modificar los campos necesarios
3. Guardar cambios

**Buscar y Filtrar:**
- Usar la barra de búsqueda para buscar por nombre o código
- Filtrar por categoría usando el selector
- Los resultados se actualizan automáticamente

### 9.4 Movimientos de Inventario

**Registrar Movimiento:**
1. Ir a "Movimientos" en el menú
2. Hacer clic en "Registrar Movimiento"
3. Seleccionar el producto
4. Elegir tipo de movimiento:
   - **Entrada**: Aumenta el stock
   - **Salida**: Disminuye el stock
   - **Ajuste**: Establece un stock específico
5. Ingresar cantidad
6. Describir el motivo
7. Confirmar el registro

### 9.5 Alertas

El sistema genera alertas automáticas cuando:
- Un producto tiene stock igual o menor al stock mínimo
- Se registra un movimiento que deja el stock bajo

**Ver Alertas:**
1. Ir a "Alertas" en el menú
2. Ver productos con stock bajo
3. Marcar alertas como leídas

### 9.6 Gestión de Usuarios (Solo Admin)

1. Ir a "Usuarios" en el menú
2. Ver lista de todos los usuarios
3. Editar usuario:
   - Cambiar nombre o email
   - Modificar rol
   - Activar/desactivar usuario

### 9.7 Perfil de Usuario

1. Hacer clic en tu nombre en el menú lateral
2. Ver información del perfil
3. Cambiar contraseña si es necesario

---

## 10. Arquitectura del Sistema

### 10.1 Arquitectura General

\`\`\`
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Pages   │  │Components│  │  Context (Auth)  │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│         │              │                │           │
│         └──────────────┴────────────────┘           │
│                        │                            │
│                   Axios (HTTP)                      │
└────────────────────────┼────────────────────────────┘
                         │
                    API REST (JSON)
                         │
┌────────────────────────┼────────────────────────────┐
│                   BACKEND (Node.js/Express)         │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Routes  │  │Middleware│  │    Services      │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│         │              │                │           │
│         └──────────────┴────────────────┘           │
│                        │                            │
│                  Database Layer                     │
└────────────────────────┼────────────────────────────┘
                         │
                         │
┌────────────────────────┼────────────────────────────┐
│              BASE DE DATOS (SQLite3)                │
│  ┌──────────────────────────────────────────────┐  │
│  │  Tablas: usuarios, productos, categorias,   │  │
│  │  proveedores, movimientos, alertas, roles   │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
\`\`\`

### 10.2 Flujo de Datos

1. **Usuario → Frontend**: Interacción con la interfaz
2. **Frontend → Backend**: Peticiones HTTP (GET, POST, PUT, DELETE)
3. **Backend → Base de Datos**: Consultas SQL
4. **Base de Datos → Backend**: Resultados
5. **Backend → Frontend**: Respuestas JSON
6. **Frontend → Usuario**: Actualización de la interfaz

### 10.3 Seguridad

- **Autenticación**: JWT (JSON Web Tokens)
- **Encriptación**: Bcrypt para contraseñas
- **Validación**: Express-validator en backend, validación en frontend
- **CORS**: Configurado para permitir solo el origen del frontend
- **SQL Injection**: Uso de consultas parametrizadas
- **XSS**: React escapa automáticamente el contenido

---

## 11. Conclusiones

El Sistema de Inventario para Comercio cumple con todos los requisitos establecidos en el proyecto académico, proporcionando una solución completa y funcional para la gestión de inventarios en entornos comerciales.

**Logros Principales:**
- Sistema completo con autenticación y roles
- Base de datos relacional con 7 tablas
- CRUD completo de todas las entidades
- Sistema de alertas automáticas
- Dashboard con estadísticas y gráficos
- Interfaz responsiva y moderna
- Documentación técnica completa

**Tecnologías Aplicadas:**
- Frontend moderno con React y Tailwind CSS
- Backend robusto con Node.js y Express
- Base de datos SQLite3 con integridad referencial
- Arquitectura por capas y buenas prácticas

El sistema está listo para ser utilizado en un entorno real y puede ser escalado según las necesidades del negocio.
