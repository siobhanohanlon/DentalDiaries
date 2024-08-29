// Model
const User = require('../models/user');

// Hashing & comparing passwords
const bcrypt = require('bcrypt');
// Json Webtokens used to authorise pages
const jwt = require('jsonwebtoken');

// LogIn
exports.login = async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    try {
        // Find a user in the database with the given username
        const user = await User.findOne({ username });

        // If Username isnt correct
        if (!user) return res.status(401).json({ message: 'Invalid username or password' });

        // If Password isnt correct to database stored password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

        // If the password matches, create a JWT token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Respond with the generated JWT token
        res.json({ token });
    } catch (error) {
        // Log to Console
        console.error("Error with login:", error);

        // Error Handling
        res.status(500).json({ message: 'Internal server error' });
    }
};