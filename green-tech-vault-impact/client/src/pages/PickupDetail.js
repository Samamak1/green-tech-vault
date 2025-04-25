import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { pickupAPI, deviceAPI } from '../services/api';
import { formatDate, formatWeight } from '../utils/formatters';

const statusColors = {
  'scheduled': 'primary',
  'in-progress': 'warning',
  'completed': 'success',
  'cancelled': 'error'
};

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

const PickupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    scheduledDate: '',
    location: '',
    contactPerson: '',
    contactPhone: '',
    notes: '',
    status: ''
  });
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);
  const [deviceFormData, setDeviceFormData] = useState({
    type: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    condition: 'working',
    weight: '',
    notes: ''
  });
  const [deviceFormError, setDeviceFormError] = useState(null);
  const [addingDevice, setAddingDevice] = useState(false);

  useEffect(() => {
    fetchPickupDetails();
  }, [id]);

  const fetchPickupDetails = async () => {
    try {
      setLoading(true);
      const res = await pickupAPI.getPickupById(id);
      setPickup(res.data.data);
      setFormData({
        scheduledDate: res.data.data.scheduledDate ? new Date(res.data.data.scheduledDate).toISOString().split('T')[0] : '',
        location: res.data.data.location || '',
        contactPerson: res.data.data.contactPerson || '',
        contactPhone: res.data.data.contactPhone || '',
        notes: res.data.data.notes || '',
        status: res.data.data.status || 'scheduled'
      });
      
      // Fetch devices for this pickup
      const devicesRes = await deviceAPI.getDevicesByPickup(id);
      setDevices(devicesRes.data.data);
      
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load pickup details');
      console.error('Pickup details fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDeviceFormChange = (e) => {
    const { name, value } = e.target;
    setDeviceFormData({
      ...deviceFormData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await pickupAPI.updatePickup(id, formData);
      setEditMode(false);
      fetchPickupDetails();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update pickup');
      console.error('Pickup update error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await pickupAPI.deletePickup(id);
      navigate('/pickups');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete pickup');
      console.error('Pickup delete error:', err);
      setDeleteDialogOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleAddDevice = async () => {
    try {
      setDeviceFormError(null);
      setAddingDevice(true);
      
      const deviceData = {
        ...deviceFormData,
        pickupId: id
      };
      
      await deviceAPI.createDevice(deviceData);
      setDeviceDialogOpen(false);
      setDeviceFormData({
        type: '',
        manufacturer: '',
        model: '',
        serialNumber: '',
        condition: 'working',
        weight: '',
        notes: ''
      });
      
      // Refresh devices list
      const devicesRes = await deviceAPI.getDevicesByPickup(id);
      setDevices(devicesRes.data.data);
    } catch (err) {
      setDeviceFormError(err.response?.data?.error || 'Failed to add device');
      console.error('Device creation error:', err);
    } finally {
      setAddingDevice(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pickup && !loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Pickup not found. The pickup may have been deleted or you don't have permission to view it.
        </Alert>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/pickups')}
        >
          Back to Pickups
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Pickup Details
        </Typography>
        <Box>
          {!editMode ? (
            <>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => setEditMode(true)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outlined" 
                onClick={() => setEditMode(false)}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSave}
                disabled={saving}
                startIcon={saving ? <CircularProgress size={20} /> : null}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          )}
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pickup Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {editMode ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Scheduled Date"
                      name="scheduledDate"
                      type="date"
                      value={formData.scheduledDate}
                      onChange={handleFormChange}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                      label="Contact Phone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleFormChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Status"
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      required
                    >
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Notes"
                      name="notes"
                      multiline
                      rows={4}
                      value={formData.notes}
                      onChange={handleFormChange}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Pickup ID
                    </Typography>
                    <Typography variant="body1">
                      {pickup._id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip 
                      label={pickup.status} 
                      color={statusColors[pickup.status] || 'default'} 
                      size="small" 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Scheduled Date
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(pickup.scheduledDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Created At
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(pickup.createdAt)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1">
                      {pickup.location}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Contact Person
                    </Typography>
                    <Typography variant="body1">
                      {pickup.contactPerson}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Contact Phone
                    </Typography>
                    <Typography variant="body1">
                      {pickup.contactPhone}
                    </Typography>
                  </Grid>
                  {pickup.notes && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Notes
                      </Typography>
                      <Typography variant="body1">
                        {pickup.notes}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Devices
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setDeviceDialogOpen(true)}
                >
                  Add Device
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              {devices.length === 0 ? (
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body1" color="text.secondary">
                    No devices added to this pickup yet.
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Condition</TableCell>
                        <TableCell>Weight</TableCell>
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
                          <TableCell>{device.manufacturer}</TableCell>
                          <TableCell>{device.model}</TableCell>
                          <TableCell>
                            <Chip 
                              label={device.condition} 
                              color={device.condition === 'working' ? 'success' : 
                                     device.condition === 'partial' ? 'warning' : 'error'} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>{formatWeight(device.weight)}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              size="small"
                              sx={{ 
                                color: '#4ECDC4',
                                bgcolor: '#e6f7f5', 
                                p: 0.5,
                                '&:hover': { bgcolor: '#d0f0ed' }
                              }}
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
              )}
              
              {devices.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Summary
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Total Devices
                      </Typography>
                      <Typography variant="h6">
                        {devices.length}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Total Weight
                      </Typography>
                      <Typography variant="h6">
                        {formatWeight(devices.reduce((sum, device) => sum + (parseFloat(device.weight) || 0), 0))}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Working Devices
                      </Typography>
                      <Typography variant="h6">
                        {devices.filter(d => d.condition === 'working').length}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Pickup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this pickup? This action cannot be undone and will also delete all associated devices.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={20} /> : null}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Device Dialog */}
      <Dialog
        open={deviceDialogOpen}
        onClose={() => setDeviceDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Device</DialogTitle>
        <DialogContent>
          {deviceFormError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {deviceFormError}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Device Type"
                name="type"
                value={deviceFormData.type}
                onChange={handleDeviceFormChange}
                required
              >
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Condition"
                name="condition"
                value={deviceFormData.condition}
                onChange={handleDeviceFormChange}
                required
              >
                <MenuItem value="working">Working</MenuItem>
                <MenuItem value="partial">Partially Working</MenuItem>
                <MenuItem value="broken">Not Working</MenuItem>
              </TextField>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                inputProps={{ step: 0.1, min: 0 }}
                value={deviceFormData.weight}
                onChange={handleDeviceFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                multiline
                rows={3}
                value={deviceFormData.notes}
                onChange={handleDeviceFormChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeviceDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddDevice} 
            variant="contained" 
            disabled={addingDevice}
            startIcon={addingDevice ? <CircularProgress size={20} /> : null}
          >
            {addingDevice ? 'Adding...' : 'Add Device'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PickupDetail; 