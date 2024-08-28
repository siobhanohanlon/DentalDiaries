//Imports
import axios from "axios";
import React from "react";

//Import Appointment
import { Appointments } from "./appointments";

export class ReadAppointment extends React.Component {
    //Constructor
    constructor() {
        super();

        //Object that will hold all data for class
        this.state = {
            //Assign Data to Array
            appointments: []
        };

        //Reload Binding
        this.reload = this.reload.bind(this);
    }

    //Reload
    reload() {
        this.componentDidMount();
    }

    //Connect and get data
    componentDidMount() {
        //Makes HTTP Request to get json
        axios.get('http://localhost:3000/api/appointments')
            //When Request Completed
            .then((response) => {
                // Update State
                this.setState({ appointments: response.data });
            }
            )
            //If Request returns error
            .catch((error) => {
                console.log(error.message);
            });
    }

    render() {
        return (
            <div className="App">
                <center>
                    <h3>All Appointments Listed Below</h3>
                    {/* Display Book Class from Book Component & Pass in Variable */}
                    <Appointments appointments={this.state.appointments} reload={this.reload}></Appointments>
                </center>
            </div>
        )
    }
}