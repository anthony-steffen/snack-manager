import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ColorModeToggle from "./components/ColorModeToggle"

function App() {
  return (
    <Router>
      <ColorModeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
