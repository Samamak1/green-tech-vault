import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import StoreIcon from '@mui/icons-material/Store';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import Logo from '../branding/Logo';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  const menuItems = [
    { icon: <DashboardIcon />, text: 'Dashboard', path: '/dashboard' },
    { icon: <BarChartIcon />, text: 'Statistics', path: '/statistics' },
    { icon: <DescriptionIcon />, text: 'Reports', path: '/reports' },
    { icon: <StorageIcon />, text: 'Database', path: '/database' },
    { icon: <GroupIcon />, text: 'Team', path: '/team' },
    { icon: <CampaignIcon />, text: 'Promotion', path: '/promotion' },
    { divider: true },
    { icon: <StoreIcon />, text: 'My Store', path: '/store' },
    { icon: <NotificationsIcon />, text: 'Notifications', path: '/notifications' },
    { icon: <SettingsIcon />, text: 'Settings', path: '/settings' },
    { icon: <DeleteIcon />, text: 'Trash', path: '/trash' },
    { divider: true },
    { icon: <LogoutIcon />, text: 'Log Out', path: '/logout' },
    { icon: <HelpIcon />, text: 'Help', path: '/help' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ 
      width: 276,
      height: '100vh',
      bgcolor: '#1e1e1e',
      color: 'white',
      borderRight: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ p: 2, mb: 2 }}>
        <Logo variant="light" size="medium" />
      </Box>
      
      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item, index) => (
          item.divider ? (
            <Divider key={`divider-${index}`} sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
          ) : (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{ 
                  borderRadius: 1,
                  '&.Mui-selected': {
                    background: location.pathname === item.path ? theme.palette.background.gradient : 'rgba(138, 154, 91, 0.2)',
                    '&:hover': {
                      background: location.pathname === item.path ? theme.palette.background.gradient : 'rgba(138, 154, 91, 0.3)',
                    }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: location.pathname === item.path ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      color: location.pathname === item.path ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      fontWeight: location.pathname === item.path ? 500 : 400
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        ))}
      </List>
    </Box>
  );
};

export default Sidebar; 