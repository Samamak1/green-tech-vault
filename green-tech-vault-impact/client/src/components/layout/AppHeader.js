import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  InputBase, 
  Typography, 
  Menu, 
  MenuItem, 
  Divider,
  Avatar,
  ListItemIcon,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CampaignIcon from '@mui/icons-material/Campaign';
import Logo from '../branding/Logo';

// Styled search component
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: '#f5f5f5',
  border: '1px solid #e0e0e0',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  alignItems: 'center'
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

const AppHeader = ({ variant = 'simple' }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

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
    navigate('/login');
    handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-account-menu';
  
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          width: 250,
          mt: 1.5,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80, 
            mx: 'auto', 
            mb: 1.5,
            backgroundColor: '#1C392B',
          }}
        >
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.1rem', mb: 0.5 }}>
          Full Name
        </Typography>
      </Box>
      
      <Paper 
        elevation={0} 
        sx={{ 
          mx: 2, 
          mb: 2, 
          bgcolor: '#f5f5f5', 
          p: 1, 
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#555' }} />
        <Typography 
          variant="body2"
          onClick={handleLogout}
          sx={{ 
            cursor: 'pointer',
            color: '#333',
            fontWeight: 500,
            '&:hover': { color: '#1C392B' } 
          }}
        >
          Logout
        </Typography>
      </Paper>
      
      <Divider />
      
      <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <Typography>Profile</Typography>
      </MenuItem>
      
      <MenuItem onClick={() => { navigate('/notifications'); handleMenuClose(); }} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <NotificationsIcon fontSize="small" />
        </ListItemIcon>
        <Typography>Notifications</Typography>
      </MenuItem>
      
      <MenuItem onClick={() => { navigate('/settings'); handleMenuClose(); }} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <Typography>Settings</Typography>
      </MenuItem>
      
      <MenuItem onClick={() => { navigate('/qr-login'); handleMenuClose(); }} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <QrCodeIcon fontSize="small" />
        </ListItemIcon>
        <Typography>QR for Mobile Login</Typography>
      </MenuItem>
      
      <MenuItem onClick={() => { navigate('/announcements'); handleMenuClose(); }} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <CampaignIcon fontSize="small" />
        </ListItemIcon>
        <Typography>Green Tech Vault Announcements</Typography>
      </MenuItem>
      
      <Divider />
      
      <MenuItem onClick={() => { navigate('/help'); handleMenuClose(); }} sx={{ py: 1.5, justifyContent: 'center' }}>
        <HelpIcon fontSize="small" sx={{ mr: 1, color: '#666' }} />
        <Typography>Help</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        color: 'black',
        borderBottom: '1px solid #e0e0e0',
        height: '60px'
      }}
    >
      <Toolbar sx={{ minHeight: '60px', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Left side - Logo */}
          {variant === 'full' && (
            <Box sx={{ display: 'flex', alignItems: 'center', width: 240, pl: 1, pr: 2 }}>
              <Logo size="small" variant="admin" />
            </Box>
          )}

          {/* Center - Search */}
          {variant === 'full' && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Search>
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
          )}

          {/* For simple variant, add a spacer to push user info to right */}
          {variant === 'simple' && <Box sx={{ flexGrow: 1 }} />}

          {/* Right side - User info */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              mr: 1.5,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Full Name
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Position Title
              </Typography>
            </Box>
            
            <Avatar
              onClick={handleProfileMenuOpen}
              aria-controls={menuId}
              aria-haspopup="true"
              sx={{ 
                cursor: 'pointer',
                bgcolor: '#1C392B',
                color: 'white',
                width: 38,
                height: 38
              }}
            >
              <PersonIcon fontSize="small" />
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default AppHeader; 