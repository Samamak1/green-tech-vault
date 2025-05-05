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
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  ListItemText,
  Badge
} from '@mui/material';
import { 
  Search as SearchIcon,
  KeyboardArrowDown as DropdownIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Create as PencilIcon,
  MoreVert as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon as EmojiIcon,
  FilterList as FilterIcon,
  Phone as PhoneIcon,
  VideoCall as VideoCallIcon
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

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        {/* Messages Header */}
        <AppBar position="static" sx={{ bgcolor: 'white', color: '#333', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500, fontSize: '1.1rem' }}>
              Messages
            </Typography>
            <IconButton 
              color="inherit" 
              onClick={handleFilterClick}
              size="small"
            >
              <FilterIcon />
            </IconButton>
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
            </Menu>
            <IconButton color="inherit" size="small">
              <PencilIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        {/* Search Bar */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          px: 1.5,
          py: 0.5,
          mb: 2,
          height: 40
        }}>
          <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: '1.2rem' }} />
          <InputBase 
            placeholder="Search messages" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ fontSize: '0.9rem', width: '100%' }}
          />
        </Box>
        
        {/* Chat Interface */}
        <Grid container spacing={2} sx={{ height: 'calc(100vh - 220px)' }}>
          {/* Conversations List - Left Side */}
          <Grid item xs={12} sm={4} md={3} 
            sx={{ 
              height: '100%', 
              display: { xs: selectedConversation ? 'none' : 'block', sm: 'block' }
            }}
          >
            <Paper 
              sx={{ 
                borderRadius: 2, 
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ overflowY: 'auto', flex: 1 }}>
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <Box 
                      key={conversation.id} 
                      onClick={() => handleConversationSelect(conversation)}
                      sx={{ 
                        p: 2,
                        borderBottom: '1px solid #f0f0f0',
                        cursor: 'pointer',
                        bgcolor: selectedConversation?.id === conversation.id ? '#f5f5f5' : 'transparent',
                        '&:hover': { bgcolor: '#f9f9f9' }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: conversation.contact.isOnline ? '#4caf50' : 'transparent',
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              border: '2px solid white'
                            }
                          }}
                        >
                          <Avatar sx={{ width: 48, height: 48, bgcolor: '#1C392B' }}>
                            {getInitials(conversation.contact.name)}
                          </Avatar>
                        </Badge>
                        <Box sx={{ ml: 1.5, overflow: 'hidden', flex: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: conversation.unreadCount > 0 ? 600 : 400,
                                fontSize: '0.9rem'
                              }}
                            >
                              {conversation.contact.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#888', fontSize: '0.7rem' }}>
                              {formatTimestamp(conversation.lastMessage.timestamp)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: conversation.unreadCount > 0 ? '#1C392B' : '#777',
                                fontSize: '0.8rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '80%'
                              }}
                            >
                              {conversation.lastMessage.isFromUser ? 'You: ' : ''}
                              {conversation.lastMessage.text}
                            </Typography>
                            {conversation.unreadCount > 0 && (
                              <Box 
                                sx={{ 
                                  ml: 'auto', 
                                  bgcolor: '#4ECDC4', 
                                  color: 'white',
                                  borderRadius: '50%',
                                  width: 18,
                                  height: 18,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.7rem',
                                  fontWeight: 500
                                }}
                              >
                                {conversation.unreadCount}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                      No conversations found
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
          
          {/* Chat Messages - Right Side */}
          <Grid item xs={12} sm={8} md={9} 
            sx={{ 
              height: '100%',
              display: { xs: selectedConversation ? 'block' : 'none', sm: 'block' }
            }}
          >
            {selectedConversation ? (
              <Paper 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Chat Header */}
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#f9f9f9'
                  }}
                >
                  <IconButton 
                    size="small" 
                    sx={{ 
                      mr: 1, 
                      display: { xs: 'inline-flex', sm: 'none' }
                    }}
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      bgcolor: '#1C392B' 
                    }}
                  >
                    {getInitials(selectedConversation.contact.name)}
                  </Avatar>
                  <Box sx={{ ml: 1.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                      {selectedConversation.contact.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: selectedConversation.contact.isOnline ? '#4caf50' : '#888', fontSize: '0.75rem' }}>
                      {selectedConversation.contact.isOnline ? 'Online' : selectedConversation.contact.lastSeen}
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
                    <IconButton size="small">
                      <PhoneIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <VideoCallIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                {/* Messages Area */}
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
                
                {/* Message Input Area */}
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
            ) : (
              <Paper 
                sx={{ 
                  borderRadius: 2, 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#f9f9f9'
                }}
              >
                <Typography variant="h6" sx={{ color: '#888', mb: 2 }}>
                  Select a conversation to start messaging
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PencilIcon />}
                  sx={{
                    bgcolor: '#4ECDC4',
                    '&:hover': { bgcolor: '#3dbdb5' },
                    borderRadius: 20,
                    px: 3
                  }}
                >
                  Start New Conversation
                </Button>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ClientMessages; 