import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  useTheme,
  Paper,
} from '@mui/material';

const CEOProfile = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Profile Content Section */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={5}>
            {/* CEO Image */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  height: '100%', // Match container height
                }}
              >
                <Box
                  component="img"
                  src="/images/leila-meyer-headshot.jpg"
                  alt="Leila Meyer - CEO"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 2,
                  }}
                />
              </Box>
            </Grid>
            
            {/* CEO Information */}
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Leila Meyer
                </Typography>
                <Typography variant="h4" sx={{ color: theme.palette.teal.main, mb: 3 }}>
                  CEO
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  Leila Meyer is a passionate entrepreneur committed to tackling the global e-waste crisis through innovative, community-driven solutions. With a multidisciplinary background spanning Architecture, Construction, Education, Interior Design, and Marketing, she brings a unique and holistic perspective to sustainability and circular design.
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  Leila earned her Bachelor of Science in Architecture from the University of Cincinnati, where she cultivated a deep understanding of design thinking and environmental responsibility. Over the years, she has expanded her expertise across industries through internships, sharpening the skills that now guide her leadership at RYGNeco.
                </Typography>
                
                <Typography variant="body1">
                  Leila's vision for RYGNeco is to revolutionize how we manage electronic waste—transforming discarded tech into opportunity and paving the way for a more sustainable future.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default CEOProfile; 