// Mongoose- To connect to my database
const mongoose = require('mongoose');

// Define Schemas
const appointmentSchema = new mongoose.Schema({
    patient: { type: String, required: true },
    dentist: { type: String, required: true },
    date: { type: Date, required: true },
    endDate: { type: Date },
    duration: { type: Number }
});

//Model to interact with database
const Appointment = mongoose.model('listAppointments', appointmentSchema);

module.exports = Appointment;