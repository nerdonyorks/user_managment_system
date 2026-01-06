class Validators {
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
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters' };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    
    return { valid: true };
  }

  validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone) && !/^(\d)\1{9}$/.test(phone);
  }

  sanitizeString(str) {
    return str.trim().replace(/[<>]/g, '');
  }

  validateRequired(fields, data) {
    const missing = [];
    
    for (const field of fields) {
      if (!data[field] || data[field].toString().trim() === '') {
        missing.push(field);
      }
    }
    
    return {
      valid: missing.length === 0,
      missing
    };
  }
}

module.exports = new Validators();