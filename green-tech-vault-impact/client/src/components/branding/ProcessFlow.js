import React from 'react';
import { Box, Typography, Paper, Grid, Container, useTheme } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import RecyclingIcon from '@mui/icons-material/Recycling';
import BarChartIcon from '@mui/icons-material/BarChart';

const ProcessStep = ({ icon, title, description, isLast }) => {
  const theme = useTheme();
  
  return (
    <Grid item xs={12} sm={6} md={isLast ? 12 : 2.4}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        position: 'relative',
        height: '100%',
        '&:after': !isLast ? {
          content: '""',
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '20%',
          height: '2px',
          backgroundColor: theme.palette.secondary.main,
          display: { xs: 'none', md: 'block' }
        } : {}
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%',
            height: '100%',
            bgcolor: 'primary.light',
            color: 'white',
            borderRadius: 2
          }}
        >
          <Box 
            sx={{ 
              bgcolor: 'secondary.main', 
              p: 1.5, 
              borderRadius: '50%', 
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {description}
          </Typography>
        </Paper>
      </Box>
    </Grid>
  );
};

const ProcessFlow = () => {
  const steps = [
    {
      icon: <ScheduleIcon fontSize="large" />,
      title: "SCHEDULE",
      description: "Schedule a pickup for your e-waste through our easy online form."
    },
    {
      icon: <LocalShippingIcon fontSize="large" />,
      title: "COLLECT",
      description: "Our team collects your devices from your location at the scheduled time."
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "SECURE",
      description: "All data is securely wiped from devices following industry standards."
    },
    {
      icon: <RecyclingIcon fontSize="large" />,
      title: "PROCESS",
      description: "Devices are refurbished, repurposed, or responsibly recycled."
    },
    {
      icon: <BarChartIcon fontSize="large" />,
      title: "IMPACT",
      description: "Receive detailed reports on your environmental impact and data security."
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
        OUR PROCESS
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <ProcessStep 
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            isLast={index === steps.length - 1}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default ProcessFlow; 