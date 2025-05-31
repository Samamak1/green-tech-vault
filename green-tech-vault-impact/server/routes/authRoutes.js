const express = require('express');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;
const router = express.Router();

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'defaultsecret',
    { expiresIn: '7d' }
  );
};

// Mock authentication data with valid ObjectIds
const mockUser = {
  id: new ObjectId('507f1f77bcf86cd799439011'), // Valid ObjectId
  name: "Leila's Company",
  email: 'leilaameyer2@gmail.com',
  username: 'lmeyer',
  role: 'client',
  companyName: "Leila's Company"
};

const mockAdminUser = {
  id: new ObjectId('507f1f77bcf86cd799439012'), // Valid ObjectId
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
  try {
    const token = generateToken(mockUser);
    
    res.json({
      success: true,
      data: {
        token,
        user: mockUser
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', (req, res) => {
  try {
    const { email, password, isAdminLogin } = req.body;
    
    // For demo, always authenticate
    const user = isAdminLogin ? mockAdminUser : mockUser;
    const token = generateToken(user);
    
    res.json({
      success: true,
      data: {
        token,
        user
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', (req, res) => {
  try {
    // Check for admin header to determine which user to return
    const isAdmin = req.headers['x-admin'] === 'true';
    const user = isAdmin ? mockAdminUser : mockUser;
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user information'
    });
  }
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