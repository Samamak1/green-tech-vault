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

// Import the comprehensive print CSS
import '../styles/PrintReport.css';

// Import the new section components
import AssetTracking from './report-sections/AssetTracking';
import FinancialImpact from './report-sections/FinancialImpact';
import CSRImpact from './report-sections/CSRImpact';
import ComplianceRecommendations from './report-sections/ComplianceRecommendations';

const ReportDetailTemplate = ({ report, onPrint, onDownloadPdf, onDownloadCsv, onShare }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  // Add hover effects on component mount
  useEffect(() => {
    // Add hover effects to cards (matching HTML template JavaScript)
    const addHoverEffects = () => {
      const cards = document.querySelectorAll('.hover-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-2px)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
        });
      });
    };

    // Delay to ensure DOM is ready
    setTimeout(addHoverEffects, 100);
    
    return () => {
      // Cleanup event listeners
      const cards = document.querySelectorAll('.hover-card');
      cards.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, [currentPage]);

  // Mock data for demonstration - in real app, this would come from props/API
  const mockData = {
    executiveSummary: "During Q1 2025, EcoTech Solutions successfully processed 2,847 lbs of electronic waste for ACME Corporation, achieving a 94% landfill diversion rate. Your partnership has resulted in significant environmental impact, tax benefits of $18,450, and strengthened your corporate sustainability profile.",
    kpiData: [
      { label: 'Total Pounds Processed', value: '2,847', change: '↑ 23% vs Q4 2024', trend: 'up' },
      { label: 'Landfill Diversion Rate', value: '94%', change: '↑ 4% vs Q4 2024', trend: 'up' },
      { label: 'Tax Deduction Value', value: '$18,450', change: '↑ 31% vs Q4 2024', trend: 'up' },
      { label: 'CO₂ Tons Avoided', value: '15.2', change: '↑ 18% vs Q4 2024', trend: 'up' }
    ],
    deviceBreakdown: [
      { name: 'Refurbished & Resold', value: 68, pounds: '1,936 lbs', color: '#27ae60' },
      { name: 'Material Recycling', value: 20, pounds: '569 lbs', color: '#3498db' },
      { name: 'Community Donations', value: 6, pounds: '171 lbs', color: '#f39c12' },
      { name: 'Ethical Disposal', value: 6, pounds: '171 lbs', color: '#e74c3c' }
    ],
    monthlyTrends: [
      { month: 'January', weight: 987 },
      { month: 'February', weight: 1156 },
      { month: 'March', weight: 704 }
    ],
    impactMetrics: [
      { icon: <SchoolIcon />, value: '12 Schools', description: 'Received donated equipment', emoji: '🏫' },
      { icon: <RecyclingIcon />, value: '847 Items', description: 'Individually tracked & processed', emoji: '♻️' },
      { icon: <PublicIcon />, value: '23 Countries', description: 'Reached through refurbishment', emoji: '🌍' }
    ]
  };

  // Enhanced KPI Card with hover effects
  const KPICard = ({ kpi }) => (
    <Card 
      className="hover-card kpi-card"
      sx={{ 
        height: '100%', 
        borderLeft: 5, 
        borderLeftColor: '#27ae60',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 2.5 }}>
        <Typography className="kpi-value" variant="h2" component="div" sx={{ 
          color: '#27ae60', 
          fontWeight: 'bold', 
          mb: 1,
          fontSize: '2rem'
        }}>
          {kpi.value}
        </Typography>
        <Typography className="kpi-label" variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.875rem' }}>
          {kpi.label}
        </Typography>
        <Chip 
          className="kpi-change positive"
          label={kpi.change} 
          size="small" 
          sx={{ 
            backgroundColor: '#d4edda', 
            color: '#155724',
            fontWeight: 'bold',
            fontSize: '0.75rem'
          }} 
        />
      </CardContent>
    </Card>
  );

  // Enhanced CSS-based Donut Chart (matching HTML template exactly)
  const DonutChart = () => (
    <Box sx={{ position: 'relative', width: 200, height: 200, mx: 'auto' }}>
      <Box sx={{
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'conic-gradient(#27ae60 0% 68%, #3498db 68% 88%, #f39c12 88% 94%, #e74c3c 94% 100%)',
        position: 'relative'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          width: 100,
          height: 100,
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: '#2c3e50'
        }}>
          <Typography variant="h4" fontWeight="bold">94%</Typography>
          <Typography variant="caption">Diverted</Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderPage1 = () => (
    <Box className="page" sx={{ mb: 4, position: 'relative' }}>
      {/* Page Number */}
      <Typography className="page-number" sx={{
        position: 'absolute',
        top: '0.5in',
        right: '0.75in',
        fontSize: '10px',
        color: '#7f8c8d'
      }}>
        Page 1 of {totalPages}
      </Typography>

      {/* Header */}
      <Box className="report-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, pb: 2.5, borderBottom: '3px solid #27ae60' }}>
        <Typography className="logo" variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold', fontSize: '1.5rem' }}>
          🌱 EcoTech Solutions
        </Typography>
        <Box className="report-info" sx={{ textAlign: 'right', fontSize: '0.75rem', color: 'text.secondary' }}>
          <Typography variant="caption" display="block">Report Generated: {new Date().toLocaleDateString()}</Typography>
          <Typography variant="caption" display="block">Report Period: {report?.dateRange?.startDate ? new Date(report.dateRange.startDate).toLocaleDateString() : 'Q1 2025 (Jan-Mar)'}</Typography>
          <Typography variant="caption" display="block">Client ID: {report?.company?.companyName || 'ACME-2025-001'}</Typography>
        </Box>
      </Box>

      {/* Title */}
      <Box className="title" sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontSize: '1.75rem', mb: 1 }}>
          E-Waste Management Report
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontSize: '1.125rem', fontWeight: 'normal' }}>
          {report?.company?.companyName || 'ACME Corporation'} - {report?.type || 'Q1 2025'} Sustainability Impact
        </Typography>
      </Box>

      {/* Executive Summary */}
      <Paper className="executive-summary" sx={{ 
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', 
        color: 'white', 
        p: 3, 
        borderRadius: 3,
        mb: 4 
      }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.25rem', mb: 2 }}>
          🎯 Executive Summary
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          {mockData.executiveSummary}
        </Typography>
      </Paper>

      {/* KPI Grid - 2x2 layout matching HTML */}
      <Grid className="kpi-grid" container spacing={2.5} sx={{ mb: 4 }}>
        {mockData.kpiData.map((kpi, index) => (
          <Grid item xs={6} md={6} key={index}>
            <KPICard kpi={kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Processing Breakdown */}
      <Paper className="section" sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ 
          color: '#2c3e50', 
          borderBottom: '2px solid #ecf0f1', 
          pb: 1, 
          mb: 3,
          fontSize: '1.25rem'
        }}>
          📊 Processing Breakdown
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            {mockData.deviceBreakdown.map((item, index) => (
              <Box key={index} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.875rem' }}>
                    {item.name}: {item.value}% ({item.pounds})
                  </Typography>
                </Box>
                <Box className="progress-bar" sx={{
                  width: '100%',
                  height: 20,
                  backgroundColor: '#ecf0f1',
                  borderRadius: 2.5,
                  overflow: 'hidden'
                }}>
                  <Box className="progress-fill" sx={{
                    height: '100%',
                    width: `${item.value}%`,
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                    borderRadius: 2.5
                  }} />
                </Box>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <DonutChart />
          </Grid>
        </Grid>
      </Paper>

      {/* Impact Metrics */}
      <Grid className="impact-grid" container spacing={2.5}>
        {mockData.impactMetrics.map((metric, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card className="hover-card impact-card" sx={{ 
              textAlign: 'center', 
              p: 2.5, 
              border: '2px solid #ecf0f1',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}>
              <Box className="impact-icon" sx={{ 
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
                {metric.emoji}
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1rem' }}>
                {metric.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {metric.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Box className="footer" sx={{ 
        position: 'absolute',
        bottom: '0.5in',
        left: '0.75in',
        right: '0.75in',
        textAlign: 'center',
        fontSize: '10px',
        color: '#7f8c8d',
        borderTop: '1px solid #ecf0f1',
        pt: 1
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

  const renderPage2 = () => (
    <Box className="page" sx={{ mb: 4, position: 'relative' }}>
      {/* Page Number */}
      <Typography className="page-number" sx={{
        position: 'absolute',
        top: '0.5in',
        right: '0.75in',
        fontSize: '10px',
        color: '#7f8c8d'
      }}>
        Page 2 of {totalPages}
      </Typography>

      {/* Header */}
      <Box className="report-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, pb: 2.5, borderBottom: '3px solid #27ae60' }}>
        <Typography className="logo" variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold', fontSize: '1.5rem' }}>
          🌱 EcoTech Solutions
        </Typography>
        <Box className="report-info" sx={{ textAlign: 'right', fontSize: '0.75rem', color: 'text.secondary' }}>
          Environmental Impact Analysis
        </Box>
      </Box>

      {/* Environmental Impact Analysis */}
      <Typography className="section" variant="h4" gutterBottom sx={{ 
        color: '#2c3e50', 
        borderBottom: '2px solid #ecf0f1', 
        pb: 1, 
        mb: 3,
        fontSize: '1.25rem'
      }}>
        🌍 Environmental Impact Analysis
      </Typography>

      <Grid className="two-column" container spacing={3} sx={{ mb: 4 }}>
        {/* Carbon Footprint Reduction */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', fontSize: '1rem', mb: 2 }}>
            Carbon Footprint Reduction
          </Typography>
          <TableContainer component={Paper}>
            <Table className="data-table" size="small" sx={{ fontSize: '0.75rem' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#34495e' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem', p: 1.5 }}>Impact Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem', p: 1.5 }}>Q1 2025</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem', p: 1.5 }}>YTD Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontSize: '0.75rem', p: 1.25 }}>CO₂ Avoided (Manufacturing)</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem', p: 1.25 }}>12.4 tons</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem', p: 1.25 }}>12.4 tons</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell sx={{ fontSize: '0.75rem', p: 1.25 }}>CO₂ Avoided (Landfill Methane)</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem', p: 1.25 }}>2.8 tons</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem', p: 1.25 }}>2.8 tons</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontSize: '0.75rem', p: 1.25 }}>Transportation Emissions</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem', p: 1.25 }}>-0.3 tons</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem', p: 1.25 }}>-0.3 tons</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', p: 1.25 }}>Net Carbon Impact</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', p: 1.25 }}>15.2 tons CO₂e</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', p: 1.25 }}>15.2 tons CO₂e</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Paper className="alert-box" sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', p: 2, mt: 2, borderRadius: 1.5 }}>
            <Typography className="alert-title" variant="subtitle2" fontWeight="bold" sx={{ color: '#856404', mb: 1, fontSize: '0.875rem' }}>
              🏆 Achievement Milestone
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              Your carbon impact equals removing 3.3 passenger vehicles from the road for one full year!
            </Typography>
          </Paper>
        </Grid>

        {/* Resource Recovery */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', fontSize: '1rem', mb: 2 }}>
            Resource Recovery
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2.5, borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: '0.875rem' }}>
              Precious Metals Recovered:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, mb: 2, fontSize: '0.75rem', lineHeight: 1.4 }}>
              <li>Gold: 2.3 oz ($4,830 value)</li>
              <li>Silver: 18.7 oz ($486 value)</li>
              <li>Palladium: 0.8 oz ($1,024 value)</li>
              <li>Platinum: 0.3 oz ($312 value)</li>
            </Box>
            
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: '0.875rem' }}>
              Critical Materials:
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, fontSize: '0.75rem', lineHeight: 1.4 }}>
              <li>Lithium: 47 lbs</li>
              <li>Cobalt: 23 lbs</li>
              <li>Rare Earth Elements: 12 lbs</li>
              <li>Copper: 234 lbs</li>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Monthly Processing Trends */}
      <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 4, fontSize: '1rem' }}>
        Monthly Processing Trends
      </Typography>
      <Paper sx={{ p: 2.5, height: 250, borderRadius: 2 }}>
        <Box className="bar-chart" sx={{ 
          display: 'flex', 
          alignItems: 'end', 
          justifyContent: 'space-around', 
          height: '100%', 
          backgroundColor: '#f8f9fa', 
          borderRadius: 2,
          p: 2.5
        }}>
          {mockData.monthlyTrends.map((trend, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box className="bar" sx={{
                width: 40,
                height: `${(trend.weight / 1200) * 120}px`,
                background: 'linear-gradient(to top, #27ae60, #2ecc71)',
                borderRadius: '4px 4px 0 0',
                position: 'relative',
                mb: 1
              }}>
                <Typography className="bar-value" sx={{
                  position: 'absolute',
                  top: -25,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.625rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  whiteSpace: 'nowrap'
                }}>
                  {trend.weight} lbs
                </Typography>
              </Box>
              <Typography className="bar-label" sx={{ fontSize: '0.625rem', textAlign: 'center', color: '#7f8c8d' }}>
                {trend.month}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Water & Energy Savings */}
      <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 4, fontSize: '1rem' }}>
        Water & Energy Savings
      </Typography>
      <Grid className="impact-grid" container spacing={2.5}>
        {[
          { icon: '💧', value: '1.2M Gallons', description: 'Water saved vs new manufacturing' },
          { icon: '⚡', value: '43,200 kWh', description: 'Energy saved through refurbishment' },
          { icon: '🏭', value: '89%', description: 'Reduction in manufacturing demand' }
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card className="hover-card impact-card" sx={{ 
              textAlign: 'center', 
              p: 2.5, 
              border: '2px solid #ecf0f1',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}>
              <Box className="impact-icon" sx={{ 
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
                {item.icon}
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1rem' }}>
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {item.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Box className="footer" sx={{ 
        position: 'absolute',
        bottom: '0.5in',
        left: '0.75in',
        right: '0.75in',
        textAlign: 'center',
        fontSize: '10px',
        color: '#7f8c8d',
        borderTop: '1px solid #ecf0f1',
        pt: 1
      }}>
        <Typography variant="caption" display="block">
          All environmental calculations verified by third-party Carbon Trust standards
        </Typography>
        <Typography variant="caption" display="block">
          Data methodology available upon request | Next audit scheduled: June 2025
        </Typography>
      </Box>
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

  // Print function with enhanced features
  const handlePrint = () => {
    // Add print button functionality matching HTML template
    const printStyle = document.createElement('style');
    printStyle.textContent = `
      @media print {
        .no-print { display: none !important; }
        body { margin: 0; font-family: Arial, sans-serif; }
        * { -webkit-print-color-adjust: exact; }
      }
    `;
    document.head.appendChild(printStyle);
    
    window.print();
    
    // Remove style after printing
    setTimeout(() => {
      document.head.removeChild(printStyle);
    }, 1000);
  };

  // Share function with clipboard fallback
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'E-Waste Management Report',
          text: 'Check out this comprehensive e-waste management report',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Report link copied to clipboard!');
      } catch (err) {
        console.log('Clipboard write failed:', err);
      }
    }
  };

  return (
    <Box className="report-container" sx={{ 
      maxWidth: '8.5in', 
      mx: 'auto', 
      p: 3, 
      backgroundColor: 'white', 
      minHeight: '11in',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      '@media print': {
        boxShadow: 'none',
        p: '0.75in',
        '& .no-print': {
          display: 'none !important'
        }
      }
    }}>
      {/* Floating Print Button (matching HTML template) */}
      <Button
        className="no-print"
        onClick={handlePrint}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: '10px 20px',
          background: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#229954'
          }
        }}
        startIcon={<PrintIcon />}
      >
        🖨️ Print Report
      </Button>

      {/* Action Bar */}
      <Box className="no-print" sx={{ 
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
            <IconButton onClick={onPrint || handlePrint} size="small">
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
            <IconButton onClick={onShare || handleShare} size="small">
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Report Content */}
      {renderCurrentPage()}

      {/* Page Navigation */}
      <Box className="no-print" sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
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
    </Box>
  );
};

export default ReportDetailTemplate; 