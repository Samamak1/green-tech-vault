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
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  borderRadius: '20px',
  padding: theme.spacing(3, 4), // Reduced vertical padding, kept horizontal
  maxWidth: '900px', // Made wider
  margin: '0 auto', // Horizontally centered
  position: 'relative',
  zIndex: 2,
  animation: animate ? `${dropDown} 1.2s ease-out forwards` : 'none',
  transform: animate ? 'translateY(0)' : 'translateY(-100%)',
  opacity: animate ? 1 : 0,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 6), // Reduced vertical padding from 6 to 4
    maxWidth: '1000px', // Even wider on larger screens
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5, 3), // Reduced vertical padding
    borderRadius: '15px',
    margin: '0 16px',
    maxWidth: 'calc(100% - 32px)'
  }
}));

// Hero section with solid background
const HeroSection = styled(Box)(() => ({
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: '#ffffff', // Clean white background
  display: 'flex',
  alignItems: 'center', // Center content vertically
  justifyContent: 'center', // Center content horizontally
  paddingTop: '0',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.02)', // Very light overlay
    zIndex: 1
  }
}));

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
      icon: <LocalShippingIcon fontSize="large" />,
      color: '#56D0C5'
    },
    {
      title: "Secure Data Destruction",
      description: "Professional data wiping and destruction with certified reporting",
      icon: <SecurityIcon fontSize="large" />,
      color: '#16615A'
    },
    {
      title: "Responsible Recycling",
      description: "Eco-friendly processing that recovers valuable materials",
      icon: <RecyclingIcon fontSize="large" />,
      color: '#AEF1EB'
    },
    {
      title: "Corporate Solutions",
      description: "Tailored programs for businesses of all sizes",
      icon: <BusinessIcon fontSize="large" />,
      color: '#41918A'
    }
  ];

  // Process steps
  const processSteps = [
    {
      title: "Schedule",
      description: "Book your pickup online or contact us directly",
      icon: <AccessTimeIcon fontSize="large" />,
      color: '#41918A'
    },
    {
      title: "Collect",
      description: "We safely collect your electronic devices",
      icon: <LocalShippingIcon fontSize="large" />,
      color: '#56D0C5'
    },
    {
      title: "Secure",
      description: "Data destruction with certified reporting",
      icon: <VerifiedIcon fontSize="large" />,
      color: '#16615A'
    },
    {
      title: "Process",
      description: "Responsible recycling or refurbishment",
      icon: <RecyclingIcon fontSize="large" />,
      color: '#AEF1EB'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
          <AnimatedContentBox animate={animate}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              color="text.primary" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.75rem' },
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                mb: { xs: 2, sm: 3 }
              }}
            >
              One Platform. Six Dimensions of Value.
            </Typography>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom 
              color="text.primary" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.5rem' },
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                mb: { xs: 2, sm: 3 }
              }}
            >
              Blockchain-Verified E-Waste Intelligence: Profit • ESG • Compliance
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              color="text.primary" 
              sx={{ 
                mb: { xs: 3, sm: 4 },
                fontSize: { xs: '14px', sm: '16px' },
                lineHeight: { xs: 1.4, sm: 1.5 }
              }}
            >
              RYGNeco's unified platform transforms retired electronics into measurable business value through integrated blockchain tracking, profit recovery, tax optimization, carbon credits, ESG impact, and ironclad compliance.
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
                fontSize: { xs: '14px', sm: '16px' },
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 2 },
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
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          fontWeight="bold" 
          gutterBottom
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
            px: { xs: 2, sm: 0 }
          }}
        >
          What We Offer
        </Typography>
        <Typography 
          variant="body1" 
          textAlign="center" 
          paragraph 
          sx={{ 
            maxWidth: 800, 
            mx: 'auto', 
            mb: 6,
            fontSize: { xs: '14px', sm: '16px' },
            px: { xs: 2, sm: 0 }
          }}
        >
          Whether you're a small office or a large corporation, we provide reliable, secure, and
          eco-conscious solutions that make it easy to dispose of your electronic waste.
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard elevation={2}>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      margin: '0 auto 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: service.color,
                      color: 'white'
                    }}
                  >
                    {service.icon}
                  </Box>
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
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          fontWeight="bold" 
          gutterBottom
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
            px: { xs: 2, sm: 0 }
          }}
        >
          Our Process
        </Typography>
        
        <Typography 
          variant="body1" 
          textAlign="center" 
          paragraph 
          sx={{ 
            maxWidth: 800, 
            mx: 'auto', 
            mb: 6,
            fontSize: { xs: '14px', sm: '16px' },
            px: { xs: 2, sm: 0 }
          }}
        >
          From collection to refurbishment, reuse to responsible recycling, our process
          is designed with care. Whether you're an individual or an organization, we
          make it simple—so you can be part of the solution, every step of the way.
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProcessCard elevation={1}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: theme.spacing(2),
                    color: 'white'
                  }}
                >
                  {step.icon}
                </Box>
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
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'center' },
                gap: 3,
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                maxWidth: 'none',
                mx: 0,
                height: 'auto',
                minHeight: { xs: 'auto', sm: '120px' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#16615A',
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
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ fontSize: { xs: '18px', sm: '20px' } }}
                >
                  Impact
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '14px', sm: '14px' } }}
                >
                  Receive detailed reports on your environmental impact and data security
                </Typography>
              </Box>
              
              {/* Button */}
              <Box sx={{ flexShrink: 0, mt: { xs: 2, sm: 0 } }}>
                <Button 
                  variant="contained"
                  component={RouterLink}
                  to="/environmental-impact-report"
                  size="small"
                  sx={{ 
                    bgcolor: theme.palette.teal.main,
                    fontSize: { xs: '12px', sm: '14px' },
                    px: { xs: 2, sm: 3 },
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
    </Box>
  );
};

export default NewLandingPage; 