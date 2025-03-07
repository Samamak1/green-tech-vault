import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const Unauthorized = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          borderRadius: 2
        }}
      >
        <WarningIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" paragraph>
          You don't have permission to access this page. This area is restricted to administrators only.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Return to Dashboard
          </Button>
          <Button
            component={RouterLink}
            to="/admin/login"
            variant="outlined"
          >
            Admin Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Unauthorized; 