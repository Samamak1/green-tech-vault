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
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  ListItemText
} from '@mui/material';
import { 
  Search as SearchIcon,
  KeyboardArrowDown as DropdownIcon,
  Delete as DeleteIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Send as SendIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Close as CloseIcon,
  Create as PencilIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const ClientMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [composeOpen, setComposeOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [composeData, setComposeData] = useState({
    subject: '',
    message: ''
  });
  const { user } = useAuth();

  // Mock data for messages
  useEffect(() => {
    // This would be replaced by an API call in a real app
    const mockMessages = [
      {
        id: '1',
        type: 'question',
        read: false,
        starred: false,
        sender: {
          id: 'jsmith01',
          name: '@jsmith01',
          company: 'Green Tech Vault',
          avatar: null
        },
        timestamp: 'March 27, 2025 at 10:50pm',
        subject: 'Questions About my Pickup',
        message: `Dear Green Tech Vault Team,\n\nI wanted to upgrade my pickup since our company has added to the number of devices we want to recycle. I was wondering who I should speak with, and if you could provide me with their contact information.\n\nI look forward to my first GTV Pickup!\n\nThanks,\nJohn Smith`,
        thread: [
          {
            id: '1-1',
            sender: {
              id: 'jsmith01',
              name: '@jsmith01',
              company: 'Green Tech Vault',
              avatar: null
            },
            timestamp: 'March 27, 2025 at 10:50pm',
            message: `Dear Green Tech Vault Team,\n\nI wanted to upgrade my pickup since our company has added to the number of devices we want to recycle. I was wondering who I should speak with, and if you could provide me with their contact information.\n\nI look forward to my first GTV Pickup!\n\nThanks,\nJohn Smith`
          }
        ]
      },
      {
        id: '2',
        type: 'confirmation',
        read: true,
        starred: false,
        sender: {
          id: 'jadmin01',
          name: 'GTV Admin',
          company: 'Green Tech Vault',
          avatar: null
        },
        timestamp: 'March 27, 2025 at 7:56pm',
        subject: 'Pickup Completed Confirmation',
        message: `Dear John Smith,\n\nWe've successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs.\n\nYour pickup details:\n- Date: March 27, 2025\n- Items: 4 devices\n- Weight: 12.8kg\n\nYou'll receive a detailed report of your environmental impact within 5 business days.\n\nBest regards,\nThe Green Tech Vault Team`,
        thread: [
          {
            id: '2-1',
            sender: {
              id: 'jadmin01',
              name: 'GTV Admin',
              company: 'Green Tech Vault',
              avatar: null
            },
            timestamp: 'March 27, 2025 at 7:56pm',
            message: `Dear John Smith,\n\nWe've successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs.\n\nYour pickup details:\n- Date: March 27, 2025\n- Items: 4 devices\n- Weight: 12.8kg\n\nYou'll receive a detailed report of your environmental impact within 5 business days.\n\nBest regards,\nThe Green Tech Vault Team`
          }
        ]
      },
      {
        id: '3',
        type: 'confirmation',
        read: true,
        starred: false,
        sender: {
          id: 'jadmin01',
          name: 'GTV Admin',
          company: 'Green Tech Vault',
          avatar: null
        },
        timestamp: 'March 27, 2025 at 7:56pm',
        subject: 'Pickup Completed Confirmation',
        message: `Dear John Smith,\n\nWe've successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs.\n\nYour pickup details:\n- Date: March 27, 2025\n- Items: 4 devices\n- Weight: 12.8kg\n\nYou'll receive a detailed report of your environmental impact within 5 business days.\n\nBest regards,\nThe Green Tech Vault Team`,
        thread: [
          {
            id: '3-1',
            sender: {
              id: 'jadmin01',
              name: 'GTV Admin',
              company: 'Green Tech Vault',
              avatar: null
            },
            timestamp: 'March 27, 2025 at 7:56pm',
            message: `Dear John Smith,\n\nWe've successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs.\n\nYour pickup details:\n- Date: March 27, 2025\n- Items: 4 devices\n- Weight: 12.8kg\n\nYou'll receive a detailed report of your environmental impact within 5 business days.\n\nBest regards,\nThe Green Tech Vault Team`
          }
        ]
      },
      {
        id: '4',
        type: 'question',
        read: false,
        starred: true,
        sender: {
          id: 'jsmith01',
          name: '@jsmith01',
          company: 'GTV',
          avatar: null
        },
        timestamp: 'March 27, 2025 at 7:56pm',
        subject: 'Question About my Pickup',
        message: `Dear Green Tech Vault, I wanted to upgrade my pickup...`,
        thread: [
          {
            id: '4-1',
            sender: {
              id: 'jsmith01',
              name: '@jsmith01',
              company: 'GTV',
              avatar: null
            },
            timestamp: 'March 27, 2025 at 7:56pm',
            message: `Dear Green Tech Vault, I wanted to upgrade my pickup...`
          }
        ]
      }
    ];
    
    setMessages(mockMessages);
  }, []);

  const handleMessageSelect = (message) => {
    // Mark as read when opened
    if (!message.read) {
      const updatedMessages = messages.map(msg =>
        msg.id === message.id ? { ...msg, read: true } : msg
      );
      setMessages(updatedMessages);
    }
    setSelectedMessage(message);
    setIsExpanded(true);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setFilter(filter);
    handleFilterClose();
  };

  const handleCloseMessage = () => {
    setIsExpanded(false);
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    
    const newReply = {
      id: `${selectedMessage.id}-${selectedMessage.thread.length + 1}`,
      sender: {
        id: 'client',
        name: user?.username || '@lmeyer',
        company: user?.companyName || "Leila's Company",
        avatar: null
      },
      timestamp: new Date().toLocaleString(),
      message: replyText
    };

    // Update the thread of the selected message
    const updatedSelectedMessage = {
      ...selectedMessage,
      thread: [...selectedMessage.thread, newReply]
    };

    // Update the messages array with the updated thread
    const updatedMessages = messages.map(msg =>
      msg.id === selectedMessage.id ? updatedSelectedMessage : msg
    );

    setMessages(updatedMessages);
    setSelectedMessage(updatedSelectedMessage);
    setReplyText('');
  };

  const handleComposeOpen = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
    // Reset compose form data
    setComposeData({
      subject: '',
      message: ''
    });
  };

  const handleComposeChange = (e) => {
    const { name, value } = e.target;
    setComposeData({
      ...composeData,
      [name]: value
    });
  };

  const handleComposeSend = () => {
    // Validate form
    if (!composeData.subject || !composeData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Create a new message
    const newMessage = {
      id: `new-${Date.now()}`,
      type: 'question',
      read: true,
      sender: {
        id: 'client',
        name: user?.username || '@lmeyer',
        company: user?.companyName || "Leila's Company",
        avatar: null
      },
      timestamp: new Date().toLocaleString(),
      subject: composeData.subject,
      message: composeData.message,
      thread: [
        {
          id: `new-${Date.now()}-1`,
          sender: {
            id: 'client',
            name: user?.username || '@lmeyer',
            company: user?.companyName || "Leila's Company",
            avatar: null
          },
          timestamp: new Date().toLocaleString(),
          message: composeData.message
        }
      ]
    };

    // Add to messages list
    setMessages([newMessage, ...messages]);
    
    // Close compose dialog
    handleComposeClose();
    
    // Select the newly created message
    setSelectedMessage(newMessage);
  };

  const handleDeleteMessages = (messageIds = null) => {
    // Use provided messageIds or selected messages
    const idsToDelete = messageIds || selectedMessages;
    
    // Delete selected messages
    const updatedMessages = messages.filter(message => !idsToDelete.includes(message.id));
    setMessages(updatedMessages);
    
    // Reset selected messages
    setSelectedMessages([]);
    
    // If the currently selected message was deleted, clear selection
    if (selectedMessage && idsToDelete.includes(selectedMessage.id)) {
      setSelectedMessage(updatedMessages[0] || null);
    }
  };

  const handleCheckboxChange = (messageId) => {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(selectedMessages.filter(id => id !== messageId));
    } else {
      setSelectedMessages([...selectedMessages, messageId]);
    }
  };

  const getStatusColor = (type) => {
    switch (type) {
      case 'question':
        return '#fd8700'; // Orange
      case 'confirmation':
        return '#4ECDC4'; // Teal
      default:
        return '#9e9e9e'; // Gray
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'All') {
      // Show all messages
    } else if (filter === 'Unread') {
      if (!message.read) {
        return true;
      }
      return false;
    } else if (filter === 'Sent') {
      if (message.sender.id === 'client') {
        return true;
      }
      return false;
    } else if (filter.toLowerCase() !== message.type) {
      return false;
    }
    
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        message.subject.toLowerCase().includes(searchTermLower) ||
        message.message.toLowerCase().includes(searchTermLower) ||
        message.sender.name.toLowerCase().includes(searchTermLower)
      );
    }
    
    return true;
  });

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <div style={{ marginLeft: 240, width: 'calc(100% - 240px)' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontSize: '1rem' }}>Messages</Typography>
            
            <Grid container spacing={2}>
              {/* Messages List */}
              <Grid item xs={12} md={isExpanded ? 4 : 12}>
                <Paper sx={{ height: '75vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {/* Compose Button */}
                  <Box sx={{ p: 1.5 }}>
                    <Button
                      variant="contained"
                      onClick={handleComposeOpen}
                      startIcon={<PencilIcon fontSize="small" />}
                      sx={{
                        bgcolor: '#4ECDC4',
                        '&:hover': { bgcolor: '#3dbdb5' },
                        borderRadius: '4px',
                        py: 0.75,
                        px: 2,
                        textTransform: 'none',
                        width: 'auto',
                        alignSelf: 'flex-start',
                        fontSize: '0.8rem',
                      }}
                    >
                      Compose
                    </Button>
                  </Box>
                  
                  {/* Search and Filter */}
                  <Box sx={{ px: 1.5, pb: 1.5, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      px: 1,
                      py: 0.3,
                      mr: 1,
                      flex: 1,
                      height: '28px',
                    }}>
                      <SearchIcon sx={{ color: '#aaa', mr: 0.5, fontSize: '1rem' }} />
                      <InputBase 
                        placeholder="Search here" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ fontSize: '0.8rem', width: '100%' }}
                      />
                    </Box>
                    <Button
                      onClick={handleFilterClick}
                      endIcon={<DropdownIcon fontSize="small" />}
                      size="small"
                      sx={{ 
                        border: '1px solid #e0e0e0',
                        color: '#555',
                        textTransform: 'none',
                        px: 1.5,
                        py: 0.4,
                        fontSize: '0.8rem',
                        height: '28px',
                        minWidth: '60px',
                      }}
                    >
                      {filter}
                    </Button>
                    <Menu
                      anchorEl={filterAnchorEl}
                      open={Boolean(filterAnchorEl)}
                      onClose={handleFilterClose}
                    >
                      <MenuItem onClick={() => handleFilterSelect('All')}>
                        <ListItemText primaryTypographyProps={{ fontSize: '0.8rem' }}>All</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleFilterSelect('Unread')}>
                        <ListItemText primaryTypographyProps={{ fontSize: '0.8rem' }}>Unread</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleFilterSelect('Sent')}>
                        <ListItemText primaryTypographyProps={{ fontSize: '0.8rem' }}>Sent</ListItemText>
                      </MenuItem>
                    </Menu>
                  </Box>
                  
                  {/* Message List */}
                  <Box sx={{ flex: 1, overflow: 'auto', backgroundColor: '#f9f9f9' }}>
                    <List disablePadding>
                      {filteredMessages.map((message) => (
                        <ListItem 
                          key={message.id}
                          alignItems="flex-start"
                          disablePadding
                          sx={{ 
                            p: 0,
                            borderBottom: '1px solid #eee',
                            bgcolor: selectedMessage?.id === message.id ? '#f0f0f0' : message.read ? 'white' : '#fafafa',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#f5f5f5' },
                            position: 'relative'
                          }}
                          onClick={() => handleMessageSelect(message)}
                        >
                          {!message.read && (
                            <Box 
                              sx={{ 
                                position: 'absolute',
                                left: 0,
                                top: 0, 
                                bottom: 0,
                                width: '3px',
                                bgcolor: '#ff5722'
                              }} 
                            />
                          )}
                          
                          <Box sx={{ display: 'flex', width: '100%', p: 1 }}>
                            <Box sx={{ mr: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Checkbox 
                                size="small" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCheckboxChange(message.id);
                                }}
                                checked={selectedMessages.includes(message.id)}
                                sx={{ padding: '2px' }}
                              />
                              <IconButton 
                                size="small" 
                                sx={{ p: 0.2, mt: 0.3 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updatedMessages = messages.map(msg =>
                                    msg.id === message.id ? { ...msg, starred: !msg.starred } : msg
                                  );
                                  setMessages(updatedMessages);
                                }}
                              >
                                {message.starred ? (
                                  <StarIcon sx={{ fontSize: '0.85rem', color: '#FFB400' }} />
                                ) : (
                                  <StarBorderIcon sx={{ fontSize: '0.85rem', color: '#999' }} />
                                )}
                              </IconButton>
                            </Box>
                            
                            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 0.3 }}>
                                <Typography 
                                  variant="subtitle2" 
                                  sx={{ 
                                    fontWeight: message.read ? 'normal' : 'bold', 
                                    color: '#000',
                                    mr: 1,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    fontSize: '0.75rem'
                                  }}
                                >
                                  {message.subject}
                                </Typography>
                                
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: '#777',
                                    fontSize: '0.7rem',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {message.sender.name}
                                </Typography>
                              </Box>
                              
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: '#666',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  fontSize: '0.7rem'
                                }}
                              >
                                {message.message.split('\n')[0]}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                              {!message.read && (
                                <Box 
                                  sx={{ 
                                    width: 6, 
                                    height: 6, 
                                    borderRadius: '50%', 
                                    bgcolor: '#E76F51',
                                    mb: 0.3
                                  }} 
                                />
                              )}
                              
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  fontSize: '0.65rem', 
                                  color: '#666',
                                  mb: 0.3,
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {message.timestamp.split(' at ')[0]}
                              </Typography>
                              
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  fontSize: '0.65rem', 
                                  color: '#666',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {message.timestamp.split(' at ')[1] || ''}
                              </Typography>
                            </Box>
                          </Box>
                        </ListItem>
                      ))}
                      
                      {filteredMessages.length === 0 && (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            No messages found
                          </Typography>
                        </Box>
                      )}
                    </List>
                  </Box>
                </Paper>
              </Grid>
              
              {/* Message Content */}
              {isExpanded && (
              <Grid item xs={12} md={8}>
                {selectedMessage ? (
                  <Paper sx={{ p: 2, height: '75vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    {/* Close button */}
                    <IconButton 
                      onClick={handleCloseMessage}
                      sx={{ 
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: '#555555',
                        padding: '4px'
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    
                    {/* Message Header */}
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="h6" sx={{ mb: 1, fontSize: '0.95rem', fontWeight: 500 }}>
                        {selectedMessage.subject}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: getStatusColor(selectedMessage.type), fontSize: '0.8rem' }}>
                          {selectedMessage.sender.name.charAt(1).toUpperCase()}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
                            {selectedMessage.sender.name}, {selectedMessage.sender.company}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            {selectedMessage.timestamp}
                          </Typography>
                        </Box>
                        
                        {/* Message Actions */}
                        <Box>
                          <IconButton 
                            size="small" 
                            title="Reply"
                            sx={{ 
                              color: '#4ECDC4',
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.7,
                              mr: 0.5,
                              width: 28,
                              height: 28,
                            }}
                          >
                            <ReplyIcon sx={{ fontSize: '0.9rem' }} />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            title="Forward"
                            sx={{ 
                              color: '#4ECDC4',
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.7,
                              mr: 0.5,
                              width: 28,
                              height: 28,
                            }}
                          >
                            <ForwardIcon sx={{ fontSize: '0.9rem' }} />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            title="Delete"
                            onClick={() => {
                              handleDeleteMessages([selectedMessage.id]);
                            }}
                            sx={{ 
                              color: '#E05050',
                              border: '1px solid #e0e0e0',
                              borderRadius: '50%',
                              p: 0.7,
                              width: 28,
                              height: 28,
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: '0.9rem' }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    
                    {/* Message Thread */}
                    <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
                      {selectedMessage.thread.map((message, index) => (
                        <Box key={message.id} sx={{ mb: 3 }}>
                          {index > 0 && <Divider sx={{ my: 2 }} />}
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: message.sender.id === 'client' ? '#4ECDC4' : '#1C392B', fontSize: '0.8rem' }}>
                              {message.sender.name.charAt(1).toUpperCase()}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="subtitle2" sx={{ fontSize: '0.8rem' }}>
                                  {message.sender.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                  {message.timestamp}
                                </Typography>
                              </Box>
                              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: '0.85rem' }}>
                                {message.message}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    
                    {/* Reply Section */}
                    <Box sx={{ mt: 'auto', pt: 1.5, borderTop: '1px solid #e0e0e0' }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Type your reply here..."
                        variant="outlined"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        sx={{ 
                          mb: 1.5,
                          '& .MuiOutlinedInput-root': {
                            fontSize: '0.85rem',
                          }
                        }}
                        inputProps={{ style: { fontSize: '0.85rem' } }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          endIcon={<SendIcon fontSize="small" />}
                          onClick={handleReplySubmit}
                          sx={{
                            bgcolor: '#4ECDC4',
                            '&:hover': { bgcolor: '#3dbdb5' },
                            fontSize: '0.8rem',
                            py: 0.75,
                            px: 2
                          }}
                        >
                          Send
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                ) : (
                  <Paper sx={{ p: 2, height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                      Select a message to view
                    </Typography>
                  </Paper>
                )}
              </Grid>
              )}
            </Grid>
          </Box>
        </div>
      </Box>
      
      {/* Compose Message Dialog */}
      <Dialog 
        open={composeOpen} 
        onClose={handleComposeClose}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>Compose Message</Typography>
          
          <TextField
            fullWidth
            label="To"
            disabled
            value="Green Tech Vault Support"
            size="small"
            sx={{ mb: 2 }}
            InputProps={{ style: { fontSize: '0.85rem' } }}
            InputLabelProps={{ style: { fontSize: '0.85rem' } }}
          />
          
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={composeData.subject}
            onChange={handleComposeChange}
            placeholder="Enter subject"
            size="small"
            sx={{ mb: 2 }}
            InputProps={{ style: { fontSize: '0.85rem' } }}
            InputLabelProps={{ style: { fontSize: '0.85rem' } }}
          />
          
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Message"
            name="message"
            value={composeData.message}
            onChange={handleComposeChange}
            placeholder="Type your message here..."
            sx={{ mb: 2 }}
            InputProps={{ style: { fontSize: '0.85rem' } }}
            InputLabelProps={{ style: { fontSize: '0.85rem' } }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              onClick={handleComposeClose}
              sx={{ mr: 1.5, fontSize: '0.8rem' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleComposeSend}
              endIcon={<SendIcon fontSize="small" />}
              sx={{
                bgcolor: '#4ECDC4',
                '&:hover': { bgcolor: '#3dbdb5' },
                fontSize: '0.8rem',
                py: 0.75,
                px: 2
              }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ClientMessages; 