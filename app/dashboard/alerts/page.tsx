"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react"

export default function AlertsPage() {
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

  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Stock Crítico",
      message: "SSD Samsung 1TB tiene solo 3 unidades en stock",
      time: "Hace 30 minutos",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Stock Bajo",
      message: "Mouse Logitech MX Master necesita reabastecimiento (5 unidades)",
      time: "Hace 2 horas",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Stock Bajo",
      message: 'Monitor Samsung 27" tiene stock bajo (8 unidades)',
      time: "Hace 5 horas",
      read: false,
    },
    {
      id: 4,
      type: "info",
      title: "Nuevo Proveedor",
      message: "Se agregó un nuevo proveedor: Tech Solutions SA",
      time: "Hace 1 día",
      read: true,
    },
    {
      id: 5,
      type: "success",
      title: "Reabastecimiento Completado",
      message: "Se recibieron 50 unidades de Webcam Logitech C920",
      time: "Hace 2 días",
      read: true,
    },
    {
      id: 6,
      type: "info",
      title: "Actualización de Precio",
      message: "Se actualizó el precio de Laptop Dell XPS 15",
      time: "Hace 3 días",
      read: true,
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="w-5 h-5" />
      case "warning":
        return <AlertTriangle className="w-5 h-5" />
      case "success":
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "warning":
        return "bg-amber-600/20 text-amber-400 border-amber-600/30"
      case "success":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      default:
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
    }
  }

  const unreadCount = alerts.filter((a) => !a.read).length

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Alertas del Sistema</h1>
            <p className="text-slate-400">
              {unreadCount > 0 ? `Tienes ${unreadCount} alertas sin leer` : "No tienes alertas pendientes"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent">
              Marcar todas como leídas
            </Button>
          )}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all ${
                !alert.read ? "border-l-4 border-l-blue-600" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getAlertColor(alert.type)}`}>{getAlertIcon(alert.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{alert.title}</h3>
                        <p className="text-slate-300">{alert.message}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white shrink-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-sm text-slate-500">{alert.time}</span>
                      {!alert.read && <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">Nueva</Badge>}
                    </div>
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
