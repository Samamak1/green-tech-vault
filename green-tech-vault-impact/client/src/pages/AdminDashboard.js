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
  Chip,
  InputBase,
  Popover
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  RemoveRedEye as EyeIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState('');
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  
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

  const handleDeleteClient = (clientId, event) => {
    // Get the client object
    const client = clients.find(c => c.id === clientId);
    setDeleteType('Client');
    setDeleteItemId(clientId);
    setDeleteItemName(client.name);
    setDeleteAnchorEl(event.currentTarget);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDevice = (deviceId, event) => {
    // Get the device object
    const device = devices.find(d => d.id === deviceId);
    setDeleteType('Device');
    setDeleteItemId(deviceId);
    setDeleteItemName(`${device.manufacturer} ${device.model}`);
    setDeleteAnchorEl(event.currentTarget);
    setDeleteDialogOpen(true);
  };

  const handleDeletePickup = (pickupId, event) => {
    // Get the pickup object
    const pickup = pickups.find(p => p.id === pickupId);
    setDeleteType('Pickup');
    setDeleteItemId(pickupId);
    setDeleteItemName(`${pickup.clientName} - ${pickup.date}`);
    setDeleteAnchorEl(event.currentTarget);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteType === 'Client') {
      // Delete client logic
      const updatedClients = clients.filter(client => client.id !== deleteItemId);
      setClients(updatedClients);
    } else if (deleteType === 'Device') {
      // Delete device logic
      const updatedDevices = devices.filter(device => device.id !== deleteItemId);
      setDevices(updatedDevices);
    } else if (deleteType === 'Pickup') {
      // Delete pickup logic
      const updatedPickups = pickups.filter(pickup => pickup.id !== deleteItemId);
      setPickups(updatedPickups);
    }
    handleCloseDeleteDialog();
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteAnchorEl(null);
    setDeleteItemId(null);
    setDeleteItemName('');
    setDeleteType('');
  };

  const handleViewClient = (clientId) => {
    // Navigate to client detail page
    navigate(`/admin/clients/${clientId}`);
  };

  const handleAddPickup = (clientId) => {
    // Navigate to the pickup scheduling page instead of showing an alert
    navigate(`/schedule-pickup/${clientId}`);
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
        
        {/* Tab navigation - outside the Paper component */}
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

        {/* Content in Paper - separate from tabs */}
        <Paper sx={{ 
          p: 3, 
          borderRadius: '8px', 
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
          mb: 4
        }}>
          {/* Clients Tab */}
          {tabValue === 0 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: '500', color: '#333', fontSize: '1.1rem' }}>
                  Clients
                </Typography>
                <Button
                  variant="contained"
                  startIcon={null}
                  onClick={() => handleOpenDialog()}
                  sx={{ 
                    bgcolor: '#4ECDC4', 
                    '&:hover': { bgcolor: '#3dbdb5' }, 
                    borderRadius: '8px',
                    px: 3,
                    py: 1.2,
                    textTransform: 'none',
                    boxShadow: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 'normal',
                    height: 40
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <AddIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} /> Add Client
                  </span>
                </Button>
              </Box>
              
              <Box sx={{ 
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                  height: 8,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#e0e0e0',
                  borderRadius: 4,
                }
              }}>
                <Table size="medium" sx={{ minWidth: 1100, tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#e0e0e0' }}>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '18%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Company Name
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '15%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Contact Person
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        width: '20%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Email
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '12%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Phone
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '7%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '8%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Weight (kg)
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '20%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow 
                        key={client.id}
                        hover
                        sx={{ '&:hover': { bgcolor: '#f5f5f5' }, borderBottom: '1px solid #eee', height: '60px' }}
                      >
                        <TableCell 
                          sx={{ 
                            py: 2, 
                            px: 2, 
                            textOverflow: 'ellipsis', 
                            overflow: 'hidden',
                            cursor: 'pointer',
                            color: '#1C392B',
                            fontWeight: 500,
                            '&:hover': { textDecoration: 'underline' }
                          }} 
                          onClick={() => handleViewClient(client.id)}
                        >
                          {client.name}
                        </TableCell>
                        <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.contactPerson}</TableCell>
                        <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.email}</TableCell>
                        <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.phone}</TableCell>
                        <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.devicesCollected > 0 ? '45' : '32'}</TableCell>
                        <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.totalWeight.toFixed(1)}</TableCell>
                        <TableCell sx={{ py: 2, px: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 1,
                                mr: 0.75,
                                width: 36,
                                height: 36,
                                '&:hover': {
                                  bgcolor: 'rgba(86, 195, 201, 0.08)',
                                }
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
                                p: 1,
                                mr: 0.75,
                                width: 36,
                                height: 36,
                                '&:hover': {
                                  bgcolor: 'rgba(86, 195, 201, 0.08)',
                                }
                              }}
                              onClick={() => handleOpenDialog(client)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#E05050', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 1,
                                mr: 0.75,
                                width: 36,
                                height: 36,
                                '&:hover': {
                                  bgcolor: 'rgba(224, 80, 80, 0.08)',
                                }
                              }}
                              onClick={(event) => handleDeleteClient(client.id, event)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleAddPickup(client.id)}
                              sx={{ 
                                ml: 1, 
                                borderRadius: '8px', 
                                textTransform: 'none',
                                color: '#56C3C9',
                                borderColor: '#56C3C9',
                                fontSize: '0.8rem',
                                whiteSpace: 'nowrap',
                                px: 2.5,
                                py: 0.8,
                                height: 36,
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
              </Box>
            </>
          )}
          
          {/* Devices Tab */}
          {tabValue === 1 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: '500', color: '#333', fontSize: '1.1rem' }}>
                  All Devices
                </Typography>
                <Button
                  variant="contained"
                  startIcon={null}
                  onClick={() => alert('Add device functionality would go here')}
                  sx={{ 
                    bgcolor: '#4ECDC4', 
                    '&:hover': { bgcolor: '#3dbdb5' }, 
                    borderRadius: '8px',
                    px: 3,
                    py: 1.2,
                    textTransform: 'none',
                    boxShadow: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 'normal',
                    height: 40
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <AddIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} /> Add Device
                  </span>
                </Button>
              </Box>
              
              {/* Processing Status Bar */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#666', fontSize: '0.85rem' }}>
                  Processing Status: 42% (512 devices processed)
                </Typography>
                <Box sx={{ width: '100%', height: 8, bgcolor: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                  <Box sx={{ width: '42%', height: '100%', bgcolor: '#4ECDC4', borderRadius: 4 }}></Box>
                </Box>
              </Box>
              
              {/* Search and Filter Row */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  width: 220,
                  px: 2,
                  py: 0.5
                }}>
                  <SearchIcon sx={{ color: '#aaa', fontSize: '1.2rem', mr: 1 }} />
                  <InputBase placeholder="Search devices" sx={{ fontSize: '0.9rem' }} />
                </Box>
                
                <Button
                  variant="outlined"
                  startIcon={null}
                  sx={{
                    border: '1px solid #e0e0e0',
                    color: '#666',
                    textTransform: 'none',
                    borderRadius: '4px',
                    '&:hover': {
                      border: '1px solid #ccc',
                      bgcolor: '#f9f9f9'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Filter
                    <Box component="span" sx={{ 
                      display: 'inline-flex', 
                      ml: 1,
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      p: 0.5
                    }}>
                      <FilterListIcon sx={{ fontSize: '1rem' }} />
                    </Box>
                  </Box>
                </Button>
              </Box>
              
              <Box sx={{ 
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                  height: 8,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#e0e0e0',
                  borderRadius: 4,
                }
              }}>
                <Table size="medium" sx={{ minWidth: 1100, tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#e0e0e0' }}>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '12%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Client
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '10%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Type
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '14%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Manufacturer
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '14%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Model
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '18%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Serial Number
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '12%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '8%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Weight (kg)
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.8,
                        px: 2,
                        whiteSpace: 'nowrap',
                        width: '12%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {devices.map((device) => {
                      // Status styling based on status
                      const getStatusStyle = (status) => {
                        switch(status) {
                          case 'Refurbished':
                            return { bgcolor: '#4ECDC4', color: 'white' };
                          case 'Recycled':
                            return { bgcolor: '#4ECDA4', color: 'white' };
                          case 'In Processing':
                            return { bgcolor: '#FDA458', color: 'white' };
                          case 'Received':
                            return { bgcolor: '#5D7CE5', color: 'white' };
                          case 'Disposed':
                            return { bgcolor: '#E45858', color: 'white' };
                          default:
                            return { bgcolor: '#4ECDC4', color: 'white' };
                        }
                      };

                      // Randomly assign statuses for demo
                      const statuses = ['Refurbished', 'Recycled', 'In Processing', 'Received', 'Disposed'];
                      const randomStatus = device.id % 5 === 0 ? 'Disposed' : 
                                           device.id % 4 === 0 ? 'Received' : 
                                           device.id % 3 === 0 ? 'In Processing' : 
                                           device.id % 2 === 0 ? 'Recycled' : 'Refurbished';
                      
                      return (
                        <TableRow key={device.id} hover sx={{ '&:hover': { bgcolor: '#f5f5f5' }, borderBottom: '1px solid #eee', height: '60px' }}>
                          <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{device.clientName}</TableCell>
                          <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{device.type}</TableCell>
                          <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{device.manufacturer}</TableCell>
                          <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{device.model}</TableCell>
                          <TableCell sx={{ py: 2, px: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{device.serialNumber}</TableCell>
                          <TableCell sx={{ py: 2, px: 2 }}>
                            <Chip 
                              label={device.status} 
                              size="small"
                              sx={{ 
                                ...getStatusStyle(device.status),
                                borderRadius: '4px',
                                px: 1,
                                height: 28,
                                '& .MuiChip-label': {
                                  px: 1
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2, px: 2 }}>{device.weight.toFixed(1)}</TableCell>
                          <TableCell sx={{ py: 2, px: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                              <IconButton
                                size="small"
                                sx={{ 
                                  color: '#56C3C9', 
                                  border: '1px solid #e0e0e0',
                                  borderRadius: '50%',
                                  p: 1,
                                  mr: 0.75,
                                  width: 36,
                                  height: 36,
                                  '&:hover': {
                                    bgcolor: 'rgba(86, 195, 201, 0.08)',
                                  }
                                }}
                                onClick={() => alert(`Edit device ${device.id}`)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{ 
                                  color: '#E05050', 
                                  border: '1px solid #e0e0e0',
                                  borderRadius: '50%',
                                  p: 1,
                                  mr: 0.75,
                                  width: 36,
                                  height: 36,
                                  '&:hover': {
                                    bgcolor: 'rgba(224, 80, 80, 0.08)',
                                  }
                                }}
                                onClick={(event) => handleDeleteDevice(device.id, event)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
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
                      borderRadius: '8px', 
                      textTransform: 'none',
                      color: '#56C3C9',
                      borderColor: '#56C3C9',
                      px: 3,
                      py: 1.2,
                      fontSize: '0.9rem',
                      height: 40
                    }}
                  >
                    View Calendar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={null}
                    onClick={() => navigate('/schedule-pickup')}
                    sx={{ 
                      bgcolor: '#4ECDC4', 
                      '&:hover': { bgcolor: '#3dbdb5' }, 
                      borderRadius: '8px',
                      px: 3,
                      py: 1.2,
                      textTransform: 'none',
                      boxShadow: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 'normal',
                      height: 40
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <AddIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} /> Schedule Pickup
                    </span>
                  </Button>
                </Box>
              </Box>
              
              <TableContainer sx={{ boxShadow: 'none', borderRadius: '8px', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 1100, tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#e0e0e0' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.8, width: '18%' }}>Client</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.8, width: '12%' }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.8, width: '15%' }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.8, width: '12%' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.8, width: '8%' }}>Devices</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.8, width: '10%' }}>Weight (kg)</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', py: 1.8, width: '25%' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pickups.map((pickup) => (
                      <TableRow key={pickup.id} hover sx={{ '&:hover': { bgcolor: '#f5f5f5' }, height: '60px' }}>
                        <TableCell 
                          sx={{ 
                            py: 2, 
                            textOverflow: 'ellipsis', 
                            overflow: 'hidden',
                            cursor: 'pointer',
                            color: '#1C392B',
                            fontWeight: 500,
                            '&:hover': { textDecoration: 'underline' }
                          }}
                          onClick={() => navigate(`/admin/pickups/${pickup.id}`)}
                        >
                          {pickup.clientName}
                        </TableCell>
                        <TableCell sx={{ py: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{pickup.date}</TableCell>
                        <TableCell sx={{ py: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{pickup.location}</TableCell>
                        <TableCell sx={{ py: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>
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
                        <TableCell sx={{ py: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{pickup.devices}</TableCell>
                        <TableCell sx={{ py: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>{pickup.weight.toFixed(1)}</TableCell>
                        <TableCell sx={{ py: 2, textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 1,
                                mr: 0.75,
                                width: 36,
                                height: 36,
                                '&:hover': {
                                  bgcolor: 'rgba(86, 195, 201, 0.08)',
                                }
                              }}
                              onClick={() => navigate(`/admin/pickups/${pickup.id}`)}
                            >
                              <EyeIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 1,
                                mr: 0.75,
                                width: 36,
                                height: 36,
                                '&:hover': {
                                  bgcolor: 'rgba(86, 195, 201, 0.08)',
                                }
                              }}
                              onClick={() => alert(`Edit pickup ${pickup.id}`)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#E05050', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 1,
                                mr: 0.75,
                                width: 36,
                                height: 36,
                                '&:hover': {
                                  bgcolor: 'rgba(224, 80, 80, 0.08)',
                                }
                              }}
                              onClick={(event) => handleDeletePickup(pickup.id, event)}
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
        
        {/* Delete Confirmation Popover */}
        <Popover
          open={deleteDialogOpen}
          anchorEl={deleteAnchorEl}
          onClose={handleCloseDeleteDialog}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiPopover-paper': {
              p: 3,
              width: 450,
              maxWidth: '90vw',
              borderRadius: 2,
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Are you sure you want to archive this {deleteType}?
          </Typography>
          
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
            {deleteItemName}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {deleteType === 'Client' && deleteItemId && (() => {
              const client = clients.find(c => c.id === deleteItemId);
              return `${client.contactPerson}, ${client.email}, ${client.phone}, ${client.devicesCollected > 0 ? '45' : '32'}, ${client.totalWeight.toFixed(1)} kg`;
            })()}
            {deleteType === 'Device' && deleteItemId && (() => {
              const device = devices.find(d => d.id === deleteItemId);
              return `${device.type}, ${device.manufacturer}, ${device.serialNumber}, ${device.status}`;
            })()}
            {deleteType === 'Pickup' && deleteItemId && (() => {
              const pickup = pickups.find(p => p.id === deleteItemId);
              return `${pickup.date}, ${pickup.location}, ${pickup.status}, ${pickup.devices} devices`;
            })()}
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3 }}>
            Even though it will no longer appear in Your {deleteType}s, you can still view the {deleteType} in Archived {deleteType}s from your account
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="contained"
              onClick={confirmDelete}
              sx={{ 
                bgcolor: '#686868', 
                '&:hover': { bgcolor: '#4d4d4d' },
                borderRadius: 2,
                color: 'white',
                px: 2
              }}
              startIcon={<DeleteIcon />}
            >
              Archived
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseDeleteDialog}
              sx={{ 
                bgcolor: '#f0f0f0', 
                color: '#686868',
                '&:hover': { bgcolor: '#e0e0e0' },
                borderRadius: 2,
                px: 2
              }}
            >
              Cancel
            </Button>
          </Box>
        </Popover>
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