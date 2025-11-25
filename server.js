const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const session = require('express-session');

const app = express(); // <-- create app first

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'secretKey',
    resave: false,
    saveUninitialized: false
}));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// Import Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const viewRoutes = require('./routes/views');
const authRoutes = require("./routes/auth");

// API Routes
app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// View Routes
app.use('/', viewRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
