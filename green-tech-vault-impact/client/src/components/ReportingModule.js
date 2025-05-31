import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import { 
  Description as ReportIcon,
  GetApp as DownloadIcon,
  Visibility as ViewIcon,
  CalendarMonth as CalendarIcon,
  Assessment as AssessmentIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import axios from 'axios';

const RYGNECOReporting = ({ clientId, clientName }) => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [reportType, setReportType] = useState('quarterly');
  const [showPreview, setShowPreview] = useState(false);

  // Sample data for demo (replace with actual API calls)
  const generateDemoReport = async (type) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Demo report data
      const demoData = {
        id: `report-${Date.now()}`,
        type: type,
        client: {
          id: clientId || 'DEMO-001',
          name: clientName || 'Demo Company'
        },
        metadata: {
          generatedDate: new Date(),
          quarter: 'Q1',
          year: 2025,
          reportType: type
        },
        kpis: {
          totalWeight: 2847,
          diversionRate: 94,
          taxBenefit: 18450,
          carbonAvoided: 15.2
        },
        sections: {
          executiveSummary: true,
          environmentalImpact: true,
          financialImpact: true,
          assetTracking: true,
          csrImpact: true,
          compliance: true
        }
      };
      
      setReportData(demoData);
      setShowPreview(true);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!reportData) return;
    
    // Create a temporary link to download the report
    const reportUrl = `/api/reports/download/${reportData.id}`;
    window.open(reportUrl, '_blank');
  };

  const printReport = () => {
    window.print();
  };

  const reportTypes = [
    {
      id: 'quarterly',
      title: 'Quarterly Report',
      description: 'Comprehensive quarterly analysis with 6-page detailed breakdown',
      icon: <CalendarIcon />,
      color: 'primary'
    },
    {
      id: 'monthly',
      title: 'Monthly Report',
      description: 'Monthly summary of e-waste processing activities',
      icon: <AssessmentIcon />,
      color: 'secondary'
    },
    {
      id: 'annual',
      title: 'Annual Report',
      description: 'Year-end sustainability and impact report',
      icon: <ReportIcon />,
      color: 'success'
    },
    {
      id: 'pickup',
      title: 'Pickup Report',
      description: 'Individual pickup transaction details',
      icon: <ReportIcon />,
      color: 'info'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#27ae60', fontWeight: 'bold' }}>
          🌱 RYGNECO E-Waste Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generate comprehensive reports for your e-waste management activities
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {reportTypes.map((report) => (
          <Grid item xs={12} md={6} lg={3} key={report.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: reportType === report.id ? '2px solid #27ae60' : '1px solid #e0e0e0',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
              onClick={() => setReportType(report.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 2, 
                    backgroundColor: `${report.color}.light`,
                    color: `${report.color}.main`,
                    mr: 2 
                  }}>
                    {report.icon}
                  </Box>
                  <Typography variant="h6">
                    {report.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {report.description}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ 
                    backgroundColor: '#27ae60',
                    '&:hover': { backgroundColor: '#219a52' }
                  }}
                  startIcon={<ReportIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    generateDemoReport(report.id);
                  }}
                  disabled={loading}
                >
                  Generate
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ color: '#27ae60' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Generating your report...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This may take a few moments
            </Typography>
          </Box>
        </Box>
      )}
      
      {/* Report Preview */}
      {reportData && !loading && showPreview && (
        <Paper sx={{ mt: 4, p: 3 }} elevation={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Report Generated Successfully! 
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label={reportData.type.toUpperCase()} color="primary" size="small" />
                <Chip label={`${reportData.metadata.quarter} ${reportData.metadata.year}`} size="small" />
                <Chip label="6 Pages" size="small" />
              </Box>
            </Box>
            <Box>
              <IconButton onClick={printReport} color="primary">
                <PrintIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {/* KPI Preview */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                  {reportData.kpis.totalWeight.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pounds Processed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                  {reportData.kpis.diversionRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Diversion Rate
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                  ${reportData.kpis.taxBenefit.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tax Benefits
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                  {reportData.kpis.carbonAvoided}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tons CO₂ Avoided
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ViewIcon />}
              onClick={() => window.open(`/reports/preview/${reportData.id}`, '_blank')}
              sx={{ 
                backgroundColor: '#27ae60',
                '&:hover': { backgroundColor: '#219a52' }
              }}
            >
              View Full Report
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<DownloadIcon />}
              onClick={downloadReport}
              sx={{ 
                borderColor: '#27ae60',
                color: '#27ae60',
                '&:hover': { 
                  borderColor: '#219a52',
                  backgroundColor: '#f0f9f4'
                }
              }}
            >
              Download PDF
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default RYGNECOReporting; 