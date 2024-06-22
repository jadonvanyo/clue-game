import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

// create context for authorization
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // set the user to the decoded jwt if it is in local storage
    const [user, setUser] = useState(() => localStorage.getItem(ACCESS_TOKEN) ? jwt_decode(localStorage.getItem(ACCESS_TOKEN)) : null);
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
        // set user and auth tokens and save auth tokens in local storage if access token was received
        if (response.data.access) {
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser
    };

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