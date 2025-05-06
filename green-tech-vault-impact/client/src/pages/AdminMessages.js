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
  DialogActions,
  Badge,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Fab
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
  ArrowDropDown as ArrowDropDownIcon,
  Email as EmailIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';
import MessageList from '../components/messaging/MessageList';
import MessageDetail from '../components/messaging/MessageDetail';
import ComposeMessage from '../components/messaging/ComposeMessage';
import { useMessages } from '../context/MessageContext';
import { useAuth } from '../context/AuthContext';

const AdminMessages = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const { unreadCount, fetchUnreadCount, searchUsers } = useMessages();
  
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [replyData, setReplyData] = useState(null);
  const [viewMode, setViewMode] = useState('split'); // 'list', 'detail', or 'split'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0); // 0 = All, 1 = Clients, 2 = Support

  // Update unread count periodically
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    
    // If search query is at least 2 characters, search for users
    if (event.target.value.length >= 2) {
      searchUsers(event.target.value);
    }
  };

  // Handle selecting a message
  const handleSelectMessage = (messageId) => {
    setSelectedMessageId(messageId);
    
    // On mobile, switch to detail view when a message is selected
    if (isMobile) {
      setViewMode('detail');
    }
  };

  // Handle closing message detail
  const handleCloseDetail = () => {
    setSelectedMessageId(null);
    
    // On mobile, go back to list view
    if (isMobile) {
      setViewMode('list');
    }
  };

  // Handle opening compose dialog
  const handleOpenCompose = () => {
    setReplyData(null);
    setComposeOpen(true);
  };

  // Handle replying to a message
  const handleReply = (message) => {
    if (!message || !message.sender) return;
    
    setReplyData({
      recipient: message.sender,
      subject: message.subject,
      isReply: true
    });
    
    setComposeOpen(true);
  };

  return (
    <Box sx={getContentWrapperStyle()}>
      <Box sx={getContentContainerStyle()}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ mr: 1, color: '#185B5F' }} />
            <Typography variant="h6" sx={{ color: '#185B5F' }}>
              Messages
            </Typography>
            {unreadCount > 0 && (
              <Badge 
                badgeContent={unreadCount} 
                color="primary" 
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCompose}
          >
            New Message
          </Button>
        </Box>

        {/* Admin-specific search and filter bar */}
        <Paper sx={{ mb: 3, p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField 
            placeholder="Search users by name, email, or company"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              )
            }}
          />
          <Tabs 
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            sx={{ minWidth: 300 }}
          >
            <Tab label="All" />
            <Tab label="Clients" />
            <Tab label="Support" />
          </Tabs>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Paper>

        {/* Mobile view mode switcher */}
        {isMobile && selectedMessageId && (
          <Box sx={{ mb: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setViewMode('list')}
              sx={{ mr: 1 }}
            >
              Back to List
            </Button>
          </Box>
        )}

        {/* Messages UI */}
        <Grid container spacing={2} sx={{ height: 'calc(100vh - 260px)' }}>
          {/* Message List */}
          {(!isMobile || viewMode === 'list' || viewMode === 'split') && (
            <Grid item xs={12} md={4} sx={{ height: '100%' }}>
              <MessageList onSelectMessage={handleSelectMessage} />
            </Grid>
          )}
          
          {/* Divider for desktop */}
          {!isMobile && (
            <Grid item xs={0} md={0.1} sx={{ height: '100%' }}>
              <Divider orientation="vertical" sx={{ height: '100%' }} />
            </Grid>
          )}
          
          {/* Message Detail */}
          {(!isMobile || viewMode === 'detail' || viewMode === 'split') && (
            <Grid item xs={12} md={7.9} sx={{ height: '100%' }}>
              <MessageDetail 
                messageId={selectedMessageId} 
                onClose={handleCloseDetail} 
                onReply={handleReply}
              />
            </Grid>
          )}
        </Grid>

        {/* Compose Dialog */}
        <ComposeMessage 
          open={composeOpen} 
          onClose={() => setComposeOpen(false)}
          initialRecipient={replyData?.recipient}
          initialSubject={replyData?.subject}
          isReply={replyData?.isReply}
        />

        {/* Floating Action Button for mobile */}
        {isMobile && (
          <Fab 
            color="primary" 
            aria-label="compose" 
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={handleOpenCompose}
          >
            <AddIcon />
          </Fab>
        )}
      </Box>
    </Box>
  );
};

export default AdminMessages; 