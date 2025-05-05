import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import AdminLayout from '../components/layout/AdminLayout';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const AdminDeviceDetail = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the actual device data
    // For now, we'll use mock data
    const mockDevice = {
      id: deviceId,
      type: 'Laptop',
      manufacturer: 'Dell',
      model: 'XPS 15',
      serialNumber: 'DL12345678',
      status: 'Refurbished',
      weight: 2.5,
      pickupId: '1',
      clientId: '1',
      clientName: 'Tech Solutions Inc.'
    };

    setDevice(mockDevice);
    setLoading(false);
  }, [deviceId]);

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getStatusChipStyle = (status) => {
    switch(status?.toLowerCase()) {
      case 'refurbished':
        return { bgcolor: '#e3f7f5', color: '#4ECDC4', borderRadius: '16px' };
      case 'recycled':
        return { bgcolor: '#e3f2ff', color: '#2196f3', borderRadius: '16px' };
      case 'in processing':
      case 'processing':
        return { bgcolor: '#fff8e0', color: '#ffa000', borderRadius: '16px' };
      case 'disposed':
        return { bgcolor: '#ffebee', color: '#f44336', borderRadius: '16px' };
      default:
        return { bgcolor: '#e0e0e0', color: '#616161', borderRadius: '16px' };
    }
  };

  if (loading) {
    return (
      <Box sx={getContentContainerStyle()} data-boundary="true">
        <Box sx={getContentWrapperStyle()}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={getContentContainerStyle()} data-boundary="true">
        <Box sx={getContentWrapperStyle()}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <Box sx={{ p: 3 }}>
          {/* Header with back button */}
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={handleGoBack}
              sx={{ color: '#888', fontSize: '0.9rem', fontWeight: 'normal', textTransform: 'none' }}
            >
              Back to Dashboard
            </Button>
            <Typography variant="h6" sx={{ ml: 2, color: '#444', fontWeight: 500 }}>
              Device Details
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 3 }}>
            Details
          </Typography>

          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Grid container spacing={4}>
              {/* Left column - Device Image */}
              <Grid item xs={12} md={3}>
                <Box 
                  sx={{ 
                    border: '2px dashed #ccc', 
                    borderRadius: 2,
                    height: 220,
                    width: 220,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {imagePreview ? (
                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                      <img 
                        src={imagePreview} 
                        alt="Device" 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain' 
                        }} 
                      />
                      <IconButton 
                        sx={{ 
                          position: 'absolute', 
                          top: 8, 
                          right: 8, 
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.9)'
                          }
                        }}
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        id="device-image-upload"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <label htmlFor="device-image-upload">
                        <Button
                          component="span"
                          variant="outlined"
                          startIcon={<UploadIcon />}
                          sx={{ 
                            color: '#888', 
                            borderColor: '#ccc',
                            '&:hover': { 
                              borderColor: '#4ECDC4', 
                              color: '#4ECDC4'
                            }
                          }}
                        >
                          Upload Image
                        </Button>
                      </label>
                    </>
                  )}
                </Box>
              </Grid>

              {/* Right column - Device Details */}
              <Grid item xs={12} md={9}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Device Type:
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {device.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Manufacturer:
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {device.manufacturer}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Model:
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {device.model}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Serial Number:
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {device.serialNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status:
                    </Typography>
                    <Chip 
                      label={device.status} 
                      size="small" 
                      sx={getStatusChipStyle(device.status)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Weight:
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {device.weight}kg
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDeviceDetail; 