import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Slider,
  AppBar,
  Toolbar,
  Avatar,
  IconButton
} from '@mui/material';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';
import { 
  Notifications as NotificationsIcon, 
  Palette as PaletteIcon, 
  Lock as LockIcon, 
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  
  // Settings states
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pickupReminders: true,
    marketingEmails: false,
    reportNotifications: true,
    smsNotifications: false
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 14,
    density: 'comfortable',
    dashboardLayout: 'expanded'
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    rememberDevice: true,
    loginNotifications: true,
    passwordExpiryDays: 90
  });
  
  const [emailSettings, setEmailSettings] = useState({
    emailFrequency: 'daily',
    emailFormat: 'html',
    emailDigest: true,
    emailSignature: 'Best regards,\nLeila Meyer\nCEO | Leila\'s Company'
  });

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleNotificationChange = (event) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.checked
    });
  };
  
  const handleAppearanceChange = (event) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [event.target.name]: event.target.value
    });
  };
  
  const handleFontSizeChange = (event, newValue) => {
    setAppearanceSettings({
      ...appearanceSettings,
      fontSize: newValue
    });
  };
  
  const handleSecurityChange = (event) => {
    setSecuritySettings({
      ...securitySettings,
      [event.target.name]: 
        typeof event.target.checked !== 'undefined' 
          ? event.target.checked 
          : event.target.value
    });
  };
  
  const handleEmailChange = (event) => {
    setEmailSettings({
      ...emailSettings,
      [event.target.name]: 
        typeof event.target.checked !== 'undefined' 
          ? event.target.checked 
          : event.target.value
    });
  };

  const saveSettings = () => {
    // In a real app, would save to backend/API
    alert('Settings saved successfully!');
  };

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={{ ...getContentWrapperStyle(), mt: '64px' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Account Settings
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            {/* Settings Navigation */}
            <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    py: 2,
                    textTransform: 'none'
                  },
                  '& .Mui-selected': {
                    color: '#185B5F !important',
                    backgroundColor: 'rgba(24, 91, 95, 0.08)'
                  },
                  '& .MuiTabs-indicator': {
                    left: 0,
                    width: 4,
                    backgroundColor: '#185B5F'
                  }
                }}
              >
                <Tab 
                  icon={<NotificationsIcon />} 
                  iconPosition="start" 
                  label="Notifications" 
                  sx={{ minHeight: 'unset' }} 
                />
                <Tab 
                  icon={<PaletteIcon />} 
                  iconPosition="start" 
                  label="Appearance" 
                  sx={{ minHeight: 'unset' }} 
                />
                <Tab 
                  icon={<LockIcon />} 
                  iconPosition="start" 
                  label="Security" 
                  sx={{ minHeight: 'unset' }} 
                />
                <Tab 
                  icon={<EmailIcon />} 
                  iconPosition="start" 
                  label="Email Preferences" 
                  sx={{ minHeight: 'unset' }} 
                />
              </Tabs>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            {/* Settings Content */}
            {activeTab === 0 && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Notification Settings</Typography>
                <Divider sx={{ mb: 3 }} />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notificationSettings.emailNotifications} 
                      onChange={handleNotificationChange} 
                      name="emailNotifications"
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notificationSettings.pickupReminders} 
                      onChange={handleNotificationChange} 
                      name="pickupReminders"
                      color="primary"
                    />
                  }
                  label="Pickup Reminders"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notificationSettings.marketingEmails} 
                      onChange={handleNotificationChange} 
                      name="marketingEmails"
                      color="primary"
                    />
                  }
                  label="Marketing Emails"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notificationSettings.reportNotifications} 
                      onChange={handleNotificationChange} 
                      name="reportNotifications"
                      color="primary"
                    />
                  }
                  label="Report Notifications"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notificationSettings.smsNotifications} 
                      onChange={handleNotificationChange} 
                      name="smsNotifications"
                      color="primary"
                    />
                  }
                  label="SMS Notifications"
                  sx={{ mb: 3, display: 'block' }}
                />
                
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={saveSettings}
                  sx={{ 
                    bgcolor: '#185B5F', 
                    '&:hover': { bgcolor: '#124548' },
                    borderRadius: 8,
                    textTransform: 'none'
                  }}
                >
                  Save Changes
                </Button>
              </Paper>
            )}
            
            {activeTab === 1 && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Appearance Settings</Typography>
                <Divider sx={{ mb: 3 }} />
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="theme-select-label">Theme</InputLabel>
                  <Select
                    labelId="theme-select-label"
                    id="theme-select"
                    value={appearanceSettings.theme}
                    label="Theme"
                    name="theme"
                    onChange={handleAppearanceChange}
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System Default</MenuItem>
                  </Select>
                </FormControl>
                
                <Typography id="font-size-slider" gutterBottom>
                  Font Size: {appearanceSettings.fontSize}px
                </Typography>
                <Slider
                  value={appearanceSettings.fontSize}
                  onChange={handleFontSizeChange}
                  aria-labelledby="font-size-slider"
                  step={1}
                  marks
                  min={12}
                  max={18}
                  sx={{ mb: 3 }}
                />
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="density-select-label">UI Density</InputLabel>
                  <Select
                    labelId="density-select-label"
                    id="density-select"
                    value={appearanceSettings.density}
                    label="UI Density"
                    name="density"
                    onChange={handleAppearanceChange}
                  >
                    <MenuItem value="compact">Compact</MenuItem>
                    <MenuItem value="comfortable">Comfortable</MenuItem>
                    <MenuItem value="spacious">Spacious</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="layout-select-label">Dashboard Layout</InputLabel>
                  <Select
                    labelId="layout-select-label"
                    id="layout-select"
                    value={appearanceSettings.dashboardLayout}
                    label="Dashboard Layout"
                    name="dashboardLayout"
                    onChange={handleAppearanceChange}
                  >
                    <MenuItem value="expanded">Expanded</MenuItem>
                    <MenuItem value="compact">Compact</MenuItem>
                    <MenuItem value="minimal">Minimal</MenuItem>
                  </Select>
                </FormControl>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={saveSettings}
                  sx={{ 
                    bgcolor: '#185B5F', 
                    '&:hover': { bgcolor: '#124548' },
                    borderRadius: 8,
                    textTransform: 'none'
                  }}
                >
                  Save Changes
                </Button>
              </Paper>
            )}
            
            {activeTab === 2 && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Security Settings</Typography>
                <Divider sx={{ mb: 3 }} />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={securitySettings.twoFactorAuth} 
                      onChange={handleSecurityChange} 
                      name="twoFactorAuth"
                      color="primary"
                    />
                  }
                  label="Two-Factor Authentication"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={securitySettings.rememberDevice} 
                      onChange={handleSecurityChange} 
                      name="rememberDevice"
                      color="primary"
                    />
                  }
                  label="Remember Device"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={securitySettings.loginNotifications} 
                      onChange={handleSecurityChange} 
                      name="loginNotifications"
                      color="primary"
                    />
                  }
                  label="Login Notifications"
                  sx={{ mb: 3, display: 'block' }}
                />
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="password-expiry-label">Password Expiry Days</InputLabel>
                  <Select
                    labelId="password-expiry-label"
                    id="password-expiry"
                    value={securitySettings.passwordExpiryDays}
                    label="Password Expiry Days"
                    name="passwordExpiryDays"
                    onChange={handleSecurityChange}
                  >
                    <MenuItem value={30}>30 days</MenuItem>
                    <MenuItem value={60}>60 days</MenuItem>
                    <MenuItem value={90}>90 days</MenuItem>
                    <MenuItem value={180}>180 days</MenuItem>
                    <MenuItem value={0}>Never</MenuItem>
                  </Select>
                </FormControl>
                
                <Box sx={{ mb: 3 }}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    sx={{ 
                      mb: 2,
                      borderRadius: 8,
                      textTransform: 'none',
                      mr: 2,
                      borderColor: '#185B5F',
                      color: '#185B5F',
                      '&:hover': { borderColor: '#124548', bgcolor: 'rgba(24, 91, 95, 0.04)' }
                    }}
                  >
                    Change Password
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    color="error"
                    sx={{ 
                      mb: 2,
                      borderRadius: 8,
                      textTransform: 'none'
                    }}
                  >
                    Revoke All Sessions
                  </Button>
                </Box>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={saveSettings}
                  sx={{ 
                    bgcolor: '#185B5F', 
                    '&:hover': { bgcolor: '#124548' },
                    borderRadius: 8,
                    textTransform: 'none'
                  }}
                >
                  Save Changes
                </Button>
              </Paper>
            )}
            
            {activeTab === 3 && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Email Preferences</Typography>
                <Divider sx={{ mb: 3 }} />
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="email-frequency-label">Email Frequency</InputLabel>
                  <Select
                    labelId="email-frequency-label"
                    id="email-frequency"
                    value={emailSettings.emailFrequency}
                    label="Email Frequency"
                    name="emailFrequency"
                    onChange={handleEmailChange}
                  >
                    <MenuItem value="realtime">Real-time</MenuItem>
                    <MenuItem value="daily">Daily Digest</MenuItem>
                    <MenuItem value="weekly">Weekly Digest</MenuItem>
                    <MenuItem value="never">Never</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="email-format-label">Email Format</InputLabel>
                  <Select
                    labelId="email-format-label"
                    id="email-format"
                    value={emailSettings.emailFormat}
                    label="Email Format"
                    name="emailFormat"
                    onChange={handleEmailChange}
                  >
                    <MenuItem value="html">HTML</MenuItem>
                    <MenuItem value="text">Plain Text</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={emailSettings.emailDigest} 
                      onChange={handleEmailChange} 
                      name="emailDigest"
                      color="primary"
                    />
                  }
                  label="Receive Email Digest"
                  sx={{ mb: 3, display: 'block' }}
                />
                
                <TextField
                  fullWidth
                  label="Email Signature"
                  name="emailSignature"
                  value={emailSettings.emailSignature}
                  onChange={handleEmailChange}
                  multiline
                  rows={4}
                  sx={{ mb: 3 }}
                />
                
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={saveSettings}
                  sx={{ 
                    bgcolor: '#185B5F', 
                    '&:hover': { bgcolor: '#124548' },
                    borderRadius: 8,
                    textTransform: 'none'
                  }}
                >
                  Save Changes
                </Button>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Settings; 