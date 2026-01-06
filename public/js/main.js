// Modal management
const modal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');
const modalTitle = document.getElementById('modalTitle');
const passwordHelp = document.getElementById('passwordHelp');

// Show create modal
function showCreateModal() {
  modalTitle.textContent = 'Add User';
  userForm.reset();
  document.getElementById('userId').value = '';
  document.getElementById('password').required = true;
  passwordHelp.style.display = 'none';
  modal.style.display = 'block';
}

// Show edit modal
async function editUser(userId) {
  try {
    const response = await fetch(`/admin/api/users/${userId}`);
    const result = await response.json();
    
    if (!result.success) {
      alert('Error loading user data');
      return;
    }

    const user = result.data;
    
    if (!user) {
      alert('User not found');
      return;
    }

    modalTitle.textContent = 'Edit User';
    document.getElementById('userId').value = user._id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('password').value = '';
    document.getElementById('password').required = false;
    passwordHelp.style.display = 'block';
    
    modal.style.display = 'block';
  } catch (error) {
    console.error('Error:', error);
    alert('Error loading user data');
  }
}

// Close modal
function closeModal() {
  modal.style.display = 'none';
  userForm.reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
}

// Handle form submission
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userId = document.getElementById('userId').value;
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
  };

  if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
    alert('Name must contain only characters and numbers');
    return;
  }

  const phone = document.getElementById('phone').value;
  if (phone) {
    if (/^(\d)\1{9}$/.test(phone)) {
      alert('Enter valid mobile number');
      return;
    }
    formData.phone = phone;
  }

  const password = document.getElementById('password').value;
  if (password) {
    // Enforce password complexity: at least 1 uppercase, 1 lowercase, 1 number, min 6 chars
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must contain at least 6 characters, including uppercase, lowercase, and number');
      return;
    }
    formData.password = password;
  }

  try {
    const url = userId 
      ? `/admin/api/users/${userId}`
      : '/admin/api/users';
    
    const method = userId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      alert(result.message);
      closeModal();
      location.reload();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving user');
  }
});

// Delete user
async function deleteUser(userId, userName) {
  if (!confirm(`Are you sure you want to delete user "${userName}"?`)) {
    return;
  }

  try {
    const response = await fetch(`/admin/api/users/${userId}`, {
      method: 'DELETE'
    });

    const result = await response.json();

    if (result.success) {
      alert(result.message);
      location.reload();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error deleting user');
  }
}

// Form validation
document.addEventListener('DOMContentLoaded', () => {
  // Password confirmation validation for signup
  const signupForm = document.querySelector('form[action="/auth/signup"]');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      const password = document.getElementById('password').value;
      const name = document.getElementById('name').value;

      if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
        e.preventDefault();
        alert('Name must contain only characters and numbers');
        return;
      }

      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        e.preventDefault();
        alert('Passwords do not match!');
        return;
      }

      const phone = document.getElementById('phone').value;
      if (phone && /^(\d)\1{9}$/.test(phone)) {
        e.preventDefault();
        alert('Enter valid mobile number');
      }
    });
  }

  // Phone number validation
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10);
    });
  });
});