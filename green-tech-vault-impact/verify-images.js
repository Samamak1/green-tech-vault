/**
 * This script verifies that all critical image files exist in the right locations
 * and have proper content (not just placeholders).
 */

const fs = require('fs');
const path = require('path');

console.log('Starting image verification process...');

// Critical images that must exist
const criticalImages = [
  { path: 'client/public/images/robot-logo.svg', name: 'Robot Logo' },
  { path: 'client/public/images/stock-chart.jpg', name: 'Stock Chart Background' },
  { path: 'client/public/images/leila-meyer.jpg', name: 'CEO Portrait' },
  { path: 'client/public/images/e-waste-hero.png', name: 'Hero Background' }
];

// Check each image file
let hasErrors = false;
criticalImages.forEach(img => {
  const fullPath = path.resolve(__dirname, img.path);
  console.log(`\nChecking ${img.name} at: ${fullPath}`);
  
  let exists = fs.existsSync(fullPath);
  console.log(`- File exists: ${exists}`);
  
  if (exists) {
    try {
      const stats = fs.statSync(fullPath);
      console.log(`- File size: ${stats.size} bytes`);
      
      // Check if the file is a placeholder (too small to be a real image)
      if (stats.size < 100) {
        console.error(`⚠ WARNING: ${img.name} appears to be a placeholder or is too small (${stats.size} bytes)`);
        hasErrors = true;
      } else {
        console.log(`✓ ${img.name} appears to be a valid file`);
      }
    } catch (err) {
      console.error(`⚠ ERROR: Could not read ${img.name}: ${err.message}`);
      hasErrors = true;
    }
  } else {
    console.error(`⚠ ERROR: ${img.name} is missing`);
    hasErrors = true;
  }
});

// Check build folder images too if they exist
const buildFolder = path.resolve(__dirname, 'client/build');
if (fs.existsSync(buildFolder)) {
  console.log('\nChecking build folder images:');
  criticalImages.forEach(img => {
    const buildPath = img.path.replace('public', 'build');
    const fullBuildPath = path.resolve(__dirname, buildPath);
    
    let exists = fs.existsSync(fullBuildPath);
    console.log(`- ${img.name} in build: ${exists}`);
    
    if (exists) {
      const stats = fs.statSync(fullBuildPath);
      if (stats.size < 100) {
        console.error(`⚠ WARNING: ${img.name} in build folder appears to be a placeholder (${stats.size} bytes)`);
        hasErrors = true;
      }
    }
  });
}

console.log('\nImage verification complete.');
if (hasErrors) {
  console.error('⚠ Some issues were detected with the image files!');
  console.log('Please ensure all image files are properly placed and are not placeholders.');
} else {
  console.log('✓ All image files appear to be in order.');
} 