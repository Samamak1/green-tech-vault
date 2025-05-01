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
  Chip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import ClientDashboardLayout from '../components/layout/ClientDashboardLayout';
import { useAuth } from '../context/AuthContext';

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
                      Client Information
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
          
          {/* Right Column - Pickups and Devices */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 0, borderRadius: 2, height: '100%', overflow: 'hidden' }}>
              {/* Tabs for Pickups and Devices */}
              <Tabs
                value={rightPanelTab}
                onChange={handleRightPanelTabChange}
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#4ECDC4',
                    height: 4
                  },
                  '& .Mui-selected': {
                    color: '#4ECDC4 !important',
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#808080',
                    py: 2
                  }
                }}
              >
                <Tab label="Pickups" value="Pickups" />
                <Tab label="Devices" value="Devices" />
              </Tabs>
              
              {/* Search and Filter Area */}
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  placeholder="Search here"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    width: '70%',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{ 
                    color: '#666',
                    borderColor: '#e0e0e0',
                    textTransform: 'none',
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
                    sx={{
                      bgcolor: '#4ECDC4',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#3daea6'
                      },
                      ml: 1
                    }}
                  >
                    Schedule a Pickup
                  </Button>
                )}
              </Box>
              
              {/* Table Content */}
              {rightPanelTab === 'Pickups' && (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Weight (kg)</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockPickups.map((pickup) => (
                        <TableRow key={pickup.id}>
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell>{pickup.client}</TableCell>
                          <TableCell>{pickup.date}</TableCell>
                          <TableCell>{pickup.time}</TableCell>
                          <TableCell>{pickup.location}</TableCell>
                          <TableCell>
                            <Chip 
                              label={pickup.status} 
                              size="small"
                              sx={{ 
                                borderRadius: 1, 
                                ...getStatusChipColor(pickup.status)
                              }} 
                            />
                          </TableCell>
                          <TableCell align="right">{pickup.weight}</TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <EditIcon fontSize="small" sx={{ color: '#4ECDC4' }} />
                            </IconButton>
                            <IconButton size="small">
                              <DeleteIcon fontSize="small" sx={{ color: '#f44336' }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              
              {rightPanelTab === 'Devices' && (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Serial Number</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Weight (kg)</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockDevices.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell>{device.type}</TableCell>
                          <TableCell>{device.manufacturer}</TableCell>
                          <TableCell>{device.model}</TableCell>
                          <TableCell>{device.serialNumber}</TableCell>
                          <TableCell>{device.status}</TableCell>
                          <TableCell align="right">{device.weight}</TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <VisibilityIcon fontSize="small" sx={{ color: '#4ECDC4' }} />
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
    </ClientDashboardLayout>
  );
};

export default RGYNProfile; 