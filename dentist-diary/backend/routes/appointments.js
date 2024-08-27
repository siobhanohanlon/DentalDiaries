const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create an appointment
router.post('/appointments', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all appointments, with optional filtering by dentist name
router.get('/appointments', async (req, res) => {
  const { dentistName } = req.query;  // Capture the query parameter

  try {
    const query = dentistName ? { dentistName } : {}; // If dentistName is provided, use it to filter, otherwise get all
    const appointments = await Appointment.find(query);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an appointment
router.put('/appointments/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an appointment
router.delete('/appointments/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
