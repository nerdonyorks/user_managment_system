const UserService = require('../services/UserService');

class UserController {
  // Render user home page
  async renderHome(req, res) {
    try {
      const user = await UserService.getUserById(req.session.user.id);
      
      res.render('home', {
        title: 'Home',
        user
      });
    } catch (error) {
      res.status(500).render('error', {
        title: 'Error',
        message: error.message
      });
    }
  }

  // Get user profile
  async getProfile(req, res) {
    try {
      const user = await UserService.getUserById(req.session.user.id);
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new UserController();