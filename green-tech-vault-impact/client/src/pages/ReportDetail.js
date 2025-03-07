import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  Download as DownloadIcon,
  Share as ShareIcon,
  ArrowBack as ArrowBackIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Park as ParkIcon,
  Devices as DevicesIcon,
  Recycling as RecyclingIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material';
import { reportAPI } from '../services/api';
import { formatDate } from '../utils/formatters';
import { formatWeight, formatCO2 } from '../utils/environmentalImpact';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReportDetails();
  }, [id]);

  const fetchReportDetails = async () => {
    try {
      setLoading(true);
      const res = await reportAPI.getReportById(id);
      setReport(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load report details');
      console.error('Report details fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const res = await reportAPI.downloadReport(id);
      
      // Create a blob from the response data
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      
      // Create a link element and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from content-disposition header or use default
      const contentDisposition = res.headers['content-disposition'];
      let filename = 'report';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Report download error:', err);
      setError('Failed to download report. Please try again.');
    }
  };

  const getReportTypeLabel = (type) => {
    switch (type) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'annual': return 'Annual';
      case 'custom': return 'Custom';
      default: return type;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!report && !loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Report not found. The report may have been deleted or you don't have permission to view it.
        </Alert>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/reports')}
          startIcon={<ArrowBackIcon />}
        >
          Back to Reports
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            sx={{ mr: 1 }}
            onClick={() => navigate('/reports')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            {report.title}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadReport}
            sx={{ mr: 1 }}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PieChartIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Report Type" 
                    secondary={getReportTypeLabel(report.type)} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Date Range" 
                    secondary={`${formatDate(report.dateRange.startDate)} - ${formatDate(report.dateRange.endDate)}`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DevicesIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Total Devices" 
                    secondary={report.impactSummary?.totalDevicesCollected || 0} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ShippingIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Pickups" 
                    secondary={report.pickupCount || 0} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RecyclingIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Format" 
                    secondary={report.format?.toUpperCase() || 'PDF'} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Environmental Impact
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    CO₂ Emissions Saved
                  </Typography>
                  <Typography variant="h5">
                    {formatCO2(report.impactSummary?.totalCO2Saved || 0)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    E-Waste Collected
                  </Typography>
                  <Typography variant="h5">
                    {formatWeight(report.impactSummary?.totalWeightCollected || 0)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Devices Refurbished
                  </Typography>
                  <Typography variant="h5">
                    {report.impactSummary?.totalRefurbished || 0}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Devices Recycled
                  </Typography>
                  <Typography variant="h5">
                    {report.impactSummary?.totalRecycled || 0}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Landfill Diversion Rate
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ mr: 1 }}>
                      {report.landfillDiversionRate?.toFixed(1) || 0}%
                    </Typography>
                    <ParkIcon color="success" />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Device Breakdown
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {report.deviceBreakdown && Object.keys(report.deviceBreakdown).length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device Type</TableCell>
                        <TableCell align="right">Count</TableCell>
                        <TableCell align="right">Weight</TableCell>
                        <TableCell align="right">CO₂ Saved</TableCell>
                        <TableCell align="right">Refurbished</TableCell>
                        <TableCell align="right">Recycled</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(report.deviceBreakdown).map(([type, data]) => (
                        <TableRow key={type}>
                          <TableCell>{type}</TableCell>
                          <TableCell align="right">{data.count}</TableCell>
                          <TableCell align="right">{formatWeight(data.weight)}</TableCell>
                          <TableCell align="right">{formatCO2(data.co2Saved)}</TableCell>
                          <TableCell align="right">{data.refurbished}</TableCell>
                          <TableCell align="right">{data.recycled}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                  No device data available for this report period.
                </Typography>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Materials Recovered
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {report.impactSummary?.materialsRecovered && 
               Object.keys(report.impactSummary.materialsRecovered).length > 0 ? (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Material</TableCell>
                            <TableCell align="right">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(report.impactSummary.materialsRecovered).map(([material, amount]) => (
                            <TableRow key={material}>
                              <TableCell>
                                {material.charAt(0).toUpperCase() + material.slice(1)}
                              </TableCell>
                              <TableCell align="right">{formatWeight(amount)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Environmental Benefits
                        </Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <ParkIcon color="success" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Reduced Mining Impact" 
                              secondary="Recovering materials reduces the need for raw material extraction" 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <ParkIcon color="success" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Energy Conservation" 
                              secondary="Recycling materials uses less energy than processing raw materials" 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <ParkIcon color="success" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Reduced Landfill Waste" 
                              secondary="Materials diverted from landfills reduce environmental contamination" 
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                  No materials recovery data available for this report period.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportDetail; 