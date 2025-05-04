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
  Tabs,
  Tab,
  Chip,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const RGYNProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leftPanelTab, setLeftPanelTab] = useState('Company Information');
  const [rightPanelTab, setRightPanelTab] = useState('Pickups');
  const [mockPickups, setMockPickups] = useState([]);
  const [mockDevices, setMockDevices] = useState([]);

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
        username: '@lmeyer',
        devicesProcessed: 45,
        totalWeight: 156.8,
        co2Saved: 125.7,
        treesPlanted: 12,
        refurbished: 28,
        recycled: 15,
        disposed: 2
      };

      // Mock pickups data for this client
      const pickups = [
        {
          id: '1',
          client: "Leila's Company",
          date: '01/24/2025',
          time: '14:00',
          location: 'Cincinnati Warehouse',
          status: 'Complete',
          weight: 2.5
        },
        {
          id: '2',
          client: "Leila's Company",
          date: '03/15/2025',
          time: '10:30',
          location: 'Cincinnati Warehouse',
          status: 'In Process',
          weight: 1.8
        },
        {
          id: '3',
          client: "Leila's Company",
          date: '05/20/2025',
          time: '15:45',
          location: 'Global Innovations HQ',
          status: 'Received',
          weight: 3.2
        },
        {
          id: '4',
          client: "Leila's Company",
          date: '06/10/2025',
          time: '13:15',
          location: 'Cincinnati Warehouse',
          status: 'Complete',
          weight: 4.5
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
        },
        {
          id: '3',
          type: 'Monitor',
          manufacturer: 'LG',
          model: '27UK850-W',
          serialNumber: 'LG98765432',
          status: 'Refurbished',
          weight: 6.2
        }
      ];

      setClient(mockClient);
      setMockPickups(pickups);
      setMockDevices(devices);
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

  const handleRightPanelTabChange = (event, newValue) => {
    setRightPanelTab(newValue);
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
      <Box sx={getContentContainerStyle()} data-boundary="true">
        <Box sx={getContentWrapperStyle()}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <Typography variant="h5" component="h1" gutterBottom>
          Profile
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleGoBack}
            sx={{ color: '#888', fontSize: '0.8rem', fontWeight: 'normal', textTransform: 'none' }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h6" sx={{ ml: 2, color: '#444', fontWeight: 500, fontSize: '1rem' }}>
            Client Profile: {client ? client.name : ''}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
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
                    borderBottom: leftPanelTab === 'Company Information' ? '3px solid #4ECDC4' : 'none',
                    color: leftPanelTab === 'Company Information' ? '#4ECDC4' : '#808080',
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
                    borderBottom: leftPanelTab === 'Environmental Impact' ? '3px solid #4ECDC4' : 'none',
                    color: leftPanelTab === 'Environmental Impact' ? '#4ECDC4' : '#808080',
                    fontWeight: 400,
                    fontSize: '14px'
                  }}
                >
                  Environmental Impact
                </Box>
              </Box>

              {leftPanelTab === 'Company Information' && (
                <Box sx={{ p: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, fontSize: '0.95rem' }}>
                      Company Information
                    </Typography>
                    <Button 
                      startIcon={<EditIcon fontSize="small" />} 
                      size="small"
                      sx={{ 
                        color: '#4ECDC4', 
                        fontSize: '0.75rem', 
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        py: 0.3,
                        px: 1,
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ mt: 1 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Company Name</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.name}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Email</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.email}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Phone</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.phone}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Address</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.address}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Website</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.website}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Industry</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.industry}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Employees</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.employees}</Typography>
                      </Grid>
                      
                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Username</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.username}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, fontSize: '0.95rem' }}>
                      Client Information
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Grid container spacing={1}>
                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Contact Name</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.contactPerson}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Email</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.email}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Phone</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.phone}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )}
              
              {leftPanelTab === 'Environmental Impact' && (
                <Box sx={{ p: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                  <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                    Environmental Impact Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.devicesProcessed}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Devices Processed
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.totalWeight.toFixed(1)} kg
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Total Weight
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.co2Saved.toFixed(1)} kg
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          CO2 Saved
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.treesPlanted}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Trees Planted
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mt: 3, mb: 1, fontSize: '0.95rem' }}>
                    Device Disposition
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.refurbished}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Refurbished
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.recycled}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Recycled
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#4ECDC4', fontWeight: 'bold', fontSize: '1rem' }}>
                          {client.disposed}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          Disposed
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
              <Tabs
                value={rightPanelTab}
                onChange={handleRightPanelTabChange}
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  minHeight: '40px',
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#4ECDC4',
                    height: 3
                  },
                  '& .Mui-selected': {
                    color: '#4ECDC4 !important',
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#808080',
                    p: 1,
                    minHeight: '40px'
                  }
                }}
              >
                <Tab label="Pickups" value="Pickups" />
                <Tab label="Devices" value="Devices" />
              </Tabs>
              
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
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterListIcon sx={{ fontSize: '18px' }} />}
                    size="small"
                    sx={{ 
                      color: '#666',
                      borderColor: '#e0e0e0',
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      py: 0.5,
                      height: '32px',
                      '&:hover': {
                        borderColor: '#ccc'
                      }
                    }}
                  >
                    Filter
                  </Button>
                  
                  {rightPanelTab === 'Pickups' && (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: '#4ECDC4',
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        py: 0.5,
                        height: '32px',
                        '&:hover': {
                          bgcolor: '#3daea6'
                        }
                      }}
                    >
                      Schedule a Pickup
                    </Button>
                  )}
                </Box>
              </Box>
              
              {rightPanelTab === 'Pickups' && (
                <TableContainer sx={{ maxHeight: 'calc(100vh - 230px)', overflow: 'auto' }}>
                  <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox" sx={{ bgcolor: '#f5f5f5', width: '20px' }}></TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Client</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '12%' }}>Date</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Time</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '18%' }}>Location</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '12%' }}>Status</TableCell>
                        <TableCell align="right" sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Weight (kg)</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockPickups.map((pickup) => (
                        <TableRow key={pickup.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                          <TableCell padding="checkbox" sx={{ py: 0.5 }}></TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pickup.client}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>{pickup.date}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>{pickup.time}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pickup.location}</TableCell>
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
                          <TableCell align="right" sx={{ fontSize: '0.75rem', py: 0.5 }}>{pickup.weight}</TableCell>
                          <TableCell sx={{ py: 0.5 }}>
                            <IconButton size="small" sx={{ p: 0.3 }}>
                              <EditIcon sx={{ color: '#4ECDC4', fontSize: '16px' }} />
                            </IconButton>
                            <IconButton size="small" sx={{ p: 0.3 }}>
                              <DeleteIcon sx={{ color: '#f44336', fontSize: '16px' }} />
                            </IconButton>
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
                        <TableCell padding="checkbox" sx={{ bgcolor: '#f5f5f5', width: '20px' }}></TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '12%' }}>Type</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Manufacturer</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Model</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Serial Number</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '12%' }}>Status</TableCell>
                        <TableCell align="right" sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Weight (kg)</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockDevices.map((device) => (
                        <TableRow key={device.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                          <TableCell padding="checkbox" sx={{ py: 0.5 }}></TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>{device.type}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{device.manufacturer}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{device.model}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{device.serialNumber}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>{device.status}</TableCell>
                          <TableCell align="right" sx={{ fontSize: '0.75rem', py: 0.5 }}>{device.weight}</TableCell>
                          <TableCell sx={{ py: 0.5 }}>
                            <IconButton size="small" sx={{ p: 0.3 }}>
                              <VisibilityIcon sx={{ color: '#4ECDC4', fontSize: '16px' }} />
                            </IconButton>
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

export default RGYNProfile; 