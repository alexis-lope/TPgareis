"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, FolderOpen } from "lucide-react"

export default function CategoriesPage() {
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

  const categories = [
    { id: 1, name: "Computadoras", description: "Laptops, desktops y tablets", productCount: 45, color: "blue" },
    { id: 2, name: "Accesorios", description: "Mouse, teclados y periféricos", productCount: 128, color: "green" },
    { id: 3, name: "Monitores", description: "Pantallas y displays", productCount: 32, color: "purple" },
    { id: 4, name: "Audio", description: "Auriculares y parlantes", productCount: 56, color: "amber" },
    { id: 5, name: "Almacenamiento", description: "Discos duros y SSDs", productCount: 78, color: "red" },
    { id: 6, name: "Redes", description: "Routers y switches", productCount: 23, color: "cyan" },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const colorClasses = {
    blue: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    green: "bg-green-600/20 text-green-400 border-green-600/30",
    purple: "bg-purple-600/20 text-purple-400 border-purple-600/30",
    amber: "bg-amber-600/20 text-amber-400 border-amber-600/30",
    red: "bg-red-600/20 text-red-400 border-red-600/30",
    cyan: "bg-cyan-600/20 text-cyan-400 border-cyan-600/30",
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Categorías</h1>
            <p className="text-slate-400">Organiza tus productos por categorías</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Nueva Categoría
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Card
              key={category.id}
              className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all"
            >
              <CardHeader>
                <div className={`p-3 rounded-lg w-fit ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                  <FolderOpen className="w-6 h-6" />
                </div>
                <CardTitle className="text-white mt-4">{category.name}</CardTitle>
                <CardDescription className="text-slate-400">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Productos:</span>
                    <span className="text-white font-semibold">{category.productCount}</span>
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
      </div>
    </DashboardLayout>
  )
}
