import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  AppBar,
  Toolbar,
  FormGroup,
  FormControlLabel,
  Switch,
  ButtonGroup
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { pickupAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AdminLayout from '../components/layout/AdminLayout';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Event styling function
const eventStyleGetter = (event) => {
  let style = {
    backgroundColor: '#1C392B',
    color: 'white',
    borderRadius: '3px',
    border: 'none',
    padding: '2px 5px'
  };

  if (event.status === 'completed') {
    style.backgroundColor = '#4caf50'; // Green for completed
  } else if (event.status === 'processing') {
    style.backgroundColor = '#ff9800'; // Orange for processing
  } else if (event.status === 'scheduled') {
    style.backgroundColor = '#2196f3'; // Blue for scheduled
  }

  return {
    style
  };
};

// Custom event component
const EventComponent = ({ event }) => (
  <Box sx={{ fontSize: '0.85rem', padding: '2px' }}>
    <strong>{event.clientName}</strong>
    <br />
    {event.location}
  </Box>
);

const AdminPickupCalendar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [events, setEvents] = useState([]);
  const [clients, setClients] = useState([]);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [calendarView, setCalendarView] = useState('month');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    scheduledDate: '',
    location: '',
    contactPerson: '',
    contactPhone: '',
    notes: ''
  });
  
  // Calendar filters
  const [calendarFilters, setCalendarFilters] = useState({
    pickups: true,
    deliveries: true,
    gtvEvents: true,
    internalEvents: true,
    promotions: false,
    challenges: false
  });
  
  // Selected day
  const [selectedDay, setSelectedDay] = useState(27);
  
  // Event type colors
  const eventColors = {
    pickup: '#1C392B',
    delivery: '#379683',
    gtvEvent: '#1D3557',
    internalEvent: '#F6AE2D',
    promotion: '#F26419',
    challenge: '#E63946'
  };

  useEffect(() => {
    fetchPickups();
    fetchClients();
    fetchAllEvents();
  }, [currentMonth, currentYear, calendarFilters]);

  const fetchPickups = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, this would be an actual API call
      // For now, we'll use mock data
      
      // Mock pickups data
      const mockPickups = [
        {
          id: '1',
          clientId: '1',
          clientName: 'Tech Solutions Inc.',
          scheduledDate: '2025-03-15',
          location: 'Corporate HQ',
          contactPerson: 'John Smith',
          contactPhone: '(555) 123-4567',
          status: 'completed',
          devices: 12,
          weight: 45.2,
          createdAt: '2025-03-01T12:00:00Z',
          updatedAt: '2025-03-15T16:30:00Z'
        },
        {
          id: '2',
          clientId: '2',
          clientName: 'Global Innovations',
          scheduledDate: '2025-03-20',
          location: 'Main Office',
          contactPerson: 'Sarah Johnson',
          contactPhone: '(555) 987-6543',
          status: 'scheduled',
          devices: 0,
          weight: 0,
          createdAt: '2025-03-05T09:15:00Z',
          updatedAt: '2025-03-05T09:15:00Z'
        },
        {
          id: '3',
          clientId: '3',
          clientName: 'EcoFriendly Corp',
          scheduledDate: '2025-03-10',
          location: 'Warehouse',
          contactPerson: 'Michael Brown',
          contactPhone: '(555) 456-7890',
          status: 'completed',
          devices: 15,
          weight: 78.3,
          createdAt: '2025-02-25T14:30:00Z',
          updatedAt: '2025-03-10T17:45:00Z'
        },
        {
          id: '4',
          clientId: '1',
          clientName: 'Tech Solutions Inc.',
          scheduledDate: '2025-03-25',
          location: 'Branch Office',
          contactPerson: 'John Smith',
          contactPhone: '(555) 123-4567',
          status: 'scheduled',
          devices: 0,
          weight: 0,
          createdAt: '2025-03-10T14:00:00Z',
          updatedAt: '2025-03-10T14:00:00Z'
        },
        {
          id: '5',
          clientId: '2',
          clientName: 'Global Innovations',
          scheduledDate: '2025-04-05',
          location: 'Data Center',
          contactPerson: 'Sarah Johnson',
          contactPhone: '(555) 987-6543',
          status: 'scheduled',
          devices: 0,
          weight: 0,
          createdAt: '2025-03-15T10:30:00Z',
          updatedAt: '2025-03-15T10:30:00Z'
        }
      ];
      
      setPickups(mockPickups);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load pickups');
      console.error('Pickups fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      // Mock clients data
      const mockClients = [
        {
          id: '1',
          name: 'Tech Solutions Inc.'
        },
        {
          id: '2',
          name: 'Global Innovations'
        },
        {
          id: '3',
          name: 'EcoFriendly Corp'
        }
      ];
      
      setClients(mockClients);
    } catch (err) {
      console.error('Clients fetch error:', err);
    }
  };
  
  const fetchAllEvents = () => {
    // Mock events for all calendar types
    const mockEvents = [
      // Pickups
      {
        id: 'p1',
        title: 'Pickup: Tech Solutions Inc.',
        start: new Date(2025, 2, 5),
        end: new Date(2025, 2, 5),
        clientName: 'Tech Solutions Inc.',
        location: 'Corporate HQ',
        type: 'pickup',
        resourceId: 'pickup'
      },
      {
        id: 'p2',
        title: 'Pickup: Global Innovations',
        start: new Date(2025, 2, 27),
        end: new Date(2025, 2, 27),
        clientName: 'Global Innovations',
        location: 'Main Office',
        type: 'pickup',
        resourceId: 'pickup'
      },
      
      // Deliveries
      {
        id: 'd1',
        title: 'Delivery: ECO Corp',
        start: new Date(2025, 2, 7),
        end: new Date(2025, 2, 7),
        clientName: 'ECO Corp',
        location: 'Warehouse',
        type: 'delivery',
        resourceId: 'delivery'
      },
      {
        id: 'd2',
        title: 'Delivery: Tech Solutions',
        start: new Date(2025, 2, 14),
        end: new Date(2025, 2, 14),
        clientName: 'Tech Solutions Inc.',
        location: 'Branch Office',
        type: 'delivery',
        resourceId: 'delivery'
      },
      
      // GTV Events
      {
        id: 'g1',
        title: 'Recycling Workshop',
        start: new Date(2025, 2, 9),
        end: new Date(2025, 2, 9),
        location: 'Main Office',
        type: 'gtvEvent',
        resourceId: 'gtvEvent'
      },
      {
        id: 'g2',
        title: 'Sustainability Summit',
        start: new Date(2025, 2, 17),
        end: new Date(2025, 2, 17),
        location: 'Convention Center',
        type: 'gtvEvent',
        resourceId: 'gtvEvent'
      },
      
      // Internal Events
      {
        id: 'i1',
        title: 'Staff Training',
        start: new Date(2025, 2, 19),
        end: new Date(2025, 2, 19),
        location: 'Head Office',
        type: 'internalEvent',
        resourceId: 'internalEvent'
      },
      {
        id: 'i2',
        title: 'Team Meeting',
        start: new Date(2025, 2, 27),
        end: new Date(2025, 2, 27),
        location: 'Conference Room B',
        type: 'internalEvent',
        resourceId: 'internalEvent'
      },
      
      // Promotions
      {
        id: 'pr1',
        title: 'Earth Day Campaign',
        start: new Date(2025, 2, 22),
        end: new Date(2025, 2, 22),
        location: 'Online',
        type: 'promotion',
        resourceId: 'promotion'
      },
      
      // Challenges
      {
        id: 'c1',
        title: 'Recycling Challenge',
        start: new Date(2025, 2, 25),
        end: new Date(2025, 2, 25),
        location: 'All Branches',
        type: 'challenge',
        resourceId: 'challenge'
      }
    ];
    
    // Filter events based on selected calendar filters
    const filteredEvents = mockEvents.filter(event => {
      if (event.type === 'pickup' && calendarFilters.pickups) return true;
      if (event.type === 'delivery' && calendarFilters.deliveries) return true;
      if (event.type === 'gtvEvent' && calendarFilters.gtvEvents) return true;
      if (event.type === 'internalEvent' && calendarFilters.internalEvents) return true;
      if (event.type === 'promotion' && calendarFilters.promotions) return true;
      if (event.type === 'challenge' && calendarFilters.challenges) return true;
      return false;
    });
    
    setEvents(filteredEvents);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const handleOpenDialog = () => {
    setFormData({
      clientId: '',
      scheduledDate: new Date().toISOString().split('T')[0],
      location: '',
      contactPerson: '',
      contactPhone: '',
      notes: ''
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // In a real implementation, this would make an API call
    const newPickup = {
      id: Date.now().toString(),
      clientId: formData.clientId,
      clientName: clients.find(client => client.id === formData.clientId)?.name || '',
      scheduledDate: formData.scheduledDate,
      location: formData.location,
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone,
      notes: formData.notes,
      status: 'scheduled',
      devices: 0,
      weight: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setPickups([...pickups, newPickup]);
    handleCloseDialog();
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleSelectEvent = (event) => {
    // Navigate to the pickup detail page
    navigate(`/admin/pickups/${event.id}`);
  };

  const handleFilterChange = (event) => {
    setCalendarFilters({
      ...calendarFilters,
      [event.target.name]: event.target.checked
    });
  };

  const handleViewChange = (view) => {
    setCalendarView(view);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const renderCalendarContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={() => fetchPickups()}>
            Retry
          </Button>
        </Box>
      );
    }
    
    // Days array for the mini calendar
    const days = [];
    const daysInMonth = new Date(2025, 3, 0).getDate(); // April 2025 has 30 days
    const firstDayOfMonth = new Date(2025, 3, 1).getDay(); // April 1, 2025 is a Tuesday (2)
    
    // Add previous month days
    const prevMonthDays = new Date(2025, 2, 0).getDate(); // March 2025 has 31 days
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({
        day: prevMonthDays - firstDayOfMonth + i + 1,
        month: 2, // March
        isCurrentMonth: false
      });
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: 3, // April
        isCurrentMonth: true
      });
    }
    
    // Add next month days
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: 4, // May
        isCurrentMonth: false
      });
    }
  
    return (
      <>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBackIcon />} 
              onClick={() => navigate('/admin/dashboard')}
              sx={{ 
                mr: 2,
                color: '#888',
                borderColor: '#d0d0d0',
                textTransform: 'none'
              }}
            >
              Back to Dashboard
            </Button>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Pickup Calendar
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{ 
              bgcolor: '#1C392B', 
              '&:hover': { bgcolor: '#152b21' },
              textTransform: 'none'
            }}
          >
            Schedule Pickup
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2, mb: 3, height: 'calc(100vh - 200px)' }}>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={handlePrevMonth} size="small">
                    <ChevronLeftIcon />
                  </IconButton>
                  
                  <Typography variant="h6" sx={{ mx: 2 }}>
                    April 2025
                  </Typography>
                  
                  <IconButton onClick={handleNextMonth} size="small">
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
                
                <ButtonGroup variant="outlined" size="small">
                  <Button 
                    onClick={() => handleViewChange('today')}
                    sx={{ 
                      color: '#666',
                      borderColor: '#d0d0d0',
                      textTransform: 'none'
                    }}
                  >
                    Today
                  </Button>
                  <Button 
                    onClick={() => handleViewChange('back')}
                    sx={{ 
                      color: '#666',
                      borderColor: '#d0d0d0',
                      textTransform: 'none'
                    }}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => handleViewChange('next')}
                    sx={{ 
                      color: '#666',
                      borderColor: '#d0d0d0',
                      textTransform: 'none'
                    }}
                  >
                    Next
                  </Button>
                </ButtonGroup>
                
                <ButtonGroup variant="outlined" size="small">
                  <Button 
                    onClick={() => handleViewChange('month')}
                    variant={calendarView === 'month' ? 'contained' : 'outlined'}
                    sx={{ 
                      color: calendarView === 'month' ? '#fff' : '#666',
                      bgcolor: calendarView === 'month' ? '#1C392B' : 'transparent',
                      borderColor: '#d0d0d0',
                      textTransform: 'none',
                      '&:hover': { bgcolor: calendarView === 'month' ? '#152b21' : 'rgba(0,0,0,0.04)' }
                    }}
                  >
                    Month
                  </Button>
                  <Button 
                    onClick={() => handleViewChange('week')}
                    variant={calendarView === 'week' ? 'contained' : 'outlined'}
                    sx={{ 
                      color: calendarView === 'week' ? '#fff' : '#666',
                      bgcolor: calendarView === 'week' ? '#1C392B' : 'transparent',
                      borderColor: '#d0d0d0',
                      textTransform: 'none',
                      '&:hover': { bgcolor: calendarView === 'week' ? '#152b21' : 'rgba(0,0,0,0.04)' }
                    }}
                  >
                    Week
                  </Button>
                  <Button 
                    onClick={() => handleViewChange('day')}
                    variant={calendarView === 'day' ? 'contained' : 'outlined'}
                    sx={{ 
                      color: calendarView === 'day' ? '#fff' : '#666',
                      bgcolor: calendarView === 'day' ? '#1C392B' : 'transparent',
                      borderColor: '#d0d0d0',
                      textTransform: 'none',
                      '&:hover': { bgcolor: calendarView === 'day' ? '#152b21' : 'rgba(0,0,0,0.04)' }
                    }}
                  >
                    Day
                  </Button>
                  <Button 
                    onClick={() => handleViewChange('agenda')}
                    variant={calendarView === 'agenda' ? 'contained' : 'outlined'}
                    sx={{ 
                      color: calendarView === 'agenda' ? '#fff' : '#666',
                      bgcolor: calendarView === 'agenda' ? '#1C392B' : 'transparent',
                      borderColor: '#d0d0d0',
                      textTransform: 'none',
                      '&:hover': { bgcolor: calendarView === 'agenda' ? '#152b21' : 'rgba(0,0,0,0.04)' }
                    }}
                  >
                    Agenda
                  </Button>
                </ButtonGroup>
              </Box>
              
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day', 'agenda']}
                style={{ height: 'calc(100% - 40px)' }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelectEvent}
                components={{
                  event: EventComponent
                }}
              />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
            {/* Mini calendar */}
            <Paper sx={{ p: 2, borderRadius: 1, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <IconButton size="small">
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  March 2025
                </Typography>
                <IconButton size="small">
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Box>
              
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Grid container>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                      <Grid item xs align="center" key={day}>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          {day}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                
                {/* First week - previous month (February) */}
                <Grid item xs={12}>
                  <Grid container>
                    {[25, 26, 27, 28, 29, 1, 2].map(day => (
                      <Grid item xs align="center" key={day}>
                        <Box 
                          sx={{ 
                            p: 0.5, 
                            m: 0.5,
                            color: day > 24 ? '#aaa' : 'inherit',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#f5f5f5' },
                            ...(day === 27 && day > 24 && { 
                              bgcolor: '#4ECDC4', 
                              color: 'white'
                            })
                          }}
                          onClick={() => handleDayClick(day)}
                        >
                          <Typography variant="caption">{day}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                
                {/* Weeks 2-5 */}
                {[
                  [3, 4, 5, 6, 7, 8, 9],
                  [10, 11, 12, 13, 14, 15, 16],
                  [17, 18, 19, 20, 21, 22, 23],
                  [24, 25, 26, 27, 28, 29, 30],
                  [31, 1, 2, 3, 4, 5, 6]
                ].map((week, weekIndex) => (
                  <Grid item xs={12} key={weekIndex}>
                    <Grid container>
                      {week.map(day => (
                        <Grid item xs align="center" key={day}>
                          <Box 
                            sx={{ 
                              p: 0.5, 
                              m: 0.5,
                              color: (day < 3 && weekIndex === 4) || (day > 27 && weekIndex === 0) ? '#aaa' : 'inherit',
                              borderRadius: '50%',
                              width: 24,
                              height: 24,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              '&:hover': { bgcolor: '#f5f5f5' },
                              ...(day === selectedDay && !(day < 3 && weekIndex === 4) && !(day > 27 && weekIndex === 0) && { 
                                bgcolor: '#4ECDC4', 
                                color: 'white'
                              })
                            }}
                            onClick={() => handleDayClick(day)}
                          >
                            <Typography variant="caption">{day}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Paper>
            
            {/* Calendar filters */}
            <Paper sx={{ p: 2, borderRadius: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Calendars</Typography>
              
              <FormGroup>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.pickups} 
                        onChange={handleFilterChange} 
                        name="pickups" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: eventColors.pickup },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: eventColors.pickup }
                        }}
                      />
                    } 
                    label="Pickups" 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: eventColors.pickup, mr: 1 }} />
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.deliveries} 
                        onChange={handleFilterChange} 
                        name="deliveries" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: eventColors.delivery },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: eventColors.delivery }
                        }}
                      />
                    } 
                    label="Deliveries" 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: eventColors.delivery, mr: 1 }} />
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.gtvEvents} 
                        onChange={handleFilterChange} 
                        name="gtvEvents" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: eventColors.gtvEvent },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: eventColors.gtvEvent }
                        }}
                      />
                    } 
                    label="GTV Events" 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: eventColors.gtvEvent, mr: 1 }} />
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.internalEvents} 
                        onChange={handleFilterChange} 
                        name="internalEvents" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: eventColors.internalEvent },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: eventColors.internalEvent }
                        }}
                      />
                    } 
                    label="Internal Events" 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: eventColors.internalEvent, mr: 1 }} />
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.promotions} 
                        onChange={handleFilterChange} 
                        name="promotions" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: eventColors.promotion },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: eventColors.promotion }
                        }}
                      />
                    } 
                    label="Promotions" 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: eventColors.promotion, mr: 1 }} />
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.challenges} 
                        onChange={handleFilterChange} 
                        name="challenges" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: eventColors.challenge },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: eventColors.challenge }
                        }}
                      />
                    } 
                    label="Challenges" 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: eventColors.challenge, mr: 1 }} />
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </FormGroup>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Schedule Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            Schedule New Pickup
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Client"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleFormChange}
                  required
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Scheduled Date"
                  name="scheduledDate"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={handleFormChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Person"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Phone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={!formData.clientId || !formData.scheduledDate || !formData.location}
            >
              Schedule
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <AdminLayout>
      {renderCalendarContent()}
    </AdminLayout>
  );
};

export default AdminPickupCalendar; 