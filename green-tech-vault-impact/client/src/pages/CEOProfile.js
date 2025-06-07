import React from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
import BrandedHeader from '../components/layout/BrandedHeader';

const CEOProfile = () => {
  const theme = useTheme();

  return (
    <>
      <BrandedHeader />
      <Box 
        component="main"
        sx={{ 
          minHeight: '100vh',
          bgcolor: '#ffffff',
          pt: { xs: 8, md: 12 },
          pb: 8
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex',
            gap: 6,
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', md: 'row' }
          }}>
            {/* CEO Image */}
            <Box
              sx={{
                width: { xs: '100%', md: '400px' },
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src="/images/leila-meyer-headshot.jpg"
                alt="Leila Meyer - CEO"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
            
            {/* CEO Information */}
            <Box>
              <Typography variant="h3" component="h1" sx={{ 
                fontWeight: 'bold', 
                mb: 1,
                color: '#333333',
                fontSize: { xs: '2rem', md: '3rem' }
              }}>
                Leila Meyer
              </Typography>
              <Typography variant="h4" sx={{ 
                color: '#185B5F', 
                mb: 4,
                fontWeight: 'medium',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}>
                CEO
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3, color: '#555555' }}>
                Leila Meyer is a passionate entrepreneur committed to tackling the global e-waste crisis through innovative, community-driven solutions. With a multidisciplinary background spanning Architecture, Construction, Education, Interior Design, and Marketing, she brings a unique and holistic perspective to sustainability and circular design.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3, color: '#555555' }}>
                Leila earned her Bachelor of Science in Architecture from the University of Cincinnati, where she cultivated a deep understanding of design thinking and environmental responsibility. Over the years, she has expanded her expertise across industries through internships, sharpening the skills that now guide her leadership at RYGNeco.
              </Typography>
              
              <Typography variant="body1" sx={{ color: '#555555' }}>
                Leila's vision for RYGNeco is to revolutionize how we manage electronic waste—transforming discarded tech into opportunity and paving the way for a more sustainable future.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CEOProfile; 