const fs = require('fs');
const path = require('path');

// Source and destination directories
const sourceDir = path.join(__dirname, 'public', 'images');
const destDir = path.join(__dirname, 'build', 'images');

// Function to copy directory recursively
function copyDirectory(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const items = fs.readdirSync(src);

  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      // Recursively copy subdirectory
      copyDirectory(srcPath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${item}`);
    }
  });
}

// Check if source directory exists
if (fs.existsSync(sourceDir)) {
  console.log('Copying images to build directory...');
  copyDirectory(sourceDir, destDir);
  console.log('Images copied successfully!');
} else {
  console.log('Source images directory not found, skipping copy.');
} 