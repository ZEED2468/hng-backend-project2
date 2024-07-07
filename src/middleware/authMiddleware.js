const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    

    console.log('Headers:', req.headers);
    console.log('Auth Header:', authHeader);  // Log the auth header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'Unauthorized', message: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token:', token); 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log('Decoded:', decoded);  // Log the decoded token

        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ status: 'Unauthorized', message: 'Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ status: 'Unauthorized', message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
