import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Divider, 
  IconButton, 
  Button,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { 
  Reply as ReplyIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useMessages } from '../../context/MessageContext';
import { useAuth } from '../../context/AuthContext';

const MessageDetail = ({ messageId, onClose, onReply }) => {
  const { 
    selectedMessage, 
    loading, 
    error, 
    fetchMessage, 
    deleteMessage, 
    markAsRead, 
    setSelectedMessage 
  } = useMessages();
  const { user } = useAuth();

  // Fetch message details when messageId changes
  useEffect(() => {
    if (messageId) {
      fetchMessage(messageId);
    } else {
      setSelectedMessage(null);
    }
  }, [messageId]);

  // Mark message as read
  useEffect(() => {
    if (
      selectedMessage && 
      !selectedMessage.read && 
      user && 
      selectedMessage.recipient && 
      selectedMessage.recipient._id === user._id
    ) {
      markAsRead(selectedMessage._id);
    }
  }, [selectedMessage]);

  // Handle delete message
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const success = await deleteMessage(selectedMessage._id);
      if (success) {
        onClose();
      }
    }
  };

  // Format the timestamp
  const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    return format(new Date(timestamp), 'MMMM d, yyyy h:mm a');
  };

  // Get user details
  const getSenderInfo = () => {
    if (!selectedMessage || !selectedMessage.sender) {
      return { name: 'Unknown', avatar: '?' };
    }
    
    const sender = selectedMessage.sender;
    const name = sender.companyName || 
      `${sender.firstName || ''} ${sender.lastName || ''}`.trim() || 
      sender.username;
    
    const avatar = name.charAt(0).toUpperCase();
    
    return { name, avatar };
  };
  
  const getRecipientInfo = () => {
    if (!selectedMessage || !selectedMessage.recipient) {
      return { name: 'Unknown', avatar: '?' };
    }
    
    const recipient = selectedMessage.recipient;
    const name = recipient.companyName || 
      `${recipient.firstName || ''} ${recipient.lastName || ''}`.trim() || 
      recipient.username;
    
    const avatar = name.charAt(0).toUpperCase();
    
    return { name, avatar };
  };

  // Check if user is the sender
  const isUserSender = () => {
    return user && 
      selectedMessage && 
      selectedMessage.sender && 
      selectedMessage.sender._id === user._id;
  };

  if (!messageId) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Select a message to view its details
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Message header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)' 
      }}>
        <Typography variant="h6" sx={{ color: '#185B5F' }}>
          Message Details
        </Typography>
        <Box>
          {selectedMessage && (
            <>
              <Tooltip title="Reply">
                <IconButton 
                  color="primary" 
                  onClick={() => onReply(selectedMessage)}
                  disabled={loading || !selectedMessage}
                >
                  <ReplyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton 
                  color="error" 
                  onClick={handleDelete}
                  disabled={loading || !selectedMessage}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Close">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Message content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 2 }}>
            {error}
          </Typography>
        ) : selectedMessage ? (
          <>
            {/* Message metadata */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              p: 2,
              bgcolor: 'rgba(24, 91, 95, 0.05)',
            }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {selectedMessage.subject || '(No Subject)'}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
                  From:
                </Typography>
                <Avatar 
                  sx={{ width: 24, height: 24, mr: 1, bgcolor: '#185B5F', fontSize: '0.8rem' }}
                >
                  {getSenderInfo().avatar}
                </Avatar>
                <Typography variant="body2">
                  {getSenderInfo().name}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
                  To:
                </Typography>
                <Avatar 
                  sx={{ width: 24, height: 24, mr: 1, bgcolor: '#185B5F', fontSize: '0.8rem' }}
                >
                  {getRecipientInfo().avatar}
                </Avatar>
                <Typography variant="body2">
                  {getRecipientInfo().name}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                {formatMessageTime(selectedMessage.timestamp)}
              </Typography>
            </Box>
            
            <Divider />
            
            {/* Message body */}
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {selectedMessage.content}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            Message not found
          </Typography>
        )}
      </Box>

      {/* Action buttons */}
      {selectedMessage && (
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Button
            variant="outlined"
            startIcon={<ReplyIcon />}
            onClick={() => onReply(selectedMessage)}
            sx={{ mr: 1 }}
          >
            Reply
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default MessageDetail; 