#!/usr/bin/env node

/**
 * Deployment verification script
 * Checks if the deployed application is working correctly
 */

const https = require('https');
const http = require('http');

const DEPLOYMENT_URL = 'https://green-tech-vault.onrender.com';
const BACKUP_URL = 'https://green-tech-vault-impact.onrender.com';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const module = url.startsWith('https') ? https : http;
    
    const req = module.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function checkEndpoint(baseUrl, endpoint, description) {
  const url = `${baseUrl}${endpoint}`;
  console.log(`\n🔍 Checking ${description}: ${url}`);
  
  try {
    const response = await makeRequest(url);
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`✅ ${description} - Status: ${response.statusCode}`);
      
      // Try to parse JSON response for API endpoints
      if (endpoint.startsWith('/api/') || endpoint === '/health' || endpoint === '/wakeup') {
        try {
          const jsonData = JSON.parse(response.body);
          console.log(`📄 Response:`, JSON.stringify(jsonData, null, 2));
        } catch (e) {
          console.log(`📄 Response (non-JSON): ${response.body.substring(0, 200)}...`);
        }
      } else {
        console.log(`📄 Response length: ${response.body.length} characters`);
      }
      
      return true;
    } else {
      console.log(`❌ ${description} - Status: ${response.statusCode}`);
      console.log(`📄 Response: ${response.body.substring(0, 500)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${description} - Error: ${error.message}`);
    return false;
  }
}

async function runDeploymentCheck() {
  console.log('🚀 Starting deployment verification...');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  const urls = [DEPLOYMENT_URL, BACKUP_URL];
  
  for (const baseUrl of urls) {
    console.log(`\n🌐 Testing base URL: ${baseUrl}`);
    
    const checks = [
      { endpoint: '/health', description: 'Health Check' },
      { endpoint: '/wakeup', description: 'Wake Up Check' },
      { endpoint: '/', description: 'Main Application' },
      { endpoint: '/static/css/main.*.css', description: 'CSS Assets' },
      { endpoint: '/static/js/main.*.js', description: 'JS Assets' }
    ];
    
    let successCount = 0;
    
    for (const check of checks) {
      const success = await checkEndpoint(baseUrl, check.endpoint, check.description);
      if (success) successCount++;
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n📊 Results for ${baseUrl}: ${successCount}/${checks.length} checks passed`);
    
    if (successCount >= 2) {
      console.log(`✅ ${baseUrl} appears to be working!`);
      break; // If this URL works, no need to check the backup
    } else {
      console.log(`❌ ${baseUrl} has issues, trying next URL...`);
    }
  }
  
  console.log('\n🏁 Deployment verification complete!');
  console.log('\n💡 Manual steps to check:');
  console.log('1. Visit the website in a browser');
  console.log('2. Check browser console for errors');
  console.log('3. Test navigation between pages');
  console.log('4. Verify images are loading');
  console.log('5. Check that animations work properly');
}

// Run the check
runDeploymentCheck().catch((error) => {
  console.error('❌ Deployment check failed:', error);
  process.exit(1);
}); 