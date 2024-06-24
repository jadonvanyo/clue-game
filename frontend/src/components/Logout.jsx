import React, { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
    const { logoutUser } = useContext(AuthContext);

    useEffect(() => {
        console.log('Run useEffect')
        logoutUser();
    }, [logoutUser]);

    return <Navigate to="/login"/>;
};

export default Logout;