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

      {/* Summary Cards - First Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '180px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
              cursor: 'default',
              zIndex: 0
            }}
            data-boundary="true"
            >
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                1,250.5
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Total Weight (kg)
              </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              height: '180px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
              cursor: 'default',
              zIndex: 0
            }}
            data-boundary="true"
            >
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                87
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Devices Refurbished
              </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              height: '180px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
              cursor: 'default', 
              zIndex: 0
            }}
            data-boundary="true"
            >
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                69
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Devices Recycled
              </Typography>
            </Paper>
          </Grid>
      </Grid>

      {/* Second Row - Environmental Impact */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* CO2 Saved */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              height: '180px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
              cursor: 'default',
              zIndex: 0
            }}
            data-boundary="true"
            >
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                3,750.8
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                CO2 Saved (kg)
              </Typography>
            </Paper>
          </Grid>
          
          {/* Trees Planted */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              height: '180px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
              cursor: 'default',
              zIndex: 0
            }}
            data-boundary="true"
            >
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                187
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Trees Planted
              </Typography>
            </Paper>
          </Grid>
          
          {/* Landfill Diversion Rate */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              height: '180px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
              cursor: 'default',
              zIndex: 0
            }}
            data-boundary="true"
            >
              <Typography variant="h3" sx={{ color: '#56D0C5', fontWeight: 'bold' }} gutterBottom>
                92.5%
              </Typography>
              <Typography variant="body1" sx={{ color: '#686868' }}>
                Landfill Diversion Rate
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Box>
      <Box 
        sx={{ 
          padding: '24px',
          maxWidth: 'calc(100vw - 280px)', // Account for sidebar and scrollbar
          margin: '0 auto'
        }}
        data-boundary="true"
      >
        {renderDashboardContent()}
      </Box>
    </Box>
  );
};

export default Dashboard; 