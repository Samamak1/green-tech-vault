#!/bin/bash

# Make script executable
chmod +x ./build.sh

echo "Current directory: $(pwd)"
echo "Listing files: $(ls -la)"

# Check for placeholder images
echo "Checking for placeholder images before build..."
node verify-images.js

# Install dependencies in root directory
npm install

# Change to client directory, install dependencies, and build
cd client && npm install && npm run build

# Create the images directory if it doesn't exist
mkdir -p build/images

# Ensure critical images are copied to the build folder
echo "Copying critical images to build directory"
cp public/images/robot-logo.svg build/images/robot-logo.svg || echo "Warning: Failed to copy robot logo"
cp public/images/e-waste-hero.png build/images/e-waste-hero.png || echo "Warning: Failed to copy hero image"

# IMPORTANT: Copy the CEO image with special handling to ensure it's available
echo "Copying CEO image (critical for About Us and CEO Profile pages)"
if [ -f "public/images/leila-meyer.jpg" ]; then
  cp public/images/leila-meyer.jpg build/images/leila-meyer.jpg
  echo "✓ Successfully copied CEO image"
else
  echo "⚠ CEO image not found in source directory!"
  echo "Please ensure leila-meyer.jpg is placed in client/public/images/"
fi

cp public/images/stock-chart.jpg build/images/stock-chart.jpg || echo "Warning: Failed to copy stock chart image"

# Verify the copies were made successfully
echo "Verifying image files in build directory:"
ls -la build/images/

# Make sure all files are properly set up before deployment
echo "Build completed successfully!" 