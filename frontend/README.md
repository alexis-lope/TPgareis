# Frontend - Sistema de Inventario

Frontend desarrollado con React, Vite y Tailwind CSS para el Sistema de Inventario.

## 🚀 Características

- **Autenticación Completa**: Login, registro, recuperación de contraseña
- **Rutas Protegidas**: Control de acceso basado en roles
- **Dashboard Interactivo**: Estadísticas y gráficos en tiempo real
- **CRUD Completo**: Gestión de productos, categorías, proveedores
- **Movimientos de Inventario**: Registro de entradas, salidas y ajustes
- **Sistema de Alertas**: Notificaciones de stock bajo
- **Gestión de Usuarios**: Panel de administración (solo admin)
- **Diseño Responsivo**: Optimizado para móviles y escritorio
- **Tema Oscuro**: Interfaz moderna y profesional

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Backend corriendo en http://localhost:5000

## 🔧 Instalación

1. Navegar a la carpeta frontend:
\`\`\`bash
cd frontend
\`\`\`

2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

3. Iniciar el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

\`\`\`
frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/          # Context API
│   │   └── AuthContext.jsx
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── ProductForm.jsx
│   │   ├── Categories.jsx
│   │   ├── Suppliers.jsx
│   │   ├── Movements.jsx
│   │   ├── Alerts.jsx
│   │   ├── Users.jsx
│   │   └── Profile.jsx
│   ├── services/         # Servicios API
│   │   └── api.js
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── index.html
├── vite.config.js
└── package.json
\`\`\`

## 🎨 Diseño

El sistema utiliza un diseño oscuro profesional con:
- **Color Primario**: Azul (#3b82f6)
- **Color Acento**: Verde (#10b981)
- **Color Destructivo**: Rojo (#ef4444)
- **Fondo**: Negro (#0a0a0a)
- **Tarjetas**: Gris oscuro (#141414)

## 🔐 Roles y Permisos

### Admin
- Acceso completo a todas las funcionalidades
- Gestión de usuarios
- Eliminación de registros

### Gestor
- CRUD de productos, categorías y proveedores
- Registro de movimientos
- Visualización de reportes y alertas

### Usuario
- Solo lectura de productos y categorías
- Visualización de su perfil

## 📱 Páginas Principales

### Dashboard
- Estadísticas generales del inventario
- Gráficos de productos más vendidos
- Distribución de stock por categoría
- Accesos rápidos

### Productos
- Listado con paginación y filtros
- Búsqueda por nombre o código
- Filtro por categoría
- Indicadores de stock bajo
- Formulario de creación/edición

### Categorías
- Vista en tarjetas
- Creación y edición mediante modal
- Eliminación con confirmación

### Proveedores
- Vista en tarjetas con información de contacto
- Gestión completa de proveedores

### Movimientos
- Historial de movimientos de inventario
- Registro de entradas, salidas y ajustes
- Visualización de stock anterior y nuevo

### Alertas
- Productos con stock bajo
- Historial de alertas del sistema
- Marcar alertas como leídas

### Usuarios (Solo Admin)
- Listado de todos los usuarios
- Edición de roles y estado
- Visualización de información

### Perfil
- Información del usuario actual
- Cambio de contraseña

## 🛠️ Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción

## 🔌 Integración con Backend

El frontend se comunica con el backend mediante Axios:
- Base URL: `http://localhost:5000/api`
- Autenticación: JWT en header Authorization
- Interceptores para manejo de errores y tokens

## 📝 Notas Importantes

1. **Proxy**: Vite está configurado para hacer proxy de `/api` al backend
2. **Tokens**: Se almacenan en localStorage
3. **Redirección**: Si el token expira, redirige automáticamente al login
4. **Notificaciones**: Usa Sonner para toast notifications

## 🐛 Troubleshooting

### Error de conexión con el backend
- Verificar que el backend esté corriendo en el puerto 5000
- Revisar la configuración de CORS en el backend

### Problemas de autenticación
- Limpiar localStorage: `localStorage.clear()`
- Verificar que el token JWT sea válido

### Estilos no se aplican
- Verificar que Tailwind CSS esté correctamente configurado
- Ejecutar `npm install` nuevamente
