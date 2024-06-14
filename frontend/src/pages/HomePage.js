import React from 'react'

const HomePage = () => {
    const isAuthenticated = false;
    return (
        isAuthenticated ? (
        <div>
            <p>You are logged in to the homepage!</p>
        </div>
        ):(
        <div>
            <p>You are not logged in, redirecting...</p>
        </div>
        )
    )
}

export default HomePage