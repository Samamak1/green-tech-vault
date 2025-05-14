import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check if the image is loaded
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('ParallaxStatsSection: Circuit board image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error('ParallaxStatsSection: Failed to load circuit board image');
      setImageLoaded(false);
    };
    img.src = '/images/stock-chart.jpg';
  }, []);

  // Stats data
  const stats = [
    { value: "1,560", label: "E-Waste Partners" },
    { value: "1,560", label: "Devices Collected" },
    { value: "5,428", label: "Total Weight (kg)" },
    { value: "870", label: "Devices Refurbished" },
    { value: "690", label: "Devices Recycled" }
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '400px',
        width: '100%',
        py: 6,
        color: 'white',
        backgroundColor: 'rgba(42, 135, 132, 1)', // Fallback color if image doesn't load
        backgroundImage: imageLoaded ? 'url(/images/stock-chart.jpg)' : 'none',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(42, 135, 132, 0.85)', // ~85% teal overlay
          zIndex: 0,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{ position: 'relative', zIndex: 1 }}
      >
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
    </Box>
  );
};

export default ParallaxStatsSection; 