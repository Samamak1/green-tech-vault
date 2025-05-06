import React, { useState, useEffect, useRef } from 'react';
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
  Chip,
  Avatar,
  CircularProgress,
  Checkbox,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  InputBase,
  ListItemText
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  InsertDriveFile as DocumentIcon,
  Print as PrintIcon,
  Save as SaveIcon,
  KeyboardArrowDown as DropdownIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Create as PencilIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon as EmojiIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';
import Header from '../components/layout/Header';
import ClientSidebar from '../components/layout/ClientSidebar';

const RYGNProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leftPanelTab, setLeftPanelTab] = useState('Company Information');
  const [rightPanelTab, setRightPanelTab] = useState('Pickups');
  const [mockPickups, setMockPickups] = useState([]);
  const [mockDevices, setMockDevices] = useState([]);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedPickupInfo, setSelectedPickupInfo] = useState(null);
  const [showTrackingBubbles, setShowTrackingBubbles] = useState(false);
  const [isEditingCompanyInfo, setIsEditingCompanyInfo] = useState(false);
  const [editedCompanyInfo, setEditedCompanyInfo] = useState(null);
  const [isEditingPickupDetails, setIsEditingPickupDetails] = useState(false);
  const [editedPickupDetails, setEditedPickupDetails] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState('');
  const [editingPickupId, setEditingPickupId] = useState(null);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [editedPickup, setEditedPickup] = useState(null);
  const [editedDevice, setEditedDevice] = useState(null);

  // Client SMS States
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const messagesEndRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({ subject: '', message: '' });
  const [showMessages, setShowMessages] = useState(false);

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
          weight: 2.5,
          rygnContact: {
            fullName: "Sarah Johnson",
            jobTitle: "RYGN Coordinator",
            email: "sarah.johnson@rygneco.com",
            phone: "(555) 987-6543"
          }
        },
        {
          id: '2',
          client: "Leila's Company",
          date: '03/15/2025',
          time: '10:30',
          location: 'Cincinnati Warehouse',
          status: 'In Process',
          weight: 1.8,
          rygnContact: {
            fullName: "Michael Chen",
            jobTitle: "Recycling Specialist",
            email: "michael.chen@rygneco.com",
            phone: "(555) 456-7890"
          }
        },
        {
          id: '3',
          client: "Leila's Company",
          date: '05/20/2025',
          time: '15:45',
          location: 'Global Innovations HQ',
          status: 'Received',
          weight: 3.2,
          rygnContact: {
            fullName: "James Wilson",
            jobTitle: "Pickup Coordinator",
            email: "james.wilson@rygneco.com",
            phone: "(555) 234-5678"
          }
        },
        {
          id: '4',
          client: "Leila's Company",
          date: '06/10/2025',
          time: '13:15',
          location: 'Cincinnati Warehouse',
          status: 'Complete',
          weight: 4.5,
          rygnContact: {
            fullName: "Emma Davis",
            jobTitle: "Sustainability Manager",
            email: "emma.davis@rygneco.com",
            phone: "(555) 876-5432"
          }
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

      // Mock conversations for SMS functionality
      const mockConversations = [
        {
          id: '1',
          contact: {
            id: 'gtv-admin',
            name: 'GTV Admin',
            avatar: null,
            isOnline: true,
            lastSeen: 'Just now'
          },
          unreadCount: 2,
          lastMessage: {
            text: "We've successfully completed your pickup. Thank you for choosing Green Tech Vault.",
            timestamp: 'March 27, 2025 at 7:56pm',
            isFromUser: false
          },
          messages: [
            {
              id: '1-1',
              text: "Hello! I would like to schedule a pickup for some old electronics.",
              timestamp: 'March 26, 2025 at 10:30am',
              isFromUser: true
            },
            {
              id: '1-2',
              text: "Hi Leila! Sure, we'd be happy to help you recycle your electronics. What kind of items do you have and when would you like to schedule the pickup?",
              timestamp: 'March 26, 2025 at 11:15am',
              isFromUser: false
            },
            {
              id: '1-3',
              text: "I have 4 laptops, 2 monitors, and some miscellaneous cables. Would next Monday work?",
              timestamp: 'March 26, 2025 at 11:20am',
              isFromUser: true
            },
            {
              id: '1-4',
              text: "Monday works great! We'll schedule you for Monday at 2pm. Does that time work for you?",
              timestamp: 'March 26, 2025 at 11:45am',
              isFromUser: false
            },
            {
              id: '1-5',
              text: "Perfect! I'll be available at that time.",
              timestamp: 'March 26, 2025 at 12:01pm',
              isFromUser: true
            },
            {
              id: '1-6',
              text: "Great! We've scheduled your pickup for Monday at 2pm. Our driver will call you when they're on the way. Thank you for choosing Green Tech Vault!",
              timestamp: 'March 26, 2025 at 12:10pm',
              isFromUser: false
            },
            {
              id: '1-7',
              text: "We've successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs. Your pickup details: 4 devices weighing 12.8kg. You'll receive a detailed report of your environmental impact within 5 business days.",
              timestamp: 'March 27, 2025 at 7:56pm',
              isFromUser: false
            }
          ]
        },
        {
          id: '2',
          contact: {
            id: 'jsmith',
            name: 'John Smith',
            avatar: null,
            isOnline: false,
            lastSeen: '3 hours ago'
          },
          unreadCount: 0,
          lastMessage: {
            text: "Let me know if you receive the report.",
            timestamp: 'March 25, 2025 at 3:45pm',
            isFromUser: false
          },
          messages: [
            {
              id: '2-1',
              text: "Hi Leila, just checking if you received your environmental impact report?",
              timestamp: 'March 25, 2025 at 3:30pm',
              isFromUser: false
            },
            {
              id: '2-2',
              text: "Yes, I got it. Thanks for following up!",
              timestamp: 'March 25, 2025 at 3:35pm',
              isFromUser: true
            },
            {
              id: '2-3',
              text: "Great! Let me know if you have any questions about it.",
              timestamp: 'March 25, 2025 at 3:40pm',
              isFromUser: false
            },
            {
              id: '2-4',
              text: "Let me know if you receive the report.",
              timestamp: 'March 25, 2025 at 3:45pm',
              isFromUser: false
            }
          ]
        },
        {
          id: '3',
          contact: {
            id: 'sarah',
            name: 'Sarah Johnson',
            avatar: null,
            isOnline: true,
            lastSeen: 'Just now'
          },
          unreadCount: 1,
          lastMessage: {
            text: "Your spring recycling promotion code is SPRING25.",
            timestamp: 'March 20, 2025 at 9:15am',
            isFromUser: false
          },
          messages: [
            {
              id: '3-1',
              text: "Hello Leila, I wanted to inform you about our spring recycling promotion!",
              timestamp: 'March 20, 2025 at 9:10am',
              isFromUser: false
            },
            {
              id: '3-2',
              text: "Your spring recycling promotion code is SPRING25.",
              timestamp: 'March 20, 2025 at 9:15am',
              isFromUser: false
            }
          ]
        }
      ];

      setClient(mockClient);
      setMockPickups(pickups);
      setMockDevices(devices);
      setConversations(mockConversations);
      // Select the first conversation by default
      if (mockConversations.length > 0) {
        setSelectedConversation(mockConversations[0]);
      }
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

  // Handle pickup selection
  const handlePickupSelect = (pickup) => {
    setSelectedPickup(pickup.id);
    setSelectedPickupInfo(pickup);
    
    // If not on Pickup Information tab, switch to it
    if (leftPanelTab !== 'Pickup Information') {
      setLeftPanelTab('Pickup Information');
    }
  };

  // Company Info editing handlers
  const handleToggleEditCompanyInfo = () => {
    if (isEditingCompanyInfo) {
      // Save the changes
      setClient({...client, ...editedCompanyInfo});
      setIsEditingCompanyInfo(false);
    } else {
      // Start editing - copy current client data
      setEditedCompanyInfo({...client});
      setIsEditingCompanyInfo(true);
    }
  };

  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setEditedCompanyInfo(prev => ({...prev, [name]: value}));
  };

  // Pickup Details editing handlers
  const handleToggleEditPickupDetails = () => {
    if (isEditingPickupDetails) {
      // Save the changes to the selected pickup
      const updatedPickupInfo = {...selectedPickupInfo, ...editedPickupDetails};
      
      // Update the pickup in the mockPickups array
      const updatedPickups = mockPickups.map(pickup => 
        pickup.id === selectedPickup ? {...pickup, ...editedPickupDetails} : pickup
      );
      
      setSelectedPickupInfo(updatedPickupInfo);
      setMockPickups(updatedPickups);
      setIsEditingPickupDetails(false);
    } else {
      // Start editing - copy current pickup details
      setEditedPickupDetails({...selectedPickupInfo});
      setIsEditingPickupDetails(true);
    }
  };

  const handlePickupDetailsChange = (e) => {
    const { name, value } = e.target;
    setEditedPickupDetails(prev => ({...prev, [name]: value}));
  };

  // Navigate to schedule pickup page
  const handleSchedulePickup = () => {
    navigate('/dashboard/schedule-pickup');
  };

  // Handle delete pickup
  const handleDeletePickup = (pickupId, event) => {
    event.stopPropagation();
    const pickup = mockPickups.find(p => p.id === pickupId);
    setDeleteType('Pickup');
    setDeleteItemId(pickupId);
    setDeleteItemName(pickup ? `Pickup on ${pickup.date}` : '');
    setDeleteDialogOpen(true);
  };

  // Handle delete device
  const handleDeleteDevice = (deviceId, event) => {
    event.stopPropagation();
    const device = mockDevices.find(d => d.id === deviceId);
    setDeleteType('Device');
    setDeleteItemId(deviceId);
    setDeleteItemName(device ? `${device.manufacturer} ${device.model}` : '');
    setDeleteDialogOpen(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (deleteType === 'Pickup') {
      setMockPickups(mockPickups.filter(p => p.id !== deleteItemId));
    } else if (deleteType === 'Device') {
      setMockDevices(mockDevices.filter(d => d.id !== deleteItemId));
    }
    setDeleteDialogOpen(false);
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  // Default RYGN contact information when no pickup is selected
  const defaultRygnContactInfo = {
    fullName: "Sarah Johnson",
    jobTitle: "RYGN Coordinator",
    email: "sarah.johnson@rygneco.com",
    phone: "(555) 987-6543",
    date: "05/15/2025",
    time: "10:00 AM",
    location: "Cincinnati Main Office",
    status: "Scheduled",
    totalWeight: "15.7 kg"
  };

  // Get the pickup information to display
  const pickupInfoToDisplay = selectedPickupInfo || { rygnContact: defaultRygnContactInfo, ...defaultRygnContactInfo };

  // Add these handler functions
  const handleEditPickup = (pickup, e) => {
    e.stopPropagation();
    setEditingPickupId(pickup.id);
    setEditedPickup({...pickup});
  };

  const handleSavePickup = (pickupId, e) => {
    e.stopPropagation();
    const updatedPickups = mockPickups.map(pickup => 
      pickup.id === pickupId ? {...editedPickup} : pickup
    );
    setMockPickups(updatedPickups);
    setEditingPickupId(null);
    
    // If this was the selected pickup, update it
    if (selectedPickup === pickupId) {
      setSelectedPickupInfo(editedPickup);
    }
  };

  const handlePickupFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedPickup(prev => ({...prev, [name]: value}));
  };

  const handleEditDevice = (device, e) => {
    e.stopPropagation();
    setEditingDeviceId(device.id);
    setEditedDevice({...device});
  };

  const handleSaveDevice = (deviceId, e) => {
    e.stopPropagation();
    const updatedDevices = mockDevices.map(device => 
      device.id === deviceId ? {...editedDevice} : device
    );
    setMockDevices(updatedDevices);
    setEditingDeviceId(null);
  };

  const handleDeviceFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedDevice(prev => ({...prev, [name]: value}));
  };

  // Handle SMS related functions
  const handleConversationSelect = (conversation) => {
    // Mark conversation as read when selected
    const updatedConversations = conversations.map(conv =>
      conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
    );
    setConversations(updatedConversations);
    
    // Set selected conversation
    setSelectedConversation(conversation);
    setIsExpanded(true);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: `new-${Date.now()}`,
      text: messageText,
      timestamp: new Date().toLocaleString(),
      isFromUser: true
    };

    // Add message to conversation
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: {
        text: messageText,
        timestamp: new Date().toLocaleString(),
        isFromUser: true
      }
    };

    // Update conversations list
    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation.id ? updatedConversation : conv
    );
    
    setConversations(updatedConversations);
    setSelectedConversation(updatedConversation);
    setMessageText('');
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filterValue) => {
    setFilter(filterValue);
    handleFilterClose();
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    
    // For simplicity, just return the time part
    if (timestamp.includes('at')) {
      return timestamp.split('at ')[1];
    }
    return timestamp;
  };

  const filteredConversations = conversations.filter(conversation => {
    if (filter === 'Unread' && conversation.unreadCount === 0) {
      return false;
    }
    
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        conversation.contact.name.toLowerCase().includes(searchTermLower) ||
        conversation.lastMessage.text.toLowerCase().includes(searchTermLower)
      );
    }
    
    return true;
  });

  const handleComposeOpen = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
  };

  const handleComposeChange = (event) => {
    setComposeData({
      ...composeData,
      [event.target.name]: event.target.value
    });
  };

  const handleComposeSend = () => {
    // Handle sending the composed message
    handleComposeClose();
  };

  const handleCloseMessage = () => {
    setIsExpanded(false);
  };

  const toggleMessages = () => {
    setShowMessages(!showMessages);
    if (!showMessages) {
      // Reset left panel tab when opening messages
      setLeftPanelTab('Messages');
    } else {
      // Reset to Company Information when closing messages
      setLeftPanelTab('Company Information');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <ClientSidebar />
        <Box sx={{ flexGrow: 1, ml: '225px' }}>
          <Header />
          <Box sx={{ p: 3, mt: '64px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <CircularProgress />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ClientSidebar />
      <Box sx={{ flexGrow: 1, ml: '225px' }}>
        <Header />
        <Box sx={getContentContainerStyle()} data-boundary="true">
          <Box sx={{ ...getContentWrapperStyle(), mt: '64px' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              My Profile Information
            </Typography>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontSize: '1rem' }}>
              RYGN Profile
            </Typography>
            
            <Grid container direction="column" spacing={2}>
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
                    <Box 
                      onClick={() => handleLeftPanelTabChange('Messages')}
                      sx={{ 
                        p: 1.5,
                        pb: 1,
                        cursor: 'pointer',
                        borderBottom: leftPanelTab === 'Messages' ? '3px solid #185B5F' : 'none',
                        color: leftPanelTab === 'Messages' ? '#185B5F' : '#808080',
                        fontWeight: 400,
                        fontSize: '14px'
                      }}
                    >
                      Messages
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {leftPanelTab === 'Company Information' && (
                      <Button 
                        startIcon={isEditingCompanyInfo ? null : <EditIcon fontSize="small" />} 
                        size="small"
                        onClick={handleToggleEditCompanyInfo}
                        sx={{ 
                          color: '#185B5F', 
                          fontSize: '0.75rem', 
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px',
                          py: 0.3,
                          px: 1,
                          my: 1,
                          mr: 1
                        }}
                      >
                        {isEditingCompanyInfo ? 'Save' : 'Edit'}
                      </Button>
                    )}
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
                                  {isEditingCompanyInfo ? (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      name="name"
                                      value={editedCompanyInfo.name}
                                      onChange={handleCompanyInfoChange}
                                      variant="outlined"
                                      sx={{ fontSize: '0.8rem' }}
                                      InputProps={{ sx: { fontSize: '0.8rem' } }}
                                    />
                                  ) : (
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.name}</Typography>
                                  )}
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Email</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                  {isEditingCompanyInfo ? (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      name="email"
                                      value={editedCompanyInfo.email}
                                      onChange={handleCompanyInfoChange}
                                      variant="outlined"
                                      sx={{ fontSize: '0.8rem' }}
                                      InputProps={{ sx: { fontSize: '0.8rem' } }}
                                    />
                                  ) : (
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.email}</Typography>
                                  )}
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Phone</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                  {isEditingCompanyInfo ? (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      name="phone"
                                      value={editedCompanyInfo.phone}
                                      onChange={handleCompanyInfoChange}
                                      variant="outlined"
                                      sx={{ fontSize: '0.8rem' }}
                                      InputProps={{ sx: { fontSize: '0.8rem' } }}
                                    />
                                  ) : (
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.phone}</Typography>
                                  )}
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Address</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                  {isEditingCompanyInfo ? (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      name="address"
                                      value={editedCompanyInfo.address}
                                      onChange={handleCompanyInfoChange}
                                      variant="outlined"
                                      sx={{ fontSize: '0.8rem' }}
                                      InputProps={{ sx: { fontSize: '0.8rem' } }}
                                    />
                                  ) : (
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.address}</Typography>
                                  )}
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Website</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                  {isEditingCompanyInfo ? (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      name="website"
                                      value={editedCompanyInfo.website}
                                      onChange={handleCompanyInfoChange}
                                      variant="outlined"
                                      sx={{ fontSize: '0.8rem' }}
                                      InputProps={{ sx: { fontSize: '0.8rem' } }}
                                    />
                                  ) : (
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.website}</Typography>
                                  )}
                                </Grid>

                                <Grid item xs={4}>
                                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Industry</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                  {isEditingCompanyInfo ? (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      name="industry"
                                      value={editedCompanyInfo.industry}
                                      onChange={handleCompanyInfoChange}
                                      variant="outlined"
                                      sx={{ fontSize: '0.8rem' }}
                                      InputProps={{ sx: { fontSize: '0.8rem' } }}
                                    />
                                  ) : (
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{client.industry}</Typography>
                                  )}
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
                        <Grid item xs={4}>
                          <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                            Device Disposition
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          
                          <Box sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Refurbished</Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#185B5F' }}>{client.refurbished}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Recycled</Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#185B5F' }}>{client.recycled}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Disposed</Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#185B5F' }}>{client.disposed}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={8}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ color: '#185B5F', fontWeight: 'bold', fontSize: '1rem' }}>
                                  {client.devicesProcessed}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                  Devices Processed
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={6}>
                              <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ color: '#185B5F', fontWeight: 'bold', fontSize: '1rem' }}>
                                  {client.totalWeight.toFixed(1)} kg
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                  Total Weight
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={8}>
                              <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ color: '#185B5F', fontWeight: 'bold', fontSize: '1rem' }}>
                                  {client.co2Saved.toFixed(1)} kg
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                  CO2 Saved
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={6}>
                              <Paper elevation={0} sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ color: '#185B5F', fontWeight: 'bold', fontSize: '1rem' }}>
                                  {client.treesPlanted}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                  Trees Planted
                                </Typography>
                              </Paper>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  
                  {leftPanelTab === 'Pickup Information' && (
                    <Box sx={{ p: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                      {showTrackingBubbles && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 4 }}>
                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                              <Box sx={{ py: 1.5, px: 2, bgcolor: '#e8f5e9', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                  <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500, fontSize: '0.7rem' }}>
                                    Driver is on the way
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#2e7d32', fontSize: '0.65rem' }}>
                                    May 26, 2024
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ height: 1, width: '2%', borderTop: '1px dashed #ccc' }} />
                              <Box sx={{ py: 1.5, px: 2, bgcolor: '#e8f5e9', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                  <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500, fontSize: '0.7rem' }}>
                                    Driver has arrived
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#2e7d32', fontSize: '0.65rem' }}>
                                    May 27, 2024
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ height: 1, width: '2%', borderTop: '1px dashed #ccc' }} />
                              <Box sx={{ py: 1.5, px: 2, bgcolor: '#e8f5e9', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                  <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500, fontSize: '0.7rem' }}>
                                    Pickup has been loaded
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#2e7d32', fontSize: '0.65rem' }}>
                                    May 28, 2024
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ height: 1, width: '2%', borderTop: '1px dashed #ccc' }} />
                              <Box sx={{ py: 1.5, px: 2, bgcolor: '#e8f5e9', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                  <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500, fontSize: '0.7rem' }}>
                                    Pickup arrived at warehouse
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#2e7d32', fontSize: '0.65rem' }}>
                                    May 29, 2024
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ height: 1, width: '2%', borderTop: '1px dashed #ccc' }} />
                              <Box sx={{ py: 1.5, px: 2, bgcolor: '#f5f5f5', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                  <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500, fontSize: '0.7rem' }}>
                                    Items are being sorted and evaluated
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.65rem' }}>
                                    May 30, 2024
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ height: 1, width: '2%', borderTop: '1px dashed #ccc' }} />
                              <Box sx={{ py: 1.5, px: 2, bgcolor: '#f5f5f5', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15%' }}>
                                <Box sx={{ textAlign: 'center' }}>
                                  <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500, fontSize: '0.7rem' }}>
                                    Sustainability report is ready
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.65rem' }}>
                                    June 04, 2024
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, fontSize: '0.95rem', mr: 2 }}>
                              Pickup Details
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem', mr: 1 }}>
                              {selectedPickupInfo ? selectedPickupInfo.date : defaultRygnContactInfo.date}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>
                              {selectedPickupInfo ? selectedPickupInfo.time : defaultRygnContactInfo.time}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Button 
                              startIcon={isEditingPickupDetails ? null : <EditIcon fontSize="small" />} 
                              size="small"
                              onClick={handleToggleEditPickupDetails}
                              type="button"
                              sx={{ 
                                color: '#4ECDC4', 
                                fontSize: '0.75rem', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '4px',
                                py: 0.3,
                                px: 1,
                              }}
                            >
                              {isEditingPickupDetails ? 'Save' : 'Edit'}
                            </Button>
                          </Box>
                          <Divider sx={{ mb: 2 }} />
                          
                          <Grid container spacing={1}>
                            <Grid item xs={5}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Location</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              {isEditingPickupDetails ? (
                                <TextField
                                  fullWidth
                                  size="small"
                                  name="location"
                                  value={editedPickupDetails.location}
                                  onChange={handlePickupDetailsChange}
                                  variant="outlined"
                                  sx={{ fontSize: '0.8rem' }}
                                  InputProps={{ sx: { fontSize: '0.8rem' } }}
                                />
                              ) : (
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{selectedPickupInfo ? selectedPickupInfo.location : defaultRygnContactInfo.location}</Typography>
                              )}
                            </Grid>

                            <Grid item xs={5}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Status</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              {isEditingPickupDetails ? (
                                <TextField
                                  fullWidth
                                  select
                                  size="small"
                                  name="status"
                                  value={editedPickupDetails.status}
                                  onChange={handlePickupDetailsChange}
                                  variant="outlined"
                                  sx={{ fontSize: '0.8rem' }}
                                  InputProps={{ sx: { fontSize: '0.8rem' } }}
                                >
                                  <MenuItem value="Complete">Complete</MenuItem>
                                  <MenuItem value="In Process">In Process</MenuItem>
                                  <MenuItem value="Received">Received</MenuItem>
                                </TextField>
                              ) : (
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{selectedPickupInfo ? selectedPickupInfo.status : defaultRygnContactInfo.status}</Typography>
                              )}
                            </Grid>
                            
                            <Grid item xs={5}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Total Weight</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              {isEditingPickupDetails ? (
                                <TextField
                                  fullWidth
                                  size="small"
                                  name="weight"
                                  type="number"
                                  value={editedPickupDetails.weight}
                                  onChange={handlePickupDetailsChange}
                                  variant="outlined"
                                  sx={{ fontSize: '0.8rem' }}
                                  InputProps={{ 
                                    sx: { fontSize: '0.8rem' },
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>
                                  }}
                                />
                              ) : (
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{selectedPickupInfo ? `${selectedPickupInfo.weight} kg` : defaultRygnContactInfo.totalWeight}</Typography>
                              )}
                            </Grid>
                            
                            <Grid item xs={5}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Pickup Number</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  fontSize: '0.8rem', 
                                  color: '#4ECDC4', 
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  '&:hover': { color: '#3dbdb5' }
                                }}
                                onClick={() => setShowTrackingBubbles(!showTrackingBubbles)}
                              >
                                #7654321
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        
                        <Grid item xs={6}>
                          <Typography variant="h6" sx={{ color: '#444', fontWeight: 500, mb: 1, fontSize: '0.95rem' }}>
                            RYGN Pickup Contact
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          
                          <Grid container spacing={1}>
                            <Grid item xs={5}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Full Name</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{selectedPickupInfo ? selectedPickupInfo.rygnContact.fullName : defaultRygnContactInfo.fullName}</Typography>
                            </Grid>
                            
                            <Grid item xs={5}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Job Title</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{selectedPickupInfo ? selectedPickupInfo.rygnContact.jobTitle : defaultRygnContactInfo.jobTitle}</Typography>
                            </Grid>

                            <Grid item xs={5}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Email</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{selectedPickupInfo ? selectedPickupInfo.rygnContact.email : defaultRygnContactInfo.email}</Typography>
                            </Grid>

                            <Grid item xs={5}>
                              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500, fontSize: '0.8rem' }}>Phone</Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{selectedPickupInfo ? selectedPickupInfo.rygnContact.phone : defaultRygnContactInfo.phone}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  
                  {leftPanelTab === 'Messages' && (
                    <Box sx={{ p: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                      {/* Top Controls: Button, Search, and Filter */}
                      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Compose button */}
                        <Button
                          variant="contained"
                          onClick={handleComposeOpen}
                          startIcon={<PencilIcon fontSize="small" />}
                          sx={{
                            bgcolor: '#185B5F',
                            '&:hover': { bgcolor: '#124548' },
                            borderRadius: '4px',
                            py: 0.75,
                            px: 2,
                            textTransform: 'none',
                            fontSize: '0.8rem',
                          }}
                        >
                          Compose
                        </Button>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {/* Search bar - aligned right */}
                          <Box sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            px: 1.5,
                            py: 0.5,
                            height: 32,
                            maxWidth: '300px',
                            width: '40%'
                          }}>
                            <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: '1.2rem' }} />
                            <InputBase 
                              placeholder="Search here" 
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              sx={{ fontSize: '0.9rem', width: '100%' }}
                            />
                          </Box>
                          
                          {/* Filter dropdown */}
                          <Button
                            onClick={handleFilterClick}
                            endIcon={<DropdownIcon />}
                            size="small"
                            sx={{ 
                              border: '1px solid #e0e0e0',
                              color: '#555',
                              textTransform: 'none',
                              px: 2,
                              py: 0.5,
                              height: 32,
                              minWidth: '80px'
                            }}
                          >
                            {filter}
                          </Button>
                          <Menu
                            anchorEl={filterAnchorEl}
                            open={Boolean(filterAnchorEl)}
                            onClose={handleFilterClose}
                          >
                            <MenuItem onClick={() => handleFilterSelect('All')}>
                              <ListItemText primaryTypographyProps={{ fontSize: '0.8rem' }}>All</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => handleFilterSelect('Unread')}>
                              <ListItemText primaryTypographyProps={{ fontSize: '0.8rem' }}>Unread</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => handleFilterSelect('Sent')}>
                              <ListItemText primaryTypographyProps={{ fontSize: '0.8rem' }}>Sent</ListItemText>
                            </MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                      
                      {/* Messages Content */}
                      <Grid container spacing={2}>
                        {/* Messages List - Left Side */}
                        <Grid item xs={12} md={isExpanded ? 5 : 12}>
                          <Paper sx={{ 
                            bgcolor: 'white', 
                            borderRadius: 1, 
                            overflow: 'hidden',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            height: isExpanded ? 'calc(100vh - 330px)' : 'auto',
                            display: 'flex',
                            flexDirection: 'column'
                          }}>
                            <Box sx={{ 
                              flex: 1, 
                              overflow: 'auto',
                              maxHeight: isExpanded ? 'calc(100vh - 330px)' : '55vh'
                            }}>
                              {filteredConversations.length > 0 ? (
                                filteredConversations.map((conversation) => (
                                  <Box 
                                    key={conversation.id} 
                                    onClick={() => handleConversationSelect(conversation)}
                                    sx={{ 
                                      position: 'relative',
                                      py: 1.5,
                                      px: 2,
                                      borderBottom: '1px solid #eee',
                                      '&:last-child': { borderBottom: 'none' },
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      bgcolor: selectedConversation?.id === conversation.id ? '#f0f0f0' : conversation.unreadCount > 0 ? '#fafafa' : 'transparent',
                                      cursor: 'pointer',
                                      '&:hover': { bgcolor: '#f5f5f5' }
                                    }}
                                  >
                                    {/* Unread indicator */}
                                    {conversation.unreadCount > 0 && (
                                      <Box 
                                        sx={{ 
                                          position: 'absolute',
                                          left: 0,
                                          top: 0, 
                                          bottom: 0,
                                          width: '4px',
                                          bgcolor: '#ff5722'
                                        }} 
                                      />
                                    )}
                                    
                                    {/* Avatar Circle */}
                                    <Avatar 
                                      sx={{ 
                                        bgcolor: '#185B5F', 
                                        width: 36, 
                                        height: 36, 
                                        fontSize: '0.9rem',
                                        mr: 2 
                                      }}
                                    >
                                      {getInitials(conversation.contact.name)}
                                    </Avatar>
                                    
                                    {/* Message content */}
                                    <Box sx={{ flexGrow: 1 }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <Box>
                                          <Typography 
                                            variant="subtitle1" 
                                            component="span"
                                            sx={{ 
                                              fontSize: '0.9rem',
                                              fontWeight: conversation.unreadCount > 0 ? 600 : 400 
                                            }}
                                          >
                                            {conversation.contact.name}
                                          </Typography>
                                          <Typography 
                                            variant="body2" 
                                            component="span"
                                            sx={{ 
                                              fontSize: '0.85rem',
                                              color: '#666',
                                              ml: 1
                                            }}
                                          >
                                            {conversation.contact.isOnline ? 'Online' : conversation.contact.lastSeen}
                                          </Typography>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          {!conversation.unreadCount && (
                                            <Box 
                                              sx={{ 
                                                width: 8, 
                                                height: 8, 
                                                borderRadius: '50%', 
                                                bgcolor: '#ff5722', 
                                                mr: 1 
                                              }} 
                                            />
                                          )}
                                          <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ 
                                              fontSize: '0.75rem',
                                              whiteSpace: 'nowrap'
                                            }}
                                          >
                                            Sent on:
                                          </Typography>
                                          <Typography 
                                            variant="body2" 
                                            sx={{ 
                                              ml: 0.5, 
                                              fontSize: '0.75rem',
                                              whiteSpace: 'nowrap'
                                            }}
                                          >
                                            {formatTimestamp(conversation.lastMessage.timestamp)}
                                          </Typography>
                                          <IconButton 
                                            size="small" 
                                            sx={{ ml: 1, p: 0.5 }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              // Menu options would go here
                                            }}
                                          >
                                            <MoreVertIcon sx={{ fontSize: '1.1rem' }} />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                      
                                      <Typography 
                                        variant="body2" 
                                        sx={{ 
                                          color: '#555', 
                                          mt: 0.5,
                                          fontSize: '0.85rem',
                                          fontWeight: conversation.unreadCount > 0 ? 500 : 400,
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          maxWidth: '90%'
                                        }}
                                      >
                                        {conversation.lastMessage.text}
                                      </Typography>
                                    </Box>
                                  </Box>
                                ))
                              ) : (
                                <Box sx={{ p: 3, textAlign: 'center' }}>
                                  <Typography variant="body1" color="text.secondary">
                                    No conversations found
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Paper>
                        </Grid>
                        
                        {/* Message Content - Right Side */}
                        {isExpanded && selectedConversation && (
                          <Grid item xs={12} md={7}>
                            <Paper sx={{ 
                              bgcolor: 'white', 
                              borderRadius: 1, 
                              overflow: 'hidden',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                              height: 'calc(100vh - 330px)', 
                              display: 'flex',
                              flexDirection: 'column',
                            }}>
                              {/* Message header */}
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #f0f0f0' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                    {selectedConversation.contact.name}
                                  </Typography>
                                </Box>
                                <IconButton onClick={handleCloseMessage} size="small">
                                  <CloseIcon />
                                </IconButton>
                              </Box>
                              
                              {/* Modern Chat Message area */}
                              <Box 
                                sx={{ 
                                  p: 2, 
                                  flex: 1, 
                                  overflowY: 'auto',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  bgcolor: '#f5f5f5'
                                }}
                              >
                                {selectedConversation.messages.map((message) => (
                                  <Box 
                                    key={message.id}
                                    sx={{ 
                                      alignSelf: message.isFromUser ? 'flex-end' : 'flex-start',
                                      maxWidth: '70%',
                                      mb: 1.5
                                    }}
                                  >
                                    <Box 
                                      sx={{ 
                                        bgcolor: message.isFromUser ? '#185B5F' : 'white',
                                        color: message.isFromUser ? 'white' : 'black',
                                        p: 1.5,
                                        borderRadius: message.isFromUser 
                                          ? '20px 20px 4px 20px'
                                          : '20px 20px 20px 4px',
                                        boxShadow: 1
                                      }}
                                    >
                                      <Typography variant="body1" sx={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                                        {message.text}
                                      </Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{ color: '#777', fontSize: '0.7rem', ml: 1, mt: 0.5, display: 'block' }}>
                                      {formatTimestamp(message.timestamp)}
                                    </Typography>
                                  </Box>
                                ))}
                                <div ref={messagesEndRef} />
                              </Box>
                              
                              {/* Modern message input area */}
                              <Box 
                                sx={{ 
                                  p: 1.5, 
                                  borderTop: '1px solid #f0f0f0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  bgcolor: 'white'
                                }}
                              >
                                <IconButton size="small" sx={{ mr: 1 }}>
                                  <EmojiIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ mr: 1 }}>
                                  <AttachFileIcon fontSize="small" />
                                </IconButton>
                                <TextField
                                  fullWidth
                                  placeholder="Type a message..."
                                  variant="outlined"
                                  size="small"
                                  value={messageText}
                                  onChange={(e) => setMessageText(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      handleSendMessage();
                                    }
                                  }}
                                  InputProps={{
                                    sx: {
                                      borderRadius: 20,
                                      bgcolor: '#f9f9f9',
                                      fontSize: '0.9rem',
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#e0e0e0'
                                      }
                                    }
                                  }}
                                  sx={{ mr: 1 }}
                                />
                                <IconButton 
                                  onClick={handleSendMessage}
                                  sx={{ 
                                    bgcolor: '#185B5F',
                                    color: 'white', 
                                    '&:hover': { bgcolor: '#124548' }
                                  }}
                                >
                                  <SendIcon />
                                </IconButton>
                              </Box>
                            </Paper>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  )}
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                  <Tabs
                    value={rightPanelTab}
                    onChange={handleRightPanelTabChange}
                    sx={{
                      borderBottom: '1px solid #e0e0e0',
                      minHeight: '40px',
                      '& .MuiTabs-indicator': {
                        backgroundColor: '#185B5F',
                        height: 3
                      },
                      '& .Mui-selected': {
                        color: '#185B5F !important',
                      },
                      '& .MuiTab-root': {
                        textTransform: 'none',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#808080',
                        p: 1,
                        minHeight: '40px'
                      }
                    }}
                  >
                    <Tab label="Pickups" value="Pickups" />
                    <Tab label="Devices" value="Devices" />
                  </Tabs>
                  
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<FilterListIcon sx={{ fontSize: '18px' }} />}
                        size="small"
                        sx={{ 
                          color: '#666',
                          borderColor: '#e0e0e0',
                          textTransform: 'none',
                          fontSize: '0.75rem',
                          py: 0.5,
                          height: '32px',
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
                          size="small"
                          onClick={handleSchedulePickup}
                          sx={{
                            bgcolor: '#185B5F',
                            textTransform: 'none',
                            fontSize: '0.75rem',
                            py: 0.5,
                            height: '32px',
                            '&:hover': {
                              bgcolor: '#124548'
                            }
                          }}
                        >
                          Schedule Pickup
                        </Button>
                      )}
                    </Box>
                  </Box>
                  
                  {rightPanelTab === 'Pickups' && (
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 230px)', overflow: 'auto' }}>
                      <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox" sx={{ bgcolor: '#f5f5f5', width: '40px' }}></TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>RYGN Contact</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '12%' }}>Date</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Time</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '18%' }}>Location</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '12%' }}>Status</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Weight (kg)</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%', textAlign: 'center' }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {mockPickups.map((pickup) => (
                            <TableRow key={pickup.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                              <TableCell padding="checkbox" sx={{ py: 0.5 }}>
                                <Checkbox 
                                  size="small" 
                                  sx={{ p: 0.5 }}
                                  checked={selectedPickup === pickup.id}
                                  onChange={() => handlePickupSelect(pickup)}
                                />
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {editingPickupId === pickup.id ? (
                                  <TextField
                                    size="small"
                                    name="client"
                                    value={editedPickup.client}
                                    onChange={handlePickupFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  pickup.rygnContact?.fullName || pickup.client
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                                {editingPickupId === pickup.id ? (
                                  <TextField
                                    size="small"
                                    name="date"
                                    value={editedPickup.date}
                                    onChange={handlePickupFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  pickup.date
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                                {editingPickupId === pickup.id ? (
                                  <TextField
                                    size="small"
                                    name="time"
                                    value={editedPickup.time}
                                    onChange={handlePickupFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  pickup.time
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {editingPickupId === pickup.id ? (
                                  <TextField
                                    size="small"
                                    name="location"
                                    value={editedPickup.location}
                                    onChange={handlePickupFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  pickup.location
                                )}
                              </TableCell>
                              <TableCell sx={{ py: 0.5 }}>
                                {editingPickupId === pickup.id ? (
                                  <TextField
                                    select
                                    size="small"
                                    name="status"
                                    value={editedPickup.status}
                                    onChange={handlePickupFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  >
                                    <MenuItem value="Complete">Complete</MenuItem>
                                    <MenuItem value="In Process">In Process</MenuItem>
                                    <MenuItem value="Received">Received</MenuItem>
                                  </TextField>
                                ) : (
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
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                                {editingPickupId === pickup.id ? (
                                  <TextField
                                    size="small"
                                    name="weight"
                                    type="number"
                                    value={editedPickup.weight}
                                    onChange={handlePickupFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  pickup.weight
                                )}
                              </TableCell>
                              <TableCell sx={{ py: 0.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                  {editingPickupId === pickup.id ? (
                                    <IconButton 
                                      size="small" 
                                      sx={{ color: '#4CAF50' }}
                                      onClick={(e) => handleSavePickup(pickup.id, e)}
                                    >
                                      <SaveIcon fontSize="small" />
                                    </IconButton>
                                  ) : (
                                    <IconButton 
                                      size="small" 
                                      sx={{ color: '#4ECDC4' }}
                                      onClick={(e) => handleEditPickup(pickup, e)}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  )}
                                  <IconButton 
                                    size="small" 
                                    sx={{ color: '#666' }}
                                    onClick={(e) => handleDeletePickup(pickup.id, e)}
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
                  
                  {rightPanelTab === 'Devices' && (
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 230px)', overflow: 'auto' }}>
                      <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox" sx={{ bgcolor: '#f5f5f5', width: '40px' }}></TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Type</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '14%' }}>Manufacturer</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '14%' }}>Model</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%' }}>Serial Number</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Status</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '10%' }}>Weight (kg)</TableCell>
                            <TableCell sx={{ bgcolor: '#f5f5f5', fontSize: '0.75rem', width: '15%', textAlign: 'center' }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {mockDevices.map((device) => (
                            <TableRow key={device.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                              <TableCell padding="checkbox" sx={{ py: 0.5 }}>
                                <Checkbox 
                                  size="small" 
                                  sx={{ p: 0.5 }}
                                />
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                                {editingDeviceId === device.id ? (
                                  <TextField
                                    size="small"
                                    name="type"
                                    value={editedDevice.type}
                                    onChange={handleDeviceFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  device.type
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {editingDeviceId === device.id ? (
                                  <TextField
                                    size="small"
                                    name="manufacturer"
                                    value={editedDevice.manufacturer}
                                    onChange={handleDeviceFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  device.manufacturer
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {editingDeviceId === device.id ? (
                                  <TextField
                                    size="small"
                                    name="model"
                                    value={editedDevice.model}
                                    onChange={handleDeviceFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  device.model
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {editingDeviceId === device.id ? (
                                  <TextField
                                    size="small"
                                    name="serialNumber"
                                    value={editedDevice.serialNumber}
                                    onChange={handleDeviceFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  device.serialNumber
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                                {editingDeviceId === device.id ? (
                                  <TextField
                                    select
                                    size="small"
                                    name="status"
                                    value={editedDevice.status}
                                    onChange={handleDeviceFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  >
                                    <MenuItem value="Refurbished">Refurbished</MenuItem>
                                    <MenuItem value="Recycled">Recycled</MenuItem>
                                    <MenuItem value="Disposed">Disposed</MenuItem>
                                  </TextField>
                                ) : (
                                  <Chip 
                                    label={device.status} 
                                    size="small"
                                    sx={{ 
                                      borderRadius: 1, 
                                      fontSize: '0.65rem',
                                      py: 0,
                                      height: '20px',
                                      bgcolor: device.status === 'Refurbished' ? '#e8f5e9' : 
                                        device.status === 'Recycled' ? '#e3f2fd' : 
                                        device.status === 'Disposed' ? '#ffebee' : '#f5f5f5',
                                      color: device.status === 'Refurbished' ? '#2e7d32' : 
                                        device.status === 'Recycled' ? '#1565c0' : 
                                        device.status === 'Disposed' ? '#c62828' : '#616161'
                                    }} 
                                  />
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', py: 0.5 }}>
                                {editingDeviceId === device.id ? (
                                  <TextField
                                    size="small"
                                    name="weight"
                                    type="number"
                                    value={editedDevice.weight}
                                    onChange={handleDeviceFieldChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontSize: '0.75rem' }}
                                    InputProps={{ sx: { fontSize: '0.75rem', padding: '2px 8px' } }}
                                  />
                                ) : (
                                  device.weight
                                )}
                              </TableCell>
                              <TableCell sx={{ py: 0.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                  {editingDeviceId === device.id ? (
                                    <IconButton 
                                      size="small" 
                                      sx={{ color: '#4CAF50' }}
                                      onClick={(e) => handleSaveDevice(device.id, e)}
                                    >
                                      <SaveIcon fontSize="small" />
                                    </IconButton>
                                  ) : (
                                    <IconButton 
                                      size="small" 
                                      sx={{ color: '#4ECDC4' }}
                                      onClick={(e) => handleEditDevice(device, e)}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  )}
                                  <IconButton 
                                    size="small" 
                                    sx={{ color: '#666' }}
                                    onClick={(e) => handleDeleteDevice(device.id, e)}
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

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
            <DialogTitle>
              Are you sure you want to archive this {deleteType}?
            </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                {deleteItemName}
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
                Archive
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

          {/* Compose Message Dialog */}
          <Dialog 
            open={composeOpen} 
            onClose={handleComposeClose}
            maxWidth="sm"
            fullWidth
            sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
          >
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>Compose Message</Typography>
                <IconButton onClick={handleComposeClose} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <TextField
                fullWidth
                label="To"
                disabled
                value="Green Tech Vault Support"
                size="small"
                sx={{ mb: 2 }}
                InputProps={{ style: { fontSize: '0.85rem' } }}
                InputLabelProps={{ style: { fontSize: '0.85rem' } }}
              />
              
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={composeData.subject}
                onChange={handleComposeChange}
                placeholder="Enter subject"
                size="small"
                sx={{ mb: 2 }}
                InputProps={{ style: { fontSize: '0.85rem' } }}
                InputLabelProps={{ style: { fontSize: '0.85rem' } }}
              />
              
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Message"
                name="message"
                value={composeData.message}
                onChange={handleComposeChange}
                placeholder="Type your message here..."
                sx={{ mb: 2 }}
                InputProps={{ style: { fontSize: '0.85rem' } }}
                InputLabelProps={{ style: { fontSize: '0.85rem' } }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  onClick={handleComposeClose}
                  sx={{ mr: 1.5, fontSize: '0.8rem' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleComposeSend}
                  endIcon={<SendIcon fontSize="small" />}
                  sx={{
                    bgcolor: '#185B5F',
                    '&:hover': { bgcolor: '#124548' },
                    fontSize: '0.8rem',
                    py: 0.75,
                    px: 2
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default RYGNProfile; 