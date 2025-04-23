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
  ListItemIcon
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
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
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '400px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '1px solid #ddd',
  borderRadius: '4px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'gray',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const AdminHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      // You would typically navigate to search results or filter the current view
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

  const isMenuOpen = Boolean(anchorEl);

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
          sx={{ 
            width: 70, 
            height: 70, 
            mx: 'auto', 
            mb: 1,
            backgroundColor: '#1C392B',
          }}
        >
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Full Name
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: 'white', 
          color: 'black',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
          borderBottom: 'none',
          minHeight: '64px',
          mb: '-1px'
        }}
      >
        <Toolbar sx={{ bgcolor: 'white' }}>
          <Box
            sx={{ 
              height: 40,
              width: 40,
              mr: 1,
              display: { xs: 'none', sm: 'block' } 
            }}
          >
            <Logo size="small" variant="admin" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              color: '#1C392B',
              fontWeight: 'bold',
              mr: 2
            }}
          >
            Green Tech Vault Admin
          </Typography>
          
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
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-end',
              mr: 1,
              display: { xs: 'none', sm: 'flex' }
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Full Name
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Position Title
              </Typography>
            </Box>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ 
                ml: 1,
                border: '1px solid #ddd', 
                borderRadius: '50%', 
                p: 0.5
              }}
            >
              <Avatar sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default AdminHeader; 