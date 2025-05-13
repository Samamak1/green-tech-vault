import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  useTheme,
  Paper
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CEOProfile = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.teal.main,
          color: 'white',
          py: 3,
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Leila Meyer
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
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Back to Team
          </Button>
        </Container>
      </Box>
      
      {/* Profile Content Section */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={5} alignItems="flex-start">
            {/* CEO Image */}
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="/images/leila-meyer.jpg" 
                alt="Leila Meyer - CEO"
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              />
            </Grid>
            
            {/* CEO Information */}
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ color: theme.palette.teal.main, mb: 2 }}>
                CEO / Architect LEED AP
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Leila Meyer is an accomplished architect and sustainability leader with over 15 years of experience in eco-conscious design and green technology solutions. As the CEO of EcoCycle Solutions, she has transformed the company into a leading force in responsible e-waste management and circular economy practices.
              </Typography>
              
              <Typography variant="body1" paragraph>
                With a Master of Architecture from The Ohio State University and LEED AP certification, Leila combines her architectural expertise with environmental commitment to create innovative recycling programs that benefit both businesses and the planet. Under her leadership, EcoCycle Solutions has diverted thousands of electronic devices from landfills while creating measurable environmental impact for clients across diverse industries.
              </Typography>
              
              <Button 
                component={Link}
                to="/about-us"
                startIcon={<ArrowBack />}
                sx={{ 
                  mt: 4,
                  color: theme.palette.teal.main,
                  borderColor: theme.palette.teal.main,
                  border: '1px solid',
                  '&:hover': {
                    backgroundColor: 'rgba(42, 135, 132, 0.1)'
                  }
                }}
              >
                Back to Team
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default CEOProfile; 