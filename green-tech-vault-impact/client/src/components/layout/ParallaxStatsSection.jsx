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
      console.log('ParallaxStatsSection: Financial trading image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error('ParallaxStatsSection: Failed to load financial trading image');
      setImageLoaded(false);
    };
    // Using a placeholder financial trading image URL - you'll replace this with your actual image
    img.src = '/images/financial-trading-background.jpg';
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
        minHeight: '500px',
        width: '100%',
        py: 8,
        color: '#333',
        backgroundColor: '#f5f5f5', // Light gray fallback color
        backgroundImage: imageLoaded ? 'url(/images/financial-trading-background.jpg)' : 'none',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Mobile fallback - disable fixed attachment on small screens for better performance
        '@media (max-width: 768px)': {
          backgroundAttachment: 'scroll',
        }
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
          sx={{ 
            mb: 6,
            color: '#333',
            textShadow: '0 1px 3px rgba(0,0,0,0.1)'
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
                    color: '#555' // Darker gray for labels
                  }}
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