import React from 'react';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AdminHeader />
      <Sidebar />
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
          borderTop: 'none',
          position: 'relative',
          zIndex: 1
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout; 