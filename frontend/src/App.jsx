// Navigate between different pages using react router dom

import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// Clear tokens from local storage and return user to the login page
function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

// Clear any old lingering tokens from local storage and return user to the register page
function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

// Specify routes to navigate between
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App