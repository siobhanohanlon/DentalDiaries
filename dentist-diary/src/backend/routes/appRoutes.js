const express = require('express');
const router = express.Router();
const appControl = require('../controllers/appController');
const authenticateToken = require('../middleware/loginMdlw');

// Define a route for handling requests to the root path ('/')
// Use the 'authenticateToken' middleware to ensure the request is authenticated
// Handle the request with the 'getAppointments' function from 'appControl'
router.get('/', authenticateToken, appControl.getAppointments);
router.post('/', authenticateToken, appControl.createAppointment);
router.get('/:id', authenticateToken, appControl.getAppointmentById);
router.put('/:id', authenticateToken, appControl.updateAppointmentById);
router.delete('/:id', authenticateToken, appControl.deleteAppointmentById);

module.exports = router;