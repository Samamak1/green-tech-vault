import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Tab,
  Tabs,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RYGNECOReporting from '../components/ReportingModule';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));

const ClientReports = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage or your auth system
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.token) {
      navigate('/login');
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Reports Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and generate comprehensive e-waste management reports
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="RYGNECO Reports" />
          <Tab label="Report History" />
          <Tab label="Scheduled Reports" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <StyledPaper elevation={0}>
          <RYGNECOReporting 
            clientId={user.clientId || user.id} 
            clientName={user.companyName || user.name} 
          />
        </StyledPaper>
      )}

      {tabValue === 1 && (
        <StyledPaper>
          <Typography variant="h5" gutterBottom>
            Report History
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your previously generated reports will appear here.
          </Typography>
          {/* Add report history table here */}
        </StyledPaper>
      )}

      {tabValue === 2 && (
        <StyledPaper>
          <Typography variant="h5" gutterBottom>
            Scheduled Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Set up automatic report generation on a schedule.
          </Typography>
          {/* Add scheduled reports interface here */}
        </StyledPaper>
      )}
    </Container>
  );
};

export default ClientReports; 