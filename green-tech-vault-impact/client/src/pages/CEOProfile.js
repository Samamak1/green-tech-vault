import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  useTheme,
  Paper,
  Avatar
} from '@mui/material';
import { ArrowBack, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Base64 fallback image option - using a direct inline image
const inlineCeoImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzJBODc4NCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMk0xMiA1QzEzLjY2IDUgMTUgNi4zNCAxNSA4QzE1IDkuNjYgMTMuNjYgMTEgMTIgMTFDMTAuMzQgMTEgOSA5LjY2IDkgOEM5IDYuMzQgMTAuMzQgNSAxMiA1TTEyIDE5LjJDOS41IDE5LjIgNy4yOSAxNy45MiA2IDE1Ljk4QzYuMDMgMTMuOTkgMTAgMTIuOSAxMiAxMi45QzEzLjk5IDEyLjkgMTcuOTcgMTMuOTkgMTggMTUuOThDMTYuNzEgMTcuOTIgMTQuNSAxOS4yIDEyIDE5LjJaIi8+PC9zdmc+";

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
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* First try to load the image file, with inline SVG fallback */}
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  backgroundColor: theme.palette.teal.main,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  aspectRatio: '1',
                }}
              >
                {/* Attempt to load the external image with fallback */}
                <Avatar
                  src={inlineCeoImage}
                  alt="Leila Meyer - CEO"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    backgroundColor: theme.palette.teal.light,
                  }}
                >
                  <Person sx={{ fontSize: 120, color: 'white' }} />
                </Avatar>
              </Box>
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