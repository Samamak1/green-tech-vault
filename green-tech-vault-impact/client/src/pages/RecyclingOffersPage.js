import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Button,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Import icons for different offers
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // For tax breaks
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // For turning e-waste into cash
import GroupIcon from '@mui/icons-material/Group'; // For referrals
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // For challenges/winning

// Import components
import RecyclingIcon from '../components/branding/RecyclingIcon';

const RecyclingOffersPage = () => {
  const theme = useTheme();

  // Array of recycling offers
  const recyclingOffers = [
    {
      title: "Unlock Tax Breaks",
      description: "By partnering with us, you could score valuable tax incentives, cutting down your tax bill and putting more money back in your pocket!",
      icon: <AccountBalanceIcon sx={{ fontSize: 80, color: theme.palette.teal.main }} />
    },
    {
      title: "Turn E-Waste into Cash",
      description: "Why throw away recyclables when you can earn a cut from their sale? Partnering with a recycling company could turn your waste into extra revenue.",
      icon: <AttachMoneyIcon sx={{ fontSize: 80, color: theme.palette.teal.main }} />
    },
    {
      title: "Earn Rewards for Referrals",
      description: "Spread the word! By referring other businesses, you could unlock cash rewards, discounts, and exclusive deals—just for sharing the love.",
      icon: <GroupIcon sx={{ fontSize: 80, color: theme.palette.teal.main }} />
    },
    {
      title: "Win Challenges",
      description: "Join our company's exciting challenges today for a chance to showcase your skills and win amazing prizes. The adventure starts now!",
      icon: <EmojiEventsIcon sx={{ fontSize: 80, color: theme.palette.teal.main }} />
    }
  ];

  return (
    <Box>
      {/* Hero Section with Call to Action */}
      <Box 
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          position: 'relative',
          pt: 8,
          pb: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Join Us Today!
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
                Ready to make a real impact? Sign up right now to start recycling your e-waste and turn your commitment to a greener future into action!
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  size="large"
                  sx={{ 
                    fontWeight: 'bold',
                    px: 4,
                    py: 1
                  }}
                >
                  REGISTER
                </Button>
                <Button 
                  variant="outlined"
                  sx={{ 
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    },
                    fontWeight: 'bold',
                    px: 4,
                    py: 1
                  }}
                >
                  CLIENT LOGIN
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Movement Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Join The Movement<br />
              Towards Cleaner Tech
            </Typography>
            <Typography variant="body1" paragraph>
              Be part of the solution and help reduce electronic waste one device at a time. Our mission is to create a sustainable future for all.
            </Typography>
            
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
              Why E-Waste? Why Us?
            </Typography>
            <Typography variant="body1" paragraph>
              The sad reality that millions of tons of e-waste ends up in landfills each year. Not only does this create environmental hazards, but it's a waste of valuable resources. At EcoCycle Solutions, we believe that sustainability begins with proper e-waste management. Our team has the expertise to help recycle your old electronics that are otherwise destined for the landfill, and work with you to create a recycling program that can make a substantial positive impact. Don't let the chance for positive change slip away—work with us today!
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 300 }}>
              <RecyclingIcon size={300} color="black" />
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Recycling Made Accessible Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Recycling made Accessible
          </Typography>
          <Typography variant="body1" paragraph>
            Whether you're clearing out your drawers at home or handling large-scale e-waste for your business, we make it easier to get your e-waste recycled. With free drop-offs, scheduled pickups, and certified data destruction, we make responsible e-waste disposal simple and secure. Contact us today to learn how our services can be tailored to your specific needs, or check out our recycling events and programs.
          </Typography>
        </Container>
      </Box>
      
      {/* Recycling Offers Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
            Recycling Offers
          </Typography>
          
          <Grid container spacing={4}>
            {recyclingOffers.map((offer, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    p: 3
                  }}>
                    <Box sx={{ mb: 2 }}>
                      {offer.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {offer.title}
                    </Typography>
                    <Typography variant="body2">
                      {offer.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: theme.palette.teal.main, 
          color: 'white', 
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h2" gutterBottom>
                Learn More
              </Typography>
              <Typography variant="body1">
                See what the big, tech companies, and how you can cheaply create a difference. Contact us today.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#064e40',
                  '&:hover': {
                    bgcolor: '#053a30'
                  },
                  px: 3,
                  py: 1
                }}
              >
                How It Works
              </Button>
              <Button 
                variant="outlined"
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  },
                  px: 3,
                  py: 1
                }}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Ways to Contribute Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 5, fontWeight: 'bold' }}>
          Ways to Make a Difference
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                p: 3
              }}>
                <Box sx={{ mb: 2 }}>
                  <Box
                    component="svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill={theme.palette.teal.main}
                  >
                    <path d="M16 7c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm-4 5c-2.76 0-5 2.24-5 5v1h10v-1c0-2.76-2.24-5-5-5zm-12-4h4.5c.28 0 .5.22.5.5s-.22.5-.5.5h-4.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5zm0 4h4.5c.28 0 .5.22.5.5s-.22.5-.5.5h-4.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5zm0 4h4.5c.28 0 .5.22.5.5s-.22.5-.5.5h-4.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5zm0 4h4.5c.28 0 .5.22.5.5s-.22.5-.5.5h-4.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5zm16.5-1.5v-1h-13v1c0 .55.45 1 1 1h11c.55 0 1-.45 1-1z" />
                  </Box>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Partner With Us
                </Typography>
                <Typography variant="body2">
                  Are you a business, school, or organization looking to make a meaningful impact with e-waste recycling? Join our network of partners, and make a difference.
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Become a Partner
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                p: 3
              }}>
                <Box sx={{ mb: 2 }}>
                  <Box
                    component="svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill={theme.palette.teal.main}
                  >
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                  </Box>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Donate Your Devices
                </Typography>
                <Typography variant="body2">
                  Working or obsolete tech equipment? Instead of letting it collect dust or sending it to a landfill, donate your devices to make a difference.
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Donate a Device
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                p: 3
              }}>
                <Box sx={{ mb: 2 }}>
                  <Box
                    component="svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill={theme.palette.teal.main}
                  >
                    <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zm4.4-12.01L12 1 3.6 5.6l8.4 4.6 8.4-4.6zm-17.4 6.4c-.4-.53-.8-1.07-1.2-1.6.99-.74 2.24-1.68 3.2-2.4.4.54.8 1.08 1.2 1.61-.96.71-2.21 1.65-3.2 2.39zM4.4 4.599L3.2 6.199l8.8 4.8 1.2-1.6-8.8-4.8zM2 11v2h4v-2H2zm15.6-6.601l-8.8 4.8 1.2 1.6 8.8-4.8-1.2-1.6z" />
                  </Box>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Spread The Word
                </Typography>
                <Typography variant="body2">
                  Help us raise awareness about proper e-waste management! Join our community outreach efforts and share stories about the difference.
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  component={RouterLink}
                  to="/get-involved"
                  sx={{ mt: 2 }}
                >
                  Get Involved
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RecyclingOffersPage; 