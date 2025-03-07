import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { dashboardAPI } from '../services/api';

const SimpleDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [recentPickups, setRecentPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch summary data
        const summaryRes = await dashboardAPI.getSummary();
        setSummary(summaryRes.data.data);
        
        // Fetch recent pickups
        const recentPickupsRes = await dashboardAPI.getRecentPickups();
        setRecentPickups(recentPickupsRes.data.data);
        
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const handleViewPickup = (id) => {
    navigate(`/pickups/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Devices
              </Typography>
              <Typography variant="h3">
                {summary?.totalDevices || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                E-Waste Collected
              </Typography>
              <Typography variant="h3">
                {summary?.totalWeight ? `${summary.totalWeight.toFixed(1)} kg` : '0 kg'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                CO₂ Saved
              </Typography>
              <Typography variant="h3">
                {summary?.co2Saved ? `${summary.co2Saved.toFixed(1)} kg` : '0 kg'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pickups Completed
              </Typography>
              <Typography variant="h3">
                {summary?.pickupsCompleted || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Recent Pickups */}
      <Typography variant="h5" gutterBottom>
        Recent Pickups
      </Typography>
      <Paper sx={{ mb: 4 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Devices</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPickups.length > 0 ? (
                recentPickups.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell>{pickup.date}</TableCell>
                    <TableCell>{pickup.location}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          backgroundColor: 
                            pickup.status === 'completed' ? 'success.light' :
                            pickup.status === 'in-progress' ? 'warning.light' :
                            'info.light',
                          color: 'white'
                        }}
                      >
                        {pickup.status}
                      </Box>
                    </TableCell>
                    <TableCell>{pickup.devices}</TableCell>
                    <TableCell>{pickup.weight} kg</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewPickup(pickup.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No recent pickups found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/pickups')}
            sx={{ py: 2 }}
          >
            Schedule Pickup
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/devices')}
            sx={{ py: 2 }}
          >
            View Devices
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/reports')}
            sx={{ py: 2 }}
          >
            Generate Report
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/company-profile')}
            sx={{ py: 2 }}
          >
            Company Profile
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SimpleDashboard; 