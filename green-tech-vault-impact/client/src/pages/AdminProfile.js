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
import { useProfile } from '../context/ProfileContext';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const Input = styled('input')({
  display: 'none',
});

const AdminProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profileData, profilePictureUrl, loading, updateProfileData, updateProfilePicture } = useProfile();
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [currentSection, setCurrentSection] = useState(null);

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  const handleEdit = (section) => {
    setFormData({ ...profileData });
    setEditing(true);
    setCurrentSection(section);
  };

  const handleSave = () => {
    // Update profile data in the context
    updateProfileData(formData);
    setEditing(false);
    setCurrentSection(null);
  };

  const handleCancel = () => {
    // Reset form data and exit edit mode
    setFormData({ ...profileData });
    setEditing(false);
    setCurrentSection(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update the profile picture in the context
      updateProfilePicture(file);
    }
  };

  // Use useEffect to sync formData with profileData changes
  useEffect(() => {
    if (profileData) {
      setFormData({ ...profileData });
    }
  }, [profileData]);

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

  // Mock location data to match the image design
  const addressData = {
    country: "United Kingdom",
    city: "Leeds, East London",
    postalCode: "ERT 2354",
    taxId: "AS45645756"
  };

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>My Profile</Typography>
        
        {/* Profile Header Card */}
        <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Box>
              <Avatar
                src={profilePictureUrl}
                sx={{ 
                  width: 200, 
                  height: 200,
                  bgcolor: profilePictureUrl ? 'transparent' : '#1C392B',
                  fontSize: '2rem',
                  mr: 3
                }}
              >
                {!profilePictureUrl && profileData.fullName.charAt(0)}
              </Avatar>
              {/* Camera icon for profile upload - only show when editing profile */}
              {editing && currentSection === 'profile' && (
                <Box sx={{ position: 'absolute', bottom: 0, left: 100 }}>
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
                        width: 28,
                        height: 28
                      }}
                    >
                      <CameraIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </label>
                </Box>
              )}
            </Box>
            <Box>
              <Typography variant="h6">{profileData.fullName}</Typography>
              <Typography variant="body1" color="text.secondary">{profileData.jobTitle}</Typography>
              <Typography variant="body2" color="text.secondary">Leeds, United Kingdom</Typography>
            </Box>
            <Button 
              startIcon={<EditIcon />}
              size="small"
              sx={{ 
                ml: 'auto',
                color: '#4ECDC4', 
                fontSize: '0.8rem', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                py: 0.5,
                px: 1.5,
              }}
              onClick={() => handleEdit('profile')}
            >
              Edit
            </Button>
          </Box>
        </Paper>

        {/* Personal Information Section */}
        <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">Personal Information</Typography>
            {!editing || currentSection !== 'personal' ? (
              <Button 
                startIcon={<EditIcon />}
                size="small"
                sx={{ 
                  color: '#4ECDC4', 
                  fontSize: '0.8rem', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  py: 0.5,
                  px: 1.5,
                }}
                onClick={() => handleEdit('personal')}
              >
                Edit
              </Button>
            ) : (
              <Box>
                <Button 
                  onClick={handleCancel}
                  sx={{ 
                    color: '#666',
                    mr: 2,
                    borderRadius: 8,
                    textTransform: 'none'
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained"
                  onClick={handleSave}
                  sx={{ 
                    bgcolor: '#4ECDC4', 
                    color: 'white',
                    '&:hover': { bgcolor: '#3dbdb5' }, 
                    borderRadius: 8,
                    textTransform: 'none'
                  }}
                >
                  Save
                </Button>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={4}>
            {/* First Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">First Name</Typography>
              {editing && currentSection === 'personal' ? (
                <TextField
                  fullWidth
                  name="firstName"
                  value={formData.firstName || profileData.fullName.split(' ')[0]}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{profileData.fullName.split(' ')[0]}</Typography>
              )}
            </Grid>
            
            {/* Last Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Last Name</Typography>
              {editing && currentSection === 'personal' ? (
                <TextField
                  fullWidth
                  name="lastName"
                  value={formData.lastName || profileData.fullName.split(' ').slice(1).join(' ')}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{profileData.fullName.split(' ').slice(1).join(' ')}</Typography>
              )}
            </Grid>
            
            {/* Email */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Email address</Typography>
              {editing && currentSection === 'personal' ? (
                <TextField
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{profileData.email}</Typography>
              )}
            </Grid>
            
            {/* Phone */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Phone</Typography>
              {editing && currentSection === 'personal' ? (
                <TextField
                  fullWidth
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{profileData.phone}</Typography>
              )}
            </Grid>
            
            {/* Position Title (formerly Bio) */}
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Position Title</Typography>
              {editing && currentSection === 'personal' ? (
                <TextField
                  fullWidth
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{profileData.jobTitle}</Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
        
        {/* Address Section */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">Address</Typography>
            {!editing || currentSection !== 'address' ? (
              <Button 
                startIcon={<EditIcon />}
                size="small"
                sx={{ 
                  color: '#4ECDC4', 
                  fontSize: '0.8rem', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  py: 0.5,
                  px: 1.5,
                }}
                onClick={() => handleEdit('address')}
              >
                Edit
              </Button>
            ) : (
              <Box>
                <Button 
                  onClick={handleCancel}
                  sx={{ 
                    color: '#666',
                    mr: 2,
                    borderRadius: 8,
                    textTransform: 'none'
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained"
                  onClick={handleSave}
                  sx={{ 
                    bgcolor: '#4ECDC4', 
                    color: 'white',
                    '&:hover': { bgcolor: '#3dbdb5' }, 
                    borderRadius: 8,
                    textTransform: 'none'
                  }}
                >
                  Save
                </Button>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={4}>
            {/* Country */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Country</Typography>
              {editing && currentSection === 'address' ? (
                <TextField
                  fullWidth
                  name="country"
                  value={formData.country || addressData.country}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{addressData.country}</Typography>
              )}
            </Grid>
            
            {/* City/State */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">City/State</Typography>
              {editing && currentSection === 'address' ? (
                <TextField
                  fullWidth
                  name="city"
                  value={formData.city || addressData.city}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{addressData.city}</Typography>
              )}
            </Grid>
            
            {/* Postal Code */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Postal Code</Typography>
              {editing && currentSection === 'address' ? (
                <TextField
                  fullWidth
                  name="postalCode"
                  value={formData.postalCode || addressData.postalCode}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{addressData.postalCode}</Typography>
              )}
            </Grid>
            
            {/* Tax ID */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">TAX ID</Typography>
              {editing && currentSection === 'address' ? (
                <TextField
                  fullWidth
                  name="taxId"
                  value={formData.taxId || addressData.taxId}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{addressData.taxId}</Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminProfile; 