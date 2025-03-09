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
      iconBgColor: '#0e1001', // Dark green/black background
      iconRingColor: '#8cc63f', // Bright green ring
      iconCenterColor: '#8cc63f', // Bright green center
      textColor: '#8cc63f', // Green text
      textSecondaryColor: 'white', // White for "VAULT"
      taglineColor: '#8cc63f', // Green tagline
    },
    light: {
      iconBgColor: '#0e1001',
      iconRingColor: '#8cc63f',
      iconCenterColor: '#8cc63f',
      textColor: 'white',
      textSecondaryColor: 'white',
      taglineColor: 'white',
    },
    dark: {
      iconBgColor: '#0e1001',
      iconRingColor: '#8cc63f',
      iconCenterColor: '#8cc63f',
      textColor: '#8cc63f',
      textSecondaryColor: 'white',
      taglineColor: '#8cc63f',
    },
  };

  const { iconSize, textVariant, taglineVariant, spacing } = sizeConfig[size] || sizeConfig.medium;
  const { iconBgColor, iconRingColor, iconCenterColor, textColor, textSecondaryColor, taglineColor } = variantConfig[variant] || variantConfig.default;

  // Custom logo icon that matches the image
  const LogoIcon = () => (
    <Box 
      sx={{ 
        position: 'relative',
        width: iconSize * 1.5,
        height: iconSize * 1.5,
        bgcolor: iconBgColor,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer ring */}
      <Box 
        sx={{ 
          position: 'absolute',
          width: '80%',
          height: '80%',
          border: `2px solid ${iconRingColor}`,
          borderRadius: '50%',
        }}
      />
      
      {/* Inner circle */}
      <Box 
        sx={{ 
          width: '40%',
          height: '40%',
          bgcolor: iconCenterColor,
          borderRadius: '50%',
        }}
      />
      
      {/* Cross lines */}
      <Box 
        sx={{ 
          position: 'absolute',
          width: '100%',
          height: '2px',
          bgcolor: iconRingColor,
          transform: 'rotate(45deg)',
        }}
      />
      <Box 
        sx={{ 
          position: 'absolute',
          width: '100%',
          height: '2px',
          bgcolor: iconRingColor,
          transform: 'rotate(-45deg)',
        }}
      />
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
          <Stack direction="column" spacing={0}>
            <Typography 
              variant={textVariant} 
              component="span" 
              sx={{ 
                fontWeight: 'bold', 
                letterSpacing: 1,
                color: textColor,
                textDecoration: 'none',
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: textColor }}>GREEN</span>
              <span style={{ color: textColor }}>TECH</span>
            </Typography>
            <Typography 
              variant={textVariant} 
              component="span" 
              sx={{ 
                fontWeight: 'bold', 
                letterSpacing: 1,
                color: textSecondaryColor,
                textDecoration: 'none',
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              VAULT
            </Typography>
            
            {showTagline && (
              <Typography 
                variant={taglineVariant} 
                component="span" 
                sx={{ 
                  color: taglineColor,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  mt: 0.5,
                  fontSize: '0.7rem',
                }}
              >
                KEEP IT GREEN. KEEP IT SAFE. KEEP IT CONNECTED.
              </Typography>
            )}
          </Stack>
        )}
      </Box>
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