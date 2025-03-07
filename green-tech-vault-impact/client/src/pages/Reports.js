import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Pagination,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { 
  Add as AddIcon, 
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Share as ShareIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { reportAPI } from '../services/api';
import { formatDate } from '../utils/formatters';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'monthly',
    dateRange: {
      startDate: '',
      endDate: ''
    },
    format: 'pdf'
  });
  const [formError, setFormError] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [page]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await reportAPI.getReports({ page, limit: 10 });
      setReports(res.data.data);
      setTotalPages(Math.ceil(res.data.total / 10) || 1);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load reports');
      console.error('Reports fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    // Set default date range to current month
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    setFormData({
      title: `Environmental Impact Report - ${formatDate(firstDay, 'MMM YYYY')}`,
      type: 'monthly',
      dateRange: {
        startDate: firstDay.toISOString().split('T')[0],
        endDate: lastDay.toISOString().split('T')[0]
      },
      format: 'pdf'
    });
    setFormError(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else if (name === 'type') {
      // Adjust date range based on report type
      const today = new Date();
      let startDate, endDate, title;
      
      switch (value) {
        case 'monthly':
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          title = `Environmental Impact Report - ${formatDate(startDate, 'MMM YYYY')}`;
          break;
        case 'quarterly':
          const quarter = Math.floor(today.getMonth() / 3);
          startDate = new Date(today.getFullYear(), quarter * 3, 1);
          endDate = new Date(today.getFullYear(), (quarter + 1) * 3, 0);
          title = `Quarterly Environmental Impact Report - Q${quarter + 1} ${today.getFullYear()}`;
          break;
        case 'annual':
          startDate = new Date(today.getFullYear(), 0, 1);
          endDate = new Date(today.getFullYear(), 11, 31);
          title = `Annual Environmental Impact Report - ${today.getFullYear()}`;
          break;
        case 'custom':
          // Keep existing dates for custom
          startDate = new Date(formData.dateRange.startDate);
          endDate = new Date(formData.dateRange.endDate);
          title = `Custom Environmental Impact Report`;
          break;
        default:
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          title = `Environmental Impact Report - ${formatDate(startDate, 'MMM YYYY')}`;
      }
      
      setFormData({
        ...formData,
        title,
        type: value,
        dateRange: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleGenerateReport = async () => {
    try {
      setFormError(null);
      setGenerating(true);
      
      await reportAPI.generateReport(formData);
      handleCloseDialog();
      fetchReports();
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to generate report');
      console.error('Report generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadReport = async (reportId) => {
    try {
      const res = await reportAPI.downloadReport(reportId);
      
      // Create a blob from the response data
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      
      // Create a link element and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from content-disposition header or use default
      const contentDisposition = res.headers['content-disposition'];
      let filename = 'report';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Report download error:', err);
      setError('Failed to download report. Please try again.');
    }
  };

  const getReportTypeLabel = (type) => {
    switch (type) {
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'annual': return 'Annual';
      case 'custom': return 'Custom';
      default: return type;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Environmental Impact Reports
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Generate Report
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : reports.length === 0 ? (
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="body1" color="text.secondary">
                No reports generated yet. Click "Generate Report" to create your first report.
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Date Range</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Format</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report._id}>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{getReportTypeLabel(report.type)}</TableCell>
                        <TableCell>
                          {formatDate(report.dateRange.startDate)} - {formatDate(report.dateRange.endDate)}
                        </TableCell>
                        <TableCell>{formatDate(report.createdAt)}</TableCell>
                        <TableCell>{report.format.toUpperCase()}</TableCell>
                        <TableCell align="right">
                          <IconButton 
                            component={RouterLink} 
                            to={`/reports/${report._id}`}
                            size="small"
                            color="primary"
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton 
                            size="small"
                            color="primary"
                            onClick={() => handleDownloadReport(report._id)}
                          >
                            <DownloadIcon />
                          </IconButton>
                          <IconButton 
                            size="small"
                            color="primary"
                          >
                            <ShareIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      {/* Generate Report Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Environmental Impact Report</DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Report Title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    label="Report Type"
                  >
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                    <MenuItem value="annual">Annual</MenuItem>
                    <MenuItem value="custom">Custom Date Range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="dateRange.startDate"
                  type="date"
                  value={formData.dateRange.startDate}
                  onChange={handleFormChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  disabled={formData.type !== 'custom'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="dateRange.endDate"
                  type="date"
                  value={formData.dateRange.endDate}
                  onChange={handleFormChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  disabled={formData.type !== 'custom'}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Report Format</InputLabel>
                  <Select
                    name="format"
                    value={formData.format}
                    onChange={handleFormChange}
                    label="Report Format"
                  >
                    <MenuItem value="pdf">PDF</MenuItem>
                    <MenuItem value="csv">CSV</MenuItem>
                    <MenuItem value="xlsx">Excel</MenuItem>
                  </Select>
                </FormControl>
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
    </Box>
  );
};

export default Reports; 