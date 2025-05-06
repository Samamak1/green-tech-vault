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
  ListItemText,
  ListItemIcon,
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
  DialogActions
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
  Create as PencilIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon as EmojiIcon,
  FilterList as FilterListIcon,
  ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const AdminMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [composeData, setComposeData] = useState({
    recipient: '',
    subject: '',
    message: ''
  });
  const [templatesAnchorEl, setTemplatesAnchorEl] = useState(null);
  const [automatedAnchorEl, setAutomatedAnchorEl] = useState(null);

  // Mock data for conversations
  useEffect(() => {
    // This would be replaced by an API call in a real app
    const mockConversations = [
      {
        id: '1',
        contact: {
          id: 'jsmith01',
          name: '@jsmith01',
          company: 'Tech Solutions Inc.',
          avatar: null
        },
        unreadCount: 1,
        lastMessage: {
          text: 'Dear Green Tech Vault Team, I wanted to upgrade my pickup since our company has added to the number of devices we want to recycle...',
          timestamp: 'March 27, 2025 at 10:50pm'
        },
        messages: [
          {
            id: '1-1',
            text: 'Dear Green Tech Vault Team,\n\nI wanted to upgrade my pickup since our company has added to the number of devices we want to recycle. I was wondering who I should speak with, and if you could provide me with their contact information.\n\nI look forward to my first GTV Pickup!\n\nThanks,\nJohn Smith',
            timestamp: 'March 27, 2025 at 10:50pm',
            isFromUser: true
          }
        ]
      },
      {
        id: '2',
        contact: {
          id: 'jsmith01',
          name: 'John Smith',
          company: 'Tech Solutions Inc.',
          avatar: null
        },
        unreadCount: 0,
        lastMessage: {
          text: 'Dear John Smith, We\'ve successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs...',
          timestamp: 'March 27, 2025 at 7:56pm'
        },
        messages: [
          {
            id: '2-1',
            text: 'Dear John Smith,\n\nWe\'ve successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs.\n\nYour pickup details:\n- Date: March 27, 2025\n- Items: 4 devices\n- Weight: 12.8kg\n\nYou\'ll receive a detailed report of your environmental impact within 5 business days.\n\nBest regards,\nThe Green Tech Vault Team',
            timestamp: 'March 27, 2025 at 7:56pm',
            isFromUser: false
          }
        ]
      },
      {
        id: '3',
        contact: {
          id: 'sjohnson01',
          name: 'Sarah Johnson',
          company: 'Global Innovations',
          avatar: null
        },
        unreadCount: 0,
        lastMessage: {
          text: 'Dear Sarah Johnson, We\'ve successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs...',
          timestamp: 'March 27, 2025 at 7:56pm'
        },
        messages: [
          {
            id: '3-1',
            text: 'Dear Sarah Johnson,\n\nWe\'ve successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs.\n\nYour pickup details:\n- Date: March 27, 2025\n- Items: 4 devices\n- Weight: 12.8kg\n\nYou\'ll receive a detailed report of your environmental impact within 5 business days.\n\nBest regards,\nThe Green Tech Vault Team',
            timestamp: 'March 27, 2025 at 7:56pm',
            isFromUser: false
          }
        ]
      },
      {
        id: '4',
        contact: {
          id: 'mbrown01',
          name: 'Michael Brown',
          company: 'EcoFriendly Corp',
          avatar: null
        },
        unreadCount: 2,
        lastMessage: {
          text: 'Dear Green Tech Vault, I wanted to upgrade my pickup...',
          timestamp: 'March 27, 2025 at 7:56pm'
        },
        messages: [
          {
            id: '4-1',
            text: 'Dear Green Tech Vault, I wanted to upgrade my pickup...',
            timestamp: 'March 27, 2025 at 7:56pm',
            isFromUser: true
          }
        ]
      }
    ];
    
    setConversations(mockConversations);
    setSelectedConversation(mockConversations[0]);
  }, []);

  const handleConversationSelect = (conversation) => {
    // Mark conversation as read when selected
    const updatedConversations = conversations.map(conv =>
      conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
    );
    setConversations(updatedConversations);
    
    // Set selected conversation
    setSelectedConversation(conversation);
    setIsExpanded(true);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: `new-${Date.now()}`,
      text: messageText,
      timestamp: new Date().toLocaleString(),
      isFromUser: false
    };

    // Add message to conversation
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: {
        text: messageText,
        timestamp: new Date().toLocaleString()
      }
    };

    // Update conversations list
    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation.id ? updatedConversation : conv
    );
    
    setConversations(updatedConversations);
    setSelectedConversation(updatedConversation);
    setMessageText('');
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

  const handleComposeOpen = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
    // Reset compose form data
    setComposeData({
      recipient: '',
      subject: '',
      message: ''
    });
  };

  const handleComposeChange = (event) => {
    const { name, value } = event.target;
    setComposeData({
      ...composeData,
      [name]: value
    });
  };

  const handleComposeSend = () => {
    // Validate form
    if (!composeData.recipient || !composeData.subject || !composeData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Create a new conversation
    const newConversation = {
      id: `new-${Date.now()}`,
      contact: {
        id: 'new-contact',
        name: composeData.recipient,
        company: 'Client Company',
        avatar: null
      },
      unreadCount: 0,
      lastMessage: {
        text: composeData.message,
        timestamp: new Date().toLocaleString()
      },
      messages: [
        {
          id: `new-${Date.now()}-1`,
          text: composeData.message,
          timestamp: new Date().toLocaleString(),
          isFromUser: false
        }
      ]
    };

    // Add to conversations list
    setConversations([newConversation, ...conversations]);
    
    // Close compose dialog
    handleComposeClose();
    
    // Select the newly created conversation
    setSelectedConversation(newConversation);
    setIsExpanded(true);
  };

  const handleTemplatesClick = (event) => {
    setTemplatesAnchorEl(event.currentTarget);
  };

  const handleTemplatesClose = () => {
    setTemplatesAnchorEl(null);
  };

  const handleAutomatedClick = (event) => {
    setAutomatedAnchorEl(event.currentTarget);
  };

  const handleAutomatedClose = () => {
    setAutomatedAnchorEl(null);
  };

  const handleAutomatedSelect = (template) => {
    // In a real app, this would insert the template text into the message field
    setMessageText(template);
    handleAutomatedClose();
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    
    // For simplicity, just return the time part
    if (timestamp.includes('at')) {
      return timestamp.split('at ')[1];
    }
    return timestamp;
  };

  const filteredConversations = conversations.filter(conversation => {
    if (filter === 'Unread' && conversation.unreadCount === 0) {
      return false;
    }
    
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        conversation.contact.name.toLowerCase().includes(searchTermLower) ||
        conversation.lastMessage.text.toLowerCase().includes(searchTermLower)
      );
    }
    
    return true;
  });

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Messages</Typography>
        
        <Grid container spacing={2}>
          {/* Messages List */}
          <Grid item xs={12} md={isExpanded ? 4 : 12}>
            <Paper sx={{ p: 2, height: '80vh', display: 'flex', flexDirection: 'column' }}>
              {/* Compose Button */}
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleComposeOpen}
                  startIcon={<PencilIcon />}
                  sx={{
                    bgcolor: '#185B5F',
                    '&:hover': { bgcolor: '#124548' },
                    borderRadius: '4px',
                    py: 1,
                    px: 3,
                    mb: 2,
                    textTransform: 'none',
                    width: 'auto',
                    alignSelf: 'flex-start'
                  }}
                >
                  Compose
                </Button>
              </Box>
              
              {/* Search and Filter */}
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  px: 1.5,
                  py: 0.5,
                  mr: 1,
                  flex: 1
                }}>
                  <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: '1.2rem' }} />
                  <InputBase 
                    placeholder="Search here" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ fontSize: '0.9rem', width: '100%' }}
                  />
                </Box>
                <Button
                  onClick={handleFilterClick}
                  endIcon={<DropdownIcon />}
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
                  <MenuItem onClick={() => handleFilterSelect('Unread')}>Unread</MenuItem>
                  <MenuItem onClick={() => handleFilterSelect('Client')}>Client</MenuItem>
                  <MenuItem onClick={() => handleFilterSelect('Admin')}>Admin</MenuItem>
                </Menu>
              </Box>
              
              {/* Conversation List - Email Style */}
              <List sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {filteredConversations.map((conversation) => (
                  <ListItem 
                    key={conversation.id} 
                    sx={{ 
                      p: 1.5, 
                      borderBottom: '1px solid #f0f0f0', 
                      backgroundColor: conversation.unreadCount > 0 ? 'rgba(24, 91, 95, 0.05)' : 'transparent',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f9f9f9' }
                    }}
                    onClick={() => handleConversationSelect(conversation)}
                  >
                    <Box sx={{ display: 'flex', width: '100%' }}>
                      <Box sx={{ mr: 1.5, position: 'relative' }}>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            bgcolor: conversation.contact.name.startsWith('@') ? '#fd8700' : '#185B5F' 
                          }}
                        >
                          {conversation.contact.name[0].toUpperCase()}
                        </Avatar>
                        {conversation.unreadCount > 0 && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: -5,
                              right: -5,
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              bgcolor: '#E76F51',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              border: '1px solid white'
                            }}
                          >
                            {conversation.unreadCount}
                          </Box>
                        )}
                      </Box>
                      
                      <Box sx={{ flex: 1, overflow: 'hidden' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: conversation.unreadCount > 0 ? 'bold' : 'normal',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {conversation.contact.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatTimestamp(conversation.lastMessage.timestamp)}
                          </Typography>
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '0.8rem'
                          }}
                        >
                          {conversation.lastMessage.text}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          {/* Message Content */}
          {isExpanded && selectedConversation && (
            <Grid item xs={12} md={8}>
              <Paper 
                sx={{ 
                  height: '80vh', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  p: 0, 
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2
                }}
              >
                {/* Message Header */}
                <Box 
                  sx={{ 
                    p: 2, 
                    borderBottom: '1px solid #e0e0e0', 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        mr: 1.5, 
                        bgcolor: selectedConversation.contact.name.startsWith('@') ? '#fd8700' : '#185B5F' 
                      }}
                    >
                      {selectedConversation.contact.name[0].toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {selectedConversation.contact.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedConversation.contact.company}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Button 
                      variant="outlined"
                      size="small" 
                      endIcon={<ArrowDropDownIcon />}
                      onClick={handleTemplatesClick}
                      sx={{ 
                        color: '#185B5F',
                        borderColor: '#e0e0e0',
                        borderRadius: '20px',
                        py: 0.5,
                        px: 1.5,
                        mr: 1,
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        '&:hover': {
                          bgcolor: 'rgba(24, 91, 95, 0.08)',
                          borderColor: '#185B5F',
                        }
                      }}
                    >
                      Message Templates
                    </Button>
                    <Menu
                      anchorEl={templatesAnchorEl}
                      open={Boolean(templatesAnchorEl)}
                      onClose={handleTemplatesClose}
                    >
                      <MenuItem onClick={handleTemplatesClose}>
                        <ListItemText>Template 1</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleTemplatesClose}>
                        <ListItemText>Template 2</ListItemText>
                      </MenuItem>
                    </Menu>
                    
                    <Button 
                      variant="outlined"
                      size="small" 
                      endIcon={<ArrowDropDownIcon />}
                      onClick={handleAutomatedClick}
                      sx={{ 
                        color: '#185B5F',
                        borderColor: '#e0e0e0',
                        borderRadius: '20px',
                        py: 0.5,
                        px: 1.5,
                        mr: 1,
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        '&:hover': {
                          bgcolor: 'rgba(24, 91, 95, 0.08)',
                          borderColor: '#185B5F',
                        }
                      }}
                    >
                      Automated Messages
                    </Button>
                    <Menu
                      anchorEl={automatedAnchorEl}
                      open={Boolean(automatedAnchorEl)}
                      onClose={handleAutomatedClose}
                    >
                      <MenuItem onClick={() => handleAutomatedSelect("Dear Client,\n\nWe're pleased to confirm your upcoming pickup has been scheduled. Our team will arrive on [DATE] between [TIME RANGE].\n\nPlease ensure all devices are ready for collection.\n\nThank you for choosing Green Tech Vault for your e-waste recycling needs.")}>
                        <ListItemText>Pickup Scheduling Confirmation</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleAutomatedSelect("Dear Client,\n\nThis is a friendly reminder that your scheduled pickup is 24 hours away. Our team will arrive tomorrow between [TIME RANGE].\n\nIf you need to make any changes, please contact us immediately.\n\nThank you for choosing Green Tech Vault.")}>
                        <ListItemText>24 Hours Until Your Pickup</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleAutomatedSelect("Dear Client,\n\nOur driver is on the way to your location and should arrive within the next 30 minutes.\n\nPlease ensure all items are accessible for our team to minimize collection time.\n\nThank you for your cooperation.")}>
                        <ListItemText>Driver On The Way</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleAutomatedSelect("Dear Client,\n\nWe've successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs.\n\nYour pickup details:\n- Date: [DATE]\n- Items: [NUMBER] devices\n- Weight: [WEIGHT]kg\n\nYou'll receive a detailed report of your environmental impact within 5 business days.\n\nBest regards,\nThe Green Tech Vault Team")}>
                        <ListItemText>Pickup Complete Confirmation</ListItemText>
                      </MenuItem>
                    </Menu>
                    
                    <IconButton 
                      onClick={handleCloseMessage} 
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                {/* Message Content - Modern Chat Style */}
                <Box 
                  sx={{ 
                    p: 2, 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    bgcolor: '#f9f9f9'
                  }}
                >
                  {selectedConversation.messages.map((message, index) => (
                    <Box 
                      key={message.id} 
                      sx={{ 
                        alignSelf: message.isFromUser ? 'flex-start' : 'flex-end',
                        mb: 2,
                        maxWidth: '70%'
                      }}
                    >
                      <Box 
                        sx={{ 
                          p: 2,
                          borderRadius: message.isFromUser ? '0px 8px 8px 8px' : '8px 0px 8px 8px',
                          bgcolor: message.isFromUser ? 'white' : '#185B5F', 
                          color: message.isFromUser ? 'inherit' : 'white',
                          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                          {message.text}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="caption" 
                        color="text.secondary" 
                        sx={{ 
                          display: 'block', 
                          mt: 0.5, 
                          textAlign: message.isFromUser ? 'left' : 'right',
                          color: message.isFromUser ? 'text.secondary' : 'text.secondary'
                        }}
                      >
                        {formatTimestamp(message.timestamp)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                
                {/* Message Input */}
                <Box 
                  sx={{ 
                    p: 2, 
                    borderTop: '1px solid #e0e0e0', 
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    variant="outlined"
                    size="small"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    InputProps={{
                      sx: {
                        borderRadius: 20,
                        bgcolor: '#f9f9f9',
                        fontSize: '0.9rem',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e0e0e0'
                        }
                      }
                    }}
                    sx={{ mr: 1 }}
                  />
                  <IconButton 
                    onClick={handleSendMessage}
                    sx={{ 
                      bgcolor: '#185B5F',
                      color: 'white', 
                      '&:hover': { bgcolor: '#124548' }
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
        
        {/* Compose Message Dialog */}
        <Dialog 
          open={composeOpen} 
          onClose={handleComposeClose}
          maxWidth="sm"
          fullWidth
          sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>Compose Message</Typography>
              <IconButton onClick={handleComposeClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            
            <TextField
              fullWidth
              label="To"
              name="recipient"
              value={composeData.recipient}
              onChange={handleComposeChange}
              placeholder="Enter recipient name or email"
              size="small"
              sx={{ mb: 2 }}
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
              size="small"
              sx={{ mb: 3 }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained"
                onClick={handleComposeSend}
                endIcon={<SendIcon />}
                sx={{
                  bgcolor: '#185B5F',
                  '&:hover': { bgcolor: '#124548' },
                  textTransform: 'none'
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminMessages; 