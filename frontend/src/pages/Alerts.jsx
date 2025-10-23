"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, CheckCircle, Package } from "lucide-react"
import api from "../services/api"
import { toast } from "sonner"

const Alerts = () => {
  const [alerts, setAlerts] = useState([])
  const [lowStockProducts, setLowStockProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlerts()
    fetchLowStockProducts()
  }, [])

  const fetchAlerts = async () => {
    try {
      const response = await api.get("/dashboard/alerts")
      setAlerts(response.data.data)
    } catch (error) {
      toast.error("Error al cargar alertas")
    } finally {
      setLoading(false)
    }
  }

  const fetchLowStockProducts = async () => {
    try {
      const response = await api.get("/products/alerts/low-stock")
      setLowStockProducts(response.data.data)
    } catch (error) {
      console.error("Error al cargar productos con stock bajo")
    }
  }

  const markAsRead = async (id) => {
    try {
      await api.put(`/dashboard/alerts/${id}/read`)
      toast.success("Alerta marcada como leída")
      fetchAlerts()
    } catch (error) {
      toast.error("Error al marcar alerta")
    }
  }

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
        <h1 className="text-3xl font-bold mb-2">Alertas del Sistema</h1>
        <p className="text-muted-foreground">Notificaciones y productos con stock bajo</p>
      </div>

      {/* Productos con stock bajo */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <AlertTriangle className="text-destructive" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Productos con Stock Bajo</h2>
            <p className="text-sm text-muted-foreground">{lowStockProducts.length} productos necesitan reposición</p>
          </div>
        </div>

        {lowStockProducts.length > 0 ? (
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <Package size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">{product.nombre}</p>
                    <p className="text-sm text-muted-foreground">Código: {product.codigo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Stock Actual</p>
                  <p className="text-lg font-bold text-destructive">
                    {product.stock_actual} / {product.stock_minimo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto mb-3 text-accent" size={48} />
            <p className="text-muted-foreground">Todos los productos tienen stock suficiente</p>
          </div>
        )}
      </div>

      {/* Alertas del sistema */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Historial de Alertas</h2>

        {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-4 flex-1">
                  <AlertTriangle size={20} className="text-destructive mt-1" />
                  <div className="flex-1">
                    <p className="font-medium">{alert.producto_nombre}</p>
                    <p className="text-sm text-muted-foreground mt-1">{alert.mensaje}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(alert.created_at).toLocaleString("es-AR")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => markAsRead(alert.id)}
                  className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Marcar leída
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto mb-3 text-accent" size={48} />
            <p className="text-muted-foreground">No hay alertas pendientes</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Alerts
