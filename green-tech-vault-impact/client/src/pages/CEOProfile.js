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
                CEO
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Leila Meyer is a passionate entrepreneur committed to tackling the global e-waste crisis through innovative, community-driven solutions. With a multidisciplinary background spanning Architecture, Construction, Education, Interior Design, and Marketing, she brings a unique and holistic perspective to sustainability and circular design.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Leila earned her Bachelor of Science in Architecture from the University of Cincinnati, where she cultivated a deep understanding of design thinking and environmental responsibility. Over the years, she has expanded her expertise across industries through internships, sharpening the skills that now guide her leadership at RYGNeco.
              </Typography>
              
              <Typography variant="body1" paragraph>
                Leila's vision for RYGNeco is to revolutionize how we manage electronic waste—transforming discarded tech into opportunity and paving the way for a more sustainable future.
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