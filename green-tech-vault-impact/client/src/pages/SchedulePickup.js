import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BrandedHeader from '../components/layout/BrandedHeader';
import BrandedFooter from '../components/layout/BrandedFooter';

const deviceCategories = [
  { value: 'computers', label: 'Computers & Laptops' },
  { value: 'mobile', label: 'Mobile Devices' },
  { value: 'office', label: 'Office Equipment' },
  { value: 'entertainment', label: 'Entertainment Devices' },
  { value: 'networking', label: 'Networking Equipment' },
  { value: 'peripherals', label: 'Peripherals' },
  { value: 'power', label: 'Power Equipment' },
  { value: 'misc', label: 'Cables & Miscellaneous' },
];

const SchedulePickup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    pickupDate: null,
    pickupTimePreference: 'morning',
    deviceCategories: [],
    estimatedQuantity: '',
    dataWipeRequired: false,
    specialInstructions: '',
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'dataWipeRequired') {
        setFormData({ ...formData, [name]: checked });
      } else {
        // Handle device categories checkboxes
        const updatedCategories = [...formData.deviceCategories];
        if (checked) {
          updatedCategories.push(value);
        } else {
          const index = updatedCategories.indexOf(value);
          if (index > -1) {
            updatedCategories.splice(index, 1);
          }
        }
        setFormData({ ...formData, deviceCategories: updatedCategories });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, pickupDate: date });
    if (errors.pickupDate) {
      setErrors({ ...errors, pickupDate: null });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.contactName) newErrors.contactName = 'Contact name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zip) newErrors.zip = 'ZIP code is required';
    } else if (step === 1) {
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
      if (formData.deviceCategories.length === 0) newErrors.deviceCategories = 'Select at least one device category';
      if (!formData.estimatedQuantity) newErrors.estimatedQuantity = 'Estimated quantity is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(activeStep)) {
      // In a real application, you would submit the form data to your backend here
      console.log('Form submitted:', formData);
      setOpenSnackbar(true);
      // Reset form after submission
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        pickupDate: null,
        pickupTimePreference: 'morning',
        deviceCategories: [],
        estimatedQuantity: '',
        dataWipeRequired: false,
        specialInstructions: '',
      });
      setActiveStep(0);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const steps = ['Company Information', 'Pickup Details', 'Review & Submit'];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                error={!!errors.companyName}
                helperText={errors.companyName}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Name"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                error={!!errors.contactName}
                helperText={errors.contactName}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                error={!!errors.zip}
                helperText={errors.zip}
                required
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Pickup Date"
                value={formData.pickupDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!errors.pickupDate,
                    helperText: errors.pickupDate
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Preferred Pickup Time</FormLabel>
                <RadioGroup
                  name="pickupTimePreference"
                  value={formData.pickupTimePreference}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel value="morning" control={<Radio />} label="Morning (9AM-12PM)" />
                  <FormControlLabel value="afternoon" control={<Radio />} label="Afternoon (1PM-5PM)" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" error={!!errors.deviceCategories}>
                <FormLabel component="legend">Device Categories for Pickup</FormLabel>
                <Grid container spacing={2}>
                  {deviceCategories.map((category) => (
                    <Grid item xs={12} sm={6} md={3} key={category.value}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.deviceCategories.includes(category.value)}
                            onChange={handleChange}
                            name="deviceCategories"
                            value={category.value}
                          />
                        }
                        label={category.label}
                      />
                    </Grid>
                  ))}
                </Grid>
                {errors.deviceCategories && (
                  <Typography color="error" variant="caption">
                    {errors.deviceCategories}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Estimated Quantity of Devices"
                name="estimatedQuantity"
                value={formData.estimatedQuantity}
                onChange={handleChange}
                error={!!errors.estimatedQuantity}
                helperText={errors.estimatedQuantity}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.dataWipeRequired}
                    onChange={handleChange}
                    name="dataWipeRequired"
                  />
                }
                label="Data Wipe Required"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Instructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Company Information
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Company Name:</Typography>
                    <Typography>{formData.companyName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Contact Name:</Typography>
                    <Typography>{formData.contactName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Email:</Typography>
                    <Typography>{formData.email}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Phone:</Typography>
                    <Typography>{formData.phone}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Address:</Typography>
                    <Typography>
                      {formData.address}, {formData.city}, {formData.state} {formData.zip}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              
              <Typography variant="h6" gutterBottom>
                Pickup Details
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Pickup Date:</Typography>
                    <Typography>
                      {formData.pickupDate ? formData.pickupDate.toLocaleDateString() : 'Not specified'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Preferred Time:</Typography>
                    <Typography>
                      {formData.pickupTimePreference === 'morning' ? 'Morning (9AM-12PM)' : 'Afternoon (1PM-5PM)'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Device Categories:</Typography>
                    <Typography>
                      {formData.deviceCategories.length > 0
                        ? deviceCategories
                            .filter(cat => formData.deviceCategories.includes(cat.value))
                            .map(cat => cat.label)
                            .join(', ')
                        : 'None selected'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Estimated Quantity:</Typography>
                    <Typography>{formData.estimatedQuantity}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Data Wipe Required:</Typography>
                    <Typography>{formData.dataWipeRequired ? 'Yes' : 'No'}</Typography>
                  </Grid>
                  {formData.specialInstructions && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Special Instructions:</Typography>
                      <Typography>{formData.specialInstructions}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrandedHeader />
      
      <Container maxWidth="md" sx={{ py: 6, flex: 1 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Schedule E-Waste Pickup
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Fill out the form below to schedule a pickup for your electronic waste.
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    size="large"
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
      
      <BrandedFooter />
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your pickup request has been submitted successfully! We'll contact you shortly to confirm.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SchedulePickup; 