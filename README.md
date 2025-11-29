# Sistema de Inventario para Comercio

Sistema web completo para la gestión de inventarios desarrollado con React y Node.js.

## Características Principales

* Autenticación y autorización con JWT
* Gestión completa de productos, categorías y proveedores
* Control de movimientos de inventario (entradas, salidas, ajustes)
* Sistema de alertas automáticas de stock bajo
* Dashboard con estadísticas y gráficos
* Panel de administración de usuarios
* Recuperación de contraseña por email
* Diseño responsivo y moderno

## Tecnologías

**Frontend:**

* React 18.3
* Vite 5.1
* React Router 6.22
* Tailwind CSS 4
* Recharts
* Axios

**Backend:**

* Node.js 18+
* Express 4.18
* SQLite3 5.1
* JWT
* Bcrypt
* Nodemailer

## Instalación Rápida

### Backend

```bash
cd backend
npm install
node server
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Acceso por Defecto

* **URL**: [http://localhost:5173](http://localhost:5173)
* **Email**: [admin@inventario.com](mailto:admin@inventario.com)
* **Password**: admin123

## Estructura del Proyecto

```
sistema-inventario/
├── backend/
│   ├── config/          # Configuración de BD
│   ├── middleware/      # Middleware de autenticación
│   ├── routes/          # Rutas de la API
│   ├── scripts/         # Scripts de inicialización
│   ├── utils/           # Utilidades (email, etc.)
│   └── server.js        # Servidor principal
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── context/     # Context API (Auth)
│   │   ├── pages/       # Páginas de la aplicación
│   │   ├── services/    # Servicios API
│   │   └── App.jsx      # Componente principal
│   └── index.html
│
└── README.md
```

## Roles y Permisos

### Admin

* Acceso completo al sistema
* Gestión de usuarios
* Eliminación de registros

### Gestor

* CRUD de productos, categorías y proveedores
* Registro de movimientos
* Visualización de reportes

### Usuario

* Solo lectura de productos y categorías
* Visualización de perfil

## División del Trabajo

### Documentación

* **Kevin Mamani:** Diagramas
* **Alexis López:** objetivos, metas y funcionamiento del sistema

### Frontend

* **Kevin Mamani:** Estructura y cuerpo del frontend
* **Alexis López:** Teoría de colores, animaciones y estilo

### Backend

* **Kevin Mamani:** Desarrollo completo del backend

### Marketing

* **Alexis López:** Estrategias y material de presentación del proyecto

## Licencia

Proyecto - Curso 7°2 - Grupo 7.4
