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
  Popover,
  InputAdornment
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
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

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
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 500, fontSize: '1rem' }}>
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
          {/* Tab content would go here */}
          {tabValue === 0 && (
            <Box>
              {/* Clients tab content */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                {/* Search and filter row */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    placeholder="Search clients..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      width: '240px', 
                      mr: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      } 
                    }}
                  />
                  <Button 
                    variant="outlined" 
                    startIcon={<FilterListIcon />}
                    sx={{ 
                      borderRadius: '8px', 
                      color: '#666',
                      borderColor: '#ddd'
                    }}
                  >
                    Filter
                  </Button>
                </Box>
                
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog()}
                  sx={{ 
                    bgcolor: '#4ECDC4', 
                    '&:hover': { bgcolor: '#3BAA9C' },
                    borderRadius: '8px'
                  }}
                >
                  Add Client
                </Button>
              </Box>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ 
                      '& th': { 
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'medium',
                        color: '#666'
                      } 
                    }}>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Contact Person</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell align="right">Devices Collected</TableCell>
                      <TableCell align="right">Total Weight (kg)</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} hover>
                        <TableCell 
                          sx={{ 
                            cursor: 'pointer',
                            color: '#1C392B',
                            fontWeight: 500,
                            '&:hover': { textDecoration: 'underline' }
                          }}
                          onClick={() => handleViewClient(client.id)}
                        >
                          {client.name}
                        </TableCell>
                        <TableCell>{client.contactPerson}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell align="right">{client.devicesCollected}</TableCell>
                        <TableCell align="right">{client.totalWeight.toFixed(1)}</TableCell>
                        <TableCell align="right">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog(client)}
                            sx={{ color: '#4ECDC4' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={(e) => handleDeleteClient(client.id, e)}
                            sx={{ color: '#666' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box>
              {/* Devices tab content */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                {/* Search and filter row */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    placeholder="Search devices..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      width: '240px', 
                      mr: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      } 
                    }}
                  />
                  <Button 
                    variant="outlined" 
                    startIcon={<FilterListIcon />}
                    sx={{ 
                      borderRadius: '8px', 
                      color: '#666',
                      borderColor: '#ddd'
                    }}
                  >
                    Filter
                  </Button>
                </Box>
                
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => alert('Add device functionality would go here')}
                  sx={{ 
                    bgcolor: '#4ECDC4', 
                    '&:hover': { bgcolor: '#3BAA9C' },
                    borderRadius: '8px'
                  }}
                >
                  Add Device
                </Button>
              </Box>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ 
                      '& th': { 
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'medium',
                        color: '#666'
                      } 
                    }}>
                      <TableCell>Client</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Manufacturer</TableCell>
                      <TableCell>Model</TableCell>
                      <TableCell>Serial Number</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Weight (kg)</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {devices.map((device) => (
                      <TableRow key={device.id} hover>
                        <TableCell>{device.clientName}</TableCell>
                        <TableCell 
                          sx={{ 
                            cursor: 'pointer',
                            color: '#1C392B',
                            fontWeight: 500,
                            '&:hover': { textDecoration: 'underline' }
                          }}
                          onClick={() => navigate(`/admin/devices/${device.id}`)}
                        >
                          {device.type}
                        </TableCell>
                        <TableCell>{device.manufacturer}</TableCell>
                        <TableCell>{device.model}</TableCell>
                        <TableCell>{device.serialNumber}</TableCell>
                        <TableCell>
                          <Chip 
                            label={device.status} 
                            color={
                              device.status === 'Refurbished' ? 'success' :
                              device.status === 'Recycled' ? 'primary' :
                              device.status === 'In Processing' ? 'warning' :
                              'default'
                            }
                            size="small"
                            sx={{ fontWeight: 500 }}
                          />
                        </TableCell>
                        <TableCell align="right">{device.weight.toFixed(1)}</TableCell>
                        <TableCell align="right">
                          <IconButton 
                            size="small" 
                            onClick={() => alert(`Edit device ${device.id}`)}
                            sx={{ color: '#4ECDC4' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={(e) => handleDeleteDevice(device.id, e)}
                            sx={{ color: '#666' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          {tabValue === 2 && (
            <Box>
              {/* Pickups tab content */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                {/* Search and filter row */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    placeholder="Search pickups..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      width: '240px', 
                      mr: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      } 
                    }}
                  />
                  <Button 
                    variant="outlined" 
                    startIcon={<FilterListIcon />}
                    sx={{ 
                      borderRadius: '8px', 
                      color: '#666',
                      borderColor: '#ddd'
                    }}
                  >
                    Filter
                  </Button>
                </Box>
                
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/admin/schedule-pickup')}
                  sx={{ 
                    bgcolor: '#62CBD0', // Light A color
                    '&:hover': { bgcolor: '#50B9BE' },
                    borderRadius: '8px'
                  }}
                >
                  Schedule Pickup
                </Button>
              </Box>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ 
                      '& th': { 
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'medium',
                        color: '#666'
                      } 
                    }}>
                      <TableCell>Client</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Devices</TableCell>
                      <TableCell align="right">Weight (kg)</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pickups.map((pickup) => (
                      <TableRow key={pickup.id} hover>
                        <TableCell>{pickup.clientName}</TableCell>
                        <TableCell 
                          sx={{ 
                            cursor: 'pointer',
                            color: '#1C392B',
                            fontWeight: 500,
                            '&:hover': { textDecoration: 'underline' }
                          }}
                          onClick={() => navigate(`/admin/pickups/${pickup.id}`)}
                        >
                          {pickup.date}
                        </TableCell>
                        <TableCell>{pickup.location}</TableCell>
                        <TableCell>
                          <Chip 
                            label={pickup.status} 
                            color={
                              pickup.status === 'completed' ? 'success' :
                              pickup.status === 'scheduled' ? 'primary' :
                              pickup.status === 'in-progress' ? 'warning' :
                              'default'
                            }
                            size="small"
                            sx={{ 
                              textTransform: 'capitalize',
                              fontWeight: 500
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{pickup.devices}</TableCell>
                        <TableCell align="right">{pickup.weight.toFixed(1)}</TableCell>
                        <TableCell align="right">
                          <IconButton 
                            size="small" 
                            onClick={() => alert(`Edit pickup ${pickup.id}`)}
                            sx={{ color: '#4ECDC4' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={(e) => handleDeletePickup(pickup.id, e)}
                            sx={{ color: '#666' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Paper>
      </>
    );
  };

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        {renderDashboardContent()}
        
        {/* Client Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
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
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>
            Are you sure you want to archive this {deleteType}?
          </DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
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
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 