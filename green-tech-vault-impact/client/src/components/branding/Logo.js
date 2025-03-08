import React from 'react';
import { Box, Typography } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { Link as RouterLink } from 'react-router-dom';

const Logo = ({ variant = 'default', size = 'medium', showText = true, linkTo = '/' }) => {
  // Size configurations
  const sizeConfig = {
    small: {
      iconSize: 24,
      textVariant: 'subtitle1',
      spacing: 1,
    },
    medium: {
      iconSize: 32,
      textVariant: 'h6',
      spacing: 1.5,
    },
    large: {
      iconSize: 40,
      textVariant: 'h5',
      spacing: 2,
    },
  };

  // Variant configurations
  const variantConfig = {
    default: {
      iconColor: 'primary.main',
      textColor: 'text.primary',
    },
    light: {
      iconColor: 'white',
      textColor: 'white',
    },
    dark: {
      iconColor: 'primary.dark',
      textColor: 'text.primary',
    },
  };

  const { iconSize, textVariant, spacing } = sizeConfig[size] || sizeConfig.medium;
  const { iconColor, textColor } = variantConfig[variant] || variantConfig.default;

  const logoContent = (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: spacing,
        textDecoration: 'none',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: iconColor,
          color: 'white',
          borderRadius: '50%',
          width: iconSize * 1.5,
          height: iconSize * 1.5,
        }}
      >
        <RecyclingIcon sx={{ fontSize: iconSize }} />
      </Box>
      
      {showText && (
        <Typography 
          variant={textVariant} 
          component="span" 
          sx={{ 
            fontWeight: 'bold', 
            letterSpacing: 1,
            color: textColor,
            textDecoration: 'none',
          }}
        >
          GREEN TECH VAULT
        </Typography>
      )}
    </Box>
  );

  // If linkTo is provided, wrap the logo in a RouterLink
  if (linkTo) {
    return (
      <RouterLink to={linkTo} style={{ textDecoration: 'none' }}>
        {logoContent}
      </RouterLink>
    );
  }

  return logoContent;
};

export default Logo; 