const https = require('https');
const fs = require('fs');
const path = require('path');

// URL of a brighter circuit board image
const imageUrl = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop';

// Destination path
const destPath = path.join(__dirname, 'client', 'public', 'images', 'e-waste-hero.png');

// Make sure the directory exists
const dir = path.dirname(destPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Download the image
https.get(imageUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download image: ${response.statusCode} ${response.statusMessage}`);
    return;
  }
  
  const fileStream = fs.createWriteStream(destPath);
  response.pipe(fileStream);
  
  fileStream.on('finish', () => {
    fileStream.close();
    console.log(`Image downloaded to ${destPath}`);
  });
}).on('error', (err) => {
  console.error(`Error downloading image: ${err.message}`);
}); 