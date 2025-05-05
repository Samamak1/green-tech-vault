import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Description as DescriptionIcon,
  Email as EmailIcon,
  Announcement as AnnouncementIcon,
  AccessTime as AccessTimeIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Logo from '../branding/Logo';

const ClientSidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSubmenuClick = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon sx={{ color: '#fff' }} />,
      path: '/dashboard',
    },
    {
      text: 'RYGN Profile',
      icon: <PersonIcon sx={{ color: '#fff' }} />,
      path: '/dashboard/rgyn-profile',
    },
    {
      text: 'Calendar',
      icon: <EventIcon sx={{ color: '#fff' }} />,
      path: '/dashboard/pickups', // Calendar is now the pickups page
    },
    {
      text: 'Reports',
      icon: <DescriptionIcon sx={{ color: '#fff' }} />,
      path: '/dashboard/reports',
    },
    {
      text: 'Messages',
      icon: <EmailIcon sx={{ color: '#fff' }} />,
      path: '/dashboard/messages',
    },
    {
      text: 'Announcements',
      icon: <AnnouncementIcon sx={{ color: '#fff' }} />,
      path: '/dashboard/announcements',
    },
    {
      text: 'Schedule Pickup',
      icon: <AccessTimeIcon sx={{ color: '#fff' }} />,
      path: '/admin/schedule-pickup',
    },
  ];

  // Check if a menu item is selected
  const isSelected = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  return (
    <Box
      sx={{
        width: 225, // 5 grid cells * 45px
        backgroundColor: '#1C392B',
        color: '#fff',
        height: '100vh',
        position: 'fixed',
        zIndex: 1400,
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.1)',
        }
      }}
    >
      {/* Top Empty Area - aligned with header height */}
      <Box
        sx={{
          height: '64px', // Match header height
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07)',
        }}
      />

      {/* Menu Items */}
      <List sx={{ pt: 1, pb: 1, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={isSelected(item.path)}
              sx={{
                minHeight: 48,
                px: 2.5,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1.5,
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.9rem',
                  },
                }}
              />
              {item.subItems && (
                openSubmenu === item.text ? <ExpandLess /> : <ExpandMore />
              )}
            </ListItemButton>
            
            {/* Submenu if exists */}
            {item.subItems && (
              <Collapse in={openSubmenu === item.text} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      component={RouterLink}
                      to={subItem.path}
                      selected={location.pathname === subItem.path}
                      sx={{
                        pl: 4,
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.12)',
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, mr: 1, color: 'inherit' }}>
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={subItem.text} 
                        sx={{ 
                          '& .MuiListItemText-primary': { 
                            fontSize: '0.85rem' 
                          } 
                        }} 
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ClientSidebar; 