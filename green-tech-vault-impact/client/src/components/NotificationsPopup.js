import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Divider,
  Avatar,
  Badge,
  Button
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Event as EventIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Check as CheckIcon
} from '@mui/icons-material';

const mockNotifications = [
  {
    id: 1,
    type: 'leave',
    user: 'John Doe',
    userAvatar: null, // Will use initials
    action: 'has submitted a leave request for',
    target: 'July 25-27, 2024',
    date: 'July 18, 2024',
    time: '08:00 PM',
    read: false
  },
  {
    id: 2,
    type: 'contract',
    user: 'Michael Brown',
    userAvatar: null,
    action: 'contract is up for renewal on',
    target: 'July 21, 2024',
    date: 'July 18, 2024',
    time: '05:15 PM',
    read: false
  },
  {
    id: 3,
    type: 'meeting',
    user: 'Emily Davis',
    userAvatar: null,
    action: 'has set up a meeting for',
    target: 'July 20, 2024, at 3:00 PM',
    date: 'July 18, 2024',
    time: '03:45 PM',
    read: false
  },
  {
    id: 4,
    type: 'meeting',
    user: 'Matthew Martinez',
    userAvatar: null,
    action: 'has scheduled a meeting for',
    target: 'July 23, 2024',
    date: 'July 18, 2024',
    time: '11:30 AM',
    read: false
  },
  {
    id: 5,
    type: 'contract',
    user: 'Nefer Harris',
    userAvatar: null,
    action: 'contract renewal is up for review on',
    target: 'November 5, 2024',
    date: 'July 18, 2024',
    time: '10:00 AM',
    read: false
  },
  {
    id: 6,
    type: 'team',
    user: 'Anthony White',
    userAvatar: null,
    action: 'has been added to the team as of',
    target: 'today',
    date: 'July 19, 2024',
    time: '04:30 PM',
    read: false
  },
  {
    id: 7,
    type: 'contract',
    user: 'Sarah Johnson',
    userAvatar: null,
    action: 'contract renewal has been submitted for',
    target: 'review',
    date: 'July 19, 2024',
    time: '02:15 PM',
    read: false
  }
];

// Function to get appropriate icon for notification type
const getNotificationIcon = (type) => {
  switch(type) {
    case 'leave':
      return <PersonIcon />;
    case 'contract':
      return <DescriptionIcon />;
    case 'meeting':
      return <EventIcon />;
    case 'team':
      return <BusinessIcon />;
    default:
      return <PersonIcon />;
  }
};

// Function to get avatar colors based on user name
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const NotificationsPopup = ({ open, anchorEl, onClose }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  
  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Group notifications by date
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  const groupedNotifications = {
    'Today': notifications.filter(n => n.date === 'July 18, 2024'),
    'Tomorrow': notifications.filter(n => n.date === 'July 19, 2024')
  };
  
  if (!open) return null;
  
  return (
    <Paper
      sx={{
        position: 'absolute',
        top: anchorEl ? anchorEl.getBoundingClientRect().bottom + 5 : 0,
        left: anchorEl ? anchorEl.getBoundingClientRect().left - 450 : 0, // Position to the left of the dropdown
        width: 500,
        maxHeight: 600,
        boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
        zIndex: 9999
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #eee'
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stay Updated with Your Latest Notifications
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" sx={{ mr: 1 }} onClick={onClose}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      {/* Filter Tabs */}
      <Box sx={{ display: 'flex', borderBottom: '1px solid #eee', px: 2, py: 1 }}>
        <Button variant="text" sx={{ mr: 1, textTransform: 'none', fontWeight: 600, color: '#333' }}>
          All
        </Button>
        <Button 
          variant="text" 
          sx={{ mr: 1, textTransform: 'none', color: '#666' }}
          endIcon={<Badge color="error" badgeContent={unreadCount} sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }} />}
        >
          Unread ({unreadCount})
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="text"
          size="small"
          startIcon={<CheckIcon fontSize="small" />}
          onClick={handleMarkAllAsRead}
          sx={{ 
            textTransform: 'none',
            fontSize: '0.8rem',
            color: '#4caf50'
          }}
        >
          Mark all as read
        </Button>
      </Box>
      
      {/* Notifications List */}
      <Box sx={{ maxHeight: 450, overflow: 'auto' }}>
        {Object.entries(groupedNotifications).map(([date, items]) => (
          <Box key={date}>
            <Typography variant="subtitle2" sx={{ p: 1.5, bgcolor: '#f9f9f9', fontWeight: 500 }}>
              {date}
            </Typography>
            <List sx={{ py: 0 }}>
              {items.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem 
                    alignItems="flex-start" 
                    sx={{ 
                      py: 1.5, 
                      position: 'relative',
                      bgcolor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.02)' },
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {/* Unread indicator */}
                    {!notification.read && (
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          right: 12, 
                          top: '50%', 
                          transform: 'translateY(-50%)',
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: '#f44336'
                        }} 
                      />
                    )}
                    <ListItemAvatar>
                      {notification.type === 'user' ? (
                        <Avatar 
                          alt={notification.user} 
                          src={notification.userAvatar}
                          sx={{ 
                            bgcolor: stringToColor(notification.user),
                            width: 40,
                            height: 40
                          }}
                        >
                          {notification.user.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                      ) : (
                        <Avatar 
                          sx={{ 
                            bgcolor: 
                              notification.type === 'meeting' ? '#2196f3' : 
                              notification.type === 'contract' ? '#009688' :
                              notification.type === 'leave' ? '#ff9800' : 
                              notification.type === 'team' ? '#673ab7' : '#e91e63',
                            width: 40,
                            height: 40
                          }}
                        >
                          {getNotificationIcon(notification.type)}
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box component="span" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                          {notification.user} {notification.action} {notification.target}
                        </Box>
                      }
                      secondary={
                        <Typography
                          sx={{ display: 'block', fontSize: '0.8rem', color: '#757575', mt: 0.5 }}
                          component="span"
                        >
                          {notification.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default NotificationsPopup; 