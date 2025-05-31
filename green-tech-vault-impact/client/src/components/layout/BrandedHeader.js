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
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';
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
  const { user, logout } = useAuth();
  const { profileData, profilePictureUrl } = useProfile();
  const { isEditMode, toggleEditMode } = useLayoutEditor();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

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

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-client-account-menu';
  
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
        <Toolbar sx={{ height: '64px', minHeight: '64px', px: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            {/* Left side - RYGNeco Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo variant="default" size="medium" showText={true} linkTo="/" />
            </Box>

            {/* Center - Navigation Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Button
                component={RouterLink}
                to="/join-us"
                sx={{ 
                  color: 'text.primary',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'transparent', color: 'primary.main' }
                }}
              >
                Join Us
              </Button>
              <Button
                component={RouterLink}
                to="/how-it-works"
                sx={{ 
                  color: 'text.primary',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'transparent', color: 'primary.main' }
                }}
              >
                How It Works
              </Button>
              <Button
                component={RouterLink}
                to="/education"
                sx={{ 
                  color: 'text.primary',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'transparent', color: 'primary.main' }
                }}
              >
                Education
              </Button>
              <Button
                component={RouterLink}
                to="/about-us"
                sx={{ 
                  color: 'text.primary',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'transparent', color: 'primary.main' }
                }}
              >
                About Us
              </Button>
              <Button
                component={RouterLink}
                to="/contact"
                sx={{ 
                  color: 'text.primary',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'transparent', color: 'primary.main' }
                }}
              >
                Contact
              </Button>
            </Box>

            {/* Right side - Sign In/Register or User Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {user ? (
                <>
                  <Box sx={{ 
                    mr: 1,
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {profileData?.fullName || user?.name || user?.companyName || 'User'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
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
              ) : (
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
                      borderColor: '#e0e0e0'
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
                      '&:hover': { bgcolor: '#555' }
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
      {renderMenu}
      
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