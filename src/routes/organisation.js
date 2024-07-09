const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/organisationController');
const authenticateToken = require('../middleware/authMiddleware');

// Organisation routes
router.get('/:userId/organisations', authenticateToken, organisationController.getOrganisations);
router.get('/api/organisations/:orgId', authenticateToken, organisationController.getOrganisationById);
router.post('/', authenticateToken, organisationController.createOrganisation);
router.post('/api/organisations/:orgId/users', authenticateToken, organisationController.addUserToOrganisation);


module.exports = router;
