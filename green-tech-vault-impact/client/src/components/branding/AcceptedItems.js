import React from 'react';
import { Box, Typography, Grid, Container, Paper, useTheme } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PrintIcon from '@mui/icons-material/Print';
import TvIcon from '@mui/icons-material/Tv';
import RouterIcon from '@mui/icons-material/Router';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import CableIcon from '@mui/icons-material/Cable';

const ItemCategory = ({ icon, title, items }) => {
  const theme = useTheme();
  
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          height: '100%',
          borderTop: `4px solid ${theme.palette.secondary.main}`,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 4
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box 
            sx={{ 
              color: 'primary.main', 
              mr: 1.5,
              display: 'flex'
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {title}
          </Typography>
        </Box>
        
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          {items.map((item, index) => (
            <Box component="li" key={index} sx={{ mb: 1 }}>
              <Typography variant="body2">{item}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Grid>
  );
};

const AcceptedItems = () => {
  const categories = [
    {
      icon: <ComputerIcon fontSize="large" />,
      title: "Computers",
      items: [
        "Desktop Computers",
        "Laptops",
        "Servers",
        "Tablets",
        "Monitors"
      ]
    },
    {
      icon: <PhoneAndroidIcon fontSize="large" />,
      title: "Mobile Devices",
      items: [
        "Smartphones",
        "Cell Phones",
        "PDAs",
        "Smart Watches",
        "E-Readers"
      ]
    },
    {
      icon: <PrintIcon fontSize="large" />,
      title: "Office Equipment",
      items: [
        "Printers",
        "Scanners",
        "Fax Machines",
        "Copiers",
        "Shredders"
      ]
    },
    {
      icon: <TvIcon fontSize="large" />,
      title: "Entertainment",
      items: [
        "Televisions",
        "DVD/Blu-ray Players",
        "Gaming Consoles",
        "Audio Equipment",
        "Streaming Devices"
      ]
    },
    {
      icon: <RouterIcon fontSize="large" />,
      title: "Networking",
      items: [
        "Routers",
        "Modems",
        "Switches",
        "Hubs",
        "Network Cards"
      ]
    },
    {
      icon: <KeyboardIcon fontSize="large" />,
      title: "Peripherals",
      items: [
        "Keyboards",
        "Mice",
        "Webcams",
        "External Drives",
        "USB Devices"
      ]
    },
    {
      icon: <BatteryFullIcon fontSize="large" />,
      title: "Power Equipment",
      items: [
        "Batteries",
        "Power Supplies",
        "UPS Systems",
        "Chargers",
        "Adapters"
      ]
    },
    {
      icon: <CableIcon fontSize="large" />,
      title: "Cables & Misc",
      items: [
        "Cables",
        "Wires",
        "Circuit Boards",
        "Memory Cards",
        "Toner Cartridges"
      ]
    }
  ];

  return (
    <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
          ACCEPTED ITEMS
        </Typography>
        
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <ItemCategory 
              key={index}
              icon={category.icon}
              title={category.title}
              items={category.items}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AcceptedItems; 