const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// --------------------
// Middleware to protect admin routes
// --------------------
function isAdmin(req, res, next) {
    if (req.session && req.session.admin) return next();
    res.redirect('/admin/login');
}

// --------------------
// Home page - Show all products
// --------------------
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (err) {
        console.error(err);
        res.render('index', { products: [] });
    }
});

// Cart page
router.get('/cart', (req, res) => res.render('cart'));

// Checkout page
router.get('/checkout', (req, res) => res.render('checkout'));

// Success page
router.get('/success', (req, res) => res.render('success'));

// --------------------
// Admin Routes
// --------------------

// Admin dashboard
router.get('/admin', isAdmin, async (req, res) => {
    try {
        const products = await Product.find();
        res.render('admin', { products, adminLoggedIn: true });
    } catch (err) {
        console.error(err);
        res.render('admin', { products: [], adminLoggedIn: true });
    }
});

// Admin orders page
router.get('/admin/orders', isAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.render('admin-orders', { orders, adminLoggedIn: true });
    } catch (err) {
        console.error(err);
        res.render('admin-orders', { orders: [], adminLoggedIn: true });
    }
});

// Show login form
router.get('/admin/login', (req, res) => res.render('admin-login'));

// Handle login
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.send('Invalid credentials');

        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.send('Invalid credentials');

        req.session.admin = admin._id;  // store admin id in session
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.send('Error logging in');
    }
});

// Logout
router.get('/admin/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) console.error(err);
            res.redirect('/admin/login');
        });
    } else {
        res.redirect('/admin/login');
    }
});

module.exports = router;
