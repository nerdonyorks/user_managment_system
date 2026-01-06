const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Validators = require('../utils/validators');

class UserService {
  async getAllUsers(filters = {}) {
    try {
      const query = {};
      
      if (filters.search) {
        query.$or = [
          { name: { $regex: filters.search, $options: 'i' } },
          { email: { $regex: filters.search, $options: 'i' } }
        ];
      }

      const users = await User.find(query)
        .select('-password')
        .sort({ createdAt: -1 });
      
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id).select('-password');
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        throw new Error('Email already exists');
      }

      if (userData.phone) {
        const existingPhone = await User.findOne({ phone: userData.phone });
        if (existingPhone) {
          throw new Error('Phone number already exists');
        }
      }

      if (userData.password) {
        const passCheck = Validators.validatePassword(userData.password);
        if (!passCheck.valid) {
          throw new Error(passCheck.message);
        }
      }

      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, updateData) {
    try {
      if (updateData.password) {
        const passCheck = Validators.validatePassword(updateData.password);
        if (!passCheck.valid) {
          throw new Error(passCheck.message);
        }
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }

      const user = await User.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: Date.now() },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async searchUsers(searchTerm) {
    try {
      const users = await User.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } },
          { phone: { $regex: searchTerm, $options: 'i' } }
        ]
      }).select('-password').limit(20);

      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserStats() {
    try {
      const totalUsers = await User.countDocuments();

      return {
        total: totalUsers
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();