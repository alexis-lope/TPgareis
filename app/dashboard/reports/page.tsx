"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, TrendingUp, Package, DollarSign } from "lucide-react"

export default function ReportsPage() {
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

  const reports = [
    {
      title: "Reporte de Inventario",
      description: "Estado actual del inventario con valores y cantidades",
      icon: Package,
      color: "blue",
    },
    {
      title: "Reporte de Movimientos",
      description: "Historial completo de entradas y salidas",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Reporte Financiero",
      description: "Valor total del inventario y análisis de costos",
      icon: DollarSign,
      color: "amber",
    },
    {
      title: "Reporte de Alertas",
      description: "Productos con stock bajo y crítico",
      icon: BarChart3,
      color: "red",
    },
  ]

  const colorClasses = {
    blue: "bg-blue-600/20 text-blue-400",
    green: "bg-green-600/20 text-green-400",
    amber: "bg-amber-600/20 text-amber-400",
    red: "bg-red-600/20 text-red-400",
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Reportes</h1>
          <p className="text-slate-400">Genera y descarga reportes del sistema</p>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {reports.map((report) => {
            const Icon = report.icon
            return (
              <Card
                key={report.title}
                className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all"
              >
                <CardHeader>
                  <div className={`p-3 rounded-lg w-fit ${colorClasses[report.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-white mt-4">{report.title}</CardTitle>
                  <CardDescription className="text-slate-400">{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Download className="w-4 h-4" />
                    Descargar Reporte
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
