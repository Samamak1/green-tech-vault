import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  Chip,
  Alert,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Autocomplete
} from '@mui/material';
import { 
  Add as AddIcon,
  Visibility as VisibilityIcon,
  GetApp as DownloadIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
  Delete as DeleteIcon,
  Publish as PublishIcon,
  FilterList as FilterIcon,
  Schedule as ScheduleIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { reportAPI } from '../services/api';
import { formatCO2, formatWeight } from '../utils/environmentalImpact';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Monthly',
    title: '',
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
    includeCharts: true,
    includeDetailedBreakdown: true,
    includeEnvironmentalImpact: true,
    includeFinancialSummary: false,
    clientId: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [generating, setGenerating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'All',
    status: 'All',
    clientId: null
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
    fetchClients();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await reportAPI.getAll();
      const reportsData = res.data?.data || [];
      
      // Ensure each report has the required structure
      const normalizedReports = reportsData.map(report => ({
        _id: report._id || Date.now().toString(),
        title: report.title || 'Untitled Report',
        type: report.type || 'Custom',
        status: report.status || 'Draft',
        dateRange: report.dateRange || {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          endDate: new Date()
        },
        impactSummary: report.impactSummary || {
          totalDevicesCollected: 0,
          totalCO2Saved: 0,
          totalWeightCollected: 0,
          totalLandfillDiverted: 0
        },
        company: report.company || null,
        createdAt: report.createdAt || new Date(),
        ...report
      }));
      
      setReports(normalizedReports);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load reports');
      console.error('Reports fetch error:', err);
      // Set empty array on error to prevent undefined issues
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      // Fetch client list for filtering
      const res = await axios.get('/api/companies');
      setClients(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
      endDate: new Date(),
      includeCharts: true,
      includeDetailedBreakdown: true,
      includeEnvironmentalImpact: true,
      includeFinancialSummary: false,
      clientId: null
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    
    let processedValue = value;
    
    // Handle date inputs
    if (name === 'startDate' || name === 'endDate') {
      processedValue = value ? new Date(value) : null;
    }
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : processedValue
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
        startDate: formData.startDate ? formData.startDate.toISOString() : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: formData.endDate ? formData.endDate.toISOString() : new Date().toISOString(),
        options: {
          includeCharts: formData.includeCharts,
          includeDetailedBreakdown: formData.includeDetailedBreakdown,
          includeEnvironmentalImpact: formData.includeEnvironmentalImpact,
          includeFinancialSummary: formData.includeFinancialSummary
        },
        clientId: formData.clientId
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

  const filteredReports = reports.filter(report => {
    if (filters.type !== 'All' && report.type !== filters.type) return false;
    if (filters.status !== 'All' && report.status !== filters.status) return false;
    if (filters.clientId && report.company !== filters.clientId) return false;
    return true;
  });

  const reportTypes = [
    { value: 'Pickup', label: 'Pickup Report', description: 'Individual pickup transaction details' },
    { value: 'Monthly', label: 'Monthly Report', description: 'Monthly summary of activities' },
    { value: 'Quarterly', label: 'Quarterly Report', description: 'Comprehensive quarterly analysis' },
    { value: 'Annual', label: 'Annual Report', description: 'Year-end sustainability report' },
    { value: 'Custom', label: 'Custom Report', description: 'Custom date range report' },
    { value: 'Client', label: 'Client Report', description: 'Client-specific impact report' },
    { value: 'Compliance', label: 'Compliance Report', description: 'Regulatory compliance report' },
    { value: 'Financial', label: 'Financial Report', description: 'Financial impact and savings report' }
  ];

  if (loading && reports.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={getContentContainerStyle()} data-boundary="true">
      <Box sx={getContentWrapperStyle()}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Environmental Impact Reports
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filters
            </Button>
            <Button
              variant="outlined"
              startIcon={<ScheduleIcon />}
              onClick={() => navigate('/admin/reports/scheduled')}
            >
              Scheduled Reports
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
            >
              Generate New Report
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="report tabs">
            <Tab label="All Reports" icon={<AssessmentIcon />} iconPosition="start" />
            <Tab label="Published Reports" icon={<PublishIcon />} iconPosition="start" />
            <Tab label="Draft Reports" icon={<PdfIcon />} iconPosition="start" />
            <Tab label="Client Reports" icon={<BusinessIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {filterOpen && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Filter Reports
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Report Type</InputLabel>
                    <Select
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      label="Report Type"
                    >
                      <MenuItem value="All">All Types</MenuItem>
                      {reportTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      label="Status"
                    >
                      <MenuItem value="All">All Status</MenuItem>
                      <MenuItem value="Published">Published</MenuItem>
                      <MenuItem value="Draft">Draft</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    options={clients}
                    getOptionLabel={(option) => option.companyName || option.name}
                    value={clients.find(c => c._id === filters.clientId) || null}
                    onChange={(e, newValue) => setFilters({ ...filters, clientId: newValue?._id || null })}
                    renderInput={(params) => <TextField {...params} label="Client" />}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {filteredReports.length === 0 ? (
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
                  <TableCell>Client</TableCell>
                  <TableCell>Date Range</TableCell>
                  <TableCell align="right">Devices</TableCell>
                  <TableCell align="right">CO₂ Saved</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report._id}>
                    <TableCell component="th" scope="row">
                      {report.title || 'Untitled Report'}
                    </TableCell>
                    <TableCell>
                      <Chip label={report.type || 'Unknown'} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>{report.company?.companyName || 'All Clients'}</TableCell>
                    <TableCell>
                      {report.dateRange?.startDate && report.dateRange?.endDate 
                        ? `${new Date(report.dateRange.startDate).toLocaleDateString()} - ${new Date(report.dateRange.endDate).toLocaleDateString()}`
                        : 'Date range not available'}
                    </TableCell>
                    <TableCell align="right">
                      {report.impactSummary?.totalDevicesCollected || 0}
                    </TableCell>
                    <TableCell align="right">
                      {formatCO2(report.impactSummary?.totalCO2Saved || 0)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={report.status || 'Draft'} 
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
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
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
                <Grid item xs={12} sm={6}>
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
                      {reportTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box>
                            <Typography variant="body1">{type.label}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {type.description}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={clients}
                    getOptionLabel={(option) => option.companyName || option.name}
                    value={clients.find(c => c._id === formData.clientId) || null}
                    onChange={(e, newValue) => setFormData({ ...formData, clientId: newValue?._id || null })}
                    renderInput={(params) => <TextField {...params} label="Client (Optional)" />}
                  />
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
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Report Sections
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.includeCharts}
                            onChange={handleInputChange}
                            name="includeCharts"
                          />
                        }
                        label="Include Charts & Visualizations"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.includeDetailedBreakdown}
                            onChange={handleInputChange}
                            name="includeDetailedBreakdown"
                          />
                        }
                        label="Include Detailed Device Breakdown"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.includeEnvironmentalImpact}
                            onChange={handleInputChange}
                            name="includeEnvironmentalImpact"
                          />
                        }
                        label="Include Environmental Impact"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.includeFinancialSummary}
                            onChange={handleInputChange}
                            name="includeFinancialSummary"
                          />
                        }
                        label="Include Financial Summary"
                      />
                    </Grid>
                  </Grid>
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
    </Box>
  );
};

export default Reports; 