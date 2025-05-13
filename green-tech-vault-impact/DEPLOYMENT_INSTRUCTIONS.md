# Deployment Instructions

Follow these steps to deploy your changes to Render:

1. **Commit and push all changes to GitHub**:
   ```bash
   git add .
   git commit -m "Updated homepage design with new image and layout improvements"
   git push origin main
   ```

2. **Manual Deployment (if needed)**:
   If automatic deployment doesn't trigger, you can manually deploy from the Render dashboard:
   - Go to https://dashboard.render.com/
   - Select your "green-tech-vault" service
   - Click "Manual Deploy" > "Deploy latest commit"

3. **Verify the deployment**:
   - After deployment completes, visit your site
   - The homepage should now include:
     - Updated layout with the circuit board background image
     - Robot logo in the header
     - Grey scrollbar with arrows
     - Updated "What We Offer" text line break
     - Restyled Impact section with the Process button moved below it
     - Footer with the dark teal color (#073C3F)

4. **If images aren't showing**:
   - Make sure the `robot-logo.svg` and `e-waste-hero.png` files are properly copied to the build/images directory
   - You may need to manually upload these files through Render's shell access

5. **Keeping the site active**:
   - To prevent the site from going to sleep (503 errors), remember to run the keep-alive script regularly:
   ```bash
   npm run keep-alive
   ```

## Changes That Were Made

1. **Homepage Layout**:
   - Fixed the text line break in "What We Offer" section
   - Improved Impact section styling to match Process cards
   - Reordered Process button and Impact section

2. **Global Styling**:
   - Updated footer color to #073C3F
   - Changed scrollbar style to gray with arrows
   - Added robot logo to header

3. **Build and Deployment**:
   - Updated build script to ensure images are properly included
   - Modified render.yaml to use the build script
   - Added keep-alive script to prevent 503 errors 