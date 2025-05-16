import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Breadcrumbs, 
  Link,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme 
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import CachedIcon from '@mui/icons-material/Cached';
import NatureIcon from '@mui/icons-material/Nature';
import CategoryIcon from '@mui/icons-material/Category';
import CircleIcon from '@mui/icons-material/Circle';

const EwasteItemDetailPage = ({ preloadedItemData }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  
  // Get the item data from preloaded data, location state, or use placeholder data based on URL param
  const item = preloadedItemData || location.state?.item || { 
    name: params.itemName ? params.itemName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') : 'Unknown Item', 
    category: 'Miscellaneous',
    description: "This is a placeholder page for item details. In a production environment, this page would contain detailed information about the item.",
    conditions: [],
    notes: [],
    process: [],
    impact: [],
    relatedItems: [],
    categoryDetail: ""
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };

  // Get icon based on category
  const getItemIcon = () => {
    if (item.name === "Keyboards" || item.category === "Peripherals") {
      return <KeyboardIcon sx={{ fontSize: 48 }} />;
    }
    return null;
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {getItemIcon()}
            </Box>
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                {item.name}
              </Typography>
              <Typography variant="subtitle1">
                Category: {item.category}
              </Typography>
            </Box>
          </Box>
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
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.main, mb: 3 }}>
            Item Details
          </Typography>
          
          {/* Description */}
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            {item.description}
          </Typography>
          
          {/* Conditions */}
          {(item.conditions && item.conditions.length > 0) && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CheckCircleOutlineIcon sx={{ color: theme.palette.teal.main }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Accepted Conditions & Requirements
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                We accept the following types of {item.name.toLowerCase()}:
              </Typography>
              
              <List disablePadding>
                {item.conditions.map((condition, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CircleIcon sx={{ fontSize: 8, color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary={condition} />
                  </ListItem>
                ))}
              </List>
              
              {item.notes && item.notes.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
                    Please Note:
                  </Typography>
                  <List disablePadding>
                    {item.notes.map((note, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 28 }}>
                          <InfoIcon sx={{ fontSize: 16, color: theme.palette.teal.main }} />
                        </ListItemIcon>
                        <ListItemText primary={note} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          )}
          
          {/* Recycling Process */}
          {(item.process && item.process.length > 0) && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CachedIcon sx={{ color: theme.palette.teal.main }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Recycling Process
                </Typography>
              </Box>
              
              <List disablePadding>
                {item.process.map((step, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CircleIcon sx={{ fontSize: 8, color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary={step} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {/* Environmental Impact */}
          {(item.impact && item.impact.length > 0) && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <NatureIcon sx={{ color: theme.palette.teal.main }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Environmental Impact
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                Recycling {item.name.toLowerCase()} helps:
              </Typography>
              
              <List disablePadding>
                {item.impact.map((impact, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CircleIcon sx={{ fontSize: 8, color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary={impact} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {/* Related Items */}
          {(item.relatedItems && item.relatedItems.length > 0) && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CategoryIcon sx={{ color: theme.palette.teal.main }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Related Items & Categories
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
                Related Items:
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {item.relatedItems.map((relatedItem, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      bgcolor: 'rgba(0,0,0,0.05)',
                      px: 2,
                      py: 0.5,
                      borderRadius: 4,
                      fontSize: '0.875rem'
                    }}
                  >
                    {relatedItem}
                  </Box>
                ))}
              </Box>
              
              {item.categoryDetail && (
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
                    Category:
                  </Typography>
                  <Box
                    sx={{ 
                      display: 'inline-block',
                      bgcolor: theme.palette.teal.light,
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 4,
                      fontSize: '0.875rem'
                    }}
                  >
                    🖥️ {item.categoryDetail}
                  </Box>
                </Box>
              )}
            </Box>
          )}
          
          {/* Fallback content if no specific data is provided */}
          {!item.conditions?.length && !item.process?.length && !item.impact?.length && !item.relatedItems?.length && (
            <>
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
            </>
          )}
        </Paper>
        
        {/* Call to Action */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 4, 
            borderRadius: 2,
            mb: 4,
            bgcolor: 'rgba(78, 205, 196, 0.05)'
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            📦 Want to Recycle This Item?
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
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
              🔄 Schedule a Drop-Off
            </Button>
            
            <Button 
              variant="outlined" 
              component={RouterLink}
              to="/how-it-works"
            >
              📍 Find a Collection Site
            </Button>
            
            <Button 
              variant="outlined" 
              component={RouterLink}
              to="/contact"
            >
              ❓ Still Have Questions? Contact Us
            </Button>
          </Box>
        </Paper>
        
        {/* Back button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button 
            variant="outlined" 
            onClick={handleGoBack}
          >
            Back to Search
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EwasteItemDetailPage; 