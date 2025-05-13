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
mkdir -p public/images

# Make sure the robot logo is copied to the build folder
cp public/images/robot-logo.svg build/images/robot-logo.svg

# Make sure all files are properly set up before deployment
echo "Build completed successfully!" 