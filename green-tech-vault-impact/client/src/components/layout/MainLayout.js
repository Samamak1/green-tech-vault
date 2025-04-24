import React from 'react';
import { Box } from '@mui/material';
import LandingHeader from '../branding/LandingHeader';
import Footer from './Footer';

/**
 * Main layout component that wraps all pages with consistent header and footer
 */
const MainLayout = ({ children, hideFooter = false }) => {
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