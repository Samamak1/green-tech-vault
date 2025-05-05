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
  ListItemText,
  Divider,
  Avatar,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  Search as SearchIcon,
  KeyboardArrowDown as DropdownIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
  Reply as ReplyIcon,
  Person as PersonIcon,
  Flag as FlagIcon,
  Event as EventIcon,
  Announcement as AnnouncementIcon
} from '@mui/icons-material';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const ClientAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock announcements data - same as what's in the image
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'Monthly Challenge!',
      category: 'Challenge',
      content: `Hello Zworpers! 

A big welcome from the GTV team to our first Monthly challenge! Here is how you get involved:

1. Gather as many recyclable electronic devices as possible during the month of April
2. Schedule a pickup with us before April 30th
3. The company with the most devices recycled wins a free team lunch!

Participating is easy and great for our planet. Remember, even small devices count - old phones, chargers, keyboards, etc.

Let's see who can make the biggest impact this month!

Best,
The GTV Team`,
      sender: 'GTV Admin',
      senderAvatar: 'G',
      recipients: 'All companies',
      sentOn: 'March 27th, 2025, 7:56pm',
      isRead: false
    },
    {
      id: '2',
      title: 'Join our Earth Day Event',
      category: 'Event',
      content: `Join us at GTV's first hosted Earth Day event! 

There will be educational booths, food trucks, and activities for the whole family. Learn about our recycling process, see demonstrations of our equipment, and find out how your recycled electronics are given new life.

Date: April 22, 2025
Time: 11:00 AM - 4:00 PM
Location: Cincinnati Central Park

Please RSVP by April 15th. Participating companies receive VIP access and special recognition during the event.

We hope to see you there!

Regards,
GTV Events Team`,
      sender: 'GTV Admin',
      senderAvatar: 'G',
      recipients: 'All registered clients',
      sentOn: 'March 27th, 2025, 7:56pm',
      isRead: true
    },
    {
      id: '3',
      title: 'Come Join Us at Columbus Conference!',
      category: 'Event',
      content: `Green Tech Vault will be speaking at the Sustainable Tech Conference in Columbus on July 3rd, 2026. 

Come listen and learn about the latest innovations in electronic recycling and sustainable technology practices. Our CEO will be giving the keynote address on "The Future of E-Waste Management."

The conference runs July 2-5, 2026 at the Columbus Convention Center. If you're interested in attending as our guest, please respond to this announcement and we'll send you registration details.

Looking forward to seeing many of our partners there!

Best regards,
GTV Marketing Team`,
      sender: 'GTV Admin',
      senderAvatar: 'G',
      recipients: 'All registered clients',
      sentOn: 'March 27th, 2025, 7:56pm',
      isRead: false
    },
    {
      id: '4',
      title: 'New Recycling Guidelines',
      category: 'Announcement',
      content: `Dear Valued Partners,

We've updated our recycling guidelines to make the process easier and more efficient. The new changes include:

- Simplified categorization of devices
- No need to remove batteries from most devices
- New packaging recommendations for fragile items

Please review the full guidelines on our portal before your next pickup. These changes are effective immediately and will help us process your recyclables faster.

Thank you for your continued partnership in making our planet greener!

Regards,
Operations Team`,
      sender: 'GTV Operations',
      senderAvatar: 'O',
      recipients: 'All clients',
      sentOn: 'March 20th, 2025, 10:23am',
      isRead: true
    },
    {
      id: '5',
      title: 'Holiday Schedule Change',
      category: 'Announcement',
      content: `Important Notice:

Please be advised that GTV will be operating on a modified schedule during the upcoming holiday season:

- December 24-26: Closed
- December 31-January 2: Closed
- All other days: Normal operations

If you have pickups scheduled during these dates, our team will contact you to reschedule. We apologize for any inconvenience and appreciate your understanding.

Happy Holidays from all of us at Green Tech Vault!

Warm regards,
GTV Management`,
      sender: 'GTV Management',
      senderAvatar: 'M',
      recipients: 'All clients',
      sentOn: 'December 1st, 2025, 9:15am',
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

  const handleCheckboxChange = (announcementId, event) => {
    event.stopPropagation();
    if (selectedAnnouncements.includes(announcementId)) {
      setSelectedAnnouncements(selectedAnnouncements.filter(id => id !== announcementId));
    } else {
      setSelectedAnnouncements([...selectedAnnouncements, announcementId]);
    }
  };

  const handleAnnouncementSelect = (announcement) => {
    // Mark as read when opened
    if (!announcement.isRead) {
      const updatedAnnouncements = announcements.map(a =>
        a.id === announcement.id ? { ...a, isRead: true } : a
      );
      setAnnouncements(updatedAnnouncements);
    }
    
    setSelectedAnnouncement(announcement);
    setIsExpanded(true);
  };

  const handleCloseAnnouncement = () => {
    setIsExpanded(false);
    setSelectedAnnouncement(null);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Event':
        return <EventIcon sx={{ fontSize: '1rem', mr: 0.5 }} />;
      case 'Challenge':
        return <FlagIcon sx={{ fontSize: '1rem', mr: 0.5 }} />;
      case 'Announcement':
      default:
        return <AnnouncementIcon sx={{ fontSize: '1rem', mr: 0.5 }} />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Event':
        return { bgcolor: '#e3f2fd', color: '#1565c0' };
      case 'Challenge':
        return { bgcolor: '#fff8e1', color: '#f57c00' };
      case 'Announcement':
      default:
        return { bgcolor: '#e8f5e9', color: '#2e7d32' };
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
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
  });

  return (
    // Use the standard content container style with correct extents
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
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
        
        {/* Grid layout for side-by-side view */}
        <Grid container spacing={2}>
          {/* Announcements List - Left Side */}
          <Grid item xs={12} md={isExpanded ? 5 : 12}>
            <Paper sx={{ 
              bgcolor: 'white', 
              borderRadius: 1, 
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              height: isExpanded ? 'calc(100vh - 180px)' : 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ 
                flex: 1, 
                overflow: 'auto',
                maxHeight: isExpanded ? 'calc(100vh - 180px)' : '55vh'
              }}>
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((announcement) => (
                    <Box 
                      key={announcement.id} 
                      onClick={() => handleAnnouncementSelect(announcement)}
                      sx={{ 
                        position: 'relative',
                        py: 1.5,
                        px: 2,
                        borderBottom: '1px solid #eee',
                        '&:last-child': { borderBottom: 'none' },
                        display: 'flex',
                        alignItems: 'flex-start',
                        bgcolor: selectedAnnouncement?.id === announcement.id ? '#f0f0f0' : announcement.isRead ? 'transparent' : '#fafafa',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#f5f5f5' }
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
                        onChange={(e) => handleCheckboxChange(announcement.id, e)}
                        sx={{ p: 0.5, mr: 1 }}
                      />
                      
                      {/* Star */}
                      <IconButton 
                        size="small" 
                        sx={{ p: 0.5, mr: 1.5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle star functionality would go here
                        }}
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
                            <IconButton 
                              size="small" 
                              sx={{ ml: 1, p: 0.5 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                // Menu options would go here
                              }}
                            >
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
                            fontWeight: announcement.isRead ? 400 : 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '90%'
                          }}
                        >
                          {announcement.content.split('\n')[0]}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No announcements found
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
          
          {/* Announcement Content - Right Side */}
          {isExpanded && selectedAnnouncement && (
            <Grid item xs={12} md={7}>
              <Paper sx={{ 
                bgcolor: 'white', 
                borderRadius: 1, 
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                height: 'calc(100vh - 180px)',
                display: 'flex',
                flexDirection: 'column',
                p: 2
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 500, mr: 2 }}>
                      {selectedAnnouncement.title}
                    </Typography>
                    <Chip 
                      icon={getCategoryIcon(selectedAnnouncement.category)}
                      label={selectedAnnouncement.category} 
                      size="small"
                      sx={{ 
                        ...getCategoryColor(selectedAnnouncement.category),
                        fontSize: '0.7rem',
                        height: 24
                      }} 
                    />
                  </Box>
                  <IconButton onClick={handleCloseAnnouncement} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ 
                  flex: 1, 
                  overflow: 'auto',
                  position: 'relative',
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          mr: 2, 
                          bgcolor: '#1C392B',
                          fontSize: '1rem'
                        }}
                      >
                        {selectedAnnouncement.senderAvatar || selectedAnnouncement.sender.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                          {selectedAnnouncement.sender}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          To: {selectedAnnouncement.recipients}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      {selectedAnnouncement.sentOn}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      whiteSpace: 'pre-line', 
                      fontSize: '0.9rem',
                      px: 1
                    }}
                  >
                    {selectedAnnouncement.content}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ClientAnnouncements; 