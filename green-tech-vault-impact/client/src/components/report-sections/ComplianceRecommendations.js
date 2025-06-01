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
  Chip,
  LinearProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const ComplianceRecommendations = () => {
  const complianceBadges = [
    'R2:2013 Certified',
    'e-Stewards Certified',
    'ISO 14001:2015',
    'NIST 800-88',
    'SOC 2 Type II',
    'EPA Compliant',
    'OSHA Certified',
    'Carbon Trust'
  ];

  const regulatoryCompliance = [
    { regulation: 'EPA RCRA', status: '✓ Compliant', nextAudit: 'Aug 2025' },
    { regulation: 'State E-Waste Laws', status: '✓ Compliant', nextAudit: 'Oct 2025' },
    { regulation: 'DOT Hazmat', status: '✓ Compliant', nextAudit: 'Jul 2025' },
    { regulation: 'Data Protection', status: '✓ Compliant', nextAudit: 'Sep 2025' }
  ];

  const performanceTargets = [
    { target: 'Volume Target', value: 81, goal: '3,500 lbs (+23%)' },
    { target: 'Diversion Rate', value: 96, goal: '96% (+2%)' },
    { target: 'Tax Benefits', value: 84, goal: '$22,000 (+19%)' },
    { target: 'Carbon Impact', value: 86, goal: '18.5 tons CO₂e (+22%)' }
  ];

  const immediateActions = [
    'Submit Ohio EPA Waste Reduction Grant application ($25K potential)',
    'Schedule Q2 collection events at 3 additional ACME locations',
    'Implement Gold Standard carbon credit registration',
    'Prepare EPA Environmental Justice Grant pre-application'
  ];

  const mediumTermGoals = [
    'Launch employee engagement program for e-waste awareness',
    'Develop white paper on corporate e-waste best practices',
    'Submit sustainability award applications (3 programs)',
    'Expand community partnerships to include 2 additional schools'
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', borderBottom: '2px solid #ecf0f1', pb: 1, mb: 3 }}>
        ✅ Compliance & Certifications
      </Typography>

      {/* Compliance Badges */}
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {complianceBadges.map((badge, index) => (
          <Grid item key={index}>
            <Chip 
              label={badge} 
              sx={{ 
                backgroundColor: '#27ae60', 
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#229954'
                }
              }} 
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Regulatory Compliance Status */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Regulatory Compliance Status
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#34495e' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Regulation</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Next Audit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {regulatoryCompliance.map((item, index) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' } }}>
                    <TableCell>{item.regulation}</TableCell>
                    <TableCell sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                      {item.status}
                    </TableCell>
                    <TableCell>{item.nextAudit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Data Security Certificates */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Data Security Certificates
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
            <Box sx={{ mb: 1, fontSize: '0.875rem' }}>🔒 847 Data Destruction Certificates Issued</Box>
            <Box sx={{ mb: 1, fontSize: '0.875rem' }}>📊 100% NIST 800-88 Compliance</Box>
            <Box sx={{ mb: 1, fontSize: '0.875rem' }}>🛡️ SOC 2 Controls Verified</Box>
            <Box sx={{ mb: 1, fontSize: '0.875rem' }}>📋 Chain of Custody: 98.7% Complete</Box>
            <Box sx={{ color: '#27ae60', fontWeight: 'bold', fontSize: '0.875rem' }}>
              ✓ Zero Data Breach Incidents
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Strategic Recommendations */}
      <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', mt: 4, mb: 3 }}>
        🚀 Strategic Recommendations for Q2 2025
      </Typography>

      {/* Optimization Opportunities */}
      <Paper sx={{ 
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', 
        color: 'white', 
        p: 3, 
        borderRadius: 3,
        mb: 3 
      }}>
        <Typography variant="h6" gutterBottom>
          💡 Optimization Opportunities
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Volume Expansion:
            </Typography>
            <Typography variant="body2">
              Target 3,500 lbs processing (+23% growth) through additional pickup locations
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Carbon Credits:
            </Typography>
            <Typography variant="body2">
              Register for Gold Standard program - potential $500+ quarterly revenue
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Immediate Actions */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Immediate Actions (30 days)
          </Typography>
          <List>
            {immediateActions.map((action, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <ListItemText 
                  primary={action}
                  primaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 3 }}>
            Medium-term Goals (90 days)
          </Typography>
          <List>
            {mediumTermGoals.map((goal, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <ListItemText 
                  primary={goal}
                  primaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Performance Targets */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            Performance Targets Q2 2025
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
            {performanceTargets.map((target, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {target.target}: {target.goal}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={target.value} 
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
      </Grid>

      {/* Next Steps & Account Management */}
      <Paper sx={{ 
        border: '2px solid #27ae60', 
        p: 3, 
        backgroundColor: '#f0fdf4',
        mb: 3 
      }}>
        <Typography variant="h6" sx={{ color: '#27ae60', mb: 2 }}>
          📞 Next Steps & Account Management
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
          <strong>Your Dedicated Account Manager:</strong> Sarah Chen, CSM<br />
          <strong>Direct Line:</strong> (513) 555-0123 | <strong>Email:</strong> s.chen@ecotechsolutions.com<br />
          <strong>Next Quarterly Review:</strong> July 15, 2025 | <strong>Emergency Contact:</strong> 24/7 hotline available<br /><br />
          <strong>Upcoming Schedule:</strong><br />
          • June 5: Q2 collection planning meeting<br />
          • June 20: Carbon credit application review<br />
          • July 1: Mid-quarter performance check-in
        </Typography>
      </Paper>

      {/* Thank You Banner */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Card sx={{ 
          backgroundColor: '#27ae60', 
          color: 'white',
          display: 'inline-block',
          borderRadius: '25px'
        }}>
          <CardContent sx={{ px: 4, py: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              🌟 Thank you for choosing EcoTech Solutions as your sustainability partner
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ComplianceRecommendations; 