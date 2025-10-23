import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"

// Páginas públicas
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

// Páginas protegidas
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import ProductForm from "./pages/ProductForm"
import Categories from "./pages/Categories"
import Suppliers from "./pages/Suppliers"
import Movements from "./pages/Movements"
import Users from "./pages/Users"
import Profile from "./pages/Profile"
import Alerts from "./pages/Alerts"

function App() {
  return (
    <Router>
  <AuthProvider>
    <Toaster position="top-right" richColors />
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
        <Route path="categories" element={<Categories />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="movements" element={<Movements />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="profile" element={<Profile />} />

        {/* Ruta solo para admin */}
        <Route
          path="users"
          element={
            <ProtectedRoute requiredRole="admin">
              <Users />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </AuthProvider>
</Router>

  )
}

export default App
