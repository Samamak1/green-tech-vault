import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled parallax section with circuit board background
const ParallaxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 'auto',
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  zIndex: 1,
  padding: theme.spacing(6, 0),
  // Circuit board background with parallax effect
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/images/stock-chart.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    zIndex: -2,
  },
  // Dark teal overlay for better text contrast
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(42, 135, 132, 0.85)', // ~85% teal overlay
    zIndex: -1,
  }
}));

// Styled stat card with frosted glass effect
const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3, 2),
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  borderRadius: theme.spacing(2),
  backdropFilter: 'blur(5px)',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    backgroundColor: 'rgba(255, 255, 255, 0.25)'
  }
}));

const ParallaxStatsSection = () => {
  // Stats data
  const stats = [
    { value: "1,560", label: "E-Waste Partners" },
    { value: "1,560", label: "Devices Collected" },
    { value: "5,428", label: "Total Weight (kg)" },
    { value: "870", label: "Devices Refurbished" },
    { value: "690", label: "Devices Recycled" }
  ];

  return (
    <ParallaxWrapper>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          fontWeight="bold" 
          sx={{ mb: 6 }}
        >
          We take pride in our numbers
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={4} md={true} key={index}>
              <StatCard>
                <Typography 
                  variant="h3" 
                  fontWeight="bold" 
                  component="div" 
                  sx={{ mb: 1 }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ fontWeight: 'medium' }}
                >
                  {stat.label}
                </Typography>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ParallaxWrapper>
  );
};

export default ParallaxStatsSection; 