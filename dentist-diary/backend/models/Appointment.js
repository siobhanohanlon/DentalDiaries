const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  dentistName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
