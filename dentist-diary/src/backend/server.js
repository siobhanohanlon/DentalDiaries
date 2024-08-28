//Express Variables
const express = require('express')
const app = express()
const port = 3000 //Localhost:*port* to view
const cors = require('cors');

// Mongoose- To connect to my database
const mongoose = require('mongoose');

// Calls main to make a connection with the database
main().catch(err => console.log(err));

// Routes
const appRoutes = require('./routes/appRoutes');
const loginRoutes = require('./routes/loginRoutes');

// Giving database address
async function main() {
  // Connect to Cluster- Open to all IP Addresses
  await mongoose.connect('mongodb+srv://admin:admin@dental-app-cluster.hy9r4.mongodb.net/');
  // Username: admin Password: admin
}

// Body Parser to pass info from post form
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse/application/json
app.use(bodyParser.json());

// To allow connection from host to other
app.use(cors());

// Routes
app.use('/api/appointments', appRoutes);
app.use('/api', loginRoutes);

app.listen(port, () => {
  console.log(`Dentist app listening on port ${port}`);
});