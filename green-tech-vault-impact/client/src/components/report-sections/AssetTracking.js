import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  LinearProgress
} from '@mui/material';

const AssetTracking = () => {
  const sampleAssetJourney = [
    {
      date: 'Jan 15',
      event: 'Collected',
      details: 'ACME Corp HQ, Building A',
      subDetails: 'GPS: 39.0458° N, 84.5120° W | Condition: Good | Est. Value: $485'
    },
    {
      date: 'Jan 16',
      event: 'Received',
      details: 'EcoTech Processing Facility',
      subDetails: 'Chain of custody signed by: M. Rodriguez | Weight: 12.3 lbs'
    },
    {
      date: 'Jan 18',
      event: 'Data Sanitization',
      details: 'NIST 800-88 3-pass wipe',
      subDetails: 'Certificate: DS-2025-0234 | Verified by: K. Chen'
    },
    {
      date: 'Jan 22',
      event: 'Refurbishment',
      details: 'Hardware testing & OS installation',
      subDetails: 'Quality Score: 94/100 | Refurb Cost: $67'
    },
    {
      date: 'Feb 03',
      event: 'Sale Completed',
      details: 'Shipped to TechReuse Brazil',
      subDetails: 'Sale Price: $340 | Carbon offset: 0.8 tons CO₂'
    }
  ];

  const deviceCategories = [
    {
      category: 'Desktop Computers',
      quantity: 234,
      weight: 1456,
      refurbRate: 72,
      avgValue: '$285',
      destination: 'South America (45%)'
    },
    {
      category: 'Laptops',
      quantity: 189,
      weight: 567,
      refurbRate: 81,
      avgValue: '$195',
      destination: 'Southeast Asia (38%)'
    },
    {
      category: 'Monitors',
      quantity: 156,
      weight: 487,
      refurbRate: 65,
      avgValue: '$85',
      destination: 'Eastern Europe (52%)'
    },
    {
      category: 'Servers',
      quantity: 23,
      weight: 287,
      refurbRate: 43,
      avgValue: '$750',
      destination: 'Africa (60%)'
    },
    {
      category: 'Mobile Devices',
      quantity: 187,
      weight: 34,
      refurbRate: 89,
      avgValue: '$45',
      destination: 'Local Donations (67%)'
    },
    {
      category: 'Peripherals',
      quantity: 58,
      weight: 16,
      refurbRate: 34,
      avgValue: '$12',
      destination: 'Material Recovery (78%)'
    }
  ];

  const qualityMetrics = [
    { label: 'Refurbishment Success Rate', value: 94.2 },
    { label: 'Data Destruction Compliance', value: 100 },
    { label: 'Documentation Completeness', value: 98.7 }
  ];

  const globalDistribution = [
    { country: '🇧🇷 Brazil', devices: 287, percentage: 33.9 },
    { country: '🇵🇭 Philippines', devices: 156, percentage: 18.4 },
    { country: '🇵🇱 Poland', devices: 134, percentage: 15.8 },
    { country: '🇰🇪 Kenya', devices: 89, percentage: 10.5 },
    { country: '🇺🇸 USA (Donations)', devices: 98, percentage: 11.6 },
    { country: '🌍 Other', devices: 83, percentage: 9.8 }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', borderBottom: '2px solid #ecf0f1', pb: 1, mb: 3 }}>
        📋 Asset Tracking & Chain of Custody
      </Typography>

      {/* Data Security Notice */}
      <Paper sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', p: 2, mb: 3 }}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#856404', mb: 1 }}>
          🔒 Data Security Notice
        </Typography>
        <Typography variant="body2">
          All data-bearing devices processed through NIST 800-88 compliant sanitization. 847 certificates of data destruction issued.
        </Typography>
      </Paper>

      {/* Sample Asset Journey */}
      <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 3 }}>
        Sample Asset Journey
      </Typography>
      <Paper sx={{ backgroundColor: '#f8f9fa', p: 3, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Asset: Dell OptiPlex 7090 | Serial: DL7090-ACM-2025-0234
        </Typography>
        
        <Timeline>
          {sampleAssetJourney.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index < sampleAssetJourney.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography variant="caption" sx={{ 
                      minWidth: 60, 
                      fontWeight: 'bold', 
                      color: 'text.secondary' 
                    }}>
                      {item.date}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {item.event}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {item.details}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.subDetails}
                  </Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Paper>

      {/* Processing Summary by Device Category */}
      <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 3 }}>
        Processing Summary by Device Category
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#34495e' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Device Category</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Weight (lbs)</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Refurb Rate</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Avg Value</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Primary Destination</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceCategories.map((device, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' } }}>
                <TableCell>{device.category}</TableCell>
                <TableCell>{device.quantity}</TableCell>
                <TableCell>{device.weight}</TableCell>
                <TableCell>{device.refurbRate}%</TableCell>
                <TableCell>{device.avgValue}</TableCell>
                <TableCell>{device.destination}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Quality Control and Global Distribution */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Quality Control Metrics
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
            {qualityMetrics.map((metric, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {metric.label}: {metric.value}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={metric.value} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#27ae60'
                    }
                  }} 
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Global Distribution
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
            {globalDistribution.map((dist, index) => (
              <Box key={index} sx={{ mb: 1, fontSize: '0.875rem' }}>
                {dist.country}: {dist.devices} devices ({dist.percentage}%)
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssetTracking; 