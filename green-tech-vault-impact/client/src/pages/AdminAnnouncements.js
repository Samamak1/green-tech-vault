import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Stepper, 
  Step, 
  StepLabel, 
  TextField,
  Button,
  styled
} from '@mui/material';

// Styled components to match the design in the second image
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '8px',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  maxWidth: '900px',
  margin: '0 auto'
}));

const StyledStep = styled(Step)(({ theme }) => ({
  '& .MuiStepLabel-root .Mui-active': {
    backgroundColor: '#1C392B',
    color: 'white',
    borderRadius: '50%',
    padding: '4px',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiStepLabel-root .Mui-completed': {
    backgroundColor: '#1C392B',
    color: 'white',
    borderRadius: '50%',
    padding: '4px',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiStepLabel-root .Mui-disabled': {
    backgroundColor: '#ccc',
    color: 'white',
    borderRadius: '50%',
    padding: '4px',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiStepLabel-label': {
    marginTop: theme.spacing(1),
  }
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#1C392B',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1C392B',
    },
  },
});

const StyledNextButton = styled(Button)({
  backgroundColor: '#1C392B',
  color: 'white',
  '&:hover': {
    backgroundColor: '#0F261D',
  },
  borderRadius: '4px',
  padding: '8px 24px',
  boxShadow: 'none',
});

const StyledBackButton = styled(Button)({
  backgroundColor: '#f5f5f5',
  color: '#333',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  borderRadius: '4px',
  padding: '8px 24px',
  boxShadow: 'none',
});

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

  const steps = ['Company Information', 'Pickup Details', 'Review & Submit'];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 3, color: '#555' }}>
                Fill out the form below to schedule your electronic waste pick up.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                placeholder="Company Name*"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                placeholder="Contact Name*"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                placeholder="Email*"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                placeholder="Phone*"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                placeholder="Address*"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledTextField
                fullWidth
                placeholder="City*"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledTextField
                fullWidth
                placeholder="State*"
                name="state"
                value={formData.state}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledTextField
                fullWidth
                placeholder="Zip Code*"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <StyledBackButton
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </StyledBackButton>
              <StyledNextButton
                variant="contained"
                onClick={handleNext}
              >
                Next
              </StyledNextButton>
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
              <StyledBackButton onClick={handleBack}>
                Back
              </StyledBackButton>
              <StyledNextButton
                variant="contained"
                onClick={handleNext}
              >
                Next
              </StyledNextButton>
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
              <StyledBackButton onClick={handleBack}>
                Back
              </StyledBackButton>
              <StyledNextButton
                variant="contained"
              >
                Submit
              </StyledNextButton>
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <StyledPaper>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 500, color: '#1C392B', mb: 2, textAlign: 'center' }}>
          Schedule E-Waste Pick-Up
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 4, color: '#555', textAlign: 'center' }}>
          Fill out the form below to schedule your electronic waste pick up.
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 5 }} alternativeLabel>
          {steps.map((label, index) => (
            <StyledStep key={label}>
              <StepLabel>{label}</StepLabel>
            </StyledStep>
          ))}
        </Stepper>
        
        {renderStepContent(activeStep)}
      </StyledPaper>
    </Box>
  );
};

export default AdminAnnouncements; 