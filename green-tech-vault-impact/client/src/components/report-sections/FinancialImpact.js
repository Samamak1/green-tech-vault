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
  Card,
  CardContent
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const FinancialImpact = () => {
  const costBenefitData = [
    { category: 'EcoTech Service Fees', amount: '$4,250' },
    { category: 'Avoided Disposal Costs', amount: '$1,420' },
    { category: 'Revenue Share (Refurb Sales)', amount: '$2,340' },
    { category: 'Tax Deduction Value', amount: '$18,450' },
    { category: 'Net Financial Benefit', amount: '$17,960', isTotal: true }
  ];

  const quarterlyData = [
    { quarter: 'Q2 2024', value: 8200 },
    { quarter: 'Q3 2024', value: 11500 },
    { quarter: 'Q4 2024', value: 13200 },
    { quarter: 'Q1 2025', value: 18000 }
  ];

  const charitableContributions = [
    {
      organization: 'Cincinnati Public Schools',
      status: 'Verified ✓',
      items: '67 Laptops, 23 Tablets',
      marketValue: '$8,450',
      deduction: '$8,450'
    },
    {
      organization: 'Boys & Girls Club of Greater Cincinnati',
      status: 'Verified ✓',
      items: '34 Desktops, 45 Monitors',
      marketValue: '$5,200',
      deduction: '$5,200'
    },
    {
      organization: 'Northern Kentucky University',
      status: 'Verified ✓',
      items: '12 Servers, 28 Accessories',
      marketValue: '$3,200',
      deduction: '$3,200'
    },
    {
      organization: 'Local Community Centers (4)',
      status: 'Verified ✓',
      items: '87 Mixed Devices',
      marketValue: '$1,600',
      deduction: '$1,600'
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', borderBottom: '2px solid #ecf0f1', pb: 1, mb: 3 }}>
        💰 Financial Impact & Tax Benefits
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Cost-Benefit Analysis */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Cost-Benefit Analysis
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#34495e' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Financial Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {costBenefitData.map((item, index) => (
                  <TableRow 
                    key={index} 
                    sx={{ 
                      backgroundColor: item.isTotal ? '#e8f5e8' : 'inherit',
                      fontWeight: item.isTotal ? 'bold' : 'normal'
                    }}
                  >
                    <TableCell sx={{ fontWeight: item.isTotal ? 'bold' : 'normal' }}>
                      {item.category}
                    </TableCell>
                    <TableCell sx={{ fontWeight: item.isTotal ? 'bold' : 'normal' }}>
                      {item.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Paper sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', p: 2, mt: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#856404', mb: 1 }}>
              📋 Tax Documentation Ready
            </Typography>
            <Typography variant="body2">
              All IRS Form 8283 documentation prepared and available for download. Includes fair market value assessments and 501(c)(3) verification for donated items.
            </Typography>
          </Paper>
        </Grid>

        {/* ROI Analysis */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            ROI Analysis
          </Typography>
          <Card sx={{ backgroundColor: '#f8f9fa', textAlign: 'center', mb: 2 }}>
            <CardContent>
              <Typography variant="h2" fontWeight="bold" sx={{ color: '#27ae60', mb: 1 }}>
                422%
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Return on Investment
              </Typography>
              <Typography variant="body2">
                <strong>Investment:</strong> $4,250 (service fees)<br />
                <strong>Return:</strong> $17,960 (net benefit)<br />
                <strong>Payback Period:</strong> 2.8 months
              </Typography>
            </CardContent>
          </Card>

          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Quarterly Comparison
          </Typography>
          <Paper sx={{ p: 2, height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Bar dataKey="value" fill="#27ae60" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Charitable Contributions Breakdown */}
      <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 4 }}>
        Charitable Contributions Breakdown
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#34495e' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Recipient Organization</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>501(c)(3) Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Items Donated</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fair Market Value</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tax Deduction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charitableContributions.map((contrib, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' } }}>
                <TableCell>{contrib.organization}</TableCell>
                <TableCell>{contrib.status}</TableCell>
                <TableCell>{contrib.items}</TableCell>
                <TableCell>{contrib.marketValue}</TableCell>
                <TableCell>{contrib.deduction}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
              <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                Total Charitable Deductions
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>$18,450</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Carbon Credit and Cost Avoidance */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Carbon Credit Opportunities
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Verified Carbon Units (VCU):
              </Typography>
              <Typography variant="body2">
                15.2 tons CO₂e × $12/ton = $182 potential revenue
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Gold Standard Credits:
              </Typography>
              <Typography variant="body2">
                Eligible under e-waste methodology AMS-III.BB
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Status:
              </Typography>
              <Typography variant="body2" sx={{ color: '#27ae60' }}>
                Application submitted for Q1 verification
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Cost Avoidance Summary
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
            <Box sx={{ mb: 1, fontSize: '0.875rem' }}>💰 Landfill Disposal Fees: $1,420 saved</Box>
            <Box sx={{ mb: 1, fontSize: '0.875rem' }}>🚛 Transportation Costs: $340 saved</Box>
            <Box sx={{ mb: 1, fontSize: '0.875rem' }}>📋 Compliance Penalties: $0 (avoided)</Box>
            <Box sx={{ mb: 1, fontSize: '0.875rem' }}>🔒 Data Breach Risk: Eliminated</Box>
            <Box sx={{ fontWeight: 'bold', color: '#27ae60', fontSize: '0.875rem' }}>
              Total Avoided Costs: $1,760
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialImpact; 