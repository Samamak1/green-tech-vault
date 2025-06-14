import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  AppBar, 
  Toolbar, 
  InputBase, 
  Avatar, 
  IconButton, 
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Logo from '../branding/Logo';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { useLayoutEditor } from '../../context/LayoutEditorContext';
import NotificationsPopup from '../NotificationsPopup';

const BrandedHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const { profileData, profilePictureUrl } = useProfile();
  const { isEditMode, toggleEditMode } = useLayoutEditor();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
    setNotificationsOpen(true);
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
    setNotificationsAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-client-account-menu';

  // Navigation items for both desktop and mobile
  const navigationItems = [
    { text: 'Schedule A Pickup', link: '/schedule-pickup' },
    { text: 'How It Works', link: '/how-it-works' },
    { text: 'Join Us', link: '/join-us' },
    { text: 'About Us', link: '/about-us' },
    { text: 'Contact', link: '/contact' }
  ];
  
  // Calculate unread notification count
  const unreadNotificationCount = 7;

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          width: 230,
          mt: 1,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar 
          src={profilePictureUrl}
          sx={{ 
            width: 70, 
            height: 70, 
            mx: 'auto', 
            mb: 1,
            backgroundColor: profilePictureUrl ? 'transparent' : '#56C3C9',
          }}
        >
          {!profilePictureUrl && ((profileData?.fullName || user?.name || user?.companyName || 'U').charAt(0))}
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {profileData?.fullName || user?.name || user?.companyName || 'User'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
          {user?.username ? `@${user.username.replace('@', '')}` : ''}
        </Typography>
        <Box 
          sx={{ 
            textAlign: 'center', 
            bgcolor: '#f5f5f5', 
            p: 0.5, 
            borderRadius: 1, 
            mt: 1 
          }}
        >
          <LogoutIcon 
            fontSize="small" 
            sx={{ mr: 0.5, fontSize: '0.9rem', verticalAlign: 'middle' }} 
          />
          <Typography 
            variant="body2" 
            component="span" 
            onClick={handleLogout}
            sx={{ 
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' } 
            }}
          >
            Logout
          </Typography>
        </Box>
      </Box>
      
      <Divider />
      
      <MenuItem onClick={() => { navigate('/client-profile'); handleMenuClose(); }}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      
      <MenuItem onClick={handleNotificationsClick}>
        <ListItemIcon>
          <Badge 
            color="error" 
            variant="dot" 
            invisible={unreadNotificationCount === 0}
          >
            <NotificationsIcon fontSize="small" />
          </Badge>
        </ListItemIcon>
        Notifications
      </MenuItem>
      
      <MenuItem onClick={() => { navigate('/settings'); handleMenuClose(); }}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      
      <MenuItem onClick={() => { navigate('/qr-login'); handleMenuClose(); }}>
        <ListItemIcon>
          <QrCodeIcon fontSize="small" />
        </ListItemIcon>
        QR for Mobile Login
      </MenuItem>
      
      <Divider />
      
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
        <HelpIcon fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="body2">Help</Typography>
      </Box>
    </Menu>
  );

  // Mobile drawer menu
  const mobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuClose}
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
        <IconButton onClick={handleMobileMenuClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ pt: 0 }}>
        {navigationItems.map((item, index) => (
          <ListItem 
            key={index}
            component={RouterLink} 
            to={item.link}
            onClick={handleMobileMenuClose}
            sx={{
              py: 2,
              borderBottom: index < navigationItems.length - 1 ? '1px solid #f0f0f0' : 'none',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontSize: '16px',
                fontWeight: '500'
              }}
            />
          </ListItem>
        ))}
        
        {!user && (
          <>
            <Divider sx={{ my: 2 }} />
            <ListItem 
              component={RouterLink} 
              to="/login"
              onClick={handleMobileMenuClose}
              sx={{ py: 2 }}
            >
              <ListItemText 
                primary="Sign In" 
                primaryTypographyProps={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'primary.main'
                }}
              />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/register"
              onClick={handleMobileMenuClose}
              sx={{ 
                py: 2,
                mx: 2,
                mb: 2,
                backgroundColor: 'primary.main',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              <ListItemText 
                primary="Register" 
                primaryTypographyProps={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'white',
                  textAlign: 'center'
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
        height: '64px',
        zIndex: 1300,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ 
          height: '64px', 
          minHeight: '64px !important', // Override Material-UI default
          maxHeight: '64px', // Prevent expansion
          px: 0 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            {/* Left side - RYGNeco Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo variant="default" size="medium" showText={true} linkTo="/" />
            </Box>

            {/* Center - Navigation Menu (Desktop only) */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {navigationItems.map((item, index) => (
                  <Button
                    key={index}
                    component={RouterLink}
                    to={item.link}
                    sx={{ 
                      color: 'text.primary',
                      textTransform: 'none',
                      fontSize: '14px',
                      '&:hover': { backgroundColor: 'transparent', color: 'primary.main' }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            {/* Right side - Sign In/Register or User Profile + Mobile Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Desktop Auth Buttons */}
              {!isMobile && !user && (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    sx={{ 
                      borderRadius: '20px',
                      px: 3,
                      textTransform: 'none',
                      color: 'text.primary',
                      borderColor: '#e0e0e0',
                      fontSize: '14px'
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    sx={{ 
                      borderRadius: '20px',
                      px: 3,
                      textTransform: 'none',
                      bgcolor: '#333',
                      fontSize: '14px',
                      '&:hover': { bgcolor: '#555' }
                    }}
                  >
                    Register
                  </Button>
                </>
              )}

              {/* User Profile (if logged in) */}
              {user && (
                <>
                  <Box sx={{ 
                    mr: 1,
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                      {profileData?.fullName || user?.name || user?.companyName || 'User'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px' }}>
                      {user?.username ? `@${user.username.replace('@', '')}` : ''}
                    </Typography>
                  </Box>
                  
                  <Avatar
                    src={profilePictureUrl}
                    onClick={handleProfileMenuOpen}
                    aria-controls={menuId}
                    aria-haspopup="true"
                    sx={{ 
                      cursor: 'pointer',
                      bgcolor: profilePictureUrl ? 'transparent' : '#56C3C9',
                      color: '#fff',
                      width: 36,
                      height: 36
                    }}
                  >
                    {!profilePictureUrl && ((profileData?.fullName || user?.name || user?.companyName || 'U').charAt(0))}
                  </Avatar>
                </>
              )}

              {/* Mobile Hamburger Menu */}
              {isMobile && (
                <IconButton
                  onClick={handleMobileMenuToggle}
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
          </Box>
        </Toolbar>
      </Container>
      {renderMenu}
      {mobileMenu}
      
      {/* Notifications Popup */}
      <NotificationsPopup 
        open={notificationsOpen} 
        anchorEl={notificationsAnchorEl} 
        onClose={handleNotificationsClose} 
      />
    </AppBar>
  );
};

export default BrandedHeader; 