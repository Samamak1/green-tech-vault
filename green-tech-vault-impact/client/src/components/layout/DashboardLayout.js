import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import PersonIcon from '@mui/icons-material/Person';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', flexDirection: 'column' }}>
      {/* Header at the very top of the page */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        bgcolor: 'white', 
        py: 1,
        px: 3,
        borderBottom: '1px solid #e0e0e0'
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
      
      {/* Main content with sidebar and page content */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box 
            component="main" 
            sx={{ 
              flex: 1, 
              bgcolor: '#f5f5f5', 
              p: 3,
              pt: 3,
              overflow: 'auto',
              mt: 0
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout; 