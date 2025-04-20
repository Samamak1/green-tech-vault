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
  Divider,
  Paper
} from '@mui/material';
import ParkIcon from '@mui/icons-material/Park';
import BarChartIcon from '@mui/icons-material/BarChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RecyclingMUIIcon from '@mui/icons-material/Recycling';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InsightsIcon from '@mui/icons-material/Insights';
import SchoolIcon from '@mui/icons-material/School';
import ShareIcon from '@mui/icons-material/Share';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link as RouterLink } from 'react-router-dom';

// Import our custom RecyclingIcon
import RecyclingIcon from '../components/branding/RecyclingIcon';

const EnvironmentalImpactReportPage = () => {
  const theme = useTheme();
  
  // Impact metrics data
  const impactMetrics = [
    {
      title: "Materials Recovered",
      icon: <RecyclingMUIIcon fontSize="large" />,
      items: [
        "Copper: Enough to wire a small home",
        "Gold: Reclaimed and reused in new tech",
        "Lithium: Ready for new batteries in clean energy systems"
      ]
    },
    {
      title: "Waste Diverted from Landfills",
      icon: <ParkIcon fontSize="large" />,
      items: [
        "Measured in pounds of toxic e-waste kept out of our soil and water",
        "Visualized in easy-to-read charts in your monthly or yearly report"
      ]
    },
    {
      title: "Carbon Footprint Reduced",
      icon: <AnalyticsIcon fontSize="large" />,
      items: [
        "Energy saved from avoiding raw material extraction",
        "Emissions avoided from keeping devices out of incinerators"
      ]
    }
  ];
  
  // Report features data
  const reportFeatures = [
    {
      title: "Digital Resource Summary",
      icon: <FactCheckIcon fontSize="large" />,
      description: "Complete breakdown of materials recovered and environmental impact"
    },
    {
      title: "Visual Data Representation",
      icon: <InsightsIcon fontSize="large" />,
      description: "Easy-to-understand charts and diagrams showing your contribution"
    },
    {
      title: "Real-world Equivalents",
      icon: <EmojiObjectsIcon fontSize="large" />,
      description: "Impact translated into everyday terms like energy saved to power homes"
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
                Environmental Impact Report
              </Typography>
              <Typography variant="h6" paragraph>
                See your positive impact in resources saved and waste diverted from landfills.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button 
                  variant="contained" 
                  component={RouterLink}
                  to="/login"
                  sx={{ 
                    bgcolor: 'white', 
                    color: theme.palette.teal.main,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)'
                    },
                    fontWeight: 'bold'
                  }}
                >
                  VIEW YOUR REPORT
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
                  REQUEST A DEMO
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', maxWidth: 250 }}>
                <RecyclingIcon size={250} color="white" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Why It Matters Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ color: theme.palette.teal.main, fontWeight: 'bold' }}>
              Why It Matters
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
              Every electronic device you recycle helps protect our planet. From precious metals like gold and copper to plastics and glass, your e-waste holds the power to create something new—without digging into Earth's limited resources.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              When you recycle with us, you're not just cleaning out drawers—you're making real change. Our detailed environmental impact reports show you exactly how your contributions are helping the planet.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Environmental Impact" 
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
      
      {/* Your Impact, Measured Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
            Your Impact, Measured
          </Typography>
          
          <Grid container spacing={4}>
            {impactMetrics.map((metric, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ bgcolor: theme.palette.teal.main, py: 3, px: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box 
                        sx={{ 
                          bgcolor: 'white', 
                          color: theme.palette.teal.main, 
                          width: 60, 
                          height: 60, 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {metric.icon}
                      </Box>
                      <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {metric.title}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <List disablePadding>
                      {metric.items.map((item, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Box 
                              sx={{ 
                                width: 20, 
                                height: 20, 
                                borderRadius: '50%', 
                                bgcolor: theme.palette.teal.light,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                              }}
                            >
                              ♻️
                            </Box>
                          </ListItemIcon>
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{ 
                              variant: 'body1',
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
        </Container>
      </Box>
      
      {/* Custom Reports Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
          Custom Reports for Every Partner
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 6, fontSize: '1.1rem' }}>
          Whether you're a household, a school, or a business, we generate personalized environmental reports that break down your contribution to a cleaner planet.
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {reportFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      color: theme.palette.teal.main, 
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Zebo the Robot Section */}
      <Box sx={{ bgcolor: theme.palette.teal.light, py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box 
                  sx={{ 
                    bgcolor: '#fff', 
                    width: 280, 
                    height: 280, 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                >
                  <Box sx={{ fontSize: '8rem', textAlign: 'center' }}>⚙️</Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Community-Fueled Change
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
                Our mascot, ⚙️ Zebo the Robot, helps schools and local organizations learn just how powerful e-waste recycling can be. When you recycle with us, you're part of a movement—and we want you to see the difference you're making.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 4 }}>
                Want to feature your report at a school assembly, team meeting, or on social media? We'll help you share it in a way that inspires others to join the mission!
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  component={RouterLink}
                  to="/contact"
                  sx={{ 
                    bgcolor: theme.palette.teal.main, 
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: theme.palette.teal.dark
                    }
                  }}
                >
                  CONTACT FOR SCHOOLS
                </Button>
                <Button 
                  variant="outlined"
                  component={RouterLink}
                  to="/education"
                  sx={{ 
                    borderColor: theme.palette.teal.main,
                    color: theme.palette.teal.main,
                    fontWeight: 'bold',
                    '&:hover': {
                      borderColor: theme.palette.teal.dark,
                      bgcolor: 'rgba(0,128,128,0.05)'
                    }
                  }}
                >
                  EDUCATION RESOURCES
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Get Your Report CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Get Your Report Today
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Card sx={{ 
                height: '100%',
                p: 4,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                bgcolor: theme.palette.teal.light,
                color: 'white'
              }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Already a recycler?
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                  Log in to view your latest impact report and see the difference you're making.
                </Typography>
                <Button 
                  variant="contained"
                  component={RouterLink}
                  to="/login"
                  fullWidth
                  sx={{ 
                    bgcolor: 'white', 
                    color: theme.palette.teal.main,
                    fontWeight: 'bold',
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)'
                    }
                  }}
                >
                  LOG IN NOW
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ 
                height: '100%',
                p: 4,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: `2px solid ${theme.palette.teal.main}`
              }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.teal.main }}>
                  New here?
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                  Join the program and start making a measurable difference today.
                </Typography>
                <Button 
                  variant="contained"
                  component={RouterLink}
                  to="/register"
                  fullWidth
                  sx={{ 
                    bgcolor: theme.palette.teal.main, 
                    color: 'white',
                    fontWeight: 'bold',
                    py: 1.5,
                    '&:hover': {
                      bgcolor: theme.palette.teal.dark
                    }
                  }}
                >
                  JOIN NOW
                </Button>
              </Card>
            </Grid>
          </Grid>
          
          <Typography variant="body1" sx={{ mt: 6, mb: 2 }}>
            Questions? We're here to help.
          </Typography>
          <Button 
            variant="outlined"
            component={RouterLink}
            to="/contact"
            sx={{ 
              borderColor: theme.palette.teal.main,
              color: theme.palette.teal.main,
              '&:hover': {
                borderColor: theme.palette.teal.dark,
                bgcolor: 'rgba(0,128,128,0.05)'
              }
            }}
          >
            CONTACT FOR A CUSTOM REPORT
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default EnvironmentalImpactReportPage; 