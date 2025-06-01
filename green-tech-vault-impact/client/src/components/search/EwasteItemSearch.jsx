import React, { useState, useEffect, useRef } from 'react';
import { 
  TextField, 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Fade,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const EwasteItemSearch = ({ acceptedItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  // Flatten the items array for easier searching
  const allItems = acceptedItems.reduce((acc, category) => {
    return [...acc, ...category.items.map(item => ({
      name: item,
      category: category.category
    }))];
  }, []);
  
  useEffect(() => {
    // Hide results when clicking outside of the search component
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.trim() === '') {
      setShowResults(false);
      setNotFound(false);
    }
  };
  
  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    
    if (query === '') {
      setShowResults(false);
      setNotFound(false);
      return;
    }
    
    // Improved search to handle singular/plural forms 
    const results = allItems.filter(item => {
      const itemName = item.name.toLowerCase();
      // Check if the item name contains the query
      if (itemName.includes(query)) return true;
      
      // Check for singular/plural variations (simple s/es ending check)
      const singularQuery = query.endsWith('s') ? query.slice(0, -1) : query;
      const pluralQuery = query.endsWith('s') ? query : `${query}s`;
      
      return itemName.includes(singularQuery) || itemName.includes(pluralQuery);
    });
    
    setSearchResults(results);
    setShowResults(true);
    setNotFound(results.length === 0);
  };
  
  const handleItemClick = (item) => {
    // Special handling for keyboards to use the dedicated page
    if (item.name.toLowerCase() === "keyboards" || item.name.toLowerCase() === "keyboard") {
      navigate(`/e-waste-item/keyboards`);
    } else {
      // For other items, use the generic route with state
      navigate(`/e-waste-item/${item.name.toLowerCase().replace(/\s+/g, '-')}`, { 
        state: { item: item } 
      });
    }
    setShowResults(false);
    
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <Box 
      ref={searchRef}
      sx={{ 
        position: 'relative',
        maxWidth: 600,
        width: '100%',
        mx: 'auto'
      }}
    >
      {/* Search Form */}
      <Box component="form" onSubmit={handleSearch}>
        <TextField
          fullWidth
          placeholder="Search for e-waste items..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ ml: 1, mr: 1, color: 'text.secondary' }} />
            ),
          }}
          sx={{
            bgcolor: 'white',
            borderRadius: 1.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
              height: 56,
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
            },
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        />
      </Box>
      
      {/* Search Results */}
      {showResults && (
        <Fade in={showResults}>
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              width: '100%',
              maxHeight: 300,
              overflow: 'auto',
              mt: 0.5,
              zIndex: 10,
              borderRadius: 1.5
            }}
          >
            {notFound ? (
              <Alert severity="info" sx={{ m: 2 }}>
                We currently do not accept this item. Please check back later or contact us for more information.
              </Alert>
            ) : (
              <List disablePadding>
                {searchResults.map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    divider={index < searchResults.length - 1}
                    onClick={() => handleItemClick(item)}
                    sx={{
                      py: 1.5,
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={`Category: ${item.category}`}
                      primaryTypographyProps={{
                        fontWeight: 'medium'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Fade>
      )}
    </Box>
  );
};

export default EwasteItemSearch; 