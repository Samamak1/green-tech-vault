const express = require('express');
const router = express.Router();

// Mock authentication data
const mockUser = {
  id: '1',
  name: "Leila's Company",
  email: 'leilaameyer2@gmail.com',
  username: 'lmeyer',
  role: 'client',
  companyName: "Leila's Company"
};

const mockAdminUser = {
  id: '2',
  name: 'Admin User',
  email: 'admin@greentechvault.com',
  username: 'admin',
  role: 'admin'
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', (req, res) => {
  res.json({
    success: true,
    data: {
      token: 'mock-jwt-token',
      user: mockUser
    }
  });
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', (req, res) => {
  const { email, password, isAdminLogin } = req.body;
  
  // For demo, always authenticate
  const user = isAdminLogin ? mockAdminUser : mockUser;
  
  res.json({
    success: true,
    data: {
      token: 'mock-jwt-token',
      user
    }
  });
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', (req, res) => {
  // Check for admin header to determine which user to return
  const isAdmin = req.headers['x-admin'] === 'true';
  const user = isAdmin ? mockAdminUser : mockUser;
  
  res.json({
    success: true,
    data: user
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