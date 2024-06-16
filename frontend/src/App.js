import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedComponent from './components/ProtectedComponent';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import withAuth from './components/withAuth';


function App() {
    return (
        <Router>
            <div>
            <NavBar />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/protected" element={<ProtectedComponent />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;