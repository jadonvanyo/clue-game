// Navigate between different pages using react router dom

import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import useLocalStorage from 'use-local-storage'
import './styles/App.css'
import Logout from './components/Logout'
import JoinGame from './pages/JoinGame'
import Room from './pages/Room'
import ProtectedRoute from './components/ProtectedRoute'

// Specify routes to navigate between
function App() {

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Navbar isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/joingame" element={<ProtectedRoute><JoinGame /></ProtectedRoute>} />
        <Route path="/room/:roomName" element={<ProtectedRoute><Room /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App;