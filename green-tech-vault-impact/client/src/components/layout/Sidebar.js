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
import Logo from '../branding/Logo';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { logout } = useAuth();
  
  const menuItems = [
    { icon: <DashboardIcon />, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: <BarChartIcon />, text: 'Statistics', path: '/admin/statistics' },
    { icon: <DescriptionIcon />, text: 'Reports', path: '/admin/reports' },
    { icon: <StorageIcon />, text: 'Database', path: '/admin/database' },
    { icon: <GroupIcon />, text: 'Team', path: '/admin/team' },
    { icon: <CampaignIcon />, text: 'Promotion', path: '/admin/promotion' },
    { divider: true },
    { icon: <StoreIcon />, text: 'My Store', path: '/admin/store' },
    { icon: <NotificationsIcon />, text: 'Notifications', path: '/admin/notifications' },
    { icon: <SettingsIcon />, text: 'Settings', path: '/admin/settings' },
  ];

  const handleNavigation = (path) => {
    if (path === '/logout') {
      logout();
      navigate('/admin/login');
    } else {
      navigate(path);
    }
  };

  return (
    <Box sx={{ 
      width: 240,
      height: '100vh',
      bgcolor: '#1C392B',
      color: 'white',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1200,
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
    }}>
      <Box sx={{ 
        p: 2, 
        mb: 2, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,  // Match header height
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
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
                    background: 'rgba(255, 255, 255, 0.15)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)',
                    }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
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