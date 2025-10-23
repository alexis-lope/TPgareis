"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, X, Mail, Phone, MapPin } from "lucide-react"
import api from "../services/api"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext"

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState(null)
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    email: "",
    direccion: "",
  })
  const { hasAnyRole } = useAuth()

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const response = await api.get("/suppliers")
      setSuppliers(response.data.data)
    } catch (error) {
      toast.error("Error al cargar proveedores")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingSupplier) {
        await api.put(`/suppliers/${editingSupplier.id}`, formData)
        toast.success("Proveedor actualizado exitosamente")
      } else {
        await api.post("/suppliers", formData)
        toast.success("Proveedor creado exitosamente")
      }
      closeModal()
      fetchSuppliers()
    } catch (error) {
      toast.error("Error al guardar proveedor")
    }
  }

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier)
    setFormData({
      nombre: supplier.nombre,
      contacto: supplier.contacto || "",
      telefono: supplier.telefono || "",
      email: supplier.email || "",
      direccion: supplier.direccion || "",
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este proveedor?")) return

    try {
      await api.delete(`/suppliers/${id}`)
      toast.success("Proveedor eliminado exitosamente")
      fetchSuppliers()
    } catch (error) {
      toast.error("Error al eliminar proveedor")
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingSupplier(null)
    setFormData({ nombre: "", contacto: "", telefono: "", email: "", direccion: "" })
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
          <h1 className="text-3xl font-bold mb-2">Proveedores</h1>
          <p className="text-muted-foreground">Gestiona tus proveedores</p>
        </div>
        {hasAnyRole("admin", "gestor") && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            <span>Nuevo Proveedor</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold">{supplier.nombre}</h3>
              {hasAnyRole("admin", "gestor") && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  {hasAnyRole("admin") && (
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              {supplier.contacto && (
                <p className="text-muted-foreground">
                  <strong>Contacto:</strong> {supplier.contacto}
                </p>
              )}
              {supplier.telefono && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={16} />
                  <span>{supplier.telefono}</span>
                </div>
              )}
              {supplier.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={16} />
                  <span>{supplier.email}</span>
                </div>
              )}
              {supplier.direccion && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>{supplier.direccion}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingSupplier ? "Editar Proveedor" : "Nuevo Proveedor"}</h2>
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
                <label className="block text-sm font-medium mb-2">Persona de Contacto</label>
                <input
                  type="text"
                  value={formData.contacto}
                  onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Dirección</label>
                <textarea
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {editingSupplier ? "Actualizar" : "Crear"}
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

export default Suppliers
