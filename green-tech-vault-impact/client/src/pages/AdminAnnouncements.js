import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AdminLayout from '../components/layout/AdminLayout';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const AdminAnnouncements = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  
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

  const validateCompanyInfo = () => {
    // Check if all required fields in company information section are filled
    const { companyName, contactName, email, phone, address, city, state, zipCode } = formData;
    return companyName && contactName && email && phone && address && city && state && zipCode;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateCompanyInfo()) {
      // Show validation dialog if company information is incomplete
      setValidationDialogOpen(true);
      return;
    }
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

  const handleCloseValidationDialog = () => {
    setValidationDialogOpen(false);
  };

  const steps = [
    { label: 'Company Information', completed: activeStep > 0 },
    { label: 'Pickup Details', completed: activeStep > 1 },
    { label: 'Review & Submit', completed: activeStep > 2 }
  ];

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <Paper sx={{ 
          width: '100%',
          borderRadius: '8px', 
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" component="h1" gutterBottom sx={{ fontWeight: 500, color: '#333', mb: 1, textAlign: 'center', fontSize: '1.1rem' }}>
              Schedule E-Waste Pickup
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, color: '#555', textAlign: 'center', fontSize: '0.85rem' }}>
              Fill out the form below to schedule your electronic waste pickup.
            </Typography>
            
            {/* Custom stepper implementation */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              mb: 3,
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
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: index <= activeStep ? '#4ecdc4' : '#ccc',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 500,
                      mb: 0.5,
                    }}>
                      {step.completed ? '✓' : index + 1}
                    </Box>
                    <Typography sx={{ 
                      color: index === activeStep ? '#1C392B' : '#666',
                      fontSize: '0.75rem',
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
                        height: 1,
                        backgroundColor: index < activeStep ? '#4ecdc4' : '#e8e8e8',
                        margin: '0 8px',
                        position: 'relative',
                        top: -16,
                        zIndex: 1
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
            
            {/* Step content */}
            {activeStep === 0 && (
              <Grid container spacing={1.5}>
                <Grid item xs={12} sx={{ mb: 0.5 }}>
                  <TextField
                    fullWidth
                    required
                    label="Company Name*"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '8px 12px',
                        fontSize: '0.85rem'
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.85rem'
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} sx={{ mb: 0.5 }}>
                  <TextField
                    fullWidth
                    required
                    label="Contact Name*"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Contact Name"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '8px 12px',
                        fontSize: '0.85rem'
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.85rem'
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} sx={{ mb: 0.5 }}>
                  <TextField
                    fullWidth
                    required
                    label="Email*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '8px 12px',
                        fontSize: '0.85rem'
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.85rem'
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sx={{ mb: 0.5 }}>
                  <TextField
                    fullWidth
                    required
                    label="Phone*"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '8px 12px',
                        fontSize: '0.85rem'
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.85rem'
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sx={{ mb: 0.5 }}>
                  <TextField
                    fullWidth
                    required
                    label="Address*"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '8px 12px',
                        fontSize: '0.85rem'
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.85rem'
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} sx={{ mb: 0.5 }}>
                  <TextField
                    fullWidth
                    required
                    label="City*"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '8px 12px',
                        fontSize: '0.85rem'
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.85rem'
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} sx={{ mb: 0.5 }}>
                  <TextField
                    fullWidth
                    required
                    label="State*"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '8px 12px',
                        fontSize: '0.85rem'
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.85rem'
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4} sx={{ mb: 0.5 }}>
                  <TextField
                    fullWidth
                    required
                    label="Zip Code*"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '8px 12px',
                        fontSize: '0.85rem'
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.85rem'
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
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '12px 14px',
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
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '12px 14px',
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
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '12px 14px',
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
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-input': { 
                            padding: '12px 14px',
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
                          size="small"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarMonthIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-input': { 
                              padding: '12px 14px',
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
                          size="small"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                <AccessTimeIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-input': { 
                              padding: '12px 14px',
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
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '12px 14px',
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
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '12px 14px',
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
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '12px 14px',
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
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-input': { 
                        padding: '12px 14px',
                      }
                    }}
                  />
                </Grid>
              </Grid>
            )}
            
            {activeStep === 2 && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                  Review Your Information
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      Company Information
                    </Typography>
                    <Box sx={{ border: '1px solid #eee', borderRadius: '4px', p: 2, mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Company Name:
                          </Typography>
                          <Typography variant="body1">
                            {formData.companyName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Contact Name:
                          </Typography>
                          <Typography variant="body1">
                            {formData.contactName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Email:
                          </Typography>
                          <Typography variant="body1">
                            {formData.email}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Phone:
                          </Typography>
                          <Typography variant="body1">
                            {formData.phone}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">
                            Address:
                          </Typography>
                          <Typography variant="body1">
                            {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      On-Site Contact
                    </Typography>
                    <Box sx={{ border: '1px solid #eee', borderRadius: '4px', p: 2, mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Full Name:
                          </Typography>
                          <Typography variant="body1">
                            {formData.onSiteContactName || 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Job Title:
                          </Typography>
                          <Typography variant="body1">
                            {formData.onSiteContactJobTitle || 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Phone:
                          </Typography>
                          <Typography variant="body1">
                            {formData.onSiteContactPhone || 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Email:
                          </Typography>
                          <Typography variant="body1">
                            {formData.onSiteContactEmail || 'N/A'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      Pickup Details
                    </Typography>
                    <Box sx={{ border: '1px solid #eee', borderRadius: '4px', p: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Preferred Date:
                          </Typography>
                          <Typography variant="body1">
                            {formData.preferredDate ? formData.preferredDate.toLocaleDateString() : 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="textSecondary">
                            Preferred Time:
                          </Typography>
                          <Typography variant="body1">
                            {formData.preferredTimeWindow ? formData.preferredTimeWindow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">
                            Pickup Address:
                          </Typography>
                          <Typography variant="body1">
                            {formData.pickupAddress ? 
                              `${formData.pickupAddress}, ${formData.pickupCity || ''}, ${formData.pickupState || ''} ${formData.pickupZipCode || ''}` : 
                              'Same as company address'
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ borderRadius: '4px', minWidth: '80px', fontSize: '0.85rem' }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ 
                    backgroundColor: '#4ECDC4',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#3dbdb5',
                    },
                    borderRadius: '4px',
                    minWidth: '80px',
                    fontSize: '0.85rem'
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ 
                    backgroundColor: '#4ECDC4',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#3dbdb5',
                    },
                    borderRadius: '4px',
                    minWidth: '80px',
                    fontSize: '0.85rem'
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
      
      {/* Validation Dialog */}
      <Dialog
        open={validationDialogOpen}
        onClose={handleCloseValidationDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Required Information Missing"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please complete all required fields in the Company Information section before proceeding.
            Required fields are marked with an asterisk (*).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseValidationDialog} autoFocus color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAnnouncements; 