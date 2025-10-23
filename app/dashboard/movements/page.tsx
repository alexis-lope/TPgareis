"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"

export default function MovementsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

  const movements = [
    { id: 1, type: "entrada", product: "Laptop Dell XPS 15", quantity: 10, date: "2025-01-10", user: "Admin" },
    { id: 2, type: "salida", product: "Mouse Logitech MX Master", quantity: 5, date: "2025-01-10", user: "Juan Pérez" },
    { id: 3, type: "entrada", product: "Teclado Mecánico RGB", quantity: 20, date: "2025-01-09", user: "Admin" },
    { id: 4, type: "ajuste", product: 'Monitor Samsung 27"', quantity: -2, date: "2025-01-09", user: "María González" },
    {
      id: 5,
      type: "salida",
      product: "Webcam Logitech C920",
      quantity: 8,
      date: "2025-01-08",
      user: "Carlos Rodríguez",
    },
  ]

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "entrada":
        return <ArrowDownRight className="w-5 h-5" />
      case "salida":
        return <ArrowUpRight className="w-5 h-5" />
      default:
        return <RefreshCw className="w-5 h-5" />
    }
  }

  const getMovementColor = (type: string) => {
    switch (type) {
      case "entrada":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "salida":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      default:
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
    }
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Movimientos de Inventario</h1>
            <p className="text-slate-400">Historial de entradas, salidas y ajustes</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Movimiento
          </Button>
        </div>

        {/* Movements List */}
        <div className="space-y-4">
          {movements.map((movement) => (
            <Card
              key={movement.id}
              className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${getMovementColor(movement.type)}`}>
                    {getMovementIcon(movement.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{movement.product}</h3>
                        <p className="text-slate-400">Por: {movement.user}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getMovementColor(movement.type)}>
                          {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                        </Badge>
                        <p className="text-sm text-slate-500 mt-2">{movement.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-2xl font-bold ${
                        movement.type === "entrada"
                          ? "text-green-400"
                          : movement.type === "salida"
                            ? "text-red-400"
                            : "text-blue-400"
                      }`}
                    >
                      {movement.type === "entrada" ? "+" : movement.type === "salida" ? "-" : ""}
                      {Math.abs(movement.quantity)}
                    </p>
                    <p className="text-sm text-slate-500">unidades</p>
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
