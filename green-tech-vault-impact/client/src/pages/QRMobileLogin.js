import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  PhoneAndroid as PhoneIcon,
  QrCode as QrCodeIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

// Mock QR code image (in a real app, this would be generated)
const qrCodeImage = 'data:image/png;base64,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';

const QRMobileLogin = () => {
  const [expiryTime, setExpiryTime] = useState(300); // 5 minutes in seconds
  const [qrCode, setQrCode] = useState(qrCodeImage);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setExpiryTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Generate a new QR code
  const regenerateQRCode = () => {
    // In a real app, you would call an API to generate a new QR code
    // For now, we'll just reset the timer
    setExpiryTime(300);
  };

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <Typography variant="h5" sx={{ mb: 3 }}>QR Code for Mobile Login</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 2, mb: { xs: 3, md: 0 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <QrCodeIcon sx={{ fontSize: 48, color: '#1C392B', mb: 2 }} />
                
                <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
                  Scan this QR code with the Green Tech Vault mobile app
                </Typography>
                
                <Box 
                  component="img" 
                  src={qrCode} 
                  alt="QR Code for mobile login"
                  sx={{ 
                    width: '100%', 
                    maxWidth: 250,
                    height: 'auto',
                    mb: 3,
                    border: '1px solid #eee',
                    p: 2,
                    borderRadius: 2
                  }}
                />
                
                <Typography variant="body2" sx={{ mb: 1, color: expiryTime < 60 ? 'error.main' : 'text.secondary' }}>
                  Code expires in {formatTime(expiryTime)}
                </Typography>
                
                <Button 
                  variant="outlined" 
                  startIcon={<RefreshIcon />}
                  onClick={regenerateQRCode}
                  sx={{ mt: 2 }}
                  disabled={expiryTime > 0}
                >
                  Generate New Code
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                How to Login with QR Code
              </Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon sx={{ color: '#4ECDC4' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="1. Download the Green Tech Vault Mobile App" 
                    secondary="Available on iOS and Android app stores"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <QrCodeIcon sx={{ color: '#4ECDC4' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="2. Open the app and tap 'Scan QR Code'" 
                    secondary="You'll find this option on the login screen"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: '#4ECDC4' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="3. Scan the QR code displayed on this screen" 
                    secondary="Make sure your camera has permission to scan"
                  />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ bgcolor: 'rgba(78, 205, 196, 0.1)', p: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <InfoIcon sx={{ color: '#4ECDC4', mr: 1, mt: 0.3 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Benefits of QR Code Login
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ mb: 2, ml: 4 }}>
                  • Faster login without typing credentials
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 2, ml: 4 }}>
                  • Secure authentication method
                </Typography>
                
                <Typography variant="body2" sx={{ ml: 4 }}>
                  • Easy access to your account from mobile devices
                </Typography>
              </Box>
              
              <Card sx={{ mt: 3, bgcolor: '#1C392B', color: 'white' }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                    Need Help?
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    If you're having trouble logging in with QR code, please contact our support team at support@greentechvault.com or call (555) 123-4567.
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default QRMobileLogin; 