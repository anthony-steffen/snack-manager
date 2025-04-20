import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Products from "./pages/products/Products"
import Ingredients from "./pages/Ingredients"
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
        <Route path="/home" element={<Home />} />
        <Route path="/ingredients" element={
          <ProtectedRoute>
            <Ingredients />
          </ProtectedRoute>
        } />
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
