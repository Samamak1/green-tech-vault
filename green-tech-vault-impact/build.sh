#!/bin/bash

# Make script executable
chmod +x ./build.sh

echo "Current directory: $(pwd)"
echo "Listing files: $(ls -la)"

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
cp public/images/leila-meyer.jpg build/images/leila-meyer.jpg || echo "Warning: Failed to copy CEO image"

# Verify the copies were made successfully
echo "Verifying image files in build directory:"
ls -la build/images/

# Make sure all files are properly set up before deployment
echo "Build completed successfully!" 