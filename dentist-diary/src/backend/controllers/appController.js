// Model
const Appointment = require('../models/appointment');

// HTTP is handled by req & res, Gets all json Data
exports.getAppointments = async(req, res) => {

    // To interact to database
    try {
        // Fetch all appointment records from the database
        const data = await Appointment.find();

        // Send the retrieved data as a JSON response
        res.json(data);
    } catch (error) {
        // Log to console if error
        console.error("Error fetching appointments:", error);

        // Error handling
        res.status(500).send(error.message);
    }
};

// Put data embedded in the body
exports.createAppointment = async (req, res) => {
    try {
        //console.log("Received appointment data:", req.body);

        // Extract appointment details from request body
        const { patient, dentist, startDate, duration } = req.body;

        // Check if the provided startDate is a valid date
        const start = new Date(startDate);
        if (isNaN(start.getTime())) {
            throw new RangeError('Invalid date format');
        }

        // Calculate endDate from startDate and duration
        const endDate = new Date(start.getTime() + duration * 60000);

        // Convert startDate to ISO string
        //const formattedStartDate = start.toISOString();

        // Create a new appointment record in the database
        const newAppointment = await Appointment.create({
            patient: req.body.patient,
            dentist: req.body.dentist,
            date: start,
            endDate,
            duration
        });
        //console.log("Stored appointment:", newAppointment);

        // Send a success message in response
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

        // If no appointment data found
        if (!data) {
            return res.status(404).send("Appointment not found");
        }

        // Send the found appointment data as a JSON response
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

    // Update Appointment by id
    try{
        // Extract updated appointment details from request body
        const { patient, dentist, startDate, duration } = req.body;

        // Convert start date to date object & validate
        const formattedStartDate = new Date(startDate);
        if (isNaN(formattedStartDate.getTime())) {
            return res.status(400).send("Invalid date format");
        }

        // Calculate endDate from startDate and duration
        const endDate = new Date(formattedStartDate.getTime() + duration * 60000);

        // Find and update the appointment record by ID with the new data
        const data = await Appointment.findByIdAndUpdate(req.params.id, { patient,
            dentist, startDate: formattedStartDate, endDate, duration }, { new: true }
        );

         // Check if appointment was found and updated
        if (!data) {
            return res.status(404).send("Appointment not found");
        }

        // Send the updated appointment data as a JSON response
        res.json(data);
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

    try{
        // Find Appointment by ID and Delete
        const data = await Appointment.findByIdAndDelete(req.params.id);

        // If no appointment is found
        if (!data) {
            return res.status(404).send("Appointment not found");
        }

        // Send the deleted appointment data as a response
        res.send(data);
    } catch (error) {
        // Log to Console
        console.error("Error deleting appointment:", error);

        // Error Handling
        res.status(500).send(error);
    }
};