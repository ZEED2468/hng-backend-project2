const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Authentication middleware
const auth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'Unauthorized', message: 'No token provided', statusCode: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ status: 'Unauthorized', message: 'Invalid token', statusCode: 401 });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ status: 'Unauthorized', message: 'Invalid token', statusCode: 401 });
    }
};

module.exports = auth;
