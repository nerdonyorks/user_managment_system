const User = require('../models/User');
const Admin = require('../models/Admin');

class AuthService {
  async registerUser(userData) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        throw new Error('Email already registered');
      }

      if (userData.phone) {
        const existingPhone = await User.findOne({ phone: userData.phone });
        if (existingPhone) {
          throw new Error('Phone number already registered');
        }
      }

      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async loginAdmin(email, password) {
    try {
      const admin = await Admin.findOne({ email });
      
      if (!admin) {
        throw new Error('Invalid admin credentials');
      }

      const isMatch = await admin.comparePassword(password);
      
      if (!isMatch) {
        throw new Error('Invalid admin credentials');
      }

      return admin;
    } catch (error) {
      throw error;
    }
  }

  validateName(name) {
    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    return nameRegex.test(name);
  }

  validateEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  }

  validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone) && !/^(\d)\1{9}$/.test(phone);
  }
}

module.exports = new AuthService();