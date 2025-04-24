import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AdminLayout from '../components/layout/AdminLayout';

const SchedulePickup = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
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
  
  // If clientId is provided, fetch client data and pre-populate the form
  useEffect(() => {
    if (clientId) {
      // In a real implementation, you would fetch client data from an API
      // For demo purposes, we'll use mock data
      const fetchClientData = async () => {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock client data
        const mockClientData = {
          companyName: 'Tech Solutions Inc.',
          contactName: 'John Smith',
          email: 'john@techsolutions.com',
          phone: '(555) 123-4567',
          address: '123 Tech Blvd',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105'
        };
        
        setFormData(prev => ({
          ...prev,
          ...mockClientData
        }));
      };
      
      fetchClientData();
    }
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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

  // Define the steps for the stepper
  const steps = [
    { 
      label: 'Company Information',
      description: 'Fill out basic company information'
    },
    { 
      label: 'Pickup Details',
      description: 'Provide details about the pickup'
    },
    { 
      label: 'Review & Submit',
      description: 'Review all information and submit'
    }
  ];

  // Render the content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ py: 3 }}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputLabelProps={{ shrink: true }}
            />
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Name"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputLabelProps={{ shrink: true }}
            />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 1:
        return (
          <Box sx={{ py: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              On-Site Contact (Person Present at Pickup)
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="onSiteContactName"
                  value={formData.onSiteContactName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="onSiteContactJobTitle"
                  value={formData.onSiteContactJobTitle}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="onSiteContactPhone"
                  value={formData.onSiteContactPhone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="onSiteContactEmail"
                  value={formData.onSiteContactEmail}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Preferred Date"
                    value={formData.preferredDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        sx={{ width: '100%' }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Preferred Time Window"
                    value={formData.preferredTimeWindow}
                    onChange={handleTimeChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              label="Pickup Address"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="pickupCity"
                  value={formData.pickupCity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="pickupState"
                  value={formData.pickupState}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="pickupZipCode"
                  value={formData.pickupZipCode}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 2:
        return (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Company Information
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {formData.companyName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {formData.contactName}, {formData.email}, {formData.phone}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                </Typography>
              </Grid>
            </Grid>
            
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              On-Site Contact (Person Present at Pickup)
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {formData.onSiteContactName}, {formData.onSiteContactJobTitle}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {formData.onSiteContactEmail}, {formData.onSiteContactPhone}
                </Typography>
              </Grid>
            </Grid>
            
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Pickup Details
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {formData.preferredDate ? formData.preferredDate.toLocaleDateString() : 'No date selected'}
                  {formData.preferredTimeWindow ? `, ${formData.preferredTimeWindow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {formData.pickupAddress}, {formData.pickupCity}, {formData.pickupState} {formData.pickupZipCode}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
        
      default:
        return 'Unknown step';
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 500 }}>
            Schedule E-Waste Pick-Up
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Fill out the form below to schedule your electronic waste pick up.
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-iconContainer': {
                        '& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed': {
                          color: '#56C3C9',
                        },
                      },
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      color={activeStep === index ? '#56C3C9' : 'text.secondary'}
                      fontWeight={activeStep === index ? 500 : 400}
                    >
                      {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ 
                bgcolor: '#f0f0f0', 
                color: '#686868',
                '&:hover': { bgcolor: '#e0e0e0' },
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 'normal'
              }}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ 
                  bgcolor: '#005F56', 
                  '&:hover': { bgcolor: '#004d46' },
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 'normal'
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ 
                  bgcolor: '#005F56', 
                  '&:hover': { bgcolor: '#004d46' },
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 'normal'
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </AdminLayout>
  );
};

export default SchedulePickup; 