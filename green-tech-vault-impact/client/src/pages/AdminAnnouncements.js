import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  TextField,
  Button
} from '@mui/material';

// Styled components for the form
const AdminAnnouncements = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
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

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Company Name*"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Contact Name*"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Email*"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Phone*"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Address*"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="City*"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="State*"
                name="state"
                value={formData.state}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Zip Code*"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
                  boxShadow: 'none',
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
                  boxShadow: 'none',
                }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 3, color: '#555' }}>
                Provide details about the pickup.
              </Typography>
              {/* Pickup Details form fields will go here */}
              <Typography variant="body1">
                Pickup details form coming soon...
              </Typography>
            </Grid>
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
                  boxShadow: 'none',
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
                  boxShadow: 'none',
                }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 3, color: '#555' }}>
                Review your information before submitting.
              </Typography>
              {/* Review information */}
              <Typography variant="body1">
                Review and submit form coming soon...
              </Typography>
            </Grid>
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
                  boxShadow: 'none',
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1C392B',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#0F261D',
                  },
                  borderRadius: '4px',
                  padding: '8px 24px',
                  boxShadow: 'none',
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ 
      p: 3, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <Paper sx={{ 
        p: 4, 
        borderRadius: '8px', 
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        width: '100%'
      }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 500, color: '#1C392B', mb: 2, textAlign: 'center' }}>
          Schedule E-Waste Pick-Up
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 4, color: '#555', textAlign: 'center' }}>
          Fill out the form below to schedule your electronic waste pick up.
        </Typography>
        
        {/* Custom stepper implementation with gray lines between the circles */}
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
                  backgroundColor: index === 0 ? '#4ecdc4' : // Turquoise for first step 
                                 activeStep === index ? '#1C392B' : 
                                 activeStep > index ? '#1C392B' : '#ccc',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 500,
                  mb: 1,
                }}>
                  {index + 1}
                </Box>
                <Typography sx={{ 
                  color: activeStep === index ? '#1C392B' : '#666',
                  fontSize: '0.9rem',
                  fontWeight: activeStep === index ? 500 : 400,
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
        
        {renderStepContent(activeStep)}
      </Paper>
    </Box>
  );
};

export default AdminAnnouncements; 