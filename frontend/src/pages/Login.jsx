import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Form from '../components/Form';

const Login = () => {
    return (
        <Form method='login' />
    );
};

export default Login;