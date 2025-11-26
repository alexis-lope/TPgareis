"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Logo from "../pages/img/Logo.png"
import { 
  LayoutDashboard, Package, FolderTree, Truck, ArrowLeftRight, Bell, Users, User,
  Menu, X
} from "lucide-react"
import { useState } from "react"

const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuth()

  // Estado para animación del logo
  const [rotate, setRotate] = useState(false)

  // Estado para abrir/cerrar menú
  const [open, setOpen] = useState(true)

  const handleRotate = () => {
    setRotate(true)
    setTimeout(() => setRotate(false), 500)
  }

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard", roles: ["admin", "gestor", "usuario"] },
    { path: "/products", icon: Package, label: "Productos", roles: ["admin", "gestor", "usuario"] },
    { path: "/categories", icon: FolderTree, label: "Categorías", roles: ["admin", "gestor", "usuario"] },
    { path: "/suppliers", icon: Truck, label: "Proveedores", roles: ["admin", "gestor", "usuario"] },
    { path: "/movements", icon: ArrowLeftRight, label: "Movimientos", roles: ["admin", "gestor"] },
    { path: "/alerts", icon: Bell, label: "Alertas", roles: ["admin", "gestor"] },
    { path: "/users", icon: Users, label: "Usuarios", roles: ["admin"] },
  ]

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user?.rol))

  return (
    <aside 
      className={`
        bg-card border-r border-border flex flex-col transition-all duration-300
        ${open ? "w-64" : "w-20"}
      `}
    >

      {/* BOTÓN MENU / X */}
      <button 
        onClick={() => setOpen(!open)}
        className="absolute top-4 left-4 p-2 rounded-md hover:bg-muted transition"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* HEADER CON LOGO ANIMADO */}
      <div className="p-6 border-b border-border flex flex-col items-center pt-16">
        <img
          src={Logo}
          alt="Logo"
          onClick={handleRotate}
          className={`
            h-28 w-28 object-contain cursor-pointer transition-transform duration-500
            ${rotate ? "rotate-[360deg]" : ""}
            ${open ? "opacity-100" : "opacity-0 scale-0"}
          `}
        />

        {open && (
          <p className="text-sm text-muted-foreground mt-2 transition-opacity">Sistema de Gestión</p>
        )}
      </div>

      {/* MENÚ */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-colors
                ${isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              <Icon size={22} className="min-w-[22px]" />

              {open && (
                <span className="font-medium ml-3">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* PERFIL */}
      <div className="p-4 border-t border-border">
        <Link
          to="/profile"
          className={`
            flex items-center px-4 py-3 rounded-lg transition-colors
            ${location.pathname === "/profile"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }
          `}
        >
          <User size={22} className="min-w-[22px]" />

          {open && (
            <div className="ml-3 flex-1 min-w-0">
              <p className="font-medium truncate">{user?.nombre}</p>
              <p className="text-xs opacity-75 capitalize">{user?.rol}</p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
