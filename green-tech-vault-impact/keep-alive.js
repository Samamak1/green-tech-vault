/**
 * This script sends regular requests to the website to keep it from idling,
 * which is useful for free hosting plans that sleep after inactivity.
 */

const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = process.env.BASE_URL || 'https://green-tech-vault.onrender.com';
const PING_INTERVAL = process.env.PING_INTERVAL || 10 * 60 * 1000; // 10 minutes by default
const ADDITIONAL_PATHS = ['/wakeup', '/', '/api/auth/me']; // Add key endpoints to keep warm
const USE_HTTPS = BASE_URL.startsWith('https');

console.log(`Keep-alive service started for ${BASE_URL}`);
console.log(`Will ping every ${PING_INTERVAL / 60000} minutes`);

/**
 * Send a ping request to a specified path
 */
function ping(path) {
  const url = `${BASE_URL}${path}`;
  console.log(`Pinging: ${url} at ${new Date().toISOString()}`);
  
  const httpClient = USE_HTTPS ? https : http;
  
  const req = httpClient.get(url, (res) => {
    const { statusCode } = res;
    
    if (statusCode !== 200) {
      console.log(`Received status code ${statusCode} from ${path}`);
    } else {
      console.log(`Successfully pinged ${path} - Status: ${statusCode}`);
    }
    
    // Consume response data to free up memory
    res.resume();
  });
  
  req.on('error', (e) => {
    console.error(`Error pinging ${path}: ${e.message}`);
  });
  
  // Set a timeout to prevent hanging
  req.setTimeout(15000, () => {
    console.error(`Request to ${path} timed out`);
    req.abort();
  });
}

/**
 * Ping all configured paths
 */
function pingAll() {
  console.log('\n--- Starting ping cycle ---');
  
  // Ping each path with a small delay between requests
  ADDITIONAL_PATHS.forEach((path, index) => {
    setTimeout(() => {
      ping(path);
    }, index * 5000); // 5-second gap between pings
  });
}

// Start immediately
pingAll();

// Then run on the configured interval
setInterval(pingAll, PING_INTERVAL);

console.log(`Keep-alive service will run until process is terminated.`);

// Keep the script running
process.stdin.resume();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Keep-alive service terminated.');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  // Continue running despite errors
}); 