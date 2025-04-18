import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
    { text: 'Join Us', link: '/recycling-offers' },
    { text: 'How It Works', link: '/how-it-works' },
    { text: 'Education', link: '/education' },
    { text: 'About Us', link: '/about-us' },
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
          {/* Left side - Menu button and Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{ mr: 1, color: '#1C392B' }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Logo size="medium" showText={false} />
            </Box>
          </Box>
          
          {/* Right side - Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item) => (
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
            ))}
            
            <Button 
              variant="outlined" 
              color="primary" 
              component={RouterLink} 
              to="/login"
              sx={{ mx: 1, borderRadius: 1 }}
            >
              Sign In
            </Button>
            
            <Button 
              variant="contained" 
              color="primary"
              component={RouterLink}
              to="/register"
              sx={{ ml: 1, borderRadius: 1 }}
            >
              Register
            </Button>
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