const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const organisationController = require('../controllers/organisationController');
const authenticateToken = require('../middleware/authMiddleware');

// User routes
router.get('/api/users/:id', authenticateToken, userController.getUserById);
router.get('/api/organisations', authenticateToken, organisationController.getOrganisationById);

module.exports = router;
