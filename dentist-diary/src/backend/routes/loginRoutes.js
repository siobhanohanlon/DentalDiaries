const express = require('express');
const router = express.Router();
const loginControl = require('../controllers/loginController');

router.post('/login', loginControl.login);

module.exports = router;