"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Mail, Shield } from "lucide-react"

export default function UsersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

  const users = [
    {
      id: 1,
      name: "Administrador",
      email: "admin@inventario.com",
      role: "Admin",
      status: "active",
      lastLogin: "Hace 5 minutos",
    },
    {
      id: 2,
      name: "Juan Pérez",
      email: "juan.perez@inventario.com",
      role: "Gestor",
      status: "active",
      lastLogin: "Hace 2 horas",
    },
    {
      id: 3,
      name: "María González",
      email: "maria.gonzalez@inventario.com",
      role: "Gestor",
      status: "active",
      lastLogin: "Hace 1 día",
    },
    {
      id: 4,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@inventario.com",
      role: "Usuario",
      status: "active",
      lastLogin: "Hace 3 días",
    },
    {
      id: 5,
      name: "Ana Martínez",
      email: "ana.martinez@inventario.com",
      role: "Usuario",
      status: "inactive",
      lastLogin: "Hace 2 semanas",
    },
  ]

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "Gestor":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      default:
        return "bg-green-600/20 text-green-400 border-green-600/30"
    }
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Usuarios</h1>
            <p className="text-slate-400">Gestiona los usuarios del sistema</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Usuario
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((u) => (
            <Card
              key={u.id}
              className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getRoleBadgeColor(u.role)}>{u.role}</Badge>
                    <Badge
                      variant={u.status === "active" ? "default" : "secondary"}
                      className={
                        u.status === "active"
                          ? "bg-green-600/20 text-green-400 border-green-600/30"
                          : "bg-slate-600/20 text-slate-400 border-slate-600/30"
                      }
                    >
                      {u.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-white mt-4">{u.name}</CardTitle>
                <CardDescription className="text-slate-400 flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  {u.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Shield className="w-4 h-4" />
                    Último acceso: {u.lastLogin}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600/30 text-red-400 hover:bg-red-600/20 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
