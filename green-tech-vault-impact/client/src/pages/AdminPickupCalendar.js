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
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

// Custom CSS for calendar scaling
const calendarStyles = {
  '.rbc-toolbar': {
    fontSize: '0.75rem',
  },
  '.rbc-toolbar button': {
    padding: '3px 6px',
    fontSize: '0.75rem',
  },
  '.rbc-header': {
    padding: '3px 3px',
    fontSize: '0.75rem',
  },
  '.rbc-event': {
    fontSize: '0.75rem',
  },
  '.rbc-time-header-content': {
    fontSize: '0.75rem',
  },
  '.rbc-time-view .rbc-header': {
    fontSize: '0.75rem',
  },
  '.rbc-time-content': {
    fontSize: '0.75rem',
  },
  '.rbc-time-gutter': {
    fontSize: '0.75rem',
  },
  '.rbc-agenda-view table.rbc-agenda-table': {
    fontSize: '0.75rem',
  },
  '.rbc-row-segment .rbc-event-content': {
    fontSize: '0.75rem',
  },
  '.rbc-date-cell': {
    fontSize: '0.75rem',
  },
  '.rbc-month-view': {
    fontSize: '0.75rem',
  },
  '.rbc-btn-group button': {
    fontSize: '0.75rem',
  },
  '.rbc-calendar': {
    fontSize: '0.75rem',
  }
};

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Format dates for calendar events
const formatEventDates = (events) => {
  return events.map(event => ({
    ...event,
    start: new Date(event.scheduledDate),
    end: new Date(event.scheduledDate)
  }));
};

// Custom event component
const EventComponent = ({ event }) => (
  <Box sx={{ fontSize: '0.7rem', padding: '1px', lineHeight: 1.1 }}>
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
  
  // Selected day (in this case, we're highlighting the 27th to match the image)
  const [selectedDay, setSelectedDay] = useState(27);
  
  const [mockEvents, setMockEvents] = useState([]);
  
  const [miniCalendarMonth, setMiniCalendarMonth] = useState(new Date().getMonth());
  const [miniCalendarYear, setMiniCalendarYear] = useState(new Date().getFullYear());
  const [currentDay] = useState(new Date().getDate()); // Current day for highlighting
  
  // Event styling function moved inside the component to access calendarFilters
  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: '#1C392B',
      color: 'white',
      borderRadius: '3px',
      border: 'none',
      padding: '2px 5px'
    };

    // Color events based on their type
    if (event.type === 'pickup') {
      style.backgroundColor = '#1C392B'; // Dark green for pickups
    } else if (event.type === 'delivery') {
      style.backgroundColor = '#379683'; // Medium green for deliveries
    } else if (event.type === 'gtv') {
      style.backgroundColor = '#1D3557'; // Navy blue for GTV events
    } else if (event.type === 'internal') {
      style.backgroundColor = '#F6AE2D'; // Yellow for internal events
    } else if (event.type === 'promotion') {
      style.backgroundColor = '#F26419'; // Orange for promotions
    } else if (event.type === 'challenge') {
      style.backgroundColor = '#E63946'; // Red for challenges
    }

    // If the event type is filtered out, don't display it
    if ((event.type === 'pickup' && !calendarFilters.pickups) ||
        (event.type === 'delivery' && !calendarFilters.deliveries) ||
        (event.type === 'gtv' && !calendarFilters.gtvEvents) ||
        (event.type === 'internal' && !calendarFilters.internalEvents) ||
        (event.type === 'promotion' && !calendarFilters.promotions) ||
        (event.type === 'challenge' && !calendarFilters.challenges)) {
      style.display = 'none';
    }

    return {
      style
    };
  };

  useEffect(() => {
    fetchPickups();
    fetchClients();
  }, [currentMonth, currentYear]);
  
  useEffect(() => {
    // Generate mock events when pickups data is available
    if (pickups.length > 0) {
      generateMockEvents();
    }
  }, [pickups]);

  useEffect(() => {
    // Apply custom CSS for calendar scaling
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .rbc-toolbar { font-size: 0.7rem !important; }
      .rbc-toolbar button { padding: 2px 4px !important; font-size: 0.7rem !important; }
      .rbc-header { padding: 2px 2px !important; font-size: 0.7rem !important; }
      .rbc-event { font-size: 0.7rem !important; }
      .rbc-time-header-content { font-size: 0.7rem !important; }
      .rbc-time-view .rbc-header { font-size: 0.7rem !important; }
      .rbc-time-content { font-size: 0.7rem !important; }
      .rbc-time-gutter { font-size: 0.7rem !important; }
      .rbc-agenda-view table.rbc-agenda-table { font-size: 0.7rem !important; }
      .rbc-row-segment .rbc-event-content { font-size: 0.7rem !important; }
      .rbc-date-cell { font-size: 0.7rem !important; }
      .rbc-month-view { font-size: 0.7rem !important; }
      .rbc-btn-group button { font-size: 0.7rem !important; }
      .rbc-calendar { font-size: 0.7rem !important; }
      .rbc-toolbar .rbc-toolbar-label { font-size: 0.8rem !important; }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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

  const handleViewChange = (newView) => {
    try {
      console.log(`Changing view to: ${newView}`);
      setCalendarView(newView);
      
      // Ensure we have a valid date when switching views
      const validDate = moment(currentDate).isValid() 
        ? currentDate 
        : new Date();
        
      setCurrentDate(validDate);
    } catch (error) {
      console.error('Error changing calendar view:', error);
      // Fallback to 'month' view if there's an error
      setCalendarView('month');
      setCurrentDate(new Date());
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    
    // Create a new date based on the selected day
    const newDate = new Date(currentYear, currentMonth, day);
    setCurrentDate(newDate);
    
    // Navigate to day view and show that specific date
    setCalendarView('day');
  };

  // Generate mock events for different calendar types
  const generateMockEvents = () => {
    const formatEvents = (events) => {
      return events.map(event => {
        // Parse date strings to actual Date objects
        const date = new Date(event.scheduledDate);
        return {
          ...event,
          // Ensure we have valid date objects
          start: date,
          end: date
        };
      });
    };

    const events = [
      // Pickups (from the existing pickups data)
      ...pickups.map(pickup => ({
        ...pickup,
        type: 'pickup',
        title: `Pickup: ${pickup.clientName}`,
      })),
      
      // Additional event types
      {
        id: 'del1',
        title: 'Delivery',
        clientName: 'Global Innovations',
        location: 'Data Center',
        scheduledDate: '2025-04-07',
        type: 'delivery'
      },
      {
        id: 'del2',
        title: 'Delivery',
        clientName: 'Tech Solutions Inc.',
        location: 'Corporate HQ',
        scheduledDate: '2025-04-14',
        type: 'delivery'
      },
      {
        id: 'del3',
        title: 'Delivery',
        clientName: 'EcoFriendly Corp',
        location: 'Warehouse',
        scheduledDate: '2025-04-21',
        type: 'delivery'
      },
      {
        id: 'del4',
        title: 'Delivery',
        clientName: 'Tech Solutions Inc.',
        location: 'Branch Office',
        scheduledDate: '2025-04-28',
        type: 'delivery'
      },
      {
        id: 'gtv1',
        title: 'GTV Event',
        clientName: 'Earth Day Celebration',
        location: 'City Park',
        scheduledDate: '2025-04-09',
        type: 'gtv'
      },
      {
        id: 'gtv2',
        title: 'GTV Event',
        clientName: 'Recycling Workshop',
        location: 'Convention Center',
        scheduledDate: '2025-04-17',
        type: 'gtv'
      },
      {
        id: 'gtv3',
        title: 'GTV Event',
        clientName: 'Sustainability Conference',
        location: 'Grand Hotel',
        scheduledDate: '2025-04-24',
        type: 'gtv'
      },
      {
        id: 'int1',
        title: 'Internal Event',
        clientName: 'Team Meeting',
        location: 'HQ Conference Room',
        scheduledDate: '2025-04-11',
        type: 'internal'
      },
      {
        id: 'int2',
        title: 'Internal Event',
        clientName: 'Strategy Planning',
        location: 'Remote',
        scheduledDate: '2025-04-18',
        type: 'internal'
      },
      {
        id: 'promo1',
        title: 'Promotion',
        clientName: 'Spring Discount Campaign',
        location: 'Online',
        scheduledDate: '2025-04-01',
        type: 'promotion'
      },
      {
        id: 'challenge1',
        title: 'Challenge',
        clientName: '30-Day Recycling Challenge',
        location: 'All Clients',
        scheduledDate: '2025-04-15',
        type: 'challenge'
      }
    ];
    
    setMockEvents(formatEvents(events));
  };
  
  // Function to get filtered events based on current filters
  const getFilteredEvents = () => {
    // First filter based on type
    const filtered = mockEvents.filter(event => {
      if (event.type === 'pickup' && !calendarFilters.pickups) return false;
      if (event.type === 'delivery' && !calendarFilters.deliveries) return false;
      if (event.type === 'gtv' && !calendarFilters.gtvEvents) return false;
      if (event.type === 'internal' && !calendarFilters.internalEvents) return false;
      if (event.type === 'promotion' && !calendarFilters.promotions) return false;
      if (event.type === 'challenge' && !calendarFilters.challenges) return false;
      return true;
    });
    
    // Format dates properly for the calendar component
    return formatEventDates(filtered);
  };

  const handleMiniCalendarPrev = () => {
    // Move to previous month
    const newMonth = miniCalendarMonth === 0 ? 11 : miniCalendarMonth - 1;
    const newYear = miniCalendarMonth === 0 ? miniCalendarYear - 1 : miniCalendarYear;
    setMiniCalendarMonth(newMonth);
    setMiniCalendarYear(newYear);
  };
  
  const handleMiniCalendarNext = () => {
    // Move to next month
    const newMonth = miniCalendarMonth === 11 ? 0 : miniCalendarMonth + 1;
    const newYear = miniCalendarMonth === 11 ? miniCalendarYear + 1 : miniCalendarYear;
    setMiniCalendarMonth(newMonth);
    setMiniCalendarYear(newYear);
  };

  // Function to get month name
  const getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
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
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 500, fontSize: '1rem' }}>
              Calendar
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate('/admin/schedule-pickup')}
            sx={{ 
              bgcolor: '#62CBD0', // Light A color
              '&:hover': { bgcolor: '#50B9BE' },
              textTransform: 'none',
              fontSize: '0.7rem',
              py: 0.6,
              px: 1.5,
              height: '32px'
            }}
          >
            Schedule Pickup
          </Button>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 1.5, mb: 2, height: 'calc(100vh - 180px)', overflow: 'hidden' }}>
              <Calendar
                localizer={localizer}
                events={getFilteredEvents()}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day', 'agenda']}
                view={calendarView}
                onView={handleViewChange}
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                style={{ height: 'calc(100% - 10px)' }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelectEvent}
                components={{
                  event: EventComponent
                }}
                defaultView="month"
                popup={true}
                selectable={true}
              />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
            {/* Mini calendar */}
            <Paper sx={{ p: 1.5, borderRadius: 1, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <IconButton size="small" onClick={handleMiniCalendarPrev} sx={{ padding: 0.5 }}>
                  <ChevronLeftIcon fontSize="small" sx={{ fontSize: '0.9rem' }} />
                </IconButton>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                  {getMonthName(miniCalendarMonth)} {miniCalendarYear}
                </Typography>
                <IconButton size="small" onClick={handleMiniCalendarNext} sx={{ padding: 0.5 }}>
                  <ChevronRightIcon fontSize="small" sx={{ fontSize: '0.9rem' }} />
                </IconButton>
              </Box>
              
              <Grid container spacing={0} sx={{ width: '100%' }}>
                <Grid item xs={12}>
                  <Grid container>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                      <Grid item xs align="center" key={day}>
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.65rem' }}>
                          {day}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                
                {/* Mini calendar days */}
                {(() => {
                  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
                  const firstDayOfMonth = new Date(miniCalendarYear, miniCalendarMonth, 1).getDay();
                  
                  // Get the number of days in the current month
                  const daysInMonth = new Date(miniCalendarYear, miniCalendarMonth + 1, 0).getDate();
                  
                  // Get the number of days in the previous month
                  const daysInPrevMonth = new Date(miniCalendarYear, miniCalendarMonth, 0).getDate();
                  
                  // Create an array of day numbers to display
                  const days = [];
                  
                  // Add days from the previous month
                  for (let i = 0; i < firstDayOfMonth; i++) {
                    days.push({
                      day: daysInPrevMonth - firstDayOfMonth + i + 1,
                      currentMonth: false,
                      prevMonth: true
                    });
                  }
                  
                  // Add days from the current month
                  for (let i = 1; i <= daysInMonth; i++) {
                    days.push({
                      day: i,
                      currentMonth: true,
                      prevMonth: false,
                      isToday: i === 28 // Highlighting 28th as in the image
                    });
                  }
                  
                  // Add days from the next month to complete the grid
                  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
                  for (let i = 1; i <= totalCells - (firstDayOfMonth + daysInMonth); i++) {
                    days.push({
                      day: i,
                      currentMonth: false,
                      prevMonth: false
                    });
                  }
                  
                  // Split days into weeks
                  const weeks = [];
                  for (let i = 0; i < days.length; i += 7) {
                    weeks.push(days.slice(i, i + 7));
                  }
                  
                  return (
                    <>
                      {weeks.map((week, weekIndex) => (
                        <Grid item xs={12} key={weekIndex}>
                          <Grid container>
                            {week.map((day, dayIndex) => (
                              <Grid item xs align="center" key={dayIndex}>
                                <Box 
                                  onClick={() => handleDayClick(day.day)}
                                  sx={{ 
                                    p: 0.3, 
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    color: day.currentMonth ? '#333' : '#aaa',
                                    ...(day.isToday ? { 
                                      bgcolor: '#4ECDC4', 
                                      color: 'white'
                                    } : {})
                                  }}
                                >
                                  <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>{day.day}</Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      ))}
                    </>
                  );
                })()}
              </Grid>
            </Paper>
            
            {/* Calendar filters */}
            <Paper sx={{ p: 1.5, borderRadius: 1 }}>
              <Typography variant="h6" sx={{ mb: 1.5, fontSize: '0.85rem', fontWeight: 500 }}>Calendars</Typography>
              
              <FormGroup>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.pickups} 
                        onChange={handleFilterChange} 
                        name="pickups" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#1C392B' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#1C392B' },
                          '& .MuiSwitch-root': { width: '32px', height: '18px' },
                          '& .MuiSwitch-thumb': { width: '14px', height: '14px' }
                        }}
                        size="small"
                      />
                    } 
                    label="Pickups" 
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.7rem' }, margin: 0 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#1C392B', mr: 0.5 }} />
                    <IconButton size="small" sx={{ padding: 0.3 }}>
                      <MoreVertIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.deliveries} 
                        onChange={handleFilterChange} 
                        name="deliveries" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#379683' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#379683' },
                          '& .MuiSwitch-root': { width: '32px', height: '18px' },
                          '& .MuiSwitch-thumb': { width: '14px', height: '14px' }
                        }}
                        size="small"
                      />
                    } 
                    label="Deliveries" 
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.7rem' }, margin: 0 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#379683', mr: 0.5 }} />
                    <IconButton size="small" sx={{ padding: 0.3 }}>
                      <MoreVertIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.gtvEvents} 
                        onChange={handleFilterChange} 
                        name="gtvEvents" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#1D3557' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#1D3557' },
                          '& .MuiSwitch-root': { width: '32px', height: '18px' },
                          '& .MuiSwitch-thumb': { width: '14px', height: '14px' }
                        }}
                        size="small"
                      />
                    } 
                    label="GTV Events" 
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.7rem' }, margin: 0 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#1D3557', mr: 0.5 }} />
                    <IconButton size="small" sx={{ padding: 0.3 }}>
                      <MoreVertIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.internalEvents} 
                        onChange={handleFilterChange} 
                        name="internalEvents" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#F6AE2D' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#F6AE2D' },
                          '& .MuiSwitch-root': { width: '32px', height: '18px' },
                          '& .MuiSwitch-thumb': { width: '14px', height: '14px' }
                        }}
                        size="small"
                      />
                    } 
                    label="Internal Events" 
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.7rem' }, margin: 0 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F6AE2D', mr: 0.5 }} />
                    <IconButton size="small" sx={{ padding: 0.3 }}>
                      <MoreVertIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.promotions} 
                        onChange={handleFilterChange} 
                        name="promotions" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#F26419' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#F26419' },
                          '& .MuiSwitch-root': { width: '32px', height: '18px' },
                          '& .MuiSwitch-thumb': { width: '14px', height: '14px' }
                        }}
                        size="small"
                      />
                    } 
                    label="Promotions" 
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.7rem' }, margin: 0 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F26419', mr: 0.5 }} />
                    <IconButton size="small" sx={{ padding: 0.3 }}>
                      <MoreVertIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.challenges} 
                        onChange={handleFilterChange} 
                        name="challenges" 
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#E63946' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#E63946' },
                          '& .MuiSwitch-root': { width: '32px', height: '18px' },
                          '& .MuiSwitch-thumb': { width: '14px', height: '14px' }
                        }}
                        size="small"
                      />
                    } 
                    label="Challenges" 
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.7rem' }, margin: 0 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#E63946', mr: 0.5 }} />
                    <IconButton size="small" sx={{ padding: 0.3 }}>
                      <MoreVertIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                </Box>
              </FormGroup>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Schedule Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontSize: '1rem' }}>
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
                  InputProps={{ style: { fontSize: '0.75rem' } }}
                  InputLabelProps={{ style: { fontSize: '0.75rem' } }}
                  sx={{ '& .MuiMenuItem-root': { fontSize: '0.75rem' } }}
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
                  InputLabelProps={{ 
                    shrink: true,
                    style: { fontSize: '0.75rem' }
                  }}
                  InputProps={{ style: { fontSize: '0.75rem' } }}
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
                  InputProps={{ style: { fontSize: '0.75rem' } }}
                  InputLabelProps={{ style: { fontSize: '0.75rem' } }}
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
                  InputProps={{ style: { fontSize: '0.75rem' } }}
                  InputLabelProps={{ style: { fontSize: '0.75rem' } }}
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
                  InputProps={{ style: { fontSize: '0.75rem' } }}
                  InputLabelProps={{ style: { fontSize: '0.75rem' } }}
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
                  InputProps={{ style: { fontSize: '0.75rem' } }}
                  InputLabelProps={{ style: { fontSize: '0.75rem' } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ fontSize: '0.75rem' }}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={!formData.clientId || !formData.scheduledDate || !formData.location}
              sx={{ fontSize: '0.75rem' }}
            >
              Schedule
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        {renderCalendarContent()}
      </Box>
    </Box>
  );
};

export default AdminPickupCalendar; 