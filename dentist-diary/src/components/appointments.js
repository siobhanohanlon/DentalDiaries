import React from "react";
import { AppointmentList } from './appointmentList';

export class Appointments extends React.Component {
    //Run
    render() {
        return (
            <div>
                {this.props.appointments.map(appointment => (
                    <AppointmentList
                        key={appointment._id}
                        appointment={appointment}
                        Reload={this.props.reload} // Pass the reload function
                    />
                ))}
            </div>
        );
    }
}