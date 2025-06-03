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
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  const theme = useTheme();
  
  const footerBgColor = '#073C3F';
  
  // Log footer color to verify it's correctly set
  console.log('Footer background color set to:', footerBgColor);
  
  // Footer sections
  const corporateLinks = [
    { title: 'Accepted Items', url: '/how-it-works#accepted-items' },
    { title: 'Data Destruction', url: '/services/data-destruction' },
    { title: 'Our Process', url: '/how-it-works#our-process' },
    { title: 'Reports', url: '/how-it-works#reports' }
  ];
  
  const ewasteLinks = [
    { title: 'About Us', url: '/about-us' },
    { title: 'How It Works', url: '/how-it-works' },
    { title: 'Join Us', url: '/recycling-offers' },
    { title: 'Schedule A Pickup', url: '/schedule-pickup' }
  ];
  
  const contactInfo = [
    { title: 'info@rygneco.com', url: 'mailto:info@rygneco.com' },
    { title: 'Phone Number', url: 'tel:+1-800-123-4567' }
  ];
  
  const socialLinks = [
    { icon: <InstagramIcon />, url: 'https://www.instagram.com/rygneco/' },
    { icon: <FacebookIcon />, url: 'https://www.facebook.com/people/RYGNeco/61575273422314/?mibextid=LQQJ4d&rdid=jOGvLhXNFJslFT3H&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19DdG1NYvL%2F%3Fmibextid%3DLQQJ4d' },
    { icon: <XIcon />, url: 'https://x.com/RYGNeco' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com' }
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
          {/* Logo only - no text */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  textDecoration: 'none',
                  color: 'white',
                  mt: '-94px'
                }}
              >
                <Box 
                  sx={{ 
                    width: 90,
                    height: 90,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Logo variant="light" size="medium" showText={false} linkTo={null} />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Explore Information */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Explore
            </Typography>
            <Stack spacing={1}>
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
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              E-Waste
            </Typography>
            <Stack spacing={1}>
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

          {/* Contact Information */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Stack spacing={1}>
              {contactInfo.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.url}
                  color="inherit"
                  underline="hover"
                  sx={{ fontSize: '0.9rem' }}
                >
                  {contact.title}
                </Link>
              ))}
            </Stack>
            
            {/* Social Media Icons */}
            <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                  }}
                >
                  {React.cloneElement(social.icon, { sx: { fontSize: 18 } })}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom section with copyright */}
        <Box 
          sx={{ 
            borderTop: 1, 
            borderColor: 'rgba(255, 255, 255, 0.1)', 
            mt: 4, 
            pt: 3, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} RYGNeco. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 