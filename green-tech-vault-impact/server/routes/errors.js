const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Error reporting endpoint
router.post('/', async (req, res) => {
  try {
    const errorReport = {
      ...req.body,
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      referer: req.get('Referer')
    };

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Client Error Report:', errorReport);
    }

    // Save error to file (in production, you might want to use a proper logging service)
    const errorLogPath = path.join(__dirname, '../logs/client-errors.log');
    
    // Ensure logs directory exists
    const logsDir = path.dirname(errorLogPath);
    try {
      await fs.access(logsDir);
    } catch {
      await fs.mkdir(logsDir, { recursive: true });
    }

    // Append error to log file
    const logEntry = JSON.stringify(errorReport) + '\n';
    await fs.appendFile(errorLogPath, logEntry);

    // In production, you might want to send to external error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, LogRocket, or other error tracking service
      // await sendToErrorTrackingService(errorReport);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Error report received',
      errorId: errorReport.errorId 
    });

  } catch (error) {
    console.error('Failed to process error report:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process error report' 
    });
  }
});

// Get error statistics (for admin dashboard)
router.get('/stats', async (req, res) => {
  try {
    const errorLogPath = path.join(__dirname, '../logs/client-errors.log');
    
    try {
      const logData = await fs.readFile(errorLogPath, 'utf8');
      const errors = logData.trim().split('\n')
        .filter(line => line.trim())
        .map(line => JSON.parse(line));

      // Calculate statistics
      const stats = {
        totalErrors: errors.length,
        last24Hours: errors.filter(error => 
          new Date(error.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length,
        errorTypes: {},
        browsers: {},
        pages: {}
      };

      // Analyze error patterns
      errors.forEach(error => {
        // Count error types
        const errorType = error.message || 'Unknown';
        stats.errorTypes[errorType] = (stats.errorTypes[errorType] || 0) + 1;

        // Count browsers
        const browser = error.userAgent ? 
          error.userAgent.split(' ').find(part => part.includes('Chrome') || part.includes('Firefox') || part.includes('Safari')) || 'Unknown'
          : 'Unknown';
        stats.browsers[browser] = (stats.browsers[browser] || 0) + 1;

        // Count pages
        const page = error.url || 'Unknown';
        stats.pages[page] = (stats.pages[page] || 0) + 1;
      });

      res.json(stats);
    } catch (fileError) {
      // No log file exists yet
      res.json({
        totalErrors: 0,
        last24Hours: 0,
        errorTypes: {},
        browsers: {},
        pages: {}
      });
    }
  } catch (error) {
    console.error('Failed to get error stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get error statistics' 
    });
  }
});

// Clear error logs (admin only)
router.delete('/clear', async (req, res) => {
  try {
    // In a real application, you'd want to check admin authentication here
    const errorLogPath = path.join(__dirname, '../logs/client-errors.log');
    
    try {
      await fs.unlink(errorLogPath);
      res.json({ success: true, message: 'Error logs cleared' });
    } catch (fileError) {
      // File doesn't exist, that's fine
      res.json({ success: true, message: 'No error logs to clear' });
    }
  } catch (error) {
    console.error('Failed to clear error logs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to clear error logs' 
    });
  }
});

module.exports = router; 