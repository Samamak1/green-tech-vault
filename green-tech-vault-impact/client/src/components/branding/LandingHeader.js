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
  useMediaQuery,
  Menu,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
  const isMobile = useMediaQuery('(max-width:720px)'); // Custom breakpoint for navigation crowding
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
      text: 'Schedule A Pickup', 
      link: '/schedule-pickup'
    },
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

  // Mobile drawer menu
  const mobileMenu = (
    <Drawer
      anchor="right"
      open={menuOpen}
      onClose={toggleMenu}
      PaperProps={{
        sx: {
          width: 280,
          backgroundColor: 'white',
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Menu
        </Typography>
        <IconButton onClick={toggleMenu}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ pt: 0 }}>
        {navItems.map((item, index) => (
          <ListItem 
            key={index}
            component={RouterLink} 
            to={item.link}
            onClick={toggleMenu}
            sx={{
              py: 2,
              borderBottom: index < navItems.length - 1 ? '1px solid #f0f0f0' : 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                '& .MuiListItemText-primary': {
                  color: 'primary.main'
                }
              }
            }}
          >
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontSize: '0.875rem', // Match desktop navigation
                fontWeight: 'normal', // Match desktop navigation
                color: 'text.primary', // Match desktop navigation
                fontFamily: 'inherit', // Use same font family
                textDecoration: 'none'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="static" 
        color="transparent" 
        elevation={0} 
        sx={{ 
          borderBottom: 'none',
          boxShadow: 'none',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.55) 70%, rgba(255, 255, 255, 0.45) 85%, rgba(255, 255, 255, 0.15) 95%, rgba(255, 255, 255, 0.05) 100%)',
          zIndex: 1100
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          height: '64px', // Fixed height
          minHeight: '64px !important', // Override Material-UI default
          maxHeight: '64px' // Prevent expansion
        }}>
          {/* Left side - Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }} aria-label="RYGNeco home page">
              <Logo size="medium" showText={false} />
            </Box>
          </Box>
          
          {/* Right side - Navigation (Desktop) or Hamburger (Mobile) */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            {/* Desktop Navigation */}
            {!isMobile && (
              <>
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
              </>
            )}

            {/* Mobile Hamburger Menu */}
            {isMobile && (
              <IconButton
                onClick={toggleMenu}
                sx={{ 
                  color: 'text.primary',
                  ml: 1 
                }}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {mobileMenu}
    </>
  );
};

export default LandingHeader; 