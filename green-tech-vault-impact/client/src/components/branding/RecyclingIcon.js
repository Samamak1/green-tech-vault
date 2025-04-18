import React from 'react';
import { Box } from '@mui/material';

const RecyclingIcon = ({ size = 200, color = 'black' }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
      }}
    >
      <svg 
        viewBox="0 0 200 200" 
        width={size} 
        height={size} 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer rectangular frame */}
        <rect 
          x="30" 
          y="40" 
          width="140" 
          height="120" 
          stroke={color} 
          strokeWidth="8" 
          rx="4" 
          ry="4" 
          fill="none" 
        />
        
        {/* Camera-like circle in top left */}
        <circle 
          cx="60" 
          cy="70" 
          r="15" 
          fill={color} 
        />
        
        {/* Mountain/triangle shapes */}
        <polygon 
          points="50,120 80,80 110,120" 
          fill={color} 
        />
        
        <polygon 
          points="90,120 120,80 150,120" 
          fill={color} 
        />
      </svg>
    </Box>
  );
};

export default RecyclingIcon; 