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
  backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80)', // Circuit board background
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
  
  // Process steps data
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
      title: "Environmental Impact Report",
      description: "See your positive impact in resources saved and waste diverted from landfills.",
      icon: <ParkIcon />,
      iconColor: '#94F1F1',
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
  
  // Waste sorting data
  const wasteCategories = [
    {
      category: "Definition",
      stockA: "Electronic items that are outdated, damaged, unwanted, or at the end of their useful lives.",
      stockB: "Technology that was considered outdated but could still be useful with some repairs, upgrades, or refurbishing.",
      stockC: "Electronics that are beyond usable function, missing key components, or too damaged to be safely refurbished."
    },
    {
      category: "Examples",
      stockA: "Older-model working laptops and smartphones, gaming consoles, functional office equipment.",
      stockB: "Computers with outdated specs but still operable, phones with cracked screens.",
      stockC: "Non-functional electronics, devices missing essential components, items with severe water or physical damage."
    },
    {
      category: "Treatment",
      stockA: "Testing, refurbishment, resale, data wiping, component harvesting if needed.",
      stockB: "Parts harvesting, data wiping, repairs, refurbishment, recycling of unusable parts.",
      stockC: "Dismantle for valuable materials, safe disposal of hazardous components, certified responsible recycling processes."
    },
    {
      category: "Where do they go?",
      stockA: [
        {
          title: "Registered Resellers",
          description: "Devices are resold after being refurbished, with proceeds supporting our mission."
        },
        {
          title: "Charity",
          description: "Functional devices are donated to schools, non-profits, communities needing affordable technology access."
        }
      ],
      stockB: [
        {
          title: "Workshops",
          description: "Used for training, research projects, and educational initiatives to build repair skills."
        },
        {
          title: "Components Harvesting",
          description: "Valuable parts are salvaged to repair other devices or sold to specialized repair shops."
        }
      ],
      stockC: [
        {
          title: "Responsible Parts Markets",
          description: "Valuable materials like gold, silver, copper, and rare earth minerals are recovered."
        },
        {
          title: "Recycling Industry",
          description: "Materials undergo specialized processing to properly handle hazardous components."
        },
        {
          title: "Raw Materials Stream",
          description: "Recovered minerals (e.g., gold, copper, rare earth) are sent back into manufacturing cycle."
        }
      ]
    }
  ];
  
  // Report types
  const reportTypes = [
    {
      title: "Certificate of Recycling",
      description: "Proof that your materials were responsibly processed in accordance with regulations.",
      icon: <ArticleIcon />,
      iconColor: '#FB8C00'
    },
    {
      title: "Data Destruction Certificate",
      description: "Confirms secure erasure or shredding of data-containing media.",
      icon: <GppGoodIcon />,
      iconColor: '#62CBD0'
    },
    {
      title: "Asset Tracking Report",
      description: "Itemized list with serial numbers and descriptions of every device collected.",
      icon: <DevicesIcon />,
      iconColor: '#FDD835',
      link: "/asset-tracking-report"
    },
    {
      title: "Weight Summary",
      description: "Breakdown of total materials collected, categorized by type.",
      icon: <ScaleIcon />,
      iconColor: '#2A7074',
      link: "/environmental-impact-report#weight-summary"
    },
    {
      title: "Environmental Impact Report",
      description: "See your positive impact in resources saved and waste diverted from landfills.",
      icon: <ParkIcon />,
      iconColor: '#073C3F',
      link: "/environmental-impact-report"
    },
    {
      title: "Chain of Custody",
      description: "A full record of how your e-waste was handled throughout processing.",
      icon: <LinkIcon />,
      iconColor: '#94F1F1',
      link: "/asset-tracking-report#chain-of-custody"
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
        backgroundImage: 'url(/images/maybe.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        bgcolor: theme.palette.teal.light, // Fallback color for accessibility
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
          
          {/* Replace the old search tool with the new EwasteItemSearch component */}
          <EwasteItemSearch acceptedItems={acceptedItems} />
          
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              mb: 8, 
              color: 'text.secondary',
              fontSize: '0.9rem'
            }}
          >
            For further questions, please reach us at info@rygneco.com or call (Phone Number)
          </Typography>
          
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
      
      {/* How Do We Sort Your E-Waste Section */}
      <Container id="sorting-ewaste" maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
          How Do We Sort Your E-Waste?
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 8 }}>
          At EcoCycle Solutions, we sort your e-waste into three categories described in the table below
        </Typography>
        
        <TableContainer component={Paper} sx={{ mb: 6, overflow: 'hidden', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell type="header"></StyledTableCell>
                <StyledTableCell type="header" align="center">Stock A</StyledTableCell>
                <StyledTableCell type="header" align="center">Stock B</StyledTableCell>
                <StyledTableCell type="header" align="center">Stock C</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wasteCategories.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <StyledTableCell type="category">{row.category}</StyledTableCell>
                    {/* For Definition, Examples, and Treatment rows */}
                    {row.category !== "Where do they go?" && (
                      <>
                        <TableCell>{row.stockA}</TableCell>
                        <TableCell>{row.stockB}</TableCell>
                        <TableCell>{row.stockC}</TableCell>
                      </>
                    )}
                    {/* For "Where do they go?" row, which has nested items */}
                    {row.category === "Where do they go?" && (
                      <>
                        <TableCell>
                          {row.stockA.map((item, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {item.title}
                              </Typography>
                              <Typography variant="body2">
                                {item.description}
                              </Typography>
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell>
                          {row.stockB.map((item, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {item.title}
                              </Typography>
                              <Typography variant="body2">
                                {item.description}
                              </Typography>
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell>
                          {row.stockC.map((item, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {item.title}
                              </Typography>
                              <Typography variant="body2">
                                {item.description}
                              </Typography>
                            </Box>
                          ))}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      
      {/* Recycling Reports Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
            Recycling Reports You Can Rely On
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 8 }}>
            We provide detailed documentation with every pickup and processing<br />
            job. Our reporting is complete, transparent, and eco-conscious.
          </Typography>
          
          <Grid container spacing={5} justifyContent="center">
            {reportTypes.map((report, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <ProcessIcon bgcolor={report.iconColor} sx={{ width: 50, height: 50, mr: 2 }}>
                        {report.icon}
                      </ProcessIcon>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                        {report.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {report.description}
                    </Typography>
                    {report.link && (
                      <Box sx={{ mt: 2 }}>
                        <Button
                          component={RouterLink}
                          to={report.link}
                          variant="text"
                          color="primary"
                          endIcon={<ArrowForwardIcon />}
                          sx={{ 
                            fontSize: '0.875rem',
                            color: theme.palette.teal.main,
                            '&:hover': {
                              backgroundColor: 'transparent',
                              color: theme.palette.teal.dark
                            }
                          }}
                        >
                          Learn More
                        </Button>
                      </Box>
                    )}
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
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: 'white', 
                color: theme.palette.teal.main,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'scale(1.05)'
                },
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                transition: 'all 0.3s ease',
                borderRadius: 2
              }}
            >
              SCHEDULE A PICKUP
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HowItWorksPage; 