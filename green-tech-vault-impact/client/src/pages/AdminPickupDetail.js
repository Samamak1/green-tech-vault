import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Divider,
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
  Card,
  CardContent,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  InputAdornment
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { pickupAPI, deviceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';
import AdminLayout from '../components/layout/AdminLayout';

const pickupStatuses = [
  'scheduled',
  'pickup complete',
  'processing',
  'sorting',
  'completed'
];

const deviceStatuses = [
  'Received',
  'In Processing',
  'Refurbished',
  'Recycled',
  'Disposed'
];

const AdminPickupDetail = () => {
  const { pickupId } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [pickup, setPickup] = useState(null);
  const [devices, setDevices] = useState([]);
  const [client, setClient] = useState(null);
  
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  
  const [editingDevice, setEditingDevice] = useState(null);
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);
  const [addingDevice, setAddingDevice] = useState(false);
  const [deviceFormData, setDeviceFormData] = useState({
    type: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    status: '',
    weight: 0,
    notes: ''
  });

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchPickupData();
  }, [pickupId]);

  const fetchPickupData = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, these would be actual API calls
      // For now, we'll use mock data
      
      // Mock pickup data
      const mockPickup = {
        id: pickupId,
        clientId: '1',
        scheduledDate: '2025-03-15',
        location: 'Corporate HQ',
        contactPerson: 'John Smith',
        contactPhone: '(555) 123-4567',
        status: 'processing',
        notes: 'Large volume of equipment expected',
        devices: 12,
        weight: 45.2,
        createdAt: '2025-03-01T12:00:00Z',
        updatedAt: '2025-03-15T16:30:00Z'
      };
      
      // Mock client data
      const mockClient = {
        id: mockPickup.clientId,
        name: 'Tech Solutions Inc.',
        contactPerson: 'John Smith',
        email: 'john@techsolutions.com',
        phone: '(555) 123-4567'
      };
      
      // Mock devices data - expanded to 12 devices to match the pickup count
      const mockDevices = [
        {
          id: '1',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
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
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Desktop',
          manufacturer: 'HP',
          model: 'EliteDesk 800',
          serialNumber: 'HP87654321',
          status: 'In Processing',
          weight: 8.3,
          notes: 'Outdated hardware, evaluating for parts',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-22T14:45:00Z'
        },
        {
          id: '3',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Monitor',
          manufacturer: 'LG',
          model: '27UK850-W',
          serialNumber: 'LG98765432',
          status: 'Received',
          weight: 6.2,
          notes: 'Minor scratches on screen, otherwise good',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-15T16:30:00Z'
        },
        {
          id: '4',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Printer',
          manufacturer: 'HP',
          model: 'LaserJet Pro',
          serialNumber: 'HP45678901',
          status: 'Recycled',
          weight: 12.5,
          notes: 'Non-functional, recycled for parts',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-25T11:15:00Z'
        },
        {
          id: '5',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Laptop',
          manufacturer: 'Lenovo',
          model: 'ThinkPad X1',
          serialNumber: 'LN12345678',
          status: 'In Processing',
          weight: 1.8,
          notes: 'Good condition, needs new battery',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-18T09:45:00Z'
        },
        {
          id: '6',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Desktop',
          manufacturer: 'Dell',
          model: 'OptiPlex 7050',
          serialNumber: 'DL87654321',
          status: 'Received',
          weight: 7.5,
          notes: 'Needs assessment',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-15T16:30:00Z'
        },
        {
          id: '7',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Monitor',
          manufacturer: 'Dell',
          model: 'UltraSharp U2719D',
          serialNumber: 'DL56781234',
          status: 'Received',
          weight: 5.8,
          notes: 'Good condition',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-15T16:30:00Z'
        },
        {
          id: '8',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Tablet',
          manufacturer: 'Apple',
          model: 'iPad Pro',
          serialNumber: 'AP12345678',
          status: 'Refurbished',
          weight: 0.7,
          notes: 'Minor scratches, replaced battery',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-21T13:20:00Z'
        },
        {
          id: '9',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Phone',
          manufacturer: 'Samsung',
          model: 'Galaxy S21',
          serialNumber: 'SG87654321',
          status: 'Recycled',
          weight: 0.2,
          notes: 'Cracked screen, recycled for parts',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-23T10:10:00Z'
        },
        {
          id: '10',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Laptop',
          manufacturer: 'Apple',
          model: 'MacBook Pro',
          serialNumber: 'AP98765432',
          status: 'In Processing',
          weight: 2.0,
          notes: 'Water damage, assessing for parts',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-19T14:30:00Z'
        },
        {
          id: '11',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Server',
          manufacturer: 'Dell',
          model: 'PowerEdge R740',
          serialNumber: 'DL24681357',
          status: 'Received',
          weight: 15.6,
          notes: 'Needs assessment',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-15T16:30:00Z'
        },
        {
          id: '12',
          pickupId: pickupId,
          clientId: mockPickup.clientId,
          type: 'Network Switch',
          manufacturer: 'Cisco',
          model: 'Catalyst 3850',
          serialNumber: 'CS13579246',
          status: 'Disposed',
          weight: 4.2,
          notes: 'Non-functional, disposed safely',
          createdAt: '2025-03-15T16:30:00Z',
          updatedAt: '2025-03-24T09:15:00Z'
        }
      ];
      
      setPickup(mockPickup);
      setDevices(mockDevices);
      setNewStatus(mockPickup.status);
      setClient(mockClient);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load pickup data');
      console.error('Pickup data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleSaveStatus = async () => {
    try {
      // In a real implementation, this would make an API call
      const updatedPickup = {
        ...pickup,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      
      setPickup(updatedPickup);
      setEditingStatus(false);
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handleEditDevice = (device) => {
    setEditingDevice(device);
    setAddingDevice(false);
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

  const handleAddDevice = () => {
    setEditingDevice(null);
    setAddingDevice(true);
    setDeviceFormData({
      type: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      status: 'Received',
      weight: 0,
      notes: ''
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
    if (addingDevice) {
      // Add new device
      const newDevice = {
        id: Date.now().toString(),
        pickupId: pickupId,
        clientId: client.id,
        ...deviceFormData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setDevices([...devices, newDevice]);
      
      // Update pickup device count
      const updatedPickup = {
        ...pickup,
        devices: pickup.devices + 1,
        weight: pickup.weight + newDevice.weight,
        updatedAt: new Date().toISOString()
      };
      setPickup(updatedPickup);
    } else {
      // Update existing device
      const updatedDevices = devices.map(device => 
        device.id === editingDevice.id 
          ? { ...device, ...deviceFormData, updatedAt: new Date().toISOString() } 
          : device
      );
      setDevices(updatedDevices);
    }
    
    setDeviceDialogOpen(false);
    
    // Check if all devices are either Refurbished, Recycled, or Disposed
    const allProcessed = devices.every(device => 
      device.status === 'Refurbished' || device.status === 'Recycled' || device.status === 'Disposed'
    );
    
    // If all devices are processed and pickup is not completed, suggest changing status
    if (allProcessed && pickup.status !== 'completed') {
      if (window.confirm('All devices have been processed. Would you like to mark this pickup as completed?')) {
        const updatedPickup = {
          ...pickup,
          status: 'completed',
          updatedAt: new Date().toISOString()
        };
        setPickup(updatedPickup);
        setNewStatus('completed');
      }
    }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'info';
      case 'pickup complete':
        return 'secondary';
      case 'processing':
        return 'warning';
      case 'sorting':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getDeviceStatusColor = (status) => {
    switch (status) {
      case 'Received':
        return 'info';
      case 'In Processing':
        return 'warning';
      case 'Refurbished':
        return 'success';
      case 'Recycled':
        return 'primary';
      case 'Disposed':
        return 'error';
      default:
        return 'default';
    }
  };

  // Calculate processing status
  const getProcessingStatus = () => {
    if (!devices || devices.length === 0) return { percent: 0, text: '0%' };
    
    const processedDevices = devices.filter(device => 
      device.status === 'Refurbished' || device.status === 'Recycled' || device.status === 'Disposed'
    ).length;
    
    const percent = Math.round((processedDevices / devices.length) * 100);
    return { 
      percent, 
      text: `${percent}% (${processedDevices}/${devices.length} devices processed)`
    };
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusChipStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'complete':
      case 'completed':
        return { bgcolor: '#e3f7f5', color: '#4ECDC4', borderRadius: '16px' };
      case 'processing':
      case 'in-processing':
      case 'in-progress':
        return { bgcolor: '#fff8e0', color: '#ffa000', borderRadius: '16px' };
      case 'refurbished':
        return { bgcolor: '#e3f7f5', color: '#4ECDC4', borderRadius: '16px' };
      case 'recycled':
        return { bgcolor: '#e3f2ff', color: '#2196f3', borderRadius: '16px' };
      case 'disposed':
        return { bgcolor: '#ffebee', color: '#f44336', borderRadius: '16px' };
      case 'received':
        return { bgcolor: '#e3f2ff', color: '#2196f3', borderRadius: '16px' };
      default:
        return { bgcolor: '#e0e0e0', color: '#616161', borderRadius: '16px' };
    }
  };

  const renderPickupContent = () => {
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
          <Button variant="contained" onClick={() => fetchPickupData()}>
            Retry
          </Button>
        </Box>
      );
    }
    
    return (
      <>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/admin/clients/' + client.id)}
            sx={{ mr: 2 }}
          >
            Back to Client
          </Button>
          <Typography variant="h4" component="h1">
            Pickup Details
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h6" gutterBottom>
                  Pickup Information
                </Typography>
                {!editingStatus ? (
                  <Button 
                    variant="outlined" 
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => setEditingStatus(true)}
                  >
                    Edit Status
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveStatus}
                  >
                    Save
                  </Button>
                )}
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Client
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {client.name}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Date
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {formatDate(pickup.scheduledDate)}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {pickup.location}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Contact
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {pickup.contactPerson}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {pickup.contactPhone}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {!editingStatus ? (
                    <Chip 
                      label={pickup.status} 
                      color={getStatusColor(pickup.status)}
                      size="small"
                    />
                  ) : (
                    <FormControl fullWidth size="small">
                      <Select
                        value={newStatus}
                        onChange={handleStatusChange}
                      >
                        {pickupStatuses.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Notes
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {pickup.notes || 'No notes available'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" align="center" color="primary">
                        {devices.length}
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary">
                        Total Devices
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" align="center" color="primary">
                        {devices.reduce((sum, device) => sum + device.weight, 0).toFixed(1)}
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary">
                        Total Weight (kg)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Device Status
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Received: {devices.filter(d => d.status === 'Received').length}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      In Processing: {devices.filter(d => d.status === 'In Processing').length}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Refurbished: {devices.filter(d => d.status === 'Refurbished').length}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Recycled: {devices.filter(d => d.status === 'Recycled').length}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Disposed: {devices.filter(d => d.status === 'Disposed').length}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Devices
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddDevice}
                >
                  Add Device
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              {/* Processing Status */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Processing Status: {getProcessingStatus().text}
                </Typography>
                <Box sx={{ width: '100%', bgcolor: 'grey.300', borderRadius: 1, height: 10 }}>
                  <Box 
                    sx={{ 
                      width: `${getProcessingStatus().percent}%`, 
                      bgcolor: 'primary.main', 
                      height: 10,
                      borderRadius: 1
                    }} 
                  />
                </Box>
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
                            color={getDeviceStatusColor(device.status)}
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
            </Paper>
          </Grid>
        </Grid>
        
        {/* Device Edit/Add Dialog */}
        <Dialog open={deviceDialogOpen} onClose={() => setDeviceDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {addingDevice ? 'Add New Device' : 'Edit Device'}
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
              disabled={!deviceFormData.type || !deviceFormData.manufacturer || !deviceFormData.model || !deviceFormData.serialNumber}
            >
              {addingDevice ? 'Add Device' : 'Save Changes'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <AdminLayout>
      <Box sx={{ py: 3, px: 3 }}>
        {renderPickupContent()}
      </Box>
    </AdminLayout>
  );
};

export default AdminPickupDetail; 