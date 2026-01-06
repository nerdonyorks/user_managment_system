const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(isAuthenticated);

// User routes
router.get('/home', userController.renderHome);
router.get('/profile', userController.getProfile);

module.exports = router;