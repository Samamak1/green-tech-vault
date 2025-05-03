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
import { useNotifications } from '../../context/NotificationsContext';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CampaignIcon from '@mui/icons-material/Campaign';
import Logo from '../branding/Logo';
import NotificationsPopup from '../notifications/NotificationsPopup';

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
  const { unreadCount } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationsOpen = Boolean(notificationsAnchorEl);
  const menuId = 'primary-admin-account-menu';
  
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
          {!profilePictureUrl && (profileData?.fullName?.charAt(0) || 'L')}
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {profileData?.fullName || user?.name || 'Full Name'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
          {profileData?.jobTitle || user?.position || 'CEO'}
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
      
      <MenuItem onClick={() => { navigate('/admin/notifications'); handleMenuClose(); }}>
        <ListItemIcon>
          <NotificationsIcon fontSize="small" />
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
      
      <MenuItem onClick={() => { navigate('/admin/announcements'); handleMenuClose(); }}>
        <ListItemIcon>
          <CampaignIcon fontSize="small" />
        </ListItemIcon>
        Announcements
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
      color="default" 
      elevation={0} 
      sx={{ 
        borderBottom: '1px solid #e0e0e0',
        zIndex: 1100,
        bgcolor: '#1C392B'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo height={40} />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
            />
          </Search>
          
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit" 
              onClick={handleNotificationsOpen}
              sx={{ 
                mr: 2, 
                color: 'white'
              }}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                mr: 1,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {profileData?.fullName || user?.name || 'Full Name'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {profileData?.jobTitle || user?.position || 'Position Title'}
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
                {!profilePictureUrl && (profileData?.fullName?.charAt(0) || 'L')}
              </Avatar>
            </Box>
          </Box>
        </Box>
      </Toolbar>
      {renderMenu}
      <NotificationsPopup
        anchorEl={notificationsAnchorEl}
        open={isNotificationsOpen}
        onClose={handleNotificationsClose}
      />
    </AppBar>
  );
};

export default AdminHeader; 