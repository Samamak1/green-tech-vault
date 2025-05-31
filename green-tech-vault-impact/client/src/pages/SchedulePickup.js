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
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
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
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
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
        // Remove pre-filled data, let users fill in their own information
        companyName: user.companyName || "",
        contactName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || ""
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

  const validateCompanyInfo = () => {
    // Check if all fields in company information section are filled
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
    
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  const handleCloseValidationDialog = () => {
    setValidationDialogOpen(false);
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
          <Box sx={{ py: 2 }}>
            <TextField
              fullWidth
              required
              label="Company Name *"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Contact Name *"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Email *"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              required
              label="Phone *"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            
            <TextField
              fullWidth
              required
              label="Address *"
              name="address"
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="City *"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="State *"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="Zip Code *"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 1:
        return (
          <Box sx={{ py: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              On-Site Contact (Person Present at Pickup)
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="onSiteContactName"
                  value={formData.onSiteContactName}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="onSiteContactJobTitle"
                  value={formData.onSiteContactJobTitle}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="onSiteContactPhone"
                  value={formData.onSiteContactPhone}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="onSiteContactEmail"
                  value={formData.onSiteContactEmail}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
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
                        size="small"
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
                        size="small"
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
              sx={{ mb: 2 }}
              size="small"
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="pickupCity"
                  value={formData.pickupCity}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="pickupState"
                  value={formData.pickupState}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="pickupZipCode"
                  value={formData.pickupZipCode}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 2:
        return (
          <Box sx={{ py: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Company Information
            </Typography>
            
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
              size="small"
            />
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Name"
                  name="contactName"
                  value={formData.contactName}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
              size="small"
            />
            
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
              size="small"
            />
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              On-Site Contact (Person Present at Pickup)
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="onSiteContactName"
                  value={formData.onSiteContactName}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="onSiteContactJobTitle"
                  value={formData.onSiteContactJobTitle}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="onSiteContactPhone"
                  value={formData.onSiteContactPhone}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="onSiteContactEmail"
                  value={formData.onSiteContactEmail}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Date"
                  value={formData.preferredDate ? formData.preferredDate.toLocaleDateString() : ''}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Time"
                  value={formData.preferredTimeWindow ? formData.preferredTimeWindow.toLocaleTimeString() : ''}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              label="Pickup Address"
              name="pickupAddress"
              value={formData.pickupAddress}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
              size="small"
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="pickupCity"
                  value={formData.pickupCity}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="pickupState"
                  value={formData.pickupState}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="pickupZipCode"
                  value={formData.pickupZipCode}
                  InputProps={{ readOnly: true }}
                  size="small"
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
    <Box sx={{...getContentContainerStyle(), display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', pt: 4}} data-boundary="true">
      <Box sx={{...getContentWrapperStyle(), maxWidth: '800px', width: '100%'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            Schedule E-Waste Pickup
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: '600px' }}>
            Fill out the form below to schedule your electronic waste pickup.
          </Typography>
          
          <Box sx={{ maxWidth: '700px', width: '100%' }}>
            <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
              {getStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button 
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ 
                      bgcolor: '#62CBD0', // Light A color
                      '&:hover': { bgcolor: '#50B9BE' } 
                    }}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ 
                      bgcolor: '#62CBD0', // Light A color
                      '&:hover': { bgcolor: '#50B9BE' } 
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Paper>
          </Box>
        </Box>
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

export default SchedulePickup; 