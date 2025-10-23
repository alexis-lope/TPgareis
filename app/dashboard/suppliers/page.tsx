"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Truck, Mail, Phone } from "lucide-react"

export default function SuppliersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

  const suppliers = [
    {
      id: 1,
      name: "Tech Solutions SA",
      contact: "Juan Pérez",
      email: "contacto@techsolutions.com",
      phone: "+54 11 4567-8900",
      productsSupplied: 45,
      status: "active",
    },
    {
      id: 2,
      name: "Distribuidora Global",
      contact: "María González",
      email: "ventas@distglobal.com",
      phone: "+54 11 4567-8901",
      productsSupplied: 78,
      status: "active",
    },
    {
      id: 3,
      name: "Importadora del Sur",
      contact: "Carlos Rodríguez",
      email: "info@impsur.com",
      phone: "+54 11 4567-8902",
      productsSupplied: 23,
      status: "inactive",
    },
    {
      id: 4,
      name: "Electrónica Premium",
      contact: "Ana Martínez",
      email: "contacto@elpremium.com",
      phone: "+54 11 4567-8903",
      productsSupplied: 56,
      status: "active",
    },
  ]

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Proveedores</h1>
            <p className="text-slate-400">Gestiona tus proveedores y contactos</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Proveedor
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar proveedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredSuppliers.map((supplier) => (
            <Card
              key={supplier.id}
              className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <Truck className="w-6 h-6 text-purple-400" />
                  </div>
                  <Badge
                    variant={supplier.status === "active" ? "default" : "secondary"}
                    className={
                      supplier.status === "active"
                        ? "bg-green-600/20 text-green-400 border-green-600/30"
                        : "bg-slate-600/20 text-slate-400 border-slate-600/30"
                    }
                  >
                    {supplier.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
                <CardTitle className="text-white mt-4">{supplier.name}</CardTitle>
                <CardDescription className="text-slate-400">Contacto: {supplier.contact}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{supplier.phone}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400">Productos suministrados:</span>
                      <span className="text-white font-semibold">{supplier.productsSupplied}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600/30 text-red-400 hover:bg-red-600/20 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
