import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ParallaxBox = styled(Box)(({ imageLoaded }) => ({
  position: 'relative',
  backgroundImage: imageLoaded ? 'url(/images/stock-chart.jpg)' : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#0A1929', // Dark fallback color
  transform: 'translateZ(0)', // Force hardware acceleration
  WebkitTransform: 'translateZ(0)',
  willChange: 'transform', // Optimize for animations
  '@media (max-width: 768px)': {
    backgroundAttachment: 'scroll', // Disable parallax on mobile
  },
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
}));

const ParallaxStatsSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      console.log('Stock chart background image loaded successfully');
    };
    img.onerror = (e) => {
      console.error('Failed to load stock chart background image:', e);
    };
    img.src = '/images/stock-chart.jpg';

    // Add scroll event listener for parallax effect
    const handleScroll = () => {
      if (!imageLoaded) return;
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imageLoaded]);

  return (
    <ParallaxBox imageLoaded={imageLoaded} className="parallax">
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
    </ParallaxBox>
  );
};

export default ParallaxStatsSection; 