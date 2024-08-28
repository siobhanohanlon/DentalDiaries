import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const WeeklyCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [dentist, setDentist] = useState('All');
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    dentistName: '',
    appointmentDate: ''
  });

  // Predefined list of dentists
  const dentists = ['Dr. Smith', 'Dr. Johnson', 'Dr. Brown'];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const query = dentist !== 'All' ? `?dentistName=${dentist}` : '';
        const response = await fetch(`http://localhost:3000/api/appointments${query}`);
        if (response.ok) {
          const data = await response.json();
          // Log fetched appointments for debugging
          console.log('Fetched appointments:', data);
          setAppointments(data.map(appointment => ({
            title: `${appointment.patientName} - ${appointment.dentistName}`,
            start: new Date(appointment.appointmentDate),
            end: new Date(new Date(appointment.appointmentDate).getTime() + 30 * 60000),
          })));
        } else {
          console.error('Error fetching appointments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [dentist]);

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment)
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Created appointment:', data);
        setAppointments([...appointments, {
          title: `${data.patientName} - ${data.dentistName}`,
          start: new Date(data.appointmentDate),
          end: new Date(new Date(data.appointmentDate).getTime() + 30 * 60000),
        }]);
        setNewAppointment({ patientName: '', dentistName: '', appointmentDate: '' });
      } else {
        console.error('Error creating appointment:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div>
      <h2>Weekly Calendar</h2>
      <div>
        <label htmlFor="dentistSelect">Filter by Dentist: </label>
        <select id="dentistSelect" value={dentist} onChange={e => setDentist(e.target.value)}>
          <option value="All">All</option>
          {dentists.map(dentistName => (
            <option key={dentistName} value={dentistName}>{dentistName}</option>
          ))}
        </select>
      </div>
      <div>
        <h3>Add New Appointment</h3>
        <form onSubmit={handleCreateAppointment}>
          <input
            type="text"
            placeholder="Patient Name"
            value={newAppointment.patientName}
            onChange={e => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
            required
          />
          <select
            value={newAppointment.dentistName}
            onChange={e => setNewAppointment({ ...newAppointment, dentistName: e.target.value })}
            required
          >
            <option value="">Select Dentist</option>
            {dentists.map(dentistName => (
              <option key={dentistName} value={dentistName}>{dentistName}</option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={newAppointment.appointmentDate}
            onChange={e => setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })}
            required
          />
          <button type="submit">Add Appointment</button>
        </form>
      </div>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        style={{ height: 500, margin: '50px' }}
      />
    </div>
  );
};

export default WeeklyCalendar;