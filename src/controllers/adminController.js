const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

class AdminController {
  // Render admin login page
  renderLogin(req, res) {
    res.render('admin/login', {
      title: 'Admin Login',
      error: null
    });
  }

  // Handle admin login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.render('admin/login', {
          title: 'Admin Login',
          error: 'Email and password are required'
        });
      }

      const admin = await AuthService.loginAdmin(email, password);

      // Create admin session
      req.session.isAdmin = true;
      req.session.adminId = admin._id;
      req.session.adminName = admin.name;
      req.session.adminRole = admin.role;

      res.redirect('/admin/dashboard');
    } catch (error) {
      res.render('admin/login', {
        title: 'Admin Login',
        error: error.message
      });
    }
  }

  // Render dashboard
  async renderDashboard(req, res) {
    try {
      const stats = await UserService.getUserStats();
      const recentUsers = await UserService.getAllUsers();

      res.render('admin/dashboard', {
        title: 'Admin Dashboard',
        stats,
        recentUsers: recentUsers.slice(0, 5)
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Error',
        message: error.message
      });
    }
  }

  // Render users page
  async renderUsers(req, res) {
    try {
      const { search, status } = req.query;
      const users = await UserService.getAllUsers({ search, status });

      res.render('admin/users', {
        title: 'Manage Users',
        users,
        search: search || '',
        status: status || ''
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Error',
        message: error.message
      });
    }
  }

  // Get all users (API)
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers(req.query);

      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Create user (API)
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update user (API)
  async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);

      res.json({
        success: true,
        message: 'User updated successfully',
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete user (API)
  async deleteUser(req, res) {
    try {
      await UserService.deleteUser(req.params.id);

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Search users (API)
  async searchUsers(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const users = await UserService.searchUsers(q);

      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get single user (API)
  async getUser(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Admin logout
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/admin/login');
    });
  }
}

module.exports = new AdminController();