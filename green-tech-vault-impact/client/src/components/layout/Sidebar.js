import React, { useState } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse, 
  Typography 
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import CampaignIcon from '@mui/icons-material/Campaign';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExperimentIcon from '@mui/icons-material/Science';
import PersonIcon from '@mui/icons-material/Person';

import Logo from '../branding/Logo';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSubmenuClick = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const menuItems = [
    { icon: <DashboardIcon />, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: <DescriptionIcon />, text: 'Reports', path: '/admin/reports' },
    { icon: <EmailIcon />, text: 'Messages', path: '/admin/messages' },
    { icon: <AnnouncementIcon />, text: 'Announcements', path: '/admin/announcements' },
    { icon: <CalendarMonthIcon />, text: 'Pickup Calendar', path: '/admin/pickup-calendar' },
    { icon: <ScheduleIcon />, text: 'Schedule Pickup', path: '/admin/schedule-pickup' },
    { icon: <ExperimentIcon />, text: 'Trial Page', path: '/admin/trial-page' },
    { icon: <PersonIcon />, text: 'Profile', path: '/admin/profile' },
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
      width: 225, // 5 grid cells * 45px
      height: '100vh',
      bgcolor: '#1C392B',
      color: 'white',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1200,
      boxShadow: 'none'
    }}>
      {/* Top Empty Area - aligned with header height */}
      <Box sx={{ 
        height: '64px', // Match header height
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07)'
      }}/>

      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item, index) => {
          // Check if this item is a submenu
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          
          // Check if this item is selected
          const isSelected = location.pathname === item.path || 
            (item.submenu && item.submenu.some(subItem => location.pathname === subItem.path));
          
          return (
            <React.Fragment key={item.text}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={hasSubmenu ? () => handleSubmenuClick(item.text) : () => handleNavigation(item.path)}
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
                  
                  {hasSubmenu && (
                    openSubmenu === item.text ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              
              {/* Submenu if exists */}
              {hasSubmenu && (
                <Collapse in={openSubmenu === item.text} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem) => (
                      <ListItem key={subItem.text} disablePadding>
                        <ListItemButton
                          onClick={() => handleNavigation(subItem.path)}
                          selected={location.pathname === subItem.path}
                          sx={{
                            pl: 4,
                            borderRadius: 1,
                            mb: 0.5,
                            '&.Mui-selected': {
                              backgroundColor: '#0F261D',
                              '&:hover': {
                                backgroundColor: '#0F261D',
                              }
                            },
                            '&:hover': {
                              bgcolor: location.pathname === subItem.path ? '#0F261D' : 'rgba(255, 255, 255, 0.1)',
                            }
                          }}
                        >
                          <ListItemIcon sx={{ 
                            color: location.pathname === subItem.path ? '#ffffff' : 'rgba(255,255,255,0.7)',
                            minWidth: 30
                          }}>
                            {subItem.icon}
                          </ListItemIcon>
                          
                          <ListItemText 
                            primary={subItem.text} 
                            sx={{
                              '& .MuiListItemText-primary': {
                                color: location.pathname === subItem.path ? '#ffffff' : 'rgba(255,255,255,0.7)',
                                fontWeight: location.pathname === subItem.path ? 500 : 400,
                                fontSize: '0.9rem'
                              } 
                            }} 
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar; 