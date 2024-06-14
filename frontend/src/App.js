import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import PrivateRoute from './utils/PrivateRoute'


function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;