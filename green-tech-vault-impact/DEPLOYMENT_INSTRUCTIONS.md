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
     - Robot logo in the header (with teal background color)
     - Grey scrollbar with arrows
     - Updated "What We Offer" text line break
     - Restyled Impact section moved closer to the Process cards
     - Footer with the dark teal color (#073C3F)

4. **If images aren't showing**:
   - The build process includes a copy-images.js script that should automatically copy images
   - If the robot logo is still missing, try these steps:
     - Check the Render logs for any file copy errors
     - Manually upload the images through Render's shell access:
       ```bash
       cd client/build/images
       # Use the file upload function in the Render shell
       # Upload robot-logo.svg and e-waste-hero.png
       ```
   - Verify the headers and footers have the correct colors:
     - Header background should be: #2A8784
     - Footer background should be: #073C3F

5. **Keeping the site active**:
   - To prevent the site from going to sleep (503 errors), remember to run the keep-alive script regularly:
   ```bash
   npm run keep-alive
   ```

## Changes That Were Made

1. **Homepage Layout**:
   - Fixed the text line break in "What We Offer" section
   - Improved Impact section styling to match Process cards
   - Moved Impact section closer to the Process cards
   - Reordered Process button below the Impact section

2. **Global Styling**:
   - Updated footer color to #073C3F
   - Changed header color to #2A8784 for better logo visibility
   - Updated scrollbar style to gray with arrows
   - Added robot logo to header with error detection

3. **Build and Deployment**:
   - Updated build script to ensure images are properly included
   - Added copy-images.js to verify and copy critical images
   - Modified render.yaml to use the build script
   - Added keep-alive script to prevent 503 errors 