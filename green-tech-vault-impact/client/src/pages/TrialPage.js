import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AdminLayout from '../components/layout/AdminLayout';

const TrialPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: 'Spring Promo Launch',
      status: 'Scheduled',
      channels: ['email', 'push'],
      audience: 'All Customers',
      scheduledTime: 'Apr 30, 10AM'
    },
    {
      id: 2,
      title: 'New Feature Announcement',
      status: 'Sent',
      channels: ['email', 'sms', 'push'],
      audience: 'Beta Users',
      scheduledTime: 'Apr 15, 2PM'
    },
    {
      id: 3,
      title: 'Maintenance Notification',
      status: 'Draft',
      channels: ['email'],
      audience: 'All Users',
      scheduledTime: 'Not scheduled'
    },
    {
      id: 4,
      title: 'Summer Sale Preview',
      status: 'Scheduled',
      channels: ['email', 'sms'],
      audience: 'VIP Customers',
      scheduledTime: 'May 15, 9AM'
    },
    {
      id: 5,
      title: 'Holiday Closure Notice',
      status: 'Failed',
      channels: ['email', 'push'],
      audience: 'All Customers',
      scheduledTime: 'Apr 12, 11AM'
    }
  ];

  // Mock data for automations
  const automations = [
    {
      id: 1,
      name: 'New User Welcome',
      trigger: 'User Signup',
      audience: 'New Users',
      channels: ['email'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Birthday Discount',
      trigger: 'Birthday',
      audience: 'All Customers',
      channels: ['email', 'sms'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Abandoned Cart Reminder',
      trigger: 'Cart Abandonment',
      audience: 'Shoppers',
      channels: ['email', 'push'],
      status: 'Paused'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Function to render channel icons
  const renderChannels = (channels) => {
    return (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {channels.includes('email') && (
          <Chip 
            icon={<EmailIcon fontSize="small" />} 
            label="Email" 
            size="small"
            sx={{ 
              bgcolor: 'rgba(78, 205, 196, 0.1)', 
              color: '#4ECDC4', 
              border: '1px solid #4ECDC4',
              height: '24px',
              '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
              '& .MuiChip-icon': { fontSize: '0.875rem' }
            }}
          />
        )}
        {channels.includes('sms') && (
          <Chip 
            icon={<SmsIcon fontSize="small" />} 
            label="SMS" 
            size="small"
            sx={{ 
              bgcolor: 'rgba(29, 53, 87, 0.1)', 
              color: '#1D3557', 
              border: '1px solid #1D3557',
              height: '24px',
              '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
              '& .MuiChip-icon': { fontSize: '0.875rem' }
            }}
          />
        )}
        {channels.includes('push') && (
          <Chip 
            icon={<NotificationsIcon fontSize="small" />} 
            label="Push" 
            size="small"
            sx={{ 
              bgcolor: 'rgba(241, 143, 1, 0.1)', 
              color: '#F18F01', 
              border: '1px solid #F18F01',
              height: '24px',
              '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
              '& .MuiChip-icon': { fontSize: '0.875rem' }
            }}
          />
        )}
      </Box>
    );
  };

  // Function to get status chip color
  const getStatusChip = (status) => {
    let color, bgColor, borderColor;
    
    switch(status) {
      case 'Scheduled':
        color = '#4ECDC4';
        bgColor = 'rgba(78, 205, 196, 0.1)';
        borderColor = '#4ECDC4';
        break;
      case 'Sent':
        color = '#1D3557';
        bgColor = 'rgba(29, 53, 87, 0.1)';
        borderColor = '#1D3557';
        break;
      case 'Draft':
        color = '#6c757d';
        bgColor = 'rgba(108, 117, 125, 0.1)';
        borderColor = '#6c757d';
        break;
      case 'Failed':
        color = '#E71D36';
        bgColor = 'rgba(231, 29, 54, 0.1)';
        borderColor = '#E71D36';
        break;
      case 'Active':
        color = '#4ECDC4';
        bgColor = 'rgba(78, 205, 196, 0.1)';
        borderColor = '#4ECDC4';
        break;
      case 'Paused':
        color = '#F18F01';
        bgColor = 'rgba(241, 143, 1, 0.1)';
        borderColor = '#F18F01';
        break;
      default:
        color = '#6c757d';
        bgColor = 'rgba(108, 117, 125, 0.1)';
        borderColor = '#6c757d';
    }
    
    return (
      <Chip 
        label={status} 
        size="small"
        sx={{ 
          color: color,
          bgcolor: bgColor,
          border: `1px solid ${borderColor}`,
          fontWeight: 500,
          height: '24px',
          '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
        }}
      />
    );
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 2 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>Announcements & Automation</Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Search Bar */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              px: 1.5,
              py: 0.25,
              width: 280
            }}>
              <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: '1.1rem' }} />
              <TextField
                placeholder="Search announcements or automations..."
                variant="standard"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ '& input': { padding: '2px 0', fontSize: '0.85rem' } }}
              />
            </Box>
            
            {/* Action Buttons */}
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: '1rem' }} />}
              sx={{ 
                bgcolor: '#4ECDC4', 
                '&:hover': { bgcolor: '#3dbdb5' },
                borderRadius: '8px',
                px: 2,
                py: 0.75,
                textTransform: 'none',
                fontSize: '0.85rem',
                height: '36px'
              }}
            >
              New Announcement
            </Button>
            
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: '1rem' }} />}
              sx={{ 
                bgcolor: '#1C392B', 
                '&:hover': { bgcolor: '#152b21' },
                borderRadius: '8px',
                px: 2,
                py: 0.75,
                textTransform: 'none',
                fontSize: '0.85rem',
                height: '36px'
              }}
            >
              New Automation
            </Button>
          </Box>
        </Box>
        
        {/* Tabs Navigation */}
        <Box sx={{ borderBottom: 1, borderColor: '#e0e0e0', mb: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="announcement tabs"
            sx={{
              minHeight: '42px',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '0.85rem',
                fontWeight: 'normal',
                color: '#666',
                minHeight: '42px',
                p: 1,
                '&.Mui-selected': {
                  color: '#4ECDC4',
                  fontWeight: 'medium',
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#4ECDC4',
                height: 3
              }
            }}
          >
            <Tab label="All Announcements" />
            <Tab label="Scheduled Announcements" />
            <Tab label="Automations" />
            <Tab label="Drafts" />
            <Tab label="Analytics/Reports" />
          </Tabs>
        </Box>
        
        {/* All Announcements Tab */}
        {tabValue === 0 && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <TableContainer>
              <Table size="small" aria-label="announcements table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '25%' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '12%' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '20%' }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '15%' }}>Audience</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '15%' }}>Scheduled Time</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '13%' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {announcements.map((announcement) => (
                    <TableRow
                      key={announcement.id}
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { bgcolor: '#f5f5f5' },
                        cursor: 'pointer'
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ color: '#1C392B', fontWeight: 500, py: 1.5, fontSize: '0.875rem' }}>
                        {announcement.title}
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>{getStatusChip(announcement.status)}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>{renderChannels(announcement.channels)}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Chip 
                          label={announcement.audience} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(108, 117, 125, 0.1)',
                            height: '24px',
                            '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1.5, fontSize: '0.875rem' }}>{announcement.scheduledTime}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#56C3C9', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.75,
                              mr: 0.5,
                              width: 30,
                              height: 30,
                              '&:hover': {
                                bgcolor: 'rgba(86, 195, 201, 0.08)',
                              }
                            }}
                          >
                            <EditIcon sx={{ fontSize: '0.85rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#E05050', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.75,
                              mr: 0.5,
                              width: 30,
                              height: 30,
                              '&:hover': {
                                bgcolor: 'rgba(224, 80, 80, 0.08)',
                              }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: '0.85rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#1D3557', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.75,
                              width: 30,
                              height: 30,
                              '&:hover': {
                                bgcolor: 'rgba(29, 53, 87, 0.08)',
                              }
                            }}
                          >
                            <ContentCopyIcon sx={{ fontSize: '0.85rem' }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
        
        {/* Scheduled Announcements Tab - Same styling as All Announcements */}
        {tabValue === 1 && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <TableContainer>
              <Table size="small" aria-label="scheduled announcements table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '25%' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '12%' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '20%' }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '15%' }}>Audience</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '15%' }}>Scheduled Time</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '13%' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {announcements
                    .filter(announcement => announcement.status === 'Scheduled')
                    .map((announcement) => (
                      <TableRow
                        key={announcement.id}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': { bgcolor: '#f5f5f5' },
                          cursor: 'pointer'
                        }}
                      >
                        <TableCell component="th" scope="row" sx={{ color: '#1C392B', fontWeight: 500, py: 1.5, fontSize: '0.875rem' }}>
                          {announcement.title}
                        </TableCell>
                        <TableCell sx={{ py: 1.5 }}>{getStatusChip(announcement.status)}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{renderChannels(announcement.channels)}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Chip 
                            label={announcement.audience} 
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(108, 117, 125, 0.1)',
                              height: '24px',
                              '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.5, fontSize: '0.875rem' }}>{announcement.scheduledTime}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.75,
                                mr: 0.5,
                                width: 30,
                                height: 30,
                                '&:hover': {
                                  bgcolor: 'rgba(86, 195, 201, 0.08)',
                                }
                              }}
                            >
                              <EditIcon sx={{ fontSize: '0.85rem' }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#E05050', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.75,
                                mr: 0.5,
                                width: 30,
                                height: 30,
                                '&:hover': {
                                  bgcolor: 'rgba(224, 80, 80, 0.08)',
                                }
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: '0.85rem' }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#1D3557', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.75,
                                width: 30,
                                height: 30,
                                '&:hover': {
                                  bgcolor: 'rgba(29, 53, 87, 0.08)',
                                }
                              }}
                            >
                              <ContentCopyIcon sx={{ fontSize: '0.85rem' }} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
        
        {/* Automations Tab */}
        {tabValue === 2 && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <TableContainer>
              <Table size="small" aria-label="automations table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '25%' }}>Automation Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '15%' }}>Trigger</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '15%' }}>Audience</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '17%' }}>Channels</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '13%' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '15%' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {automations.map((automation) => (
                    <TableRow
                      key={automation.id}
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { bgcolor: '#f5f5f5' },
                        cursor: 'pointer'
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ color: '#1C392B', fontWeight: 500, py: 1.5, fontSize: '0.875rem' }}>
                        {automation.name}
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Chip 
                          label={automation.trigger} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(29, 53, 87, 0.1)', 
                            color: '#1D3557', 
                            border: '1px solid #1D3557',
                            height: '24px',
                            '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Chip 
                          label={automation.audience} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(108, 117, 125, 0.1)',
                            height: '24px',
                            '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>{renderChannels(automation.channels)}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>{getStatusChip(automation.status)}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#56C3C9', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.75,
                              mr: 0.5,
                              width: 30,
                              height: 30,
                              '&:hover': {
                                bgcolor: 'rgba(86, 195, 201, 0.08)',
                              }
                            }}
                          >
                            <EditIcon sx={{ fontSize: '0.85rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#E05050', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.75,
                              mr: 0.5,
                              width: 30,
                              height: 30,
                              '&:hover': {
                                bgcolor: 'rgba(224, 80, 80, 0.08)',
                              }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: '0.85rem' }} />
                          </IconButton>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ 
                              color: automation.status === 'Active' ? '#E71D36' : '#4ECDC4',
                              borderColor: automation.status === 'Active' ? '#E71D36' : '#4ECDC4',
                              textTransform: 'none',
                              py: 0,
                              px: 1,
                              height: 30,
                              fontSize: '0.75rem',
                              minWidth: 'auto'
                            }}
                          >
                            {automation.status === 'Active' ? 'Pause' : 'Activate'}
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
        
        {/* Drafts Tab */}
        {tabValue === 3 && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <TableContainer>
              <Table size="small" aria-label="drafts table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '25%' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '12%' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '20%' }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '15%' }}>Audience</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '15%' }}>Last Modified</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.5, fontSize: '0.85rem', width: '13%' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {announcements
                    .filter(announcement => announcement.status === 'Draft')
                    .map((announcement) => (
                      <TableRow
                        key={announcement.id}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': { bgcolor: '#f5f5f5' },
                          cursor: 'pointer'
                        }}
                      >
                        <TableCell component="th" scope="row" sx={{ color: '#1C392B', fontWeight: 500, py: 1.5, fontSize: '0.875rem' }}>
                          {announcement.title}
                        </TableCell>
                        <TableCell sx={{ py: 1.5 }}>{getStatusChip(announcement.status)}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>{renderChannels(announcement.channels)}</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Chip 
                            label={announcement.audience} 
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(108, 117, 125, 0.1)',
                              height: '24px',
                              '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.5, fontSize: '0.875rem' }}>Today, 2:30PM</TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.75,
                                mr: 0.5,
                                width: 30,
                                height: 30,
                                '&:hover': {
                                  bgcolor: 'rgba(86, 195, 201, 0.08)',
                                }
                              }}
                            >
                              <EditIcon sx={{ fontSize: '0.85rem' }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#E05050', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.75,
                                mr: 0.5,
                                width: 30,
                                height: 30,
                                '&:hover': {
                                  bgcolor: 'rgba(224, 80, 80, 0.08)',
                                }
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: '0.85rem' }} />
                            </IconButton>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ 
                                color: '#4ECDC4',
                                borderColor: '#4ECDC4',
                                textTransform: 'none',
                                py: 0,
                                px: 1,
                                height: 30,
                                fontSize: '0.75rem',
                                minWidth: 'auto'
                              }}
                            >
                              Schedule
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
        
        {/* Analytics Tab */}
        {tabValue === 4 && (
          <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1C392B', fontWeight: 500 }}>
              Performance Analytics
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
              <Paper sx={{ p: 2, flexGrow: 1, minWidth: '200px', bgcolor: 'rgba(78, 205, 196, 0.1)', border: '1px solid #4ECDC4' }}>
                <Typography variant="subtitle2" sx={{ color: '#4ECDC4', fontWeight: 500 }}>Open Rate</Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1C392B' }}>42.8%</Typography>
                <Typography variant="body2" sx={{ color: '#1C392B' }}>+2.3% from last month</Typography>
              </Paper>
              
              <Paper sx={{ p: 2, flexGrow: 1, minWidth: '200px', bgcolor: 'rgba(29, 53, 87, 0.1)', border: '1px solid #1D3557' }}>
                <Typography variant="subtitle2" sx={{ color: '#1D3557', fontWeight: 500 }}>Click Rate</Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1C392B' }}>12.3%</Typography>
                <Typography variant="body2" sx={{ color: '#1C392B' }}>+0.7% from last month</Typography>
              </Paper>
              
              <Paper sx={{ p: 2, flexGrow: 1, minWidth: '200px', bgcolor: 'rgba(241, 143, 1, 0.1)', border: '1px solid #F18F01' }}>
                <Typography variant="subtitle2" sx={{ color: '#F18F01', fontWeight: 500 }}>Delivery Rate</Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1C392B' }}>98.1%</Typography>
                <Typography variant="body2" sx={{ color: '#1C392B' }}>-0.2% from last month</Typography>
              </Paper>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#1C392B', fontWeight: 500, mt: 3 }}>
              Best Performing Messages
            </Typography>
            
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444' }}>Message</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444' }}>Open Rate</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444' }}>Click Rate</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444' }}>Engagement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Spring Promo Launch</TableCell>
                    <TableCell>52.4%</TableCell>
                    <TableCell>18.2%</TableCell>
                    <TableCell>High</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>New Feature Announcement</TableCell>
                    <TableCell>48.7%</TableCell>
                    <TableCell>15.3%</TableCell>
                    <TableCell>Medium</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Summer Sale Preview</TableCell>
                    <TableCell>45.2%</TableCell>
                    <TableCell>12.8%</TableCell>
                    <TableCell>Medium</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#1C392B', fontWeight: 500, mt: 4 }}>
              Automation Performance
            </Typography>
            
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444' }}>Automation</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444' }}>Success Rate</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444' }}>Trigger Events</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444' }}>Completion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>New User Welcome</TableCell>
                    <TableCell>92.5%</TableCell>
                    <TableCell>124</TableCell>
                    <TableCell>High</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Birthday Discount</TableCell>
                    <TableCell>84.2%</TableCell>
                    <TableCell>67</TableCell>
                    <TableCell>Medium</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Abandoned Cart Reminder</TableCell>
                    <TableCell>76.8%</TableCell>
                    <TableCell>98</TableCell>
                    <TableCell>Medium</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </AdminLayout>
  );
};

export default TrialPage; 