import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LandingHeader from '../branding/LandingHeader';
import Footer from './Footer';
import { scrollToTop } from '../../utils/scrollUtils';

/**
 * Main layout component that wraps all pages with consistent header and footer
 */
const MainLayout = ({ children, hideFooter = false }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!location.hash) {
      scrollToTop();
    }
  }, [location.pathname, location.hash]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the page takes at least the full viewport height
      }}
    >
      <LandingHeader />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, // This ensures that the main content takes all available space
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>
      
      {!hideFooter && <Footer />}
    </Box>
  );
};

export default MainLayout; 