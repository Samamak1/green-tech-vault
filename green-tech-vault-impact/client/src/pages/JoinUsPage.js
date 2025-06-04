import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// Hero section with background image
const HeroSection = styled(Box)(({ imageLoaded }) => ({
  position: 'relative',
  minHeight: '100vh',
  backgroundImage: imageLoaded 
    ? `url('/images/circuit-board-hero.jpg.png')`
    : `linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#2A2A2A',
  display: 'flex',
  alignItems: 'flex-start',
  paddingTop: '0',
  transition: 'background-image 0.5s ease-in-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: imageLoaded ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
    zIndex: 1
  }
}));

// Styled animated content box
const AnimatedContentBox = styled(Box)(({ theme, animate }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  borderRadius: '0 0 20px 20px',
  padding: theme.spacing(6),
  maxWidth: '600px',
  margin: '0',
  marginLeft: '10%',
  position: 'relative',
  zIndex: 2,
  animation: animate ? 'dropDown 1.2s ease-out forwards' : 'none',
  transform: animate ? 'translateY(0)' : 'translateY(-100%)',
  opacity: animate ? 1 : 0,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  '@keyframes dropDown': {
    '0%': {
      transform: 'translateY(-100%)',
      opacity: 0
    },
    '100%': {
      transform: 'translateY(0)',
      opacity: 1
    }
  }
}));

const JoinUsPage = () => {
  const theme = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = '/images/circuit-board-hero.jpg.png';

    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Effect to adjust image height to match text height
  useEffect(() => {
    const adjustImageHeight = () => {
      if (imageRef.current && textRef.current) {
        const textHeight = textRef.current.offsetHeight;
        imageRef.current.style.height = `${textHeight}px`;
      }
    };

    adjustImageHeight();
    window.addEventListener('resize', adjustImageHeight);

    return () => {
      window.removeEventListener('resize', adjustImageHeight);
    };
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection imageLoaded={imageLoaded}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: 8 }}>
          <AnimatedContentBox animate={animate}>
            <Typography variant="h2" component="h1" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>
              Join Us Today!
            </Typography>
            <Typography variant="body1" paragraph color="text.primary" sx={{ mb: 4 }}>
              Ready to make a real impact? Sign up or login now to start recycling your e-waste and track 
              your contribution to a greener, cleaner future!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                size="large"
                component={RouterLink}
                to="/register"
                sx={{ 
                  bgcolor: theme.palette.teal.main,
                  color: 'white',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: theme.palette.teal.dark
                  }
                }}
              >
                REGISTER
              </Button>
              <Button 
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/login"
                sx={{ 
                  color: theme.palette.teal.main,
                  borderColor: theme.palette.teal.main,
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: theme.palette.teal.dark,
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                CLIENT LOGIN
              </Button>
            </Box>
          </AnimatedContentBox>
        </Container>
      </HeroSection>

      {/* Movement Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Box ref={textRef} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Join The Movement<br />
                Towards Cleaner Tech
              </Typography>
              <Typography variant="body1" paragraph>
                Be part of the solution and help reduce electronic waste one device at a time. Our mission is to create a sustainable future for all.
              </Typography>
              
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
                Why E-Waste? Why Us?
              </Typography>
              <Typography variant="body1" paragraph>
                The sad reality that millions of tons of e-waste ends up in landfills each year. Not only does this create environmental hazards, but it's a waste of valuable resources. At EcoCycle Solutions, we believe that sustainability begins with proper e-waste management. Our team has the expertise to help recycle your old electronics that are otherwise destined for the landfill, and work with you to create a recycling program that can make a substantial positive impact. Don't let the chance for positive change slip away—work with us today!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'stretch' }}>
            <Box
              ref={imageRef}
              component="img"
              src="/images/hands-together.jpg"
              alt="Team collaboration"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                maxHeight: 'calc(100% - 32px)', // Subtracting padding
                display: 'block',
                position: 'relative'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default JoinUsPage; 