const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ObjectId } = require('mongoose').Types;

// Mock users for demo purposes
const mockUsers = {
  '507f1f77bcf86cd799439011': {
    _id: new ObjectId('507f1f77bcf86cd799439011'),
    name: "Leila's Company",
    email: 'leilaameyer2@gmail.com',
    username: 'lmeyer',
    role: 'client',
    companyName: "Leila's Company"
  },
  '507f1f77bcf86cd799439012': {
    _id: new ObjectId('507f1f77bcf86cd799439012'),
    name: 'Admin User',
    email: 'admin@greentechvault.com',
    username: 'admin',
    role: 'admin'
  }
};

/**
 * Authentication middleware to protect routes
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token, access denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    
    let user = null;
    
    // First try to find in mock users for demo
    if (mockUsers[decoded.id.toString()]) {
      user = mockUsers[decoded.id.toString()];
    } else {
      // Try to find user in database
      try {
        user = await User.findById(decoded.id).select('-password');
      } catch (dbError) {
        console.error('Database user lookup failed, using mock user:', dbError.message);
        // If database lookup fails, try mock users again
        user = mockUsers[decoded.id.toString()];
      }
    }
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token is valid but user not found' 
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Server authentication error' 
    });
  }
};

/**
 * Admin authorization middleware
 * Use after authMiddleware to check admin role
 */
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Admin access required' 
    });
  }
};

module.exports = { authMiddleware, adminMiddleware }; 