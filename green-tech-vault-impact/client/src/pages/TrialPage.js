import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import AdminLayout from '../components/layout/AdminLayout';

const TrialPage = () => {
  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Trial Page</Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Welcome to the Trial Page
          </Typography>
          <Typography paragraph>
            This is a demonstration page that shows how to add a new tab to the sidebar menu.
          </Typography>
          <Typography paragraph>
            You can customize this page with your own content and functionality.
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
            Sample Content Section
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
            Sed euismod, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget
            ultricies nisl nisl eget nisl. Sed euismod, nisl eget ultricies lacinia,
            nisl nisl aliquet nisl, eget ultricies nisl nisl eget nisl.
          </Typography>
          <Typography paragraph>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
            cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper 
            sit amet ligula. Proin eget tortor risus. Vivamus magna justo, lacinia eget 
            consectetur sed, convallis at tellus.
          </Typography>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default TrialPage; 