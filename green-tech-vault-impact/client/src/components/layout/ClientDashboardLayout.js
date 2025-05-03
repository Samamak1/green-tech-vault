import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import BrandedHeader from './BrandedHeader';
import ClientSidebar from './ClientSidebar';

const ClientDashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <ClientSidebar />
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        ml: '240px', // Match the sidebar width
        width: 'calc(100% - 240px)' // Ensure correct width calculation
      }}>
        <BrandedHeader />
        <Box 
          component="main" 
          sx={{ 
            flex: 1, 
            bgcolor: '#f5f5f5', 
            p: 3,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.03)',
            },
            // Add consistent content boundary container
            '& > *': {
              maxWidth: 'calc(100% - 24px)', // Maintain consistent margin from scrollbar
              mx: 'auto', // Center the content
              mb: 3, // Add bottom margin to children
            }
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default ClientDashboardLayout; 