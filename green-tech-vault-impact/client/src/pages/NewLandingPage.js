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
import LinkIcon from '@mui/icons-material/Link';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NatureIcon from '@mui/icons-material/Nature';
import StarIcon from '@mui/icons-material/Star';
import ShieldIcon from '@mui/icons-material/Shield';

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

// One-way left to right gradient animation
const pulsatingGradient = keyframes`
  0% {
    background-position: 200% 50%;
  }
  100% {
    background-position: -100% 50%;
  }
`;

// Styled animated content box
const AnimatedContentBox = styled(Box)(({ theme, animate }) => ({
  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0.3) 80%, rgba(255, 255, 255, 0.1) 95%, rgba(255, 255, 255, 0) 100%)',
  borderRadius: '20px',
  padding: theme.spacing(2, 4), // Further reduced vertical padding
  maxWidth: '720px', // Reduced by 20%
  margin: '0 auto', // Horizontally centered
  position: 'relative',
  zIndex: 2,
  animation: animate ? `${dropDown} 1.2s ease-out forwards` : 'none',
  transform: animate ? 'translateY(0)' : 'translateY(-100%)',
  opacity: animate ? 1 : 0,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5, 6), // Further reduced vertical padding
    maxWidth: '800px', // Reduced by 20%
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 3), // Further reduced vertical padding
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
  alignItems: 'flex-start', // Align content to top
  justifyContent: 'center', // Center content horizontally
  paddingTop: '64px', // Moved up from header
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

// Value Hexagon Ecosystem Components
const ValueHexagonContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '500px',
  height: '500px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    width: '400px',
    height: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '300px',
    height: '300px',
  }
}));

const HexNode = styled(Box)(({ theme, color, position }) => ({
  position: 'absolute',
  width: 100,
  height: 100,
  borderRadius: '50%',
  backgroundColor: color,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  zIndex: 10,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  color: 'white',
  ...position,
  '&:hover': {
    transform: 'scale(1.15)',
    zIndex: 100,
  },
  [theme.breakpoints.down('md')]: {
    width: 80,
    height: 80,
    top: position.top ? `${parseInt(position.top) * 0.8}px` : position.top,
    left: position.left ? `${parseInt(position.left) * 0.8}px` : position.left,
  },
  [theme.breakpoints.down('sm')]: {
    width: 60,
    height: 60,
    top: position.top ? `${parseInt(position.top) * 0.6}px` : position.top,
    left: position.left ? `${parseInt(position.left) * 0.6}px` : position.left,
  }
}));

const HexLabel = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  textAlign: 'center',
  maxWidth: '80px',
  lineHeight: 1.2,
  marginTop: '4px',
  [theme.breakpoints.down('md')]: {
    fontSize: '10px',
    maxWidth: '60px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '8px',
    maxWidth: '45px',
  }
}));

const ValueCounter = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '24px',
  fontWeight: 700,
  color: '#0d9488',
  textAlign: 'center',
  background: 'white',
  borderRadius: '50%',
  width: 180,
  height: 180,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 20px rgba(13, 148, 136, 0.2)',
  zIndex: 5,
  [theme.breakpoints.down('md')]: {
    width: 140,
    height: 140,
    fontSize: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 100,
    fontSize: '16px',
  }
}));

const Connector = styled(Box)(({ theme, length, angle, startX, startY }) => ({
  position: 'absolute',
  height: 3,
  width: length,
  background: '#0d9488',
  transformOrigin: '0 0',
  transform: `rotate(${angle}deg)`,
  left: startX,
  top: startY,
  zIndex: 1,
  opacity: 0.3,
  transition: 'opacity 0.3s ease',
}));

const HexTooltip = styled(Box)(({ theme, show, x, y }) => ({
  position: 'absolute',
  background: 'white',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
  width: '200px',
  zIndex: 200,
  opacity: show ? 1 : 0,
  transition: 'opacity 0.3s ease',
  pointerEvents: 'none',
  left: x,
  top: y,
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    padding: '10px',
    fontSize: '12px',
  }
}));

// Value Ecosystem Hexagon Component
const ValueEcosystemHexagon = () => {
  const theme = useTheme();
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [currentValue, setCurrentValue] = useState(0);

  // Animate counter on mount
  useEffect(() => {
    const targetValue = 4812;
    const duration = 3000;
    const startTime = Date.now();

    const animateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCurrentValue(Math.floor(progress * targetValue));
      
      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };

    const timer = setTimeout(animateCounter, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Pillar data
  const pillars = [
    {
      id: 'blockchain',
      title: 'Blockchain Tracking',
      description: 'Immutable device-to-value journey verification with GPS-validated custody transfers',
      icon: <LinkIcon fontSize="large" />,
      color: '#0d9488',
      position: { top: '50px', left: '200px' }
    },
    {
      id: 'profit',
      title: 'Profit Sharing',
      description: '15-40% revenue share on refurbished sales through our global marketplace',
      icon: <AttachMoneyIcon fontSize="large" />,
      color: '#eab308',
      position: { top: '150px', left: '400px' }
    },
    {
      id: 'tax',
      title: 'Tax Strategies',
      description: 'Automated IRS Form 8283 preparation and fair market value documentation',
      icon: <AssignmentIcon fontSize="large" />,
      color: '#2563eb',
      position: { top: '350px', left: '400px' }
    },
    {
      id: 'carbon',
      title: 'Carbon Credits',
      description: 'Gold Standard-certified carbon credits from emissions avoidance',
      icon: <NatureIcon fontSize="large" />,
      color: '#16a34a',
      position: { top: '450px', left: '200px' }
    },
    {
      id: 'esg',
      title: 'ESG Impact',
      description: 'SDG-aligned impact metrics for sustainability disclosures and reporting',
      icon: <StarIcon fontSize="large" />,
      color: '#7e22ce',
      position: { top: '350px', left: '0px' }
    },
    {
      id: 'compliance',
      title: 'Compliance',
      description: 'Audit-proof R2/e-Stewards certified processing with blockchain verification',
      icon: <ShieldIcon fontSize="large" />,
      color: '#4b5563',
      position: { top: '150px', left: '0px' }
    }
  ];

  // Node positions for connectors
  const nodePositions = [
    { x: 250, y: 100 },  // blockchain (center of node)
    { x: 450, y: 200 },  // profit
    { x: 450, y: 400 },  // tax
    { x: 250, y: 500 },  // carbon
    { x: 50, y: 400 },   // esg
    { x: 50, y: 200 }    // compliance
  ];

  // Connection lines
  const connections = [
    [0,1], [1,2], [2,3], [3,4], [4,5], [5,0], // Outer hexagon
    [0,2], [1,3], [2,4], [3,5], [4,0], [5,1]  // Inner connections
  ];

  const handleNodeHover = (pillar, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const hexRect = event.currentTarget.closest('.value-hexagon').getBoundingClientRect();
    
    setTooltipPosition({
      x: rect.left - hexRect.left + 50,
      y: rect.top - hexRect.top + 120
    });
    setHoveredPillar(pillar);
  };

  const handleNodeLeave = () => {
    setHoveredPillar(null);
  };

  return (
    <Box sx={{ py: 2, backgroundColor: '#f9fafb' }}>
      <Container maxWidth="lg">        
        <ValueHexagonContainer className="value-hexagon">
          {/* Central Counter */}
          <ValueCounter>
            <Box>
              <Typography variant="inherit" component="div">
                ${currentValue.toLocaleString()}
              </Typography>
              <Typography variant="body2" component="div" sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                Value Unlocked
              </Typography>
            </Box>
          </ValueCounter>

          {/* Connection Lines */}
          {connections.map((conn, index) => {
            const p1 = nodePositions[conn[0]];
            const p2 = nodePositions[conn[1]];
            const length = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
            
            return (
              <Connector
                key={index}
                length={length}
                angle={angle}
                startX={p1.x}
                startY={p1.y}
              />
            );
          })}

          {/* Pillar Nodes */}
          {pillars.map((pillar) => (
            <HexNode
              key={pillar.id}
              color={pillar.color}
              position={pillar.position}
              onMouseEnter={(e) => handleNodeHover(pillar, e)}
              onMouseLeave={handleNodeLeave}
            >
              {pillar.icon}
              <HexLabel variant="body2">
                {pillar.title}
              </HexLabel>
            </HexNode>
          ))}

          {/* Tooltip */}
          {hoveredPillar && (
            <HexTooltip
              show={!!hoveredPillar}
              x={tooltipPosition.x}
              y={tooltipPosition.y}
            >
              <Typography variant="h6" sx={{ color: hoveredPillar.color, mb: 1 }}>
                {hoveredPillar.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hoveredPillar.description}
              </Typography>
            </HexTooltip>
          )}
        </ValueHexagonContainer>
      </Container>
    </Box>
  );
};

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
          <AnimatedContentBox animate={animate} sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '0.8575rem', sm: '1.225rem', md: '1.8375rem' },
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                mb: { xs: 2, sm: 3 },
                textAlign: 'center',
                margin: 0,
                marginBottom: { xs: 2, sm: 3 },
                background: 'linear-gradient(90deg, #FB8C00 0%, #FDD835 6.67%, #94F1F1 13.33%, #62CBD0 20%, #418D91 26.67%, #2A7074 33.33%, #185B5F 40%, #073C3F 46.67%, #185B5F 53.33%, #2A7074 60%, #418D91 66.67%, #62CBD0 73.33%, #94F1F1 80%, #FDD835 86.67%, #FB8C00 93.33%, #FB8C00 100%)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: `${pulsatingGradient} 10s linear infinite`
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
                fontSize: { xs: '0.6125rem', sm: '0.8575rem', md: '1.225rem' },
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                mb: { xs: 2, sm: 3 },
                textAlign: 'center',
                margin: 0,
                marginBottom: { xs: 2, sm: 3 }
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
                lineHeight: { xs: 1.4, sm: 1.5 },
                textAlign: 'center',
                margin: 0,
                marginBottom: { xs: 3, sm: 4 }
              }}
            >
              RYGNeco's unified platform transforms retired electronics into measurable business value through integrated blockchain tracking, profit recovery, tax optimization, carbon credits, ESG impact, and ironclad compliance.
            </Typography>

          </AnimatedContentBox>
        </Container>
      </HeroSection>
      
      {/* Value Ecosystem Hexagon Section */}
      <ValueEcosystemHexagon />
      
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