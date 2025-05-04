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
  Check as CheckIcon
} from '@mui/icons-material';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';

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
      return <PersonIcon sx={{ color: '#fff' }} />;
    case 'contract':
      return <DescriptionIcon sx={{ color: '#fff' }} />;
    case 'meeting':
      return <EventIcon sx={{ color: '#fff' }} />;
    case 'team':
      return <BusinessIcon sx={{ color: '#fff' }} />;
    default:
      return <PersonIcon sx={{ color: '#fff' }} />;
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
        top: 64, // Position right below the header
        right: 250, // Position to the left of the profile dropdown (giving enough space)
        width: 350, // Slimmer to match reference
        maxHeight: 500,
        boxShadow: '0px 3px 10px rgba(0,0,0,0.08)',
        borderRadius: 1,
        overflow: 'hidden',
        zIndex: 9999,
        border: '1px solid #eaeaea'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1.5,
          borderBottom: '1px solid #eaeaea',
          bgcolor: '#FFFFFF'
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>
            Notifications
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Stay Updated with Your Latest Notifications
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      {/* Filter Tabs */}
      <Box sx={{ display: 'flex', borderBottom: '1px solid #eaeaea', px: 1.5, py: 0.5 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            mr: 1.5,
            fontWeight: 600,
            color: '#333',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -5,
              left: 0,
              width: '100%',
              height: 2,
              backgroundColor: '#1C392B'
            }
          }}
        >
          All
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Unread ({unreadCount})
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="text"
          size="small"
          onClick={handleMarkAllAsRead}
          sx={{ 
            textTransform: 'none',
            fontSize: '0.75rem',
            color: '#1C392B',
            p: 0
          }}
        >
          Mark all as read
        </Button>
      </Box>
      
      {/* Notifications List */}
      <Box 
        sx={{ 
          maxHeight: 400, 
          overflow: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0,0,0,0.1) rgba(0,0,0,0.03)',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.03)',
          },
        }}
      >
        {Object.entries(groupedNotifications).map(([date, items]) => (
          <Box key={date}>
            <Typography variant="caption" sx={{ display: 'block', p: 1, bgcolor: '#f5f5f5', fontWeight: 500, color: '#555' }}>
              {date}
            </Typography>
            {items.map((notification) => (
              <Box 
                key={notification.id}
                sx={{ 
                  p: 1.5, 
                  borderBottom: '1px solid #f0f0f0',
                  position: 'relative',
                  display: 'flex',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.01)' },
                }}
              >
                {/* Avatar */}
                <Box sx={{ mr: 1.5 }}>
                  <Avatar 
                    sx={{ 
                      width: 36,
                      height: 36,
                      backgroundColor: 
                        notification.type === 'meeting' ? '#2196f3' : 
                        notification.type === 'contract' ? '#009688' :
                        notification.type === 'leave' ? '#ff9800' : 
                        '#673ab7'
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </Box>
                
                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#333', 
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      mb: 0.5
                    }}
                  >
                    {notification.user} {notification.action} {notification.target}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#666',
                      fontSize: '0.75rem' 
                    }}
                  >
                    {notification.date} · {notification.time}
                  </Typography>
                </Box>
                
                {/* Unread indicator */}
                {!notification.read && (
                  <Box 
                    sx={{ 
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#f44336',
                      alignSelf: 'center',
                      ml: 1
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default NotificationsPopup; 