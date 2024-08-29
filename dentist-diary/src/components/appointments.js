import React from "react";
import { AppointmentList } from './appointmentList';

// Define the Appointments
export class Appointments extends React.Component {
    // Render
    render() {
        return (
            <div>
                {/* Map over the appointments array and render an AppointmentList component for each appointment */}
                {this.props.appointments.map(appointment => (
                    <AppointmentList
                        key={appointment._id}
                        appointment={appointment}
                        
                        // Pass the reload function
                        Reload={this.props.reload}
                    />
                ))}
            </div>
        );
    }
}