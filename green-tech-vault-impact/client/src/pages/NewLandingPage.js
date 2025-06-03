import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Paper, Card, CardContent, useTheme } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
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

// Animation for dropdown
const dropDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled animated content box
const AnimatedContentBox = styled(Box)(({ theme, animate }) => ({
  backgroundColor: 'white',
  borderRadius: '0 0 20px 20px',
  padding: theme.spacing(6),
  maxWidth: '600px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 2,
  animation: animate ? `${dropDown} 1.2s ease-out forwards` : 'none',
  transform: animate ? 'translateY(0)' : 'translateY(-100%)',
  opacity: animate ? 1 : 0,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
}));

// Hero section with background image
const HeroSection = styled(Box)({
  position: 'relative',
  minHeight: '100vh',
  backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80)', // Circuit board background
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'flex-start',
  paddingTop: '0',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1
  }
});

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
  const [animate, setAnimate] = useState(false);

  // Trigger animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500); // Start animation after 500ms

    return () => clearTimeout(timer);
  }, []);

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
      title: "Pickup Service",
      description: "Convenient collection from your location with flexible scheduling",
      icon: <LocalShippingIcon fontSize="large" />
    },
    {
      title: "Secure Data Destruction",
      description: "Professional data wiping and destruction with certified reporting",
      icon: <SecurityIcon fontSize="large" />
    },
    {
      title: "Responsible Recycling",
      description: "Eco-friendly processing that recovers valuable materials",
      icon: <RecyclingIcon fontSize="large" />
    },
    {
      title: "Corporate Solutions",
      description: "Tailored programs for businesses of all sizes",
      icon: <BusinessIcon fontSize="large" />
    }
  ];

  // Process steps
  const processSteps = [
    {
      title: "Schedule",
      description: "Book your pickup online or contact us directly",
      icon: <AccessTimeIcon fontSize="large" />
    },
    {
      title: "Collect",
      description: "We safely collect your electronic devices",
      icon: <LocalShippingIcon fontSize="large" />
    },
    {
      title: "Secure",
      description: "Data destruction with certified reporting",
      icon: <VerifiedIcon fontSize="large" />
    },
    {
      title: "Process",
      description: "Responsible recycling or refurbishment",
      icon: <RecyclingIcon fontSize="large" />
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: 8 }}>
          <AnimatedContentBox animate={animate}>
            <Typography variant="subtitle1" component="div" gutterBottom color="text.primary">
              Welcome to RYGNeco
            </Typography>
            <Typography variant="h2" component="h1" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>
              Responsible E-Waste Recycling for a Cleaner Tomorrow!
            </Typography>
            <Typography variant="body1" paragraph color="text.primary" sx={{ mb: 4 }}>
              At RYGNeco, we make it easy for businesses and individuals to safely and 
              responsibly recycle their electronic waste. From outdated computers to broken 
              printers and everything in between — we help reduce landfill waste, recover 
              valuable materials, and protect the environment.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/schedule-pickup"
              sx={{ 
                bgcolor: theme.palette.teal.main,
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: theme.palette.teal.dark
                }
              }}
            >
              SCHEDULE A PICKUP
            </Button>
          </AnimatedContentBox>
        </Container>
      </HeroSection>
      
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
          
          {/* Impact Section - Reorganized to match width and move button right */}
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
                maxWidth: 'none', // Remove max width constraint
                mx: 0, // Remove auto margins
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
              
              {/* Content area - flexible */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Impact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive detailed reports on your environmental impact and data security
                </Typography>
              </Box>
              
              {/* Button at far right */}
              <Box sx={{ flexShrink: 0 }}>
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