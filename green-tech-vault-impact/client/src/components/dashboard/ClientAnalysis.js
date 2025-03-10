import React from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const ClientAnalysis = () => {
  const theme = useTheme();
  
  // Sample data for the client gender distribution
  const data = [
    { name: 'Female', value: 70 },
    { name: 'Male', value: 30 },
  ];
  
  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];
  
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">Client Analysis</Typography>
        <Typography 
          variant="body2" 
          component="a" 
          href="#" 
          sx={{ 
            color: theme.palette.primary.main, 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Read More
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 2, 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
              {/* Female Clients */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: theme.palette.primary.main 
                }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FemaleIcon sx={{ color: theme.palette.primary.main, mr: 0.5 }} />
                  <Typography variant="body1">Female Clients</Typography>
                </Box>
              </Box>
              
              {/* Male Clients */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: theme.palette.secondary.main 
                }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MaleIcon sx={{ color: theme.palette.secondary.main, mr: 0.5 }} />
                  <Typography variant="body1">Male Clients</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              background: theme.palette.background.gradient,
              color: 'white',
              p: 2, 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              zIndex: 1
            }}>
              <Typography variant="h3" sx={{ fontWeight: 500, mb: 1 }}>70%</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  On average,
                </Typography>
                <Typography variant="body1">
                  7 out of 10 clients are
                </Typography>
                <Box 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    px: 2, 
                    py: 0.5, 
                    borderRadius: 1,
                    display: 'inline-block',
                    mt: 0.5
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Female
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ 
              position: 'absolute', 
              right: -20, 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: 150,
              height: 150,
              opacity: 0.8
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientAnalysis; 