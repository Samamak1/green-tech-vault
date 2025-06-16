import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card,
  CardContent,
  useTheme,
  Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import RecyclingIcon from '../components/branding/RecyclingIcon';

const SamaMushtaqProfile = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.teal.main,
          color: 'white',
          py: 5,
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={RouterLink}
            to="/about-us"
            startIcon={<ArrowBackIcon />}
            sx={{
              position: 'absolute',
              left: 20,
              top: 20,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Back to About Us
          </Button>
          
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Sama Mushtaq
          </Typography>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'medium', opacity: 0.9 }}>
            Founder & CSO
          </Typography>
        </Container>
      </Box>

      {/* Profile Content */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card 
          sx={{ 
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            borderRadius: 3,
            overflow: 'hidden'
          }}
        >
          {/* Image Section */}
          <Box sx={{ height: 400, position: 'relative', bgcolor: '#f5f5f5' }}>
            <Box
              component="img"
              src="/images/Sama-temp.jpg"
              alt="Sama Mushtaq"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block'
              }}
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback for image loading errors */}
            <Box
              sx={{
                display: 'none',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                bgcolor: '#f5f5f5',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            >
              <RecyclingIcon size={120} color="black" />
            </Box>
          </Box>
          
          {/* Content Section */}
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              About Sama
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
              Sama brings over 10+ years of cross-industry expertise in operations, team leadership, and customer-centric service. As an accomplished hospitality leader with proven ability to drive profitability and streamline processes, he excels at building high-performing teams in fast-paced environments.
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
              With a strong foundation in Mechanical Engineering from Wichita State University and additional business management training, Sama combines technical knowledge with operational excellence. He's multilingual (English, Arabic, Urdu, and Hindi) and brings a global perspective to RYGNeco's strategic initiatives. Sama's experience spans from engineering and financial advisory to restaurant operations and business development.
            </Typography>

            {/* Call to Action */}
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button
                component={RouterLink}
                to="/schedule-pickup"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: theme.palette.teal.main,
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: theme.palette.teal.dark,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Schedule a Pickup
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SamaMushtaqProfile; 