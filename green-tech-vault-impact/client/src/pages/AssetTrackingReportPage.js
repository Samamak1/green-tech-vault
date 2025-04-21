import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Button, 
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShieldIcon from '@mui/icons-material/Shield';
import ParkIcon from '@mui/icons-material/Park';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import EmailIcon from '@mui/icons-material/Email';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LinkIcon from '@mui/icons-material/Link';

// Import our custom RecyclingIcon component
import RecyclingIconCustom from '../components/branding/RecyclingIcon';

const AssetTrackingReportPage = () => {
  const theme = useTheme();
  
  // Report features data
  const reportFeatures = [
    {
      title: "Itemized Inventory",
      icon: <InventoryIcon fontSize="large" />,
      items: [
        "Make & Model",
        "Serial Number",
        "Device Type (e.g., laptop, printer, server, monitor)"
      ]
    },
    {
      title: "Collection Source",
      icon: <LocationOnIcon fontSize="large" />,
      items: [
        "Site location",
        "Department or contact (if applicable)"
      ]
    },
    {
      title: "Data Handling Notes",
      icon: <SecurityIcon fontSize="large" />,
      items: [
        "Whether a device required data destruction",
        "Status of data sanitization or shredding (with optional Certificate of Destruction)"
      ]
    },
    {
      title: "Disposition Outcome",
      icon: <RecyclingIcon fontSize="large" />,
      items: [
        "Recycled, refurbished, or donated",
        "Environmental impact (optional summary of weight diverted and materials recovered)"
      ]
    }
  ];
  
  // Benefits data
  const benefitsList = [
    {
      title: "Maintain accurate inventory records",
      icon: <ReceiptLongIcon />,
      description: "Keep detailed records of all retired equipment for your asset management needs"
    },
    {
      title: "Comply with data protection regulations",
      icon: <ShieldIcon />,
      description: "Meet requirements for HIPAA, GDPR, and other data privacy regulations"
    },
    {
      title: "Contribute to sustainability reporting",
      icon: <ParkIcon />,
      description: "Add recycling metrics to your ESG and sustainability initiatives"
    },
    {
      title: "Share environmental impact data",
      icon: <BarChartIcon />,
      description: "Provide stakeholders with concrete metrics on your recycling efforts"
    }
  ];
  
  // How it works steps
  const howItWorksSteps = [
    {
      title: "Schedule Your Pickup",
      description: "We'll come to you—whether it's a few boxes or a full facility.",
      icon: <AccessTimeIcon fontSize="large" />
    },
    {
      title: "We Scan & Secure",
      description: "Devices are cataloged and barcoded on-site or at our secure facility.",
      icon: <QrCodeScannerIcon fontSize="large" />
    },
    {
      title: "You Receive Your Report",
      description: "Delivered digitally within days, with the option for a call to review details.",
      icon: <EmailIcon fontSize="large" />
    }
  ];
  
  // Chain of Custody components
  const custodyComponents = [
    {
      title: "Pickup Details",
      icon: <InventoryIcon fontSize="large" />,
      items: [
        "Date, time, and pickup location",
        "Authorized personnel signatures"
      ]
    },
    {
      title: "Inventory Log",
      icon: <FactCheckIcon fontSize="large" />,
      items: [
        "Device types, quantities, serial numbers",
        "Condition (working, damaged, end-of-life)"
      ]
    },
    {
      title: "Secure Transport Tracking",
      icon: <ShieldIcon fontSize="large" />,
      items: [
        "Tamper-proof storage & GPS-tracked transit (when applicable)"
      ]
    },
    {
      title: "Processing Milestones",
      icon: <AssignmentIcon fontSize="large" />,
      items: [
        "Arrival at facility",
        "Data sanitization or destruction status",
        "Sorting for recycling, reuse, or resale"
      ]
    },
    {
      title: "Final Disposition",
      icon: <LinkIcon fontSize="large" />,
      items: [
        "Recycled components, donated items, or refurbished devices",
        "Certificate of Destruction (if applicable)",
        "Environmental Impact Summary"
      ]
    }
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.teal.main,
          color: 'white',
          py: 8,
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Asset Tracking Report
              </Typography>
              <Typography variant="h6" paragraph>
                Itemized list with serial numbers and descriptions of every device collected.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button 
                  variant="contained" 
                  component={RouterLink}
                  to="/schedule-pickup"
                  sx={{ 
                    bgcolor: 'white', 
                    color: theme.palette.teal.main,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)'
                    },
                    fontWeight: 'bold'
                  }}
                >
                  SCHEDULE A PICKUP
                </Button>
                <Button 
                  variant="outlined" 
                  component={RouterLink}
                  to="/contact"
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    },
                    fontWeight: 'bold'
                  }}
                >
                  REQUEST A SAMPLE
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ maxWidth: 250 }}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    borderRadius: 4, 
                    p: 2,
                    bgcolor: 'white',
                    width: 200,
                    aspectRatio: '1/1.3',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box sx={{ p: 1, borderBottom: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DevicesIcon sx={{ color: theme.palette.teal.main, mr: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.teal.main }}>
                      ASSET REPORT
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', px: 1 }}>
                      Device List:
                    </Typography>
                    <Stack spacing={1} sx={{ px: 1, flex: 1, my: 1 }}>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Box key={item} sx={{ height: 8, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: 1 }} />
                      ))}
                    </Stack>
                    <Box sx={{ p: 1, borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="caption" sx={{ color: theme.palette.teal.main, fontWeight: 'bold' }}>
                        CERTIFIED ✓
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Transparency Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ color: theme.palette.teal.main, fontWeight: 'bold' }}>
              Transparency You Can Trust
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
              We believe that responsible e-waste recycling starts with full accountability. That's why every time we collect electronics — from a single laptop to entire office upgrades — we provide our partners with a detailed Asset Tracking Report.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              Whether you're a school, small business, or enterprise, you'll always know what you gave, where it went, and the impact it made.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Asset Tracking Report" 
                sx={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block'
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* What's Included Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
            What's Included in Your Report
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 6 }}>
            Our reports are designed to be both thorough and easy to understand:
          </Typography>
          
          <Grid container spacing={4}>
            {reportFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ bgcolor: theme.palette.teal.main, py: 2, px: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          bgcolor: 'white', 
                          color: theme.palette.teal.main, 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {feature.title}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    <List>
                      {feature.items.map((item, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleOutlineIcon sx={{ color: theme.palette.teal.main }} />
                          </ListItemIcon>
                          <ListItemText primary={item} />
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
      
      {/* Chain of Custody Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Chain of Custody" 
                sx={{ 
                  width: '100%', 
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h3" component="h2" id="chain-of-custody" gutterBottom sx={{ color: theme.palette.teal.main, fontWeight: 'bold' }}>
                Chain of Custody
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Your Electronics. Tracked, Secured, Verified.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
                We know how important it is to feel confident in where your electronics go and how they're handled. Our Chain of Custody system gives you that peace of mind — from the moment your items are collected to their final destination.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 4 }}>
                Whether you're a business, school, or nonprofit, we provide a clear, step-by-step breakdown of how your e-waste was processed, ensuring full transparency and accountability.
              </Typography>
            </Grid>
          </Grid>
          
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 8, mb: 4 }}>
            What's Included in Your Chain of Custody Reports
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            {custodyComponents.map((component, index) => (
              <Grid item xs={12} sm={6} md={2.3} lg={2.2} key={index} sx={{ minWidth: 220 }}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Box 
                        sx={{ 
                          bgcolor: theme.palette.teal.main, 
                          color: 'white', 
                          width: 42, 
                          height: 42,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          flexShrink: 0
                        }}
                      >
                        {component.icon}
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', lineHeight: 1.3, width: 'calc(100% - 60px)' }}>
                        {component.title}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List disablePadding>
                      {component.items.map((item, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 0.75 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Box 
                              sx={{ 
                                width: 16, 
                                height: 16, 
                                bgcolor: theme.palette.teal.light,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 'bold'
                              }}
                            >
                              ✓
                            </Box>
                          </ListItemIcon>
                          <ListItemText 
                            primary={item}
                            primaryTypographyProps={{
                              variant: 'body2',
                              sx: { fontWeight: 'medium' } 
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
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/contact"
              sx={{
                bgcolor: theme.palette.teal.main,
                color: 'white',
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: theme.palette.teal.dark
                }
              }}
            >
              REQUEST A SAMPLE REPORT
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Why It Matters Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
          Why It Matters
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 6 }}>
          Our Asset Tracking Reports help you:
        </Typography>
        
        <Grid container spacing={4}>
          {benefitsList.map((benefit, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 3,
                p: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Box 
                    sx={{ 
                      color: 'white', 
                      bgcolor: theme.palette.teal.main,
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2">
                      {benefit.description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* For Schools Section */}
      <Box sx={{ bgcolor: theme.palette.teal.light, py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
                For Schools & Non-Tech Partners
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3, color: '#fff' }}>
                <strong>Not a tech company? No problem!</strong><br />
                Our tracking system makes it easy for schools, nonprofits, and community organizations to keep tabs on their contributions—without needing IT support.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 4, color: '#fff' }}>
                We'll even help you present this info in a way that's fun, informative, and sharable with your team, board, or students!
              </Typography>
              <Button 
                variant="contained" 
                component={RouterLink}
                to="/contact"
                sx={{ 
                  bgcolor: 'white', 
                  color: theme.palette.teal.main,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)'
                  },
                  fontWeight: 'bold'
                }}
              >
                CONTACT FOR SCHOOLS
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              >
                <Box 
                  component="img" 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Schools and Non-Profits" 
                  sx={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
          How It Works
        </Typography>
        
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {howItWorksSteps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                height: '100%'
              }}>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.teal.main,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  {step.icon}
                </Box>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body1">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Real-Time Portal Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="md">
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: 4,
              textAlign: 'center',
              border: `2px solid ${theme.palette.teal.main}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
              <Box 
                sx={{ 
                  bgcolor: theme.palette.teal.main, 
                  color: 'white', 
                  py: 0.5, 
                  px: 2,
                  transform: 'rotate(45deg) translateX(20px) translateY(-10px)',
                  width: 180
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>COMING SOON</Typography>
              </Box>
            </Box>
            
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.teal.main }}>
              Real-Time Portal Access
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              Stay in the loop with 24/7 access to your recycling history and reports through your client dashboard.
              Perfect for ongoing partners and multi-site organizations!
            </Typography>
            <Button 
              variant="contained"
              component={RouterLink}
              to="/register"
              sx={{ 
                bgcolor: theme.palette.teal.main, 
                color: 'white',
                px: 4,
                '&:hover': {
                  bgcolor: theme.palette.teal.dark
                }
              }}
            >
              JOIN THE WAITLIST
            </Button>
          </Paper>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box sx={{ py: 8, bgcolor: theme.palette.teal.main, color: 'white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1.1rem' }}>
            Let's put power behind your recycling program.
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Button 
                variant="contained"
                component={RouterLink}
                to="/schedule-pickup"
                fullWidth
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: theme.palette.teal.main,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)'
                  }
                }}
              >
                SCHEDULE A PICKUP
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                variant="outlined"
                component={RouterLink}
                to="/contact"
                fullWidth
                size="large"
                sx={{ 
                  borderColor: 'white',
                  color: 'white',
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white'
                  }
                }}
              >
                REQUEST A SAMPLE REPORT
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AssetTrackingReportPage; 