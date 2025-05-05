import React, { useState, useEffect, useRef } from 'react';
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
  Create as PencilIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon as EmojiIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const ClientMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({ subject: '', message: '' });

  // Mock data for conversations and messages
  useEffect(() => {
    // This would be replaced by an API call in a real app
    const mockConversations = [
      {
        id: '1',
        contact: {
          id: 'gtv-admin',
          name: 'GTV Admin',
          avatar: null,
          isOnline: true,
          lastSeen: 'Just now'
        },
        unreadCount: 2,
        lastMessage: {
          text: "We've successfully completed your pickup. Thank you for choosing Green Tech Vault.",
          timestamp: 'March 27, 2025 at 7:56pm',
          isFromUser: false
        },
        messages: [
          {
            id: '1-1',
            text: "Hello! I would like to schedule a pickup for some old electronics.",
            timestamp: 'March 26, 2025 at 10:30am',
            isFromUser: true
          },
          {
            id: '1-2',
            text: "Hi Leila! Sure, we'd be happy to help you recycle your electronics. What kind of items do you have and when would you like to schedule the pickup?",
            timestamp: 'March 26, 2025 at 11:15am',
            isFromUser: false
          },
          {
            id: '1-3',
            text: "I have 4 laptops, 2 monitors, and some miscellaneous cables. Would next Monday work?",
            timestamp: 'March 26, 2025 at 11:20am',
            isFromUser: true
          },
          {
            id: '1-4',
            text: "Monday works great! We'll schedule you for Monday at 2pm. Does that time work for you?",
            timestamp: 'March 26, 2025 at 11:45am',
            isFromUser: false
          },
          {
            id: '1-5',
            text: "Perfect! I'll be available at that time.",
            timestamp: 'March 26, 2025 at 12:01pm',
            isFromUser: true
          },
          {
            id: '1-6',
            text: "Great! We've scheduled your pickup for Monday at 2pm. Our driver will call you when they're on the way. Thank you for choosing Green Tech Vault!",
            timestamp: 'March 26, 2025 at 12:10pm',
            isFromUser: false
          },
          {
            id: '1-7',
            text: "We've successfully completed your pickup. Thank you for choosing Green Tech Vault for your e-waste recycling needs. Your pickup details: 4 devices weighing 12.8kg. You'll receive a detailed report of your environmental impact within 5 business days.",
            timestamp: 'March 27, 2025 at 7:56pm',
            isFromUser: false
          }
        ]
      },
      {
        id: '2',
        contact: {
          id: 'jsmith',
          name: 'John Smith',
          avatar: null,
          isOnline: false,
          lastSeen: '3 hours ago'
        },
        unreadCount: 0,
        lastMessage: {
          text: "Let me know if you receive the report.",
          timestamp: 'March 25, 2025 at 3:45pm',
          isFromUser: false
        },
        messages: [
          {
            id: '2-1',
            text: "Hi Leila, just checking if you received your environmental impact report?",
            timestamp: 'March 25, 2025 at 3:30pm',
            isFromUser: false
          },
          {
            id: '2-2',
            text: "Yes, I got it. Thanks for following up!",
            timestamp: 'March 25, 2025 at 3:35pm',
            isFromUser: true
          },
          {
            id: '2-3',
            text: "Great! Let me know if you have any questions about it.",
            timestamp: 'March 25, 2025 at 3:40pm',
            isFromUser: false
          },
          {
            id: '2-4',
            text: "Let me know if you receive the report.",
            timestamp: 'March 25, 2025 at 3:45pm',
            isFromUser: false
          }
        ]
      },
      {
        id: '3',
        contact: {
          id: 'sarah',
          name: 'Sarah Johnson',
          avatar: null,
          isOnline: true,
          lastSeen: 'Just now'
        },
        unreadCount: 1,
        lastMessage: {
          text: "Your spring recycling promotion code is SPRING25.",
          timestamp: 'March 20, 2025 at 9:15am',
          isFromUser: false
        },
        messages: [
          {
            id: '3-1',
            text: "Hello Leila, I wanted to inform you about our spring recycling promotion!",
            timestamp: 'March 20, 2025 at 9:10am',
            isFromUser: false
          },
          {
            id: '3-2',
            text: "Your spring recycling promotion code is SPRING25.",
            timestamp: 'March 20, 2025 at 9:15am',
            isFromUser: false
          }
        ]
      }
    ];
    
    setConversations(mockConversations);
    // Select the first conversation by default
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0]);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConversation]);

  const handleConversationSelect = (conversation) => {
    // Mark conversation as read when selected
    const updatedConversations = conversations.map(conv =>
      conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
    );
    setConversations(updatedConversations);
    
    // Set selected conversation
    setSelectedConversation(conversation);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: `new-${Date.now()}`,
      text: messageText,
      timestamp: new Date().toLocaleString(),
      isFromUser: true
    };

    // Add message to conversation
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: {
        text: messageText,
        timestamp: new Date().toLocaleString(),
        isFromUser: true
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

  const handleFilterSelect = (filterValue) => {
    setFilter(filterValue);
    handleFilterClose();
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    
    // For simplicity, just return the time part
    // In a real app, you might want to format based on how recent the message is
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

  const handleComposeOpen = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
  };

  const handleComposeChange = (event) => {
    setComposeData({
      ...composeData,
      [event.target.name]: event.target.value
    });
  };

  const handleComposeSend = () => {
    // Handle sending the composed message
    handleComposeClose();
  };

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    setIsExpanded(true);
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
    setIsExpanded(false);
  };

  const handleCheckboxChange = (id) => {
    // Handle checkbox change
  };

  const handleDeleteMessages = (ids) => {
    // Handle deleting messages
  };

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontSize: '1rem' }}>Messages</Typography>
        
        {/* Top Controls: Button, Search, and Filter */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              fontSize: '0.8rem',
            }}
          >
            Compose
          </Button>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search bar - aligned right side */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              px: 1.5,
              py: 0.5,
              height: 32,
              width: '250px'
            }}>
              <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: '1.2rem' }} />
              <InputBase 
                placeholder="Search here" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ fontSize: '0.9rem', width: '100%' }}
              />
            </Box>
            
            {/* Filter dropdown */}
            <Button
              onClick={handleFilterClick}
              endIcon={<DropdownIcon />}
              size="small"
              sx={{ 
                border: '1px solid #e0e0e0',
                color: '#555',
                textTransform: 'none',
                px: 2,
                py: 0.5,
                height: 32,
                minWidth: '80px'
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
        </Box>
        
        {/* Grid layout for side-by-side view */}
        <Grid container spacing={2}>
          {/* Messages List - Left Side */}
          <Grid item xs={12} md={isExpanded ? 5 : 12}>
            <Paper sx={{ 
              bgcolor: 'white', 
              borderRadius: 1, 
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              height: isExpanded ? 'calc(100vh - 180px)' : 'auto', // Extend height
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ 
                flex: 1, 
                overflow: 'auto',
                maxHeight: isExpanded ? 'calc(100vh - 180px)' : '55vh' // Extend height
              }}>
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <Box 
                      key={conversation.id} 
                      onClick={() => handleConversationSelect(conversation)}
                      sx={{ 
                        position: 'relative',
                        py: 1.5,
                        px: 2,
                        borderBottom: '1px solid #eee',
                        '&:last-child': { borderBottom: 'none' },
                        display: 'flex',
                        alignItems: 'flex-start',
                        bgcolor: selectedConversation?.id === conversation.id ? '#f0f0f0' : conversation.unreadCount > 0 ? '#fafafa' : 'transparent',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#f5f5f5' }
                      }}
                    >
                      {/* Unread indicator */}
                      {conversation.unreadCount > 0 && (
                        <Box 
                          sx={{ 
                            position: 'absolute',
                            left: 0,
                            top: 0, 
                            bottom: 0,
                            width: '4px',
                            bgcolor: '#ff5722'
                          }} 
                        />
                      )}
                      
                      {/* Checkbox */}
                      <Checkbox 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConversationSelect(conversation);
                        }}
                        checked={selectedConversation?.id === conversation.id}
                        sx={{ p: 0.5, mr: 1 }}
                      />
                      
                      {/* Star */}
                      <IconButton 
                        size="small" 
                        sx={{ p: 0.5, mr: 1.5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle star toggle
                        }}
                      >
                        {selectedConversation?.id === conversation.id && (
                          <StarIcon sx={{ fontSize: '1.1rem', color: '#FFB400' }} />
                        )}
                      </IconButton>
                      
                      {/* Message content */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <Box>
                            <Typography 
                              variant="subtitle1" 
                              component="span"
                              sx={{ 
                                fontSize: '0.9rem',
                                fontWeight: conversation.unreadCount > 0 ? 600 : 400 
                              }}
                            >
                              {conversation.contact.name}
                            </Typography>
                            
                            <Typography 
                              variant="body2" 
                              component="span"
                              sx={{ 
                                fontSize: '0.85rem',
                                color: '#666',
                                ml: 1
                              }}
                            >
                              {conversation.contact.isOnline ? 'Online' : conversation.contact.lastSeen}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, ml: 2 }}>
                            {!conversation.unreadCount && (
                              <Box 
                                sx={{ 
                                  width: 8, 
                                  height: 8, 
                                  borderRadius: '50%', 
                                  bgcolor: '#ff5722', 
                                  mr: 1 
                                }} 
                              />
                            )}
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ 
                                fontSize: '0.75rem',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {formatTimestamp(conversation.lastMessage.timestamp)}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#555', 
                            mt: 0.5,
                            fontSize: '0.85rem',
                            fontWeight: conversation.unreadCount > 0 ? 500 : 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '90%'
                          }}
                        >
                          {conversation.lastMessage.isFromUser ? 'You: ' : ''}
                          {conversation.lastMessage.text}
                        </Typography>
                      </Box>
                      
                      {/* More Menu Icon (replacing Delete) */}
                      <Box sx={{ ml: 1, mt: 0.5 }}>
                        <IconButton 
                          size="small" 
                          sx={{ p: 0.5 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Here you could add functionality to open a menu
                            // For now, we'll keep the delete functionality
                            handleConversationSelect(conversation);
                          }}
                        >
                          <MoreVertIcon sx={{ fontSize: '1.1rem', color: '#888' }} />
                        </IconButton>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No conversations found
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
          
          {/* Message Content - Right Side */}
          {isExpanded && selectedConversation && (
            <Grid item xs={12} md={7}>
              <Paper sx={{ 
                bgcolor: 'white', 
                borderRadius: 1, 
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                height: 'calc(100vh - 180px)', // Extend height
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Message header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #f0f0f0' }}>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                    {selectedConversation.contact.name}
                  </Typography>
                  <IconButton onClick={handleCloseMessage} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>
                
                {/* Modern Chat Message area */}
                <Box 
                  sx={{ 
                    p: 2, 
                    flex: 1, 
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#f5f5f5'
                  }}
                >
                  {selectedConversation.messages.map((message) => (
                    <Box 
                      key={message.id}
                      sx={{ 
                        alignSelf: message.isFromUser ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                        mb: 1.5
                      }}
                    >
                      <Box 
                        sx={{ 
                          bgcolor: message.isFromUser ? '#4ECDC4' : 'white',
                          color: message.isFromUser ? 'white' : 'black',
                          p: 1.5,
                          borderRadius: message.isFromUser 
                            ? '20px 20px 4px 20px'
                            : '20px 20px 20px 4px',
                          boxShadow: 1
                        }}
                      >
                        <Typography variant="body1" sx={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                          {message.text}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#777', fontSize: '0.7rem', ml: 1, mt: 0.5, display: 'block' }}>
                        {formatTimestamp(message.timestamp)}
                      </Typography>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>
                
                {/* Modern message input area */}
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderTop: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'white'
                  }}
                >
                  <IconButton size="small" sx={{ mr: 1 }}>
                    <EmojiIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ mr: 1 }}>
                    <AttachFileIcon fontSize="small" />
                  </IconButton>
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
                    color="primary" 
                    onClick={handleSendMessage}
                    sx={{ 
                      bgcolor: '#4ECDC4',
                      color: 'white', 
                      '&:hover': { bgcolor: '#3dbdb5' }
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
              rows={6}
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
    </Box>
  );
};

export default ClientMessages; 