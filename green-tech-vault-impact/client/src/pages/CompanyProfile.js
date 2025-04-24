import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  Divider,
  Avatar
} from '@mui/material';
import { 
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { userAPI } from '../services/api';
import ClientDashboardLayout from '../components/layout/ClientDashboardLayout';

const CompanyProfile = () => {
  const [profile, setProfile] = useState({
    companyName: '',
    industry: '',
    employeeCount: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    contactPerson: {
      name: '',
      email: '',
      phone: ''
    },
    logo: null,
    sustainabilityGoals: '',
    carbonFootprintTarget: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      const res = await userAPI.getCompanyProfile();
      setProfile(res.data.data);
      setEditedProfile(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load company profile');
      console.error('Company profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setEditedProfile({
        ...editedProfile,
        [section]: {
          ...editedProfile[section],
          [field]: value
        }
      });
    } else {
      setEditedProfile({
        ...editedProfile,
        [name]: value
      });
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - revert changes
      setEditedProfile(profile);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await userAPI.updateCompanyProfile(editedProfile);
      
      // Update the profile state with saved data
      setProfile(editedProfile);
      
      // Exit edit mode
      setIsEditing(false);
      
      // Show success message
      setSuccessMessage('Company profile updated successfully!');
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update company profile');
      console.error('Company profile update error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <ClientDashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      </ClientDashboardLayout>
    );
  }

  return (
    <ClientDashboardLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Company Profile
          </Typography>
          <Button
            variant={isEditing ? "outlined" : "contained"}
            color={isEditing ? "error" : "primary"}
            startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
            onClick={handleEditToggle}
            disabled={saving}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Company Information Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <BusinessIcon />
                  </Avatar>
                  <Typography variant="h6">Company Information</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    value={isEditing ? editedProfile.companyName : profile.companyName}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={!isEditing}
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Industry"
                    name="industry"
                    value={isEditing ? editedProfile.industry : profile.industry}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={!isEditing}
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Employee Count"
                    name="employeeCount"
                    type="number"
                    value={isEditing ? editedProfile.employeeCount : profile.employeeCount}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={!isEditing}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Address Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Company Address
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    name="address.street"
                    value={isEditing ? editedProfile.address?.street : profile.address?.street}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={!isEditing}
                  />
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="address.city"
                      value={isEditing ? editedProfile.address?.city : profile.address?.city}
                      onChange={handleInputChange}
                      margin="normal"
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="State/Province"
                      name="address.state"
                      value={isEditing ? editedProfile.address?.state : profile.address?.state}
                      onChange={handleInputChange}
                      margin="normal"
                      disabled={!isEditing}
                    />
                  </Grid>
                </Grid>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Zip/Postal Code"
                      name="address.zipCode"
                      value={isEditing ? editedProfile.address?.zipCode : profile.address?.zipCode}
                      onChange={handleInputChange}
                      margin="normal"
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="address.country"
                      value={isEditing ? editedProfile.address?.country : profile.address?.country}
                      onChange={handleInputChange}
                      margin="normal"
                      disabled={!isEditing}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Person Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Primary Contact
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Contact Name"
                    name="contactPerson.name"
                    value={isEditing ? editedProfile.contactPerson?.name : profile.contactPerson?.name}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={!isEditing}
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    name="contactPerson.email"
                    type="email"
                    value={isEditing ? editedProfile.contactPerson?.email : profile.contactPerson?.email}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={!isEditing}
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    name="contactPerson.phone"
                    value={isEditing ? editedProfile.contactPerson?.phone : profile.contactPerson?.phone}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={!isEditing}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Sustainability Goals Card */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sustainability Goals
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Sustainability Goals"
                    name="sustainabilityGoals"
                    value={isEditing ? editedProfile.sustainabilityGoals : profile.sustainabilityGoals}
                    onChange={handleInputChange}
                    margin="normal"
                    multiline
                    rows={3}
                    disabled={!isEditing}
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Carbon Footprint Reduction Target"
                    name="carbonFootprintTarget"
                    value={isEditing ? editedProfile.carbonFootprintTarget : profile.carbonFootprintTarget}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={!isEditing}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {isEditing && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
              onClick={handleSaveProfile}
              disabled={saving}
              sx={{ ml: 2 }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ClientDashboardLayout>
  );
};

export default CompanyProfile; 