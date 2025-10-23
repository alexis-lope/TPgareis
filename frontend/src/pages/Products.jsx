"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Edit, Trash2, AlertCircle } from "lucide-react"
import api from "../services/api"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext"

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(null)
  const { hasAnyRole } = useAuth()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [page, search, categoryFilter])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products", {
        params: { page, limit: 10, search, categoria: categoryFilter },
      })
      setProducts(response.data.data)
      setPagination(response.data.pagination)
    } catch (error) {
      toast.error("Error al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories")
      setCategories(response.data.data)
    } catch (error) {
      console.error("Error al cargar categorías")
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return

    try {
      await api.delete(`/products/${id}`)
      toast.success("Producto eliminado exitosamente")
      fetchProducts()
    } catch (error) {
      toast.error("Error al eliminar producto")
    }
  }

  const getStockStatus = (product) => {
    if (product.stock_actual <= product.stock_minimo) {
      return { text: "Stock Bajo", color: "text-destructive" }
    }
    return { text: "Stock Normal", color: "text-accent" }
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
          <h1 className="text-3xl font-bold mb-2">Productos</h1>
          <p className="text-muted-foreground">Gestiona el inventario de productos</p>
        </div>
        {hasAnyRole("admin", "gestor") && (
          <Link
            to="/products/new"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            <span>Nuevo Producto</span>
          </Link>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value)
              setPage(1)
            }}
            className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearch("")
              setCategoryFilter("")
              setPage(1)
            }}
            className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Código</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Categoría</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Precio Venta</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                {hasAnyRole("admin", "gestor") && (
                  <th className="px-6 py-3 text-right text-sm font-semibold">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => {
                const stockStatus = getStockStatus(product)
                return (
                  <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono">{product.codigo}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{product.nombre}</p>
                        {product.descripcion && (
                          <p className="text-sm text-muted-foreground truncate max-w-xs">{product.descripcion}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.categoria_nombre || "-"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.stock_actual}</span>
                        {product.stock_actual <= product.stock_minimo && (
                          <AlertCircle size={16} className="text-destructive" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">${product.precio_venta}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${stockStatus.color}`}>{stockStatus.text}</span>
                    </td>
                    {hasAnyRole("admin", "gestor") && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/products/edit/${product.id}`}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Link>
                          {hasAnyRole("admin") && (
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Mostrando {products.length} de {pagination.total} productos
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
    </div>
  )
}

export default Products
