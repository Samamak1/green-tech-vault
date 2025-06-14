import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BrandedHeader from '../components/layout/BrandedHeader';
import BrandedFooter from '../components/layout/BrandedFooter';
import ProcessFlow from '../components/branding/ProcessFlow';
import AcceptedItems from '../components/branding/AcceptedItems';
import EwasteHeroFallback from '../components/branding/EwasteHeroFallback';

const BrandedLanding = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: '#f9f9f9'
    }}>
      <BrandedHeader />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: '#0e1001', 
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Responsible E-Waste Management
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal' }}>
                Helping businesses safely dispose of electronic waste while protecting data and the environment.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  component={RouterLink}
                  to="/schedule-pickup"
                  sx={{ fontWeight: 'bold' }}
                >
                  SCHEDULE PICKUP
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  size="large"
                  component={RouterLink}
                  to="/login"
                  sx={{ fontWeight: 'bold', borderColor: 'rgba(255,255,255,0.5)' }}
                >
                  CLIENT LOGIN
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {imageError ? (
                <EwasteHeroFallback />
              ) : (
                <Box 
                  component="img"
                  src="/images/e-waste-hero.svg"
                  alt="E-waste collection"
                  onError={(e) => {
                    // If the SVG fails to load, try the PNG
                    if (e.target.src.endsWith('svg')) {
                      e.target.src = "/images/e-waste-hero.png";
                    } else {
                      // If both fail, show the fallback component
                      setImageError(true);
                    }
                  }}
                  sx={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 2,
                    boxShadow: 4,
                    display: { xs: 'none', md: 'block' },
                    bgcolor: '#1a1a1a' // Fallback background color if image fails to load
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 6, mt: { xs: 0, md: -5 } }}>
        <Grid container spacing={3}>
          {[
            { number: '1M+', label: 'Devices Processed' },
            { number: '500+', label: 'Business Clients' },
            { number: '2K+', label: 'Tons Diverted' },
            { number: '100%', label: 'Data Security' }
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: 2
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#8cc63f', mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Process Flow */}
      <ProcessFlow />
      
      {/* Accepted Items */}
      <AcceptedItems />
      
      {/* CTA Section */}
      <Box sx={{ bgcolor: '#0e1001', color: 'white', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Ready to Make an Impact?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Join hundreds of businesses that trust RYGNeco for their e-waste management needs.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={RouterLink}
            to="/schedule-pickup"
            sx={{ fontWeight: 'bold', px: 4, py: 1.5 }}
          >
            SCHEDULE A PICKUP TODAY
          </Button>
        </Container>
      </Box>
      
      <BrandedFooter />
    </Box>
  );
};

export default BrandedLanding; 