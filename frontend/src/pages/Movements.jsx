"use client"

import { useEffect, useState } from "react"
import { Plus, X, ArrowUp, ArrowDown, RefreshCw } from "lucide-react"
import api from "../services/api"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext"

const Movements = () => {
  const [movements, setMovements] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(null)
  const { hasAnyRole } = useAuth()

  const [formData, setFormData] = useState({
    producto_id: "",
    tipo_movimiento: "entrada",
    cantidad: "",
    motivo: "",
  })

  useEffect(() => {
    fetchMovements()
    fetchProducts()
  }, [page])

  const fetchMovements = async () => {
    try {
      const response = await api.get("/movements", { params: { page, limit: 20 } })
      setMovements(response.data.data)
      setPagination(response.data.pagination)
    } catch (error) {
      toast.error("Error al cargar movimientos")
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products", { params: { limit: 1000 } })
      setProducts(response.data.data)
    } catch (error) {
      console.error("Error al cargar productos")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/movements", formData)
      toast.success("Movimiento registrado exitosamente")
      closeModal()
      fetchMovements()
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al registrar movimiento")
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setFormData({ producto_id: "", tipo_movimiento: "entrada", cantidad: "", motivo: "" })
  }

  const getMovementIcon = (tipo) => {
    switch (tipo) {
      case "entrada":
        return <ArrowDown className="text-accent" size={20} />
      case "salida":
        return <ArrowUp className="text-destructive" size={20} />
      case "ajuste":
        return <RefreshCw className="text-primary" size={20} />
      default:
        return null
    }
  }

  const getMovementColor = (tipo) => {
    switch (tipo) {
      case "entrada":
        return "text-accent"
      case "salida":
        return "text-destructive"
      case "ajuste":
        return "text-primary"
      default:
        return ""
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Movimientos de Inventario</h1>
          <p className="text-muted-foreground">Historial de entradas, salidas y ajustes</p>
        </div>
        {hasAnyRole("admin", "gestor") && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            <span>Registrar Movimiento</span>
          </button>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Producto</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Tipo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Cantidad</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Stock Anterior</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Stock Nuevo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Usuario</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {movements.map((movement) => (
                <tr key={movement.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm">{new Date(movement.created_at).toLocaleString("es-AR")}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{movement.producto_nombre}</p>
                      <p className="text-sm text-muted-foreground">{movement.producto_codigo}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getMovementIcon(movement.tipo_movimiento)}
                      <span className={`font-medium capitalize ${getMovementColor(movement.tipo_movimiento)}`}>
                        {movement.tipo_movimiento}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{movement.cantidad}</td>
                  <td className="px-6 py-4 text-muted-foreground">{movement.stock_anterior}</td>
                  <td className="px-6 py-4 font-medium">{movement.stock_nuevo}</td>
                  <td className="px-6 py-4 text-sm">{movement.usuario_nombre}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{movement.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Mostrando {movements.length} de {pagination.total} movimientos
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <span className="px-4 py-2">
                Página {page} de {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Registrar Movimiento</h2>
              <button onClick={closeModal} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Producto <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.producto_id}
                  onChange={(e) => setFormData({ ...formData, producto_id: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="">Seleccionar producto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.nombre} ({product.codigo}) - Stock: {product.stock_actual}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tipo de Movimiento <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.tipo_movimiento}
                  onChange={(e) => setFormData({ ...formData, tipo_movimiento: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="entrada">Entrada</option>
                  <option value="salida">Salida</option>
                  <option value="ajuste">Ajuste</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Cantidad <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  value={formData.cantidad}
                  onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                  min="1"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                {formData.tipo_movimiento === "ajuste" && (
                  <p className="text-xs text-muted-foreground mt-1">Para ajuste, ingresa el nuevo stock total</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Motivo <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Describe el motivo del movimiento..."
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Registrar
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-muted text-foreground py-2 rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Movements
