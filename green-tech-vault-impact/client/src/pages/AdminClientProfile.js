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
  MenuItem,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

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
  const [leftPanelTab, setLeftPanelTab] = useState('Company Information');
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditingCompanyInfo, setIsEditingCompanyInfo] = useState(false);
  const [editedClientInfo, setEditedClientInfo] = useState(null);
  const [isEditingPickupInfo, setIsEditingPickupInfo] = useState(false);
  const [editedPickupInfo, setEditedPickupInfo] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the actual client data
    // For now, we'll use mock data based on clientId
    const fetchClientData = () => {
      setLoading(true);
      
      // Fetch client data based on clientId
      let mockClient = {
        id: '3',
        name: 'EcoFriendly Inc',
        contactPerson: 'James Harold',
        email: 'jamesharold44@gmail.com',
        phone: '(555) 123-4567',
        address: '123 Green St, Cincinnati OH, 51729',
        website: 'www.ecofriendly.com',
        industry: 'Technology',
        employees: '223',
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
      
      // Different data for different client IDs
      if (clientId === '1') {
        mockClient = {
          id: '1',
          name: 'Tech Solutions Inc.',
          contactPerson: 'John Smith',
          email: 'john@techsolutions.com',
          phone: '(555) 123-4567',
          address: '123 Tech Blvd, San Francisco, CA',
          website: 'www.techsolutions.com',
          industry: 'Information Technology',
          employees: '156',
          lastContacted: 'April 5, 2025',
          contactMethod: 'Phone',
          conversationNotes: 'Discussed quarterly device refresh',
          devicesProcessed: 45,
          totalWeight: 156.8,
          co2Saved: 125.7,
          treesPlanted: 12,
          refurbished: 28,
          recycled: 15,
          disposed: 2
        };
      } else if (clientId === '2') {
        mockClient = {
          id: '2',
          name: 'Global Innovations',
          contactPerson: 'Sarah Johnson',
          email: 'sarah@globalinnovations.com',
          phone: '(555) 987-6543',
          address: '456 Innovation Way, Boston, MA',
          website: 'www.globalinnovations.com',
          industry: 'Research',
          employees: '87',
          lastContacted: 'February 12, 2025',
          contactMethod: 'Email',
          conversationNotes: 'Interested in sustainable disposal options',
          devicesProcessed: 32,
          totalWeight: 98.5,
          co2Saved: 85.2,
          treesPlanted: 8,
          refurbished: 12,
          recycled: 18,
          disposed: 2
        };
      }

      const mockPickups = [
        {
          id: '1',
          date: '01/24/2025',
          time: '14:00',
          location: 'Cincinnati Warehouse',
          status: 'complete',
          weight: 2.5,
          personName: mockClient.name,
          personTitle: '14:00',
          contact: 'John Smith',
          contactPhone: '(555) 123-4567',
          notes: 'Standard pickup, no special instructions',
          totalDevices: 4,
          totalWeight: 12.8,
          deviceStatus: {
            received: 1,
            refurbished: 2,
            recycled: 1,
            inProcessing: 0,
            disposed: 0
          }
        },
        {
          id: '2',
          date: '03/15/2025',
          time: '10:30',
          location: 'Cincinnati Warehouse',
          status: 'in-processing',
          weight: 1.8,
          personName: mockClient.name,
          personTitle: '10:30',
          contact: 'Sarah Johnson',
          contactPhone: '(555) 234-5678',
          notes: 'Large volume of equipment expected',
          totalDevices: 12,
          totalWeight: 45.2,
          deviceStatus: {
            received: 3,
            refurbished: 4,
            recycled: 2,
            inProcessing: 2,
            disposed: 1
          }
        },
        {
          id: '3',
          date: '05/20/2025',
          time: '15:45',
          location: clientId === '3' ? 'EcoFriendly HQ' : 
                   clientId === '1' ? 'Tech Solutions HQ' : 
                   'Global Innovations HQ',
          status: 'recycled',
          weight: 3.2,
          personName: mockClient.name,
          personTitle: '15:45',
          contact: 'Michael Brown',
          contactPhone: '(555) 345-6789',
          notes: 'Older equipment, likely for recycling',
          totalDevices: 6,
          totalWeight: 18.5,
          deviceStatus: {
            received: 0,
            refurbished: 1,
            recycled: 4,
            inProcessing: 0,
            disposed: 1
          }
        },
        {
          id: '4',
          date: '06/10/2025',
          time: '13:15',
          location: 'Cincinnati Warehouse',
          status: 'complete',
          weight: 4.5,
          personName: mockClient.name,
          personTitle: '13:15',
          contact: 'Jennifer Lee',
          contactPhone: '(555) 456-7890',
          notes: 'High-value devices, handle with care',
          totalDevices: 8,
          totalWeight: 22.3,
          deviceStatus: {
            received: 2,
            refurbished: 3,
            recycled: 1,
            inProcessing: 2,
            disposed: 0
          }
        }
      ];

      // Mock devices based on client
      const mockDevices = Array(11).fill(null).map((_, index) => ({
        id: (index + 1).toString(),
        type: index === 0 ? 'Laptop' : 'Table Head',
        manufacturer: index === 0 ? 'Dell' : 'Table Head',
        model: index === 0 ? 'XPS 15' : 'Table Head',
        serialNumber: index === 0 ? 'DL1234567B' : 'Table Head',
        status: index % 5 === 0 ? 'disposed' : 
               index % 4 === 0 ? 'recycled' : 
               index % 3 === 0 ? 'in-processing' : 
               index % 2 === 0 ? 'recycled' : 'refurbished',
        weight: index === 0 ? 2.5 : null
      }));

      setClient(mockClient);
      setPickups(mockPickups);
      setSelectedPickup(mockPickups[1]); // Set the second pickup as initially selected
      setDevices(mockDevices);
      setLoading(false);
    };

    fetchClientData();
  }, [clientId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  const handleSchedulePickup = () => {
    navigate(`/admin/schedule-pickup`);
  };

  const getStatusChipStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'complete':
      case 'completed':
        return { bgcolor: '#e8f5e9', color: '#4caf50', borderRadius: '16px' };
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

  const handleLeftPanelTabChange = (tabName) => {
    setLeftPanelTab(tabName);
  };

  const handlePickupSelect = (pickup) => {
    setSelectedPickup(pickup);
    setLeftPanelTab('Pickup Information');
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleCloseAddDeviceDialog = () => {
    setAddDeviceDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleToggleEditCompanyInfo = () => {
    if (isEditingCompanyInfo) {
      // Save changes
      setClient({...client, ...editedClientInfo});
      setIsEditingCompanyInfo(false);
      setEditedClientInfo(null);
    } else {
      // Start editing
      setEditedClientInfo({...client});
      setIsEditingCompanyInfo(true);
    }
  };

  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setEditedClientInfo({...editedClientInfo, [name]: value});
  };

  const handleToggleEditPickupInfo = () => {
    if (isEditingPickupInfo) {
      // Save changes
      const updatedPickups = pickups.map(pickup => 
        pickup.id === selectedPickup.id ? { ...pickup, ...editedPickupInfo } : pickup
      );
      setPickups(updatedPickups);
      setSelectedPickup({...selectedPickup, ...editedPickupInfo});
      setIsEditingPickupInfo(false);
      setEditedPickupInfo(null);
    } else {
      // Start editing
      setEditedPickupInfo({...selectedPickup});
      setIsEditingPickupInfo(true);
    }
  };

  const handlePickupInfoChange = (e) => {
    const { name, value } = e.target;
    setEditedPickupInfo({...editedPickupInfo, [name]: value});
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
          <Grid item xs={12} md={4}>
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
                  onClick={() => handleLeftPanelTabChange('Pickup Information')}
                  sx={{ 
                    p: 2,
                    pb: 1,
                    cursor: 'pointer',
                    borderBottom: leftPanelTab === 'Pickup Information' ? '4px solid #4ECDC4' : 'none',
                    color: leftPanelTab === 'Pickup Information' ? '#4ECDC4' : '#808080',
                    fontWeight: 400,
                    fontSize: '16px'
                  }}
                >
                  Pickup Information
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
                      startIcon={isEditingCompanyInfo ? null : <EditIcon />} 
                      size="small"
                      onClick={handleToggleEditCompanyInfo}
                      sx={{ 
                        color: '#4ECDC4', 
                        fontSize: '0.8rem', 
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        py: 0.5,
                        px: 1.5,
                      }}
                    >
                      {isEditingCompanyInfo ? 'Save' : 'Edit'}
                    </Button>
                  </Box>
                  <Divider sx={{ mt: 1, mb: 3 }} />

                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Company Name</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingCompanyInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="name"
                            value={editedClientInfo.name}
                            onChange={handleCompanyInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{client.name}</Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Email</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingCompanyInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="email"
                            value={editedClientInfo.email}
                            onChange={handleCompanyInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{client.email}</Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Phone</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingCompanyInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="phone"
                            value={editedClientInfo.phone}
                            onChange={handleCompanyInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{client.phone}</Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Address</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingCompanyInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="address"
                            value={editedClientInfo.address}
                            onChange={handleCompanyInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{client.address}</Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Website</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingCompanyInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="website"
                            value={editedClientInfo.website}
                            onChange={handleCompanyInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{client.website}</Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Industry</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingCompanyInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="industry"
                            value={editedClientInfo.industry}
                            onChange={handleCompanyInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{client.industry}</Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Employees</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingCompanyInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="employees"
                            value={editedClientInfo.employees}
                            onChange={handleCompanyInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{client.employees}</Typography>
                        )}
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
                </Box>
              )}

              {/* Pickup Information Panel */}
              {leftPanelTab === 'Pickup Information' && selectedPickup && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ color: '#444', fontWeight: 500 }}>
                      Pickup Information
                    </Typography>
                    <Button 
                      startIcon={isEditingPickupInfo ? null : <EditIcon />} 
                      size="small"
                      onClick={handleToggleEditPickupInfo}
                      sx={{ 
                        color: '#4ECDC4', 
                        fontSize: '0.8rem', 
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        py: 0.5,
                        px: 1.5,
                      }}
                    >
                      {isEditingPickupInfo ? 'Save' : 'Edit Status'}
                    </Button>
                  </Box>
                  <Divider sx={{ mt: 1, mb: 3 }} />

                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Client</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{selectedPickup.personName}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Time</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{selectedPickup.time}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Date</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body2">{selectedPickup.date}</Typography>
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Location</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingPickupInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="location"
                            value={editedPickupInfo.location}
                            onChange={handlePickupInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{selectedPickup.location}</Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Contact</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingPickupInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="contact"
                            value={editedPickupInfo.contact}
                            onChange={handlePickupInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{selectedPickup.contact}</Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Phone</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingPickupInfo ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="contactPhone"
                            value={editedPickupInfo.contactPhone}
                            onChange={handlePickupInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{selectedPickup.contactPhone}</Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Status</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingPickupInfo ? (
                          <TextField
                            select
                            fullWidth
                            size="small"
                            name="status"
                            value={editedPickupInfo.status}
                            onChange={handlePickupInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          >
                            <MenuItem value="complete">Complete</MenuItem>
                            <MenuItem value="in-processing">In Processing</MenuItem>
                            <MenuItem value="recycled">Received</MenuItem>
                            <MenuItem value="scheduled">Scheduled</MenuItem>
                          </TextField>
                        ) : (
                          <Chip
                            label={selectedPickup.status === 'complete' ? 'Complete' : 
                                selectedPickup.status === 'in-processing' ? 'Processing' : 
                                selectedPickup.status === 'recycled' ? 'Received' : selectedPickup.status}
                            size="small"
                            sx={{ 
                              ...getStatusChipStyle(selectedPickup.status), 
                              textTransform: 'capitalize',
                              fontWeight: 500,
                              py: 0.5
                            }}
                          />
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Notes</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {isEditingPickupInfo ? (
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                            name="notes"
                            value={editedPickupInfo.notes}
                            onChange={handlePickupInfoChange}
                            variant="outlined"
                            sx={{ fontSize: '0.8rem' }}
                            InputProps={{ sx: { fontSize: '0.8rem' } }}
                          />
                        ) : (
                          <Typography variant="body2">{selectedPickup.notes}</Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ color: '#444', fontWeight: 500 }}>
                        Notes
                      </Typography>
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
                    <Divider sx={{ mt: 1, mb: 2 }} />
                    
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      {selectedPickup.notes || 'No notes from customer'}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1 }}>
                      Additional Details
                    </Typography>
                    <Divider sx={{ mt: 1, mb: 2 }} />
                    
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Store Address
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {selectedPickup.location}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 2 }}>
                      Summary
                    </Typography>

                    <Divider sx={{ mt: 1, mb: 2 }} />

                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, bgcolor: '#f9f9f9' }}>
                          <Typography variant="h4" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                            {selectedPickup.totalDevices}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            Total Devices
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, bgcolor: '#f9f9f9' }}>
                          <Typography variant="h4" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                            {selectedPickup.totalWeight}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            Total Weight (kg)
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, mb: 1 }}>
                        Device Status:
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Typography variant="body2">
                            Received: {selectedPickup.deviceStatus.received}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2">
                            Refurbished: {selectedPickup.deviceStatus.refurbished}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2">
                            Recycled: {selectedPickup.deviceStatus.recycled}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2">
                            In Processing: {selectedPickup.deviceStatus.inProcessing}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2">
                            Disposed: {selectedPickup.deviceStatus.disposed}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              )}
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
                        placeholder="Search here"
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
                        bgcolor: '#62CBD0',
                        color: 'white',
                        '&:hover': { bgcolor: '#50B9BE' },
                        borderRadius: '8px',
                        textTransform: 'none'
                      }}
                    >
                      Schedule Pickup
                    </Button>
                  </Box>

                  <TableContainer>
                    <Table sx={{ minWidth: 650, tableLayout: 'fixed' }}>
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                          <TableCell width="15%">Client</TableCell>
                          <TableCell width="12%">Date</TableCell>
                          <TableCell width="12%">Time</TableCell>
                          <TableCell width="20%">Location</TableCell>
                          <TableCell width="15%">Status</TableCell>
                          <TableCell width="10%">Weight (kg)</TableCell>
                          <TableCell width="15%">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pickups.map((pickup) => (
                          <TableRow 
                            key={pickup.id} 
                            hover
                            onClick={() => handlePickupSelect(pickup)}
                            sx={{ cursor: 'pointer' }}
                          >
                            <TableCell>{pickup.personName}</TableCell>
                            <TableCell>{pickup.date}</TableCell>
                            <TableCell>{pickup.time}</TableCell>
                            <TableCell>{pickup.location}</TableCell>
                            <TableCell>
                              <Chip 
                                label={pickup.status === 'complete' ? 'Complete' : 
                                      pickup.status === 'in-processing' ? 'In Processing' : 
                                      pickup.status === 'recycled' ? 'Received' : pickup.status}
                                size="small"
                                sx={{ 
                                  ...getStatusChipStyle(pickup.status), 
                                  textTransform: 'capitalize',
                                  fontWeight: 500,
                                  py: 1
                                }}
                              />
                            </TableCell>
                            <TableCell>{pickup.weight}</TableCell>
                            <TableCell>
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle edit action
                                }}
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle delete action
                                }}
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
                </Box>
              )}

              {/* Devices Tab */}
              {activeTab === 1 && (
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        placeholder="Search here"
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
                                onClick={() => handleArchiveDialogOpen(device)}
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
        
        {/* Edit Contact Dialog */}
        <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
          {/* ... dialog content ... */}
        </Dialog>
        
        {/* Add Device Dialog */}
        <Dialog open={addDeviceDialogOpen} onClose={handleCloseAddDeviceDialog} maxWidth="md" fullWidth>
          {/* ... dialog content ... */}
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          {/* ... dialog content ... */}
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminClientProfile; 