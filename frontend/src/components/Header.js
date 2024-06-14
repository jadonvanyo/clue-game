import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    let [user, setUser] = useState(null)
    let logoutUser = (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ? (
                <p onClick={logoutUser}>Logout</p>
            ) : (
                <Link to="/login" >Login</Link>
            )}
            {user && <p>Hello {user.username}!</p>}

        </div>
    )
}

export default Header