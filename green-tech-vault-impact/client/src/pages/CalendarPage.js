import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  ToggleButtonGroup, 
  ToggleButton, 
  Grid, 
  IconButton,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon,
  Add as AddIcon
} from '@mui/icons-material';
import AdminLayout from '../components/layout/AdminLayout';

const CalendarPage = () => {
  const [viewMode, setViewMode] = useState('week');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Calendar toggle switches
  const [calendarFilters, setCalendarFilters] = useState({
    pickups: true,
    deliveries: true,
    gtvEvents: true,
    internalEvents: true,
    promotions: false,
    challenges: false
  });

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleFilterChange = (event) => {
    setCalendarFilters({
      ...calendarFilters,
      [event.target.name]: event.target.checked
    });
  };

  // Generate calendar data
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarData = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const calendarDays = [];
    
    // Previous month days
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({
        day,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true
      });
    }
    
    // Next month days
    const remainingDays = 42 - calendarDays.length; // 6 rows of 7 days
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    
    for (let day = 1; day <= remainingDays; day++) {
      calendarDays.push({
        day,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false
      });
    }
    
    return calendarDays;
  };

  const calendarData = generateCalendarData();
  
  // Split calendar data into weeks for grid display
  const calendarWeeks = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    calendarWeeks.push(calendarData.slice(i, i + 7));
  }

  // Weekday headers
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Functions to determine if a day has events
  const hasPickup = (day) => {
    // Mock data - in a real app, you would check actual events
    return day % 5 === 0;
  };

  const hasDelivery = (day) => {
    return day % 7 === 0;
  };

  const hasGTVEvent = (day) => {
    return day % 8 === 0;
  };

  const hasInternalEvent = (day) => {
    return day % 9 === 0;
  };

  // Check if a day is today
  const isToday = (day, month, year) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  // Highlighted day (e.g., selected in the UI - for this demo we'll highlight the 27th)
  const isHighlighted = (day, month, year) => {
    return day === 27 && month === 2 && year === 2025; // March 27, 2025
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>Calendar</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="calendar view"
              sx={{ 
                mr: 2, 
                '& .MuiToggleButton-root': {
                  color: '#555',
                  textTransform: 'none',
                  fontSize: '0.875rem'
                },
                '& .Mui-selected': {
                  bgcolor: '#f5f5f5 !important',
                  color: '#333 !important'
                }
              }}
            >
              <ToggleButton value="week" aria-label="week view">
                Week
              </ToggleButton>
              <ToggleButton value="month" aria-label="month view">
                Month
              </ToggleButton>
              <ToggleButton value="agenda" aria-label="agenda view">
                Agenda
              </ToggleButton>
            </ToggleButtonGroup>
            
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ 
                bgcolor: '#56D0C5', 
                '&:hover': { bgcolor: '#45b0a7' },
                borderRadius: '4px',
                textTransform: 'none',
                px: 2
              }}
            >
              + Schedule Pickup
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={handlePrevMonth} size="small">
                    <ChevronLeftIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ mx: 2 }}>
                    {`${monthNames[currentMonth]} ${currentYear}`}
                  </Typography>
                  <IconButton onClick={handleNextMonth} size="small">
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {weekdays.map(day => (
                        <TableCell 
                          key={day} 
                          align="center"
                          sx={{ 
                            fontWeight: 500, 
                            py: 1, 
                            bgcolor: '#f9f9f9'
                          }}
                        >
                          {day}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {calendarWeeks.map((week, weekIdx) => (
                      <TableRow key={weekIdx}>
                        {week.map((date, dateIdx) => (
                          <TableCell 
                            key={dateIdx} 
                            align="center" 
                            sx={{ 
                              height: 80, 
                              p: 1, 
                              position: 'relative',
                              bgcolor: isHighlighted(date.day, date.month, date.year) ? '#e6f7ff' : 'white',
                              color: date.isCurrentMonth ? 'inherit' : '#ccc',
                              border: isToday(date.day, date.month, date.year) ? '2px solid #4ECDC4' : '1px solid #e0e0e0',
                              ...(isHighlighted(date.day, date.month, date.year) && {
                                boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)'
                              })
                            }}
                          >
                            <Box sx={{ position: 'absolute', top: 5, left: 5 }}>
                              {date.day}
                            </Box>
                            <Box sx={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              alignItems: 'center',
                              pt: 3
                            }}>
                              {calendarFilters.pickups && hasPickup(date.day) && (
                                <Box sx={{ 
                                  width: '80%', 
                                  my: 0.5, 
                                  py: 0.5, 
                                  borderRadius: 1, 
                                  fontSize: '0.75rem',
                                  bgcolor: '#e3f7f5',
                                  color: '#4ECDC4'
                                }}>
                                  Pickup
                                </Box>
                              )}
                              {calendarFilters.deliveries && hasDelivery(date.day) && (
                                <Box sx={{ 
                                  width: '80%', 
                                  my: 0.5, 
                                  py: 0.5, 
                                  borderRadius: 1, 
                                  fontSize: '0.75rem',
                                  bgcolor: '#e3f7f5',
                                  color: '#4ECDC4'
                                }}>
                                  Delivery
                                </Box>
                              )}
                              {calendarFilters.gtvEvents && hasGTVEvent(date.day) && (
                                <Box sx={{ 
                                  width: '80%', 
                                  my: 0.5, 
                                  py: 0.5, 
                                  borderRadius: 1, 
                                  fontSize: '0.75rem',
                                  bgcolor: '#1C392B',
                                  color: 'white'
                                }}>
                                  GTV Event
                                </Box>
                              )}
                              {calendarFilters.internalEvents && hasInternalEvent(date.day) && (
                                <Box sx={{ 
                                  width: '80%', 
                                  my: 0.5, 
                                  py: 0.5, 
                                  borderRadius: 1, 
                                  fontSize: '0.75rem',
                                  bgcolor: '#fff8e0',
                                  color: '#ffa000'
                                }}>
                                  Internal
                                </Box>
                              )}
                            </Box>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
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
                        color="primary"
                        sx={{ '& .MuiSwitch-track': { bgcolor: calendarFilters.pickups ? '#4ECDC4' : undefined } }}
                      />
                    } 
                    label="Pickups" 
                    sx={{ '& .MuiFormControlLabel-label': { color: '#333' } }}
                  />
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#4ECDC4',
                      mr: 1
                    }} 
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.deliveries} 
                        onChange={handleFilterChange} 
                        name="deliveries" 
                        color="primary"
                        sx={{ '& .MuiSwitch-track': { bgcolor: calendarFilters.deliveries ? '#4ECDC4' : undefined } }}
                      />
                    } 
                    label="Deliveries" 
                    sx={{ '& .MuiFormControlLabel-label': { color: '#333' } }}
                  />
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#4ECDC4',
                      mr: 1 
                    }} 
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.gtvEvents} 
                        onChange={handleFilterChange} 
                        name="gtvEvents" 
                        color="primary"
                        sx={{ '& .MuiSwitch-track': { bgcolor: calendarFilters.gtvEvents ? '#1C392B' : undefined } }}
                      />
                    } 
                    label="GTV Events" 
                    sx={{ '& .MuiFormControlLabel-label': { color: '#333' } }}
                  />
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#1C392B',
                      mr: 1
                    }}  
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.internalEvents} 
                        onChange={handleFilterChange} 
                        name="internalEvents" 
                        color="primary"
                        sx={{ '& .MuiSwitch-track': { bgcolor: calendarFilters.internalEvents ? '#ffa000' : undefined } }}
                      />
                    } 
                    label="Internal Events" 
                    sx={{ '& .MuiFormControlLabel-label': { color: '#333' } }}
                  />
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#ffa000',
                      mr: 1
                    }} 
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.promotions} 
                        onChange={handleFilterChange} 
                        name="promotions" 
                        color="primary"
                      />
                    } 
                    label="Promotions" 
                    sx={{ '& .MuiFormControlLabel-label': { color: '#333' } }}
                  />
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#ff5722',
                      mr: 1
                    }} 
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={calendarFilters.challenges} 
                        onChange={handleFilterChange} 
                        name="challenges" 
                        color="primary"
                      />
                    } 
                    label="Challenges" 
                    sx={{ '& .MuiFormControlLabel-label': { color: '#333' } }}
                  />
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#f44336',
                      mr: 1
                    }} 
                  />
                </Box>
              </FormGroup>
            </Paper>

            {/* Mini Calendar */}
            <Paper sx={{ p: 2, borderRadius: 1, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  March 2025
                </Typography>
              </Box>
              
              <Grid container spacing={0.5}>
                <Grid item xs={12}>
                  <Grid container>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <Grid item xs={1.7} key={day}>
                        <Box sx={{ 
                          textAlign: 'center', 
                          fontSize: '0.75rem',
                          color: '#666',
                          p: 0.5
                        }}>
                          {day.substring(0, 1)}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                
                {/* Mini calendar dates - we'll just do a simplified version */}
                {Array.from({ length: 5 }).map((_, weekIdx) => (
                  <Grid item xs={12} key={weekIdx}>
                    <Grid container>
                      {Array.from({ length: 7 }).map((_, dayIdx) => {
                        const day = weekIdx * 7 + dayIdx + 1 - 6;
                        const isCurrentMonth = day > 0 && day <= 31;
                        const isHighlightedDay = day === 27;
                        return (
                          <Grid item xs={1.7} key={dayIdx}>
                            <Box sx={{ 
                              textAlign: 'center', 
                              fontSize: '0.75rem',
                              p: 0.5,
                              borderRadius: '50%',
                              bgcolor: isHighlightedDay ? '#4ECDC4' : 'transparent',
                              color: isHighlightedDay ? 'white' : (isCurrentMonth ? '#333' : '#ccc'),
                              fontWeight: isCurrentMonth ? 400 : 300,
                            }}>
                              {isCurrentMonth ? (day <= 31 ? day : ' ') : (day <= 0 ? day + 31 : day - 31)}
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default CalendarPage; 