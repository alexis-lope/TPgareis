"use client"

import { useAuth } from "../context/AuthContext"
import { LogOut, Bell } from "lucide-react"
import { Link } from "react-router-dom"

const Header = () => {
  const { logout, user } = useAuth()

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold">Bienvenido, {user?.nombre}</h2>
        <p className="text-sm text-muted-foreground">Gestiona tu inventario de forma eficiente</p>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/alerts" className="p-2 rounded-lg hover:bg-muted transition-colors relative" title="Alertas">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </header>
  )
}

export default Header
