import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Chip,
  InputBase,
  Popover
} from '@mui/material';
import {
  Recycling as RecyclingIcon,
  Co2 as Co2Icon,
  Forest as ForestIcon,
  DirectionsCar as CarIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  RemoveRedEye as EyeIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { dashboardAPI, companyAPI } from '../services/api';
import { formatNumber, formatWeight, formatCO2, getDeviceTypeColor, getDispositionColor } from '../utils/environmentalImpact';
import ClientDashboardLayout from '../components/layout/ClientDashboardLayout';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

const Dashboard = () => {
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
    navigate(`/dashboard/clients/${clientId}`);
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
          Dashboard
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
            aria-label="client tabs"
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: '500', color: '#333', fontSize: '1.1rem', mr: 3 }}>
                  Clients
                </Typography>
                
                {/* Search Box */}
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  width: 220,
                  px: 2,
                  py: 0.5,
                  mr: 2
                }}>
                  <SearchIcon sx={{ color: '#aaa', fontSize: '1.2rem', mr: 1 }} />
                  <InputBase placeholder="Search Clients" sx={{ fontSize: '0.9rem' }} />
                </Box>
                
                {/* Filter Button - Updated to match image */}
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{
                    border: '1px solid #e0e0e0',
                    color: '#666',
                    textTransform: 'none',
                    borderRadius: '4px',
                    mr: 'auto',
                    py: 0.75,
                    px: 2,
                    fontSize: '0.875rem',
                    '&:hover': {
                      border: '1px solid #ccc',
                      bgcolor: '#f9f9f9'
                    }
                  }}
                >
                  Filter
                </Button>
                
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
                <Table size="small" sx={{ width: '100%', tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow sx={{ bgcolor: '#e0e0e0' }}>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.5,
                        px: 1.5,
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        width: '16%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Company Name
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.5,
                        px: 1.5,
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        width: '14%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Contact Person
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.5,
                        px: 1.5,
                        fontSize: '0.7rem',
                        width: '19%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Email
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.5,
                        px: 1.5,
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        width: '12%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Phone
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.5,
                        px: 1.5,
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        width: '7%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.5,
                        px: 1.5,
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        width: '8%',
                        borderBottom: '1px solid #eee'
                      }}>
                        Weight (kg)
                      </TableCell>
                      <TableCell sx={{ 
                        fontWeight: '500', 
                        color: '#555', 
                        py: 1.5,
                        px: 1.5,
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        width: '18%',
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
                        sx={{ '&:hover': { bgcolor: '#f5f5f5' }, borderBottom: '1px solid #eee', height: '52px' }}
                      >
                        <TableCell 
                          sx={{ 
                            py: 1.5, 
                            px: 1.5, 
                            fontSize: '0.7rem',
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
                        <TableCell sx={{ py: 1.5, px: 1.5, fontSize: '0.7rem', textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.contactPerson}</TableCell>
                        <TableCell sx={{ py: 1.5, px: 1.5, fontSize: '0.7rem', textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.email}</TableCell>
                        <TableCell sx={{ py: 1.5, px: 1.5, fontSize: '0.7rem', textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.phone}</TableCell>
                        <TableCell sx={{ py: 1.5, px: 1.5, fontSize: '0.7rem', textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.devicesCollected > 0 ? '45' : '32'}</TableCell>
                        <TableCell sx={{ py: 1.5, px: 1.5, fontSize: '0.7rem', textOverflow: 'ellipsis', overflow: 'hidden' }}>{client.totalWeight.toFixed(1)}</TableCell>
                        <TableCell sx={{ py: 1.5, px: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                        <IconButton
                          size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.5,
                                mr: 0.5,
                                width: 26,
                                height: 26,
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
                                p: 0.5,
                                mr: 0.5,
                                width: 26,
                                height: 26,
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
                                p: 0.5,
                                mr: 0.5,
                                width: 26,
                                height: 26,
                                '&:hover': {
                                  bgcolor: 'rgba(224, 80, 80, 0.08)',
                                }
                              }}
                              onClick={(event) => handleDeleteClient(client.id, event)}
                        >
                              <DeleteIcon fontSize="small" />
                        </IconButton>
                          </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Box>
          </>
        )}
        
        {/* Rest of the component omitted for brevity */}
        </Paper>
      </>
    );
  };

  return (
    <Box>
      {renderDashboardContent()}
    </Box>
  );
};

export default Dashboard; 