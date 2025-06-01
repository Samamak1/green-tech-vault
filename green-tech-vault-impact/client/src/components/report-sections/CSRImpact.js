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
  CardContent,
  LinearProgress,
  Avatar
} from '@mui/material';

const CSRImpact = () => {
  const communityStories = [
    {
      icon: '🏫',
      color: '#3498db',
      title: 'Cincinnati Public Schools - Roosevelt STEM Academy',
      subtitle: '67 refurbished laptops donated | 340 students impacted',
      quote: '"The donation of these laptops has transformed our computer lab. Students who previously had limited access to technology now have 1:1 device access during STEM classes. This has improved our coding program participation by 145%."',
      author: '- Maria Santos, STEM Coordinator'
    },
    {
      icon: '🏢',
      color: '#e74c3c',
      title: 'Boys & Girls Club of Greater Cincinnati',
      subtitle: '34 desktops + 45 monitors donated | 180 youth impacted',
      quote: '"The computer lab upgrade has enabled us to launch our first-ever coding bootcamp for teenagers. We\'ve already seen 3 participants land paid internships with local tech companies."',
      author: '- James Mitchell, Program Director'
    }
  ];

  const sdgAlignments = [
    { number: 4, color: '#e74c3c', title: 'Quality Education', impact: '3,400 students reached' },
    { number: 8, color: '#8e44ad', title: 'Decent Work', impact: '23 countries reached' },
    { number: 9, color: '#f39c12', title: 'Industry Innovation', impact: 'Digital access' },
    { number: 12, color: '#27ae60', title: 'Responsible Consumption', impact: '94% diverted' }
  ];

  const esgScores = [
    { category: 'Environmental Score', points: 12, progress: 85, description: 'Waste reduction & carbon impact' },
    { category: 'Social Score', points: 8, progress: 76, description: 'Community engagement & education' },
    { category: 'Governance Score', points: 5, progress: 68, description: 'Transparency & compliance' }
  ];

  const fundingOpportunities = [
    {
      source: 'EPA Environmental Justice Grant',
      type: 'Federal',
      eligibility: '✓ Qualified',
      value: '$75,000',
      status: 'Eligible - Nov 2025'
    },
    {
      source: 'Ohio EPA Waste Reduction Grant',
      type: 'State',
      eligibility: '✓ Qualified',
      value: '$25,000',
      status: 'Application Ready'
    },
    {
      source: 'Digital Equity Partnership (DEP)',
      type: 'Corporate',
      eligibility: '✓ Qualified',
      value: '$150,000',
      status: 'Pre-application'
    },
    {
      source: 'Sustainable Electronics Initiative',
      type: 'Foundation',
      eligibility: '✓ Qualified',
      value: '$50,000',
      status: 'Under Review'
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', borderBottom: '2px solid #ecf0f1', pb: 1, mb: 3 }}>
        🤝 Corporate Social Responsibility Impact
      </Typography>

      {/* CSR Achievement Summary */}
      <Paper sx={{ 
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', 
        color: 'white', 
        p: 3, 
        borderRadius: 3,
        mb: 4 
      }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          🎯 CSR Achievement Summary
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          ACME Corporation's partnership with EcoTech Solutions has directly impacted 12 educational institutions and 4 community organizations, reaching over 3,400 students and community members. Your digital equity initiatives align with UN Sustainable Development Goals 4, 8, 9, and 12.
        </Typography>
      </Paper>

      {/* Community Impact Stories */}
      <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 3 }}>
        Community Impact Stories
      </Typography>
      
      {communityStories.map((story, index) => (
        <Paper key={index} sx={{ border: '2px solid #ecf0f1', p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ 
              width: 60, 
              height: 60, 
              backgroundColor: story.color, 
              fontSize: '1.5rem',
              mr: 2 
            }}>
              {story.icon}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 0.5 }}>
                {story.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {story.subtitle}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ lineHeight: 1.5, mb: 1, fontStyle: 'italic' }}>
            {story.quote}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {story.author}
          </Typography>
        </Paper>
      ))}

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* SDG Alignment */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            SDG Alignment
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
            {sdgAlignments.map((sdg, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  width: 30, 
                  height: 30, 
                  backgroundColor: sdg.color, 
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  mr: 1.5
                }}>
                  {sdg.number}
                </Avatar>
                <Typography variant="body2">
                  {sdg.title} - {sdg.impact}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* ESG Scoring Impact */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#27ae60' }}>
            ESG Scoring Impact
          </Typography>
          <Paper sx={{ backgroundColor: '#f8f9fa', p: 2 }}>
            {esgScores.map((score, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {score.category}: +{score.points} points
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={score.progress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 0.5,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#27ae60'
                    }
                  }} 
                />
                <Typography variant="caption" color="text.secondary">
                  {score.description}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Grant & Funding Opportunities */}
      <Typography variant="h6" gutterBottom sx={{ color: '#27ae60', mt: 4 }}>
        Grant & Funding Opportunities
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#34495e' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Funding Source</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Eligibility</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Potential Value</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Application Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fundingOpportunities.map((opportunity, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' } }}>
                <TableCell>{opportunity.source}</TableCell>
                <TableCell>{opportunity.type}</TableCell>
                <TableCell>{opportunity.eligibility}</TableCell>
                <TableCell>{opportunity.value}</TableCell>
                <TableCell>{opportunity.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Award Recognition Opportunities */}
      <Paper sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', p: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#856404', mb: 1 }}>
          🏆 Award Recognition Opportunities
        </Typography>
        <Typography variant="body2">
          Your program qualifies for: EPA Green Chemistry Award, Cincinnati Business Sustainability Award, and Ohio Recycling Award. Applications can be submitted using this report data.
        </Typography>
      </Paper>
    </Box>
  );
};

export default CSRImpact; 