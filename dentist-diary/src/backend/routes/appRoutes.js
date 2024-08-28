const express = require('express');
const router = express.Router();
const appControl = require('../controllers/appController');
const authenticateToken = require('../middleware/loginMdlw');

router.get('/', authenticateToken, appControl.getAppointments);
router.post('/', authenticateToken, appControl.createAppointment);
router.get('/:id', authenticateToken, appControl.getAppointmentById);
router.put('/:id', authenticateToken, appControl.updateAppointmentById);
router.delete('/:id', authenticateToken, appControl.deleteAppointmentById);

module.exports = router;