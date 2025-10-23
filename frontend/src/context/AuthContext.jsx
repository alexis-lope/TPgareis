"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { toast } from "sonner"

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
      toast.success("Inicio de sesión exitoso")
      navigate("/dashboard")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión")
      throw error
    }
  }

  const register = async (nombre, email, password) => {
    try {
      await api.post("/auth/register", { nombre, email, password })
      toast.success("Registro exitoso. Por favor inicia sesión.")
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al registrarse")
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    delete api.defaults.headers.common["Authorization"]
    setUser(null)
    toast.info("Sesión cerrada")
    navigate("/login")
  }

  const hasRole = (role) => {
    return user?.rol === role
  }

  const hasAnyRole = (...roles) => {
    return roles.includes(user?.rol)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        hasRole,
        hasAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
