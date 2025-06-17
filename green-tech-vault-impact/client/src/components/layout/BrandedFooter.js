import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from '../branding/Logo';

const BrandedFooter = () => {
  return (
    <Box sx={{ 
      bgcolor: '#073C3F', 
      color: 'white', 
      py: 6, 
      mt: 'auto',
      boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              mb: 2,
              // Align logo top with header text baseline - more aggressive positioning
              mt: { xs: 0, md: '-12px' }, // More negative margin
              transform: { xs: 'none', md: 'translateY(-4px)' } // Additional transform adjustment
            }}>
              <Box 
                sx={{ 
                  width: 90, // Reverted from 270 back to 90
                  height: 90, // Reverted from 270 back to 90
                  display: 'flex',
                  alignItems: 'flex-start', // Changed from 'center' to 'flex-start'
                  justifyContent: 'flex-start',
                  // Ensure consistent alignment across screen sizes
                  lineHeight: 1
                }}
              >
                <Logo variant="light" size="medium" showText={false} showTagline={false} />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
              Responsible e-waste management solutions for businesses and organizations.
              We help you safely dispose of electronic waste while protecting your data and the environment.
            </Typography>
            
            {/* Social Media Icons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                component="a" 
                href="https://www.instagram.com/rygneco/" 
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: 'rgba(255,255,255,0.8)' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://www.facebook.com/people/RYGNeco/61575273422314/?mibextid=LQQJ4d&rdid=jOGvLhXNFJslFT3H&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19DdG1NYvL%2F%3Fmibextid%3DLQQJ4d" 
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: 'rgba(255,255,255,0.8)' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://x.com/RYGNeco" 
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: 'rgba(255,255,255,0.8)' } }}
              >
                <XIcon />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://linkedin.com" 
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: 'rgba(255,255,255,0.8)' } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              mb: 2, 
              color: '#8cc63f',
              lineHeight: 1.2,
              mt: { xs: 0, md: 0 } // Ensure consistent top alignment
            }}>
              OUR SERVICES
            </Typography>
            <Typography variant="body2" component="div" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>E-Waste Collection</Box>
                <Box component="li" sx={{ mb: 1 }}>Secure Data Destruction</Box>
                <Box component="li" sx={{ mb: 1 }}>Device Refurbishment</Box>
                <Box component="li" sx={{ mb: 1 }}>Responsible Recycling</Box>
                <Box component="li" sx={{ mb: 1 }}>Environmental Impact Reports</Box>
              </Box>
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              mb: 2, 
              color: '#8cc63f',
              lineHeight: 1.2,
              mt: { xs: 0, md: 0 } // Ensure consistent top alignment
            }}>
              CONTACT US
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)' }}>
              Email: info@rygneco.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)' }}>
              Phone: (555) 123-4567
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)' }}>
              Location: Cincinnati, OH
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: 1, borderColor: 'rgba(255,255,255,0.1)', mt: 4, pt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} RYGNeco. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BrandedFooter; 