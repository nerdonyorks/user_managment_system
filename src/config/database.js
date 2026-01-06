const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    

    // Create default admin if not exists
    const Admin = require('../models/Admin');
    const bcrypt = require('bcryptjs');
    
    const adminExists = await Admin.findOne({ email: 'admin@gmail.com' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin123', 10);
      await Admin.create({
        name: 'System Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'super_admin'
      });
      console.log('Default admin created: admin@gmail.com / Admin123');
    }
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Please check your MONGODB_URI in .env file');
    process.exit(1);
  }
};

module.exports = connectDB;