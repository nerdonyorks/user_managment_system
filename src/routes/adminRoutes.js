const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin, redirectIfAdmin } = require('../middleware/authMiddleware');

// Public admin routes
router.get('/login', redirectIfAdmin, adminController.renderLogin);
router.post('/login', redirectIfAdmin, adminController.login);

// Protected admin routes
router.use(isAdmin);

router.get('/dashboard', adminController.renderDashboard);
router.get('/users', adminController.renderUsers);
router.get('/logout', adminController.logout);

// API routes for CRUD operations
router.get('/api/users', adminController.getAllUsers);
router.post('/api/users', adminController.createUser);
router.put('/api/users/:id', adminController.updateUser);
router.delete('/api/users/:id', adminController.deleteUser);
router.get('/api/users/search', adminController.searchUsers);
router.get('/api/users/:id', adminController.getUser);

module.exports = router;