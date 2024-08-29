import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Create a localizer for the Calendar component using moment.js
const localizer = momentLocalizer(moment);

// Different Colours for each dentist
const dentistColors = {
  "Dr. Halloran": 'blue',
  "Dr. Barry": 'green',
  "Dr. Diggins": 'red',
};

export class WeeklyCalendar extends React.Component {
  // Constructor
  constructor(props) {
    // Call parent
    super(props);

    this.state = {
      appointments: [],
      dentist: 'All',
    };
  }

  // Fetch appointments when the component mounts
  componentDidMount() {
    this.fetchAppointments();
  }

  // Fetch appointments if the selected dentist changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.dentist !== this.state.dentist) {
      this.fetchAppointments();
    }
  }

  fetchAppointments = async () => {
    const { dentist } = this.state;

    try {
      // Construct query string based on selected dentist
      const query = dentist !== 'All' ? `?dentist=${encodeURIComponent(dentist)}` : '';
      console.log(`Fetching appointments with query: ${query}`);

      // Retrieve token
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/appointments${query}`, {
        headers: {
          // Include the token in the request headers
          'Authorization': `Bearer ${token}`
        }
      });

      // Parse JSON data from response
      if (response.ok) {
        const data = await response.json();

      // Log fetched appointments for debugging
      console.log('Fetched appointments:', data);

      // Filter appointments by dentist
      const filteredAppointments = dentist === 'All'
      ? data
      : data.filter(appointment => appointment.dentist === dentist);

      // Update state with filtered appointments
      this.setState({
        appointments: filteredAppointments.map(appointment => ({
          title: appointment.patient,
          start: new Date(appointment.date),
          end: new Date(appointment.endDate),
          style: { backgroundColor: dentistColors[appointment.dentist] || 'gray' }
        }))
      });
    } else {
      // Log errors
      console.error('Error fetching appointments:', response.statusText);
    }
  } catch (error) {
    // Log errors
    console.error('Error fetching appointments:', error);
  }
};

  // When calendar is filtered by dentist
  handleDentistChange = (e) => {
    const newDentist = e.target.value;
    console.log(`Dentist changed to: ${newDentist}`);

    // Update state with new dentist and fetch appointments
    this.setState({ dentist: newDentist }, () => {
      this.fetchAppointments();
    });
  };

  render() {
    const { appointments, dentist } = this.state;
    const dentists = ["Dr. Halloran", "Dr. Barry", "Dr. Diggins"];

    return (
      <div>
        <h2>Weekly Calendar</h2>
        <div>
          <label htmlFor="dentistSelect">Filter by Dentist: </label>
          <select id="dentistSelect" value={dentist} onChange={this.handleDentistChange}>
            <option value="All">All</option>
            {dentists.map(dentist => (
              <option key={dentist} value={dentist}>{dentist}</option>
            ))}
          </select>
        </div>
        <Calendar localizer={localizer} events={appointments} startAccessor="start" endAccessor="end"
          defaultView="week" style={{ height: 500, margin: '50px' }} eventPropGetter={(event) => ({ style: event.style})} />
      </div>
    );
  }
}