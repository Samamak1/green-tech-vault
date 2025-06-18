import React, { useState } from 'react';
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


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import our custom components
import ParallaxStatsSection from '../components/layout/ParallaxStatsSection';



// One-way left to right gradient animation
const pulsatingGradient = keyframes`
  0% {
    background-position: 200% 50%;
  }
  100% {
    background-position: -100% 50%;
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

// Styled content box
const AnimatedContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '0px',
  padding: theme.spacing(2, 4),
  paddingBottom: theme.spacing(1), // Reduced bottom padding by additional ~200px (6 -> 1)
  maxWidth: '720px',
  margin: '500px auto 0 auto', // Moved content box down by 500px
  position: 'relative',
  zIndex: 2,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5, 6),
    paddingBottom: theme.spacing(1), // Reduced bottom padding by additional ~200px (8 -> 1)
    maxWidth: '800px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 3),
    paddingBottom: theme.spacing(0.5), // Reduced bottom padding by additional ~200px (3 -> 0.5)
    borderRadius: '0px',
    margin: '500px 16px 0 16px', // Moved content box down by 500px on mobile
    maxWidth: 'calc(100% - 32px)'
  }
}));

// Hero section with background image
const HeroSection = styled(Box)(() => ({
  position: 'relative',
  minHeight: '100vh',
  backgroundImage: 'url(/images/hero-background.svg)',
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
    backdropFilter: 'blur(2.2px)',
    WebkitBackdropFilter: 'blur(2.2px)',
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
  width: '110px',
  height: '75px',
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
  transform: 'none',
  transformOrigin: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)',
  padding: '4px',
  zIndex: 10, // Higher z-index to appear in front of hero text container
  ...position,



  '&:hover': {
    transform: 'translateY(-3px)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.1)',
  },
  [theme.breakpoints.down('md')]: {
    width: '88px',
    height: '60px',
    padding: '3px',
    top: position.top ? `${parseInt(position.top) * 0.8}px` : position.top,
    left: position.left ? `${parseInt(position.left) * 0.8}px` : position.left,
  },
  [theme.breakpoints.down('sm')]: {
    width: '66px',
    height: '45px',
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
  '& img': {
    filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))',
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: '2px',
    '& .MuiSvgIcon-root': {
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.8)',
      filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))',
    },
    '& img': {
      width: '240px !important',
      height: '160px !important',
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
    '& img': {
      width: '180px !important',
      height: '120px !important',
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

// Carousel Container
const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '793px',
  height: '440px',
  overflow: 'hidden',
  borderRadius: '0px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  mask: 'radial-gradient(ellipse 75% 65% at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0) 100%)',
  WebkitMask: 'radial-gradient(ellipse 75% 65% at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0) 100%)',
  [theme.breakpoints.down('md')]: {
    width: '683px',
    height: '330px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '551px',
    height: '198px',
  }
}));

// Carousel Track - Efficient Infinite Loop
const CarouselTrack = styled(Box)(({ currentIndex, shouldAnimate = true }) => ({
  display: 'flex',
  width: '800%', // 8 slides total (6 main + 2 duplicates)
  height: '100%',
  transform: `translateX(-${currentIndex * 12.5}%)`, // 12.5% = 100/8
  transition: shouldAnimate ? 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'none',
}));

// Individual Slide
const CarouselSlide = styled(Box)(({ theme }) => ({
  width: 'calc(100% / 8)', // Each slide takes 1/8 of the track width
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '26px',
  fontWeight: 'bold',
  color: 'black',
  position: 'relative',
  backgroundColor: 'white',
  '&:nth-of-type(1)': {
    backgroundColor: 'white',
    color: 'black',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  }
}));

// Navigation Button
const NavigationButton = styled(Box)(({ theme, direction }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [direction]: '22px',
  width: '55px',
  height: '55px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 10,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-50%) scale(1.1)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '26px',
    color: '#333',
    filter: 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.8))',
  },
  [theme.breakpoints.down('sm')]: {
    width: '44px',
    height: '44px',
    '& .MuiSvgIcon-root': {
      fontSize: '22px',
    },
  }
}));



const NewLandingPage = () => {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(1); // Start at position 1 (showing slide1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(true);

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

  // Auto-play functionality - advance every 3 seconds
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        if (nextSlide === 7) {
          // After showing slide1 duplicate, seamlessly reset to main slide1 (position 1)
          setTimeout(() => {
            setShouldAnimate(false);
            setCurrentSlide(1);
            setTimeout(() => setShouldAnimate(true), 50);
          }, 500);
          return 7;
        }
        return nextSlide;
      });
          }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, setShouldAnimate]);

  // Efficient infinite carousel with seamless loop
  const goToNextSlide = (isManual = false) => {
    // Pause auto-play if manually triggered
    if (isManual) {
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
    }

    setCurrentSlide((prev) => {
      const nextSlide = prev + 1;
      if (nextSlide === 7) {
        // After showing slide1 duplicate, seamlessly reset to main slide1 (position 1)
        setTimeout(() => {
          setShouldAnimate(false);
          setCurrentSlide(1);
          setTimeout(() => setShouldAnimate(true), 50);
        }, 500);
        return 7;
      }
      return nextSlide;
    });
  };

  const goToPrevSlide = (isManual = false) => {
    // Pause auto-play if manually triggered
    if (isManual) {
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000); // Resume after 5 seconds
    }

    setCurrentSlide((prev) => {
      const prevSlide = prev - 1;
      if (prevSlide === 0) {
        // After showing slide6 duplicate, seamlessly reset to main slide6 (position 6)
        setTimeout(() => {
          setShouldAnimate(false);
          setCurrentSlide(6);
          setTimeout(() => setShouldAnimate(true), 50);
        }, 500);
        return 0;
      }
      return prevSlide;
    });
  };

  // Slide data
  const slides = [
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: '22px'
    }}>
      <Typography sx={{
        position: 'absolute',
        top: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
        fontSize: { xs: '0.67375rem', sm: '0.94325rem', md: '1.3475rem' },
        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
        color: '#737373',
        textAlign: 'center',
        width: '100%'
      }}>
        BLOCKCHAIN TRACKING
      </Typography>
      <Typography sx={{
        position: 'absolute',
        top: '88px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: { xs: '0.55rem', sm: '0.715rem', md: '0.88rem' },
        lineHeight: { xs: 1.3, sm: 1.4, md: 1.4 },
        color: '#666666',
        textAlign: 'center',
        width: '90%',
        fontWeight: 'normal'
             }}>
        Immutable device-to-value journey verification with GPS-validated custody transfers
      </Typography>
             <div style={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         height: '100%',
         paddingTop: '51px',
         marginTop: '-11px'
       }}>
        <img 
          src="/images/blockchain-tracking.png?v=2" 
          alt="Blockchain Tracking"
          style={{
            maxWidth: '111%',
            maxHeight: '87%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
      </div>
    </div>,
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: '22px'
    }}>
      <Typography sx={{
        position: 'absolute',
        top: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
        fontSize: { xs: '0.67375rem', sm: '0.94325rem', md: '1.3475rem' },
        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
        color: '#737373',
        textAlign: 'center',
        width: '100%'
      }}>
        ESG REPORTING
      </Typography>
      <Typography sx={{
        position: 'absolute',
        top: '88px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: { xs: '0.55rem', sm: '0.715rem', md: '0.88rem' },
        lineHeight: { xs: 1.3, sm: 1.4, md: 1.4 },
        color: '#666666',
        textAlign: 'center',
        width: '90%',
        fontWeight: 'normal'
      }}>
        Comprehensive ESG metrics and sustainability reporting
      </Typography>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: '38.5px',
        marginTop: '-11px'
      }}>
                 <img 
           src="/images/esg.png?v=2" 
           alt="ESG Reporting"
           style={{
             maxWidth: '83%',
             maxHeight: '65%',
             width: 'auto',
             height: 'auto',
             objectFit: 'contain',
             objectPosition: 'center'
           }}
        />
      </div>
    </div>, 
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: '22px'
    }}>
      <Typography sx={{
        position: 'absolute',
        top: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
        fontSize: { xs: '0.67375rem', sm: '0.94325rem', md: '1.3475rem' },
        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
        color: '#737373',
        textAlign: 'center',
        width: '100%'
      }}>
        PROFIT SHARING
      </Typography>
      <Typography sx={{
        position: 'absolute',
        top: '88px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: { xs: '0.55rem', sm: '0.715rem', md: '0.88rem' },
        lineHeight: { xs: 1.3, sm: 1.4, md: 1.4 },
        color: '#666666',
        textAlign: 'center',
        width: '90%',
        fontWeight: 'normal'
      }}>
        Profit sharing from refurbished device sales and recycling
      </Typography>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: '31px',
        marginTop: '-11px'
      }}>
        <img 
          src="/images/profit.png?v=2" 
          alt="Profit Sharing"
          style={{
            maxWidth: '72%',
            maxHeight: '57%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
      </div>
    </div>,
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: '22px'
    }}>
      <Typography sx={{
        position: 'absolute',
        top: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
        fontSize: { xs: '0.67375rem', sm: '0.94325rem', md: '1.3475rem' },
        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
        color: '#737373',
        textAlign: 'center',
        width: '100%'
      }}>
        TAX BENEFITS
      </Typography>
      <Typography sx={{
        position: 'absolute',
        top: '88px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: { xs: '0.55rem', sm: '0.715rem', md: '0.88rem' },
        lineHeight: { xs: 1.3, sm: 1.4, md: 1.4 },
        color: '#666666',
        textAlign: 'center',
        width: '90%',
        fontWeight: 'normal'
      }}>
        Tax deductions and credits for responsible e-waste disposal
      </Typography>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: '31px',
        marginTop: '-11px'
      }}>
        <img 
          src="/images/tax.png?v=2" 
          alt="Tax Benefits"
          style={{
            maxWidth: '80%',
            maxHeight: '63%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
      </div>
    </div>,
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: '22px'
    }}>
      <Typography sx={{
        position: 'absolute',
        top: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
        fontSize: { xs: '0.67375rem', sm: '0.94325rem', md: '1.3475rem' },
        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
        color: '#737373',
        textAlign: 'center',
        width: '100%'
      }}>
        COMPLIANCE
      </Typography>
      <Typography sx={{
        position: 'absolute',
        top: '88px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: { xs: '0.55rem', sm: '0.715rem', md: '0.88rem' },
        lineHeight: { xs: 1.3, sm: 1.4, md: 1.4 },
        color: '#666666',
        textAlign: 'center',
        width: '90%',
        fontWeight: 'normal'
      }}>
        Regulatory compliance and certification tracking
      </Typography>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: '36px',
        marginTop: '-11px'
      }}>
        <img 
          src="/images/compliance.png?v=2" 
          alt="Compliance"
          style={{
            maxWidth: '80%',
            maxHeight: '63%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
      </div>
    </div>,
    <div style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: '22px'
    }}>
      <Typography sx={{
        position: 'absolute',
        top: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
        fontSize: { xs: '0.67375rem', sm: '0.94325rem', md: '1.3475rem' },
        lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
        color: '#737373',
        textAlign: 'center',
        width: '100%'
      }}>
        CARBON CREDITS
      </Typography>
      <Typography sx={{
        position: 'absolute',
        top: '88px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: { xs: '0.55rem', sm: '0.715rem', md: '0.88rem' },
        lineHeight: { xs: 1.3, sm: 1.4, md: 1.4 },
        color: '#666666',
        textAlign: 'center',
        width: '90%',
        fontWeight: 'normal'
      }}>
        Carbon offset credits from responsible e-waste recycling
      </Typography>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: '41px',
        marginTop: '-11px'
      }}>
        <img 
          src="/images/carbon.png?v=2" 
          alt="Carbon Credits"
          style={{
            maxWidth: '80%',
            maxHeight: '63%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
      </div>
    </div>
  ];

  // Value proposition data (empty - all boxes removed)
  const valuePropositions = [];

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
          <AnimatedContentBox sx={{ 
            textAlign: 'center',
            margin: { xs: '0 16px', sm: '0 auto', md: '0 auto' },
            maxWidth: { xs: 'calc(100% - 32px)', sm: '720px', md: '800px' },
            width: { xs: 'calc(100% - 32px)', sm: '720px', md: '800px' },
            borderRadius: '0px',
            [theme.breakpoints.up('md')]: {
              borderRadius: '0px',
            },
            [theme.breakpoints.down('sm')]: {
              borderRadius: '0px'
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
                One Platform. Complete Value Creation.
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
            top: 'calc(60% + 700px)', // Moved up by 100px (800px - 100px = 700px)
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            maxWidth: { xs: '551px', sm: '683px', md: '793px' },
            width: { xs: '551px', sm: '683px', md: '793px' },
            height: { xs: '450px', sm: '500px', md: '520px' }
          }}>
            <Box sx={{
              position: 'relative',
              borderRadius: '0px',
              padding: '3px',
              background: 'linear-gradient(90deg, #FB8C00 0%, #FDD835 6.67%, #94F1F1 13.33%, #62CBD0 20%, #418D91 26.67%, #2A7074 33.33%, #185B5F 40%, #073C3F 46.67%, #185B5F 53.33%, #2A7074 60%, #418D91 66.67%, #62CBD0 73.33%, #94F1F1 80%, #FDD835 86.67%, #FB8C00 93.33%, #FB8C00 100%)',
              backgroundSize: '300% 100%',
              animation: `${pulsatingGradient} 10s linear infinite`
            }}>
              <Box sx={{
                borderRadius: '0px',
                padding: '32px',
                height: { xs: '444px', sm: '494px', md: '514px' },
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}>
                {/* Logo */}
                <Box sx={{
                  position: 'absolute',
                  top: '32px',
                  left: '32px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <img 
                    src="/images/logo.png" 
                    alt="Logo"
                    style={{
                      height: '22px',
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
                {/* Header Row */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
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

                {/* Rectangular Box */}
                <Box sx={{
                  position: 'absolute',
                  top: '70px',
                  left: '40px',
                  right: '40px',
                  height: '120px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #000000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                }}>
                  <Typography sx={{
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    backgroundColor: '#ffffff',
                    padding: '0 8px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#000000',
                  }}>
                    Our Goal
                  </Typography>
                  
                  {/* Top Section - Text */}
                  <Box sx={{ width: '100%', textAlign: 'center', marginTop: '8px' }}>
                    <Typography sx={{
                      fontSize: '0.75rem',
                      fontWeight: 'normal',
                      color: '#666666',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}>
                      Closing the Loop on 53.7M MT of Global E-Waste: Transitioning from 20% Recycled to Full Resource Reintegration
                    </Typography>
                  </Box>
                  
                  {/* Bottom Section - Progress Bar */}
                  <Box sx={{ width: '100%', position: 'relative', marginBottom: '8px', marginTop: '20px' }}>
                    {/* Leader Line and Achievement Text */}
                    <Box sx={{
                      position: 'absolute',
                      left: 'calc(2.5% + 20px)',
                      top: '-35px',
                      zIndex: 1,
                    }}>
                      {/* Processed Amount */}
                      <Typography sx={{
                        fontSize: '0.55rem',
                        color: '#185B5F',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        marginBottom: '2px',
                      }}>
                        32.4 MT processed
                      </Typography>
                      {/* Achievement Label */}
                      <Typography sx={{
                        fontSize: '0.55rem',
                        color: '#185B5F',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                      }}>
                        0.00006015% achieved
                      </Typography>
                      {/* Leader Line */}
                      <Box sx={{
                        width: '1px',
                        height: '8px',
                        backgroundColor: '#185B5F',
                        marginTop: '2px',
                        animation: 'beaconBlink 2s ease-in-out infinite',
                        '@keyframes beaconBlink': {
                          '0%': {
                            opacity: 1,
                            backgroundColor: '#185B5F',
                          },
                          '50%': {
                            opacity: 0.3,
                            backgroundColor: '#94F1F1',
                          },
                          '100%': {
                            opacity: 1,
                            backgroundColor: '#185B5F',
                          }
                        }
                      }} />
                    </Box>
                    
                    {/* Progress Bar Container */}
                    <Box sx={{
                      width: 'calc(95% - 40px)',
                      height: '8px',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative',
                      margin: '0 auto',
                    }}>
                      {/* Progress Fill */}
                      <Box sx={{
                        width: '0.5px',
                        height: '100%',
                        background: 'linear-gradient(to right, #185B5F, #418D91)',
                        borderRadius: '4px',
                      }} />
                    </Box>
                    
                    {/* Progress Labels */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginTop: '4px',
                      width: 'calc(95% - 40px)',
                      margin: '4px auto 0 auto',
                    }}>
                      <Typography sx={{ fontSize: '0.6rem', color: '#666666' }}>0</Typography>
                      <Typography sx={{ fontSize: '0.6rem', color: '#666666', marginRight: '-5px' }}>53.7 M MT</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Statistics Box */}
                <Box sx={{
                  position: 'absolute',
                  top: '230px',
                  left: '40px',
                  right: '40px',
                  height: '140px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                }}>
                  <Typography sx={{
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    backgroundColor: '#ffffff',
                    padding: '0 8px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#000000',
                  }}>
                    Our Impact
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    <Typography sx={{ 
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      lineHeight: 1.2,
                      color: 'text.primary',
                      textAlign: 'left'
                    }}>
                      $127k Value Recovered
                    </Typography>
                    
                    <Typography sx={{ 
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      lineHeight: 1.2,
                      color: 'text.primary',
                      textAlign: 'left'
                    }}>
                      185t CO<sub>2</sub> Avoided
                    </Typography>
                    
                    <Typography sx={{ 
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      lineHeight: 1.2,
                      color: 'text.primary',
                      textAlign: 'left'
                    }}>
                      98% Landfill Diverted
                    </Typography>
                  </Box>
                </Box>

                {/* Value Stream Breakdown Box */}
                <Box sx={{
                  position: 'absolute',
                  top: '390px',
                  left: '40px',
                  right: '40px',
                  height: '80px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                }}>
                  <Typography sx={{
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    backgroundColor: '#ffffff',
                    padding: '0 8px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#000000',
                  }}>
                    Value Stream Breakdown
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', position: 'relative' }}>
                    <Typography sx={{ 
                      position: 'absolute',
                      top: '30px',
                      left: '30px',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      lineHeight: 1.2,
                      color: 'text.primary',
                      textAlign: 'left'
                    }}>
                      2,847 Devices processed and tracked
                    </Typography>
                    
                    <Typography sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: 'normal',
                      fontFamily: 'inherit',
                      color: 'text.primary',
                      lineHeight: 1.2,
                      textAlign: 'left'
                    }}>
                      Refurbished: 75%
                    </Typography>
                    
                    <Typography sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: 'normal',
                      fontFamily: 'inherit',
                      color: 'text.primary',
                      lineHeight: 1.2,
                      textAlign: 'left'
                    }}>
                      Recycled: 60%
                    </Typography>
                    
                    <Typography sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: 'normal',
                      fontFamily: 'inherit',
                      color: 'text.primary',
                      lineHeight: 1.2,
                      textAlign: 'left'
                    }}>
                      Donated: 25%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>



                    {/* Carousel */}
          <Box
            sx={{
              position: 'absolute',
              top: '140px', // Moved up by 50px (190px - 50px)
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 15, // Higher than ValuePropBox to appear on top
              [theme.breakpoints.down('md')]: {
                top: '90px', // Moved up by 50px (140px - 50px)
              },
              [theme.breakpoints.down('sm')]: {
                top: '70px', // Moved up by 50px (120px - 50px)
              }
            }}
          >
            <CarouselContainer>
              <CarouselTrack currentIndex={currentSlide} shouldAnimate={shouldAnimate}>
                {/* Efficient infinite loop: only 8 slides total */}
                {/* Position 0: slide6 duplicate for backward wrap */}
                <CarouselSlide key="backward-wrap">
                  {slides[5]}
                </CarouselSlide>
                
                {/* Positions 1-6: main slides */}
                {slides.map((slide, index) => (
                  <CarouselSlide key={`main-${index}`}>
                    {slide}
                  </CarouselSlide>
                ))}
                
                {/* Position 7: slide1 duplicate for forward wrap */}
                <CarouselSlide key="forward-wrap">
                  {slides[0]}
                </CarouselSlide>
              </CarouselTrack>
              
              {/* Navigation Buttons */}
              <NavigationButton direction="left" onClick={() => goToPrevSlide(true)}>
                <ArrowBackIosIcon />
              </NavigationButton>
              
              <NavigationButton direction="right" onClick={() => goToNextSlide(true)}>
                <ArrowForwardIosIcon />
              </NavigationButton>
            </CarouselContainer>
          </Box>
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


    </Box>
  );
};

export default NewLandingPage; 