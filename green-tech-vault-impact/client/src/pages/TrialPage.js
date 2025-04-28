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
  Chip,
  Checkbox,
  Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AdminLayout from '../components/layout/AdminLayout';

const TrialPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedMessages, setCheckedMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: 'Spring Promo Launch',
      status: 'Scheduled',
      channels: ['email', 'push'],
      audience: 'All Clients',
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
      audience: 'VIP Clients',
      scheduledTime: 'May 15, 9AM'
    },
    {
      id: 5,
      title: 'Holiday Closure Notice',
      status: 'Failed',
      channels: ['email', 'push'],
      audience: 'All Clients',
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

  // Mock data for inbox messages (client view)
  const inboxMessages = [
    {
      id: 1,
      title: 'Monthly Challenge!',
      sender: 'GTV Admin',
      preview: 'Hello Zworpers! A big welcome from the GTV team to our first Monthly challenge! Here is how you get...',
      date: 'March 27th, 2025, 7:56pm',
      read: false
    },
    {
      id: 2,
      title: 'Event',
      sender: 'GTV Admin, Usernames',
      preview: 'Join us at GTV\'s first hosted event. There will be educational booths, food,',
      date: 'March 27th, 2025, 7:56pm',
      read: true
    },
    {
      id: 3,
      title: 'Come Join Us!',
      sender: 'GTV Admin, usernames',
      preview: 'Green Tech Vault will be speaking at a confrence in Columbus 07/03/2026. Come listen and learn about the...',
      date: 'March 27th, 2025, 7:56pm',
      read: false
    },
    {
      id: 4,
      title: 'Title',
      sender: 'Participants',
      preview: 'This will be the first sentence of the message/announcement, once it gets to long it will be followed with a ...',
      date: 'March 27th, 2025, 7:56pm',
      read: true
    },
    {
      id: 5,
      title: 'Title',
      sender: 'Participants',
      preview: 'This will be the first sentence of the message/announcement, once it gets to long it will be followed with a ...',
      date: 'March 27th, 2025, 7:56pm',
      read: true
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle checkbox selection for client view messages
  const handleCheckMessage = (messageId) => {
    setCheckedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId) 
        : [...prev, messageId]
    );
  };

  // Handle star toggling for client view messages
  const handleStarMessage = (messageId) => {
    setStarredMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId) 
        : [...prev, messageId]
    );
  };

  // Function to render channel icons
  const renderChannels = (channels) => {
    return (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {channels.includes('email') && (
          <IconButton 
            size="small"
            sx={{ 
              p: 0.5,
              color: '#4ECDC4'
            }}
          >
            <EmailIcon fontSize="small" />
          </IconButton>
        )}
        {channels.includes('sms') && (
          <IconButton 
            size="small"
            sx={{ 
              p: 0.5,
              color: '#4ECDC4'
            }}
          >
            <SmsIcon fontSize="small" />
          </IconButton>
        )}
        {channels.includes('push') && (
          <IconButton 
            size="small"
            sx={{ 
              p: 0.5,
              color: '#4ECDC4'
            }}
          >
            <NotificationsIcon fontSize="small" />
          </IconButton>
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
          height: '22px',
          '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }
        }}
      />
    );
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 1.5 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
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
                placeholder="Search here"
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
        <Box sx={{ borderBottom: 1, borderColor: '#e0e0e0', mb: 1.5 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="announcement tabs"
            sx={{
              minHeight: '40px',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '0.85rem',
                fontWeight: 'normal',
                color: '#666',
                minHeight: '40px',
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
            <Tab label="Client View" />
            <Tab label="All Announcements" />
            <Tab label="Scheduled Announcements" />
            <Tab label="Automations" />
            <Tab label="Drafts" />
            <Tab label="Analytics/Reports" />
          </Tabs>
        </Box>
        
        {/* Client View Tab */}
        {tabValue === 0 && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            {inboxMessages.map((message, index) => (
              <Box 
                key={message.id} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  py: 1.25,
                  px: 2,
                  borderBottom: index < inboxMessages.length - 1 ? '1px solid #f0f0f0' : 'none',
                  bgcolor: message.read ? 'transparent' : 'rgba(78, 205, 196, 0.05)',
                  '&:hover': { bgcolor: '#f9f9f9' },
                  cursor: 'pointer'
                }}
              >
                <Checkbox 
                  size="small" 
                  sx={{ p: 0.5, mr: 1 }}
                  checked={checkedMessages.includes(message.id)}
                  onChange={() => handleCheckMessage(message.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                
                <IconButton 
                  size="small" 
                  sx={{ p: 0.5, mr: 1, color: starredMessages.includes(message.id) ? '#F2C94C' : '#C4C4C4' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStarMessage(message.id);
                  }}
                >
                  {starredMessages.includes(message.id) ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                </IconButton>
                
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    bgcolor: '#eee', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2,
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src="/path/to/image-placeholder.jpg" 
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZWVlIi8+PC9zdmc+';
                    }}
                  />
                </Box>
                
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 0.5 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: message.read ? 'normal' : 'bold', 
                        color: '#000',
                        mr: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {message.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#777',
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {message.sender}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: '0.8rem'
                    }}
                  >
                    {message.preview}
                  </Typography>
                </Box>
                
                <Box sx={{ ml: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Box 
                    sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: '50%', 
                      bgcolor: message.read ? 'transparent' : '#E76F51',
                      mb: 0.5,
                      mr: 0.5
                    }} 
                  />
                  
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontSize: '0.7rem', 
                      color: '#666',
                      mb: 0.5,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Sent on:
                  </Typography>
                  
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontSize: '0.7rem', 
                      color: '#666',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {message.date}
                  </Typography>
                  
                  <IconButton 
                    size="small" 
                    sx={{ p: 0.5, mt: 0.5 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertIcon sx={{ fontSize: '1rem', color: '#999' }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Paper>
        )}
        
        {/* All Announcements Tab */}
        {tabValue === 1 && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <TableContainer>
              <Table size="small" aria-label="announcements table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '23%' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '10%' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '15%' }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '12%' }}>Audience</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '15%' }}>Scheduled Time</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '18%' }}>Actions</TableCell>
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
                      <TableCell component="th" scope="row" sx={{ color: '#1C392B', fontWeight: 500, py: 1.25, fontSize: '0.8rem' }}>
                        {announcement.title}
                      </TableCell>
                      <TableCell sx={{ py: 1.25 }}>{getStatusChip(announcement.status)}</TableCell>
                      <TableCell sx={{ py: 1.25 }}>{renderChannels(announcement.channels)}</TableCell>
                      <TableCell sx={{ py: 1.25 }}>
                        <Chip 
                          label={announcement.audience} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(108, 117, 125, 0.1)',
                            height: '22px',
                            '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1.25, fontSize: '0.8rem' }}>{announcement.scheduledTime}</TableCell>
                      <TableCell sx={{ py: 1.25 }}>
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-start', ml: 1 }}>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#56C3C9', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.5,
                              mr: 0.5,
                              width: 28,
                              height: 28,
                              '&:hover': {
                                bgcolor: 'rgba(86, 195, 201, 0.08)',
                              }
                            }}
                          >
                            <EditIcon sx={{ fontSize: '0.8rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#E05050', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.5,
                              mr: 0.5,
                              width: 28,
                              height: 28,
                              '&:hover': {
                                bgcolor: 'rgba(224, 80, 80, 0.08)',
                              }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: '0.8rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#1D3557', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.5,
                              width: 28,
                              height: 28,
                              '&:hover': {
                                bgcolor: 'rgba(29, 53, 87, 0.08)',
                              }
                            }}
                          >
                            <ContentCopyIcon sx={{ fontSize: '0.8rem' }} />
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
        
        {/* Scheduled Announcements Tab */}
        {tabValue === 2 && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <TableContainer>
              <Table size="small" aria-label="scheduled announcements table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '23%' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '10%' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '15%' }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '12%' }}>Audience</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '15%' }}>Scheduled Time</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '18%' }}>Actions</TableCell>
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
                        <TableCell component="th" scope="row" sx={{ color: '#1C392B', fontWeight: 500, py: 1.25, fontSize: '0.8rem' }}>
                          {announcement.title}
                        </TableCell>
                        <TableCell sx={{ py: 1.25 }}>{getStatusChip(announcement.status)}</TableCell>
                        <TableCell sx={{ py: 1.25 }}>{renderChannels(announcement.channels)}</TableCell>
                        <TableCell sx={{ py: 1.25 }}>
                          <Chip 
                            label={announcement.audience} 
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(108, 117, 125, 0.1)',
                              height: '22px',
                              '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.25, fontSize: '0.8rem' }}>{announcement.scheduledTime}</TableCell>
                        <TableCell sx={{ py: 1.25 }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-start', ml: 1 }}>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.5,
                                mr: 0.5,
                                width: 28,
                                height: 28,
                                '&:hover': {
                                  bgcolor: 'rgba(86, 195, 201, 0.08)',
                                }
                              }}
                            >
                              <EditIcon sx={{ fontSize: '0.8rem' }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#E05050', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.5,
                                mr: 0.5,
                                width: 28,
                                height: 28,
                                '&:hover': {
                                  bgcolor: 'rgba(224, 80, 80, 0.08)',
                                }
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: '0.8rem' }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#1D3557', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.5,
                                width: 28,
                                height: 28,
                                '&:hover': {
                                  bgcolor: 'rgba(29, 53, 87, 0.08)',
                                }
                              }}
                            >
                              <ContentCopyIcon sx={{ fontSize: '0.8rem' }} />
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
        {tabValue === 3 && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <TableContainer>
              <Table size="small" aria-label="automations table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '23%' }}>Automation Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '12%' }}>Trigger</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '12%' }}>Audience</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '15%' }}>Channels</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '12%' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '18%' }}>Actions</TableCell>
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
                      <TableCell component="th" scope="row" sx={{ color: '#1C392B', fontWeight: 500, py: 1.25, fontSize: '0.8rem' }}>
                        {automation.name}
                      </TableCell>
                      <TableCell sx={{ py: 1.25 }}>
                        <Chip 
                          label={automation.trigger} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(29, 53, 87, 0.1)', 
                            color: '#1D3557', 
                            border: '1px solid #1D3557',
                            height: '22px',
                            '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1.25 }}>
                        <Chip 
                          label={automation.audience} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(108, 117, 125, 0.1)',
                            height: '22px',
                            '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1.25 }}>{renderChannels(automation.channels)}</TableCell>
                      <TableCell sx={{ py: 1.25 }}>{getStatusChip(automation.status)}</TableCell>
                      <TableCell sx={{ py: 1.25 }}>
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-start', ml: 1 }}>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#56C3C9', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.5,
                              mr: 0.5,
                              width: 28,
                              height: 28,
                              '&:hover': {
                                bgcolor: 'rgba(86, 195, 201, 0.08)',
                              }
                            }}
                          >
                            <EditIcon sx={{ fontSize: '0.8rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ 
                              color: '#E05050', 
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.5,
                              mr: 0.5,
                              width: 28,
                              height: 28,
                              '&:hover': {
                                bgcolor: 'rgba(224, 80, 80, 0.08)',
                              }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: '0.8rem' }} />
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
                              height: 28,
                              fontSize: '0.7rem',
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
        {tabValue === 4 && (
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <TableContainer>
              <Table size="small" aria-label="drafts table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '23%' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '10%' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '15%' }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '12%' }}>Audience</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '15%' }}>Last Modified</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#444', py: 1.25, fontSize: '0.8rem', width: '18%' }}>Actions</TableCell>
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
                        <TableCell component="th" scope="row" sx={{ color: '#1C392B', fontWeight: 500, py: 1.25, fontSize: '0.8rem' }}>
                          {announcement.title}
                        </TableCell>
                        <TableCell sx={{ py: 1.25 }}>{getStatusChip(announcement.status)}</TableCell>
                        <TableCell sx={{ py: 1.25 }}>{renderChannels(announcement.channels)}</TableCell>
                        <TableCell sx={{ py: 1.25 }}>
                          <Chip 
                            label={announcement.audience} 
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(108, 117, 125, 0.1)',
                              height: '22px',
                              '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.25, fontSize: '0.8rem' }}>Today, 2:30PM</TableCell>
                        <TableCell sx={{ py: 1.25 }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-start', ml: 1 }}>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#56C3C9', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.5,
                                mr: 0.5,
                                width: 28,
                                height: 28,
                                '&:hover': {
                                  bgcolor: 'rgba(86, 195, 201, 0.08)',
                                }
                              }}
                            >
                              <EditIcon sx={{ fontSize: '0.8rem' }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ 
                                color: '#E05050', 
                                border: '1px solid #e0e0e0',
                                borderRadius: '50%',
                                p: 0.5,
                                mr: 0.5,
                                width: 28,
                                height: 28,
                                '&:hover': {
                                  bgcolor: 'rgba(224, 80, 80, 0.08)',
                                }
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: '0.8rem' }} />
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
                                height: 28,
                                fontSize: '0.7rem',
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
        {tabValue === 5 && (
          <Paper sx={{ p: 2.5, borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
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