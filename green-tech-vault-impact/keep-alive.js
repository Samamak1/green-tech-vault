const https = require('https');
const http = require('http');

// URL of your Render service
const url = 'https://green-tech-vault.onrender.com/wakeup';

// Function to ping the service
function pingService() {
  console.log(`Pinging service at ${new Date().toISOString()}`);
  
  // Determine which protocol to use
  const requester = url.startsWith('https') ? https : http;
  
  requester.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`Response: ${res.statusCode}`);
      try {
        if (data) {
          const parsed = JSON.parse(data);
          console.log(`Service status: ${parsed.status}, ready: ${parsed.ready}, database: ${parsed.database}, timestamp: ${parsed.timestamp}`);
        }
      } catch (e) {
        console.log('Could not parse response as JSON');
      }
    });
  }).on('error', (err) => {
    console.error(`Error pinging service: ${err.message}`);
  });
}

// Ping immediately then every 14 minutes (Render free tier spins down after 15 minutes of inactivity)
pingService();
setInterval(pingService, 14 * 60 * 1000);

console.log('Keep-alive service started. Pinging every 14 minutes.'); 