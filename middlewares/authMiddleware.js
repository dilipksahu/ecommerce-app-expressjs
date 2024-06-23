const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthMiddleware {
    async authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        console.log(authHeader);
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (err) {
            res.status(403).json({ message: 'Token expired or invalid' });
        }
    }
}

module.exports = new AuthMiddleware();
