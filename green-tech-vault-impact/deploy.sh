#!/bin/bash

# Green Tech Vault Deployment Script
# This script handles the deployment process for the Green Tech Vault application

echo "=========================================="
echo "Green Tech Vault Deployment Script"
echo "=========================================="
echo "This script will verify and deploy your changes."
echo ""

# Check if necessary files exist before proceeding
echo "Verifying critical files..."

missing_files=false

# Array of critical files to check
files_to_check=(
  "build.sh"
  "copy-images.js"
  "keep-alive.js"
  "render.yaml"
  "server/index.js"
  "client/public/images/robot-logo.svg"
  "client/public/images/e-waste-hero.png"
)

for file in "${files_to_check[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing critical file: $file"
    missing_files=true
  else
    echo "✅ Found file: $file"
  fi
done

if [ "$missing_files" = true ]; then
  echo ""
  echo "Error: Some critical files are missing. Please address the issues above before deploying."
  exit 1
fi

echo ""
echo "All critical files verified."
echo ""

# Make build.sh executable
chmod +x build.sh
echo "✅ Made build.sh executable"

# Run image copy verification
echo ""
echo "Testing image copy process..."
node copy-images.js
if [ $? -ne 0 ]; then
  echo "Error: Image copy process failed. Please fix the issues before deploying."
  exit 1
fi

# Commit changes if requested
echo ""
echo "Would you like to commit and push your changes now? (y/n)"
read -r commit_response

if [ "$commit_response" = "y" ] || [ "$commit_response" = "Y" ]; then
  echo ""
  echo "Enter a commit message (default: 'Updated deployment configuration and UI fixes'):"
  read -r commit_message
  
  if [ -z "$commit_message" ]; then
    commit_message="Updated deployment configuration and UI fixes"
  fi
  
  git add .
  git commit -m "$commit_message"
  
  echo ""
  echo "Would you like to push to remote repository? (y/n)"
  read -r push_response
  
  if [ "$push_response" = "y" ] || [ "$push_response" = "Y" ]; then
    git push origin main
    echo "✅ Changes pushed to GitHub"
  else
    echo "Changes committed locally but not pushed."
  fi
else
  echo "Skipping commit process."
fi

echo ""
echo "Deployment preparation complete!"
echo "--------------------------------------"
echo "Next steps:"
echo "1. If changes were pushed, your app should deploy automatically on Render"
echo "2. If not, manually deploy from the Render dashboard"
echo "3. After deployment, verify the UI changes:"
echo "   - Robot logo appears in the header (with teal background)"
echo "   - Footer has the correct dark teal color (#073C3F)"
echo "   - Impact section is properly positioned near the Process cards"
echo ""
echo "To manually deploy on Render:"
echo "1. Go to https://dashboard.render.com/"
echo "2. Select your 'green-tech-vault' service"
echo "3. Click 'Manual Deploy' > 'Deploy latest commit'"
echo ""
echo "For troubleshooting, refer to DEPLOYMENT_INSTRUCTIONS.md"
echo "==========================================" 