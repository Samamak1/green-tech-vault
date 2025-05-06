import React, { useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Typography, 
  Divider, 
  Badge,
  IconButton,
  Chip,
  Pagination,
  Paper,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import { 
  Email as EmailIcon,
  Delete as DeleteIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useMessages } from '../../context/MessageContext';
import { useAuth } from '../../context/AuthContext';

const MessageList = ({ onSelectMessage }) => {
  const { 
    messages, 
    loading, 
    error, 
    messageType, 
    pagination, 
    fetchMessages, 
    deleteMessage 
  } = useMessages();
  const { user } = useAuth();

  // Handle message type change (sent or received)
  const handleTypeChange = (event, newType) => {
    fetchMessages(newType);
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    fetchMessages(messageType, value);
  };

  // Handle delete message
  const handleDeleteMessage = async (e, messageId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this message?')) {
      await deleteMessage(messageId);
    }
  };

  // Format the timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return format(new Date(timestamp), 'MMM d, yyyy h:mm a');
  };

  // Get the other party in the conversation
  const getOtherParty = (message) => {
    if (!message || !user) return { name: 'Unknown', avatar: '' };
    
    const isSender = message.sender?._id === user._id;
    const otherParty = isSender ? message.recipient : message.sender;
    
    if (!otherParty) return { name: 'Unknown', avatar: '' };
    
    // Determine name to display based on what's available
    const name = otherParty.companyName || `${otherParty.firstName || ''} ${otherParty.lastName || ''}`.trim() || otherParty.username;
    
    // Get avatar - first letter of name or username
    const avatar = name.charAt(0).toUpperCase();
    
    return { name, avatar };
  };

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Message type tabs */}
      <Tabs
        value={messageType}
        onChange={handleTypeChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab value="received" label="Inbox" />
        <Tab value="sent" label="Sent" />
      </Tabs>

      {/* Messages list */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 2 }}>
            {error}
          </Typography>
        ) : messages.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            {messageType === 'received' 
              ? 'No messages in your inbox' 
              : 'No sent messages'}
          </Typography>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {messages.map((message) => {
              const { name, avatar } = getOtherParty(message);
              
              return (
                <React.Fragment key={message._id}>
                  <ListItem 
                    alignItems="flex-start" 
                    sx={{ 
                      cursor: 'pointer',
                      bgcolor: !message.read && messageType === 'received' ? 'rgba(24, 91, 95, 0.05)' : 'transparent',
                      '&:hover': {
                        bgcolor: 'rgba(24, 91, 95, 0.1)',
                      },
                    }}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={(e) => handleDeleteMessage(e, message._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    onClick={() => onSelectMessage(message._id)}
                  >
                    <ListItemAvatar>
                      <Badge
                        color="primary"
                        variant="dot"
                        invisible={message.read || messageType === 'sent'}
                      >
                        <Avatar sx={{ bgcolor: '#185B5F' }}>
                          {avatar}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: !message.read && messageType === 'received' ? 'bold' : 'normal',
                              color: '#185B5F'
                            }}
                          >
                            {name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatTime(message.timestamp)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ 
                              fontWeight: !message.read && messageType === 'received' ? 'bold' : 'normal',
                              display: 'block' 
                            }}
                          >
                            {message.subject || '(No Subject)'}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {message.content}
                          </Typography>
                          <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                            {messageType === 'sent' && (
                              <Chip 
                                size="small" 
                                label={message.read ? "Read" : "Unread"} 
                                color={message.read ? "success" : "default"}
                                sx={{ mr: 1 }}
                              />
                            )}
                            <ArrowForwardIcon fontSize="small" color="action" sx={{ ml: 'auto' }} />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              );
            })}
          </List>
        )}
      </Box>

      {/* Pagination */}
      {!loading && messages.length > 0 && pagination.pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Pagination 
            count={pagination.pages} 
            page={pagination.page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
    </Paper>
  );
};

export default MessageList; 