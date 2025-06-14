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

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);

  // Mock announcements data
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
      content: 'RYGNeco will be speaking at a confrence in Columbus 07/03/2026. Come listen and learn about the...',
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
    <Box sx={{ 
      pl: 3,
      pr: 3,
      pt: 3,
      pb: 3,
      ml: 0,
      mr: 0
    }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Announcements</Typography>
      
      {/* Search and Filter */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
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
      
      {/* Announcements List */}
      <Paper sx={{ p: 2, mb: 4 }}>
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
                p: 2, 
                borderBottom: '1px solid #eee',
                '&:last-child': { borderBottom: 'none' },
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Checkbox 
                size="small" 
                checked={selectedAnnouncements.includes(announcement.id)}
                onChange={() => handleCheckboxChange(announcement.id)}
                sx={{ mt: -0.5, mr: 1 }}
              />
              <StarIcon 
                sx={{ 
                  color: '#ccc', 
                  '&:hover': { color: '#FFB400' },
                  mr: 1,
                  mt: -0.5,
                  cursor: 'pointer',
                  fontSize: '1.3rem'
                }} 
              />
              <Box 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  bgcolor: '#f0f0f0', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                <img 
                  src="/placeholder-image.jpg" 
                  alt="Placeholder" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23999'%3Eimg%3C/text%3E%3C/svg%3E";
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: announcement.isRead ? 'normal' : 'bold' }}>
                    {announcement.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {announcement.isRead ? null : (
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
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      Sent on:
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 0.5, fontSize: '0.8rem' }}>
                      {announcement.sentOn}
                    </Typography>
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
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
  );
};

export default Announcements; 