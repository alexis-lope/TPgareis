"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Package, BarChart3, Users, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de login
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          role: "admin",
          name: "Administrador",
        }),
      )
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Sección izquierda - Información */}
          <div className="text-white space-y-8 hidden lg:block">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Package className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold">Sistema de Inventario</h1>
              </div>
              <p className="text-xl text-slate-400">Gestiona tu comercio de forma eficiente y profesional</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Dashboard Completo</h3>
                  <p className="text-slate-400">Visualiza estadísticas y métricas en tiempo real</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <Package className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Gestión de Productos</h3>
                  <p className="text-slate-400">Control total de tu inventario y stock</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
                <div className="p-2 bg-amber-600/20 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Alertas Automáticas</h3>
                  <p className="text-slate-400">Notificaciones de stock bajo y más</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Múltiples Roles</h3>
                  <p className="text-slate-400">Admin, Gestor y Usuario con permisos diferenciados</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección derecha - Formulario de login */}
          <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-white">Iniciar Sesión</CardTitle>
              <CardDescription className="text-slate-400">
                Ingresa tus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@inventario.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>

                <div className="pt-4 border-t border-slate-800">
                  <p className="text-sm text-slate-400 text-center">
                    Usuario de prueba: <span className="text-blue-400 font-mono">admin@inventario.com</span>
                  </p>
                  <p className="text-sm text-slate-400 text-center mt-1">
                    Contraseña: <span className="text-blue-400 font-mono">admin123</span>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
