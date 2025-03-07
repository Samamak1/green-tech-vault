import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Recycling as RecyclingIcon,
  Co2 as Co2Icon,
  Forest as ForestIcon,
  DirectionsCar as CarIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { dashboardAPI } from '../services/api';
import { formatNumber, formatWeight, formatCO2, getDeviceTypeColor, getDispositionColor } from '../utils/environmentalImpact';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState({
    ewaste: null,
    co2: null,
    deviceTypes: null,
    disposition: null
  });
  const [recentPickups, setRecentPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('year');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch summary data
        const summaryRes = await dashboardAPI.getSummary();
        setSummary(summaryRes.data.data);
        
        // Fetch chart data for different metrics
        const ewasteChartRes = await dashboardAPI.getChartData('ewaste', period);
        const co2ChartRes = await dashboardAPI.getChartData('co2', period);
        const deviceTypesChartRes = await dashboardAPI.getChartData('deviceTypes', period);
        const dispositionChartRes = await dashboardAPI.getChartData('disposition', period);
        
        setChartData({
          ewaste: ewasteChartRes.data.data,
          co2: co2ChartRes.data.data,
          deviceTypes: deviceTypesChartRes.data.data,
          disposition: dispositionChartRes.data.data
        });
        
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
  }, [period]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleViewPickup = (id) => {
    navigate(`/pickups/${id}`);
  };

  // Prepare chart configurations
  const ewasteChartConfig = chartData.ewaste ? {
    labels: chartData.ewaste.labels,
    datasets: [
      {
        label: 'E-Waste Collected (kg)',
        data: chartData.ewaste.values,
        backgroundColor: 'rgba(46, 125, 50, 0.6)',
        borderColor: 'rgba(46, 125, 50, 1)',
        borderWidth: 1
      }
    ]
  } : null;

  const co2ChartConfig = chartData.co2 ? {
    labels: chartData.co2.labels,
    datasets: [
      {
        label: 'CO₂ Emissions Saved (kg)',
        data: chartData.co2.values,
        fill: true,
        backgroundColor: 'rgba(0, 121, 107, 0.2)',
        borderColor: 'rgba(0, 121, 107, 1)',
        tension: 0.4
      }
    ]
  } : null;

  const deviceTypesChartConfig = chartData.deviceTypes ? {
    labels: chartData.deviceTypes.labels,
    datasets: [
      {
        label: 'Device Types',
        data: chartData.deviceTypes.values,
        backgroundColor: chartData.deviceTypes.labels.map(type => getDeviceTypeColor(type)),
        borderWidth: 1
      }
    ]
  } : null;

  const dispositionChartConfig = chartData.disposition ? {
    labels: chartData.disposition.labels,
    datasets: [
      {
        label: 'Disposition',
        data: chartData.disposition.values,
        backgroundColor: chartData.disposition.labels.map(disp => getDispositionColor(disp)),
        borderWidth: 1
      }
    ]
  } : null;

  if (loading && !summary) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Environmental Impact Dashboard
        </Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="period-select-label">Time Period</InputLabel>
          <Select
            labelId="period-select-label"
            id="period-select"
            value={period}
            label="Time Period"
            onChange={handlePeriodChange}
          >
            <MenuItem value="month">Last 30 Days</MenuItem>
            <MenuItem value="quarter">Last Quarter</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RecyclingIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6" component="div">
                  Total E-Waste
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {formatWeight(summary?.totalWeightCollected || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {formatNumber(summary?.totalDevicesCollected || 0)} devices collected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Co2Icon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6" component="div">
                  CO₂ Emissions Saved
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {formatCO2(summary?.totalCO2Saved || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Through recycling and refurbishment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ForestIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6" component="div">
                  Equivalent Trees
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {formatNumber(summary?.environmentalEquivalents?.trees || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Annual CO₂ absorption equivalent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CarIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6" component="div">
                  Cars Off Road
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {summary?.environmentalEquivalents?.cars.toFixed(2) || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Annual emissions equivalent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="E-Waste Collection Over Time" />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              {ewasteChartConfig ? (
                <Bar 
                  data={ewasteChartConfig} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="CO₂ Emissions Saved" />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              {co2ChartConfig ? (
                <Line 
                  data={co2ChartConfig} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Device Types Collected" />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              {deviceTypesChartConfig ? (
                <Pie 
                  data={deviceTypesChartConfig} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Disposition Breakdown" />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              {dispositionChartConfig ? (
                <Pie 
                  data={dispositionChartConfig} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Pickups Table */}
      <Card sx={{ mb: 4 }}>
        <CardHeader 
          title="Recent Pickups" 
          action={
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => navigate('/pickups')}
            >
              View All
            </Button>
          }
        />
        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="recent pickups table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Devices</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">CO₂ Saved</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPickups.length > 0 ? (
                recentPickups.map((pickup) => (
                  <TableRow key={pickup._id}>
                    <TableCell component="th" scope="row">
                      {new Date(pickup.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {pickup.location.city}, {pickup.location.state}
                    </TableCell>
                    <TableCell align="right">{pickup.deviceCount}</TableCell>
                    <TableCell align="right">{formatWeight(pickup.totalWeight)}</TableCell>
                    <TableCell align="right">{formatCO2(pickup.impactSummary.co2Saved)}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small" 
                          onClick={() => handleViewPickup(pickup._id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
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
      </Card>

      {/* Materials Recovered Section */}
      <Card>
        <CardHeader title="Materials Recovered" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Metals
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {formatWeight(summary?.materialsRecovered?.metals || 0)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Plastics
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {formatWeight(summary?.materialsRecovered?.plastics || 0)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Glass
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {formatWeight(summary?.materialsRecovered?.glass || 0)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Rare Earth Metals
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {formatWeight(summary?.materialsRecovered?.rareEarthMetals || 0)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard; 