import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Breadcrumbs, 
  Link,
  useTheme 
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const EwasteItemDetailPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the item data from location state, or use placeholder data
  const item = location.state?.item || { 
    name: 'Unknown Item', 
    category: 'Miscellaneous' 
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.teal.main,
          color: 'white',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            <Link 
              component={RouterLink} 
              to="/" 
              color="inherit"
              underline="hover"
            >
              Home
            </Link>
            <Link 
              component={RouterLink} 
              to="/how-it-works#accepted-items" 
              color="inherit"
              underline="hover"
            >
              Accepted Items
            </Link>
            <Typography color="white">{item.name}</Typography>
          </Breadcrumbs>
          
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
            {item.name}
          </Typography>
          <Typography variant="subtitle1">
            Category: {item.category}
          </Typography>
        </Container>
      </Box>
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper 
          elevation={2}
          sx={{ 
            p: 4, 
            borderRadius: 2,
            mb: 4
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.main }}>
            Item Details
          </Typography>
          
          <Typography variant="body1" paragraph>
            This is a placeholder page for {item.name} details. In a production environment, this page would contain:
          </Typography>
          
          <Box component="ul" sx={{ pl: 3, mb: 4 }}>
            <Box component="li" sx={{ mb: 1 }}>
              <Typography variant="body1">
                Detailed description of the item
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              <Typography variant="body1">
                Accepted conditions and requirements
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              <Typography variant="body1">
                Recycling process for this specific item
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              <Typography variant="body1">
                Environmental impact of proper recycling
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Related items and categories
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            This is a demo page created to showcase the search functionality. In a real implementation, 
            this would be populated with actual data from a database.
          </Typography>
        </Paper>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            onClick={handleGoBack}
          >
            Back to Search
          </Button>
          
          <Button 
            variant="contained" 
            component={RouterLink}
            to="/schedule-pickup"
            sx={{ 
              bgcolor: theme.palette.teal.main,
              '&:hover': {
                bgcolor: theme.palette.teal.dark
              }
            }}
          >
            Schedule a Pickup
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EwasteItemDetailPage; 