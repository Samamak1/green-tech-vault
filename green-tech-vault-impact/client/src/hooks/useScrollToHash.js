import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to scroll to an element identified by the URL hash
 * Use this in components where you expect fragment navigation (#section-id)
 */
const useScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Remove the '#' character
      const elementId = location.hash.substring(1);
      
      // Find the element on the page
      const element = document.getElementById(elementId);
      
      // If element exists, scroll to it
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // If no hash, scroll to top (optional behavior)
      window.scrollTo(0, 0);
    }
  }, [location]);
};

export default useScrollToHash; 