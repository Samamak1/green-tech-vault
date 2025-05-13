import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  useTheme
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
        <Grid container spacing={5} alignItems="flex-start">
          {/* CEO Image */}
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/images/leila-meyer.jpg" 
              alt="Leila Meyer - CEO"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
          
          {/* CEO Information */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4" sx={{ color: theme.palette.teal.main, mb: 2 }}>
              CEO / Architect LEED AP
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              Leila is a registered architect in the State of Ohio and in India as well as a LEED Accredited Professional. She has worked on a variety of projects, ranging from single-family to large multi-family projects and dense mixed-use urban new builds and renovations. Her expertise lies in her ability to distill the big ideas of a project and express these comprehensively in presentations to committees and design boards.
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              Leila is proficient in designing complex programs into a limited footprint while still maintaining a high design standard. She is interested in exploring new and interesting uses for common building materials, with an emphasis on quality over quantity.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Leila graduated with a Master of Architecture from The Ohio State University and a Bachelor of Architecture from the University of Mumbai.
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
      </Container>
    </Box>
  );
};

export default CEOProfile; 