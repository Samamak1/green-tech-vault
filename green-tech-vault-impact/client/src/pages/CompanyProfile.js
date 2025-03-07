import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Tooltip,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon,
  Visibility as VisibilityIcon,
  GetApp as DownloadIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
  Delete as DeleteIcon,
  Publish as PublishIcon
} from '@mui/icons-material';
import { reportAPI } from '../services/api';
import { formatCO2, formatWeight } from '../utils/environmentalImpact';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Monthly',
    title: '',
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date()
  });
  const [formErrors, setFormErrors] = useState({});
  const [generating, setGenerating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await reportAPI.getAll();
      setReports(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load reports');
      console.error('Reports fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      type: 'Monthly',
      title: '',
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date()
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    }
    
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      errors.endDate = 'End date must be after start date';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGenerateReport = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      setGenerating(true);
      
      const reportData = {
        type: formData.type,
        title: formData.title,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString()
      };
      
      await reportAPI.generate(reportData);
      
      // Refresh reports list
      await fetchReports();
      
      // Close dialog
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate report');
      console.error('Report generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleViewReport = (id) => {
    navigate(`/reports/${id}`);
  };

  const handleDownloadPdf = async (id) => {
    try {
      const res = await reportAPI.downloadPdf(id);
      
      // Create a blob from the PDF data
      const blob = new Blob([res.data], { type: 'application/pdf' });
      
      // Create a link and click it to trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Find the report to use its title for the filename
      const report = reports.find(r => r._id === id);
      const filename = report ? `${report.title.replace(/\s+/g, '_')}.pdf` : `report_${id}.pdf`;
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to download PDF');
      console.error('PDF download error:', err);
    }
  };

  const handleDownloadCsv = async (id) => {
    try {
      const res = await reportAPI.downloadCsv(id);
      
      // Create a blob from the CSV data
      const blob = new Blob([res.data], { type: 'text/csv' });
      
      // Create a link and click it to trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Find the report to use its title for the filename
      const report = reports.find(r => r._id === id);
      const filename = report ? `${report.title.replace(/\s+/g, '_')}.csv` : `report_${id}.csv`;
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to download CSV');
      console.error('CSV download error:', err);
    }
  };

  const handleOpenDeleteDialog = (report) => {
    setReportToDelete(report);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setReportToDelete(null);
  };

  const handleDeleteReport = async () => {
    if (!reportToDelete) return;
    
    try {
      await reportAPI.delete(reportToDelete._id);
      
      // Refresh reports list
      await fetchReports();
      
      // Close dialog
      handleCloseDeleteDialog();
    } catch (err) {
      setError('Failed to delete report');
      console.error('Report deletion error:', err);
    }
  };

  const handlePublishReport = async (id) => {
    try {
      await reportAPI.publish(id);
      
      // Refresh reports list
      await fetchReports();
    } catch (err) {
      setError('Failed to publish report');
      console.error('Report publishing error:', err);
    }
  };

  if (loading && reports.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Environmental Impact Reports
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Generate New Report
        </Button>
      </Box>

      {error && (
        <Box sx={{ mb: 3 }}>
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        </Box>
      )}

      {reports.length === 0 ? (
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No reports found
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Generate your first environmental impact report to track your e-waste management efforts.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
              >
                Generate New Report
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="reports table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date Range</TableCell>
                <TableCell align="right">Devices</TableCell>
                <TableCell align="right">CO₂ Saved</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report._id}>
                  <TableCell component="th" scope="row">
                    {report.title}
                  </TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>
                    {new Date(report.dateRange.startDate).toLocaleDateString()} - {new Date(report.dateRange.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    {report.impactSummary.totalDevicesCollected}
                  </TableCell>
                  <TableCell align="right">
                    {formatCO2(report.impactSummary.totalCO2Saved)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={report.status} 
                      color={report.status === 'Published' ? 'success' : 'default'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title="View Report">
                        <IconButton size="small" onClick={() => handleViewReport(report._id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download PDF">
                        <IconButton size="small" onClick={() => handleDownloadPdf(report._id)}>
                          <PdfIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download CSV">
                        <IconButton size="small" onClick={() => handleDownloadCsv(report._id)}>
                          <CsvIcon />
                        </IconButton>
                      </Tooltip>
                      {report.status === 'Draft' && (
                        <Tooltip title="Publish Report">
                          <IconButton size="small" onClick={() => handlePublishReport(report._id)}>
                            <PublishIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete Report">
                        <IconButton size="small" onClick={() => handleOpenDeleteDialog(report)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Generate Report Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Environmental Impact Report</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Report Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={!!formErrors.title}
                  helperText={formErrors.title}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="report-type-label">Report Type</InputLabel>
                  <Select
                    labelId="report-type-label"
                    id="report-type"
                    name="type"
                    value={formData.type}
                    label="Report Type"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Pickup">Pickup</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Annual">Annual</MenuItem>
                    <MenuItem value="Custom">Custom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  error={!!formErrors.startDate}
                  helperText={formErrors.startDate}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  error={!!formErrors.endDate}
                  helperText={formErrors.endDate}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleGenerateReport}
            variant="contained"
            disabled={generating}
            startIcon={generating ? <CircularProgress size={20} /> : null}
          >
            {generating ? 'Generating...' : 'Generate Report'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Report</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete the report "{reportToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteReport} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports; 