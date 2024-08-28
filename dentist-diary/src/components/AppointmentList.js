//Imports
import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class AppointmentList extends React.Component {
    //Constructor
    constructor(props) {
        super(props);
        //Delete Appointment Binds
        this.DeleteAppointment = this.DeleteAppointment.bind(this);
    }

    //Delete Appointment
    DeleteAppointment(e) {
        e.preventDefault();
        axios.delete('http://localhost:3000/api/appointments/' + this.props.appointment._id)
            .then(() => {
                if (this.props.Reload) {this.props.Reload();}
            })
            .catch((error) => {
                console.error('Error deleting appointment:', error); // Handle error
            });
    }

    //Render Page
    render() {
        const { appointment } = this.props;

        // Format the date
        const formattedDate = new Date(appointment.date).toLocaleDateString('en-GB'); // 'en-GB' for dd/mm/yyyy

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