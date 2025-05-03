import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import BrandedHeader from './BrandedHeader';
import ClientSidebar from './ClientSidebar';
import GridOverlay from '../GridOverlay';
import { useLayoutEditor } from '../../context/LayoutEditorContext';

const ClientDashboardLayout = () => {
  const { isEditMode } = useLayoutEditor();
  
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <ClientSidebar />
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        ml: '225px', // Match the sidebar width (5 grid cells * 45px)
        width: 'calc(100% - 225px)' // Ensure correct width calculation
      }}>
        <BrandedHeader />
        <Box 
          component="main" 
          sx={{ 
            flex: 1, 
            bgcolor: '#f5f5f5', 
            p: 3,
            overflow: 'auto',
            position: 'relative',
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
              maxWidth: isEditMode ? 'none' : 'calc(100% - 24px)', // Override when in edit mode
              mx: isEditMode ? 0 : 'auto', // Override when in edit mode
              mb: 3, // Add bottom margin to children
              position: isEditMode ? 'relative' : 'static', // Allow positioning in edit mode
              transition: 'all 0.3s ease-in-out',
              border: isEditMode ? '1px dashed rgba(78, 205, 196, 0.3)' : 'none', // Show boundaries in edit mode
              ...(isEditMode && {
                '&:hover': {
                  border: '1px dashed rgba(78, 205, 196, 0.8)',
                  cursor: 'move',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'transparent',
                  zIndex: 1, // Higher than content but lower than handles
                }
              })
            }
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <GridOverlay />
    </Box>
  );
};

export default ClientDashboardLayout; 