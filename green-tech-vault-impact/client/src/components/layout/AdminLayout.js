import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <AppHeader />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 3, 
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: '240px' },
            mt: 0,
            bgcolor: '#f5f5f5',
            borderTop: 'none',
            position: 'relative',
            zIndex: 1
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout; 