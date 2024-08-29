//Imports
import axios from "axios";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class AddAppointment extends React.Component {
    //Constructor
    constructor() {
        super();

        //Bind to Event
        this.submitAppointment = this.submitAppointment.bind(this);

        this.onChangePatient = this.onChangePatient.bind(this);
        this.onChangeDentist = this.onChangeDentist.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);

        //Set Value to blank
        this.state = {
            patient: '',
            dentist: '',
            date: null,
            duration: 30,
            dentists: ["Dr. Halloran", "Dr. Barry", "Dr. Diggins"]
        }
    }

    //Submit
    submitAppointment(e) {
        e.preventDefault();

        // Get the token from localStorage
        const token = localStorage.getItem('token');

        //Print to Console
        console.log(`Button Clicked!\nPatient: ${this.state.patient}\nDentist: ${this.state.dentist}\n
            Appointment Date: ${this.state.date}\nDuration: ${this.state.duration}`);

        const appointments = {
            patient: this.state.patient,
            dentist: this.state.dentist,
            startDate: this.state.date.getTime(),
            duration: this.state.duration,
            endDate: new Date(this.state.date.getTime() + this.state.duration * 60000)
        };

        //Generate HTTP Request 
        axios.post("http://localhost:3000/api/appointments", appointments, {
            headers: {
                // Add Authorization header
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("HTTP Request Sent", response.data);
                // Notify parent about the new appointment
                this.props.onAppointmentAdded(response.data);
            })
            .catch((error) => {
                console.log(error.message)
            });

        //Reset to blank
        this.setState({
            patient: '',
            dentist: '',
            date: null,
            duration: 30
        });
    }

    //Change Patient
    onChangePatient(e) {
        this.setState({
            patient: e.target.value
        })
    }

    //Change Dentist
    onChangeDentist(e) {
        this.setState({
            dentist: e.target.value
        })
    }

    //Change Appointment Date
    onChangeDate(e) {
        this.setState({
            date: e
        })
    }

    // Change Duration
    onChangeDuration(e) {
        this.setState({ duration: parseInt(e.target.value, 10) });
    }

    render() {
        return (
            //Print to Screen
            <div>
                {/* Print to screen */}
                <h2>Add New Appointment Details Below!</h2>
                <br></br>

                {/* Form to Add Appointment to Array */}
                <form onSubmit={this.submitAppointment}>
                    {/* Dentist */}
                    <div className="form-group">
                        <label htmlFor="dentist" className="dentist">Dentist: </label>
                        <select id="dentist" value={this.state.dentist} onChange={this.onChangeDentist} required>
                            <option value="" disabled>Select a Dentist</option>
                            {this.state.dentists.map((dentist, index) => (
                                <option key={index} value={dentist}>{dentist}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Patient */}
                    <div className="form-group">
                        <label htmlFor="patient" className="patient">Patient: </label>
                        <input id="patient" type="text" value={this.state.patient} onChange={this.onChangePatient} required />
                    </div>

                    {/* Appointment Date */}
                    <div className="form-group">
                        <label htmlFor="date" className="date">Date: </label>
                        <DatePicker id="date" selected={this.state.date} onChange={this.onChangeDate} showTimeSelect
                            timeFormat="HH:mm" dateFormat="dd/MM/yyyy" className="form-control" required />
                    </div>

                    {/* Appointment Duration */}
                    <div className="form-group">
                        <label htmlFor="duration">Duration (minutes): </label>
                        <input id="duration" type="number" value={this.state.duration} onChange={this.onChangeDuration}
                            min="1" max="500" required />
                    </div>

                    {/* Submit Button */}
                    <br></br>
                    <input className="submit" type="submit" value="Add Appointment" />
                </form>
            </div>
        )
    }
}