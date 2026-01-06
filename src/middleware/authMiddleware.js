class AuthMiddleware {
  // Check if user is authenticated
  isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return next();
    }
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }
    
    res.redirect('/auth/login');
  }

  // Check if admin is authenticated
  isAdmin(req, res, next) {
    if (req.session && req.session.isAdmin && req.session.adminId) {
      return next();
    }
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }
    
    res.redirect('/admin/login');
  }

  // Redirect authenticated users
  redirectIfAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return res.redirect('/user/home');
    }
    next();
  }

  // Redirect authenticated admins
  redirectIfAdmin(req, res, next) {
    if (req.session && req.session.isAdmin) {
      return res.redirect('/admin/dashboard');
    }
    next();
  }

  // Validate request body
  validateRequest(requiredFields) {
    return (req, res, next) => {
      const missingFields = [];
      
      for (const field of requiredFields) {
        if (!req.body[field]) {
          missingFields.push(field);
        }
      }
      
      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
          fields: missingFields
        });
      }
      
      next();
    };
  }
}

module.exports = new AuthMiddleware();