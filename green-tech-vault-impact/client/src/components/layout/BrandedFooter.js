import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from '../branding/Logo';

const BrandedFooter = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Logo variant="light" size="medium" />
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Responsible e-waste management solutions for businesses and organizations.
              We help you safely dispose of electronic waste while protecting your data and the environment.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              OUR SERVICES
            </Typography>
            <Typography variant="body2" component="div">
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              CONTACT US
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@greentechvault.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: (555) 123-4567
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Address: 123 Green Street, Eco City, EC 12345
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: 1, borderColor: 'rgba(255,255,255,0.2)', mt: 4, pt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Green Tech Vault. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BrandedFooter; 