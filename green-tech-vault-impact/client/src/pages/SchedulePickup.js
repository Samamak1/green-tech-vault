import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
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
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';
import ClientDashboardLayout from '../components/layout/ClientDashboardLayout';
import { useAuth } from '../context/AuthContext';

const SchedulePickup = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
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
  
  // If logged in as a client, pre-populate with user's company info
  useEffect(() => {
    if (user) {
      // In a real app, this would come from the user profile
      setFormData(prev => ({
        ...prev,
        companyName: user.companyName || "Leila's Company",
        contactName: user.fullName || "Leila Meyer",
        email: user.email || "leilaameyer2@gmail.com",
        phone: user.phone || "(555) 123-4567"
      }));
    }
  }, [user]);

  // Additional logic to populate form if clientId is provided (from previous implementation)
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
    
    // Navigate back to dashboard
    navigate('/dashboard');
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
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Company Information
            </Typography>
            
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              InputProps={{ readOnly: true }}
              sx={{ mb: 3 }}
            />
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Name"
                  name="contactName"
                  value={formData.contactName}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              InputProps={{ readOnly: true }}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              InputProps={{ readOnly: true }}
              sx={{ mb: 3 }}
            />
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
            
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
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="onSiteContactJobTitle"
                  value={formData.onSiteContactJobTitle}
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="onSiteContactEmail"
                  value={formData.onSiteContactEmail}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
            
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Pickup Details
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Date"
                  value={formData.preferredDate ? formData.preferredDate.toLocaleDateString() : ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Time"
                  value={formData.preferredTimeWindow ? formData.preferredTimeWindow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              label="Pickup Address"
              name="pickupAddress"
              value={formData.pickupAddress}
              InputProps={{ readOnly: true }}
              sx={{ mb: 3 }}
            />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="pickupCity"
                  value={formData.pickupCity}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="pickupState"
                  value={formData.pickupState}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="pickupZipCode"
                  value={formData.pickupZipCode}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      default:
        return 'Unknown step';
    }
  };

  return (
    <ClientDashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500, fontSize: '1rem' }}>Schedule Pickup</Typography>
        
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2 }}
                  >
                    {step.description}
                  </Typography>
                  
                  {getStepContent(index)}
                  
                  <Box sx={{ mb: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                      sx={{ 
                        mt: 1, 
                        mr: 1,
                        bgcolor: '#4ECDC4',
                        '&:hover': { bgcolor: '#3dbdb5' }
                      }}
                    >
                      {index === steps.length - 1 ? 'Submit' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>
    </ClientDashboardLayout>
  );
};

export default SchedulePickup; 