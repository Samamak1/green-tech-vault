import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Card, 
  CardContent,
  useTheme,
  IconButton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShareIcon from '@mui/icons-material/Share';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';

const GetInvolvedPage = () => {
  const theme = useTheme();

  const socialMediaLinks = [
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      url: 'https://www.instagram.com/rygneco/',
      color: '#E4405F'
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      url: 'https://www.facebook.com/people/RYGNeco/61575273422314/?mibextid=LQQJ4d&rdid=jOGvLhXNFJslFT3H&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19DdG1NYvL%2F%3Fmibextid%3DLQQJ4d',
      color: '#1877F2'
    },
    {
      name: 'X (Twitter)',
      icon: <XIcon />,
      url: 'https://x.com/RYGNeco',
      color: '#000000'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      url: 'https://linkedin.com',
      color: '#0A66C2'
    },
    {
      name: 'YouTube',
      icon: <YouTubeIcon />,
      url: 'https://youtube.com',
      color: '#FF0000'
    }
  ];

  const partnerships = [
    {
      title: "Local Schools & Universities",
      description: "Partnering with educational institutions to provide technology access and e-waste education programs."
    },
    {
      title: "Environmental Organizations",
      description: "Collaborating with green initiatives and sustainability-focused nonprofits to maximize our environmental impact."
    },
    {
      title: "Tech Companies",
      description: "Working with technology companies to develop responsible disposal programs and corporate sustainability initiatives."
    },
    {
      title: "Community Centers",
      description: "Supporting local communities through device donations and digital literacy programs."
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
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Get Involved with RYGNeco
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            Join our mission to make e-waste recycling accessible, secure, and sustainable for everyone. 
            Together, we can create a cleaner, more connected future.
          </Typography>
        </Container>
      </Box>

      {/* Google Reviews Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ReviewsIcon sx={{ fontSize: 40, color: theme.palette.teal.main, mr: 2 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  Share Your Experience
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                Your feedback helps us improve and shows others the impact of responsible e-waste recycling. 
                Share your experience with RYGNeco and help build trust in our community.
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} sx={{ color: '#FFD700', fontSize: 30 }} />
                ))}
                <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
                  Rate your experience
                </Typography>
              </Box>
              
              <Button 
                variant="contained"
                size="large"
                href="https://www.google.com/search?q=RYGNeco+reviews"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  bgcolor: theme.palette.teal.main,
                  '&:hover': {
                    bgcolor: theme.palette.teal.dark
                  },
                  mb: 2,
                  width: '100%'
                }}
              >
                Leave a Google Review
              </Button>
              
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                Help others discover responsible e-waste recycling
              </Typography>
            </Paper>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ShareIcon sx={{ fontSize: 40, color: theme.palette.teal.main, mr: 2 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  Follow & Share
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                Stay connected with RYGNeco across all platforms. Follow us for updates, share our mission, 
                and help spread awareness about responsible e-waste management.
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {socialMediaLinks.map((platform) => (
                  <Grid item xs={6} key={platform.name}>
                    <Button
                      variant="outlined"
                      fullWidth
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={platform.icon}
                      sx={{
                        py: 1.5,
                        borderColor: platform.color,
                        color: platform.color,
                        '&:hover': {
                          backgroundColor: `${platform.color}15`,
                          borderColor: platform.color
                        }
                      }}
                    >
                      {platform.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                Follow us for the latest updates and sustainability tips
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Who We're Connecting With Section */}
      <Box sx={{ bgcolor: 'rgba(78, 205, 196, 0.05)', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 5 }}>
            <HandshakeIcon sx={{ fontSize: 40, color: theme.palette.teal.main, mr: 2 }} />
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Our Growing Network
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph sx={{ textAlign: 'center', mb: 6, maxWidth: 800, mx: 'auto' }}>
            RYGNeco is building meaningful partnerships across Cincinnati and beyond. Here's who we're connecting with 
            to maximize our environmental impact and community reach.
          </Typography>
          
          <Grid container spacing={4}>
            {partnerships.map((partnership, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <GroupsIcon sx={{ fontSize: 50, color: theme.palette.teal.main, mb: 2 }} />
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {partnership.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {partnership.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* What We've Been Doing Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 5 }}>
          What We've Been Up To
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.teal.main }}>
                Community Outreach
              </Typography>
              <Typography variant="body1" paragraph>
                We've been actively engaging with local communities through educational workshops, 
                e-waste collection events, and sustainability presentations at schools and community centers.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                • 15+ community events hosted
                • 500+ devices collected through drives
                • 20+ educational workshops conducted
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.teal.main }}>
                Business Partnerships
              </Typography>
              <Typography variant="body1" paragraph>
                Building strong relationships with local businesses to create comprehensive e-waste 
                management solutions and corporate sustainability programs.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                • 50+ business partners
                • Corporate recycling programs
                • Sustainability consulting services
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.teal.main }}>
                Environmental Impact
              </Typography>
              <Typography variant="body1" paragraph>
                Making measurable differences in waste reduction, material recovery, and environmental protection 
                through responsible e-waste processing and community education.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                • 10,000+ lbs of e-waste diverted
                • 95% material recovery rate
                • Zero landfill disposal
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: theme.palette.teal.main, color: 'white', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Join our mission and become part of the solution. Every action counts towards a cleaner, more sustainable future.
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
                  px: 4
                }}
              >
                Schedule Pickup
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
                  px: 4
                }}
              >
                Contact Us
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default GetInvolvedPage; 