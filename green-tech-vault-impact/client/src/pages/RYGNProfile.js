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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Add as AddIcon
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
  const [selectedPickups, setSelectedPickups] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [editPickupId, setEditPickupId] = useState(null);
  const [editDeviceId, setEditDeviceId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    rygnContact: "",
    date: "",
    time: "",
    location: "",
    status: "",
    weight: 0
  });
  const [editDeviceFormData, setEditDeviceFormData] = useState({
    type: "",
    make: "",
    model: "",
    serial: "",
    status: "",
    weight: 0
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState('');
  const [deleteDeviceId, setDeleteDeviceId] = useState(null);
  const [deleteDeviceDialogOpen, setDeleteDeviceDialogOpen] = useState(false);
  
  // Get the pickup being edited
  const pickupBeingEdited = editPickupId 
    ? mockPickups.find(p => p.id === editPickupId) 
    : null;
  
  // Get the device being edited
  const deviceBeingEdited = editDeviceId 
    ? mockDevices.find(d => d.id === editDeviceId) 
    : null;
  
  // Handle opening the edit modal for pickups
  useEffect(() => {
    if (pickupBeingEdited) {
      setEditFormData({
        rygnContact: pickupBeingEdited.rygnContact,
        date: pickupBeingEdited.date,
        time: pickupBeingEdited.time,
        location: pickupBeingEdited.location,
        status: pickupBeingEdited.status,
        weight: pickupBeingEdited.weight
      });
    }
  }, [pickupBeingEdited]);
  
  // Handle opening the edit modal for devices
  useEffect(() => {
    if (deviceBeingEdited) {
      setEditDeviceFormData({
        type: deviceBeingEdited.type,
        make: deviceBeingEdited.make,
        model: deviceBeingEdited.model,
        serial: deviceBeingEdited.serial,
        status: deviceBeingEdited.status,
        weight: deviceBeingEdited.weight
      });
    }
  }, [deviceBeingEdited]);
  
  // Handle form input changes for pickup
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  
  // Handle form input changes for device
  const handleDeviceFormChange = (e) => {
    const { name, value } = e.target;
    setEditDeviceFormData({
      ...editDeviceFormData,
      [name]: value
    });
  };
  
  // Save pickup edits
  const handleSavePickupEdit = () => {
    if (editPickupId) {
      const updatedPickups = mockPickups.map(pickup => {
        if (pickup.id === editPickupId) {
          return {
            ...pickup,
            ...editFormData
          };
        }
        return pickup;
      });
      
      setMockPickups(updatedPickups);
      setEditPickupId(null);
    }
  };
  
  // Save device edits
  const handleSaveDeviceEdit = () => {
    if (editDeviceId) {
      const updatedDevices = mockDevices.map(device => {
        if (device.id === editDeviceId) {
          return {
            ...device,
            ...editDeviceFormData
          };
        }
        return device;
      });
      
      setMockDevices(updatedDevices);
      setEditDeviceId(null);
    }
  };
  
  // Close edit modals
  const handleCloseEdit = () => {
    setEditPickupId(null);
    setEditDeviceId(null);
  };
  
  // Function to open delete confirmation dialog
  const handleOpenDeleteDialog = (item, type) => {
    setItemToDelete(item);
    setDeleteItemType(type);
    setDeleteDialogOpen(true);
  };
  
  // Function to close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  
  // Function to handle item deletion
  const handleDeleteItem = () => {
    if (deleteItemType === 'pickup') {
      // Filter out the deleted pickup
      const updatedPickups = mockPickups.filter(pickup => pickup.id !== itemToDelete.id);
      setMockPickups(updatedPickups);
      // Also remove from selected pickups if it was selected
      setSelectedPickups(selectedPickups.filter(id => id !== itemToDelete.id));
    } else if (deleteItemType === 'device') {
      // Filter out the deleted device
      const updatedDevices = mockDevices.filter(device => device.id !== itemToDelete.id);
      setMockDevices(updatedDevices);
      // Also remove from selected devices if it was selected
      setSelectedDevices(selectedDevices.filter(id => id !== itemToDelete.id));
    }
    
    // Close the dialog
    handleCloseDeleteDialog();
  };
  
  // Handle device edit
  const handleEditDevice = (deviceId) => {
    setEditDeviceId(deviceId);
    // Set the edit device form data
    const device = mockDevices.find(d => d.id === deviceId);
    if (device) {
      setEditDeviceFormData({
        type: device.type,
        make: device.make,
        model: device.model,
        serial: device.serial,
        status: device.status,
        weight: device.weight
      });
    }
  };
  
  // Handle device delete confirmation
  const handleDeleteDeviceConfirm = (deviceId) => {
    setDeleteDeviceId(deviceId);
    setDeleteDeviceDialogOpen(true);
  };
  
  // Handle device delete
  const handleDeleteDevice = () => {
    setMockDevices(mockDevices.filter(device => device.id !== deleteDeviceId));
    setDeleteDeviceId(null);
    setDeleteDeviceDialogOpen(false);
  };
  
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
        environmentalImpact: {
          devicesProcessed: 45,
          totalWeight: 156.8,
          co2Saved: 125.7,
          treesPlanted: 12,
          devicesRefurbished: 28,
          devicesRecycled: 15,
          devicesDisposed: 2
        },
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

      // Populate mock devices
      const mockDevicesData = [
        {
          id: '1',
          type: 'Laptop',
          make: 'Dell',
          model: 'Latitude 7420',
          serial: 'SN5768291',
          status: 'Recycled',
          weight: 2.5
        },
        {
          id: '2',
          type: 'Desktop',
          make: 'HP',
          model: 'ProDesk 600',
          serial: 'SN8901234',
          status: 'Refurbished',
          weight: 8.3
        },
        {
          id: '3',
          type: 'Monitor',
          make: 'Samsung',
          model: 'S24R650',
          serial: 'SN1209348',
          status: 'Processed',
          weight: 3.7
        },
        {
          id: '4',
          type: 'Tablet',
          make: 'Apple',
          model: 'iPad Air',
          serial: 'SN4538721',
          status: 'Pending',
          weight: 0.9
        },
        {
          id: '5',
          type: 'Smartphone',
          make: 'Samsung',
          model: 'Galaxy S21',
          serial: 'SN9765412',
          status: 'Refurbished',
          weight: 0.5
        }
      ];

      setClient(mockClient);
      setMockPickups(pickups);
      setMockDevices(mockDevicesData);
      setLoading(false);
    };

    fetchClientData();
  }, []);

  useEffect(() => {
    // Show pickup information in the left panel when a pickup is selected
    if (selectedPickups.length > 0 && leftPanelTab !== 'Pickup Information') {
      setLeftPanelTab('Pickup Information');
    }
  }, [selectedPickups]);

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
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 2, fontSize: '0.95rem' }}>
                        Environmental Impact
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={6}>
                            <Paper elevation={0} sx={{ 
                              p: 2, 
                              textAlign: 'center',
                              bgcolor: '#f7f9fc',
                              borderRadius: 2,
                              boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                              minHeight: '100px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}>
                              <Typography variant="h4" sx={{ color: '#444', fontWeight: '700', fontSize: '1.5rem', mb: 1 }}>
                                {client.environmentalImpact.devicesProcessed}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#666' }}>
                                Devices Processed
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper elevation={0} sx={{ 
                              p: 2, 
                              textAlign: 'center',
                              bgcolor: '#f7f9fc',
                              borderRadius: 2,
                              boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                              minHeight: '100px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}>
                              <Typography variant="h4" sx={{ color: '#444', fontWeight: '700', fontSize: '1.5rem', mb: 1 }}>
                                {client.environmentalImpact.totalWeight}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#666' }}>
                                Total Weight (kg)
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper elevation={0} sx={{ 
                              p: 2, 
                              textAlign: 'center',
                              bgcolor: '#f7f9fc',
                              borderRadius: 2,
                              boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                              minHeight: '100px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}>
                              <Typography variant="h4" sx={{ color: '#444', fontWeight: '700', fontSize: '1.5rem', mb: 1 }}>
                                {client.environmentalImpact.co2Saved}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#666' }}>
                                CO2 Saved (kg)
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper elevation={0} sx={{ 
                              p: 2, 
                              textAlign: 'center',
                              bgcolor: '#f7f9fc',
                              borderRadius: 2,
                              boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                              minHeight: '100px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}>
                              <Typography variant="h4" sx={{ color: '#444', fontWeight: '700', fontSize: '1.5rem', mb: 1 }}>
                                {client.environmentalImpact.treesPlanted}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#666' }}>
                                Trees Planted
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 2, fontSize: '0.95rem' }}>
                        Device Disposition
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Box sx={{ pl: 2, mb: 4 }}>
                        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                          <strong>Refurbished:</strong> {client.environmentalImpact.devicesRefurbished}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                          <strong>Recycled:</strong> {client.environmentalImpact.devicesRecycled}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                          <strong>Disposed:</strong> {client.environmentalImpact.devicesDisposed}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {leftPanelTab === 'Pickup Information' && (
                <Box sx={{ p: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <>
                        <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                          Selected Pickup Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        {selectedPickups.length > 0 ? (
                          // Show the selected pickup's information
                          selectedPickups.map(pickupId => {
                            const pickup = mockPickups.find(p => p.id === pickupId);
                            if (!pickup) return null;
                            
                            return (
                              <Box key={pickup.id} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', mb: 1 }}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                    RYGN Contact:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                    {pickup.rygnContact}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 1 }}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                    Date:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                    {pickup.date}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 1 }}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                    Time:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                    {pickup.time}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 1 }}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                    Location:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                    {pickup.location}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 1 }}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                    Status:
                                  </Typography>
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
                                </Box>
                                <Box sx={{ display: 'flex', mb: 1 }}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                    Weight (kg):
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                    {pickup.weight}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })
                        ) : (
                          // Show the first pickup's information if no checkboxes are selected
                          mockPickups.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                              <Box sx={{ display: 'flex', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                  RYGN Contact:
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                  {mockPickups[0].rygnContact}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                  Date:
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                  {mockPickups[0].date}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                  Time:
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                  {mockPickups[0].time}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                  Location:
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                  {mockPickups[0].location}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                  Status:
                                </Typography>
                                <Chip 
                                  label={mockPickups[0].status} 
                                  size="small"
                                  sx={{ 
                                    borderRadius: 1, 
                                    fontSize: '0.65rem',
                                    py: 0,
                                    height: '20px',
                                    ...getStatusChipColor(mockPickups[0].status)
                                  }} 
                                />
                              </Box>
                              <Box sx={{ display: 'flex', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                                  Weight (kg):
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                  {mockPickups[0].weight}
                                </Typography>
                              </Box>
                            </Box>
                          )
                        )}
                      </>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                        RYGN Contact
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', width: '40%' }}>
                            Name:
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {selectedPickups.length > 0 && mockPickups.find(p => p.id === selectedPickups[0])?.rygnContact || client.rygnContact.name}
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
                    bgcolor: '#62CBD0',
                    textTransform: 'none',
                    fontSize: '0.75rem',
                    py: 0.5,
                    height: '32px',
                    '&:hover': {
                      bgcolor: '#50B9BE'
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
                        <TableCell padding="checkbox" sx={{ bgcolor: '#f5f5f5', width: '5%' }}></TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>RYGN Contact</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '12%' }}>Date</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Time</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '20%' }}>Location</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Status</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Weight (kg)</TableCell>
                        <TableCell align="center" sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '13%' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockPickups.map((pickup) => (
                        <TableRow 
                          key={pickup.id} 
                          hover
                        >
                          <TableCell padding="checkbox">
                            <input 
                              type="checkbox" 
                              style={{ cursor: 'pointer' }}
                              checked={selectedPickups.includes(pickup.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedPickups([pickup.id]);
                                } else {
                                  setSelectedPickups([]);
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{pickup.rygnContact}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{pickup.date}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{pickup.time}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{pickup.location}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>
                            <Chip 
                              label={pickup.status} 
                              size="small"
                              sx={{ borderRadius: 1, fontSize: '0.65rem', py: 0, height: '20px', ...getStatusChipColor(pickup.status) }} 
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{pickup.weight}</TableCell>
                          <TableCell align="center">
                            <IconButton 
                              size="small" 
                              onClick={() => setEditPickupId(pickup.id)}
                              sx={{ color: '#62CBD0', fontSize: '1rem', p: 0.5 }}
                            >
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleOpenDeleteDialog(pickup, 'pickup')}
                              sx={{ color: '#ff5252', fontSize: '1rem', p: 0.5 }}
                            >
                              <DeleteIcon fontSize="inherit" />
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
                  <Table stickyHeader size="small" sx={{ tableLayout: 'fixed', minWidth: '100%' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Type</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Make</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Model</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Serial</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Status</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Weight (kg)</TableCell>
                        <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockDevices.map((device) => (
                        <TableRow key={device.id} hover>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{device.type}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{device.make}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{device.model}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{device.serial}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>
                            <Chip 
                              label={device.status} 
                              size="small"
                              sx={{ 
                                borderRadius: 1, 
                                fontSize: '0.65rem',
                                py: 0,
                                height: '20px',
                                ...getStatusChipColor(device.status)
                              }} 
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>{device.weight}</TableCell>
                          <TableCell sx={{ fontSize: '0.75rem' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton 
                                size="small" 
                                sx={{ p: 0.5 }} 
                                onClick={() => handleEditDevice(device.id)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small"
                                sx={{ p: 0.5 }}
                                onClick={() => handleDeleteDeviceConfirm(device.id)}
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
      
      {/* Edit Pickup Dialog */}
      <Dialog 
        open={editPickupId !== null} 
        onClose={handleCloseEdit}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Pickup</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="RYGN Contact"
                  name="rygnContact"
                  fullWidth
                  value={editFormData.rygnContact}
                  onChange={handleEditFormChange}
                  size="small"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  name="date"
                  fullWidth
                  value={editFormData.date}
                  onChange={handleEditFormChange}
                  size="small"
                  margin="dense"
                  placeholder="MM/DD/YYYY"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Time"
                  name="time"
                  fullWidth
                  value={editFormData.time}
                  onChange={handleEditFormChange}
                  size="small"
                  margin="dense"
                  placeholder="HH:MM"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  value={editFormData.location}
                  onChange={handleEditFormChange}
                  size="small"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditFormChange}
                    label="Status"
                  >
                    <MenuItem value="Complete">Complete</MenuItem>
                    <MenuItem value="In Process">In Process</MenuItem>
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  fullWidth
                  value={editFormData.weight}
                  onChange={handleEditFormChange}
                  size="small"
                  margin="dense"
                  inputProps={{ step: 0.1 }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="inherit">Cancel</Button>
          <Button 
            onClick={handleSavePickupEdit} 
            variant="contained"
            sx={{ bgcolor: '#185B5F', '&:hover': { bgcolor: '#124548' } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Edit Device Dialog */}
      <Dialog 
        open={editDeviceId !== null} 
        onClose={handleCloseEdit}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Device</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Type"
                  name="type"
                  fullWidth
                  value={editDeviceFormData.type}
                  onChange={handleDeviceFormChange}
                  size="small"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Make"
                  name="make"
                  fullWidth
                  value={editDeviceFormData.make}
                  onChange={handleDeviceFormChange}
                  size="small"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Model"
                  name="model"
                  fullWidth
                  value={editDeviceFormData.model}
                  onChange={handleDeviceFormChange}
                  size="small"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Serial Number"
                  name="serial"
                  fullWidth
                  value={editDeviceFormData.serial}
                  onChange={handleDeviceFormChange}
                  size="small"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={editDeviceFormData.status}
                    onChange={handleDeviceFormChange}
                    label="Status"
                  >
                    <MenuItem value="Refurbished">Refurbished</MenuItem>
                    <MenuItem value="Recycled">Recycled</MenuItem>
                    <MenuItem value="Disposed">Disposed</MenuItem>
                    <MenuItem value="In Process">In Process</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  fullWidth
                  value={editDeviceFormData.weight}
                  onChange={handleDeviceFormChange}
                  size="small"
                  margin="dense"
                  inputProps={{ step: 0.1 }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="inherit">Cancel</Button>
          <Button 
            onClick={handleSaveDeviceEdit} 
            variant="contained"
            sx={{ bgcolor: '#185B5F', '&:hover': { bgcolor: '#124548' } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: '400px'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ pb: 1 }}>
          {`Are you sure you want to delete this ${deleteItemType}?`}
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          {itemToDelete && (
            <Box>
              {deleteItemType === 'pickup' && (
                <Typography variant="body2">
                  {`RYGN Contact: ${itemToDelete.rygnContact}`}<br />
                  {`Date: ${itemToDelete.date}`}<br />
                  {`Location: ${itemToDelete.location}`}
                </Typography>
              )}
              {deleteItemType === 'device' && (
                <Typography variant="body2">
                  {`Serial Number: ${itemToDelete.serial}`}<br />
                  {`Type: ${itemToDelete.type}`}<br />
                  {`Make: ${itemToDelete.make}`}<br />
                  {`Model: ${itemToDelete.model}`}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCloseDeleteDialog} 
            sx={{ 
              color: '#666',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteItem} 
            variant="contained" 
            sx={{ 
              bgcolor: '#ff5252',
              '&:hover': {
                bgcolor: '#ff3333'
              }
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Device Confirmation Dialog */}
      <Dialog
        open={deleteDeviceDialogOpen}
        onClose={() => setDeleteDeviceDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: '400px'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ pb: 1 }}>
          {`Are you sure you want to delete this device?`}
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          {deleteDeviceId && (
            <Typography variant="body2">
              {`Serial Number: ${mockDevices.find(d => d.id === deleteDeviceId)?.serial || ''}`}<br />
              {`Type: ${mockDevices.find(d => d.id === deleteDeviceId)?.type || ''}`}<br />
              {`Make: ${mockDevices.find(d => d.id === deleteDeviceId)?.make || ''}`}<br />
              {`Model: ${mockDevices.find(d => d.id === deleteDeviceId)?.model || ''}`}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setDeleteDeviceDialogOpen(false)} 
            sx={{ 
              color: '#666',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteDevice} 
            variant="contained" 
            sx={{ 
              bgcolor: '#ff5252',
              '&:hover': {
                bgcolor: '#ff3333'
              }
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RYGNProfile; 