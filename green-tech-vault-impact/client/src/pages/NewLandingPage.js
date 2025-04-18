import React from 'react';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import our custom header and components
import LandingHeader from '../components/branding/LandingHeader';
import RecyclingIcon from '../components/branding/RecyclingIcon';

// Styled wave divider for the hero section
const WaveDivider = styled(Box)(({ theme }) => ({
  height: 80,
  background: 'white',
  borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
  width: '100%',
  marginTop: -40,
  position: 'relative',
  zIndex: 2
}));

// Styled teal-colored section
const TealSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.teal.main,
  color: 'white',
  position: 'relative',
  padding: theme.spacing(4, 0),
  zIndex: 1,
  overflow: 'hidden'
}));

const NewLandingPage = () => {
  return (
    <Box>
      {/* Header */}
      <LandingHeader />
      
      {/* Hero Section */}
      <Box sx={{ 
        background: 'url(https://source.unsplash.com/random?ewaste,recycling) no-repeat center center', 
        backgroundSize: 'cover',
        color: 'white',
        position: 'relative',
        pt: 6,
        pb: 10,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ pt: 4, pb: 10 }}>
            <Typography variant="subtitle1" component="div" gutterBottom>
              Welcome To Company Name
            </Typography>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Responsible E-Waste<br />
              Recycling for a<br />
              Cleaner Tomorrow!
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, mb: 4 }}>
              At EcoCycle Solutions, we make it easy for businesses and individuals to safely
              and responsibly recycle their electronic waste. From outdated computers to
              broken printers and everything in-between — we help reduce landfill waste,
              recover valuable materials, and protect the environment.
            </Typography>
          </Box>
        </Container>
        <WaveDivider />
      </Box>
      
      {/* Teal Section - Recycle Responsibly */}
      <TealSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <RecyclingIcon size={250} color="black" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Recycle Responsibly
              </Typography>
              <Typography variant="body1" paragraph>
                Dispose of your electronics safely, while protecting your data and the environment!
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  sx={{ 
                    mr: 2, 
                    borderColor: 'white', 
                    '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } 
                  }}
                >
                  Sign in
                </Button>
                <Button 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: '#333', 
                    '&:hover': { backgroundColor: '#555' } 
                  }}
                >
                  Register
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </TealSection>
      
      {/* Additional page sections will be added here */}
    </Box>
  );
};

export default NewLandingPage; 