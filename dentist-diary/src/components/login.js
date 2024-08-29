// Imports
import axios from 'axios';
import React from 'react';

// Define the Login
export class Login extends React.Component {
    // Constructor
    constructor(props) {
        // Call parent
        super(props);

        this.state = {
            username: '',
            password: '',
            error: '',
        };
    }

    // Method to handle login
    handleLogin = async (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        try {
            // Make a POST request
            const response = await axios.post('http://localhost:3000/api/login', { username, password });

            // Save the received token in local storage- this will give authorisation
            localStorage.setItem('token', response.data.token);
            this.props.onLogin();
        } catch (err) {
            // Show error
            this.setState({ error: 'Invalid username or password' });
    };
}

    // Methods to handle changes in username or password
    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    // Display
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