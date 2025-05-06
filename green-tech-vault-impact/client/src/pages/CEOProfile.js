import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Avatar,
  Paper,
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
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';
import { Link } from 'react-router-dom';

const CEOProfile = () => {
  const theme = useTheme();

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            component={Link}
            to="/about-us"
            startIcon={<ArrowBack />}
            sx={{ 
              color: theme.palette.teal.main,
              mr: 2,
              '&:hover': {
                backgroundColor: 'rgba(78, 205, 196, 0.08)'
              }
            }}
          >
            Back to About Us
          </Button>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>CEO Profile</Typography>
        </Box>
        
        {/* Hero Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            bgcolor: theme.palette.teal.main, 
            color: 'white', 
            p: 4, 
            borderRadius: 2,
            mb: 4,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 180,
                  height: 180,
                  border: '4px solid white',
                }}
              >
                LM
              </Avatar>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Leila Meyer
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, mb: 2, opacity: 0.9 }}>
                Founder & CEO
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                Passionate entrepreneur dedicated to solving e-waste challenges through innovative and community-focused solutions. Founded RGYNeco to transform how we handle electronic waste and create a more sustainable future.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Education and Experience Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ color: theme.palette.teal.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>Education</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Bachelor of Science in Architecture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  University of Cincinnati
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Focused on sustainable design practices and environmental impact of construction materials.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Work sx={{ color: theme.palette.teal.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>Work Experience</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Interior Design Catalog Specialist
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amazon
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
                  Managed sustainable product selections and eco-friendly design options.
                </Typography>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Architecture Intern
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Solstice Planning and Architecture
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
                  Contributed to green building projects and sustainable urban planning initiatives.
                </Typography>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Architecture Intern
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  BBCO Design
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Focused on environmentally conscious design solutions for residential projects.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Motivation Section */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmojiObjects sx={{ color: theme.palette.teal.main, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>Motivation for Starting RGYNeco</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" paragraph>
            When I first learned about the growing e-waste crisis, I was shocked by the scale of the problem and the lack of accessible solutions. I realized that most people want to do the right thing with their old electronics, but the process is often confusing, inconvenient, or completely inaccessible.
          </Typography>
          
          <Typography variant="body1" paragraph>
            RGYNeco was born from my desire to take action on this issue, combining my passion for community, helping others, saving the planet, and leveraging my design skills to create systems that work for everyone.
          </Typography>
          
          <Typography variant="body1">
            I believe that by making e-waste recycling more accessible, transparent, and even rewarding, we can transform a global environmental challenge into an opportunity for positive impact in our communities.
          </Typography>
        </Paper>
        
        {/* Leadership Philosophy */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Psychology sx={{ color: theme.palette.teal.main, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>Leadership Philosophy</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <List>
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ fontSize: 8, color: theme.palette.teal.main, mt: 1.5 }} />
              </ListItemIcon>
              <ListItemText
                primary="Waste as Opportunity"
                secondary="What others see as waste, we see as resources in the wrong place. This perspective drives our innovative approach to electronics recycling and refurbishment."
                primaryTypographyProps={{ fontWeight: 500 }}
                secondaryTypographyProps={{ sx: { mt: 0.5 } }}
              />
            </ListItem>
            
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ fontSize: 8, color: theme.palette.teal.main, mt: 1.5 }} />
              </ListItemIcon>
              <ListItemText
                primary="Inclusive Sustainability"
                secondary="Sustainability shouldn't be an exclusive club. We work to make eco-friendly choices accessible to everyone, regardless of socioeconomic status."
                primaryTypographyProps={{ fontWeight: 500 }}
                secondaryTypographyProps={{ sx: { mt: 0.5 } }}
              />
            </ListItem>
            
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ fontSize: 8, color: theme.palette.teal.main, mt: 1.5 }} />
              </ListItemIcon>
              <ListItemText
                primary="Building Systems That Outlive Us"
                secondary="True sustainability comes from creating systems and practices that can continue to function and evolve beyond any single person's involvement."
                primaryTypographyProps={{ fontWeight: 500 }}
                secondaryTypographyProps={{ sx: { mt: 0.5 } }}
              />
            </ListItem>
            
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon sx={{ fontSize: 8, color: theme.palette.teal.main, mt: 1.5 }} />
              </ListItemIcon>
              <ListItemText
                primary="A Clean, Circular Future"
                secondary="We envision a world where electronics are designed for reuse, repair is the default, and recycling is the last resort - creating a truly circular economy for technology."
                primaryTypographyProps={{ fontWeight: 500 }}
                secondaryTypographyProps={{ sx: { mt: 0.5 } }}
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default CEOProfile; 