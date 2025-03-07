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
  // Check if this is an admin login attempt
  const isAdminLogin = req.body.isAdminLogin;
  
  // In a real implementation, this would verify credentials against the database
  // For now, we'll return a mock response
  
  // For demo purposes, let's consider admin@greentech.com with password 'admin123' as admin credentials
  const isAdmin = isAdminLogin && 
                 (req.body.email === 'admin@greentech.com' && 
                  req.body.password === 'admin123');
  
  res.json({ 
    success: true, 
    data: {
      token: 'sample-jwt-token',
      user: {
        id: '1',
        name: isAdmin ? 'Admin User' : 'Demo User',
        email: req.body.email || 'demo@example.com',
        role: isAdmin ? 'admin' : 'client'
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
  const isAdmin = authHeader.toLowerCase().includes('admin');
  
  res.json({ 
    success: true, 
    data: {
      id: '1',
      name: isAdmin ? 'Admin User' : 'Demo User',
      email: isAdmin ? 'admin@greentech.com' : 'demo@example.com',
      role: isAdmin ? 'admin' : 'client'
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