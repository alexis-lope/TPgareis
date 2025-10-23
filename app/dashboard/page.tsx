"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, AlertCircle, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DashboardPage() {
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

  const stats = [
    {
      title: "Total Productos",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: Package,
      color: "blue",
    },
    {
      title: "Valor Inventario",
      value: "$45,231",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Productos Bajo Stock",
      value: "23",
      change: "-5.1%",
      trend: "down",
      icon: AlertCircle,
      color: "amber",
    },
    {
      title: "Movimientos Hoy",
      value: "89",
      change: "+23.1%",
      trend: "up",
      icon: TrendingUp,
      color: "purple",
    },
  ]

  const recentProducts = [
    { id: 1, name: "Laptop Dell XPS 15", stock: 15, price: 1299.99, status: "normal" },
    { id: 2, name: "Mouse Logitech MX Master", stock: 5, price: 99.99, status: "low" },
    { id: 3, name: "Teclado Mecánico RGB", stock: 32, price: 149.99, status: "normal" },
    { id: 4, name: 'Monitor Samsung 27"', stock: 8, price: 349.99, status: "low" },
    { id: 5, name: "Webcam Logitech C920", stock: 45, price: 79.99, status: "normal" },
  ]

  const recentAlerts = [
    { id: 1, message: "Mouse Logitech MX Master tiene stock bajo (5 unidades)", type: "warning", time: "Hace 2 horas" },
    { id: 2, message: 'Monitor Samsung 27" necesita reabastecimiento', type: "warning", time: "Hace 5 horas" },
    { id: 3, message: "Nuevo proveedor agregado: Tech Solutions SA", type: "info", time: "Hace 1 día" },
  ]

  return (
    <DashboardLayout user={user}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Bienvenido de nuevo, {user.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            const colorClasses = {
              blue: "bg-blue-600/20 text-blue-400",
              green: "bg-green-600/20 text-green-400",
              amber: "bg-amber-600/20 text-amber-400",
              purple: "bg-purple-600/20 text-purple-400",
            }

            return (
              <Card
                key={stat.title}
                className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-400" : "text-red-400"}>{stat.change}</span>
                    <span className="text-slate-500">vs mes anterior</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Productos Recientes */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Productos Recientes</CardTitle>
              <CardDescription className="text-slate-400">Últimos productos agregados al inventario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="text-sm text-slate-400">Stock: {product.stock} unidades</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${product.price}</p>
                      {product.status === "low" && <span className="text-xs text-amber-400">Stock bajo</span>}
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/products">
                <Button
                  variant="outline"
                  className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  Ver todos los productos
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Alertas Recientes */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Alertas del Sistema</CardTitle>
              <CardDescription className="text-slate-400">Notificaciones y eventos importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div
                      className={`p-2 rounded-lg h-fit ${
                        alert.type === "warning" ? "bg-amber-600/20" : "bg-blue-600/20"
                      }`}
                    >
                      <AlertCircle
                        className={`w-4 h-4 ${alert.type === "warning" ? "text-amber-400" : "text-blue-400"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{alert.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/alerts">
                <Button
                  variant="outline"
                  className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  Ver todas las alertas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
