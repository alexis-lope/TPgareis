"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Package, FolderTree, Truck, AlertTriangle, DollarSign, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import api from "../services/api"
import { toast } from "sonner"

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [topProducts, setTopProducts] = useState([])
  const [stockByCategory, setStockByCategory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, topProductsRes, stockRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/top-products"),
        api.get("/dashboard/charts/stock-by-category"),
      ])

      setStats(statsRes.data.data)
      setTopProducts(topProductsRes.data.data)
      setStockByCategory(stockRes.data.data)
    } catch (error) {
      toast.error("Error al cargar datos del dashboard")
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Resumen general del inventario</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Package}
          title="Total Productos"
          value={stats?.totalProductos || 0}
          color="bg-primary"
          link="/products"
        />
        <StatCard
          icon={FolderTree}
          title="Categorías"
          value={stats?.totalCategorias || 0}
          color="bg-accent"
          link="/categories"
        />
        <StatCard
          icon={Truck}
          title="Proveedores"
          value={stats?.totalProveedores || 0}
          color="bg-secondary"
          link="/suppliers"
        />
        <StatCard
          icon={AlertTriangle}
          title="Stock Bajo"
          value={stats?.productosStockBajo || 0}
          color="bg-destructive"
          link="/alerts"
        />
        <StatCard
          icon={DollarSign}
          title="Valor Inventario"
          value={`$${(stats?.valorInventario || 0).toFixed(2)}`}
          color="bg-accent"
        />
        <StatCard
          icon={TrendingUp}
          title="Alertas Pendientes"
          value={stats?.alertasNoLeidas || 0}
          color="bg-destructive"
          link="/alerts"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productos más vendidos */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Productos Más Vendidos (30 días)</h2>
          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="nombre" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#141414", border: "1px solid #27272a" }}
                  labelStyle={{ color: "#fafafa" }}
                />
                <Bar dataKey="total_salidas" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">No hay datos disponibles</p>
          )}
        </div>

        {/* Stock por categoría */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Stock por Categoría</h2>
          {stockByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockByCategory}
                  dataKey="stock_total"
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {stockByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#141414", border: "1px solid #27272a" }}
                  labelStyle={{ color: "#fafafa" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">No hay datos disponibles</p>
          )}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, title, value, color, link }) => {
  const content = (
    <div className={`${color} rounded-lg p-6 text-white transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <Icon size={32} />
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <h3 className="text-lg font-medium opacity-90">{title}</h3>
    </div>
  )

  return link ? <Link to={link}>{content}</Link> : content
}

export default Dashboard
