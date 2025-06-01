import React from 'react';
import { Box, Container, Typography, Grid, Button, Paper, Card, CardContent, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

// Import Material-UI icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import RecyclingIcon from '@mui/icons-material/Recycling';
import BusinessIcon from '@mui/icons-material/Business';
import DeleteIcon from '@mui/icons-material/Delete';
import VerifiedIcon from '@mui/icons-material/Verified';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';

// Import our custom components
import RecyclingIconCustom from '../components/branding/RecyclingIcon';
import ParallaxStatsSection from '../components/layout/ParallaxStatsSection';

// Styled teal-colored section
const TealSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.teal.main,
  color: 'white',
  position: 'relative',
  padding: theme.spacing(6, 0),
  zIndex: 1,
}));

// Styled service card
const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  borderRadius: 16,
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  }
}));

// Image placeholder styled component (will be replaced with actual images)
const ImagePlaceholder = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  margin: '0 auto 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: theme.palette.teal.main,
  color: 'white'
}));

// Process step card
const ProcessCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  textAlign: 'center',
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
}));

// Process icon wrapper
const ProcessIconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: '50%',
  backgroundColor: theme.palette.teal.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  color: 'white'
}));

// Impact card
const ImpactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'white',
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
}));

const NewLandingPage = () => {
  const theme = useTheme();
  
  // Add useEffect to log image loading status
  React.useEffect(() => {
    // Check if the stock chart image exists
    const img = new Image();
    img.onload = () => console.log("Stock chart image loaded successfully");
    img.onerror = () => console.error("Failed to load stock chart image");
    img.src = "/images/stock-chart.jpg";
    
    // Also check robot logo
    const robotImg = new Image();
    robotImg.onload = () => console.log("Robot logo loaded successfully");
    robotImg.onerror = () => console.error("Failed to load robot logo");
    robotImg.src = "/images/robot-logo.svg";
  }, []);

  // Service offerings data
  const services = [
    {
      title: "Business Pick-Up Services",
      description: "Scheduled or on-demand e-waste collection from your business location.",
      icon: <BusinessIcon sx={{ fontSize: 40, color: 'white' }} />
    },
    {
      title: "Secure Data Destruction",
      description: "Certified wiping or shredding with documentation for your records.",
      icon: <DeleteIcon sx={{ fontSize: 40, color: 'white' }} />
    },
    {
      title: "Certified Recycling",
      description: "Environmentally responsible processing that meets all regulations.",
      icon: <VerifiedIcon sx={{ fontSize: 40, color: 'white' }} />
    },
    {
      title: "Compliance Documentation",
      description: "Clear, itemized reports that prove your disposal met all audits and tracking.",
      icon: <DescriptionIcon sx={{ fontSize: 40, color: 'white' }} />
    }
  ];

  // Process steps data
  const processSteps = [
    {
      title: "Schedule",
      description: "Schedule a pickup for your e-waste through our easy online form.",
      icon: <AccessTimeIcon fontSize="large" />
    },
    {
      title: "Collect",
      description: "Our team collects your devices from your location at the scheduled time.",
      icon: <LocalShippingIcon fontSize="large" />
    },
    {
      title: "Secure",
      description: "All data is securely wiped from all devices following industry standards.",
      icon: <SecurityIcon fontSize="large" />
    },
    {
      title: "Process",
      description: "Devices are refurbished, repurposed, or responsibly recycled.",
      icon: <RecyclingIcon fontSize="large" />
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        background: 'url(/images/e-waste-hero.png) no-repeat center top',
        backgroundSize: 'cover',
        position: 'relative',
        pt: 6,
        pb: 6,
        height: '500px', // Fixed height to crop the image
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            p: 4, 
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            borderRadius: 2,
            maxWidth: 700
          }}>
            <Typography variant="subtitle1" component="div" gutterBottom color="text.primary">
              Welcome To EcoCycle Solutions
            </Typography>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
              Responsible E-Waste<br />
              Recycling for a<br />
              Cleaner Tomorrow!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', color: 'black' }}>
              At EcoCycle Solutions, we make it easy for businesses and individuals to safely
              and responsibly recycle their electronic waste. From outdated computers to
              broken printers and everything in-between — we help reduce landfill waste,
              recover valuable materials, and protect the environment.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/schedule-pickup"
              sx={{ 
                bgcolor: theme.palette.teal.main, 
                px: 4, 
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: theme.palette.teal.dark
                }
              }}
            >
              SCHEDULE A PICKUP
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* What We Offer Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" fontWeight="bold" gutterBottom>
          What We Offer
        </Typography>
        <Typography variant="body1" textAlign="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          Whether you're a small office or a large corporation, we provide reliable, secure, and<br />
          eco-conscious solutions that make it easy to dispose of your electronic waste.
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard elevation={2}>
                <CardContent sx={{ p: 3 }}>
                  <ImagePlaceholder>
                    {service.icon}
                  </ImagePlaceholder>
                  <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section - with Parallax Effect */}
      <ParallaxStatsSection />

      {/* Our Process Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" fontWeight="bold" gutterBottom>
          Our Process
        </Typography>
        
        <Typography variant="body1" textAlign="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          From collection to refurbishment, reuse to responsible recycling, our process<br />
          is designed with care. Whether you're an individual or an organization, we<br />
          make it simple—so you can be part of the solution, every step of the way.
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProcessCard elevation={1}>
                <ProcessIconWrapper>
                  {step.icon}
                </ProcessIconWrapper>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </ProcessCard>
            </Grid>
          ))}
          
          {/* Impact Section - Reorganized to be long and half height */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                maxWidth: 800,
                mx: 'auto',
                height: 'auto',
                minHeight: '120px'
              }}
            >
              {/* Icon at far left */}
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.teal.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0
                }}
              >
                <BarChartIcon fontSize="large" />
              </Box>
              
              {/* Content area */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Impact
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Receive detailed reports on your environmental impact and data security
                </Typography>
                <Button 
                  variant="contained"
                  component={RouterLink}
                  to="/environmental-impact-report"
                  size="small"
                  sx={{ 
                    bgcolor: theme.palette.teal.main,
                    '&:hover': {
                      bgcolor: theme.palette.teal.dark
                    }
                  }}
                >
                  VIEW SAMPLE REPORT
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: theme.palette.teal.main, color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to make a difference?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Join us in our mission to make e-waste recycling accessible, secure, and sustainable for everyone.
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Button 
                variant="contained" 
                size="large"
                component={RouterLink}
                to="/schedule-pickup"
                sx={{ 
                  bgcolor: 'white', 
                  color: theme.palette.teal.main,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5
                }}
              >
                SCHEDULE A PICKUP
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  },
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5
                }}
              >
                CONTACT US
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default NewLandingPage; 