//Express Variables
const express = require('express')
const app = express()
const port = 3000 //Localhost:*port* to view
const cors = require('cors');

//Mongoose- To connect to my database
const mongoose = require('mongoose');

//Calls main to make a connection with the database
main().catch(err => console.log(err));

//Giving database address
async function main() {
  //Connect to Cluster- Open to all IP Addresses
  await mongoose.connect('mongodb+srv://admin:admin@dental-app-cluster.hy9r4.mongodb.net/');
  //Username: admin Password: admin
}

// Define Schemas
const appointmentSchema = new mongoose.Schema({
  patient: String,
  dentist: String,
  date: String
});

//Model to interact with database
const appointmentModel = mongoose.model('listAppointments', appointmentSchema);

//Body Parser to pass info from post form
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse/application/json
app.use(bodyParser.json());

//To allow connection from host to other
app.use(cors());

//Access Control
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//HTTP is handled by req & res, Gets all json Data
app.get('/api/appointments', async(req, res) => {
  //To interact to database
  try {
    const data = await appointmentModel.find(); // No need for a callback, just use the result directly
    res.json(data);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).send(error.message); // Proper error handling
  }
})

//Put data embedded body
app.post('/api/appointments', async (req, res) => {
  try {
    console.log("Received appointment data:", req.body);

    // Convert date to string if it's not already a string
    const formattedDate = new Date(req.body.date).toISOString();

    await appointmentModel.create({
      patient: req.body.patient,
      dentist: req.body.dentist,
      date: formattedDate
    });
    console.log("Stored appointment:", newAppointment);
    res.send('Appointment Data Received Successfully');
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).send(error); // Proper error handling
  }
});

//Pass ID to URL
// ' : ' is to say variable
app.get('/api/appointments/:id', async (req, res) => {
  try {
    // Find Appointment by Id
    const data = await appointmentModel.findById(req.params.id);
    if (!data) {
      return res.status(404).send("Appointment not found");
    }
  res.json(data);
  } catch (error) {
    res.status(500).send(error); // Proper error handling
  }
});

// Update by Id
app.put('/api/appointments/:id', async(req, res) => {
  console.log("Appointment #" + req.params.id + " has been Updated");

  // Convert date to string if it's not already a string
  const formattedDate = new Date(req.body.date).toISOString(); // or use your desired format

  //Update appointmentModel
  try {
    const data = await appointmentModel.findByIdAndUpdate(req.params.id, {
      patient: req.body.patient, dentist: req.body.dentist,
      date: formattedDate}, { new: true });
    res.send(data);
  } catch (error) {
    res.status(500).send(error); // Proper error handling
  }
})

//Delete by ID
app.delete('/api/appointments/:id', async (req, res) => {
  console.log('Deleting Appointment with ID: ' + req.params.id);

  //Find Appointment by ID and Delete
  try {
    const data = await appointmentModel.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send("Appointment not found");
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error); // Proper error handling
  }
})

//Listen- Port 3000
app.listen(port, () => {
  console.log(`Dentist app listening on port ${port}`)
})