import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

// create context for authorization
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const navigate = useNavigate(); // Set navigate

    // set the user to the decoded jwt if it is in local storage
    const [user, setUser] = useState(() => localStorage.getItem(ACCESS_TOKEN) ? jwtDecode(localStorage.getItem(ACCESS_TOKEN)) : null);
    // create an object for the access and refresh tokens if they are in local storage
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem(ACCESS_TOKEN) ? {
        access: localStorage.getItem(ACCESS_TOKEN),
        refresh: localStorage.getItem(REFRESH_TOKEN)
    } : null);

    // function to login the user
    const loginUser = async (username, password) => {
        // get a response from the api given the username and password
        const response = await api.post('api/token/', {
            username,
            password
        });
        console.log(response)
        // set user and auth tokens and save auth tokens in local storage if access token was received
        if (response.data.access) {
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            navigate("/");
        }
    };
    // clear all auth tokens in state and local storage
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    };

    // TODO: Add registerUser

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser
    };

    // TODO: Update to follow protected route 
    useEffect(() => {
        if (authTokens) {
            const interval = setInterval(() => {
                api.post('token/refresh/', {
                    refresh: authTokens.refresh
                }).then((response) => {
                    setAuthTokens(prev => ({
                        ...prev,
                        access: response.data.access
                    }));
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                });
            }, 4 * 60 * 1000);
            return () => clearInterval(interval);
        }
    }, [authTokens]);

    // pass down the user and auth tokens to the children
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };