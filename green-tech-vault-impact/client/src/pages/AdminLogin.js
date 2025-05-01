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
  Avatar
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import ShieldIcon from '@mui/icons-material/Shield';

// Image for the login page - e-waste pile
const ewasteImage = 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const AdminLogin = () => {
  const theme = useTheme();
  // Admin credentials for testing:
  // Email: Lmeyer@rygneco.com
  // Password: RGYNeco.!
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

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
        await adminLogin(formData.email, formData.password);
        navigate('/admin');
      } catch (error) {
        setErrors({ submit: 'Invalid administrator credentials. Please try again.' });
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
              <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
                THE US
              </Typography>
              <Typography variant="h5" component="p" sx={{ mb: 2 }}>
                produces the second
              </Typography>
              <Typography variant="h5" component="p" sx={{ mb: 2 }}>
                largest amount of e-waste
              </Typography>
              <Typography variant="h5" component="p" sx={{ mb: 2 }}>
                in the world. We create
              </Typography>
              <Typography variant="h5" component="p" sx={{ mb: 2 }}>
                approximately 6.9 million
              </Typography>
              <Typography variant="h5" component="p" sx={{ mb: 2 }}>
                tons in the past year.
              </Typography>
            </Box>
          </Box>
          
          {/* Right side - Admin Login Form */}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
              <Avatar sx={{ mr: 1, bgcolor: theme.palette.teal.main }}>
                <ShieldIcon />
              </Avatar>
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                Administrator Login
              </Typography>
            </Box>
            
            {errors.submit && (
              <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                {errors.submit}
              </Typography>
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Admin Email*"
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
                Are you a client?
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
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
                Client Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default AdminLogin; 