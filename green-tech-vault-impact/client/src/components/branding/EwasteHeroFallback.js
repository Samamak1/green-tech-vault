import React from 'react';
import { Box, Typography } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';
import DevicesIcon from '@mui/icons-material/Devices';

const EwasteHeroFallback = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 300,
        bgcolor: '#1a1a1a',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        boxShadow: 4,
      }}
    >
      <Box sx={{ display: 'flex', mb: 2 }}>
        <RecyclingIcon sx={{ color: '#8cc63f', fontSize: 60, mr: 2 }} />
        <DevicesIcon sx={{ color: '#8cc63f', fontSize: 60 }} />
      </Box>
      <Typography variant="h5" sx={{ color: '#8cc63f', textAlign: 'center', mb: 1 }}>
        E-Waste Collection & Recycling
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
        Responsible disposal of electronic devices to protect our environment
      </Typography>
    </Box>
  );
};

export default EwasteHeroFallback; 