import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import EmailIcon from '@mui/icons-material/Email';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledSidebar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: 240,
  height: '100vh',
  backgroundColor: '#fff',
  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.05)',
  paddingTop: '80px',
  zIndex: 100,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <DashboardIcon />, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: <PeopleAltIcon />, text: 'Clients', path: '/admin/clients' },
    { icon: <DevicesOtherIcon />, text: 'Devices', path: '/admin/devices' },
    { icon: <EmailIcon />, text: 'Messages', path: '/admin/messages' },
    { icon: <LocalShippingIcon />, text: 'Pickups', path: '/admin/pickups' },
    { icon: <InventoryIcon />, text: 'Inventory', path: '/admin/inventory' },
  ];
  
  const handleNavigation = (path) => {
    if (path === 'logout') {
      // TODO: Handle logout here
      console.log('Logout clicked');
      navigate('/login');
      return;
    }
    navigate(path);
  };
  
  return (
    <StyledSidebar>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="text"
              startIcon={item.icon}
              onClick={() => handleNavigation(item.path)}
              sx={{
                justifyContent: 'flex-start',
                color: (
                  (item.path === '/admin/dashboard' && location.pathname === '/admin') ||
                  location.pathname === item.path ||
                  (item.path === '/admin/messages' && location.pathname.includes('messages'))
                ) ? '#4ECDC4' : '#666',
                fontSize: '0.95rem',
                fontWeight: (
                  (item.path === '/admin/dashboard' && location.pathname === '/admin') ||
                  location.pathname === item.path ||
                  (item.path === '/admin/messages' && location.pathname.includes('messages'))
                ) ? '500' : '400',
                textTransform: 'none',
                width: '100%',
                pl: 4,
                pr: 2,
                py: 1.5,
                mb: 0.5,
                borderLeft: (
                  (item.path === '/admin/dashboard' && location.pathname === '/admin') ||
                  location.pathname === item.path ||
                  (item.path === '/admin/messages' && location.pathname.includes('messages'))
                ) ? '4px solid #4ECDC4' : '4px solid transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {item.text}
              </Typography>
            </Button>
          ))}
        </Box>
        
        <Box sx={{ p: 2, mt: 'auto' }}>
          <Divider sx={{ mb: 2 }} />
          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={() => handleNavigation('logout')}
            sx={{
              justifyContent: 'flex-start',
              color: '#666',
              fontSize: '0.95rem',
              textTransform: 'none',
              width: '100%',
              pl: 4,
              pr: 2,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              Logout
            </Typography>
          </Button>
        </Box>
      </Box>
    </StyledSidebar>
  );
};

export default Sidebar; 