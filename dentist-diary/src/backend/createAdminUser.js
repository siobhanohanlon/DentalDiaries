const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Model
const User = require('./models/user'); // Adjust the path as necessary

// This was used once to create an admin user with a hashed password of 'pass'
async function createAdminUser() {
    try {
        // Connect to the MongoDB database using Mongoose
        await mongoose.connect('mongodb+srv://admin:admin@dental-app-cluster.hy9r4.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Check if the user already exists
        const existingUser = await User.findOne({ username: 'admin' });
        if (existingUser) {
            console.log('Admin user already exists.');
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('pass', salt);

        // Create the admin user
        const adminUser = new User({
            username: 'admin',
            password: hashedPassword,
        });

        // Save the new admin user to the database
        await adminUser.save();
        console.log('Admin user created successfully.');

    } catch (error) {
        // Log if any error
        console.error('Error creating admin user:', error);
    } finally {
        // Close the database connection once the operation is complete
        mongoose.connection.close();
    }
}

createAdminUser();