import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const RYGNProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data to display until real data fetching is implemented
    const fetchClientData = () => {
      setLoading(true);
      
      // Use mock company information for this profile
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
        username: '@lmeyer',
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

  if (loading) {
    return (
      <Box sx={{ p: 3, mt: '64px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={{ ...getContentWrapperStyle() }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontSize: '1rem' }}>
          RYGN Profile
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 2, p: 2 }}>
              <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                Company Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                    <Box sx={{ mb: 2, width: '100%' }}>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>
                            Company Name
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.name}
                          </Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>
                            Email
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.email}
                          </Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>
                            Phone
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.phone}
                          </Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>
                            Address
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.address}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 2, p: 2 }}>
              <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                Environmental Impact
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>
                        Refurbished
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#185B5F' }}>
                        {client.refurbished}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>
                        Recycled
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#185B5F' }}>
                        {client.recycled}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>
                        Disposed
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#185B5F' }}>
                        {client.disposed}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center', height: '100%' }}>
                        <Typography variant="h5" sx={{ color: '#185B5F', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.devicesProcessed}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Devices Processed
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center', height: '100%' }}>
                        <Typography variant="h5" sx={{ color: '#185B5F', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.totalWeight.toFixed(1)} kg
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Total Weight
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center', height: '100%' }}>
                        <Typography variant="h5" sx={{ color: '#185B5F', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.co2Saved.toFixed(1)} kg
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          CO2 Saved
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center', height: '100%' }}>
                        <Typography variant="h5" sx={{ color: '#185B5F', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.treesPlanted}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Trees Planted
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RYGNProfile; 