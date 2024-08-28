const Appointment = require('../models/appointment');

// HTTP is handled by req & res, Gets all json Data
exports.getAppointments = async(req, res) => {
    //To interact to database
    try {
        const data = await Appointment.find();
        res.json(data);
    } catch (error) {
        // Log to console if error
        console.error("Error fetching appointments:", error);

        // Error handling
        res.status(500).send(error.message);
    }
};

//Put data embedded body
exports.createAppointment = async (req, res) => {
    try {
        //console.log("Received appointment data:", req.body);

        // Convert date to string if it's not already a string
        const formattedDate = new Date(req.body.date).toISOString();
        const newAppointment = await Appointment.create({
            patient: req.body.patient,
            dentist: req.body.dentist,
            date: formattedDate
        });

        //console.log("Stored appointment:", newAppointment);
        res.send('Appointment Data Received Successfully');

    } catch (error) {
        // Log to Console
        console.error("Error creating appointment:", error);

        // Error Handling
        res.status(500).send(error);
    }
};

// Pass ID to URL
exports.getAppointmentById = async (req, res) => {
    try {
        // Find Appointment by Id
        const data = await Appointment.findById(req.params.id);

        // If no data found
        if (!data) {
            return res.status(404).send("Appointment not found");
        }
        res.json(data);
    } catch (error) {
        // Log to Console
        console.error("Error getting appointment by Id:", error);

        // Error Handling
        res.status(500).send(error);
    }
};

// Update by Id
exports.updateAppointmentById = async(req, res) => {
    //console.log("Appointment #" + req.params.id + " has been Updated");

    // Convert date to string if it's not already a string
    const formattedDate = new Date(req.body.date).toISOString();

    // Update Appointment
    try{
        const data = await Appointment.findByIdAndUpdate(req.params.id, {patient: req.body.patient, 
        dentist: req.body.dentist, date: formattedDate}, { new: true });

        res.send(data);
    } catch (error) {
        // Log to Console
        console.error("Error getting appointment by Id:", error);

        // Error Handling
        res.status(500).send(error);
    }
};

// Delete by ID
exports.deleteAppointmentById = async (req, res) => {
    //console.log('Deleting Appointment with ID: ' + req.params.id);

    // Find Appointment by ID and Delete
    try{
        const data = await Appointment.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).send("Appointment not found");
        }
        res.send(data);
    } catch (error) {
        // Log to Console
        console.error("Error deleting appointment:", error);

        // Error Handling
        res.status(500).send(error);
    }
};