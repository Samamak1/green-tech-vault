import React, { useEffect, useState, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled parallax wrapper
const ParallaxWrapper = styled(Box)({
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// Styled parallax background
const ParallaxBg = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
  zIndex: 0,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1
  }
});

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
  const parallaxRef = useRef(null);

  // JavaScript parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollOffset = window.pageYOffset;
        const parallaxSpeed = 0.3; // Slower parallax for better performance
        parallaxRef.current.style.transform = `translateY(${scrollOffset * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    <ParallaxWrapper>
      <ParallaxBg
        ref={parallaxRef}
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
          backgroundColor: '#2A8784', // Teal fallback color that matches theme
        }}
      />
      <Container 
        maxWidth="lg"
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          color: 'white'
        }}
      >
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          fontWeight="bold" 
          sx={{ 
            mb: 6,
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.7)'
          }}
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
                  sx={{ 
                    mb: 1,
                    color: '#2A8784' // Teal color for the numbers
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 'medium',
                    color: '#fff' // White color for labels for better contrast
                  }}
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