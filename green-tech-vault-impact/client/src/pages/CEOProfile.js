import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  useTheme
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { School, Work, EmojiObjects, Psychology, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import RecyclingIcon from '../components/branding/RecyclingIcon';

const CEOProfile = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.teal.main,
          color: 'white',
          py: 5,
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
            CEO Profile
          </Typography>
          
          <Button
            component={Link}
            to="/about-us"
            startIcon={<ArrowBack />}
            sx={{ 
              color: 'white',
              border: '1px solid white',
              borderRadius: 1,
              px: 2,
              py: 0.75,
              mb: 4,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Back to About Us
          </Button>
          
          {/* Recycle icons row */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 2, md: 4 },
              mb: 4
            }}
          >
            <RecyclingIcon size={80} color="black" />
            <RecyclingIcon size={110} color="black" />
            <RecyclingIcon size={80} color="black" />
          </Box>
        </Container>
      </Box>
      
      {/* Profile Intro Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              sx={{
                width: 240,
                height: 240,
                bgcolor: '#ccc',
                fontSize: '4rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              LM
            </Avatar>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Leila Meyer
            </Typography>
            <Typography variant="h5" sx={{ color: theme.palette.teal.main, mb: 3 }}>
              Founder & CEO
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 4, lineHeight: 1.6 }}>
              Passionate entrepreneur dedicated to solving e-waste challenges through innovative and community-focused solutions. Founded RGYNeco to transform how we handle electronic waste and create a more sustainable future.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      
      {/* Education Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <School sx={{ fontSize: 40, color: theme.palette.teal.main, mr: 2 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  Education
                </Typography>
              </Box>
              <Box sx={{ pl: { md: 7 } }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Bachelor of Science in Architecture
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2, color: '#555' }}>
                  University of Cincinnati
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Focused on sustainable design practices and environmental impact of construction materials. Specialized in eco-friendly building solutions and sustainable urban planning.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&q=80"
                alt="Education"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Work Experience Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Work sx={{ fontSize: 40, color: theme.palette.teal.main, mr: 2 }} />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            Work Experience
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 3, 
              height: '100%', 
              border: '1px solid #eee',
              borderLeft: `4px solid ${theme.palette.teal.main}`,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                transform: 'translateY(-5px)'
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Interior Design Catalog Specialist
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#555', mb: 2 }}>
                Amazon
              </Typography>
              <Typography variant="body1">
                Managed sustainable product selections and eco-friendly design options. Collaborated with vendors to introduce more environmentally responsible products.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 3, 
              height: '100%', 
              border: '1px solid #eee',
              borderLeft: `4px solid ${theme.palette.teal.main}`,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                transform: 'translateY(-5px)'
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Architecture Intern
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#555', mb: 2 }}>
                Solstice Planning and Architecture
              </Typography>
              <Typography variant="body1">
                Contributed to green building projects and sustainable urban planning initiatives. Researched materials and techniques for minimal environmental impact.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 3, 
              height: '100%', 
              border: '1px solid #eee',
              borderLeft: `4px solid ${theme.palette.teal.main}`,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                transform: 'translateY(-5px)'
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Architecture Intern
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#555', mb: 2 }}>
                BBCO Design
              </Typography>
              <Typography variant="body1">
                Focused on environmentally conscious design solutions for residential projects. Learned techniques for reducing waste in building processes and using sustainable materials.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Motivation Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80"
                alt="E-waste recycling"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmojiObjects sx={{ fontSize: 40, color: theme.palette.teal.main, mr: 2 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  Motivation for Starting RGYNeco
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                When I first learned about the growing e-waste crisis, I was shocked by the scale of the problem and the lack of accessible solutions. I realized that most people want to do the right thing with their old electronics, but the process is often confusing, inconvenient, or completely inaccessible.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                RGYNeco was born from my desire to take action on this issue, combining my passion for community, helping others, saving the planet, and leveraging my design skills to create systems that work for everyone.
              </Typography>
              
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                I believe that by making e-waste recycling more accessible, transparent, and even rewarding, we can transform a global environmental challenge into an opportunity for positive impact in our communities.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Leadership Philosophy */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Psychology sx={{ fontSize: 40, color: theme.palette.teal.main, mb: 2 }} />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            Leadership Philosophy
          </Typography>
          <Divider sx={{ width: '80px', mx: 'auto', mt: 2, mb: 6, borderColor: theme.palette.teal.main, borderBottomWidth: 3 }} />
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 2, 
              textAlign: 'center',
              bgcolor: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.teal.main, mb: 2 }}>
                Waste as Opportunity
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                What others see as waste, we see as resources in the wrong place. This perspective drives our innovative approach to electronics recycling and refurbishment.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 2, 
              textAlign: 'center',
              bgcolor: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.teal.main, mb: 2 }}>
                Inclusive Sustainability
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                Sustainability shouldn't be an exclusive club. We work to make eco-friendly choices accessible to everyone, regardless of socioeconomic status.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 2, 
              textAlign: 'center',
              bgcolor: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.teal.main, mb: 2 }}>
                Building Systems That Outlive Us
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                True sustainability comes from creating systems and practices that can continue to function and evolve beyond any single person's involvement.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 2, 
              textAlign: 'center',
              bgcolor: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.teal.main, mb: 2 }}>
                A Clean, Circular Future
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                We envision a world where electronics are designed for reuse, repair is the default, and recycling is the last resort - creating a truly circular economy for technology.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            to="/about-us"
            variant="contained"
            sx={{ 
              bgcolor: theme.palette.teal.main,
              '&:hover': { bgcolor: theme.palette.teal.dark },
              px: 4,
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            Back to About Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CEOProfile; 