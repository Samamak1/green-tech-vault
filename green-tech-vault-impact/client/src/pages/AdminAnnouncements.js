import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  TextField,
  Button,
  InputAdornment
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AdminLayout from '../components/layout/AdminLayout';

const AdminAnnouncements = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  // Form data
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Pickup Details
    onSiteContactName: '',
    onSiteContactJobTitle: '',
    onSiteContactPhone: '',
    onSiteContactEmail: '',
    preferredDate: null,
    preferredTimeWindow: null,
    pickupAddress: '',
    pickupCity: '',
    pickupState: '',
    pickupZipCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      preferredDate: date
    });
  };

  const handleTimeChange = (time) => {
    setFormData({
      ...formData,
      preferredTimeWindow: time
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    // In a real application, you would submit the data to your backend
    console.log('Form submitted with data:', formData);
    
    // Show success message
    alert('Pickup scheduled successfully!');
    
    // Navigate back to admin dashboard
    navigate('/admin/dashboard');
  };

  const steps = [
    { label: 'Company Information', completed: activeStep > 0 },
    { label: 'Pickup Details', completed: activeStep > 1 },
    { label: 'Review & Submit', completed: activeStep > 2 }
  ];

  return (
    <AdminLayout>
      <Box sx={{ 
        width: '100%',
        display: 'flex', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
      }}>
        <Paper sx={{ 
          maxWidth: '1000px',
          width: '100%',
          borderRadius: '8px', 
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          m: 3
        }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 500, color: '#333', mb: 1, textAlign: 'center' }}>
              Schedule E-Waste Pickup
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 4, color: '#555', textAlign: 'center' }}>
              Fill out the form below to schedule your electronic waste pickup.
            </Typography>
            
            {/* Custom stepper implementation */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              mb: 5,
              position: 'relative'
            }}>
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    <Box sx={{ 
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: index <= activeStep ? '#4ecdc4' : '#ccc',
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 500,
                      mb: 1,
                    }}>
                      {step.completed ? '✓' : index + 1}
                    </Box>
                    <Typography sx={{ 
                      color: index === activeStep ? '#1C392B' : '#666',
                      fontSize: '0.9rem',
                      fontWeight: index === activeStep ? 500 : 400,
                      textAlign: 'center',
                    }}>
                      {step.label}
                    </Typography>
                  </Box>
                  
                  {/* Add line between circles, except after the last circle */}
                  {index < steps.length - 1 && (
                    <Box 
                      sx={{ 
                        flex: 1,
                        height: 1.5,
                        backgroundColor: index < activeStep ? '#4ecdc4' : '#e8e8e8',
                        margin: '0 10px',
                        position: 'relative',
                        top: -20,
                        zIndex: 1
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
            
            {/* Step content */}
            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Contact Name"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Contact Name"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                    On-Site Contact (Person Present at Pickup)
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="onSiteContactName"
                        value={formData.onSiteContactName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Job Title"
                        name="onSiteContactJobTitle"
                        value={formData.onSiteContactJobTitle}
                        onChange={handleChange}
                        placeholder="Job Title"
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="onSiteContactPhone"
                        value={formData.onSiteContactPhone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="onSiteContactEmail"
                        value={formData.onSiteContactEmail}
                        onChange={handleChange}
                        placeholder="Email"
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Preferred Date"
                      value={formData.preferredDate}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Preferred Date"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarMonthIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-input': { 
                              padding: '14px 14px',
                            }
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                
                <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Preferred Time Window"
                      value={formData.preferredTimeWindow}
                      onChange={handleTimeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Preferred Time Window"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <AccessTimeIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-input': { 
                              padding: '14px 14px',
                            }
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Pickup Address"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    placeholder="Pickup Address"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="City"
                    name="pickupCity"
                    value={formData.pickupCity}
                    onChange={handleChange}
                    placeholder="City"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="State"
                    name="pickupState"
                    value={formData.pickupState}
                    onChange={handleChange}
                    placeholder="State"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="pickupZipCode"
                    value={formData.pickupZipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '14px 14px',
                      }
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                    Company Information
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        value={formData.companyName}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Contact Name"
                        value={formData.contactName}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={formData.email}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={formData.phone}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Address"
                        value={formData.address}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="City"
                        value={formData.city}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="State"
                        value={formData.state}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Zip Code"
                        value={formData.zipCode}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                    On-Site Contact
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={formData.onSiteContactName}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Job Title"
                        value={formData.onSiteContactJobTitle}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.onSiteContactPhone}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={formData.onSiteContactEmail}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                    Pickup Details
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Preferred Date"
                        value={formData.preferredDate ? formData.preferredDate.toLocaleDateString() : ''}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Preferred Time"
                        value={formData.preferredTimeWindow ? formData.preferredTimeWindow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Pickup Address"
                        value={formData.pickupAddress}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="City"
                        value={formData.pickupCity}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="State"
                        value={formData.pickupState}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                      <TextField
                        fullWidth
                        label="Zip Code"
                        value={formData.pickupZipCode}
                        InputProps={{ readOnly: true }}
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '14px 14px',
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}

            {/* Back & Next Buttons */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  borderRadius: '4px',
                  padding: '8px 24px',
                  textTransform: 'none',
                }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: '#005F56',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#004D46',
                    },
                    borderRadius: '4px',
                    padding: '8px 24px',
                    textTransform: 'none',
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    backgroundColor: '#005F56',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#004D46',
                    },
                    borderRadius: '4px',
                    padding: '8px 24px',
                    textTransform: 'none',
                  }}
                >
                  Next
                </Button>
              )}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminAnnouncements; 