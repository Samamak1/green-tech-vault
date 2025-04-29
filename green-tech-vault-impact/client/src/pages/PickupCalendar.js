import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import ClientDashboardLayout from '../components/layout/ClientDashboardLayout';
import {
  Calendar as CalendarIcon,
  NavigateBefore as PreviousIcon,
  NavigateNext as NextIcon,
  ArrowDropDown as DropdownIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../context/AuthContext';

// Set up the localizer
const localizer = momentLocalizer(moment);

// Custom event component to show in the calendar
const EventComponent = ({ event }) => {
  // Event data could include clientName, location, status, etc
  return (
    <Tooltip title={`${event.title} - ${event.location || ''}`}>
      <Box sx={{ 
        fontSize: '0.75rem', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
        width: '100%' 
      }}>
        {event.title}
      </Box>
    </Tooltip>
  );
};

// Format the dates
const formatEventDates = (events) => {
  return events.map(event => {
    const startDate = new Date(event.scheduledDate);
    const endDate = new Date(event.scheduledDate);
    endDate.setHours(endDate.getHours() + 2); // Assume 2 hour duration
    
    return {
      ...event,
      start: startDate,
      end: endDate
    };
  });
};

const PickupCalendar = () => {
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
  const [currentDay] = useState(new Date().getDate());
  
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
  
  const handleViewChange = (view) => {
    setCalendarView(view);
  };
  
  const handleFilterChange = (event) => {
    setCalendarFilters({
      ...calendarFilters,
      [event.target.name]: event.target.checked
    });
  };
  
  const handleSelectEvent = (event) => {
    // Navigate to the pickup detail page
    navigate(`/dashboard/pickups/${event.id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calendar
        </Typography>
        <Button 
          variant="contained"
          onClick={() => navigate('/schedule-pickup')}
          sx={{ 
            bgcolor: '#4ECDC4', 
            '&:hover': { bgcolor: '#3dbdb5' },
            px: 3
          }}
        >
          Schedule New Pickup
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
          {/* Mini Calendar */}
          <Paper sx={{ p: 2, mb: 2, borderRadius: '8px' }}>
            {/* Mini Calendar Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <IconButton onClick={() => {
                const newDate = new Date(miniCalendarYear, miniCalendarMonth - 1, 1);
                setMiniCalendarMonth(newDate.getMonth());
                setMiniCalendarYear(newDate.getFullYear());
              }}>
                <PreviousIcon />
              </IconButton>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {new Date(miniCalendarYear, miniCalendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </Typography>
              <IconButton onClick={() => {
                const newDate = new Date(miniCalendarYear, miniCalendarMonth + 1, 1);
                setMiniCalendarMonth(newDate.getMonth());
                setMiniCalendarYear(newDate.getFullYear());
              }}>
                <NextIcon />
              </IconButton>
            </Box>
            
            {/* Mini Calendar Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
              {/* Weekday headers */}
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <Box key={index} sx={{ textAlign: 'center', fontWeight: 'bold', color: '#555', fontSize: '0.75rem' }}>
                  {day}
                </Box>
              ))}
              
              {/* Calendar days */}
              {(() => {
                // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
                const firstDayOfMonth = new Date(miniCalendarYear, miniCalendarMonth, 1).getDay();
                
                // Get the number of days in the month
                const daysInMonth = new Date(miniCalendarYear, miniCalendarMonth + 1, 0).getDate();
                
                // Get the number of days in the previous month
                const daysInPrevMonth = new Date(miniCalendarYear, miniCalendarMonth, 0).getDate();
                
                // Array to hold all the days we'll display
                const days = [];
                
                // Add days from the previous month to fill the first row
                for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                  days.push({
                    day: daysInPrevMonth - i,
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
                    today: i === currentDay && miniCalendarMonth === new Date().getMonth() && miniCalendarYear === new Date().getFullYear(),
                    selected: i === selectedDay
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
                      <React.Fragment key={weekIndex}>
                        {week.map((day, dayIndex) => (
                          <Box 
                            key={`${weekIndex}-${dayIndex}`}
                            onClick={() => day.currentMonth && setSelectedDay(day.day)}
                            sx={{ 
                              textAlign: 'center',
                              p: 0.5,
                              borderRadius: '50%',
                              cursor: day.currentMonth ? 'pointer' : 'default',
                              bgcolor: day.today ? '#e3f7f5' : day.selected && day.currentMonth ? '#4ECDC4' : 'transparent',
                              color: !day.currentMonth ? '#aaa' : day.selected ? 'white' : 'inherit',
                              fontWeight: day.today ? 'bold' : 'normal',
                              '&:hover': {
                                bgcolor: day.currentMonth && !day.selected ? '#f5f5f5' : undefined
                              }
                            }}
                          >
                            {day.day}
                          </Box>
                        ))}
                      </React.Fragment>
                    ))}
                  </>
                );
              })()}
            </Box>
          </Paper>
          
          {/* Event Filters */}
          <Paper sx={{ p: 2, mb: 2, borderRadius: '8px' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
              Event Types
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={calendarFilters.pickups} onChange={handleFilterChange} name="pickups" />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#1C392B', mr: 1 }} />
                  <Typography variant="body2">Pickups</Typography>
                </Box>
              }
              sx={{ display: 'block', mb: 0.5 }}
            />
            <FormControlLabel
              control={<Checkbox checked={calendarFilters.deliveries} onChange={handleFilterChange} name="deliveries" />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#379683', mr: 1 }} />
                  <Typography variant="body2">Deliveries</Typography>
                </Box>
              }
              sx={{ display: 'block', mb: 0.5 }}
            />
            <FormControlLabel
              control={<Checkbox checked={calendarFilters.gtvEvents} onChange={handleFilterChange} name="gtvEvents" />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#1D3557', mr: 1 }} />
                  <Typography variant="body2">GTV Events</Typography>
                </Box>
              }
              sx={{ display: 'block', mb: 0.5 }}
            />
          </Paper>
          
          {/* Upcoming Events */}
          <Paper sx={{ p: 2, borderRadius: '8px' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
              Upcoming Events
            </Typography>
            <List disablePadding>
              {getFilteredEvents()
                .filter(event => new Date(event.start) >= new Date())
                .sort((a, b) => new Date(a.start) - new Date(b.start))
                .slice(0, 3) // Limit to 3 events
                .map((event, index) => {
                  let chipColor = '#1C392B';
                  if (event.type === 'delivery') chipColor = '#379683';
                  else if (event.type === 'gtv') chipColor = '#1D3557';
                  else if (event.type === 'internal') chipColor = '#F6AE2D';
                  
                  return (
                    <ListItem
                      key={event.id}
                      sx={{ px: 0, py: 1, borderBottom: index < 2 ? '1px solid #f0f0f0' : 'none' }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CalendarIcon sx={{ color: chipColor }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" noWrap>
                            {event.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="caption" display="block">
                              {moment(event.start).format('MMM D, YYYY')}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {event.location}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  );
              })}
              
              {getFilteredEvents().filter(event => new Date(event.start) >= new Date()).length === 0 && (
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        No upcoming events
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PickupCalendar; 