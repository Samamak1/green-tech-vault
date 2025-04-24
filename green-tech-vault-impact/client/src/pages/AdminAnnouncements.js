import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';

const AdminAnnouncements = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Content for the Schedule Pickup page goes here */}
            <Typography variant="body1">
              This page allows administrators to manage pickup schedules.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminAnnouncements; 