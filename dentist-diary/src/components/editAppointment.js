import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';

export function EditAppointment(props) {
    /* The useParams returns an object of key pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    let { fId } = useParams();
    console.log("Appointment ID: ", fId);

    // Remove colon present
    const id = fId.replace(/:/g, '');
    console.log("Appointment ID: ", id);

    /*  Update arrays using the React useState() and without the Array object's push() method */
    const [patient, setPatient] = useState("1");
    const [dentist, setDentist] = useState("");
    const [date, setDate] = useState("");
    const [dentists] = useState(["Dr. Halloran", "Dr. Barry", "Dr. Diggins"]);

    //Needed to check if loading
    const [isLoading, setLoading] = useState(true);

    // Navigate returns a function that we can then use to navigate
    const navigate = useNavigate();

    //useEffect Hook is similar componentDidMount
    useEffect(() => {
        //axios is a promised based web client
        //make a HTTP Request with GET method and pass as part of the url.
        axios.get("http://localhost:3000/api/appointments/" + id)
            .then((response) => {
                //Check if Page is loading
                setLoading(false);

                // Assign Response data to the arrays using useState.
                setPatient(response.data.patient);
                setDentist(response.data.dentist);
                setDate(response.data.date);
            })
            .catch((error) => {
                console.error("Error fetching appointment data:", error);
            })
    }, [id]);

    if(isLoading){
        return(<div>Retrieving Data.....</div>);
    }

    const submitAppointment = (event) => {
        event.preventDefault();

        //New Appointment Data Assigned
        const changeAppointment = {
            //id: id,
            patient: patient,
            dentist: dentist,
            date: date
        };

        //Save Data
        axios.put("http://localhost:3000/api/appointments/" + id, changeAppointment)
            .then((res) => {
                console.log(res.data);
                navigate('/readAppointment');
            })
            .catch((error) => {
                console.error("Error updating appointment data:", error);
            });
    }

    //Output
    return (
        <div>
                {/* Print to screen */}
                <h1>Change Appointment Details Below!</h1>
                <br></br>

                {/* Form to Add Appointment to Array */}
                <form onSubmit={submitAppointment}>
                    {/* Dentist */}
                    <div className="form-group">
                        <label htmlFor="dentist" className="dentist">Dentist: </label>
                        <select id="dentist" value={dentist} onChange={(e) => setDentist(e.target.value)} required>
                            <option value="" disabled>Select a Dentist</option>
                            {dentists.map((dentistOption, index) => (
                                <option key={index} value={dentistOption}>{dentistOption}</option>
                            ))}
                        </select>
                    </div>

                    {/* Patient */}
                    <div className="form-group">
                        <label htmlFor="patient" className="patient">Patient: </label>
                        <input  id="patient" type="text" value={patient} onChange={(e) => setPatient(e.target.value)} required />
                    </div>

                    {/* Appointment Date */}
                    <div className="form-group">
                        <label htmlFor="appDate" className="appDate">Appointment Date: </label>
                        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)}
                            dateFormat="dd/MM/yyyy" className="form-control" required />
                    </div>

                    {/* Submit Button */}
                    <br></br>
                    <input className="submit" type="submit" value="Edit Appointment" />
                </form>
            </div>
    );
}