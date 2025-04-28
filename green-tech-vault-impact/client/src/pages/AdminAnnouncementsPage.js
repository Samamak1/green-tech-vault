import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  TextField, 
  IconButton, 
  Divider,
  List,
  ListItem,
  Checkbox,
  Chip,
  InputBase,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  Announcement as AnnouncementIcon,
  Schedule as ScheduleIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AdminLayout from '../components/layout/AdminLayout';

const AdminAnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [filter, setFilter] = useState('All');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    recipients: 'all',
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    scheduleTime: null,
    isScheduled: false,
    isPinned: false
  });

  // Generate mock data
  useEffect(() => {
    const mockAnnouncements = [
      {
        id: '1',
        title: 'Monthly Challenge!',
        message: 'Hello Zworpech! A big welcome from the GTV team to our first Monthly challenge! Here is how you get started...',
        sender: 'Admin',
        recipients: 'all',
        createdAt: '2025-03-27T19:56:00',
        startDate: '2025-03-27T00:00:00',
        endDate: '2025-04-27T23:59:59',
        isScheduled: false,
        isPinned: true,
        status: 'active'
      },
      {
        id: '2',
        title: 'Event',
        message: 'Join us at GTV\'s first hosted event. There will be educational booths, food, and more!',
        sender: 'Admin',
        recipients: 'users',
        createdAt: '2025-03-27T19:56:00',
        startDate: '2025-04-10T00:00:00',
        endDate: '2025-04-10T23:59:59',
        isScheduled: true,
        isPinned: false,
        status: 'scheduled'
      },
      {
        id: '3',
        title: 'Come Join Us!',
        message: 'Green Tech Vault will be speaking at a confrence in Columbus 07/03/2026. Come listen and learn about the incredible steps we are taking in e-waste recycling!',
        sender: 'Admin',
        recipients: 'all',
        createdAt: '2025-03-27T19:56:00',
        startDate: '2025-03-27T00:00:00',
        endDate: '2026-07-05T23:59:59',
        isScheduled: false,
        isPinned: true,
        status: 'active'
      },
      {
        id: '4',
        title: 'System Maintenance',
        message: 'The system will be undergoing maintenance on April 15th from 2AM to 5AM EST. Please plan accordingly.',
        sender: 'System',
        recipients: 'all',
        createdAt: '2025-03-27T19:56:00',
        startDate: '2025-04-14T00:00:00',
        endDate: '2025-04-16T23:59:59',
        isScheduled: true,
        isPinned: false,
        status: 'scheduled'
      },
      {
        id: '5',
        title: 'New Feature Release',
        message: 'We are excited to announce our new dashboard features coming next month!',
        sender: 'Admin',
        recipients: 'users',
        createdAt: '2025-03-27T19:56:00',
        startDate: '2025-04-01T00:00:00',
        endDate: '2025-04-30T23:59:59',
        isScheduled: true,
        isPinned: false,
        status: 'draft'
      }
    ];
    
    setAnnouncements(mockAnnouncements);
  }, []);

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

  const handleCreateDialogOpen = () => {
    setFormData({
      title: '',
      message: '',
      recipients: 'all',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      scheduleTime: null,
      isScheduled: false,
      isPinned: false
    });
    setCreateDialogOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };

  const handleEditDialogOpen = (announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      message: announcement.message,
      recipients: announcement.recipients,
      startDate: new Date(announcement.startDate),
      endDate: new Date(announcement.endDate),
      scheduleTime: announcement.isScheduled ? new Date(announcement.startDate) : null,
      isScheduled: announcement.isScheduled,
      isPinned: announcement.isPinned
    });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedAnnouncement(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleSwitchChange = (name, checked) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleCreateAnnouncement = () => {
    const newAnnouncement = {
      id: `new-${Date.now()}`,
      title: formData.title,
      message: formData.message,
      sender: 'Admin',
      recipients: formData.recipients,
      createdAt: new Date().toISOString(),
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      isScheduled: formData.isScheduled,
      isPinned: formData.isPinned,
      status: formData.isScheduled ? 'scheduled' : 'active'
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    handleCreateDialogClose();
  };

  const handleUpdateAnnouncement = () => {
    if (!selectedAnnouncement) return;

    const updatedAnnouncement = {
      ...selectedAnnouncement,
      title: formData.title,
      message: formData.message,
      recipients: formData.recipients,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      isScheduled: formData.isScheduled,
      isPinned: formData.isPinned,
      status: formData.isScheduled ? 'scheduled' : 'active'
    };

    const updatedAnnouncements = announcements.map(announcement => 
      announcement.id === selectedAnnouncement.id ? updatedAnnouncement : announcement
    );

    setAnnouncements(updatedAnnouncements);
    handleEditDialogClose();
  };

  const handleDeleteAnnouncements = () => {
    const updatedAnnouncements = announcements.filter(
      announcement => !selectedAnnouncements.includes(announcement.id)
    );
    setAnnouncements(updatedAnnouncements);
    setSelectedAnnouncements([]);
  };

  const handleCheckboxChange = (announcementId) => {
    setSelectedAnnouncements(prev => {
      if (prev.includes(announcementId)) {
        return prev.filter(id => id !== announcementId);
      } else {
        return [...prev, announcementId];
      }
    });
  };

  const getStatusChip = (status) => {
    switch(status) {
      case 'active':
        return <Chip label="Active" size="small" sx={{ bgcolor: '#e3f7f5', color: '#4ECDC4' }} />;
      case 'scheduled':
        return <Chip label="Scheduled" size="small" sx={{ bgcolor: '#fff8e0', color: '#ffa000' }} />;
      case 'draft':
        return <Chip label="Draft" size="small" sx={{ bgcolor: '#e0e0e0', color: '#757575' }} />;
      case 'expired':
        return <Chip label="Expired" size="small" sx={{ bgcolor: '#ffebee', color: '#f44336' }} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    // Apply filter
    if (filter !== 'All') {
      if (filter === 'Active' && announcement.status !== 'active') return false;
      if (filter === 'Scheduled' && announcement.status !== 'scheduled') return false;
      if (filter === 'Draft' && announcement.status !== 'draft') return false;
      if (filter === 'Pinned' && !announcement.isPinned) return false;
    }
    
    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        announcement.title.toLowerCase().includes(searchLower) ||
        announcement.message.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Announcements</Typography>
        
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              px: 1.5,
              py: 0.5,
              mr: 2,
              width: 250
            }}>
              <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: '1.2rem' }} />
              <InputBase 
                placeholder="Search announcements" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ fontSize: '0.9rem', width: '100%' }}
              />
            </Box>
            
            <Button
              onClick={handleFilterClick}
              endIcon={<FilterListIcon />}
              size="small"
              sx={{ 
                border: '1px solid #e0e0e0',
                color: '#555',
                textTransform: 'none',
                px: 2,
                py: 0.75
              }}
            >
              {filter}
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
            >
              <MenuItem onClick={() => handleFilterSelect('All')}>All</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('Active')}>Active</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('Scheduled')}>Scheduled</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('Draft')}>Draft</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('Pinned')}>Pinned</MenuItem>
            </Menu>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateDialogOpen}
            sx={{
              bgcolor: '#4ECDC4',
              '&:hover': { bgcolor: '#3dbdb5' },
              borderRadius: '4px',
              textTransform: 'none'
            }}
          >
            Create Announcement
          </Button>
        </Box>
        
        {/* Bulk Actions */}
        {selectedAnnouncements.length > 0 && (
          <Box sx={{ 
            mb: 2, 
            display: 'flex', 
            alignItems: 'center', 
            p: 1.5, 
            bgcolor: '#f5f5f5',
            borderRadius: 1
          }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {selectedAnnouncements.length} selected
            </Typography>
            <IconButton 
              size="small" 
              onClick={handleDeleteAnnouncements}
              title="Delete selected announcements"
              sx={{ 
                color: '#E05050',
                '&:hover': { bgcolor: 'rgba(224, 80, 80, 0.08)' }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
        
        {/* Announcements Table */}
        <Paper sx={{ width: '100%', mb: 3, borderRadius: '8px', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox 
                      indeterminate={selectedAnnouncements.length > 0 && selectedAnnouncements.length < announcements.length}
                      checked={selectedAnnouncements.length > 0 && selectedAnnouncements.length === announcements.length}
                      onChange={() => {
                        if (selectedAnnouncements.length === announcements.length) {
                          setSelectedAnnouncements([]);
                        } else {
                          setSelectedAnnouncements(announcements.map(a => a.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Recipients</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>End Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAnnouncements.map((announcement) => (
                  <TableRow 
                    key={announcement.id}
                    hover
                    sx={{ 
                      '&:hover': { bgcolor: '#f9f9f9' },
                      bgcolor: announcement.isPinned ? 'rgba(255, 236, 179, 0.2)' : 'transparent'
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox 
                        checked={selectedAnnouncements.includes(announcement.id)}
                        onChange={() => handleCheckboxChange(announcement.id)}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: announcement.isPinned ? 'bold' : 'normal' }}>
                      {announcement.isPinned && (
                        <Box component="span" sx={{ color: '#ffa000', mr: 1, verticalAlign: 'middle' }}>★</Box>
                      )}
                      {announcement.title}
                    </TableCell>
                    <TableCell sx={{ 
                      maxWidth: 300,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {announcement.message}
                    </TableCell>
                    <TableCell>
                      {announcement.recipients === 'all' ? 'All Users' : 'Selected Users'}
                    </TableCell>
                    <TableCell>{getFormattedDate(announcement.startDate)}</TableCell>
                    <TableCell>{getFormattedDate(announcement.endDate)}</TableCell>
                    <TableCell>{getStatusChip(announcement.status)}</TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditDialogOpen(announcement)}
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
                        onClick={() => {
                          setSelectedAnnouncements([announcement.id]);
                          handleDeleteAnnouncements();
                        }}
                        sx={{ 
                          color: '#E05050',
                          border: '1px solid #e0e0e0',
                          borderRadius: '50%',
                          p: 1,
                          width: 36,
                          height: 36,
                          '&:hover': {
                            bgcolor: 'rgba(224, 80, 80, 0.08)',
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAnnouncements.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      No announcements found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        {/* Create Announcement Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={handleCreateDialogClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ bgcolor: '#f5f5f5', py: 2 }}>
            Create New Announcement
            <IconButton
              onClick={handleCreateDialogClose}
              sx={{ position: 'absolute', right: 8, top: 8, color: '#666' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              multiline
              rows={6}
              sx={{ mb: 3 }}
            />
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Recipients</InputLabel>
                  <Select
                    name="recipients"
                    value={formData.recipients}
                    label="Recipients"
                    onChange={handleFormChange}
                  >
                    <MenuItem value="all">All Users</MenuItem>
                    <MenuItem value="users">Selected Users</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isScheduled}
                  onChange={(e) => handleSwitchChange('isScheduled', e.target.checked)}
                  color="primary"
                />
              }
              label="Schedule Announcement"
              sx={{ mb: 2 }}
            />
            
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(date) => handleDateChange('startDate', date)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={(date) => handleDateChange('endDate', date)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              
              {formData.isScheduled && (
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Schedule Time"
                      value={formData.scheduleTime}
                      onChange={(time) => handleDateChange('scheduleTime', time)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              )}
            </Grid>
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPinned}
                  onChange={(e) => handleSwitchChange('isPinned', e.target.checked)}
                  color="primary"
                />
              }
              label="Pin this announcement"
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Button onClick={handleCreateDialogClose} sx={{ color: '#666' }}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleCreateAnnouncement}
              sx={{
                bgcolor: '#4ECDC4',
                '&:hover': { bgcolor: '#3dbdb5' },
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Edit Announcement Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ bgcolor: '#f5f5f5', py: 2 }}>
            Edit Announcement
            <IconButton
              onClick={handleEditDialogClose}
              sx={{ position: 'absolute', right: 8, top: 8, color: '#666' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              multiline
              rows={6}
              sx={{ mb: 3 }}
            />
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Recipients</InputLabel>
                  <Select
                    name="recipients"
                    value={formData.recipients}
                    label="Recipients"
                    onChange={handleFormChange}
                  >
                    <MenuItem value="all">All Users</MenuItem>
                    <MenuItem value="users">Selected Users</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isScheduled}
                  onChange={(e) => handleSwitchChange('isScheduled', e.target.checked)}
                  color="primary"
                />
              }
              label="Schedule Announcement"
              sx={{ mb: 2 }}
            />
            
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(date) => handleDateChange('startDate', date)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={(date) => handleDateChange('endDate', date)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              
              {formData.isScheduled && (
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Schedule Time"
                      value={formData.scheduleTime}
                      onChange={(time) => handleDateChange('scheduleTime', time)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              )}
            </Grid>
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPinned}
                  onChange={(e) => handleSwitchChange('isPinned', e.target.checked)}
                  color="primary"
                />
              }
              label="Pin this announcement"
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Button onClick={handleEditDialogClose} sx={{ color: '#666' }}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleUpdateAnnouncement}
              sx={{
                bgcolor: '#4ECDC4',
                '&:hover': { bgcolor: '#3dbdb5' },
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default AdminAnnouncementsPage; 