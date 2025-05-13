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
cd ../ && node copy-images.js

# Verify the copies were made successfully
echo "Verifying image files in build directory:"
ls -la client/build/images/

# Make sure all files are properly set up before deployment
echo "Build completed successfully!" 