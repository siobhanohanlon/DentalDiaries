// Imports
import axios from 'axios';
import React from 'react';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
        };
    }

    handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        try {
            const response = await axios.post('http://localhost:3000/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            this.props.onLogin();
        } catch (err) {
            setError('Invalid username or password');}
    };

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    render() {
        const { username, password, error } = this.state;

        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleLogin}>
                    <input type="text" placeholder="Username" value={username} onChange={this.handleUsernameChange} />
                    <input type="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} />
                    <button type="submit">Login</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        );
    }
}