import React from 'react';
import { Box, Typography, Container, Button, AppBar, Toolbar, InputBase, Avatar, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../branding/Logo';

const BrandedHeader = ({ userName = "Anna Katrina Marchesi", userRole = "Head of Administrator", userAvatar = null }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1e1e1e', boxShadow: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }} elevation={0}>
      <Toolbar>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo variant="light" size="medium" showTagline={false} />
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2
          }}>
            {/* Search Box */}
            <Box sx={{ 
              position: 'relative',
              borderRadius: 1,
              border: '1px solid #8a9a5b',
              bgcolor: 'transparent',
              width: 300,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <SearchIcon sx={{ color: '#8a9a5b' }} />
              </Box>
              <InputBase
                placeholder="Search here"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    p: 1,
                  },
                }}
              />
            </Box>
            
            {/* User Info */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1.5
            }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 500 }}>
                  {userName}
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: '#8a9a5b', 
                  bgcolor: 'rgba(138, 154, 91, 0.1)', 
                  px: 1, 
                  py: 0.5, 
                  borderRadius: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5
                }}>
                  <Box component="span" sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: '#8a9a5b',
                    display: 'inline-block'
                  }}></Box>
                  {userRole}
                </Typography>
              </Box>
              <Avatar 
                src={userAvatar} 
                alt={userName}
                sx={{ 
                  width: 48, 
                  height: 48,
                  border: '2px solid #8a9a5b'
                }}
              />
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default BrandedHeader; 