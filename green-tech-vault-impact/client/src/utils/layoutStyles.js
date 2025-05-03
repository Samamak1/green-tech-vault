/**
 * Standard layout styles to ensure consistent content boundaries and scrollbars
 * across all pages in the SMS system.
 */

/**
 * Gets the standardized content container styles with proper extents and scrollbar.
 * @returns {Object} MUI sx styles object for content containers
 */
export const getContentContainerStyle = () => ({
  position: 'fixed',
  top: '64px', // Start below the header
  left: '225px', // Start after the sidebar width
  right: 0,
  bottom: 0,
  width: 'calc(100vw - 225px)', // Full width minus sidebar
  height: 'calc(100vh - 64px)', // Full height minus header
  margin: 0,
  padding: 0,
  // Ensure scrollbar appears at absolute right edge
  overflowX: 'hidden',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(0,0,0,0.1) rgba(0,0,0,0.03)',
  msOverflowStyle: 'none', // For Internet Explorer and Edge
  '&::-webkit-scrollbar': {
    width: '12px',
    position: 'absolute',
    right: 0
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
});

/**
 * Gets the standardized content wrapper styles (for inner content)
 * @returns {Object} MUI sx styles object for inner content wrappers
 */
export const getContentWrapperStyle = () => ({
  p: 3, // Standard padding for inner content
}); 