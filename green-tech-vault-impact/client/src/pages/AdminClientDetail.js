import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { companyAPI, pickupAPI, deviceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';

const deviceStatuses = [
  'Received',
  'In Processing',
  'Refurbished',
  'Recycled',
  'Disposed'
];

const AdminClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  const [client, setClient] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [devices, setDevices] = useState([]);
  const [impact, setImpact] = useState(null);
  
  const [editingDevice, setEditingDevice] = useState(null);
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);
  const [deviceFormData, setDeviceFormData] = useState({
    type: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    status: '',
    weight: 0,
    notes: ''
  });

  useEffect(() => {
    fetchClientData();
  }, [clientId]);

  const fetchClientData = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, these would be actual API calls
      // For now, we'll use mock data
      
      // Mock client data
      const mockClient = {
        id: clientId,
        name: 'Tech Solutions Inc.',
        contactPerson: 'John Smith',
        email: 'john@techsolutions.com',
        phone: '(555) 123-4567',
        address: '123 Tech Blvd, San Francisco, CA',
        website: 'https://techsolutions.com',
        industry: 'Technology',
        employeeCount: 250,
        devicesCollected: 45,
        totalWeight: 156.8,
        createdAt: '2025-01-01T10:00:00Z',
        updatedAt: '2025-03-01T14:30:00Z'
      };
      
      // Mock pickups data
      const mockPickups = [
        {
          id: '1',
          clientId: clientId,
          scheduledDate: '2025-03-15',
          location: 'Corporate HQ',
          contactPerson: 'John Smith',
          contactPhone: '(555) 123-4567',
          status: 'completed',
          devices: 12,
          weight: 45.2,
          createdAt: '2025-03-01T12:00:00Z',
          updatedAt: '2025-03-15T16:30:00Z'
        },
        {
          id: '2',
          clientId: clientId,
          scheduledDate: '2025-03-20',
          location: 'Branch Office',
          contactPerson: 'Sarah Johnson',
          contactPhone: '(555) 987-6543',
          status: 'scheduled',
          devices: 0,
          weight: 0,
          createdAt: '2025-03-05T09:15:00Z',
          updatedAt: '2025-03-05T09:15:00Z'
        },
        {
          id: '3',
          clientId: clientId,
          scheduledDate: '2025-03-10',
          location: 'Data Center',
          contactPerson: 'Michael Brown',
          contactPhone: '(555) 456-7890',
          status: 'completed',
          devices: 15,
          weight: 78.3,
          createdAt: '2025-02-25T14:30:00Z',
          updatedAt: '2025-03-10T17:45:00Z'
        }
      ];
      
      // Mock devices data
      const mockDevices = [
        {
          id: '1',
          clientId: clientId,
          pickupId: '1',
          type: 'Laptop',
          manufacturer: 'Dell',
          model: 'XPS 15',
          serialNumber: 'DL12345678',
          status: 'Refurbished',
          weight: 2.5,
          notes: 'Good condition, upgraded RAM',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-20T10:15:00Z'
        },
        {
          id: '2',
          clientId: clientId,
          pickupId: '1',
          type: 'Desktop',
          manufacturer: 'HP',
          model: 'EliteDesk 800',
          serialNumber: 'HP87654321',
          status: 'Recycled',
          weight: 8.3,
          notes: 'Outdated hardware, recycled for parts',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-22T14:45:00Z'
        },
        {
          id: '3',
          clientId: clientId,
          pickupId: '3',
          type: 'Monitor',
          manufacturer: 'LG',
          model: '27UK850-W',
          serialNumber: 'LG98765432',
          status: 'Refurbished',
          weight: 6.2,
          notes: 'Minor scratches on screen, otherwise good',
          createdAt: '2025-03-10T17:45:00Z',
          updatedAt: '2025-03-18T11:30:00Z'
        }
      ];
      
      // Mock impact data
      const mockImpact = {
        totalDevices: 45,
        totalWeight: 156.8,
        co2Saved: 470.4,
        treesPlanted: 24,
        waterSaved: 12500,
        energySaved: 18750,
        landfillDiverted: 156.8,
        materialsRecovered: {
          metals: 78.4,
          plastics: 47.0,
          glass: 15.7,
          other: 15.7
        },
        deviceBreakdown: {
          laptops: 18,
          desktops: 12,
          monitors: 8,
          printers: 4,
          phones: 3
        },
        dispositionBreakdown: {
          refurbished: 28,
          recycled: 17
        }
      };
      
      setClient(mockClient);
      setPickups(mockPickups);
      setDevices(mockDevices);
      setImpact(mockImpact);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load client data');
      console.error('Client data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditDevice = (device) => {
    setEditingDevice(device);
    setDeviceFormData({
      type: device.type,
      manufacturer: device.manufacturer,
      model: device.model,
      serialNumber: device.serialNumber,
      status: device.status,
      weight: device.weight,
      notes: device.notes || ''
    });
    setDeviceDialogOpen(true);
  };

  const handleDeviceFormChange = (e) => {
    const { name, value } = e.target;
    setDeviceFormData({
      ...deviceFormData,
      [name]: name === 'weight' ? parseFloat(value) || 0 : value
    });
  };

  const handleSaveDevice = () => {
    // In a real implementation, this would make an API call
    const updatedDevices = devices.map(device => 
      device.id === editingDevice.id 
        ? { ...device, ...deviceFormData, updatedAt: new Date().toISOString() } 
        : device
    );
    setDevices(updatedDevices);
    setDeviceDialogOpen(false);
  };

  const handleDeleteDevice = (deviceId) => {
    // In a real implementation, this would make an API call
    const updatedDevices = devices.filter(device => device.id !== deviceId);
    setDevices(updatedDevices);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

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
        <Button variant="contained" onClick={() => fetchClientData()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <AppBar position="fixed" color="primary" sx={{ top: 0, left: 0, right: 0 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Green Tech Vault Admin
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Empty toolbar to create space below the AppBar */}
      
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/admin')}
          sx={{ mr: 2 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1">
          Client Profile: {client.name}
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Company Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Contact Person
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {client.contactPerson}
                </Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {client.email}
                </Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {client.phone}
                </Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Address
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {client.address}
                </Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Website
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {client.website}
                </Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Industry
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {client.industry}
                </Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Employees
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {client.employeeCount}
                </Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="outlined" 
                startIcon={<EditIcon />}
                onClick={() => alert('Edit client functionality would go here')}
              >
                Edit Client
              </Button>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Environmental Impact
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" align="center" color="primary">
                      {impact.totalDevices}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Devices Collected
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" align="center" color="primary">
                      {impact.totalWeight.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Total Weight (kg)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" align="center" color="primary">
                      {impact.co2Saved.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      CO2 Saved (kg)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" align="center" color="primary">
                      {impact.treesPlanted}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Trees Planted
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Device Disposition
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    Refurbished: {impact.dispositionBreakdown.refurbished}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    Recycled: {impact.dispositionBreakdown.recycled}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="client tabs">
                <Tab label="Pickups" />
                <Tab label="Devices" />
              </Tabs>
            </Box>
            
            {/* Pickups Tab */}
            {tabValue === 0 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Pickups
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => alert('Schedule pickup functionality would go here')}
                  >
                    Schedule Pickup
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Devices</TableCell>
                        <TableCell align="right">Weight (kg)</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pickups.map((pickup) => (
                        <TableRow key={pickup.id}>
                          <TableCell>{formatDate(pickup.scheduledDate)}</TableCell>
                          <TableCell>{pickup.location}</TableCell>
                          <TableCell>{pickup.contactPerson}</TableCell>
                          <TableCell>
                            <Chip 
                              label={pickup.status} 
                              color={
                                pickup.status === 'completed' ? 'success' :
                                pickup.status === 'in-progress' ? 'warning' :
                                'info'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">{pickup.devices}</TableCell>
                          <TableCell align="right">{pickup.weight.toFixed(1)}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => alert(`View pickup ${pickup.id} details`)}
                            >
                              <EditIcon />
                            </IconButton>
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
                  <Typography variant="h6">
                    Devices
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => alert('Add device functionality would go here')}
                  >
                    Add Device
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
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
                        <TableRow key={device.id}>
                          <TableCell>{device.type}</TableCell>
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
                            />
                          </TableCell>
                          <TableCell align="right">{device.weight.toFixed(1)}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEditDevice(device)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteDevice(device.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Device Edit Dialog */}
      <Dialog open={deviceDialogOpen} onClose={() => setDeviceDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Device
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Type"
                name="type"
                value={deviceFormData.type}
                onChange={handleDeviceFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Manufacturer"
                name="manufacturer"
                value={deviceFormData.manufacturer}
                onChange={handleDeviceFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                name="model"
                value={deviceFormData.model}
                onChange={handleDeviceFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Serial Number"
                name="serialNumber"
                value={deviceFormData.serialNumber}
                onChange={handleDeviceFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={deviceFormData.status}
                onChange={handleDeviceFormChange}
                required
              >
                {deviceStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={deviceFormData.weight}
                onChange={handleDeviceFormChange}
                required
                inputProps={{ step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                value={deviceFormData.notes}
                onChange={handleDeviceFormChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeviceDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveDevice} 
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminClientDetail; 