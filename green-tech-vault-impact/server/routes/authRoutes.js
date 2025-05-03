const express = require('express');
const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', (req, res) => {
  // In a real implementation, this would create a new user in the database
  // For now, we'll return a mock response
  res.json({ 
    success: true, 
    data: {
      token: 'sample-jwt-token',
      user: {
        id: '1',
        name: req.body.name || 'Demo User',
        email: req.body.email || 'demo@example.com',
        role: 'client' // Default role is client
      }
    },
    message: 'User registered successfully' 
  });
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', (req, res) => {
  console.log('Login request received:', req.body);
  
  // Check if this is an admin login attempt
  const isAdminLogin = req.body.isAdminLogin === true;
  const email = req.body.email || '';
  const password = req.body.password || '';
  
  console.log('Login details:', { 
    email, 
    isAdminLogin, 
    passwordProvided: !!password 
  });
  
  // In a real implementation, this would verify credentials against the database
  // For now, we'll return a mock response
  
  // Added new admin credentials
  const isLeilaAdmin = (email.toLowerCase() === 'lmeyer@rygneco.com' && 
                 password === 'RGYNeco.!');
  
  // Original admin credentials 
  const isOriginalAdmin = (email.toLowerCase() === 'admin@greentech.com' && 
                  password === 'admin123');
  
  // New client credentials
  const isLeilaClient = (email.toLowerCase() === 'leilaameyer2@gmail.com' && 
                  password === 'RGYNeco.!');
                  
  const isAdmin = isLeilaAdmin || isOriginalAdmin;
  
  console.log('Is admin credentials valid:', isAdmin);
  
  // If it's an admin login attempt but credentials don't match
  if (isAdminLogin && !isAdmin) {
    console.log('Admin login failed: Invalid credentials');
    return res.status(401).json({
      success: false,
      error: 'Invalid admin credentials'
    });
  }
  
  console.log('Login successful, returning token');
  
  // Determine username and role based on login credentials
  let userName = 'Demo User';
  let userPosition = '';
  let userId = 'client-1';
  let userRole = 'client';
  let username = null;
  let companyName = null;
  
  if (isLeilaAdmin) {
    userName = 'Leila Meyer';
    userPosition = 'CEO';
    userId = 'admin-1';
    userRole = 'admin';
  } else if (isOriginalAdmin) {
    userName = 'Admin User';
    userPosition = 'Administrator';
    userId = 'admin-2';
    userRole = 'admin';
  } else if (isLeilaClient) {
    userName = 'Leila Meyer';
    userId = 'client-1';
    userRole = 'client';
    username = '@lmeyer';
    companyName = "Leila's Company";
  }
  
  res.json({ 
    success: true, 
    data: {
      token: userRole === 'admin' ? 'admin-jwt-token' : 'client-jwt-token',
      user: {
        id: userId,
        name: userName,
        email: email || 'demo@example.com',
        role: userRole,
        position: userPosition,
        username: username,
        companyName: companyName
      }
    },
    message: 'Login successful' 
  });
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', (req, res) => {
  // In a real implementation, this would fetch the user from the database based on the JWT token
  // For now, we'll return a mock response
  
  // For demo purposes, let's check if the Authorization header contains 'admin'
  const authHeader = req.headers.authorization || '';
  const isAdmin = authHeader.includes('admin-jwt-token');
  
  res.json({ 
    success: true, 
    data: {
      id: isAdmin ? 'admin-1' : 'client-1',
      name: isAdmin ? 'Leila Meyer' : 'Leila Meyer',
      email: isAdmin ? 'lmeyer@rygneco.com' : 'leilaameyer2@gmail.com',
      role: isAdmin ? 'admin' : 'client',
      position: isAdmin ? 'CEO' : '',
      username: !isAdmin ? '@lmeyer' : null,
      companyName: !isAdmin ? "Leila's Company" : null
    },
    message: 'User retrieved successfully' 
  });
});

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Forgot password
 * @access  Public
 */
router.post('/forgot-password', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Password reset email sent' 
  });
});

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password
 * @access  Public
 */
router.post('/reset-password', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Password reset successful' 
  });
});

module.exports = router; 