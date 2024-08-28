const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Adjust the path as necessary

async function createAdminUser() {
    try {
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

        await adminUser.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        mongoose.connection.close();
    }
}

createAdminUser();