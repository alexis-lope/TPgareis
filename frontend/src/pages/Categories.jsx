"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, X } from "lucide-react"
import api from "../services/api"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext"

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({ nombre: "", descripcion: "" })
  const { hasAnyRole } = useAuth()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories")
      setCategories(response.data.data)
    } catch (error) {
      toast.error("Error al cargar categorías")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, formData)
        toast.success("Categoría actualizada exitosamente")
      } else {
        await api.post("/categories", formData)
        toast.success("Categoría creada exitosamente")
      }
      closeModal()
      fetchCategories()
    } catch (error) {
      toast.error("Error al guardar categoría")
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({ nombre: category.nombre, descripcion: category.descripcion || "" })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return

    try {
      await api.delete(`/categories/${id}`)
      toast.success("Categoría eliminada exitosamente")
      fetchCategories()
    } catch (error) {
      toast.error("Error al eliminar categoría")
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingCategory(null)
    setFormData({ nombre: "", descripcion: "" })
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
          <h1 className="text-3xl font-bold mb-2">Categorías</h1>
          <p className="text-muted-foreground">Organiza tus productos por categorías</p>
        </div>
        {hasAnyRole("admin", "gestor") && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            <span>Nueva Categoría</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold">{category.nombre}</h3>
              {hasAnyRole("admin", "gestor") && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  {hasAnyRole("admin") && (
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="text-muted-foreground">{category.descripcion || "Sin descripción"}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingCategory ? "Editar Categoría" : "Nueva Categoría"}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {editingCategory ? "Actualizar" : "Crear"}
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

export default Categories
