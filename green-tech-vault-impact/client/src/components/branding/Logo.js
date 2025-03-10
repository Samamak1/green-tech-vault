import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Logo = ({ variant = 'default', size = 'medium', showText = true, showTagline = false, linkTo = '/' }) => {
  // Size configurations
  const sizeConfig = {
    small: {
      iconSize: 24,
      textVariant: 'subtitle1',
      taglineVariant: 'caption',
      spacing: 1,
    },
    medium: {
      iconSize: 32,
      textVariant: 'h6',
      taglineVariant: 'caption',
      spacing: 1.5,
    },
    large: {
      iconSize: 40,
      textVariant: 'h5',
      taglineVariant: 'body2',
      spacing: 2,
    },
  };

  // Variant configurations
  const variantConfig = {
    default: {
      iconBgColor: 'transparent',
      iconColor: '#8a9a5b', // Olive green
      textColor: '#8a9a5b', // Olive green
      textSecondaryColor: '#8a9a5b', // Olive green
      taglineColor: '#8a9a5b', // Olive green
    },
    light: {
      iconBgColor: 'transparent',
      iconColor: '#ffffff',
      textColor: '#ffffff',
      textSecondaryColor: '#ffffff',
      taglineColor: '#ffffff',
    },
    dark: {
      iconBgColor: 'transparent',
      iconColor: '#8a9a5b',
      textColor: '#8a9a5b',
      textSecondaryColor: '#8a9a5b',
      taglineColor: '#8a9a5b',
    },
  };

  const { iconSize, textVariant, taglineVariant, spacing } = sizeConfig[size] || sizeConfig.medium;
  const { iconBgColor, iconColor, textColor, textSecondaryColor, taglineColor } = variantConfig[variant] || variantConfig.default;

  // Custom logo icon that matches the Arowwai Industries logo
  const LogoIcon = () => (
    <Box 
      sx={{ 
        position: 'relative',
        width: iconSize * 1.5,
        height: iconSize * 1.5,
        bgcolor: iconBgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Triangular logo shape */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        sx={{
          width: '100%',
          height: '100%',
          fill: iconColor,
        }}
      >
        <polygon points="50,10 90,90 10,90" />
      </Box>
    </Box>
  );

  const logoContent = (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'flex-start',
        textDecoration: 'none',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: spacing,
        }}
      >
        <LogoIcon />
        
        {showText && (
          <Typography 
            variant={textVariant} 
            component="span" 
            sx={{ 
              fontWeight: 500, 
              letterSpacing: 0.5,
              color: textColor,
              textDecoration: 'none',
              lineHeight: 1.2,
            }}
          >
            Arowwai Industries
          </Typography>
        )}
      </Box>
      
      {showTagline && (
        <Typography 
          variant={taglineVariant} 
          component="span" 
          sx={{ 
            color: taglineColor,
            letterSpacing: 0.5,
            mt: 0.5,
            fontSize: '0.7rem',
            ml: iconSize * 1.5 + spacing * 8, // Align with the text above
          }}
        >
          Sustainable solutions for tomorrow
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