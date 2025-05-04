import React, { useState } from 'react';
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
import ClientDashboardLayout from '../components/layout/ClientDashboardLayout';

const Input = styled('input')({
  display: 'none',
});

const ClientProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profileData, profilePictureUrl, loading, updateProfileData, updateProfilePicture } = useProfile();
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [currentSection, setCurrentSection] = useState(null);

  const handleGoBack = () => {
    navigate('/dashboard');
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

  if (loading) {
    return (
      <ClientDashboardLayout>
        <Typography>Loading...</Typography>
      </ClientDashboardLayout>
    );
  }

  // Mock location data to match the image design
  const addressData = {
    country: "United States",
    city: "Cincinnati, Ohio",
    postalCode: "51729",
    taxId: "27-7865312"
  };

  return (
    <ClientDashboardLayout>
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontSize: '1rem' }}>My Profile</Typography>
        
        {/* Profile Header Card */}
        <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Box>
              <Avatar
                src={profilePictureUrl}
                sx={{ 
                  width: 80, 
                  height: 80,
                  bgcolor: profilePictureUrl ? 'transparent' : '#1C392B',
                  fontSize: '2rem',
                  mr: 3
                }}
              >
                {!profilePictureUrl && profileData?.fullName?.charAt(0) || 'L'}
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
              <Typography variant="h6">{profileData?.fullName || "Leila Meyer"}</Typography>
              <Typography variant="body1" color="text.secondary">{profileData?.jobTitle || "CEO"}</Typography>
              <Typography variant="body2" color="text.secondary">{addressData.city}</Typography>
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

        {/* Company Information Section */}
        <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">Company Information</Typography>
            {!editing || currentSection !== 'company' ? (
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
                onClick={() => handleEdit('company')}
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
            {/* Company Name */}
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Company Name</Typography>
              {editing && currentSection === 'company' ? (
                <TextField
                  fullWidth
                  name="fullName"
                  value={formData.fullName || "Leila's Company"}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{profileData?.fullName || "Leila's Company"}</Typography>
              )}
            </Grid>
            
            {/* Email */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Email address</Typography>
              {editing && currentSection === 'company' ? (
                <TextField
                  fullWidth
                  name="email"
                  value={formData.email || "leilaameyer2@gmail.com"}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{profileData?.email || "leilaameyer2@gmail.com"}</Typography>
              )}
            </Grid>
            
            {/* Phone */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Phone</Typography>
              {editing && currentSection === 'company' ? (
                <TextField
                  fullWidth
                  name="phone"
                  value={formData.phone || "(555) 123-4567"}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{profileData?.phone || "(555) 123-4567"}</Typography>
              )}
            </Grid>
            
            {/* Website */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Website</Typography>
              {editing && currentSection === 'company' ? (
                <TextField
                  fullWidth
                  name="website"
                  value={formData.website || "www.leilascompany.com"}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>www.leilascompany.com</Typography>
              )}
            </Grid>
            
            {/* Industry */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Industry</Typography>
              {editing && currentSection === 'company' ? (
                <TextField
                  fullWidth
                  name="industry"
                  value={formData.industry || "Technology"}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>Technology</Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
        
        {/* Account Information */}
        <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">Account Information</Typography>
            {!editing || currentSection !== 'account' ? (
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
                onClick={() => handleEdit('account')}
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
            {/* Username */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Username</Typography>
              {editing && currentSection === 'account' ? (
                <TextField
                  fullWidth
                  name="username"
                  value={formData.username || "@lmeyer"}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{profileData?.username || "@lmeyer"}</Typography>
              )}
            </Grid>
            
            {/* Password */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">Password</Typography>
              {editing && currentSection === 'account' ? (
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password || "********"}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>********</Typography>
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
            {/* Address */}
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Street Address</Typography>
              {editing && currentSection === 'address' ? (
                <TextField
                  fullWidth
                  name="address"
                  value={formData.address || "123 Green St"}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>123 Green St</Typography>
              )}
            </Grid>
            
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
    </ClientDashboardLayout>
  );
};

export default ClientProfile; 