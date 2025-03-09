import React from 'react';
import { Box, Typography, Container, Button, AppBar, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../branding/Logo';

const BrandedHeader = () => {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#0e1001' }} elevation={0}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo variant="light" size="medium" showTagline={false} />
            </Box>
            <Button 
              variant="contained" 
              color="primary"
              component={RouterLink}
              to="/schedule-pickup"
              sx={{ 
                fontWeight: 'bold',
                boxShadow: 2
              }}
            >
              SCHEDULE PICKUP
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ 
        bgcolor: '#0e1001', 
        color: '#8cc63f', 
        py: 1,
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              KEEP IT GREEN
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              KEEP IT SAFE
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              KEEP IT CONNECTED
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BrandedHeader; 