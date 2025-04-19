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
  useTheme
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';

// Image for the login page
const whaleImage = 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const ClientLogin = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // In a real application, this would call your authentication API
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } catch (error) {
        setErrors({ submit: 'Invalid email or password. Please try again.' });
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
          {/* Left side - Whale Image with Text */}
          <Box 
            sx={{ 
              width: '50%',
              position: 'relative',
              backgroundImage: `url(${whaleImage})`,
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
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
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
              <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
                EVERY DAY
              </Typography>
              <Typography variant="h6" component="p" sx={{ mb: 2 }}>
                the world generates
              </Typography>
              <Typography variant="h6" component="p" sx={{ mb: 2 }}>
                e-waste that weighs
              </Typography>
              <Typography variant="h6" component="p" sx={{ mb: 2 }}>
                as much as <strong>100 blue</strong>
              </Typography>
              <Typography variant="h6" component="p">
                whales
              </Typography>
            </Box>
          </Box>
          
          {/* Right side - Login Form */}
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
              Client Login
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
              id="email"
              placeholder="Email Adress*"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              sx={{ mb: 3 }}
            />
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs>
                <Link component={RouterLink} to="/forgot-password" variant="body2" color="primary.main">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2" color="primary.main">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ 
                py: 1.5,
                fontSize: '1.1rem',
                backgroundColor: theme.palette.teal.main,
                '&:hover': {
                  backgroundColor: theme.palette.teal.dark,
                  transform: 'scale(1.05)'
                },
                borderRadius: 50,
                alignSelf: 'flex-end',
                width: '140px',
                transition: 'all 0.3s ease'
              }}
            >
              Sign in
            </Button>
            
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Are you an administrator?
              </Typography>
              <Button
                component={RouterLink}
                to="/admin/login"
                variant="outlined"
                sx={{ 
                  borderColor: '#e0e0e0',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: '#bdbdbd',
                    backgroundColor: 'transparent',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Admin Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default ClientLogin; 