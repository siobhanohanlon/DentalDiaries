// Mongoose- To connect to my database
const mongoose = require('mongoose');

// Define Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Model to interact with database
const User = mongoose.model('User', userSchema);

module.exports = User;