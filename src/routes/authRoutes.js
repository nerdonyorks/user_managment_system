const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { redirectIfAuthenticated } = require('../middleware/authMiddleware');

// Render pages
router.get('/signup', redirectIfAuthenticated, authController.renderSignup);
router.get('/login', redirectIfAuthenticated, authController.renderLogin);

// Handle authentication
router.post('/signup', redirectIfAuthenticated, authController.signup);
router.post('/login', redirectIfAuthenticated, authController.login);
router.get('/logout', authController.logout);

module.exports = router;