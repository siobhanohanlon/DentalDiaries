import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const WeeklyCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [dentist, setDentist] = useState('All');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const query = dentist !== 'All' ? `?dentistName=${dentist}` : '';
        const response = await fetch(`http://localhost:5000/api/appointments${query}`);
        const data = await response.json();
        setAppointments(data.map(appointment => ({
          title: `${appointment.patientName} - ${appointment.dentistName}`,
          start: new Date(appointment.appointmentDate),
          end: new Date(new Date(appointment.appointmentDate).getTime() + 30 * 60000),
        })));
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [dentist]);

  return (
    <div>
      <h2>Weekly Calendar</h2>
      <div>
        <label htmlFor="dentistSelect">Filter by Dentist: </label>
        <select id="dentistSelect" value={dentist} onChange={e => setDentist(e.target.value)}>
          <option value="All">All</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
          <option value="Dr. Brown">Dr. Brown</option>
        </select>
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