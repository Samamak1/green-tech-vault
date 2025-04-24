import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  TextField,
  Button,
  InputAdornment
} from '@mui/material';
import AdminLayout from '../components/layout/AdminLayout';

const AdminAnnouncements = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  // Pre-filled client data
  const [formData, setFormData] = useState({
    companyName: 'Tech Solutions Inc.',
    contactName: 'John Smith',
    email: 'john@techsolutions.com',
    phone: '(555) 123-4567',
    address: '123 Tech Blvd',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    { label: 'Company Information', icon: 'info' },
    { label: 'Pickup Details', icon: 'detail' },
    { label: 'Review & Submit', icon: '&' }
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
                      backgroundColor: index === 0 ? '#4ecdc4' : '#ccc',
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 500,
                      mb: 1,
                    }}>
                      {index + 1}
                    </Box>
                    <Typography sx={{ 
                      color: index === 0 ? '#1C392B' : '#666',
                      fontSize: '0.9rem',
                      fontWeight: index === 0 ? 500 : 400,
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
                        height: 0.5,
                        backgroundColor: '#e8e8e8',
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
            
            {/* Form Fields with Pre-filled Data */}
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ mb: 0.5, color: '#666' }}>
                    Company Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.companyName}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-input': { 
                        padding: '11px 14px',
                      }
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ mb: 0.5, color: '#666' }}>
                    Contact Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.contactName}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-input': { 
                        padding: '11px 14px',
                      }
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ mb: 0.5, color: '#666' }}>
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.email}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-input': { 
                        padding: '11px 14px',
                      }
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ mb: 0.5, color: '#666' }}>
                    Phone
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.phone}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-input': { 
                        padding: '11px 14px',
                      }
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ mb: 0.5, color: '#666' }}>
                    Address
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.address}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-input': { 
                        padding: '11px 14px',
                      }
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ mb: 0.5, color: '#666' }}>
                    City
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.city}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-input': { 
                        padding: '11px 14px',
                      }
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ mb: 0.5, color: '#666' }}>
                    State
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.state}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-input': { 
                        padding: '11px 14px',
                      }
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ mb: 0.5, color: '#666' }}>
                    Zip Code
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.zipCode}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      backgroundColor: '#fff',
                      '& .MuiOutlinedInput-input': { 
                        padding: '11px 14px',
                      }
                    }}
                  />
                </Box>
              </Grid>
              
              {/* Back & Next Buttons */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  onClick={handleBack}
                  sx={{
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    },
                    borderRadius: '4px',
                    padding: '8px 24px',
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    backgroundColor: '#1C392B',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#0F261D',
                    },
                    borderRadius: '4px',
                    padding: '8px 24px',
                  }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminAnnouncements; 