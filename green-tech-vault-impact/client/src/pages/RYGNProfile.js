import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Search as SearchIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const RYGNProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leftPanelTab, setLeftPanelTab] = useState('Company Information');
  const [rightPanelTab, setRightPanelTab] = useState('Pickups');
  const [mockPickups, setMockPickups] = useState([]);
  const [mockDevices, setMockDevices] = useState([]);
  
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
        disposed: 2,
        rygnContact: {
          name: 'Sarah Johnson',
          title: 'Account Manager',
          email: 'sarah.johnson@rygn.com',
          phone: '(555) 987-6543',
          preferredTime: '9:00 AM - 5:00 PM EST'
        },
        pickupPreferences: {
          frequency: 'Monthly',
          preferredDay: 'Wednesday',
          preferredTime: 'Afternoon (1PM - 5PM)',
          specialInstructions: 'Please use the loading dock at the back of the building. Call 15 minutes before arrival.'
        }
      };

      // Mock pickups data for this client
      const pickups = [
        {
          id: '1',
          rygnContact: "Sarah Johnson",
          date: '01/24/2025',
          time: '14:00',
          location: 'Cincinnati Warehouse',
          status: 'Complete',
          weight: 2.5
        },
        {
          id: '2',
          rygnContact: "Michael Chen",
          date: '03/15/2025',
          time: '10:30',
          location: 'Cincinnati Warehouse',
          status: 'In Process',
          weight: 1.8
        }
      ];

      // Mock devices data for this client
      const devices = [
        {
          id: '1',
          type: 'Laptop',
          manufacturer: 'Dell',
          model: 'XPS 15',
          serialNumber: 'DL12345678',
          status: 'Refurbished',
          weight: 2.5
        },
        {
          id: '2',
          type: 'Desktop',
          manufacturer: 'HP',
          model: 'EliteDesk 800',
          serialNumber: 'HP87654321',
          status: 'Recycled',
          weight: 8.3
        }
      ];

      setClient(mockClient);
      setMockPickups(pickups);
      setMockDevices(devices);
      setLoading(false);
    };

    fetchClientData();
  }, []);

  const handleLeftPanelTabChange = (tabName) => {
    setLeftPanelTab(tabName);
  };

  const handleRightPanelTabChange = (tabName) => {
    setRightPanelTab(tabName);
  };

  const getStatusChipColor = (status) => {
    switch(status.toLowerCase()) {
      case 'complete':
        return { bgcolor: '#e8f5e9', color: '#2e7d32' };
      case 'in process':
        return { bgcolor: '#fff8e1', color: '#f57c00' };
      case 'received':
        return { bgcolor: '#e3f2fd', color: '#1565c0' };
      default:
        return { bgcolor: '#f5f5f5', color: '#616161' };
    }
  };

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
            <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 2 }}>
              <Box sx={{ 
                display: 'flex',
                borderBottom: '1px solid #e0e0e0',
              }}>
                <Box 
                  onClick={() => handleLeftPanelTabChange('Company Information')}
                  sx={{ 
                    p: 1.5,
                    pb: 1,
                    cursor: 'pointer',
                    borderBottom: leftPanelTab === 'Company Information' ? '3px solid #185B5F' : 'none',
                    color: leftPanelTab === 'Company Information' ? '#185B5F' : '#808080',
                    fontWeight: 400,
                    fontSize: '14px',
                    mr: 2
                  }}
                >
                  Company Information
                </Box>
                <Box 
                  onClick={() => handleLeftPanelTabChange('Environmental Impact')}
                  sx={{ 
                    p: 1.5,
                    pb: 1,
                    cursor: 'pointer',
                    borderBottom: leftPanelTab === 'Environmental Impact' ? '3px solid #185B5F' : 'none',
                    color: leftPanelTab === 'Environmental Impact' ? '#185B5F' : '#808080',
                    fontWeight: 400,
                    fontSize: '14px',
                    mr: 2
                  }}
                >
                  Environmental Impact
                </Box>
                <Box 
                  onClick={() => handleLeftPanelTabChange('Pickup Information')}
                  sx={{ 
                    p: 1.5,
                    pb: 1,
                    cursor: 'pointer',
                    borderBottom: leftPanelTab === 'Pickup Information' ? '3px solid #185B5F' : 'none',
                    color: leftPanelTab === 'Pickup Information' ? '#185B5F' : '#808080',
                    fontWeight: 400,
                    fontSize: '14px',
                    mr: 2
                  }}
                >
                  Pickup Information
                </Box>
                <Box sx={{ flexGrow: 1 }} />
              </Box>

              {leftPanelTab === 'Company Information' && (
                <Box sx={{ p: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Box sx={{ mb: 2, width: '100%' }}>
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Company Name</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.name}</Typography>
                            </Grid>

                            <Grid item xs={4}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Email</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.email}</Typography>
                            </Grid>

                            <Grid item xs={4}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Phone</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.phone}</Typography>
                            </Grid>

                            <Grid item xs={4}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Address</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.address}</Typography>
                            </Grid>

                            <Grid item xs={4}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Website</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.website}</Typography>
                            </Grid>

                            <Grid item xs={4}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Industry</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.industry}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {leftPanelTab === 'Environmental Impact' && (
                <Box sx={{ p: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                        Device Disposition
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Box sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Refurbished</Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#185B5F' }}>{client.refurbished}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Recycled</Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#185B5F' }}>{client.recycled}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Disposed</Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#185B5F' }}>{client.disposed}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={8}>
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
                </Box>
              )}
              
              {leftPanelTab === 'Pickup Information' && (
                <Box sx={{ p: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                        RYGN Contact Information
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Name:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.rygnContact.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Title:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.rygnContact.title}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Email:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.rygnContact.email}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Phone:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.rygnContact.phone}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Hours:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.rygnContact.preferredTime}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                        Pickup Preferences
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Frequency:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.pickupPreferences.frequency}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Preferred Day:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.pickupPreferences.preferredDay}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Preferred Time:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.pickupPreferences.preferredTime}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Special Instructions:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {client.pickupPreferences.specialInstructions}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => navigate('/dashboard/schedule-pickup')}
                        sx={{ 
                          bgcolor: '#185B5F',
                          '&:hover': { bgcolor: '#124548' },
                          fontSize: '0.8rem',
                          mt: 1
                        }}
                      >
                        Schedule a Pickup
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
              <Box sx={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
                <Box 
                  onClick={() => handleRightPanelTabChange('Pickups')}
                  sx={{ 
                    p: 1.5,
                    pb: 1,
                    cursor: 'pointer',
                    borderBottom: rightPanelTab === 'Pickups' ? '3px solid #185B5F' : 'none',
                    color: rightPanelTab === 'Pickups' ? '#185B5F' : '#808080',
                    fontWeight: 400,
                    fontSize: '14px',
                    mr: 2
                  }}
                >
                  Pickups
                </Box>
                <Box 
                  onClick={() => handleRightPanelTabChange('Devices')}
                  sx={{ 
                    p: 1.5,
                    pb: 1,
                    cursor: 'pointer',
                    borderBottom: rightPanelTab === 'Devices' ? '3px solid #185B5F' : 'none',
                    color: rightPanelTab === 'Devices' ? '#185B5F' : '#808080',
                    fontWeight: 400,
                    fontSize: '14px'
                  }}
                >
                  Devices
                </Box>
              </Box>
              
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextField
                  placeholder="Search here"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ fontSize: '18px' }} />
                      </InputAdornment>
                    ),
                    sx: { height: '32px', fontSize: '0.8rem' }
                  }}
                  sx={{ 
                    width: '55%',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1
                    }
                  }}
                />
                
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/dashboard/schedule-pickup')}
                  sx={{
                    bgcolor: '#185B5F',
                    textTransform: 'none',
                    fontSize: '0.75rem',
                    py: 0.5,
                    height: '32px',
                    '&:hover': {
                      bgcolor: '#124548'
                    }
                  }}
                >
                  Schedule Pickup
                </Button>
              </Box>
              
              {rightPanelTab === 'Pickups' && (
                <TableContainer sx={{ maxHeight: 'calc(100vh - 230px)', overflow: 'auto' }}>
                  <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>RYGN Contact</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '12%' }}>Date</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Time</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '18%' }}>Location</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '12%' }}>Status</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Weight (kg)</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%', textAlign: 'center' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockPickups.map((pickup) => (
                        <TableRow key={pickup.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {pickup.rygnContact}
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                            {pickup.date}
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                            {pickup.time}
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {pickup.location}
                          </TableCell>
                          <TableCell sx={{ py: 0.5 }}>
                            <Chip 
                              label={pickup.status} 
                              size="small"
                              sx={{ 
                                borderRadius: 1, 
                                fontSize: '0.65rem',
                                py: 0,
                                height: '20px',
                                ...getStatusChipColor(pickup.status)
                              }} 
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                            {pickup.weight}
                          </TableCell>
                          <TableCell sx={{ py: 0.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <IconButton 
                                size="small" 
                                sx={{ color: '#4ECDC4' }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                sx={{ color: '#666' }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              
              {rightPanelTab === 'Devices' && (
                <TableContainer sx={{ maxHeight: 'calc(100vh - 230px)', overflow: 'auto' }}>
                  <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Type</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '14%' }}>Manufacturer</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '14%' }}>Model</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Serial Number</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Status</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Weight (kg)</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%', textAlign: 'center' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockDevices.map((device) => (
                        <TableRow key={device.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                            {device.type}
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {device.manufacturer}
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {device.model}
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {device.serialNumber}
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                            <Chip 
                              label={device.status} 
                              size="small"
                              sx={{ 
                                borderRadius: 1, 
                                fontSize: '0.65rem',
                                py: 0,
                                height: '20px',
                                bgcolor: device.status === 'Refurbished' ? '#e8f5e9' : 
                                  device.status === 'Recycled' ? '#e3f2fd' : 
                                  device.status === 'Disposed' ? '#ffebee' : '#f5f5f5',
                                color: device.status === 'Refurbished' ? '#2e7d32' : 
                                  device.status === 'Recycled' ? '#1565c0' : 
                                  device.status === 'Disposed' ? '#c62828' : '#616161'
                              }} 
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                            {device.weight}
                          </TableCell>
                          <TableCell sx={{ py: 0.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <IconButton 
                                size="small" 
                                sx={{ color: '#4ECDC4' }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                sx={{ color: '#666' }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RYGNProfile; 