//Imports
import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

// Define the AppointmentList
export class AppointmentList extends React.Component {
    //Constructor
    constructor(props) {
        // Call parent class
        super(props);

        //Delete Appointment Binds
        this.DeleteAppointment = this.DeleteAppointment.bind(this);
    }

    //Delete Appointment
    DeleteAppointment(e) {
        e.preventDefault();

        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Make an HTTP DELETE request
        axios.delete('http://localhost:3000/api/appointments/' + this.props.appointment._id, {
            headers: {
                // Add Authorization header
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                // Refresh after deletion
                if (this.props.Reload) {this.props.Reload();}
            })
            .catch((error) => {
                // Log any errors to console
                console.error('Error deleting appointment:', error);
            });
    }

    //Render Page
    render() {
        // Destructure appointment
        const { appointment } = this.props;

        // Format the date and time
        const startDate = new Date(appointment.date);
        const formattedDate = startDate.toLocaleDateString('en-GB');
        const formattedTime = startDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

        return (
            <div className="AppointmentItem">
                <center>
                    {/* Print out info from Array as Cards */}
                    <Card style={{ width: '80%' }}>
                        {/* Displaying bootstrap Appointment cards by using props */}
                        <Card.Header>
                            <Card.Title>Dentist: {this.props.appointment.dentist}</Card.Title>
                        </Card.Header>

                        <Card.Body>
                            <Card.Title>Patient: {this.props.appointment.patient}</Card.Title>
                            <Card.Text>Appointment Date: {formattedDate}</Card.Text>
                            <Card.Text>Appointment Time: {formattedTime}</Card.Text>
                            <Card.Text>Appointment Duration: {this.props.appointment.duration}</Card.Text>
                        </Card.Body>

                        <Card.Footer>
                            {/* Edit */}
                            <Link to={'/editAppointment/:' + this.props.appointment._id} className="btn btn-primary">Edit</Link>

                            {/* Deletes Appointment and reloads page */}
                            <Button variant="danger" onClick={this.DeleteAppointment} style={{ margin: "10px" }}>Delete</Button>
                        </Card.Footer>
                    </Card>
                </center>
            </div>
        )
    }
}