import React from 'react';
import { Box, CssBaseline, Typography, Avatar } from '@mui/material';
import Sidebar from './Sidebar';
import PersonIcon from '@mui/icons-material/Person';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      
      {/* Header at the very top of the page */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        bgcolor: 'white', 
        py: 1,
        px: 3,
        borderBottom: '1px solid #e0e0e0',
        width: '100%'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1.5
        }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Full Name
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Position Title
            </Typography>
          </Box>
          
          <Avatar
            sx={{ 
              bgcolor: '#1C392B',
              color: 'white',
              width: 38,
              height: 38
            }}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
        </Box>
      </Box>
      
      {/* Main content with sidebar */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
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