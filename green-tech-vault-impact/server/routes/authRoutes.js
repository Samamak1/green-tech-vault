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
  
  // Admin credentials
  const isLeilaAdmin = (email.toLowerCase() === 'lmeyer@rygneco.com' && 
                 password === 'RGYNeco.!');
  
  const isJohnAdmin = (email.toLowerCase() === 'admin@greentech.com' && 
                  password === 'admin123');
  
  // Client credentials
  const isLeilaClient = (email.toLowerCase() === 'leilaameyer2@gmail.com' && 
                  password === 'RGYNeco.!');
                  
  const isJohnClient = (email.toLowerCase() === 'client@greentech.com' && 
                  password === 'client123');
  
  const isAdmin = isLeilaAdmin || isJohnAdmin;
  const isClient = isLeilaClient || isJohnClient;
  
  console.log('Is admin credentials valid:', isAdmin);
  console.log('Is client credentials valid:', isClient);
  
  // If it's an admin login attempt but credentials don't match
  if (isAdminLogin && !isAdmin) {
    console.log('Admin login failed: Invalid credentials');
    return res.status(401).json({
      success: false,
      error: 'Invalid admin credentials'
    });
  }
  
  // If it's a client login attempt but credentials don't match
  if (!isAdminLogin && !isClient && (email || password)) {
    console.log('Client login failed: Invalid credentials');
    return res.status(401).json({
      success: false,
      error: 'Invalid client credentials'
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
  } else if (isJohnAdmin) {
    userName = 'John Smith';
    userPosition = 'Administrator';
    userId = 'admin-2';
    userRole = 'admin';
  } else if (isLeilaClient) {
    userName = 'Leila Meyer';
    userId = 'client-1';
    userRole = 'client';
    username = '@lmeyer';
    companyName = "Leila's Company";
  } else if (isJohnClient) {
    userName = 'John Smith';
    userId = 'client-2';
    userRole = 'client';
    username = '@jsmith';
    companyName = "John's Company";
  }

  // Create token with user info embedded
  const token = userRole === 'admin' 
    ? `admin-jwt-token-${userId}` 
    : `client-jwt-token-${userId}`;
  
  res.json({ 
    success: true, 
    data: {
      token: token,
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
  const isAdminToken = authHeader.includes('admin-jwt-token');
  
  // Extract user ID from token if possible
  let userId;
  
  if (authHeader.includes('admin-jwt-token-admin-1')) {
    userId = 'admin-1';
  } else if (authHeader.includes('admin-jwt-token-admin-2')) {
    userId = 'admin-2';
  } else if (authHeader.includes('client-jwt-token-client-1')) {
    userId = 'client-1';
  } else if (authHeader.includes('client-jwt-token-client-2')) {
    userId = 'client-2';
  } else {
    // Default fallback
    userId = isAdminToken ? 'admin-1' : 'client-1';
  }
  
  console.log('User ID from token:', userId);
  console.log('Auth header:', authHeader);
  
  let userData;
  
  if (userId.startsWith('admin')) {
    if (userId === 'admin-1') {
      userData = {
        id: 'admin-1',
        name: 'Leila Meyer',
        email: 'lmeyer@rygneco.com',
        role: 'admin',
        position: 'CEO'
      };
    } else {
      userData = {
        id: 'admin-2',
        name: 'John Smith',
        email: 'admin@greentech.com',
        role: 'admin',
        position: 'Administrator'
      };
    }
  } else {
    if (userId === 'client-1') {
      userData = {
        id: 'client-1',
        name: 'Leila Meyer',
        email: 'leilaameyer2@gmail.com',
        role: 'client',
        username: '@lmeyer',
        companyName: "Leila's Company"
      };
    } else {
      userData = {
        id: 'client-2',
        name: 'John Smith',
        email: 'client@greentech.com',
        role: 'client',
        username: '@jsmith',
        companyName: "John's Company"
      };
    }
  }
  
  res.json({ 
    success: true, 
    data: userData,
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