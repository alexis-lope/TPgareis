"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LayoutDashboard, Package, FolderTree, Truck, ArrowLeftRight, Bell, Users, User } from "lucide-react"

const Sidebar = () => {
  const location = useLocation()
  const { user, hasRole } = useAuth()

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
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Inventario</h1>
        <p className="text-sm text-muted-foreground mt-1">Sistema de Gestión</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === "/profile"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <User size={20} />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user?.nombre}</p>
            <p className="text-xs opacity-75 capitalize">{user?.rol}</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
