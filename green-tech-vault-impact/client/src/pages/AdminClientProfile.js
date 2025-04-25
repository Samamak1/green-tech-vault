import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import AdminLayout from '../components/layout/AdminLayout';

const AdminClientProfile = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [client, setClient] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [deviceToArchive, setDeviceToArchive] = useState(null);
  const [infoMenuAnchor, setInfoMenuAnchor] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState('Company Information');

  useEffect(() => {
    // In a real app, you would fetch the actual client data
    // For now, we'll use mock data
    const mockClient = {
      id: '3',
      companyName: 'EcoFriendly Inc',
      companyEmail: 'info@ecofriendly.com',
      companyPhone: '(555) 123-4567',
      address: '123 Green St, Cincinnati OH, 51729',
      website: 'www.ecofriendly.com',
      industry: 'Technology',
      employees: '223',
      contactPerson: 'James Harold',
      contactEmail: 'jamesharold44@gmail.com',
      contactPhone: '(555) 123-4567',
      lastContacted: 'March 15, 2025',
      contactMethod: 'Email',
      conversationNotes: 'Discussion of new proposal',
      devicesProcessed: 4,
      totalWeight: 25.1,
      co2Saved: 73.5,
      treesPlanted: 5,
      refurbished: 2,
      recycled: 2,
      disposed: 0
    };

    const mockPickups = [
      {
        id: '1',
        date: '01/24/2025',
        location: 'Cincinnati Warehouse',
        status: 'complete',
        weight: 2.5,
        personName: 'John Smith',
        personTitle: 'Table Head'
      },
      {
        id: '2',
        date: 'Table Head',
        location: 'Table Head',
        status: 'in-processing',
        weight: null,
        personName: 'Table Head',
        personTitle: 'Table Head'
      },
      {
        id: '3',
        date: 'Table Head',
        location: 'Table Head',
        status: 'recycled',
        weight: null,
        personName: 'Table Head',
        personTitle: 'Table Head'
      },
      {
        id: '4',
        date: 'Table Head',
        location: 'Table Head',
        status: 'complete',
        weight: null,
        personName: 'Table Head',
        personTitle: 'Table Head'
      }
    ];

    const mockDevices = [
      {
        id: '1',
        type: 'Laptop',
        manufacturer: 'Dell',
        model: 'XPS 15',
        serialNumber: 'DL1234567B',
        status: 'refurbished',
        weight: 2.5
      },
      {
        id: '2',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'in-processing',
        weight: null
      },
      {
        id: '3',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'recycled',
        weight: null
      },
      {
        id: '4',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'recycled',
        weight: null
      },
      {
        id: '5',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'in-processing',
        weight: null
      },
      {
        id: '6',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'refurbished',
        weight: null
      },
      {
        id: '7',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'disposed',
        weight: null
      },
      {
        id: '8',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'recycled',
        weight: null
      },
      {
        id: '9',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'in-processing',
        weight: null
      },
      {
        id: '10',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'recycled',
        weight: null
      },
      {
        id: '11',
        type: 'Table Head',
        manufacturer: 'Table Head',
        model: 'Table Head',
        serialNumber: 'Table Head',
        status: 'refurbished',
        weight: null
      }
    ];

    setClient(mockClient);
    setPickups(mockPickups);
    setDevices(mockDevices);
    setLoading(false);
  }, [clientId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  const handleSchedulePickup = () => {
    navigate(`/schedule-pickup/${clientId}`);
  };

  const getStatusChipStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'complete':
      case 'completed':
        return { bgcolor: '#e3f7f5', color: '#4ECDC4', borderRadius: '16px' };
      case 'in-processing':
      case 'in-progress':
        return { bgcolor: '#fff8e0', color: '#ffa000', borderRadius: '16px' };
      case 'refurbished':
        return { bgcolor: '#e3f7f5', color: '#4ECDC4', borderRadius: '16px' };
      case 'recycled':
        return { bgcolor: '#e3f2ff', color: '#2196f3', borderRadius: '16px' };
      case 'disposed':
        return { bgcolor: '#ffebee', color: '#f44336', borderRadius: '16px' };
      default:
        return { bgcolor: '#e0e0e0', color: '#616161', borderRadius: '16px' };
    }
  };

  const handleArchiveDialogOpen = (device) => {
    setDeviceToArchive(device);
    setArchiveDialogOpen(true);
  };

  const handleArchiveDialogClose = () => {
    setArchiveDialogOpen(false);
    setDeviceToArchive(null);
  };

  const handleArchiveDevice = () => {
    // In a real implementation, call API to archive the device
    console.log('Archiving device:', deviceToArchive);
    // Close dialog
    handleArchiveDialogClose();
  };

  const handleInfoMenuOpen = (event) => {
    setInfoMenuAnchor(event.currentTarget);
  };

  const handleInfoMenuClose = () => {
    setInfoMenuAnchor(null);
  };

  const handleInfoTypeSelect = (infoType) => {
    setSelectedInfo(infoType);
    handleInfoMenuClose();
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ p: 3 }}>Loading...</Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
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
            Client Profile: {client.companyName}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column - Company Information */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer' 
                  }}
                  onClick={handleInfoMenuOpen}
                >
                  <Typography variant="h6" sx={{ color: '#444', fontWeight: 500 }}>
                    {selectedInfo}
                  </Typography>
                  <ExpandMoreIcon sx={{ ml: 1, color: '#666' }} />
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

              <Menu
                anchorEl={infoMenuAnchor}
                open={Boolean(infoMenuAnchor)}
                onClose={handleInfoMenuClose}
              >
                <MenuItem onClick={() => handleInfoTypeSelect('Company Information')}>Company Information</MenuItem>
                <MenuItem onClick={() => handleInfoTypeSelect('Pickup Information')}>Pickup Information</MenuItem>
              </Menu>

              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Company Name</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">{client.companyName}</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Email</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">{client.companyEmail}</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Phone</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">{client.companyPhone}</Typography>
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
                </Grid>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1 }}>
                  Contact Information
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
                    <Typography variant="body2">{client.contactEmail}</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Phone</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">{client.contactPhone}</Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1 }}>
                  Contact History
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Last Contacted</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">{client.lastContacted}</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Contact Method</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">{client.contactMethod}</Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Conversation Notes</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2">{client.conversationNotes}</Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 2 }}>
                  Environmental Impact
                </Typography>

                <Divider sx={{ mt: 1, mb: 2 }} />

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, bgcolor: '#f9f9f9' }}>
                      <Typography variant="h4" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                        {client.devicesProcessed}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Devices Processed
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, bgcolor: '#f9f9f9' }}>
                      <Typography variant="h4" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                        {client.totalWeight}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Total weight (kg)
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, bgcolor: '#f9f9f9' }}>
                      <Typography variant="h4" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                        {client.co2Saved}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        CO2 Saved (kg)
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, bgcolor: '#f9f9f9' }}>
                      <Typography variant="h4" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                        {client.treesPlanted}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Trees Planted
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, mb: 1 }}>
                    Device Disposition:
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        Refurbished: {client.refurbished}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        Recycled: {client.recycled}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2">
                        Disposed: {client.disposed}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Tabs */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTab-root': { 
                      textTransform: 'none',
                      fontSize: '16px',
                      fontWeight: 'normal',
                      color: '#666',
                      '&.Mui-selected': {
                        color: '#4ECDC4',
                        fontWeight: 'medium',
                      }
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#4ECDC4'
                    }
                  }}
                >
                  <Tab label="Pickups" />
                  <Tab label="Devices" />
                </Tabs>
              </Box>

              {/* Pickups Tab */}
              {activeTab === 0 && (
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        placeholder="Search specifics"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" sx={{ color: '#aaa' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mr: 1, width: '200px' }}
                      />
                      <Button 
                        startIcon={<FilterListIcon />}
                        size="small"
                        sx={{ 
                          color: '#666', 
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px',
                          textTransform: 'none'
                        }}
                      >
                        Filter
                      </Button>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleSchedulePickup}
                      sx={{ 
                        bgcolor: '#4ECDC4', 
                        color: 'white',
                        '&:hover': { bgcolor: '#3dbdb5' },
                        borderRadius: '8px',
                        textTransform: 'none'
                      }}
                    >
                      + Schedule a Pickup
                    </Button>
                  </Box>

                  <TableContainer>
                    <Table sx={{ minWidth: 650, tableLayout: 'fixed' }}>
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                          <TableCell padding="checkbox" width="40px">
                            <input type="checkbox" />
                          </TableCell>
                          <TableCell width="15%">Person</TableCell>
                          <TableCell width="12%">Date</TableCell>
                          <TableCell width="15%">Time</TableCell>
                          <TableCell width="15%">Location</TableCell>
                          <TableCell width="15%">Status</TableCell>
                          <TableCell width="12%">Weight (kg)</TableCell>
                          <TableCell width="15%">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pickups.map((pickup) => (
                          <TableRow key={pickup.id} hover>
                            <TableCell padding="checkbox">
                              <input type="checkbox" />
                            </TableCell>
                            <TableCell>{pickup.personName}</TableCell>
                            <TableCell>{pickup.date}</TableCell>
                            <TableCell>{pickup.personTitle}</TableCell>
                            <TableCell>{pickup.location}</TableCell>
                            <TableCell>
                              <Chip 
                                label={pickup.status === 'complete' ? 'Complete' : 
                                      pickup.status === 'in-processing' ? 'In Processing' : 
                                      pickup.status === 'recycled' ? 'Recycled' : pickup.status}
                                size="small"
                                sx={{ ...getStatusChipStyle(pickup.status), textTransform: 'capitalize' }}
                              />
                            </TableCell>
                            <TableCell>{pickup.weight}</TableCell>
                            <TableCell>
                              <IconButton size="small" sx={{ color: '#4ECDC4' }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" sx={{ color: '#f44336' }}>
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

              {/* Devices Tab */}
              {activeTab === 1 && (
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        placeholder="Search devices"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" sx={{ color: '#aaa' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mr: 1, width: '200px' }}
                      />
                      <Button 
                        startIcon={<FilterListIcon />}
                        size="small"
                        sx={{ 
                          color: '#666', 
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px',
                          textTransform: 'none'
                        }}
                      >
                        Filter
                      </Button>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{ 
                        bgcolor: '#4ECDC4', 
                        color: 'white',
                        '&:hover': { bgcolor: '#3dbdb5' },
                        borderRadius: '8px',
                        textTransform: 'none'
                      }}
                    >
                      + Add Device
                    </Button>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      John Smith's 01/24/2025 Pickup
                    </Typography>
                  </Box>

                  <TableContainer>
                    <Table sx={{ minWidth: 650, tableLayout: 'fixed' }}>
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                          <TableCell width="15%">Type</TableCell>
                          <TableCell width="15%">Manufacturer</TableCell>
                          <TableCell width="15%">Model</TableCell>
                          <TableCell width="20%">Serial Number</TableCell>
                          <TableCell width="15%">Status</TableCell>
                          <TableCell width="10%">Weight (kg)</TableCell>
                          <TableCell width="10%">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {devices.map((device) => (
                          <TableRow key={device.id} hover>
                            <TableCell
                              sx={{ 
                                cursor: 'pointer',
                                color: '#1C392B',
                                fontWeight: 500,
                                '&:hover': { textDecoration: 'underline' }
                              }}
                              onClick={() => navigate(`/admin/devices/${device.id}`)}
                            >{device.type}</TableCell>
                            <TableCell>{device.manufacturer}</TableCell>
                            <TableCell>{device.model}</TableCell>
                            <TableCell>{device.serialNumber}</TableCell>
                            <TableCell>
                              <Chip 
                                label={device.status === 'refurbished' ? 'Refurbished' : 
                                      device.status === 'in-processing' ? 'In Processing' : 
                                      device.status === 'recycled' ? 'Recycled' :
                                      device.status === 'disposed' ? 'Disposed' : device.status}
                                size="small"
                                sx={{ ...getStatusChipStyle(device.status), textTransform: 'capitalize' }}
                              />
                            </TableCell>
                            <TableCell>{device.weight}</TableCell>
                            <TableCell>
                              <IconButton 
                                size="small" 
                                sx={{ 
                                  color: '#4ECDC4',
                                  bgcolor: '#e6f7f5', 
                                  p: 0.5,
                                  mr: 1,
                                  '&:hover': { bgcolor: '#d0f0ed' }
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                sx={{ 
                                  color: '#f44336',
                                  bgcolor: '#feeeee',
                                  p: 0.5,
                                  '&:hover': { bgcolor: '#fcdada' }
                                }}
                                onClick={() => handleArchiveDialogOpen(device)}
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
          </Grid>
        </Grid>

        {/* Archive Dialog */}
        <Dialog
          open={archiveDialogOpen}
          onClose={handleArchiveDialogClose}
          aria-labelledby="archive-dialog-title"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="archive-dialog-title">
            Are you sure you want to archive this Device?
          </DialogTitle>
          <DialogContent>
            {deviceToArchive && (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {deviceToArchive.manufacturer} {deviceToArchive.model}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  {deviceToArchive.type}, {deviceToArchive.manufacturer}, {deviceToArchive.serialNumber}, {deviceToArchive.status}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Even though it will no longer appear in Your Devices, you can still view the Device in Archived Devices from your account
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button 
              variant="contained"
              onClick={handleArchiveDevice}
              sx={{ 
                bgcolor: '#555',
                color: 'white',
                mr: 1,
                px: 3,
                '&:hover': { bgcolor: '#444' }
              }}
              startIcon={<DeleteIcon />}
            >
              Archived
            </Button>
            <Button 
              onClick={handleArchiveDialogClose}
              sx={{ px: 3 }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default AdminClientProfile; 