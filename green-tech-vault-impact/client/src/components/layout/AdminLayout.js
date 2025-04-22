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
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
          mt: '64px', // To account for the header height
          bgcolor: '#f5f5f5',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout; 