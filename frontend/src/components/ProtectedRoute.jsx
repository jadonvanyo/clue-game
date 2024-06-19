// Wrapper for protected routes

import {Navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({children}) {
    //  Set the initial authorization to null
    const [isAuthorized, setIsAuthorized] = useState(null)

    // Attempt to use `auth` function as soon as a ProtectedRoute is loaded
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // Automatically refresh the access token
    const refreshToken = async () => {
        // Get the refresh token from local storage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            // Make api call to get new access and refresh token using current refresh token
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            // Successful api call
            if (res.status === 200) {
                // Store the new access token in local storage and authorize the user
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            // Unsuccessful api call, unauthorized the user
            } else {
                setIsAuthorized(false)
            }
        // Set user as not authorized if errors arise
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    // Check if the access token needs to be refreshed
    const auth = async () => {
        // Look for access token in local storage
        const token = localStorage.getItem(ACCESS_TOKEN)
        // Determine if there is a token
        if (!token) {
            setIsAuthorized(false)
            return
        }
        // Decode access token to get the expiration time
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        // Determine the current time in seconds
        const now = Date.now() / 1000

        // Refresh the access token if it is expired
        if (tokenExpiration < now) {
            await refreshToken()
        // Token is not expired, user still authorized
        } else {
            setIsAuthorized(true)
        }
    }

    // Display a loading message until authorization can be determined
    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    // Return the wrapped child if authorized and return the user to login otherwise
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute