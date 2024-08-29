const express = require('express');
const router = express.Router();
const loginControl = require('../controllers/loginController');

// Define a route for handling POST requests to the '/login' path
// Handle the request with the 'login' function from 'loginControl'
router.post('/login', loginControl.login);

module.exports = router;