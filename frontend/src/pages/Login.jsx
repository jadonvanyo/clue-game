import Form from "../components/Form"

function Login() {
    // return the login form using the token api route
    return <Form route="api/token/" method="login" />
}

export default Login