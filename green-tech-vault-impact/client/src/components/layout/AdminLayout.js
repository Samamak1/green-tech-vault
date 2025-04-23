import React from 'react';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import WhiteHeaderLine from './WhiteHeaderLine';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AdminHeader />
      <Sidebar />
      <WhiteHeaderLine />
      
      {/* White strip to cover the black line - this can be removed if the WhiteHeaderLine component works */}
      <Box 
        sx={{ 
          position: 'fixed', 
          top: '64px', // Position exactly at the bottom of the header
          left: '240px', // Position after the sidebar
          right: 0,
          height: '3px', // Make it a bit thicker to cover the line
          backgroundColor: 'white',
          zIndex: 1500 // Very high z-index to ensure it's on top
        }} 
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 3, 
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
          mt: '63px', // Slightly reduced to ensure no gap
          bgcolor: '#f5f5f5',
          borderTop: '2px solid white',
          position: 'relative',
          zIndex: 10
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout; 