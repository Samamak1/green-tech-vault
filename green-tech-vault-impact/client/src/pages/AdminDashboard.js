import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tabs,
  Tab,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  RemoveRedEye as EyeIcon
} from '@mui/icons-material';
import { dashboardAPI, companyAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [devices, setDevices] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, these would be actual API calls
      // For now, we'll use mock data
      
      // Mock clients data
      const mockClients = [
        {
          id: '1',
          name: 'Tech Solutions Inc.',
          contactPerson: 'John Smith',
          email: 'john@techsolutions.com',
          phone: '(555) 123-4567',
          address: '123 Tech Blvd, San Francisco, CA',
          devicesCollected: 45,
          totalWeight: 156.8
        },
        {
          id: '2',
          name: 'Global Innovations',
          contactPerson: 'Sarah Johnson',
          email: 'sarah@globalinnovations.com',
          phone: '(555) 987-6543',
          address: '456 Innovation Way, Boston, MA',
          devicesCollected: 32,
          totalWeight: 98.5
        },
        {
          id: '3',
          name: 'EcoFriendly Corp',
          contactPerson: 'Michael Brown',
          email: 'michael@ecofriendly.com',
          phone: '(555) 456-7890',
          address: '789 Green St, Portland, OR',
          devicesCollected: 67,
          totalWeight: 210.3
        }
      ];
      
      // Mock devices data
      const mockDevices = [
        {
          id: '1',
          clientId: '1',
          clientName: 'Tech Solutions Inc.',
          type: 'Laptop',
          manufacturer: 'Dell',
          model: 'XPS 15',
          serialNumber: 'DL12345678',
          status: 'Refurbished',
          weight: 2.5
        },
        {
          id: '2',
          clientId: '1',
          clientName: 'Tech Solutions Inc.',
          type: 'Desktop',
          manufacturer: 'HP',
          model: 'EliteDesk 800',
          serialNumber: 'HP87654321',
          status: 'Recycled',
          weight: 8.3
        },
        {
          id: '3',
          clientId: '2',
          clientName: 'Global Innovations',
          type: 'Monitor',
          manufacturer: 'LG',
          model: '27UK850-W',
          serialNumber: 'LG98765432',
          status: 'Refurbished',
          weight: 6.2
        }
      ];
      
      // Mock pickups data
      const mockPickups = [
        {
          id: '1',
          clientId: '1',
          clientName: 'Tech Solutions Inc.',
          date: '2025-03-15',
          location: 'Corporate HQ',
          status: 'completed',
          devices: 12,
          weight: 45.2
        },
        {
          id: '2',
          clientId: '2',
          clientName: 'Global Innovations',
          date: '2025-03-18',
          location: 'Main Office',
          status: 'scheduled',
          devices: 0,
          weight: 0
        },
        {
          id: '3',
          clientId: '3',
          clientName: 'EcoFriendly Corp',
          date: '2025-03-10',
          location: 'Warehouse',
          status: 'completed',
          devices: 15,
          weight: 52.7
        }
      ];
      
      setClients(mockClients);
      setDevices(mockDevices);
      setPickups(mockPickups);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load admin data');
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (client = null) => {
    if (client) {
      setSelectedClient(client);
      setFormData({
        name: client.name,
        contactPerson: client.contactPerson,
        email: client.email,
        phone: client.phone,
        address: client.address
      });
    } else {
      setSelectedClient(null);
      setFormData({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitClient = () => {
    // In a real implementation, this would make an API call
    if (selectedClient) {
      // Update existing client
      const updatedClients = clients.map(client => 
        client.id === selectedClient.id 
          ? { ...client, ...formData } 
          : client
      );
      setClients(updatedClients);
    } else {
      // Add new client
      const newClient = {
        id: (clients.length + 1).toString(),
        ...formData,
        devicesCollected: 0,
        totalWeight: 0
      };
      setClients([...clients, newClient]);
    }
    handleCloseDialog();
  };

  const handleDeleteClient = (clientId) => {
    // In a real implementation, this would make an API call
    const updatedClients = clients.filter(client => client.id !== clientId);
    setClients(updatedClients);
  };

  const handleViewClient = (clientId) => {
    // Navigate to client detail page
    console.log('Navigating to client detail page:', `/admin/clients/${clientId}`);
    navigate(`/admin/clients/${clientId}`);
  };

  const handleAddPickup = (clientId) => {
    // In a real implementation, this would navigate to a pickup creation page
    alert(`Adding pickup for client ${clientId}`);
  };

  const renderDashboardContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={() => fetchAdminData()}>
            Retry
          </Button>
        </Box>
      );
    }

    return (
      <>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '220px', // Make it square-shaped
              aspectRatio: '1/1'
            }}>
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                156
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Total Devices Collected
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              height: '220px', // Make it square-shaped
              aspectRatio: '1/1'
            }}>
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                1,250.5
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Total Weight (kg)
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              height: '220px', // Make it square-shaped
              aspectRatio: '1/1'
            }}>
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                87
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Devices Refurbished
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              height: '220px', // Make it square-shaped
              aspectRatio: '1/1'
            }}>
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                69
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Devices Recycled
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Combined box for CO2 Saved and Trees Planted - spans 8 columns */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'row', // Changed to row to place items side by side
              justifyContent: 'space-around',
              alignItems: 'center',
              height: '440px', // Double the height of the boxes above
            }}>
              {/* First stat */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%' // Allocate space for first stat
              }}>
                <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                  3,750.8
                </Typography>
                <Typography variant="body1" sx={{ color: '#686868' }}>
                  CO2 Saved (kg)
                </Typography>
              </Box>
              
              {/* Divider */}
              <Box sx={{ 
                borderRight: '1px solid #e0e0e0',
                height: '70%'
              }} />
              
              {/* Second stat */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%' // Allocate space for second stat
              }}>
                <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                  187
                </Typography>
                <Typography variant="body1" sx={{ color: '#686868' }}>
                  Trees Planted
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          {/* Landfill Diversion Rate - spans 4 columns */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              height: '440px', // Double the height of the boxes above
            }}>
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                92.5%
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Landfill Diversion Rate
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Paper sx={{ 
          p: 3, 
          borderRadius: '8px', 
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
          mb: 4
        }}>
          {/* Tab navigation */}
          <Box sx={{ borderBottom: 1, borderColor: '#e0e0e0', mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="admin tabs"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 'normal',
                  color: '#666',
                  mx: 1,
                  '&.Mui-selected': {
                    color: '#4ECDC4',
                    fontWeight: 'medium',
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#4ECDC4',
                  height: 3
                }
              }}
            >
              <Tab label="Clients" />
              <Tab label="Devices" />
              <Tab label="Pickups" />
            </Tabs>
          </Box>

          {/* Clients Tab */}
          {tabValue === 0 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#333' }}>
                  Clients
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog()}
                  sx={{ 
                    bgcolor: '#4ECDC4', 
                    '&:hover': { bgcolor: '#3dbdb5' }, 
                    borderRadius: '50px',
                    px: 2,
                    textTransform: 'none',
                    boxShadow: 'none'
                  }}
                >
                  + Add Client
                </Button>
              </Box>
              
              <TableContainer sx={{ boxShadow: 'none', borderRadius: '8px' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Company Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Contact Person</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Phone</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Weight (kg)</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow 
                        key={client.id}
                        hover
                        sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}
                      >
                        <TableCell sx={{ py: 1.5 }}>{client.name}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{client.contactPerson}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{client.email}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{client.phone}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{client.devicesCollected > 0 ? '45' : '32'}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{client.totalWeight.toFixed(1)}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.7,
                                mr: 0.5
                              }}
                              onClick={() => handleViewClient(client.id)}
                            >
                              <EyeIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.7,
                                mr: 0.5
                              }}
                              onClick={() => handleOpenDialog(client)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#F44336', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.7,
                                mr: 0.5
                              }}
                              onClick={() => handleDeleteClient(client.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleAddPickup(client.id)}
                              sx={{ 
                                ml: 1, 
                                borderRadius: '50px', 
                                textTransform: 'none',
                                color: '#56C3C9',
                                borderColor: '#56C3C9',
                                fontSize: '0.75rem',
                                '&:hover': {
                                  borderColor: '#3dbdb5',
                                  bgcolor: 'rgba(86, 195, 201, 0.04)'
                                }
                              }}
                            >
                              Schedule Pickup
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          
          {/* Devices Tab */}
          {tabValue === 1 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#333' }}>
                  All Devices
                </Typography>
              </Box>
              
              <TableContainer sx={{ boxShadow: 'none', borderRadius: '8px' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Client</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Manufacturer</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Model</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Serial Number</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Weight (kg)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {devices.map((device) => (
                      <TableRow key={device.id} hover sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                        <TableCell sx={{ py: 1.5 }}>{device.clientName}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{device.type}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{device.manufacturer}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{device.model}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{device.serialNumber}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Chip 
                            label={device.status} 
                            color={
                              device.status === 'Refurbished' ? 'success' :
                              device.status === 'Recycled' ? 'primary' :
                              'default'
                            }
                            size="small"
                            sx={{ 
                              bgcolor: device.status === 'Refurbished' ? '#e3f7f5' : '#e3f2ff',
                              color: device.status === 'Refurbished' ? '#4ECDC4' : '#2196f3',
                              border: 'none'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.5 }}>{device.weight.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          
          {/* Pickups Tab */}
          {tabValue === 2 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#333' }}>
                  All Pickups
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/pickup-calendar')}
                    sx={{ 
                      mr: 2, 
                      borderRadius: '50px', 
                      textTransform: 'none',
                      color: '#56C3C9',
                      borderColor: '#56C3C9'
                    }}
                  >
                    View Calendar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => alert('Schedule pickup functionality would go here')}
                    sx={{ 
                      bgcolor: '#4ECDC4', 
                      '&:hover': { bgcolor: '#3dbdb5' }, 
                      borderRadius: '50px',
                      px: 2,
                      textTransform: 'none',
                      boxShadow: 'none'
                    }}
                  >
                    Schedule Pickup
                  </Button>
                </Box>
              </Box>
              
              <TableContainer sx={{ boxShadow: 'none', borderRadius: '8px' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Client</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Devices</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.5 }}>Weight (kg)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pickups.map((pickup) => (
                      <TableRow key={pickup.id} hover sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                        <TableCell sx={{ py: 1.5 }}>{pickup.clientName}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{pickup.date}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{pickup.location}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Chip 
                            label={pickup.status} 
                            size="small"
                            sx={{ 
                              bgcolor: 
                                pickup.status === 'completed' ? '#e3f7f5' :
                                pickup.status === 'in-progress' ? '#fff8e0' :
                                '#e3f2ff',
                              color: 
                                pickup.status === 'completed' ? '#4ECDC4' :
                                pickup.status === 'in-progress' ? '#ffa000' :
                                '#2196f3',
                              borderRadius: '50px',
                              textTransform: 'capitalize'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.5 }}>{pickup.devices}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{pickup.weight.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Paper>
        
        {/* Client Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedClient ? 'Edit Client' : 'Add New Client'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact Person"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  multiline
                  rows={2}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmitClient} variant="contained">
              {selectedClient ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <AdminLayout>
      {renderDashboardContent()}
    </AdminLayout>
  );
};

export default AdminDashboard; 