import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  InputAdornment,
  useTheme,
  Link,
  Stack
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

// Hero image for contact page
const heroImage = 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const ContactPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    // Show success message or redirect
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '300px',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            color: 'white', 
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1,
            textAlign: 'center'
          }}
        >
          Contact Us
        </Typography>
      </Box>
      
      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Get in Touch Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ pr: { md: 4 }, bgcolor: 'white', p: 3, borderRadius: 2 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Get In Touch
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
                Partner with us to responsibly recycle your e-waste. Make a measurable impact on the environment and your community.
              </Typography>
              
              {/* Phone */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.teal.main, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <PhoneIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Phone</Typography>
                  <Typography variant="body2">(800) 123-4567</Typography>
                </Box>
              </Box>
              
              {/* Email */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.teal.main, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <EmailIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Email</Typography>
                  <Typography variant="body2">info@rygneco.com</Typography>
                </Box>
              </Box>
              
              {/* Location */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.teal.main, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <PlaceIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Location</Typography>
                  <Typography variant="body2">Cincinnati, OH</Typography>
                </Box>
              </Box>
              
              {/* Social Media Links */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Link 
                  href="https://www.instagram.com/rygneco/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: theme.palette.teal.main,
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.teal.dark
                    }
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </Link>
                <Link 
                  href="https://www.facebook.com/people/RYGNeco/61575273422314/?mibextid=LQQJ4d&rdid=jOGvLhXNFJslFT3H&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19DdG1NYvL%2F%3Fmibextid%3DLQQJ4d" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: theme.palette.teal.main,
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.teal.dark
                    }
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </Link>
                <Link 
                  href="https://x.com/RYGNeco" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: theme.palette.teal.main,
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.teal.dark
                    }
                  }}
                >
                  <XIcon fontSize="small" />
                </Link>
                <Link 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: theme.palette.teal.main,
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.teal.dark
                    }
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </Link>
                <Link 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: theme.palette.teal.main,
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.teal.dark
                    }
                  }}
                >
                  <YouTubeIcon fontSize="small" />
                </Link>
              </Box>
            </Box>
          </Grid>
          
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper 
              component="form" 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: 'none',
                backgroundColor: 'white'
              }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    variant="outlined"
                    size="small"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    name="phone"
                    variant="outlined"
                    size="small"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    size="small"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      bgcolor: '#256B65',
                      '&:hover': {
                        bgcolor: '#1D5751',
                      }
                    }}
                  >
                    Submit Message
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* Map Section */}
      <Box sx={{ height: '400px', width: '100%', mb: 0 }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196281.1285694188!2d-84.6220770380393!3d39.136528948936454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x884051b1de3821f9%3A0x69fb7e8be4c09317!2sCincinnati%2C%20OH!5e0!3m2!1sen!2sus!4v1615910422842!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Company Location"
        ></iframe>
      </Box>
    </Box>
  );
};

export default ContactPage; 