"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import Logo from "../Pages/img/Logo.png"
import { toast } from "sonner"

const Register = () => {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    setLoading(true)
    try {
      await register(nombre, email, password)
    } catch (error) {
      // Error manejado en el contexto
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border animate-fadeIn">
          
          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img
              src={Logo}
              alt="Logo"
              className="w-36 h-36 object-contain drop-shadow-xl transition-transform duration-300 hover:scale-110 hover:rotate-3"
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-1">Crear Cuenta</h1>
            <p className="text-muted-foreground">Regístrate en el sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-2">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Juan Pérez"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirmar Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Registrarse</span>
                </>
              )}
            </button>
          </form>

          {/* Enlace login */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
            <Link to="/login" className="text-primary hover:underline font-medium">
              Inicia sesión aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
