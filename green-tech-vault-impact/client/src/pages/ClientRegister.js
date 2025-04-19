import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  Link,
  useTheme,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';

// Image for the register page - showing e-waste
const ewasteImage = 'https://images.unsplash.com/photo-1610416953538-48f56ade19b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const ClientRegister = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'personal' // Default to personal account
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // In a real application, this would call your registration API
        await register(formData);
        navigate('/dashboard');
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 0, 
            display: 'flex',
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          {/* Left side - E-waste Image with Text */}
          <Box 
            sx={{ 
              width: '50%',
              position: 'relative',
              backgroundImage: `url(${ewasteImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }} />
            
            <Box 
              sx={{ 
                position: 'relative', 
                p: 6, 
                color: 'white',
                zIndex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
                In <span style={{ color: theme.palette.teal.main }}>2023</span>, it was 
              </Typography>
              <Typography variant="h3" component="p" sx={{ mb: 2 }}>
                estimated that
              </Typography>
              <Typography variant="h3" component="p" sx={{ mb: 2 }}>
                around <span style={{ color: theme.palette.teal.main }}>53.6 million</span>
              </Typography>
              <Typography variant="h3" component="p" sx={{ mb: 2 }}>
                metric tons of
              </Typography>
              <Typography variant="h3" component="p" sx={{ mb: 2 }}>
                <span style={{ color: theme.palette.teal.main }}>e-waste</span> were
              </Typography>
              <Typography variant="h3" component="p" sx={{ mb: 4 }}>
                generated globally.
              </Typography>
              <Typography variant="caption" component="p" sx={{ opacity: 0.8 }}>
                Source: World Economic Forum
              </Typography>
            </Box>
          </Box>
          
          {/* Right side - Registration Form */}
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ 
              width: { xs: '100%', md: '50%' }, 
              p: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
              Register
            </Typography>
            
            {errors.submit && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errors.submit}
              </Typography>
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              placeholder="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              variant="outlined"
              sx={{ mb: 3 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address*"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              sx={{ mb: 3 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password*"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              sx={{ mb: 3 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              placeholder="Confirm Password*"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              variant="outlined"
              sx={{ mb: 3 }}
            />
            
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <RadioGroup
                aria-label="account-type"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                row
              >
                <FormControlLabel 
                  value="personal" 
                  control={<Radio />} 
                  label="Personal Account" 
                />
                <FormControlLabel 
                  value="company" 
                  control={<Radio />} 
                  label="Company Account" 
                />
              </RadioGroup>
            </FormControl>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Link component={RouterLink} to="/login" variant="body2" color="primary.main">
                Already have an account? Sign in
              </Link>
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ 
                  py: 1.5,
                  px: 3,
                  fontSize: '1.1rem',
                  backgroundColor: theme.palette.teal.main,
                  '&:hover': {
                    backgroundColor: theme.palette.teal.dark,
                    transform: 'scale(1.05)'
                  },
                  borderRadius: 50,
                  width: '140px',
                  transition: 'all 0.3s ease'
                }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default ClientRegister; 