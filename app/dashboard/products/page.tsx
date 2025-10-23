"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Package } from "lucide-react"

export default function ProductsPage() {
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

  const products = [
    {
      id: 1,
      name: "Laptop Dell XPS 15",
      sku: "LAP-001",
      category: "Computadoras",
      stock: 15,
      price: 1299.99,
      status: "normal",
    },
    {
      id: 2,
      name: "Mouse Logitech MX Master",
      sku: "MOU-002",
      category: "Accesorios",
      stock: 5,
      price: 99.99,
      status: "low",
    },
    {
      id: 3,
      name: "Teclado Mecánico RGB",
      sku: "KEY-003",
      category: "Accesorios",
      stock: 32,
      price: 149.99,
      status: "normal",
    },
    {
      id: 4,
      name: 'Monitor Samsung 27"',
      sku: "MON-004",
      category: "Monitores",
      stock: 8,
      price: 349.99,
      status: "low",
    },
    {
      id: 5,
      name: "Webcam Logitech C920",
      sku: "WEB-005",
      category: "Accesorios",
      stock: 45,
      price: 79.99,
      status: "normal",
    },
    {
      id: 6,
      name: "Auriculares Sony WH-1000XM4",
      sku: "AUD-006",
      category: "Audio",
      stock: 22,
      price: 349.99,
      status: "normal",
    },
    {
      id: 7,
      name: "SSD Samsung 1TB",
      sku: "SSD-007",
      category: "Almacenamiento",
      stock: 3,
      price: 129.99,
      status: "critical",
    },
    {
      id: 8,
      name: "Router TP-Link AX3000",
      sku: "NET-008",
      category: "Redes",
      stock: 18,
      price: 89.99,
      status: "normal",
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Productos</h1>
            <p className="text-slate-400">Gestiona el inventario de productos</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre, SKU o categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Package className="w-6 h-6 text-blue-400" />
                  </div>
                  <Badge
                    variant={
                      product.status === "critical" ? "destructive" : product.status === "low" ? "secondary" : "default"
                    }
                    className={
                      product.status === "critical"
                        ? "bg-red-600/20 text-red-400 border-red-600/30"
                        : product.status === "low"
                          ? "bg-amber-600/20 text-amber-400 border-amber-600/30"
                          : "bg-green-600/20 text-green-400 border-green-600/30"
                    }
                  >
                    {product.status === "critical" ? "Crítico" : product.status === "low" ? "Stock Bajo" : "Normal"}
                  </Badge>
                </div>
                <CardTitle className="text-white mt-4">{product.name}</CardTitle>
                <CardDescription className="text-slate-400">
                  SKU: {product.sku} • {product.category}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Stock:</span>
                    <span className="text-white font-semibold">{product.stock} unidades</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Precio:</span>
                    <span className="text-white font-semibold text-lg">${product.price}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No se encontraron productos</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
