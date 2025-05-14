/**
 * Special server-side handling for image requests that might be missing
 * This acts as a middleware to provide fallback images when files aren't found
 */

const fs = require('fs');
const path = require('path');

/**
 * Middleware to handle image requests with fallbacks for critical images
 */
function imageMiddleware(req, res, next) {
  // Only intercept requests to the /images/ path
  if (!req.path.startsWith('/images/')) {
    return next();
  }

  console.log(`[Image Middleware] Request for: ${req.path}`);

  // Define fallbacks for specific images
  if (req.path === '/images/robot-logo.svg') {
    // Robot logo SVG fallback
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="#FF8C00" />
        <circle cx="35" cy="40" r="10" fill="white" />
        <circle cx="65" cy="40" r="10" fill="white" />
        <rect x="30" y="65" width="40" height="5" fill="white" />
      </svg>
    `);
  }
  
  if (req.path === '/images/leila-meyer.jpg') {
    // CEO profile image SVG fallback
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2A8784">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2M12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5M12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"/>
      </svg>
    `);
  }
  
  if (req.path === '/images/stock-chart.jpg') {
    // Gradient image fallback for the stats section
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e3c72;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2a5298;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
      </svg>
    `);
  }

  // Check if file exists in the filesystem
  const filePath = path.join(__dirname, 'client/build', req.path);
  if (fs.existsSync(filePath)) {
    // File exists, let Express handle it normally
    return next();
  }

  // For any other missing image, provide a generic placeholder
  if (req.path.endsWith('.svg')) {
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect width="200" height="200" fill="#f0f0f0" />
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14">
          Image Not Found
        </text>
      </svg>
    `);
  } else {
    // For other image types
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect width="200" height="200" fill="#f0f0f0" />
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14">
          Image Not Found: ${path.basename(req.path)}
        </text>
      </svg>
    `);
  }
}

module.exports = imageMiddleware; 