import React from 'react';
import { Box } from '@mui/material';

const WhiteHeaderLine = () => {
  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: '64px', // Position exactly at the bottom of the header
        left: '240px', // Position after the sidebar
        right: 0,
        height: '4px', // Make it a bit thicker to cover the line
        backgroundColor: 'white',
        zIndex: 2000 // Very high z-index to ensure it's on top of everything
      }} 
    />
  );
};

export default WhiteHeaderLine; 