import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  useTheme
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from '../branding/Logo';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  
  const footerBgColor = '#073C3F';
  
  // Log footer color to verify it's correctly set
  console.log('Footer background color set to:', footerBgColor);
  
  // Footer sections
  const corporateLinks = [
    { title: 'About Us', url: '/about-us' },
    { title: 'Certifications', url: '/certifications' },
    { title: 'Locations', url: '/locations' },
    { title: 'Services', url: '/services' }
  ];
  
  const ewasteLinks = [
    { title: 'Let\'s Get Educated', url: '/education' },
    { title: 'Reports', url: '/reports' },
    { title: 'Research', url: '/research' }
  ];
  
  const contactInfo = [
    { title: 'info@rygneco.com', url: 'mailto:info@rygneco.com' },
    { title: 'Phone Number', url: 'tel:+1-800-123-4567' }
  ];
  
  const socialLinks = [
    { icon: <InstagramIcon />, url: 'https://www.instagram.com/rygneco/' },
    { icon: <FacebookIcon />, url: 'https://facebook.com' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com' }
  ];
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: footerBgColor, 
        color: 'white', 
        py: 4,
        mt: 'auto',
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and company name */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'white'
                }}
              >
                <Box 
                  sx={{ 
                    width: 90, 
                    height: 90,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1 
                  }}
                >
                  <Logo variant="light" size="large" showText={false} linkTo={null} />
                </Box>
                <Typography variant="h6" component="span">
                  RYGNeco
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Corporate Information */}
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Corporate Information
            </Typography>
            <Stack spacing={1.5}>
              {corporateLinks.map((link, index) => (
                <Link 
                  key={index} 
                  component={RouterLink} 
                  to={link.url} 
                  color="inherit" 
                  underline="hover"
                  sx={{ fontSize: '0.9rem' }}
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* E-Waste Information */}
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              E-Waste Information
            </Typography>
            <Stack spacing={1.5}>
              {ewasteLinks.map((link, index) => (
                <Link 
                  key={index} 
                  component={RouterLink} 
                  to={link.url} 
                  color="inherit" 
                  underline="hover"
                  sx={{ fontSize: '0.9rem' }}
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 2 }}>
              {contactInfo.map((info, index) => (
                <Link 
                  key={index} 
                  href={info.url} 
                  color="inherit" 
                  underline="hover"
                  sx={{ fontSize: '0.9rem' }}
                >
                  {info.title}
                </Link>
              ))}
            </Stack>
            
            {/* Social media links */}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
              {socialLinks.map((social, index) => (
                <Link 
                  key={index} 
                  href={social.url} 
                  color="inherit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'flex',
                    '&:hover': { 
                      color: 'rgba(255,255,255,0.8)' 
                    }
                  }}
                >
                  {social.icon}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer; 