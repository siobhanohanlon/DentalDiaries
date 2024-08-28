// Imports
import axios from 'axios';
import React, { useState } from 'react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            onLogin();
        } catch (err) {
            setError('Invalid username or password');}
    };

    return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
    </div>
    );
}

export default Login;