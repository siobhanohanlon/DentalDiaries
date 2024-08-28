// Mongoose- To connect to my database
const mongoose = require('mongoose');

// Define Schemas
const appointmentSchema = new mongoose.Schema({
    patient: String,
    dentist: String,
    date: String
});

//Model to interact with database
const Appointment = mongoose.model('listAppointments', appointmentSchema);

module.exports = Appointment;