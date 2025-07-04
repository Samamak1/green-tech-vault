import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Logo = ({ variant = 'default', size = 'medium', showText = true, showTagline = false, linkTo = '/' }) => {
  // Size configurations
  const sizeConfig = {
    small: {
      iconSize: 24,
      textVariant: 'h4',
      taglineVariant: 'body1',
      spacing: 1,
    },
    medium: {
      iconSize: 32,
      textVariant: 'h3',
      taglineVariant: 'body1',
      spacing: 1.5,
    },
    large: {
      iconSize: 40,
      textVariant: 'h2',
      taglineVariant: 'h6',
      spacing: 2,
    },
  };

  // Variant configurations
  const variantConfig = {
    default: {
      iconBgColor: 'transparent',
      iconColor: '#c70039',
      textColor: '#c70039',
      textSecondaryColor: '#c70039',
      taglineColor: '#c70039',
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
      iconColor: '#c70039',
      textColor: '#c70039',
      textSecondaryColor: '#c70039',
      taglineColor: '#c70039',
    },
    admin: {
      iconBgColor: 'transparent',
      iconColor: '#1C392B',
      textColor: '#1C392B',
      textSecondaryColor: '#1C392B',
      taglineColor: '#1C392B',
    }
  };

  const { iconSize, textVariant, taglineVariant, spacing } = sizeConfig[size] || sizeConfig.medium;
  const { iconBgColor, iconColor, textColor, textSecondaryColor, taglineColor } = variantConfig[variant] || variantConfig.default;

  // Custom logo icon that uses the RYGNeco logo image
  const LogoIcon = () => (
    <Box 
      component="img"
      src="/images/logo.png"
      alt="RYGNeco Logo"
      sx={{ 
        width: iconSize * 5.4,
        height: iconSize * 5.4,
        objectFit: 'contain'
      }}
    />
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
            {variant === 'admin' ? 'RYGNeco Admin' : 'RYGNeco'}
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
            ml: iconSize * 1.5 + spacing * 8,
          }}
        >
          {variant === 'admin' ? 'Admin Portal' : 'Responsible E-Waste Recycling'}
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