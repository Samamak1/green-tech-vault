import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  Menu,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RecyclingIcon from '@mui/icons-material/Recycling';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';
import SortIcon from '@mui/icons-material/Sort';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// Import or create a logo component
import Logo from './Logo';

const LandingHeader = () => {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const menuItems = [
    { 
      text: 'Business Pick-Up Services', 
      icon: <LocalShippingIcon />,
      link: '/services/pickup'
    },
    {
      text: 'Certified Recycling',
      icon: <RecyclingIcon />,
      link: '/services/recycling'
    },
    {
      text: 'Our Numbers',
      icon: <BarChartIcon />,
      link: '/our-numbers'
    },
    {
      text: 'Our Process',
      icon: <AccessTimeIcon />,
      link: '/how-it-works#our-process'
    },
    {
      text: 'Secure Data Destruction',
      icon: <LockIcon />,
      link: '/services/data-destruction'
    },
    {
      text: 'Sorting Your E-Waste',
      icon: <SortIcon />,
      link: '/how-it-works#sorting-ewaste'
    },
    {
      text: 'What Items Do We Accept?',
      icon: <ChecklistIcon />,
      link: '/how-it-works#accepted-items'
    },
    {
      text: 'Recycling Offers',
      icon: <CardGiftcardIcon />,
      link: '/recycling-offers'
    }
  ];

  const navItems = [
    { 
      text: 'How It Works', 
      link: '/how-it-works',
      hasDropdown: true,
      dropdownItems: [
        { text: 'Accepted Items', link: '/how-it-works#accepted-items' },
        { text: 'Data Destruction', link: '/services/data-destruction' },
        { text: 'Our Process', link: '/how-it-works#our-process' },
        { text: 'Pickup Services', link: '/services/pickup' },
        { text: 'Reports', link: '/how-it-works#reports' }
      ]
    },
    { 
      text: 'Join Us', 
      link: '/recycling-offers',
      hasDropdown: true,
      dropdownItems: [
        { text: 'Client Benefits', link: '/recycling-offers#benefits' },
        { text: 'Make a difference', link: '/recycling-offers#difference' }
      ]
    },
    { 
      text: 'About Us', 
      link: '/about-us',
      hasDropdown: true,
      dropdownItems: [
        { text: 'Certified Recycling', link: '/services/recycling' },
        { text: 'Our Numbers', link: '/our-numbers' },
        { text: 'Our Team', link: '/about-us#team' },
        { text: 'Philosophy', link: '/about-us#philosophy' }
      ]
    },
    { text: 'Contact', link: '/contact' }
  ];

  const sideMenu = (
    <Box
      sx={{ width: 280 }}
      role="presentation"
      onClick={toggleMenu}
    >
      <Box sx={{ p: 2, bgcolor: theme.palette.primary.main, color: 'white' }}>
        <Typography variant="h6">Menu</Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={item.text} component={RouterLink} to={item.link}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        color="transparent" 
        elevation={3} 
        sx={{ 
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
          backgroundColor: 'white',
          zIndex: 1100
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left side - Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Logo size="medium" showText={false} />
            </Box>
          </Box>
          
          {/* Right side - Navigation (pushed to far right) */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            {navItems.map((item) => 
              item.hasDropdown ? (
                <Box 
                  key={item.text}
                  sx={{ 
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={() => handleMouseEnter(item.text)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Typography
                    component={RouterLink}
                    to={item.link}
                    sx={{ 
                      mx: 1.5, 
                      color: hoveredItem === item.text ? 'primary.main' : 'text.primary', 
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    {item.text}
                  </Typography>
                  
                  {hoveredItem === item.text && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 1,
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        borderRadius: 1,
                        width: 180,
                        mt: 0.5
                      }}
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <Typography
                          key={dropdownItem.text}
                          component={RouterLink}
                          to={dropdownItem.link}
                          sx={{
                            display: 'block',
                            py: 1.5,
                            px: 2,
                            textDecoration: 'none',
                            color: 'text.primary',
                            fontSize: '0.875rem',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.04)',
                              color: 'primary.main',
                            }
                          }}
                        >
                          {dropdownItem.text}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              ) : (
                <Typography 
                  key={item.text}
                  component={RouterLink}
                  to={item.link}
                  sx={{ 
                    mx: 1.5, 
                    color: 'text.primary', 
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {item.text}
                </Typography>
              )
            )}
            
            {/* Hidden Sign in and Register buttons */}
            {false && (
              <>
                <Button 
                  variant="outlined" 
                  component={RouterLink} 
                  to="/login"
                  sx={{ 
                    mx: 1, 
                    borderRadius: 30,
                    px: 4,
                    py: 1,
                    fontSize: '0.875rem',
                    fontWeight: 'normal',
                    textTransform: 'none',
                    backgroundColor: '#e6e6e6',
                    borderColor: '#9c9c9c',
                    color: '#333333',
                    minWidth: '110px',
                    height: '38px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#333333',
                      backgroundColor: '#dbdbdb',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  Sign in
                </Button>
                
                <Button 
                  variant="contained" 
                  component={RouterLink}
                  to="/register"
                  sx={{ 
                    ml: 1, 
                    borderRadius: 30,
                    px: 4,
                    py: 1,
                    fontSize: '0.875rem',
                    fontWeight: 'normal',
                    textTransform: 'none',
                    backgroundColor: '#333333',
                    color: 'white',
                    minWidth: '110px',
                    height: '38px',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#222222',
                      boxShadow: 'none',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={toggleMenu}
      >
        {sideMenu}
      </Drawer>
    </>
  );
};

export default LandingHeader; 