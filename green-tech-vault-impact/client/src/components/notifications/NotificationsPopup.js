import React, { useState } from 'react';
import {
  Box,
  Typography,
  Popover,
  IconButton,
  Divider,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Badge,
  Tab,
  Tabs,
  Button,
  CircularProgress
} from '@mui/material';
import { 
  Close as CloseIcon,
  CalendarMonth as CalendarIcon, 
  WorkOutline as WorkIcon,
  Person as PersonIcon,
  FiberManualRecord as DotIcon 
} from '@mui/icons-material';
import { useNotifications } from '../../context/NotificationsContext';

const NotificationsPopup = ({ anchorEl, open, onClose }) => {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationClick = (notificationId) => {
    markAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  // Function to get the icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'meeting':
        return <CalendarIcon style={{ color: '#4ECDC4' }} />;
      case 'contract':
        return <WorkIcon style={{ color: '#4ECDC4' }} />;
      case 'team':
        return <PersonIcon style={{ color: '#4ECDC4' }} />;
      default:
        return <PersonIcon style={{ color: '#4ECDC4' }} />;
    }
  };

  // Filter notifications based on the selected tab
  const filteredNotifications = tabValue === 0 
    ? notifications 
    : notifications.filter(notif => !notif.isRead);

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: 400,
          maxHeight: 480,
          borderRadius: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          overflow: 'hidden'
        }
      }}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        px: 2, 
        py: 1.5, 
        bgcolor: '#fff'
      }}>
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 500 }}>
          Notifications
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ p: 0.5 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ px: 2, pb: 1.5 }}>
        Stay Updated with Your Latest Notifications
      </Typography>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ minHeight: 36 }}
        >
          <Tab 
            label="All" 
            sx={{ 
              textTransform: 'none', 
              fontSize: '0.85rem', 
              fontWeight: 400,
              py: 0.5,
              minHeight: 36
            }} 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="span" sx={{ fontSize: '0.85rem' }}>
                  Unread
                </Typography>
                {unreadCount > 0 && (
                  <Typography 
                    component="span" 
                    sx={{ 
                      ml: 0.5, 
                      fontSize: '0.75rem', 
                      color: 'text.secondary',
                      display: 'inline-flex'
                    }}
                  >
                    ({unreadCount})
                  </Typography>
                )}
              </Box>
            } 
            sx={{ 
              textTransform: 'none', 
              fontWeight: 400,
              py: 0.5,
              minHeight: 36
            }} 
          />
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-end',
              px: 1,
              flexGrow: 1
            }}
          >
            <Button 
              size="small" 
              onClick={handleMarkAllAsRead}
              sx={{ 
                fontSize: '0.75rem', 
                textTransform: 'none',
                textDecoration: 'none',
                color: '#4ECDC4',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              Mark all as read
            </Button>
          </Box>
        </Tabs>
      </Box>
      
      {/* Notification List */}
      <Box sx={{ overflow: 'auto', maxHeight: 350 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : filteredNotifications.length === 0 ? (
          <Box sx={{ py: 3, px: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">No notifications to display</Typography>
          </Box>
        ) : (
          <>
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontSize: '0.8rem', color: 'text.secondary' }}>
              Today
            </Typography>
            <List sx={{ p: 0 }}>
              {filteredNotifications.slice(0, 4).map((notification) => (
                <ListItem 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  sx={{ 
                    px: 2,
                    py: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#f5f5f5' },
                    position: 'relative'
                  }}
                >
                  {!notification.isRead && (
                    <DotIcon 
                      sx={{ 
                        position: 'absolute',
                        left: 0,
                        fontSize: 12,
                        color: '#e74c3c' 
                      }} 
                    />
                  )}
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar sx={{ bgcolor: '#f0f0f0', width: 32, height: 32 }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: notification.isRead ? 400 : 500,
                          fontSize: '0.85rem',
                          lineHeight: 1.4,
                          mb: 0.5
                        }}
                      >
                        {notification.sender} {notification.action}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: '0.75rem'
                        }}
                      >
                        {notification.timestamp} • {notification.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontSize: '0.8rem', color: 'text.secondary' }}>
              Tomorrow
            </Typography>
            <List sx={{ p: 0 }}>
              {filteredNotifications.slice(4, 5).map((notification) => (
                <ListItem 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  sx={{ 
                    px: 2,
                    py: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#f5f5f5' },
                    position: 'relative'
                  }}
                >
                  {!notification.isRead && (
                    <DotIcon 
                      sx={{ 
                        position: 'absolute',
                        left: 0,
                        fontSize: 12,
                        color: '#e74c3c' 
                      }} 
                    />
                  )}
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar sx={{ bgcolor: '#f0f0f0', width: 32, height: 32 }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: notification.isRead ? 400 : 500,
                          fontSize: '0.85rem',
                          lineHeight: 1.4,
                          mb: 0.5
                        }}
                      >
                        {notification.sender} {notification.action}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: '0.75rem'
                        }}
                      >
                        {notification.timestamp} • {notification.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Popover>
  );
};

export default NotificationsPopup; 