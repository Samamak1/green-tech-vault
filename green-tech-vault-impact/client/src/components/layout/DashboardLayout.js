import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        ml: '240px', // Add left margin to account for fixed sidebar
        width: 'calc(100% - 240px)' // Adjust width to account for sidebar
      }}>
        <AdminHeader />
        <Box 
          component="main" 
          sx={{ 
            flex: 1, 
            bgcolor: '#f5f5f5', 
            p: 3,
            overflow: 'auto',
            pt: '80px', // Add padding top to account for fixed header
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout; 