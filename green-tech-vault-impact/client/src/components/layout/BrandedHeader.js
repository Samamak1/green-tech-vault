import React from 'react';
import { Box, Typography, Container, Button, AppBar, Toolbar, InputBase, Avatar, IconButton, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../branding/Logo';

const BrandedHeader = ({ userName = "Anna Katrina Marchesi", userRole = "Head of Administrator", userAvatar = null }) => {
  const theme = useTheme();
  
  // Return an invisible header that takes up no space, instead of removing it completely
  return (
    <Box sx={{ height: 0, overflow: 'hidden', display: 'none' }}>
      {/* Hidden content but structure preserved */}
      <AppBar position="static" sx={{ visibility: 'hidden', height: 0 }}>
        <Toolbar sx={{ height: 0 }}></Toolbar>
      </AppBar>
    </Box>
  );
};

export default BrandedHeader; 