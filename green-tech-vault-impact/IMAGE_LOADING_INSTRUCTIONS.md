# CEO Profile Image Instructions

## Uploading the CEO Profile Image

The CEO profile has been updated to use a real image instead of a placeholder avatar. For the image to appear correctly on the website, please follow these instructions:

1. **Save the CEO Profile Image**:
   - Save the headshot photograph of Leila Meyer as `leila-meyer.jpg`
   - Place this file in the directory: `client/public/images/`

2. **Image Requirements**:
   - The image should be a professional headshot with good lighting
   - Recommended resolution: 500x500 pixels or higher
   - Clean background (preferably white or neutral)
   - File format: JPG (preferred) or PNG
   - File size: Under 500KB for optimal performance

3. **Verify the Image**:
   - After placing the image in the directory, run: `node verify-images.js`
   - This will confirm if the image is properly located and has sufficient file size

## Where the Image Will Appear

When properly uploaded, the CEO image will appear in two places:

1. **CEO Profile Page** (`/ceo-profile`):
   - The main profile page with the full bio
   - Displayed in a circular frame on the left side of the content

2. **About Us Page** (`/about-us`):
   - In the team section
   - Displayed as a thumbnail in the team card for Leila Meyer

## Troubleshooting

If the image doesn't appear after uploading:

1. **Check the file path**:
   - Ensure the file is named exactly `leila-meyer.jpg` (case sensitive)
   - Verify it's in the correct directory: `client/public/images/`

2. **Rebuild the application**:
   - Run `npm run build` to rebuild the application
   - This will copy the image to the build directory

3. **Check the console for errors**:
   - Open the browser developer tools (F12)
   - Look for any 404 errors related to image loading

If issues persist, you can contact the development team for assistance. 