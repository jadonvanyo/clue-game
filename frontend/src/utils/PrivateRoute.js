import { Navigate } from 'react-router-dom'
import { useState } from 'react'

const PrivateRoute = ({children, ...rest}) => {
    let [user, setUser] = useState(null)

    return !user ? <Navigate to='/login'/> : children;
}

export default PrivateRoute;