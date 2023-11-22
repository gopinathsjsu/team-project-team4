import React, { useState } from 'react';
import Header from './Header';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Handle successful login here
                console.log('Logged in successfully');
                // Redirect or update state
            } else {
                // Handle errors or unsuccessful login attempts
                console.error('Failed to login');
            }
        } catch (error) {
            console.error('There was an error logging in:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="auth-container">
                <h2>Login to Movie Theatre</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="auth-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <div className="additional-info">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </div>
            </div>
        </>
    );
}

export default Login;
