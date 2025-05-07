const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

const connectDB = require('./config/db');

// Import routes
const companyRoutes = require('./routes/companyRoutes');
const pickupRoutes = require('./routes/pickupRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const impactRoutes = require('./routes/impactRoutes');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  // Don't exit process here to allow server to start even if DB connection fails
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Add request timeout handling
app.use((req, res, next) => {
  // Set a timeout for all requests
  req.setTimeout(30000, () => {
    res.status(408).send('Request Timeout');
  });
  next();
});

// Add error handling before global error handler
app.use((req, res, next) => {
  try {
    next();
  } catch (err) {
    console.error('Request error:', err);
    res.status(500).json({
      error: 'Server error',
      message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
    });
  }
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Server error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/companies', companyRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder with explicit content types
  app.use(express.static(path.join(__dirname, '../client/build'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));
  
  // Handle all routes (SPA fallback)
  app.get('*', (req, res) => {
    try {
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    } catch (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Define port
const PORT = process.env.PORT || 5000;

// Improved server startup with error handling
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process in production, let it continue running
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit the process in production, let it continue running
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
}); 