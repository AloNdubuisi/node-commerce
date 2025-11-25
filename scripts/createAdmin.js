// scripts/createAdmin.js
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

async function createAdmin() {
    const admin = new Admin({
        username: 'admin',
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
    });
    await admin.save();
    console.log('Admin created');
    mongoose.disconnect();
}

createAdmin();