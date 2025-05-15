const fs = require('fs');
const path = require('path');

console.log('Starting image file check and copy process...');

// Ensure build/images directory exists
const buildImagesDir = path.join(__dirname, 'client', 'build', 'images');
if (!fs.existsSync(buildImagesDir)) {
  console.log(`Creating directory: ${buildImagesDir}`);
  fs.mkdirSync(buildImagesDir, { recursive: true });
}

// List of critical images that must be copied
const criticalImages = [
  { src: 'client/public/images/robot-logo.svg', dest: 'client/build/images/robot-logo.svg' },
  { src: 'client/public/images/e-waste-hero.png', dest: 'client/build/images/e-waste-hero.png' },
  { src: 'client/public/images/leila-meyer.jpg', dest: 'client/build/images/leila-meyer.jpg' },
  { src: 'client/public/images/stock-chart.jpg', dest: 'client/build/images/stock-chart.jpg' }
];

// Copy each image file, ensuring source exists
criticalImages.forEach(img => {
  try {
    if (fs.existsSync(img.src)) {
      fs.copyFileSync(img.src, img.dest);
      console.log(`Successfully copied: ${img.src} to ${img.dest}`);
    } else {
      console.error(`ERROR: Source file not found: ${img.src}`);
    }
  } catch (error) {
    console.error(`Error copying ${img.src}: ${error.message}`);
  }
});

// List the contents of the build/images directory to verify
console.log('\nContents of build/images directory:');
if (fs.existsSync(buildImagesDir)) {
  const files = fs.readdirSync(buildImagesDir);
  if (files.length === 0) {
    console.log('Directory is empty!');
  } else {
    files.forEach(file => {
      console.log(` - ${file}`);
    });
  }
} else {
  console.error('build/images directory does not exist!');
}

console.log('\nImage verification complete.'); 