import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Products from "./pages/Products"
import { ProtectedRoute } from "./components/ProtectedRoute"
import ColorModeToggle from "./components/ColorModeToggle"
import AuthenticatedLayout from "./components/AuthenticatedLayout"

function App() {
  return (
    <Router>
      <ColorModeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
          />
      </Routes>
    </Router>
  )
}

export default App
