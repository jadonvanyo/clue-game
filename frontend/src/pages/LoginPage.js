import React from 'react'

const LoginPage = () => {

    let loginUser = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="password" name="password" placeholder="enter password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage