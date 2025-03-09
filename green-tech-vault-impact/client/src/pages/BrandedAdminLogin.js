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
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BrandedHeader from '../components/layout/BrandedHeader';
import BrandedFooter from '../components/layout/BrandedFooter';
import Logo from '../components/branding/Logo';
import { useAuth } from '../context/AuthContext';

const BrandedAdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    
    // Clear login error when form is updated
    if (loginError) {
      setLoginError('');
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
      setLoading(true);
      setLoginError('');
      
      try {
        console.log('Attempting admin login with:', {
          email: formData.email,
          password: formData.password ? '[REDACTED]' : 'missing'
        });
        
        // Call the adminLogin function with email and password
        await adminLogin(formData.email, formData.password);
        console.log('Admin login successful, redirecting to admin dashboard');
        navigate('/admin');
      } catch (error) {
        console.error('Admin login error:', error);
        setLoginError(
          error.response?.data?.error || 
          error.message || 
          'Invalid admin credentials. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrandedHeader />
      
      <Container component="main" maxWidth="sm" sx={{ py: 8, flex: 1 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Logo size="large" />
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 3,
              p: 1,
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 1
            }}
          >
            <AdminPanelSettingsIcon sx={{ mr: 1 }} />
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              Administrator Login
            </Typography>
          </Box>
          
          {loginError && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {loginError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Admin Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Admin Sign In'}
            </Button>
            
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/admin/forgot-password" variant="body2" color="primary.main">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 4 }} />
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Are you a client?
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                color="secondary"
              >
                Client Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      
      <BrandedFooter />
    </Box>
  );
};

export default BrandedAdminLogin; 