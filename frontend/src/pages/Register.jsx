import Form from "../components/Form"

function Register() {
    // return the register form using the register api route
    return <Form route="/api/user/register/" method="register" />
}

export default Register