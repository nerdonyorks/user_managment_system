const AuthService = require('../services/AuthService');

class AuthController {
  // Render signup page
  renderSignup(req, res) {
    res.render('signup', { 
      title: 'Sign Up',
      error: null 
    });
  }

  // Render login page
  renderLogin(req, res) {
    res.render('login', { 
      title: 'Login',
      error: null 
    });
  }

  // Handle user signup
  async signup(req, res) {
    try {
      const { name, email, password, confirmPassword, phone } = req.body;

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        return res.render('signup', {
          title: 'Sign Up',
          error: 'All fields are required'
        });
      }

      if (!AuthService.validateName(name)) {
        return res.render('signup', {
          title: 'Sign Up',
          error: 'Name must contain only characters and numbers'
        });
      }

      if (password !== confirmPassword) {
        return res.render('signup', {
          title: 'Sign Up',
          error: 'Passwords do not match'
        });
      }

      if (!AuthService.validateEmail(email)) {
        return res.render('signup', {
          title: 'Sign Up',
          error: 'Invalid email format'
        });
      }

      if (!AuthService.validatePassword(password)) {
        return res.render('signup', {
          title: 'Sign Up',
          error: 'Password must be at least 6 characters with uppercase, lowercase, and number'
        });
      }

      if (phone && !AuthService.validatePhone(phone)) {
        return res.render('signup', {
          title: 'Sign Up',
          error: 'Enter valid mobile number'
        });
      }

      const user = await AuthService.registerUser({
        name,
        email,
        password,
        phone
      });

      // Create session
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email
      };

      res.redirect('/user/home');
    } catch (error) {
      res.render('signup', {
        title: 'Sign Up',
        error: error.message
      });
    }
  }

  // Handle user login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.render('login', {
          title: 'Login',
          error: 'Email and password are required'
        });
      }

      const user = await AuthService.loginUser(email, password);

      // Create session
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email
      };

      res.redirect('/user/home');
    } catch (error) {
      res.render('login', {
        title: 'Login',
        error: error.message
      });
    }
  }

  // Handle logout
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/auth/login');
    });
  }
}

module.exports = new AuthController();