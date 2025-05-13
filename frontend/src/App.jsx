import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Products from "./pages/products/Products"
import Ingredients from "./pages/Ingredients"
import RegisterRecipesPage from "./pages/RegisterRecipesPage"
import RecipesPage from "./pages/RecipesPage"
import { ProtectedRoute } from "./components/ProtectedRoute"
import ColorModeToggle from "./components/ColorModeToggle"
import AuthPage from "./pages/AuthPage"

function App() {
  return (
    <Router>
      <ColorModeToggle />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={ <ProtectedRoute> <Products /> </ProtectedRoute> }/>
        <Route path="/ingredients" element={<ProtectedRoute> <Ingredients /> </ProtectedRoute>} />
        <Route path="/register-recipes" element={<ProtectedRoute> <RegisterRecipesPage /> </ProtectedRoute>} />
        <Route path="/recipes" element={<ProtectedRoute> <RecipesPage /> </ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
