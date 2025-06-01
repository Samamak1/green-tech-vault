import React, { useState, useEffect } from 'react';
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
  LinearProgress,
  Chip,
  Divider,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Print as PrintIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
  Share as ShareIcon,
  School as SchoolIcon,
  Recycling as RecyclingIcon,
  Public as PublicIcon,
  EmojiEvents as TrophyIcon,
  Security as SecurityIcon,
  AccountBalance as BankIcon,
  Park as EcoIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

// Import the new section components
import AssetTracking from './report-sections/AssetTracking';
import FinancialImpact from './report-sections/FinancialImpact';
import CSRImpact from './report-sections/CSRImpact';
import ComplianceRecommendations from './report-sections/ComplianceRecommendations';

const ReportDetailTemplate = ({ report, onPrint, onDownloadPdf, onDownloadCsv, onShare }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  // Mock data for demonstration - in real app, this would come from props/API
  const mockData = {
    executiveSummary: "During Q1 2025, EcoTech Solutions successfully processed 2,847 lbs of electronic waste for ACME Corporation, achieving a 94% landfill diversion rate. Your partnership has resulted in significant environmental impact, tax benefits of $18,450, and strengthened your corporate sustainability profile.",
    kpiData: [
      { label: 'Total Pounds Processed', value: '2,847', change: '+23%', trend: 'up' },
      { label: 'Landfill Diversion Rate', value: '94%', change: '+4%', trend: 'up' },
      { label: 'Tax Deduction Value', value: '$18,450', change: '+31%', trend: 'up' },
      { label: 'CO₂ Tons Avoided', value: '15.2', change: '+18%', trend: 'up' }
    ],
    deviceBreakdown: [
      { name: 'Refurbished & Resold', value: 68, color: '#27ae60' },
      { name: 'Material Recycling', value: 20, color: '#3498db' },
      { name: 'Community Donations', value: 6, color: '#f39c12' },
      { name: 'Ethical Disposal', value: 6, color: '#e74c3c' }
    ],
    monthlyTrends: [
      { month: 'January', weight: 987 },
      { month: 'February', weight: 1156 },
      { month: 'March', weight: 704 }
    ],
    impactMetrics: [
      { icon: <SchoolIcon />, value: '12 Schools', description: 'Received donated equipment' },
      { icon: <RecyclingIcon />, value: '847 Items', description: 'Individually tracked & processed' },
      { icon: <PublicIcon />, value: '23 Countries', description: 'Reached through refurbishment' }
    ]
  };

  const KPICard = ({ kpi }) => (
    <Card sx={{ height: '100%', borderLeft: 5, borderLeftColor: '#27ae60' }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h3" component="div" sx={{ color: '#27ae60', fontWeight: 'bold', mb: 1 }}>
          {kpi.value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {kpi.label}
        </Typography>
        <Chip 
          label={kpi.change} 
          size="small" 
          sx={{ 
            backgroundColor: '#d4edda', 
            color: '#155724',
            fontWeight: 'bold'
          }} 
        />
      </CardContent>
    </Card>
  );

  const renderPage1 = () => (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, pb: 2, borderBottom: '3px solid #27ae60' }}>
        <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
          🌱 EcoTech Solutions
        </Typography>
        <Box sx={{ textAlign: 'right', fontSize: '0.875rem', color: 'text.secondary' }}>
          <Typography variant="caption" display="block">Report Generated: {new Date().toLocaleDateString()}</Typography>
          <Typography variant="caption" display="block">Report Period: {report?.dateRange?.startDate ? new Date(report.dateRange.startDate).toLocaleDateString() : 'N/A'} - {report?.dateRange?.endDate ? new Date(report.dateRange.endDate).toLocaleDateString() : 'N/A'}</Typography>
          <Typography variant="caption" display="block">Client ID: {report?.company?.companyName || 'ACME-2025-001'}</Typography>
        </Box>
      </Box>

      {/* Title */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          E-Waste Management Report
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {report?.company?.companyName || 'ACME Corporation'} - {report?.type || 'Q1 2025'} Sustainability Impact
        </Typography>
      </Box>

      {/* Executive Summary */}
      <Paper sx={{ 
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', 
        color: 'white', 
        p: 3, 
        borderRadius: 3,
        mb: 4 
      }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          🎯 Executive Summary
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          {mockData.executiveSummary}
        </Typography>
      </Paper>

      {/* KPI Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockData.kpiData.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <KPICard kpi={kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Processing Breakdown */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#2c3e50', borderBottom: '2px solid #ecf0f1', pb: 1, mb: 3 }}>
          📊 Processing Breakdown
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            {mockData.deviceBreakdown.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {item.name}: {item.value}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={item.value} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: item.color
                    }
                  }} 
                />
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative', width: 200, height: 200, mx: 'auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.deviceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {mockData.deviceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <Typography variant="h4" fontWeight="bold" color="primary">94%</Typography>
                <Typography variant="caption">Diverted</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Impact Metrics */}
      <Grid container spacing={3}>
        {mockData.impactMetrics.map((metric, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ textAlign: 'center', p: 2, border: '2px solid #ecf0f1' }}>
              <Box sx={{ 
                width: 50, 
                height: 50, 
                borderRadius: '50%', 
                backgroundColor: '#27ae60', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                {metric.icon}
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {metric.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {metric.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderPage2 = () => (
    <Box sx={{ mb: 4 }}>
      {/* Environmental Impact Analysis */}
      <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', borderBottom: '2px solid #ecf0f1', pb: 1, mb: 3 }}>
        🌍 Environmental Impact Analysis
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Carbon Footprint Reduction */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Carbon Footprint Reduction
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#34495e' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Impact Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Q1 2025</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>YTD Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>CO₂ Avoided (Manufacturing)</TableCell>
                  <TableCell>12.4 tons</TableCell>
                  <TableCell>12.4 tons</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CO₂ Avoided (Landfill Methane)</TableCell>
                  <TableCell>2.8 tons</TableCell>
                  <TableCell>2.8 tons</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transportation Emissions</TableCell>
                  <TableCell>-0.3 tons</TableCell>
                  <TableCell>-0.3 tons</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Net Carbon Impact</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>15.2 tons CO₂e</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>15.2 tons CO₂e</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Paper sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', p: 2, mt: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#856404', mb: 1 }}>
              🏆 Achievement Milestone
            </Typography>
            <Typography variant="body2">
              Your carbon impact equals removing 3.3 passenger vehicles from the road for one full year!
            </Typography>
          </Paper>
        </Grid>

        {/* Resource Recovery */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Resource Recovery
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Precious Metals Recovered:
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 2, fontSize: '0.875rem' }}>
              <li>Gold: 2.3 oz ($4,830 value)</li>
              <li>Silver: 18.7 oz ($486 value)</li>
              <li>Palladium: 0.8 oz ($1,024 value)</li>
              <li>Platinum: 0.3 oz ($312 value)</li>
            </Box>
            
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Critical Materials:
            </Typography>
            <Box component="ul" sx={{ pl: 2, fontSize: '0.875rem' }}>
              <li>Lithium: 47 lbs</li>
              <li>Cobalt: 23 lbs</li>
              <li>Rare Earth Elements: 12 lbs</li>
              <li>Copper: 234 lbs</li>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Monthly Processing Trends */}
      <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 4 }}>
        Monthly Processing Trends
      </Typography>
      <Paper sx={{ p: 2, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData.monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="weight" fill="#27ae60" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Water & Energy Savings */}
      <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 4 }}>
        Water & Energy Savings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2, border: '2px solid #ecf0f1' }}>
            <Box sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              backgroundColor: '#27ae60', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              fontSize: '1.5rem'
            }}>
              💧
            </Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              1.2M Gallons
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Water saved vs new manufacturing
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2, border: '2px solid #ecf0f1' }}>
            <Box sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              backgroundColor: '#27ae60', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              fontSize: '1.5rem'
            }}>
              ⚡
            </Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              43,200 kWh
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Energy saved through refurbishment
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2, border: '2px solid #ecf0f1' }}>
            <Box sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              backgroundColor: '#27ae60', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              fontSize: '1.5rem'
            }}>
              🏭
            </Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              89%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reduction in manufacturing demand
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return renderPage1();
      case 2:
        return renderPage2();
      case 3:
        return <AssetTracking />;
      case 4:
        return <FinancialImpact />;
      case 5:
        return <CSRImpact />;
      case 6:
        return <ComplianceRecommendations />;
      default:
        return (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary">
              Page {currentPage} content coming soon...
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ maxWidth: '8.5in', mx: 'auto', p: 3, backgroundColor: 'white', minHeight: '11in' }}>
      {/* Action Bar */}
      <Box sx={{ 
        position: 'sticky', 
        top: 0, 
        backgroundColor: 'white', 
        zIndex: 1000, 
        borderBottom: '1px solid #ecf0f1',
        mb: 3,
        pb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">
          Page {currentPage} of {totalPages}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Print Report">
            <IconButton onClick={onPrint} size="small">
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download PDF">
            <IconButton onClick={onDownloadPdf} size="small">
              <PdfIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download CSV">
            <IconButton onClick={onDownloadCsv} size="small">
              <CsvIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share Report">
            <IconButton onClick={onShare} size="small">
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Report Content */}
      {renderCurrentPage()}

      {/* Page Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
        <Button 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          variant="outlined"
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button 
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          variant="outlined"
        >
          Next
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        mt: 4, 
        pt: 2, 
        borderTop: '1px solid #ecf0f1', 
        textAlign: 'center', 
        fontSize: '0.75rem', 
        color: 'text.secondary' 
      }}>
        <Typography variant="caption" display="block">
          EcoTech Solutions | Certified R2 & e-Stewards Facility | ISO 14001:2015 Compliant
        </Typography>
        <Typography variant="caption" display="block">
          This report contains confidential information. Distribution limited to authorized personnel only.
        </Typography>
      </Box>
    </Box>
  );
};

export default ReportDetailTemplate; 