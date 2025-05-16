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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
  const [aboutUsAnchorEl, setAboutUsAnchorEl] = useState(null);
  const [joinUsAnchorEl, setJoinUsAnchorEl] = useState(null);
  const [howItWorksAnchorEl, setHowItWorksAnchorEl] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAboutUsOpen = (event) => {
    setAboutUsAnchorEl(event.currentTarget);
  };

  const handleAboutUsClose = () => {
    setAboutUsAnchorEl(null);
  };

  const handleJoinUsOpen = (event) => {
    setJoinUsAnchorEl(event.currentTarget);
  };

  const handleJoinUsClose = () => {
    setJoinUsAnchorEl(null);
  };

  const handleHowItWorksOpen = (event) => {
    setHowItWorksAnchorEl(event.currentTarget);
  };

  const handleHowItWorksClose = () => {
    setHowItWorksAnchorEl(null);
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
    { text: 'Education', link: '/education' },
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
            {navItems.map((item) => 
              item.hasDropdown ? (
                <Box 
                  key={item.text}
                  sx={{ 
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Box
                    aria-controls={item.text === 'About Us' ? "about-menu" : item.text === 'Join Us' ? "join-menu" : "how-menu"}
                    aria-haspopup="true"
                    onClick={
                      item.text === 'About Us' 
                        ? handleAboutUsOpen 
                        : item.text === 'Join Us' 
                          ? handleJoinUsOpen 
                          : handleHowItWorksOpen
                    }
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      mx: 1.5, 
                      cursor: 'pointer',
                      color: 'text.primary',
                      fontSize: '0.875rem',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    {item.text}
                    <ArrowDropDownIcon fontSize="small" />
                  </Box>
                  <Menu
                    id={item.text === 'About Us' ? "about-menu" : item.text === 'Join Us' ? "join-menu" : "how-menu"}
                    anchorEl={
                      item.text === 'About Us' 
                        ? aboutUsAnchorEl 
                        : item.text === 'Join Us' 
                          ? joinUsAnchorEl 
                          : howItWorksAnchorEl
                    }
                    open={Boolean(
                      item.text === 'About Us' 
                        ? aboutUsAnchorEl 
                        : item.text === 'Join Us' 
                          ? joinUsAnchorEl 
                          : howItWorksAnchorEl
                    )}
                    onClose={
                      item.text === 'About Us' 
                        ? handleAboutUsClose 
                        : item.text === 'Join Us' 
                          ? handleJoinUsClose 
                          : handleHowItWorksClose
                    }
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    sx={{ mt: 0.5 }}
                  >
                    {item.dropdownItems.map((dropdownItem) => (
                      <MenuItem 
                        key={dropdownItem.text} 
                        component={RouterLink} 
                        to={dropdownItem.link}
                        onClick={
                          item.text === 'About Us' 
                            ? handleAboutUsClose 
                            : item.text === 'Join Us' 
                              ? handleJoinUsClose 
                              : handleHowItWorksClose
                        }
                      >
                        {dropdownItem.text}
                      </MenuItem>
                    ))}
                  </Menu>
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