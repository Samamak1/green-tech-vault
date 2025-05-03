import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  InputBase,
  Button,
  Checkbox,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Search as SearchIcon,
  KeyboardArrowDown as DropdownIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const ClientAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);

  // Mock announcements data - same as what's in the image
  const [announcements] = useState([
    {
      id: '1',
      title: 'Monthly Challenge!',
      category: 'All',
      content: 'Hello Zworpers! A big welcome from the GTV team to our first Monthly challenge! Here is how you get...',
      sender: 'GTV Admin',
      recipients: 'All',
      sentOn: 'March 27th, 2025, 7:56pm',
      isRead: false
    },
    {
      id: '2',
      title: 'Event',
      category: 'Event',
      content: 'Join us at GTV\'s first hosted event. There will be educational booths, food...',
      sender: 'GTV Admin',
      recipients: 'Usernames',
      sentOn: 'March 27th, 2025, 7:56pm',
      isRead: true
    },
    {
      id: '3',
      title: 'Come Join Us!',
      category: 'Event',
      content: 'Green Tech Vault will be speaking at a confrence in Columbus 07/03/2026. Come listen and learn about the...',
      sender: 'GTV Admin',
      recipients: 'usernames',
      sentOn: 'March 27th, 2025, 7:56pm',
      isRead: false
    },
    {
      id: '4',
      title: 'Title',
      category: 'Announcement',
      content: 'This will be the first sentence of the message/announcement, once it gets to long it will be followed with a ...',
      sender: 'Participants',
      recipients: 'All',
      sentOn: 'March 27th, 2025, 7:56pm',
      isRead: true
    },
    {
      id: '5',
      title: 'Title',
      category: 'Announcement',
      content: 'This will be the first sentence of the message/announcement, once it gets to long it will be followed with a ...',
      sender: 'Participants',
      recipients: 'All',
      sentOn: 'March 27th, 2025, 7:56pm',
      isRead: true
    }
  ]);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (newFilter) => {
    setFilter(newFilter);
    handleFilterClose();
  };

  const handleCheckboxChange = (announcementId) => {
    if (selectedAnnouncements.includes(announcementId)) {
      setSelectedAnnouncements(selectedAnnouncements.filter(id => id !== announcementId));
    } else {
      setSelectedAnnouncements([...selectedAnnouncements, announcementId]);
    }
  };

  return (
    // Extend the content all the way to match the red lines in screenshot
    <Box sx={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw', // Full viewport width
      height: 'calc(100vh - 64px)', // Account for header height
      pl: 0, 
      pr: 0,
      margin: 0,
      marginTop: '64px', // Start below header
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '12px',
        position: 'absolute',
        right: 0
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '6px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(0,0,0,0.03)',
      },
    }} data-boundary="true">
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Announcements</Typography>
        
        {/* Search and Filter */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search bar - shorter, aligned left */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            px: 1.5,
            py: 0.5,
            height: 32, // Match filter dropdown height
            maxWidth: '300px', // Shorter width
            width: '40%'
          }}>
            <SearchIcon sx={{ color: '#aaa', mr: 1, fontSize: '1.2rem' }} />
            <InputBase 
              placeholder="Search here" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ fontSize: '0.9rem', width: '100%' }}
            />
          </Box>
          
          {/* Filter dropdown - aligned right */}
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
              <ListItemText>All</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Event')}>
              <ListItemText>Event</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Challenge')}>
              <ListItemText>Challenge</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Announcement')}>
              <ListItemText>Announcement</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
        
        {/* Announcements List - styled to match the screenshot */}
        <Paper sx={{ 
          bgcolor: 'white', 
          borderRadius: 1, 
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {announcements
            .filter(announcement => {
              // Filter based on selected filter
              if (filter !== 'All' && announcement.category !== filter) {
                return false;
              }
              
              // Filter based on search term
              if (searchTerm && !announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
                  !announcement.content.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
              }
              
              return true;
            })
            .map((announcement) => (
              <Box 
                key={announcement.id} 
                sx={{ 
                  position: 'relative',
                  py: 1.5,
                  px: 2,
                  borderBottom: '1px solid #eee',
                  '&:last-child': { borderBottom: 'none' },
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: announcement.isRead ? 'transparent' : '#fafafa'
                }}
              >
                {/* Unread indicator */}
                {!announcement.isRead && (
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
                  checked={selectedAnnouncements.includes(announcement.id)}
                  onChange={() => handleCheckboxChange(announcement.id)}
                  sx={{ p: 0.5, mr: 1 }}
                />
                
                {/* Star */}
                <IconButton 
                  size="small" 
                  sx={{ p: 0.5, mr: 1.5 }}
                >
                  <StarBorderIcon 
                    sx={{ 
                      color: '#bbb', 
                      fontSize: '1.1rem',
                      '&:hover': { color: '#FFB400' },
                    }} 
                  />
                </IconButton>
                
                {/* Main content */}
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        component="span"
                        sx={{ 
                          fontSize: '0.9rem',
                          fontWeight: announcement.isRead ? 400 : 600 
                        }}
                      >
                        {announcement.title}
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
                        {announcement.sender}
                      </Typography>
                      {announcement.recipients && (
                        <Typography 
                          variant="body2" 
                          component="span"
                          sx={{ 
                            fontSize: '0.85rem',
                            color: '#888',
                            ml: 1
                          }}
                        >
                          {announcement.recipients}
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, ml: 2 }}>
                      {!announcement.isRead && (
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
                        Sent on:
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          ml: 0.5, 
                          fontSize: '0.75rem',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {announcement.sentOn}
                      </Typography>
                      <IconButton size="small" sx={{ ml: 1, p: 0.5 }}>
                        <MoreVertIcon sx={{ fontSize: '1.1rem' }} />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#555', 
                      mt: 0.5,
                      fontSize: '0.85rem',
                      fontWeight: announcement.isRead ? 400 : 500
                    }}
                  >
                    {announcement.content}
                  </Typography>
                </Box>
              </Box>
            ))}
            
          {announcements.filter(a => 
            (filter === 'All' || a.category === filter) && 
            (!searchTerm || a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             a.content.toLowerCase().includes(searchTerm.toLowerCase()))
          ).length === 0 && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No announcements found
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ClientAnnouncements; 