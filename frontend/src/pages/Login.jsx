"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Logo from "../pages/img/Logo.png"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
    } catch (error) {
      // Error manejado en el contexto
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-xl p-8 border border-border">

          {/* LOGO ANIMADO */}
          <div className="flex justify-center mb-6">
            <img 
              src={Logo}
              alt="Logo"
              className="
                h-36 w-36 object-contain 
                animate-[float_3s_ease-in-out_infinite]
                transition-transform duration-500
                hover:rotate-12 hover:scale-105
              "
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">Sistema de Inventario</h1>
            <p className="text-muted-foreground">Inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* EMAIL */}
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

            {/* CONTRASEÑA + OJO */}
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
                />

                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* OLVIDASTE CONTRASEÑA */}
            <div className="flex items-center justify-between text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* BOTÓN LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">¿No tienes cuenta? </span>
            <Link to="/register" className="text-primary hover:underline font-medium">
              Regístrate aquí
            </Link>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center mb-2">Credenciales de prueba:</p>
            <p className="text-xs text-center">
              <strong>Email:</strong> admin@inventario.com
              <br />
              <strong>Password:</strong> admin123
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
