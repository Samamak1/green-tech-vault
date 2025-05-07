import React, { useState, useRef, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Divider, 
  InputBase,
  Badge 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import NotificationsPopup from '../NotificationsPopup';

// Styled search component - updated to match button shape
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: '#f5f5f5',
  border: '1px solid #e0e0e0',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  alignItems: 'center',
  marginLeft: 0, // Position at far left
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#757575',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#333333',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '20px',
  },
}));

// Mock notifications data to match the NotificationsPopup
const mockNotifications = [
  { id: 1, read: false },
  { id: 2, read: false },
  { id: 3, read: false },
  { id: 4, read: false },
  { id: 5, read: false },
  { id: 6, read: false },
  { id: 7, read: false },
  { id: 8, read: true },
  { id: 9, read: false },
  { id: 10, read: true }
];

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { profileData, profilePictureUrl } = useProfile();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  
  // Calculate unread notification count
  const notificationCount = notifications.filter(n => !n.read).length;
  
  const menuId = 'primary-client-account-menu';
  const notificationsFromMenu = useRef(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    // Only close the menu if notifications popup wasn't opened from menu
    // or if the notifications popup is already closed
    if (!notificationsFromMenu.current || !notificationsAnchorEl) {
      setAnchorEl(null);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const handleNotificationsOpen = (event) => {
    // Set a flag to track if notifications were opened from menu
    if (anchorEl) {
      notificationsFromMenu.current = true;
    }
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
    // Reset the flag and close menu if it was previously set
    if (notificationsFromMenu.current) {
      notificationsFromMenu.current = false;
      setAnchorEl(null);
    }
  };

  // Function to update notification status (to be passed to NotificationsPopup)
  const handleNotificationUpdate = (updatedNotifications) => {
    setNotifications(updatedNotifications);
  };

  return (
    <AppBar 
      position="fixed"
      sx={{ 
        backgroundColor: 'white',
        color: 'black',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
        height: '64px',
        zIndex: 1100,
        ml: '225px', // Start after sidebar (5 grid cells * 45px)
        width: 'calc(100% - 225px)', // Adjust width to account for sidebar
      }}
    >
      <Toolbar sx={{ height: '64px', minHeight: '64px', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Left - Search */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 0, width: '400px', ml: 0, pl: 0 }}>
            <Search sx={{ width: '100%', maxWidth: '100%' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search here"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleSearchSubmit}
              />
            </Search>
          </Box>
          
          {/* Middle section - empty space */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right - User Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              mx: 2,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {user?.companyName || "Leila's Company"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                @{user?.username || 'lmeyer'}
              </Typography>
            </Box>

            <Avatar
              src={profilePictureUrl}
              onClick={handleMenuOpen}
              aria-controls={menuId}
              aria-haspopup="true"
              sx={{ 
                cursor: 'pointer',
                bgcolor: profilePictureUrl ? 'transparent' : '#185B5F',
                color: '#fff',
                width: 36,
                height: 36
              }}
            >
              {!profilePictureUrl && (profileData?.fullName?.charAt(0) || 'L')}
            </Avatar>
          </Box>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        id={menuId}
        open={Boolean(anchorEl)}
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
              backgroundColor: profilePictureUrl ? 'transparent' : '#185B5F',
            }}
          >
            {!profilePictureUrl && (profileData?.fullName?.charAt(0) || 'L')}
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {user?.companyName || "Leila's Company"}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
            @{user?.username || 'lmeyer'}
          </Typography>
          <Box 
            sx={{ 
              textAlign: 'center', 
              bgcolor: '#f5f5f5', 
              p: 0.5, 
              borderRadius: 1, 
              mt: 1 
            }}
            onClick={handleLogout}
          >
            <LogoutIcon 
              fontSize="small" 
              sx={{ mr: 0.5, fontSize: '0.9rem', verticalAlign: 'middle' }} 
            />
            <Typography 
              variant="body2" 
              component="span" 
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
        
        <MenuItem onClick={() => handleNavigation('/dashboard/client-profile')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          My Profile
        </MenuItem>
        
        <MenuItem onClick={handleNotificationsOpen}>
          <ListItemIcon>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          Notifications
        </MenuItem>
        
        <MenuItem onClick={() => handleNavigation('/dashboard/settings')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={() => handleNavigation('/dashboard/qr-login')}>
          <ListItemIcon>
            <QrCodeIcon fontSize="small" />
          </ListItemIcon>
          QR for Mobile Login
        </MenuItem>
        
        <Divider />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <MenuItem onClick={() => handleNavigation('/dashboard/help')}>
            <ListItemIcon>
              <HelpIcon fontSize="small" />
            </ListItemIcon>
            Help
          </MenuItem>
        </Box>
      </Menu>

      {/* Notifications Popup */}
      <NotificationsPopup 
        open={Boolean(notificationsAnchorEl)} 
        anchorEl={notificationsAnchorEl}
        onClose={handleNotificationsClose}
        onUpdateNotifications={handleNotificationUpdate}
        notifications={notifications}
      />
    </AppBar>
  );
};

export default Header; 