import React, { useState } from 'react';

const AppointmentForm = ({ fetchAppointments }) => {
  const [patientName, setPatientName] = useState('');
  const [dentistName, setDentistName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAppointment = { patientName, dentistName, appointmentDate, description };

    try {
      await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment)
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient Name" required />
      <input type="text" value={dentistName} onChange={(e) => setDentistName(e.target.value)} placeholder="Dentist Name" required />
      <input type="datetime-local" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <button type="submit">Add Appointment</button>
    </form>
  );
};

export default AppointmentForm;
