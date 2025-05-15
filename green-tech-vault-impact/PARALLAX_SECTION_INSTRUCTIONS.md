# Parallax Scrolling Stats Section Instructions

## Overview
We've implemented a parallax scrolling effect for the "We Take Pride In Our Numbers" section, similar to the "Sims Innovation Lab" on the Sims Lifecycle Services website. This creates a visually engaging section where the background image remains fixed while the content scrolls.

## Implementation Details
The parallax effect has been implemented with these key features:
1. **Fixed Background Image**: The stock chart image remains stationary as the user scrolls.
2. **Teal Overlay**: A semi-transparent teal overlay (~85% opacity) ensures text remains legible.
3. **Frosted Glass Stats Cards**: Each stat is displayed in a card with a subtle glass-like effect.
4. **Hover Animation**: Stats cards have a subtle animation on hover for added interactivity.

## Required Files
Make sure to add the following image to enable the parallax effect:

- **Stock Chart Image**: Place the stock chart image (from your second attachment) at:
  ```
  client/public/images/stock-chart.jpg
  ```

## Technical Implementation
The parallax effect works through these CSS properties:
- `background-attachment: fixed`: This keeps the image position fixed relative to the viewport.
- `::before` and `::after` pseudo-elements: These create the background image and overlay layers.
- `z-index` management: Ensures proper stacking of elements.

## Responsive Behavior
The parallax section is responsive and will adapt to different screen sizes:
- On mobile devices, the stats will stack appropriately
- The background effect remains visible across all device sizes
- Text size adjusts for readability on smaller screens

## Troubleshooting
If the parallax effect isn't working as expected:
1. Make sure the stock chart image is placed in the correct location
2. Verify the build process successfully copied the image to the build directory
3. Check for any CSS conflicts in your theme
4. On some mobile browsers, the fixed background may not work - the section will still look good, but without the scrolling effect

## Browser Compatibility
This implementation works best on:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Some older browsers might not support the `backdrop-filter` property used for the frosted glass effect, but will fall back gracefully to a solid background. 