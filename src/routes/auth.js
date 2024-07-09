const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');



// Existing registration route
router.post('/register', authController.register);

// New login route
router.post('/login', authController.login);

// protected route
router.get('/profile', authenticateToken,  authController.profile);

router.get('/api/users/:id', authenticateToken,  authController.profile);



module.exports = router;
