const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret';

// Middleware function to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    // Retrieve the 'authorization' header from the request
    const authHeader = req.headers['authorization'];

    // Extract the token
    const token = authHeader && authHeader.split(' ')[1];

    // Unauthorized if no token
    if (!token) return res.sendStatus(401);

    // Verify the provided token using the secret key
    jwt.verify(token, secretKey, (err, user) => {
        // Forbidden if token is invalid
        if (err) return res.sendStatus(403);

        // Token is valid
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;