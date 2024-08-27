import React, { useEffect, useState } from 'react';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/appointments')
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <div>
      {appointments.map(appointment => (
        <div key={appointment._id}>
          <h3>{appointment.patientName}</h3>
          <p>Dentist: {appointment.dentistName}</p>
          <p>Date: {new Date(appointment.appointmentDate).toLocaleString()}</p>
          <p>Description: {appointment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
