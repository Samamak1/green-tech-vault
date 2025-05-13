# Image Update Instructions

To update the CEO image and robot logo:

1. **CEO Image (Leila Meyer):**
   - Place the CEO image file in: `client/public/images/leila-meyer.jpg`
   - Make sure it's properly sized and similar to the example image you provided

2. **Robot Logo:**
   - Place the robot logo SVG in: `client/public/images/robot-logo.svg`
   - This will replace the red image icon in the header

3. **After adding the images:**
   - Run the build process:
   ```bash
   npm run build
   ```
   - This will copy the images to the build directory

## Verifying the Changes

To verify the changes:

1. **CEO Profile:**
   - The CEO profile page should now be streamlined with concise content
   - The CEO image should appear properly sized on the left
   - The text should include information about Leila being an architect

2. **Robot Logo:**
   - The header should display the robot logo instead of the red image icon
   - The header background is teal (#2A8784) to provide good contrast for the logo

3. **Footer:**
   - The footer color has been updated to #073C3F to match the SMS menu

If images don't appear correctly, you may need to clear your browser cache or verify that the images were properly copied to the build directory. 