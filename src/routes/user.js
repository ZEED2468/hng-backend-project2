const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// User routes
router.get('/:id', authenticateToken, userController.getUserById);

module.exports = router;
