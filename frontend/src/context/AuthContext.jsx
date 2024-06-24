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
            // TODO: move navigate out of here
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

    useEffect(() => {
        // determine if there are authTokens in local storage
        if (authTokens) {
            // set an api call to refresh the access token every 4 minutes
            const interval = setInterval(() => {
                // request new access token from api using refresh token
                api.post('api/token/refresh/', {
                    refresh: authTokens.refresh
                // if request was successful update access token and local storage with new access token
                }).then((response) => {
                    // update auth tokens
                    setAuthTokens(prev => ({
                        ...prev,
                        access: response.data.access
                    }));
                    // update local storage
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    console.log(response.data);
                // log any errors and logout user if an error occurs
                }).catch((error) => {
                    console.error('Failed to refresh token', error);
                    logoutUser();
                });
            }, 4 * 60 * 1000);
            // clear interval to prevent memory leaks
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