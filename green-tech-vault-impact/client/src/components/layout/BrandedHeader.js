import React from 'react';
import { Box, Typography, Container, Button, AppBar, Toolbar, InputBase, Avatar, IconButton, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../branding/Logo';

const BrandedHeader = ({ userName = "Anna Katrina Marchesi", userRole = "Head of Administrator", userAvatar = null }) => {
  const theme = useTheme();
  
  // Return an empty fragment - removing the black bar completely
  return (
    <></>
  );
};

export default BrandedHeader; 