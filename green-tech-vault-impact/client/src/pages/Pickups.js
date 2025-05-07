import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Pagination
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { pickupAPI } from '../services/api';
import { formatDate } from '../utils/formatters';

const statusColors = {
  'scheduled': 'primary',
  'in-progress': 'warning',
  'completed': 'success',
  'cancelled': 'error'
};

const Pickups = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    scheduledDate: '',
    location: '',
    contactPerson: '',
    contactPhone: '',
    notes: '',
    status: 'scheduled'
  });
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchPickups();
  }, [page]);

  const fetchPickups = async () => {
    try {
      setLoading(true);
      const res = await pickupAPI.getPickups({ page, limit: 10 });
      setPickups(res.data.data);
      setTotalPages(Math.ceil(res.data.total / 10) || 1);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load pickups');
      console.error('Pickup fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setFormData({
      scheduledDate: '',
      location: '',
      contactPerson: '',
      contactPhone: '',
      notes: '',
      status: 'scheduled'
    });
    setFormError(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      setFormLoading(true);
      await pickupAPI.createPickup(formData);
      handleCloseDialog();
      fetchPickups();
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to create pickup');
      console.error('Pickup creation error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          E-Waste Pickups
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ 
            bgcolor: '#62CBD0',
            '&:hover': { bgcolor: '#50B9BE' }
          }}
        >
          Schedule Pickup
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : pickups.length === 0 ? (
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="body1" color="text.secondary">
                No pickups scheduled yet. Click "Schedule Pickup" to create your first pickup.
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Pickup ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pickups.map((pickup) => (
                      <TableRow key={pickup._id}>
                        <TableCell>{pickup._id.substring(0, 8)}</TableCell>
                        <TableCell>{formatDate(pickup.scheduledDate)}</TableCell>
                        <TableCell>{new Date(pickup.scheduledDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</TableCell>
                        <TableCell>{pickup.location}</TableCell>
                        <TableCell>{pickup.contactPerson}</TableCell>
                        <TableCell>
                          <Chip 
                            label={pickup.status} 
                            color={statusColors[pickup.status] || 'default'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton 
                            component={RouterLink} 
                            to={`/pickups/${pickup._id}`}
                            size="small"
                            sx={{ 
                              color: '#4ECDC4',
                              bgcolor: '#e6f7f5', 
                              p: 0.5,
                              mr: 1,
                              '&:hover': { bgcolor: '#d0f0ed' }
                            }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            component={RouterLink} 
                            to={`/pickups/${pickup._id}/edit`}
                            size="small"
                            sx={{ 
                              color: '#4ECDC4',
                              bgcolor: '#e6f7f5', 
                              p: 0.5,
                              '&:hover': { bgcolor: '#d0f0ed' }
                            }}
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

      {/* Schedule Pickup Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule New Pickup</DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                  label="Notes"
                  name="notes"
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={handleFormChange}
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
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            sx={{ 
              bgcolor: '#62CBD0',
              '&:hover': { bgcolor: '#50B9BE' }
            }}
            disabled={formLoading}
            startIcon={formLoading ? <CircularProgress size={20} /> : null}
          >
            {formLoading ? 'Scheduling...' : 'Schedule Pickup'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pickups; 