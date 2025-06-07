import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  InputAdornment
} from '@mui/material';
import { keyframes } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import RecyclingMUIIcon from '@mui/icons-material/Recycling';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import GppGoodIcon from '@mui/icons-material/GppGood';
import DeleteIcon from '@mui/icons-material/Delete';
import DevicesIcon from '@mui/icons-material/Devices';
import InventoryIcon from '@mui/icons-material/Inventory';
import ScaleIcon from '@mui/icons-material/Scale';
import ParkIcon from '@mui/icons-material/Park';
import LinkIcon from '@mui/icons-material/Link';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PrinterIcon from '@mui/icons-material/Print';
import TvIcon from '@mui/icons-material/Tv';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import CableIcon from '@mui/icons-material/Cable';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Import our custom RecyclingIcon
import RecyclingIcon from '../components/branding/RecyclingIcon';
// Import our scroll to hash hook
import useScrollToHash from '../hooks/useScrollToHash';
// Import the EwasteItemSearch component
import EwasteItemSearch from '../components/search/EwasteItemSearch';

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
  borderRadius: '0 0 20px 20px',
  padding: theme.spacing(6),
  maxWidth: '600px',
  margin: '0',
  marginLeft: '10%',
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
  backgroundImage: 'url(/images/how-it-works-hero.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1
  }
});

// Styled components
const ProcessIcon = styled(Box)(({ theme, bgcolor }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: bgcolor || theme.palette.teal.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
}));

const ProcessCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 8,
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
}));

// Table styled component for the waste sorting
const StyledTableCell = styled(TableCell)(({ theme, type }) => ({
  padding: theme.spacing(2),
  ...(type === 'header' && {
    backgroundColor: theme.palette.teal.main,
    color: 'white',
    fontWeight: 'bold',
  }),
  ...(type === 'category' && {
    backgroundColor: theme.palette.teal.light,
    color: 'white',
    fontWeight: 'bold',
  }),
}));

const HowItWorksPage = () => {
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);
  
  // Use the scroll to hash hook to enable scrolling to sections
  useScrollToHash();
  
  // Trigger animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500); // Start animation after 500ms

    return () => clearTimeout(timer);
  }, []);
  
  // Process steps data with updated colors
  const processSteps = [
    {
      icon: <AccessTimeIcon fontSize="large" />,
      iconColor: '#073C3F',
      title: "Schedule",
      description: "Schedule a pickup for your e-waste through our easy online form, or drop by one of our online hubs."
    },
    {
      icon: <LocalShippingIcon fontSize="large" />,
      iconColor: '#2A7074',
      title: "Collect",
      description: "Our team collects your devices from your location to the scheduled time."
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      iconColor: '#62CBD0',
      title: "Secure",
      description: "All data is securely wiped from all devices following industry standards."
    },
    {
      icon: <RecyclingMUIIcon fontSize="large" />,
      iconColor: '#185B5F',
      title: "Process",
      description: "Devices are examined, refurbished, or responsibly recycled."
    },
    {
      icon: <ParkIcon fontSize="large" />,
      iconColor: '#94F1F1',
      title: "Environmental Impact Report",
      description: "See your positive impact in resources saved and waste diverted from landfills.",
      link: "/environmental-impact-report"
    }
  ];
  
  // Accepted Items categories
  const acceptedItems = [
    {
      category: "Computers",
      icon: <ComputerIcon />,
      items: ["Desktop Computer", "Laptop", "Servers", "Tablets", "Monitors"]
    },
    {
      category: "Mobile Devices",
      icon: <PhoneAndroidIcon />,
      items: ["Smartphones", "Cell Phones", "iPads", "Smart Watches", "Tablets"]
    },
    {
      category: "Office Equipment",
      icon: <PrinterIcon />,
      items: ["Printers", "Scanners", "Fax machines", "Copiers", "Shredders"]
    },
    {
      category: "Entertainment",
      icon: <TvIcon />,
      items: ["Televisions", "DVD/Blu-ray Players", "Gaming Consoles", "Audio Equipment", "Streaming Devices"]
    },
    {
      category: "Networking",
      icon: <NetworkWifiIcon />,
      items: ["Routers", "Modems", "Switches", "Hubs", "Network Cards"]
    },
    {
      category: "Peripherals",
      icon: <KeyboardIcon />,
      items: ["Keyboards", "Mice", "Webcams", "External Drives", "USB Devices"]
    },
    {
      category: "Power Equipment",
      icon: <BatteryFullIcon />,
      items: ["Batteries", "Power Supplies", "UPS Systems", "Chargers", "Adapters"]
    },
    {
      category: "Cables & Misc",
      icon: <CableIcon />,
      items: ["Cables", "Circuit Boards", "Memory Cards", "Hard Drives"]
    }
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: 0 }}>
          <AnimatedContentBox animate={animate}>
            <Typography variant="subtitle1" component="div" gutterBottom color="text.primary">
              How It Works
            </Typography>
            <Typography variant="h2" component="h1" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>
              Recycle Responsibly
            </Typography>
            <Typography variant="body1" paragraph color="text.primary" sx={{ mb: 4 }}>
              Dispose of your electronics safely while protecting your data and the environment! 
              Learn about our comprehensive process from collection to responsible recycling.
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
      
      {/* Our Process Section */}
      <Container id="our-process" maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
          Our Process
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 8 }}>
          From collection to refurbishment, reuse to responsible recycling, our process<br />
          is designed with care. Whether you're an individual or an organization, we<br />
          make it simple—so you can be part of the solution, every step of the way.
        </Typography>
        
        <Grid container spacing={5}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <ProcessCard elevation={2}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 3 }}>
                  <ProcessIcon bgcolor={step.iconColor}>
                    {step.icon}
                  </ProcessIcon>
                  <Typography variant="h6" component="h3" sx={{ my: 2, fontWeight: 'bold' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2">
                    {step.description}
                  </Typography>
                </CardContent>
              </ProcessCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* What Items Do We Accept Section */}
      <Box id="accepted-items" sx={{ 
        bgcolor: '#62CBD0',
        py: 10,
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: '2.5rem',
              mb: 3, 
              color: '#000'
            }}
          >
            What Items do we Accept?
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              textAlign: 'center', 
              mb: 5, 
              fontSize: '1.25rem',
              maxWidth: 800, 
              mx: 'auto',
              lineHeight: 1.4
            }}
          >
            Aren't sure if you can turn in a specific item?<br />
            Use our search tool below to look up specific items!
          </Typography>
          
          {/* Search bar */}
          <Box sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
            <EwasteItemSearch />
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              For further questions, please reach us at info@rygneco.com or call (Phone Number)
            </Typography>
          </Box>
          
          {/* Items Categories */}
          <Grid container spacing={5}>
            {acceptedItems.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                  bgcolor: 'white',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          color: theme.palette.teal.main, 
                          mr: 1.5,
                          display: 'flex'
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {category.category}
                      </Typography>
                    </Box>
                    
                    <List dense disablePadding>
                      {category.items.map((item, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <Box 
                              sx={{ 
                                width: 6, 
                                height: 6, 
                                borderRadius: '50%', 
                                bgcolor: 'text.primary',
                                mt: 0.7
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              sx: { 
                                fontWeight: 'medium'
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box sx={{ bgcolor: theme.palette.teal.main, color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Ready to start recycling?
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}>
            Join us in our mission to make e-waste recycling<br />
            accessible, secure, and sustainable for everyone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ 
                bgcolor: 'white',
                color: theme.palette.teal.main,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                }
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HowItWorksPage; 