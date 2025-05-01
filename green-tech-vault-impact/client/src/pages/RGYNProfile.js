import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import ClientDashboardLayout from '../components/layout/ClientDashboardLayout';
import { useAuth } from '../context/AuthContext';

const RGYNProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leftPanelTab, setLeftPanelTab] = useState('Company Information');

  useEffect(() => {
    // In a real app, you would fetch the actual client data
    // For now, we'll use mock data
    const fetchClientData = () => {
      setLoading(true);
      
      // Use Leila's company information for this profile
      const mockClient = {
        id: '1',
        name: "Leila's Company",
        contactPerson: 'Leila Meyer',
        email: 'leilaameyer2@gmail.com',
        phone: '(555) 123-4567',
        address: '123 Green St, Cincinnati OH, 51729',
        website: 'www.leilascompany.com',
        industry: 'Technology',
        employees: '42',
        username: '@Lmeyer',
        devicesProcessed: 45,
        totalWeight: 156.8,
        co2Saved: 125.7,
        treesPlanted: 12,
        refurbished: 28,
        recycled: 15,
        disposed: 2
      };

      setClient(mockClient);
      setLoading(false);
    };

    fetchClientData();
  }, []);

  const handleGoBack = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleLeftPanelTabChange = (tabName) => {
    setLeftPanelTab(tabName);
  };

  if (loading) {
    return (
      <ClientDashboardLayout>
        <Box sx={{ p: 3 }}>Loading...</Box>
      </ClientDashboardLayout>
    );
  }

  return (
    <ClientDashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleGoBack}
            sx={{ color: '#888', fontSize: '0.9rem', fontWeight: 'normal', textTransform: 'none' }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h6" sx={{ ml: 2, color: '#444', fontWeight: 500 }}>
            Client Profile: {client.name}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column - Information Panels */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 0, borderRadius: 2, height: '100%', overflow: 'hidden' }}>
              {/* Tab Selection Buttons */}
              <Box sx={{ 
                borderBottom: '1px solid #e0e0e0',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start'
              }}>
                <Box 
                  onClick={() => handleLeftPanelTabChange('Company Information')}
                  sx={{ 
                    p: 2,
                    pb: 1,
                    cursor: 'pointer',
                    borderBottom: leftPanelTab === 'Company Information' ? '4px solid #4ECDC4' : 'none',
                    color: leftPanelTab === 'Company Information' ? '#4ECDC4' : '#808080',
                    fontWeight: 400,
                    fontSize: '16px',
                    mr: 2
                  }}
                >
                  Company Information
                </Box>
                <Box 
                  onClick={() => handleLeftPanelTabChange('Environmental Impact')}
                  sx={{ 
                    p: 2,
                    pb: 1,
                    cursor: 'pointer',
                    borderBottom: leftPanelTab === 'Environmental Impact' ? '4px solid #4ECDC4' : 'none',
                    color: leftPanelTab === 'Environmental Impact' ? '#4ECDC4' : '#808080',
                    fontWeight: 400,
                    fontSize: '16px'
                  }}
                >
                  Environmental Impact
                </Box>
              </Box>

              {/* Company Information Panel */}
              {leftPanelTab === 'Company Information' && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        cursor: 'pointer' 
                      }}
                    >
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 500 }}>
                        Company Information
                      </Typography>
                    </Box>
                    <Button 
                      startIcon={<EditIcon />} 
                      size="small"
                      sx={{ 
                        color: '#4ECDC4', 
                        fontSize: '0.8rem', 
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        py: 0.5,
                        px: 1.5,
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                  <Divider sx={{ mt: 1, mb: 3 }} />

                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Company Name</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.name}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Email</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.email}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Phone</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.phone}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Address</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.address}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Website</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.website}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Industry</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.industry}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Employees</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.employees}</Typography>
                      </Grid>
                      
                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Username</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.username}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1 }}>
                      Contact Information
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Contact Name</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.contactPerson}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Email</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.email}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Phone</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{client.phone}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )}
              
              {/* Environmental Impact Panel */}
              {leftPanelTab === 'Environmental Impact' && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 2 }}>
                    Environmental Impact Summary
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                          {client.devicesProcessed}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Devices Processed
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                          {client.totalWeight.toFixed(1)} kg
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Weight
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                          {client.co2Saved.toFixed(1)} kg
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          CO2 Saved
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                          {client.treesPlanted}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Trees Planted
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mt: 4, mb: 2 }}>
                    Device Disposition
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                          {client.refurbished}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Refurbished
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                          {client.recycled}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Recycled
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                          {client.disposed}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Disposed
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
          
          {/* Right Column - Graph/Metrics */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Environmental Impact</Typography>
              
              <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2, mb: 3 }}>
                <Typography variant="h4" sx={{ color: '#4ECDC4', fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
                  {Math.round(client.co2Saved / 10)} %
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  Carbon Footprint Reduction
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                Your sustainability efforts have made a significant impact on the environment. By recycling and refurbishing electronic devices, you've reduced carbon emissions and prevented e-waste from reaching landfills.
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Environmental Equivalents</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                        {Math.round(client.co2Saved / 8.8)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cars off road for a day
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                        {Math.round(client.totalWeight * 0.4)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Gallons of water saved
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ClientDashboardLayout>
  );
};

export default RGYNProfile; 