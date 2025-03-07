import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Pagination,
  InputAdornment
} from '@mui/material';
import { 
  Search as SearchIcon, 
  FilterList as FilterIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { deviceAPI } from '../services/api';
import { formatDate, formatWeight } from '../utils/formatters';

const deviceTypeIcons = {
  'laptop': '💻',
  'desktop': '🖥️',
  'tablet': '📱',
  'phone': '📱',
  'printer': '🖨️',
  'monitor': '🖥️',
  'server': '🖥️',
  'networking': '🌐',
  'peripheral': '🖱️',
  'other': '📦'
};

const Devices = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    condition: '',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, [page, filters]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const params = {
        page,
        limit: 10,
        ...filters
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '') {
          delete params[key];
        }
      });
      
      const res = await deviceAPI.getDevices(params);
      setDevices(res.data.data);
      setTotalPages(Math.ceil(res.data.total / 10) || 1);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load devices');
      console.error('Device fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDevices();
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: '',
      condition: '',
      status: ''
    });
    setPage(1);
  };

  const getDeviceStatusLabel = (device) => {
    if (device.recycled) return 'Recycled';
    if (device.refurbished) return 'Refurbished';
    if (device.dataWiped) return 'Data Wiped';
    return 'Collected';
  };

  const getDeviceStatusColor = (device) => {
    if (device.recycled) return 'error';
    if (device.refurbished) return 'success';
    if (device.dataWiped) return 'info';
    return 'default';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Devices Inventory
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                placeholder="Search devices..."
                variant="outlined"
                size="small"
                name="search"
                value={filters.search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300, mr: 2 }}
              />
              <Button 
                variant="outlined" 
                startIcon={<FilterIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </Box>
            <Box>
              <Button 
                variant="contained" 
                onClick={() => navigate('/pickups')}
              >
                Schedule Pickup
              </Button>
            </Box>
          </Box>

          {showFilters && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="Device Type"
                    name="type"
                    size="small"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="laptop">Laptop</MenuItem>
                    <MenuItem value="desktop">Desktop</MenuItem>
                    <MenuItem value="tablet">Tablet</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                    <MenuItem value="printer">Printer</MenuItem>
                    <MenuItem value="monitor">Monitor</MenuItem>
                    <MenuItem value="server">Server</MenuItem>
                    <MenuItem value="networking">Networking Equipment</MenuItem>
                    <MenuItem value="peripheral">Peripheral</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="Condition"
                    name="condition"
                    size="small"
                    value={filters.condition}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Conditions</MenuItem>
                    <MenuItem value="working">Working</MenuItem>
                    <MenuItem value="partial">Partially Working</MenuItem>
                    <MenuItem value="broken">Not Working</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    name="status"
                    size="small"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="collected">Collected</MenuItem>
                    <MenuItem value="dataWiped">Data Wiped</MenuItem>
                    <MenuItem value="refurbished">Refurbished</MenuItem>
                    <MenuItem value="recycled">Recycled</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button 
                  variant="text" 
                  onClick={handleClearFilters}
                  size="small"
                >
                  Clear Filters
                </Button>
              </Box>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : devices.length === 0 ? (
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="body1" color="text.secondary">
                No devices found. Try adjusting your filters or schedule a pickup to collect devices.
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Manufacturer/Model</TableCell>
                      <TableCell>Serial Number</TableCell>
                      <TableCell>Condition</TableCell>
                      <TableCell>Weight</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Pickup Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {devices.map((device) => (
                      <TableRow key={device._id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '8px' }}>
                              {deviceTypeIcons[device.type] || '📦'}
                            </span>
                            {device.type}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {device.manufacturer}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {device.model}
                          </Typography>
                        </TableCell>
                        <TableCell>{device.serialNumber || '-'}</TableCell>
                        <TableCell>
                          <Chip 
                            label={device.condition} 
                            color={device.condition === 'working' ? 'success' : 
                                  device.condition === 'partial' ? 'warning' : 'error'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>{formatWeight(device.weight)}</TableCell>
                        <TableCell>
                          <Chip 
                            label={getDeviceStatusLabel(device)} 
                            color={getDeviceStatusColor(device)} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          {device.pickup && formatDate(device.pickup.scheduledDate)}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton 
                            size="small"
                            color="primary"
                            onClick={() => navigate(`/devices/${device._id}`)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Inventory Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Total Devices
              </Typography>
              <Typography variant="h5">
                {devices.length > 0 ? devices.length : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Total Weight
              </Typography>
              <Typography variant="h5">
                {devices.length > 0 ? formatWeight(devices.reduce((sum, device) => sum + (parseFloat(device.weight) || 0), 0)) : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Working Devices
              </Typography>
              <Typography variant="h5">
                {devices.length > 0 ? devices.filter(d => d.condition === 'working').length : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Refurbished
              </Typography>
              <Typography variant="h5">
                {devices.length > 0 ? devices.filter(d => d.refurbished).length : '-'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Devices; 