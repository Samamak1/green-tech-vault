const express = require('express');
const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', (req, res) => {
  res.json({ 
    success: true, 
    data: {
      token: 'sample-jwt-token'
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
  res.json({ 
    success: true, 
    data: {
      token: 'sample-jwt-token',
      user: {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'admin'
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
  res.json({ 
    success: true, 
    data: {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      role: 'admin'
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