const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// LogIn
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        // If Username isnt correct
        if (!user) return res.status(401).json({ message: 'Invalid username ' });

        // If Password isnt correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

        // If the password matches, create a JWT token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        // Log to Console
        console.error("Error with login:", error);

        // Error Handling
        res.status(500).json({ message: 'Internal server error' });
    }
};