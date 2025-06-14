// Service Worker for RYGNeco PWA
// Version 2.0.0 - Enhanced with Push Notifications and Advanced Caching

const CACHE_NAME = 'rygn-eco-v2.0.0';
const STATIC_CACHE = 'rygn-eco-static-v2.0.0';
const DYNAMIC_CACHE = 'rygn-eco-dynamic-v2.0.0';
const IMAGE_CACHE = 'rygn-eco-images-v2.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  // Add critical pages
  '/login',
  '/register',
  '/about',
  '/contact',
  '/how-it-works',
  '/dashboard',
  '/schedule-pickup',
  // Add critical images
  '/images/robot-logo.svg',
  '/images/e-waste-hero.png',
  '/images/trading-chart.jpg',
  // Offline fallback page
  '/offline.html'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/auth\/me/,
  /\/api\/dashboard/,
  /\/api\/companies/,
  /\/api\/impact/,
  /\/api\/pickups/,
  /\/api\/devices/
];

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Push event received:', event);
  
  let notificationData = {
    title: 'RYGNeco Notification',
    body: 'You have a new update from RYGNeco',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: {
      url: '/'
    }
  };
  
  if (event.data) {
    try {
      notificationData = { ...notificationData, ...event.data.json() };
    } catch (e) {
      console.error('Error parsing push data:', e);
    }
  }
  
  const notificationOptions = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    data: notificationData.data,
    actions: [
      {
        action: 'view',
        title: 'View'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ],
    requireInteraction: true,
    vibrate: [200, 100, 200]
  };
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationOptions)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received:', event);
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's an existing window/tab open
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window/tab
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);
  
  if (event.tag === 'pickup-sync') {
    event.waitUntil(syncPickupData());
  } else if (event.tag === 'contact-sync') {
    event.waitUntil(syncContactForm());
  }
});

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing v2.0.0...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(IMAGE_CACHE).then((cache) => {
        console.log('Service Worker: Preparing image cache');
        return cache.addAll([
          '/images/robot-logo.svg',
          '/images/e-waste-hero.png'
        ]);
      })
    ])
      .then(() => {
        console.log('Service Worker: All assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating v2.0.0...');
  
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
      .then(() => {
        console.log('Service Worker: Activated and claimed clients');
      })
  );
});

// Enhanced fetch event with intelligent caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests with specific strategies
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
  } else {
    event.respondWith(handleOtherRequests(request));
  }
});

// Enhanced API request handling with background sync
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const cache = await caches.open(DYNAMIC_CACHE);
  
  try {
    // Network-first strategy for API requests
    const networkResponse = await fetch(request);
    
    // Cache successful responses for specific endpoints
    if (networkResponse.ok && shouldCacheApiResponse(url.pathname)) {
      cache.put(request, networkResponse.clone());
      
      // Track API performance
      if ('performance' in self) {
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'API_PERFORMANCE',
              endpoint: url.pathname,
              status: networkResponse.status,
              timestamp: Date.now()
            });
          });
        });
      }
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed for API request, trying cache');
    
    // Try cache as fallback
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      // Send offline indicator to clients
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'OFFLINE_DATA',
            endpoint: url.pathname
          });
        });
      });
      
      return cachedResponse;
    }
    
    // Return structured offline response
    return new Response(JSON.stringify({ 
      error: 'Offline', 
      message: 'This data is not available offline. Please check your connection.',
      offline: true,
      timestamp: Date.now()
    }), {
      status: 503,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }
}

// Enhanced image handling with WebP support
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  
  try {
    // Check cache first for images
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Try network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful image responses
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to fetch image', request.url);
    
    // Return optimized fallback image
    const fallbackSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
        <rect width="300" height="200" fill="#f0f0f0"/>
        <text x="150" y="100" text-anchor="middle" dy=".3em" fill="#4ECDC4" font-family="Arial, sans-serif" font-size="16">
          Image unavailable offline
        </text>
        <text x="150" y="120" text-anchor="middle" dy=".3em" fill="#666" font-family="Arial, sans-serif" font-size="12">
          RYGNeco
        </text>
      </svg>
    `;
    
    return new Response(fallbackSvg, {
      headers: { 
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache'
      }
    });
  }
}

// Enhanced static asset handling
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  
  try {
    // Cache-first strategy for static assets
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Try network if not in cache
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to fetch static asset', request.url);
    throw error;
  }
}

// Enhanced navigation handling with offline page
async function handleNavigation(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed for navigation, trying cache');
    
    // Try to serve cached version of the page
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Try to serve the main app shell
    const appShell = await caches.match('/');
    if (appShell) {
      return appShell;
    }
    
    // Last resort: return offline page
    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>RYGNeco - Offline</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px; 
              background: #1C392B;
              color: white;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: rgba(76, 205, 196, 0.1);
              padding: 40px;
              border-radius: 10px;
            }
            .logo { color: #4ECDC4; font-size: 2em; margin-bottom: 20px; }
            .retry-btn {
              background: #4ECDC4;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 20px;
            }
            .retry-btn:hover { background: #3C8975; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">RYGNeco</div>
            <h1>You're Offline</h1>
            <p>It looks like you're not connected to the internet. Please check your connection and try again.</p>
            <p>Some features may still be available offline.</p>
            <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Handle other requests
async function handleOtherRequests(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.log('Service Worker: Failed to fetch other request', request.url);
    throw error;
  }
}

// Utility functions
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.includes('/static/') || 
         url.pathname.endsWith('.js') || 
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.ico') ||
         url.pathname.endsWith('.json');
}

function shouldCacheApiResponse(pathname) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(pathname));
}

// Background sync functions
async function syncPickupData() {
  try {
    console.log('Syncing pickup data...');
    // Implementation for syncing pickup data when back online
    const response = await fetch('/api/pickups/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      console.log('Pickup data synced successfully');
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'SYNC_SUCCESS',
            data: 'pickup-data'
          });
        });
      });
    }
  } catch (error) {
    console.error('Failed to sync pickup data:', error);
  }
}

async function syncContactForm() {
  try {
    console.log('Syncing contact form data...');
    // Implementation for syncing contact form when back online
    const response = await fetch('/api/contact/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      console.log('Contact form synced successfully');
    }
  } catch (error) {
    console.error('Failed to sync contact form:', error);
  }
}

// Message handling from main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: '2.0.0' });
  }
  
  if (event.data && event.data.type === 'CACHE_CLEANUP') {
    cleanupOldCaches();
  }
});

// Cleanup old caches
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    !name.includes('v2.0.0') && name.includes('rygn-eco')
  );
  
  await Promise.all(
    oldCaches.map(cacheName => caches.delete(cacheName))
  );
  
  console.log('Cleaned up old caches:', oldCaches);
}

console.log('Service Worker: Script loaded'); 