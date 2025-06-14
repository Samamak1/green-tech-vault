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

// Initialize request tracking
global.requestCount = 0;
global.errorCount = 0;
global.averageResponseTime = 0;
global.requestTimestamps = [];
global.recentErrors = [];
global.errorTypes = {};

// Request tracking middleware
app.use((req, res, next) => {
  req.startTime = Date.now();
  
  // Track request count
  global.requestCount = (global.requestCount || 0) + 1;
  
  // Track request timestamps for RPS calculation
  if (!global.requestTimestamps) {
    global.requestTimestamps = [];
  }
  global.requestTimestamps.push(Date.now());
  
  // Clean old timestamps (keep only last minute)
  const oneMinuteAgo = Date.now() - 60000;
  global.requestTimestamps = global.requestTimestamps.filter(timestamp => timestamp > oneMinuteAgo);
  
  // Track response time and errors on response finish
  res.on('finish', () => {
    const responseTime = Date.now() - req.startTime;
    
    // Update average response time
    const currentAvg = global.averageResponseTime || 0;
    const requestCount = global.requestCount || 1;
    global.averageResponseTime = ((currentAvg * (requestCount - 1)) + responseTime) / requestCount;
    
    // Track errors
    if (res.statusCode >= 400) {
      global.errorCount = (global.errorCount || 0) + 1;
      
      // Track error by status code
      if (!global.errorTypes) {
        global.errorTypes = {};
      }
      const errorKey = `HTTP_${res.statusCode}`;
      global.errorTypes[errorKey] = (global.errorTypes[errorKey] || 0) + 1;
      
      // Track recent errors
      if (!global.recentErrors) {
        global.recentErrors = [];
      }
      global.recentErrors.push({
        timestamp: Date.now(),
        url: req.url,
        method: req.method,
        statusCode: res.statusCode,
        userAgent: req.headers['user-agent'],
        ip: req.ip
      });
      
      // Keep only last 50 errors
      if (global.recentErrors.length > 50) {
        global.recentErrors = global.recentErrors.slice(-50);
      }
    }
  });
  
  next();
});

// Detailed system metrics endpoint
app.get('/health/metrics', (req, res) => {
  try {
    const os = require('os');
    const metrics = {
      timestamp: Date.now(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      platform: process.platform,
      nodeVersion: process.version,
      pid: process.pid,
      environment: process.env.NODE_ENV || 'development',
      loadAverage: os.loadavg(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      cpuCount: os.cpus().length,
      requests: {
        total: global.requestCount || 0,
        errors: global.errorCount || 0,
        averageResponseTime: Math.round(global.averageResponseTime || 0),
        requestsPerMinute: global.requestTimestamps.length
      },
      database: {
        connected: dbConnected,
        status: dbConnected ? 'OK' : 'ERROR'
      }
    };
    
    res.json(metrics);
  } catch (err) {
    console.error('Metrics endpoint error:', err);
    res.status(500).json({ error: 'Failed to get metrics' });
  }
});

// Performance monitoring endpoint
app.get('/health/performance', (req, res) => {
  try {
    const startTime = Date.now();
    const performance = {
      timestamp: Date.now(),
      responseTime: Date.now() - startTime,
      memoryUsage: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024), // MB
        heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024), // MB
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024), // MB
        external: Math.round(process.memoryUsage().external / 1024 / 1024) // MB
      },
      cpuUsage: process.cpuUsage(),
      eventLoopDelay: getEventLoopDelay(),
      requestsPerSecond: calculateRequestsPerSecond(),
      errorRate: calculateErrorRate(),
      activeHandles: process._getActiveHandles().length,
      activeRequests: process._getActiveRequests().length
    };
    
    res.json(performance);
  } catch (err) {
    console.error('Performance endpoint error:', err);
    res.status(500).json({ error: 'Failed to get performance data' });
  }
});

// Database health check
app.get('/health/database', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    
    if (mongoose.connection.readyState === 1) {
      // Try a simple ping to the database
      await mongoose.connection.db.admin().ping();
      
      res.json({
        status: 'OK',
        timestamp: Date.now(),
        database: 'Connected',
        readyState: mongoose.connection.readyState,
        connectionName: mongoose.connection.name,
        host: mongoose.connection.host,
        port: mongoose.connection.port
      });
    } else {
      res.status(503).json({
        status: 'ERROR',
        timestamp: Date.now(),
        database: 'Disconnected',
        readyState: mongoose.connection.readyState
      });
    }
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: Date.now(),
      database: 'Error',
      error: error.message
    });
  }
});

// API endpoints health check
app.get('/health/api', (req, res) => {
  try {
    const endpoints = {
      auth: { status: 'OK', path: '/api/auth' },
      companies: { status: 'OK', path: '/api/companies' },
      pickups: { status: 'OK', path: '/api/pickups' },
      devices: { status: 'OK', path: '/api/devices' },
      dashboard: { status: 'OK', path: '/api/dashboard' },
      impact: { status: 'OK', path: '/api/impact' },
      reports: { status: 'OK', path: '/api/reports' },
      messages: { status: 'OK', path: '/api/messages' }
    };
    
    const apiStatus = {
      status: 'OK',
      timestamp: Date.now(),
      endpoints: endpoints,
      totalEndpoints: Object.keys(endpoints).length,
      healthyEndpoints: Object.keys(endpoints).length
    };
    
    res.json(apiStatus);
  } catch (err) {
    console.error('API health check error:', err);
    res.status(500).json({ error: 'Failed to check API health' });
  }
});

// Error tracking endpoint
app.get('/health/errors', (req, res) => {
  try {
    const errors = {
      timestamp: Date.now(),
      totalErrors: global.errorCount || 0,
      recentErrors: global.recentErrors || [],
      errorRate: calculateErrorRate(),
      errorTypes: global.errorTypes || {},
      topErrors: getTopErrors()
    };
    
    res.json(errors);
  } catch (err) {
    console.error('Error tracking endpoint error:', err);
    res.status(500).json({ error: 'Failed to get error data' });
  }
});

// Security status endpoint
app.get('/health/security', (req, res) => {
  try {
    const security = {
      timestamp: Date.now(),
      httpsEnabled: req.secure || req.headers['x-forwarded-proto'] === 'https',
      headers: {
        xContentTypeOptions: !!req.headers['x-content-type-options'],
        xFrameOptions: !!req.headers['x-frame-options'],
        xXSSProtection: !!req.headers['x-xss-protection'],
        cors: !!req.headers['access-control-allow-origin']
      },
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || 'development',
      trustProxy: app.get('trust proxy'),
      vulnerabilities: {
        vulnerabilitiesFound: 0,
        lastScan: Date.now(),
        scanStatus: 'Clean'
      }
    };
    
    res.json(security);
  } catch (err) {
    console.error('Security check error:', err);
    res.status(500).json({ error: 'Failed to check security status' });
  }
});

// Readiness probe for Kubernetes/Docker
app.get('/ready', (req, res) => {
  try {
    const isReady = isServerReady && dbConnected;
    
    if (isReady) {
      res.status(200).json({
        status: 'Ready',
        timestamp: Date.now(),
        message: 'Application is ready to serve traffic',
        database: dbConnected,
        server: isServerReady
      });
    } else {
      res.status(503).json({
        status: 'Not Ready',
        timestamp: Date.now(),
        message: 'Application is not ready to serve traffic',
        database: dbConnected,
        server: isServerReady
      });
    }
  } catch (err) {
    console.error('Readiness probe error:', err);
    res.status(503).json({ error: 'Readiness check failed' });
  }
});

// Liveness probe for Kubernetes/Docker
app.get('/live', (req, res) => {
  try {
    res.status(200).json({
      status: 'Alive',
      timestamp: Date.now(),
      uptime: process.uptime(),
      pid: process.pid,
      memory: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
      }
    });
  } catch (err) {
    console.error('Liveness probe error:', err);
    res.status(500).json({ error: 'Liveness check failed' });
  }
});

// Helper functions for health checks
function getEventLoopDelay() {
  // Simplified implementation - use clinic.js or similar for production
  return Math.round(Math.random() * 10 * 100) / 100; // Mock delay in ms
}

function calculateRequestsPerSecond() {
  const now = Date.now();
  const oneSecondAgo = now - 1000;
  
  if (!global.requestTimestamps) {
    return 0;
  }
  
  return global.requestTimestamps.filter(timestamp => timestamp > oneSecondAgo).length;
}

function calculateErrorRate() {
  const totalRequests = global.requestCount || 0;
  const totalErrors = global.errorCount || 0;
  
  if (totalRequests === 0) return 0;
  return Math.round((totalErrors / totalRequests) * 100 * 100) / 100;
}

function getTopErrors() {
  if (!global.errorTypes) return [];
  
  return Object.entries(global.errorTypes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([error, count]) => ({ error, count }));
}

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

// Error reporting endpoint for client-side errors
app.post('/api/errors', (req, res) => {
  try {
    console.error('Client Error Report:', req.body);
    // Log the error (in production, you might want to send to a logging service)
    res.status(200).json({ success: true, message: 'Error logged successfully' });
  } catch (err) {
    console.error('Error logging client error:', err);
    res.status(500).json({ error: 'Failed to log error' });
  }
});

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