import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Park as ParkIcon,
  Recycling as RecyclingIcon,
  Cloud as CloudIcon,
  Nature as NatureIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Business as BusinessIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCO2, formatWeight } from '../utils/environmentalImpact';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ReportTemplate = ({ reportData }) => {
  if (!reportData) return null;

  const {
    title = 'Report',
    type = 'Custom',
    dateRange = { startDate: new Date(), endDate: new Date() },
    company,
    impactSummary = {
      totalDevicesCollected: 0,
      totalWeightCollected: 0,
      totalCO2Saved: 0,
      totalLandfillDiverted: 0,
      totalRefurbished: 0,
      totalRecycled: 0,
      materialsRecovered: {
        metals: 0,
        plastics: 0,
        glass: 0,
        rareEarthMetals: 0
      },
      environmentalEquivalents: {
        trees: 0,
        cars: 0
      }
    },
    options = {}
  } = reportData || {};

  // Ensure we have valid dates
  const startDate = dateRange?.startDate ? new Date(dateRange.startDate) : new Date();
  const endDate = dateRange?.endDate ? new Date(dateRange.endDate) : new Date();

  // Prepare data for charts
  const deviceBreakdown = [
    { name: 'Refurbished', value: impactSummary.totalRefurbished || 0 },
    { name: 'Recycled', value: impactSummary.totalRecycled || 0 }
  ];

  const materialsRecovered = [
    { name: 'Metals', value: impactSummary.materialsRecovered?.metals || 0 },
    { name: 'Plastics', value: impactSummary.materialsRecovered?.plastics || 0 },
    { name: 'Glass', value: impactSummary.materialsRecovered?.glass || 0 },
    { name: 'Rare Earth', value: impactSummary.materialsRecovered?.rareEarthMetals || 0 }
  ];

  const MetricCard = ({ icon, title, value, subtitle, color = 'primary' }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            p: 1, 
            borderRadius: 2, 
            backgroundColor: `${color}.light`,
            color: `${color}.main`,
            mr: 2 
          }}>
            {icon}
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Paper sx={{ p: 4, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom sx={{ color: '#27ae60', fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              <Chip 
                icon={<BusinessIcon />} 
                label={company?.companyName || 'All Clients'} 
                color="primary" 
              />
              <Chip 
                icon={<DateRangeIcon />} 
                label={`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`} 
              />
              <Chip label={type} color="secondary" />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
            <img 
              src="/api/placeholder/200/100" 
              alt="Company Logo" 
              style={{ maxHeight: 100, maxWidth: '100%' }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Executive Summary */}
      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#27ae60', fontWeight: 'bold' }}>
          Executive Summary
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" paragraph>
          During the reporting period from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}, 
          your organization successfully diverted {formatWeight(impactSummary.totalWeightCollected)} of electronic waste from landfills, 
          resulting in a significant positive environmental impact.
        </Typography>
        <Typography variant="body1" paragraph>
          Through responsible e-waste management practices, your efforts have prevented {formatCO2(impactSummary.totalCO2Saved)} of CO₂ 
          emissions, equivalent to planting {impactSummary.environmentalEquivalents.trees.toLocaleString()} trees or removing {impactSummary.environmentalEquivalents.cars} cars 
          from the road for a year.
        </Typography>
      </Paper>

      {/* Key Metrics */}
      <Typography variant="h4" gutterBottom sx={{ color: '#27ae60', fontWeight: 'bold', mb: 3 }}>
        Key Impact Metrics
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<RecyclingIcon />}
            title="Total Devices Processed"
            value={impactSummary.totalDevicesCollected.toLocaleString()}
            subtitle="Devices responsibly managed"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<ParkIcon />}
            title="E-Waste Diverted"
            value={formatWeight(impactSummary.totalWeightCollected)}
            subtitle="Kept from landfills"
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<CloudIcon />}
            title="CO₂ Emissions Prevented"
            value={formatCO2(impactSummary.totalCO2Saved)}
            subtitle="Carbon footprint reduced"
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<TrendingUpIcon />}
            title="Diversion Rate"
            value={`${impactSummary.totalDevicesCollected > 0 ? Math.round((impactSummary.totalRefurbished / impactSummary.totalDevicesCollected) * 100) : 0}%`}
            subtitle="Devices given new life"
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      {options.includeCharts && (
        <>
          <Typography variant="h4" gutterBottom sx={{ color: '#27ae60', fontWeight: 'bold', mb: 3 }}>
            Data Visualization
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Device Processing Breakdown
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Materials Recovered (kg)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={materialsRecovered}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#27ae60" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {/* Environmental Impact */}
      {options.includeEnvironmentalImpact && (
        <Paper sx={{ p: 4, mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#27ae60', fontWeight: 'bold' }}>
            Environmental Impact Equivalents
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NatureIcon sx={{ fontSize: 48, color: '#27ae60', mr: 2 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {impactSummary.environmentalEquivalents.trees.toLocaleString()} Trees
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Equivalent trees planted based on CO₂ savings
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CloudIcon sx={{ fontSize: 48, color: '#2196f3', mr: 2 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {impactSummary.environmentalEquivalents.cars} Cars
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Removed from roads for one year
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Detailed Breakdown */}
      {options.includeDetailedBreakdown && (
        <Paper sx={{ p: 4, mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#27ae60', fontWeight: 'bold' }}>
            Detailed Material Recovery
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Material Type</TableCell>
                  <TableCell align="right">Weight (kg)</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                  <TableCell align="right">Environmental Benefit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Metals</TableCell>
                  <TableCell align="right">{impactSummary.materialsRecovered.metals}</TableCell>
                  <TableCell align="right">
                    {impactSummary.totalWeightCollected > 0 ? Math.round((impactSummary.materialsRecovered.metals / impactSummary.totalWeightCollected) * 100) : 0}%
                  </TableCell>
                  <TableCell align="right">Reduced mining impact</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Plastics</TableCell>
                  <TableCell align="right">{impactSummary.materialsRecovered.plastics}</TableCell>
                  <TableCell align="right">
                    {impactSummary.totalWeightCollected > 0 ? Math.round((impactSummary.materialsRecovered.plastics / impactSummary.totalWeightCollected) * 100) : 0}%
                  </TableCell>
                  <TableCell align="right">Prevented ocean pollution</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Glass</TableCell>
                  <TableCell align="right">{impactSummary.materialsRecovered.glass}</TableCell>
                  <TableCell align="right">
                    {impactSummary.totalWeightCollected > 0 ? Math.round((impactSummary.materialsRecovered.glass / impactSummary.totalWeightCollected) * 100) : 0}%
                  </TableCell>
                  <TableCell align="right">100% recyclable material</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rare Earth Metals</TableCell>
                  <TableCell align="right">{impactSummary.materialsRecovered.rareEarthMetals}</TableCell>
                  <TableCell align="right">
                    {impactSummary.totalWeightCollected > 0 ? Math.round((impactSummary.materialsRecovered.rareEarthMetals / impactSummary.totalWeightCollected) * 100) : 0}%
                  </TableCell>
                  <TableCell align="right">Critical resource recovery</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Footer */}
      <Paper sx={{ p: 4, mt: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          This report was generated on {new Date().toLocaleDateString()} by Green Tech Vault Impact System.
          All calculations are based on industry-standard environmental impact metrics.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ReportTemplate; 