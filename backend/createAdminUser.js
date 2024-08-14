import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user.js';
import dotenv from 'dotenv/config.js';

// Connect to the database
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.error('Could not connect to DB:', err));

// Create the admin user
const createAdminUser = async () => {
    try {
        const existingUser = await User.findOne({ username: 'admin' });

        if (existingUser) {
            console.log('Admin user already exists.');
            return;
        }

        const hashedPassword = await bcrypt.hash('password123', 10);

        const adminUser = new User({
            username: 'admin',
            password: hashedPassword
        });

        await adminUser.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the script
createAdminUser();
