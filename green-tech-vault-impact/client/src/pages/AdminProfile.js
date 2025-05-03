import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Avatar, 
  IconButton,
  InputAdornment,
  Divider,
  styled
} from '@mui/material';
import {
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CameraAlt as CameraIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Input = styled('input')({
  display: 'none',
});

const AdminProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    username: '',
    password: '••••••••',
    profilePicture: null
  });
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the actual user profile data
    // For now, we'll use mock data
    const fetchProfileData = () => {
      setLoading(true);
      
      // Mock profile data
      const mockProfile = {
        fullName: 'Leila Meyer',
        jobTitle: 'CEO',
        email: 'leila.meyer@greentechvault.com',
        phone: '(555) 123-4567',
        username: 'lmeyer',
        password: '••••••••',
        profilePicture: null
      };
      
      setProfileData(mockProfile);
      setLoading(false);
    };
    
    fetchProfileData();
  }, []);

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // In a real app, you would save the profile data to the server
    console.log('Saving profile data:', profileData);
    setEditing(false);
  };

  const handleCancel = () => {
    // Reset any changes
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        profilePicture: file
      });
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        pl: 3,
        pr: 3,
        pt: 3,
        pb: 3,
        ml: 0,
        mr: 0
      }}>
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ 
      pl: 3,
      pr: 3,
      pt: 3,
      pb: 3,
      ml: 0,
      mr: 0
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleGoBack}
            sx={{ color: '#888', fontSize: '0.9rem', fontWeight: 'normal', textTransform: 'none' }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h6" sx={{ ml: 2, color: '#444', fontWeight: 500 }}>
            My Profile
          </Typography>
        </Box>
        {!editing ? (
          <Button 
            startIcon={<EditIcon />} 
            onClick={handleEdit}
            sx={{ 
              bgcolor: '#4ECDC4', 
              color: 'white',
              '&:hover': { bgcolor: '#3dbdb5' }, 
              borderRadius: '8px',
              px: 3,
              py: 1,
              textTransform: 'none'
            }}
          >
            Edit Profile
          </Button>
        ) : (
          <Box>
            <Button 
              onClick={handleCancel}
              sx={{ 
                color: '#666',
                mr: 2,
                borderRadius: '8px',
                px: 3,
                py: 1,
                textTransform: 'none'
              }}
            >
              Cancel
            </Button>
            <Button 
              startIcon={<SaveIcon />} 
              onClick={handleSave}
              sx={{ 
                bgcolor: '#4ECDC4', 
                color: 'white',
                '&:hover': { bgcolor: '#3dbdb5' }, 
                borderRadius: '8px',
                px: 3,
                py: 1,
                textTransform: 'none'
              }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
              {/* Profile Picture */}
              <Box sx={{ position: 'relative', mr: 4 }}>
                <Avatar
                  src={previewUrl || (profileData.profilePicture ? URL.createObjectURL(profileData.profilePicture) : null)}
                  sx={{ 
                    width: 120, 
                    height: 120,
                    bgcolor: profileData.profilePicture ? 'transparent' : '#1C392B',
                    fontSize: '2.5rem'
                  }}
                >
                  {!profileData.profilePicture && !previewUrl && profileData.fullName.charAt(0)}
                </Avatar>
                {editing && (
                  <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <label htmlFor="profile-picture-upload">
                      <Input
                        accept="image/*"
                        id="profile-picture-upload"
                        type="file"
                        onChange={handleProfilePictureChange}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        sx={{ 
                          bgcolor: '#4ECDC4',
                          color: 'white',
                          '&:hover': { bgcolor: '#3dbdb5' },
                          width: 36,
                          height: 36
                        }}
                      >
                        <CameraIcon fontSize="small" />
                      </IconButton>
                    </label>
                  </Box>
                )}
              </Box>

              {/* Profile Details */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 500, color: '#333' }}>
                    {profileData.fullName}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {profileData.jobTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profileData.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profileData.phone}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500, color: '#333' }}>
              Account Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  disabled={!editing}
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: { bgcolor: editing ? 'white' : '#f5f5f5' }
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={profileData.jobTitle}
                  onChange={handleChange}
                  disabled={!editing}
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: { bgcolor: editing ? 'white' : '#f5f5f5' }
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!editing}
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: { bgcolor: editing ? 'white' : '#f5f5f5' }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: { bgcolor: editing ? 'white' : '#f5f5f5' }
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                  disabled={!editing}
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: { bgcolor: editing ? 'white' : '#f5f5f5' }
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={profileData.password}
                  onChange={handleChange}
                  disabled={!editing}
                  InputProps={{
                    sx: { bgcolor: editing ? 'white' : '#f5f5f5' },
                    endAdornment: editing && (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            
            {editing && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, mr: 2 }}>
                  * All fields are required
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminProfile; 