import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Products from "./pages/products/Products"
import Ingredients from "./pages/Ingredients"
import RecipesPage from "./pages/RecipesPage"
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
        <Route path="/products" element={ <ProtectedRoute> <Products /> </ProtectedRoute> }/>
        <Route path="/ingredients" element={<ProtectedRoute> <Ingredients /> </ProtectedRoute>} />
        <Route path="/recipes" element={<ProtectedRoute> <RecipesPage /> </ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
