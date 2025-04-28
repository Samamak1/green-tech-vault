import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ComputerIcon from '@mui/icons-material/Computer';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import StoreIcon from '@mui/icons-material/Store';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Logo from '../branding/Logo';
import { useAuth } from '../../context/AuthContext';

const ClientSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { logout } = useAuth();
  
  const menuItems = [
    { icon: <DashboardIcon />, text: 'Dashboard', path: '/dashboard' },
    { icon: <ComputerIcon />, text: 'Devices', path: '/dashboard/devices' },
    { icon: <CalendarMonthIcon />, text: 'Pickups', path: '/dashboard/pickups' },
    { icon: <DescriptionIcon />, text: 'Reports', path: '/dashboard/reports' },
    { icon: <EmailIcon />, text: 'Messages', path: '/dashboard/messages' },
    { icon: <AnnouncementIcon />, text: 'Announcements', path: '/dashboard/announcements' },
    { icon: <EventAvailableIcon />, text: 'Schedule Pickup', path: '/dashboard/schedule-pickup' },
    { icon: <BarChartIcon />, text: 'Statistics', path: '/dashboard/statistics' },
    { icon: <StoreIcon />, text: 'Store', path: '/dashboard/store' },
    { icon: <SettingsIcon />, text: 'Settings', path: '/dashboard/settings' },
    { icon: <HelpIcon />, text: 'Help', path: '/dashboard/help' },
  ];

  const handleNavigation = (path) => {
    if (path === '/logout') {
      logout();
      navigate('/login');
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
      boxShadow: 'none'
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
        {menuItems.map((item, index) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                selected={isSelected}
                sx={{ 
                  borderRadius: 1,
                  backgroundColor: isSelected ? '#0F261D' : 'transparent',
                  '&.Mui-selected': {
                    backgroundColor: '#0F261D',
                    '&:hover': {
                      backgroundColor: '#0F261D',
                    }
                  },
                  '&:hover': {
                    bgcolor: isSelected ? '#0F261D' : 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      fontWeight: isSelected ? 500 : 400
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ClientSidebar; 