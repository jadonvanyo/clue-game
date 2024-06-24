// Navigate between different pages using react router dom

import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import useLocalStorage from 'use-local-storage'
import './styles/App.css'
import { AuthContext } from './context/AuthContext'
import Logout from './components/Logout'

// Specify routes to navigate between
function App() {

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const { user } = useContext(AuthContext);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Navbar isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      <Routes>
        <Route
          path="/" 
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App;