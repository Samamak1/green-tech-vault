import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Paper,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

// Import Material-UI icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import RecyclingIcon from '@mui/icons-material/Recycling';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedIcon from '@mui/icons-material/Verified';
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

// Traveling gradient animation from Profit Sharing to Blockchain Tracking
const travelingLineGradient = keyframes`
  0% {
    background: linear-gradient(90deg, #d1d5db 0%, #d1d5db 20%, #ffffff 50%, #d1d5db 80%, #d1d5db 100%);
    background-size: 200% 100%;
    background-position: -100% 50%;
  }
  100% {
    background: linear-gradient(90deg, #d1d5db 0%, #d1d5db 20%, #ffffff 50%, #d1d5db 80%, #d1d5db 100%);
    background-size: 200% 100%;
    background-position: 100% 50%;
  }
`;





// Live indicator pulse animation
const livePulse = keyframes`
  0% {
    background-color: #DC2626;
    transform: scale(1);
  }
  50% {
    background-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }
  100% {
    background-color: #DC2626;
    transform: scale(1);
  }
`;

// Styled animated content box
const AnimatedContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'animate',
})(({ theme, animate }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  padding: theme.spacing(2, 4),
  paddingBottom: theme.spacing(54), // Increased bottom padding by 100% more (27 -> 54)
  maxWidth: '720px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 2,
  animation: animate ? `${dropDown} 1.2s ease-out forwards` : 'none',
  transform: animate ? 'translateY(0)' : 'translateY(-100%)',
  opacity: animate ? 1 : 0,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5, 6),
    paddingBottom: theme.spacing(72), // Increased bottom padding by 100% more (36 -> 72)
    maxWidth: '800px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 3),
    paddingBottom: theme.spacing(36), // Increased bottom padding by 100% more (18 -> 36)
    borderRadius: '15px',
    margin: '0 16px',
    maxWidth: 'calc(100% - 32px)'
  }
}));

// Hero section with background image
const HeroSection = styled(Box)(() => ({
  position: 'relative',
  minHeight: '100vh',
  backgroundImage: 'url(/images/maybe.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '64px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0.35) 60%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.7) 85%, rgba(255, 255, 255, 0.9) 95%, rgba(255, 255, 255, 1) 100%)',
    zIndex: 1
  }
}));

// New Value Proposition Box Styled Components
const ValuePropContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '800px',
  height: '420px',
  margin: '40px auto 0',
  [theme.breakpoints.down('md')]: {
    height: '340px',
    maxWidth: '720px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '260px',
    maxWidth: 'calc(100% - 32px)',
  }
}));

const ValuePropBox = styled(Box)(({ theme, position, connectTo, verticalConnectToContent, boxId }) => ({
  position: 'absolute',
  width: boxId === 'blockchain' ? '130px' : '110px',
  height: boxId === 'blockchain' ? '195px' : '75px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: boxId === 'blockchain' 
    ? '0 0 8px rgba(251, 140, 0, 0.4), 0 0 16px rgba(253, 216, 53, 0.3), 0 0 24px rgba(187, 95, 182, 0.3), 0 0 32px rgba(243, 109, 178, 0.2), 0 0 40px rgba(224, 80, 80, 0.2), 0 0 48px rgba(240, 211, 81, 0.2), inset 0 0 0 1px rgba(251, 140, 0, 0.1)'
    : '0 4px 12px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)',
  padding: '4px',
  zIndex: 10, // Higher z-index to appear in front of hero text container
  ...position,












  '&:hover': {
    transform: 'translateY(-3px)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: boxId === 'blockchain'
      ? '0 0 12px rgba(251, 140, 0, 0.5), 0 0 24px rgba(253, 216, 53, 0.4), 0 0 36px rgba(187, 95, 182, 0.4), 0 0 48px rgba(243, 109, 178, 0.3), 0 0 60px rgba(224, 80, 80, 0.3), 0 0 72px rgba(240, 211, 81, 0.3), inset 0 0 0 1px rgba(251, 140, 0, 0.2)'
      : '0 6px 20px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.1)',
  },
  [theme.breakpoints.down('md')]: {
    width: boxId === 'blockchain' ? '104px' : '88px',
    height: boxId === 'blockchain' ? '160px' : '60px',
    padding: '3px',
    top: position.top ? `${parseInt(position.top) * 0.8}px` : position.top,
    left: position.left ? `${parseInt(position.left) * 0.8}px` : position.left,
  },
  [theme.breakpoints.down('sm')]: {
    width: boxId === 'blockchain' ? '78px' : '66px',
    height: boxId === 'blockchain' ? '125px' : '45px',
    padding: '2px',
    top: position.top ? `${parseInt(position.top) * 0.6}px` : position.top,
    left: position.left ? `${parseInt(position.left) * 0.6}px` : position.left,
  }
}));

const ValuePropIcon = styled(Box)(({ theme }) => ({
  marginBottom: '2px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: '18px',
    color: 'rgba(0, 0, 0, 0.8)',
    filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))',
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: '2px',
    '& .MuiSvgIcon-root': {
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.8)',
      filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))',
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '1px',
    '& .MuiSvgIcon-root': {
      fontSize: '12px',
      color: 'rgba(0, 0, 0, 0.8)',
      filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))',
    },
  }
}));

const ValuePropLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 'bold',
  fontFamily: 'inherit',
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.8)',
  textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
  lineHeight: 1.2,
  textDecoration: 'none',
  whiteSpace: 'pre-line',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.75rem',
    color: 'rgba(0, 0, 0, 0.8)',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    color: 'rgba(0, 0, 0, 0.8)',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
  }
}));

// Popup backdrop with blur effect
const PopupBackdrop = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'exiting',
})(({ exiting }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(2.5px)',
  zIndex: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  animation: exiting ? 'fadeOutBackdrop 0.45s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'fadeInBackdrop 0.3s ease-out',
  '@keyframes fadeInBackdrop': {
    '0%': {
      opacity: 0,
      backdropFilter: 'blur(0px)'
    },
    '100%': {
      opacity: 1,
      backdropFilter: 'blur(2.5px)'
    }
  },
  '@keyframes fadeOutBackdrop': {
    '0%': {
      opacity: 1,
      backdropFilter: 'blur(2.5px)'
    },
    '100%': {
      opacity: 0,
      backdropFilter: 'blur(0px)'
    }
  }
}));

// Popup text box
const PopupTextBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'exiting',
})(({ theme, exiting }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '24px',
  maxWidth: '320px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  border: '2px solid',
  borderImage: 'linear-gradient(90deg, #FB8C00 0%, #FDD835 6.67%, #94F1F1 13.33%, #62CBD0 20%, #418D91 26.67%, #2A7074 33.33%, #185B5F 40%, #073C3F 46.67%, #185B5F 53.33%, #2A7074 60%, #418D91 66.67%, #62CBD0 73.33%, #94F1F1 80%, #FDD835 86.67%, #FB8C00 93.33%, #FB8C00 100%) 1',
  animation: exiting ? 'fadeOutScale 0.45s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'fadeInScale 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  transform: 'scale(1)',
  '@keyframes fadeInScale': {
    '0%': {
      opacity: 0,
      transform: 'scale(0.85) translateY(10px)'
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1) translateY(0px)'
    }
  },
  '@keyframes fadeOutScale': {
    '0%': {
      opacity: 1,
      transform: 'scale(1) translateY(0px)'
    },
    '100%': {
      opacity: 0,
      transform: 'scale(0.95) translateY(-3px)'
    }
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '280px',
    padding: '20px'
  }
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



const NewLandingPage = () => {
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);
  const [hoveredBox, setHoveredBox] = useState(null);
  const [popupExiting, setPopupExiting] = useState(false);

  // Trigger animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Add useEffect to log image loading status
  React.useEffect(() => {
    const img = new Image();
    img.onload = () => console.log("Stock chart image loaded successfully");
    img.onerror = () => console.error("Failed to load stock chart image");
    img.src = "/images/stock-chart.jpg";
    
    const robotImg = new Image();
    robotImg.onload = () => console.log("Robot logo loaded successfully");
    robotImg.onerror = () => console.error("Failed to load robot logo");
    robotImg.src = "/images/robot-logo.svg";
  }, []);

  // Get popup content based on hovered box
  const getPopupContent = (boxType) => {
    switch (boxType) {
      case 'blockchain':
        return {
          title: 'Blockchain Tracking',
          description: 'Immutable device-to-value journey verification with GPS-validated custody transfers'
        };
      case 'profit':
        return {
          title: 'Profit Sharing',
          description: 'Profit share on refurbished sales through our global network'
        };
      case 'compliance':
        return {
          title: 'Compliance',
          description: 'Audit-proof R2/e-Stewards certified processing. Immutable recycling certificates. Chain-of-custody documentation. Data destruction certification.'
        };
      case 'esg':
        return {
          title: 'ESG Impact',
          description: 'SDG-aligned impact metrics for sustainability disclosures and reporting'
        };

      case 'tax':
        return {
          title: 'Tax Strategies',
          description: 'Automated IRS Form 8283 preparation and fair market value documentation'
        };
      default:
        return { title: '', description: '' };
    }
  };

  // Handle smooth popup exit animation
  const handleMouseLeave = () => {
    if (hoveredBox === 'blockchain' || hoveredBox === 'profit' || hoveredBox === 'compliance' || hoveredBox === 'esg' || hoveredBox === 'tax') {
      setPopupExiting(true);
      setTimeout(() => {
        setHoveredBox(null);
        setPopupExiting(false);
      }, 450); // Match the exit animation duration
    }
  };

  // Value proposition data
  const valuePropositions = [
    {
      id: 'blockchain',
      title: 'Blockchain\nTracking',
      icon: <LinkIcon />,
      position: { top: '-610px', left: '345px' }, // Moved up by 60px (-550px - 60px = -610px)
    },
    {
      id: 'profit',
      title: 'Profit\nSharing',
      icon: <AttachMoneyIcon />,
      position: { top: '-600px', left: '640px' }, // Moved left by 40px total (680px - 40px = 640px)
    },
    {
      id: 'tax',
      title: 'Tax\nStrategies',
      icon: <AssignmentIcon />,
      position: { top: '-500px', left: '640px' }, // Moved left by 40px total (680px - 40px = 640px)
    },
    {
      id: 'esg',
      title: 'ESG\nImpact',
      icon: <StarIcon />,
      position: { top: '-500px', left: '50px' } // Moved right by 50px total (0px + 50px = 50px)
    },
    {
      id: 'compliance',
      title: 'Compliance',
      icon: <ShieldIcon />,
      position: { top: '-600px', left: '50px' } // Moved right by 50px total (0px + 50px = 50px)
    }
  ];

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
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimatedContentBox animate={animate} sx={{ 
            textAlign: 'center',
            margin: { xs: '0 16px', sm: '0 auto', md: '0 auto' },
            maxWidth: { xs: 'calc(100% - 32px)', sm: '720px', md: '800px' },
            width: { xs: 'calc(100% - 32px)', sm: '720px', md: '800px' },
            borderRadius: '20px',
            [theme.breakpoints.up('md')]: {
              borderRadius: '20px',
            },
            [theme.breakpoints.down('sm')]: {
              borderRadius: '15px'
            }
          }}>
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
                variant="body1" 
                paragraph 
                color="text.primary" 
                sx={{ 
                  mb: { xs: 3, sm: 4 },
                  fontSize: { xs: '0.6125rem', sm: '0.8575rem', md: '1.225rem' },
                  fontWeight: 'bold',
                  fontFamily: 'inherit',
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                  textAlign: 'center',
                  textDecoration: 'none',
                  margin: 0,
                  marginBottom: { xs: 3, sm: 4 }
                }}
              >
                Engine That Transforms Retired Electronics into Business Value
              </Typography>

            </AnimatedContentBox>

          {/* Central Content Box */}
          <Box sx={{ 
            position: 'absolute',
            top: 'calc(60% - 100px)', // Moved up by 100px
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            maxWidth: { xs: 'calc(100% - 48px)', sm: '650px', md: '720px' },
            width: { xs: 'calc(100% - 48px)', sm: '650px', md: '720px' },
            height: { xs: '350px', sm: '400px', md: '420px' }
          }}>
            <Box sx={{
              position: 'relative',
              borderRadius: '16px',
              padding: '3px',
              background: 'linear-gradient(90deg, #FB8C00 0%, #FDD835 6.67%, #94F1F1 13.33%, #62CBD0 20%, #418D91 26.67%, #2A7074 33.33%, #185B5F 40%, #073C3F 46.67%, #185B5F 53.33%, #2A7074 60%, #418D91 66.67%, #62CBD0 73.33%, #94F1F1 80%, #FDD835 86.67%, #FB8C00 93.33%, #FB8C00 100%)',
              backgroundSize: '300% 100%',
              animation: `${pulsatingGradient} 10s linear infinite`
            }}>
              <Box sx={{
                borderRadius: '13px',
                padding: '32px',
                height: { xs: '344px', sm: '394px', md: '414px' },
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}>
                {/* Header Row */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <Typography sx={{ 
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    color: 'text.primary',
                    lineHeight: 1.2,
                    whiteSpace: 'pre-line'
                  }}>
                    Impact Dashboard
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px'
                  }}>
                    <Box sx={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#DC2626',
                      animation: `${livePulse} 2s ease-in-out infinite`
                    }} />
                    <Typography sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      fontFamily: 'inherit',
                      textAlign: 'right',
                      color: 'text.primary',
                      lineHeight: 1.2,
                      whiteSpace: 'pre-line'
                    }}>
                      Live Tracking
                    </Typography>
                  </Box>
                </Box>

                {/* Content Grid */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Top Row - Boxes 1 & 2 */}
                  <Box sx={{ display: 'flex', gap: '12px', height: '45%' }}>
                    <Box sx={{
                      flex: 1,
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0.3) 80%, rgba(255, 255, 255, 0.1) 95%, rgba(255, 255, 255, 0) 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      padding: '8px'
                    }}>
                      <Typography sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.6125rem', sm: '0.8575rem', md: '1.225rem' },
                        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                        color: 'text.primary',
                        textAlign: 'center',
                        marginBottom: '4px'
                      }}>
                        2,847
                      </Typography>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        textAlign: 'center'
                      }}>
                        Devices processed and tracked
                      </Typography>
                    </Box>
                    <Box sx={{
                      flex: 1,
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0.3) 80%, rgba(255, 255, 255, 0.1) 95%, rgba(255, 255, 255, 0) 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      padding: '8px'
                    }}>
                      <Typography sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.6125rem', sm: '0.8575rem', md: '1.225rem' },
                        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                        color: 'text.primary',
                        textAlign: 'center',
                        marginBottom: '4px'
                      }}>
                        $127k
                      </Typography>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        textAlign: 'center'
                      }}>
                        Value Recovered
                      </Typography>
                    </Box>
                  </Box>

                  {/* Middle Row - Boxes 3 & 4 */}
                  <Box sx={{ display: 'flex', gap: '12px', height: '45%' }}>
                    <Box sx={{
                      flex: 1,
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0.3) 80%, rgba(255, 255, 255, 0.1) 95%, rgba(255, 255, 255, 0) 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      padding: '8px'
                    }}>
                      <Typography sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.6125rem', sm: '0.8575rem', md: '1.225rem' },
                        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                        color: 'text.primary',
                        textAlign: 'center',
                        marginBottom: '4px'
                      }}>
                        185t
                      </Typography>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        textAlign: 'center'
                      }}>
                        CO<sub>2</sub> Avoided
                      </Typography>
                    </Box>
                    <Box sx={{
                      flex: 1,
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0.3) 80%, rgba(255, 255, 255, 0.1) 95%, rgba(255, 255, 255, 0) 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      padding: '8px'
                    }}>
                      <Typography sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.6125rem', sm: '0.8575rem', md: '1.225rem' },
                        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                        color: 'text.primary',
                        textAlign: 'center',
                        marginBottom: '4px'
                      }}>
                        98%
                      </Typography>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        textAlign: 'center'
                      }}>
                        Landfill Diverted
                      </Typography>
                    </Box>
                  </Box>

                  {/* Bottom Row - Box 5 (Full Width) */}
                  <Box sx={{
                    height: '45%',
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0.3) 80%, rgba(255, 255, 255, 0.1) 95%, rgba(255, 255, 255, 0) 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '16px',
                    gap: '12px'
                  }}>
                    <Typography sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      fontFamily: 'inherit',
                      color: 'text.primary',
                      lineHeight: 1.2,
                      textAlign: 'center'
                    }}>
                      Value Stream Breakdown
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      width: '100%'
                    }}>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        minWidth: '70px'
                      }}>
                        Refurbished
                      </Typography>
                      <Box sx={{
                        width: '550px',
                        height: '12px',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        mx: 2
                      }}>
                        <Box sx={{
                          width: '75%',
                          height: '100%',
                          background: 'linear-gradient(to right, #ffffff, #185B5F)',
                          borderRadius: '6px'
                        }} />
                      </Box>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        minWidth: '30px',
                        textAlign: 'right'
                      }}>
                        75%
                      </Typography>
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      width: '100%'
                    }}>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        minWidth: '70px'
                      }}>
                        Recycled
                      </Typography>
                      <Box sx={{
                        width: '550px',
                        height: '12px',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        mx: 2
                      }}>
                        <Box sx={{
                          width: '60%',
                          height: '100%',
                          background: 'linear-gradient(to right, #ffffff, #185B5F)',
                          borderRadius: '6px'
                        }} />
                      </Box>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        minWidth: '30px',
                        textAlign: 'right'
                      }}>
                        60%
                      </Typography>
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      width: '100%'
                    }}>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        minWidth: '70px'
                      }}>
                        Donated
                      </Typography>
                      <Box sx={{
                        width: '550px',
                        height: '12px',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        mx: 2
                      }}>
                        <Box sx={{
                          width: '25%',
                          height: '100%',
                          background: 'linear-gradient(to right, #ffffff, #185B5F)',
                          borderRadius: '6px'
                        }} />
                      </Box>
                      <Typography sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 'normal',
                        fontFamily: 'inherit',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        minWidth: '30px',
                        textAlign: 'right'
                      }}>
                        25%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Value Propositions - Integrated into Hero */}
          <ValuePropContainer>
            {valuePropositions.map((prop) => (
              <ValuePropBox
                key={prop.id}
                boxId={prop.id}
                position={prop.position}
                connectTo={prop.connectTo}
                verticalConnectToContent={prop.verticalConnectToContent}
                onMouseEnter={() => (prop.id === 'blockchain' || prop.id === 'profit' || prop.id === 'compliance' || prop.id === 'esg' || prop.id === 'tax') && setHoveredBox(prop.id)}
                onMouseLeave={handleMouseLeave}
              >
                <ValuePropIcon>
                  {prop.icon}
                </ValuePropIcon>
                <ValuePropLabel>
                  {prop.title}
                </ValuePropLabel>
              </ValuePropBox>
            ))}
          </ValuePropContainer>
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
          
          {/* Impact Section */}
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

      {/* Hover Popup for Value Propositions */}
      {((hoveredBox === 'blockchain' || hoveredBox === 'profit' || hoveredBox === 'compliance' || hoveredBox === 'esg' || hoveredBox === 'tax') || popupExiting) && (
        <PopupBackdrop exiting={popupExiting}>
          <PopupTextBox exiting={popupExiting}>
            <Typography 
              sx={{ 
                fontWeight: 'bold',
                fontSize: '1.125rem',
                marginBottom: '12px',
                color: '#073C3F'
              }}
            >
              {getPopupContent(hoveredBox).title}
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: 'text.secondary'
              }}
            >
              {getPopupContent(hoveredBox).description}
            </Typography>
          </PopupTextBox>
        </PopupBackdrop>
      )}
    </Box>
  );
};

export default NewLandingPage; 