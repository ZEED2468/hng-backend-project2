const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const organisationController = require('../controllers/organisationController');
const authenticateToken = require('../middleware/authMiddleware');

// User routes
router.get('/api/users/:id', authenticateToken, userController.getUserById);
router.post('/api/organisations/:orgId/users', authenticateToken, organisationController.addUserToOrganisation);
router.post('/api/organisations/:orgId', authenticateToken, organisationController.getOrganisationById);
router.post('/api/organisations', authenticateToken, organisationController.createOrganisation);


module.exports = router;
