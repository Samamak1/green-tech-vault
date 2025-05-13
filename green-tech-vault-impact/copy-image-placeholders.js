/**
 * This script creates placeholder template files for required images
 * so the build process doesn't fail if real images aren't uploaded yet.
 * IMPORTANT: These MUST be replaced with real images from the UI mockups before production.
 */

const fs = require('fs');
const path = require('path');

console.log('Creating image placeholder files...');

// Create directory structure if not exists
const imagesDir = path.join(__dirname, 'client', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  console.log(`Creating directory: ${imagesDir}`);
  fs.mkdirSync(imagesDir, { recursive: true });
}

// List of critical images that need placeholders
const criticalImages = [
  { 
    path: 'client/public/images/robot-logo.svg',
    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#2A8784" />
  <circle cx="35" cy="40" r="10" fill="white" />
  <circle cx="65" cy="40" r="10" fill="white" />
  <rect x="30" y="65" width="40" height="5" fill="white" />
</svg>`
  },
  { 
    path: 'client/public/images/leila-meyer.jpg',
    content: 'PLACEHOLDER - Replace with actual CEO image'
  },
  { 
    path: 'client/public/images/stock-chart.jpg',
    content: 'PLACEHOLDER - Replace with actual stock chart image for parallax effect'
  }
];

// Create each placeholder file if it doesn't exist
criticalImages.forEach(img => {
  const fullPath = path.resolve(__dirname, img.path);
  
  // Only create if it doesn't exist
  if (!fs.existsSync(fullPath)) {
    try {
      fs.writeFileSync(fullPath, img.content);
      console.log(`Created placeholder for: ${img.path}`);
    } catch (err) {
      console.error(`Error creating placeholder for ${img.path}: ${err.message}`);
    }
  } else {
    console.log(`File already exists (skipping): ${img.path}`);
  }
});

console.log('\nPlaceholder creation complete.');
console.log('IMPORTANT: Replace these placeholder files with real images before deploying to production.');
console.log('See IMAGE_LOADING_FIX.md for detailed instructions.'); 