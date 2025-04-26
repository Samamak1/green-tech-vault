import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import BrandedHeader from './BrandedHeader';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <BrandedHeader />
        <Box 
          component="main" 
          sx={{ 
            flex: 1, 
            bgcolor: '#f5f5f5', 
            p: 3,
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout; 