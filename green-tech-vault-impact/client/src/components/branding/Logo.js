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
      iconColor: '#c70039', // Changed from olive green to rich red
      textColor: '#c70039', // Changed from olive green to rich red
      textSecondaryColor: '#c70039', // Changed from olive green to rich red
      taglineColor: '#c70039', // Changed from olive green to rich red
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
      iconColor: '#c70039', // Changed from olive green to rich red
      textColor: '#c70039', // Changed from olive green to rich red
      textSecondaryColor: '#c70039', // Changed from olive green to rich red
      taglineColor: '#c70039', // Changed from olive green to rich red
    },
  };

  const { iconSize, textVariant, taglineVariant, spacing } = sizeConfig[size] || sizeConfig.medium;
  const { iconBgColor, iconColor, textColor, textSecondaryColor, taglineColor } = variantConfig[variant] || variantConfig.default;

  // Custom logo icon that matches the E-Waste company logo in the images
  const LogoIcon = () => (
    <Box 
      sx={{ 
        position: 'relative',
        width: iconSize * 1.8,
        height: iconSize * 1.8,
        bgcolor: iconBgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${iconColor}`,
        borderRadius: '4px',
      }}
    >
      {/* Camera-like logo shape with mountains inside */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        sx={{
          width: '80%',
          height: '80%',
          fill: iconColor,
        }}
      >
        {/* Outer border */}
        <rect x="10" y="15" width="80" height="70" fill="none" stroke={iconColor} strokeWidth="4" />
        
        {/* Camera-like circle */}
        <circle cx="30" cy="35" r="8" />
        
        {/* Mountains */}
        <polygon points="20,65 40,45 60,65" />
        <polygon points="45,65 65,45 85,65" />
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
            EcoCycle Solutions
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
          Responsible E-Waste Recycling
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