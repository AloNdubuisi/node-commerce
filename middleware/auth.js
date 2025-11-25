// middleware/auth.js
module.exports = {
    isAdmin: (req, res, next) => {
        // For simplicity, using a hardcoded admin password (can later use proper user auth)
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Check if the request has a query or header password (for demo purposes)
        const password = req.query.password || req.headers['x-admin-password'];

        if (password && password === adminPassword) {
            return next();
        } else {
            return res.status(403).send('❌ Access denied: Admins only');
        }
    }
};
