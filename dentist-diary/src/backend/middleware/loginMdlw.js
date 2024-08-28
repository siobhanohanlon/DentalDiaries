const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Unauthorized if no token
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        // Forbidden if token is invalid
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;