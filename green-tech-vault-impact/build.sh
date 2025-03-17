#!/bin/bash
echo "Current directory: $(pwd)"
echo "Listing files: $(ls -la)"

# Install root dependencies
npm install

# Install and build client
cd client
npm install
npm run build

# Return to root
cd .. 