import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatsSection = styled(Box)({
  position: 'relative',
  backgroundImage: 'url(/images/trading-chart.jpg)', // Using the first attached image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#0A1929', // Dark fallback color
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1
  }
});

const ParallaxStatsSection = () => {
  return (
    <StatsSection>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
          We Take Pride in Our Numbers
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                50+
              </Typography>
              <Typography variant="h6">
                Business Partners
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                1000+
              </Typography>
              <Typography variant="h6">
                Devices Recycled
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                5000+
              </Typography>
              <Typography variant="h6">
                Pounds of E-Waste
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                100%
              </Typography>
              <Typography variant="h6">
                Certified Processing
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StatsSection>
  );
};

export default ParallaxStatsSection; 