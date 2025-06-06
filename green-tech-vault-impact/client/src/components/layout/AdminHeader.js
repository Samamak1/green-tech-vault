import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  InputBase, 
  IconButton, 
  Typography, 
  Menu, 
  MenuItem, 
  Divider,
  useTheme,
  Avatar,
  ListItemIcon,
  Badge
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CampaignIcon from '@mui/icons-material/Campaign';
import Logo from '../branding/Logo';
import NotificationsPopup from '../../components/NotificationsPopup';

// Styled search component
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: '#f5f5f5',
  border: '1px solid #e0e0e0',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  alignItems: 'center',
  marginLeft: 0, // Ensure it's at the far left
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

const AdminHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { profileData, profilePictureUrl } = useProfile();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    handleMenuClose();
  };

  const handleNotificationsClick = (event) => {
    // Position next to the profile menu instead of replacing it
    setNotificationsAnchorEl(event.currentTarget);
    setNotificationsOpen(true);
    // Don't close the profile menu anymore
    // handleMenuClose();
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
    setNotificationsAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-admin-account-menu';
  
  // Calculate unread notification count (assuming we have mock data for now)
  // In a real app, this would come from your notifications service/context
  const unreadNotificationCount = 7; // Hard-coded for now
  
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
            backgroundColor: profilePictureUrl ? 'transparent' : '#1C392B',
          }}
        >
          {!profilePictureUrl && ((profileData?.fullName || user?.name || 'U').charAt(0))}
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {profileData?.fullName || user?.name || 'User'}
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
      
      <MenuItem onClick={() => { navigate('/admin/profile'); handleMenuClose(); }}>
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
      
      <MenuItem onClick={() => { navigate('/admin/settings'); handleMenuClose(); }}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      
      <MenuItem onClick={() => { navigate('/admin/qr-login'); handleMenuClose(); }}>
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
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
        height: '64px',
        zIndex: 1300,
        borderRadius: 0, // Sharp corners
        ml: '225px', // Start after sidebar (5 grid cells * 45px)
        width: 'calc(100% - 225px)', // Adjust width to account for sidebar
      }}
    >
      <Toolbar sx={{ height: '64px', minHeight: '64px', px: 2, bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Left side - Logo removed */}
          
          {/* Search positioned at far left */}
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
                sx={{ width: '100%' }}
              />
            </Search>
          </Box>

          {/* Middle section - empty space */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right side - User info */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Notifications icon removed as requested */}

            <Box sx={{ 
              mx: 2,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {profileData?.fullName || user?.name || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {profileData?.jobTitle || user?.position || ''}
              </Typography>
            </Box>
            
            <Avatar
              src={profilePictureUrl}
              onClick={handleProfileMenuOpen}
              aria-controls={menuId}
              aria-haspopup="true"
              sx={{ 
                cursor: 'pointer',
                bgcolor: profilePictureUrl ? 'transparent' : '#1C392B',
                color: '#fff',
                width: 36,
                height: 36
              }}
            >
              {!profilePictureUrl && ((profileData?.fullName || user?.name || 'U').charAt(0))}
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
      {renderMenu}
      
      {/* Notifications Popup - positioned to the left of the dropdown */}
      <NotificationsPopup 
        open={notificationsOpen} 
        anchorEl={notificationsAnchorEl} 
        onClose={handleNotificationsClose} 
      />
    </AppBar>
  );
};

export default AdminHeader; 