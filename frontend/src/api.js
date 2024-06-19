import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

// Import base url to the api from the environment file
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        // Look for access token in local storage
        const token = localStorage.getItem(ACCESS_TOKEN);
        // Add token to header if it exists
        if (token) {
            // Create authorization header
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    // Handle if an error occurs while accessing a token
    (error) => {
        return Promise.reject(error)
    }
)

export default api