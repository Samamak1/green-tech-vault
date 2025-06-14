const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables first
dotenv.config();

const connectDB = require('./config/db');

// Import routes with try-catch for safety
let companyRoutes, pickupRoutes, deviceRoutes, impactRoutes, authRoutes, reportRoutes, dashboardRoutes, messageRoutes;

try {
  companyRoutes = require('./routes/companyRoutes');
  pickupRoutes = require('./routes/pickupRoutes');
  deviceRoutes = require('./routes/deviceRoutes');
  impactRoutes = require('./routes/impactRoutes');
  authRoutes = require('./routes/authRoutes');
  reportRoutes = require('./routes/reportRoutes');
  dashboardRoutes = require('./routes/dashboardRoutes');
  messageRoutes = require('./routes/messageRoutes');
} catch (routeError) {
  console.error('Error loading routes:', routeError);
}

// Import server middleware for image fallbacks
const imageMiddleware = require('../server');

// Initialize express app
const app = express();

// Track server readiness
let isServerReady = false;
let dbConnected = false;

// Enable trust proxy for proper IP detection
app.set('trust proxy', 1);

// Basic middleware setup
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://green-tech-vault.onrender.com', 'https://green-tech-vault-impact.onrender.com']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' })); // Reduced from 50mb
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Reduced from 50mb

// Conditional logging - reduce noise in production
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Connect to MongoDB with better error handling
connectDB().then(() => {
  console.log('MongoDB Connected successfully');
  dbConnected = true;
  isServerReady = true;
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  // Mark server as ready even if DB fails - we'll handle DB errors in routes
  isServerReady = true;
});

// Add request timeout and basic security
app.use((req, res, next) => {
  // Set reasonable timeout
  req.setTimeout(25000, () => {
    if (!res.headersSent) {
      res.status(408).json({ error: 'Request timeout' });
    }
  });
  
  // Basic security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
});

// Add our custom image middleware with error handling
app.use((req, res, next) => {
  try {
    imageMiddleware(req, res, next);
  } catch (err) {
    console.error('Image middleware error:', err);
    next();
  }
});

// Wake-up endpoint for faster response on initial load
app.get('/wakeup', (req, res) => {
  try {
    res.status(200).json({ 
      status: 'awake',
      ready: isServerReady,
      database: dbConnected,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: '1.0.2'
    });
  } catch (err) {
    console.error('Wakeup endpoint error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  try {
    res.status(200).json({ 
      status: 'ok', 
      ready: isServerReady,
      database: dbConnected,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({ error: 'Health check failed' });
  }
});

// Add graceful error handling for route mounting
const mountRoute = (path, router, name) => {
  try {
    if (router) {
      app.use(path, router);
      console.log(`✓ Mounted ${name} routes at ${path}`);
    } else {
      console.warn(`⚠ Failed to mount ${name} routes - router is undefined`);
    }
  } catch (err) {
    console.error(`✗ Error mounting ${name} routes:`, err);
  }
};

// Mount API Routes with error handling
mountRoute('/api/companies', companyRoutes, 'Company');
mountRoute('/api/pickups', pickupRoutes, 'Pickup');
mountRoute('/api/devices', deviceRoutes, 'Device');
mountRoute('/api/impact', impactRoutes, 'Impact');
mountRoute('/api/auth', authRoutes, 'Auth');
mountRoute('/api/reports', reportRoutes, 'Report');
mountRoute('/api/dashboard', dashboardRoutes, 'Dashboard');
mountRoute('/api/messages', messageRoutes, 'Message');

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder with proper error handling
  const buildPath = path.join(__dirname, '../client/build');
  
  try {
    app.use(express.static(buildPath, {
      maxAge: '1d', // Cache static assets for 1 day
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        } else if (filePath.endsWith('.svg')) {
          res.setHeader('Content-Type', 'image/svg+xml');
        }
      }
    }));
    
    console.log('✓ Static files served from:', buildPath);
  } catch (err) {
    console.error('✗ Error setting up static file serving:', err);
  }
  
  // Handle all routes (SPA fallback) with better error handling
  app.get('*', (req, res) => {
    try {
      const indexPath = path.resolve(__dirname, '../client/build/index.html');
      
      if (require('fs').existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        console.error('index.html not found at:', indexPath);
        res.status(404).send('Application not found');
      }
    } catch (err) {
      console.error('Error serving SPA route:', err);
      res.status(500).send('Error loading application');
    }
  });
} else {
  app.get('/', (req, res) => {
    res.json({ 
      message: 'RYGNeco API is running...',
      environment: 'development',
      version: '1.0.2'
    });
  });
}

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  // Don't log stack traces in production
  if (process.env.NODE_ENV === 'production') {
    console.error('Error:', err.message);
  } else {
    console.error('Error stack:', err.stack);
  }
  
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      error: 'Server error',
      message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
    });
  }
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Define port
const PORT = process.env.PORT || 5000;

// Enhanced server startup
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Database connected: ${dbConnected}`);
  console.log(`✅ Server ready: ${isServerReady}`);
});

// Set server timeout
server.timeout = 30000; // 30 seconds

// Handle server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    process.exit(1);
  }
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  server.close((err) => {
    if (err) {
      console.error('❌ Error during server shutdown:', err);
      process.exit(1);
    }
    
    console.log('✅ Server closed successfully');
    
    // Close database connection
    if (require('mongoose').connection.readyState === 1) {
      require('mongoose').connection.close(() => {
        console.log('✅ Database connection closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
  
  // Force exit after 10 seconds
  setTimeout(() => {
    console.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  // In production, log but don't exit
  if (process.env.NODE_ENV !== 'production') {
    gracefulShutdown('Unhandled Rejection');
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  // In production, log but don't exit
  if (process.env.NODE_ENV !== 'production') {
    gracefulShutdown('Uncaught Exception');
  }
});

// Export for testing
module.exports = app; 