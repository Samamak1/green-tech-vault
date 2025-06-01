import React, { useEffect, useState, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled parallax wrapper
const ParallaxWrapper = styled(Box)({
  position: 'relative',
  height: '100vh',
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
  height: '150%',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -1,
  transform: 'translateY(0)',
  transition: 'transform 0.1s ease-out',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text readability
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const parallaxRef = useRef(null);

  // Check if the image is loaded
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('ParallaxStatsSection: Stock chart image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error('ParallaxStatsSection: Failed to load stock chart image');
      setImageLoaded(false);
    };
    // Using the stock chart image as background
    img.src = '/images/stock-chart.jpg';
  }, []);

  // JavaScript parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollOffset = window.pageYOffset;
        const parallaxSpeed = 0.5; // Adjust this value to make it faster or slower
        parallaxRef.current.style.transform = `translateY(${scrollOffset * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
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
          backgroundImage: imageLoaded ? 'url(/images/stock-chart.jpg)' : 'none',
          backgroundColor: '#f5f5f5', // Light gray fallback color
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