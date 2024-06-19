import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

// route: directory for api backend
// method: login or register
function Form({ route, method }) {
    // Set initial username and password to nothing
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Set the initial loading state to false
    
    const navigate = useNavigate(); // Set navigate

    
    const name = method === "login" ? "Login" : "Register"; // Set the name for the form

    // Prevent from submitting the form and reloading the page
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            // make API call with the username and password
            const res = await api.post(route, { username, password })
            // get tokens and navigate to the home page for login
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            // navigate to the login page for register
            } else {
                navigate("/login")
            }
        // alert the user if there are any login issues
        } catch (error) {
            alert(error)
        // set loading to false after all functions completed
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // set username to whatever was typed
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // set password to whatever was typed
            placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form