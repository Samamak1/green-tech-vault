import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Tab,
  Tabs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Button,
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
  Card,
  CardContent,
  Grid,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Visibility as VisibilityIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
  Add as AddIcon,
  Schedule as ScheduleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import RYGNECOReporting from '../components/ReportingModule';
import { reportAPI } from '../services/api';
import { formatCO2, formatWeight } from '../utils/environmentalImpact';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));

const ClientReports = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [scheduledReports, setScheduledReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [scheduleFormData, setScheduleFormData] = useState({
    reportType: 'Monthly',
    frequency: 'monthly',
    dayOfMonth: 1,
    emailRecipients: '',
    includeCharts: true,
    includeEnvironmentalImpact: true
  });

  useEffect(() => {
    // Get user data from localStorage or your auth system
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.token) {
      navigate('/login');
    } else {
      setUser(userData);
      if (tabValue === 1) {
        fetchReportHistory();
      } else if (tabValue === 2) {
        fetchScheduledReports();
      }
    }
  }, [navigate, tabValue]);

  const fetchReportHistory = async () => {
    try {
      setLoading(true);
      const res = await reportAPI.getAll({ clientId: user.clientId || user.id });
      const reportsData = res.data?.data || [];
      
      // Normalize reports data to prevent undefined errors
      const normalizedReports = reportsData.map(report => ({
        _id: report._id || Date.now().toString(),
        title: report.title || 'Untitled Report',
        type: report.type || 'Custom',
        status: report.status || 'Draft',
        dateRange: report.dateRange || {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          endDate: new Date()
        },
        impactSummary: report.impactSummary || {
          totalDevicesCollected: 0,
          totalCO2Saved: 0,
          totalWeightCollected: 0
        },
        ...report
      }));
      
      setReports(normalizedReports);
    } catch (err) {
      setError('Failed to load report history');
      console.error(err);
      setReports([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchScheduledReports = async () => {
    try {
      setLoading(true);
      // This would be a separate API endpoint for scheduled reports
      const res = await reportAPI.getAll({ 
        clientId: user.clientId || user.id,
        scheduled: true 
      });
      setScheduledReports(res.data.data || []);
    } catch (err) {
      setError('Failed to load scheduled reports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewReport = (id) => {
    navigate(`/reports/${id}`);
  };

  const handleDownloadPdf = async (id) => {
    try {
      const res = await reportAPI.downloadPdf(id);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const report = reports.find(r => r._id === id);
      const filename = report ? `${report.title.replace(/\s+/g, '_')}.pdf` : `report_${id}.pdf`;
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to download PDF');
      console.error(err);
    }
  };

  const handleDownloadCsv = async (id) => {
    try {
      const res = await reportAPI.downloadCsv(id);
      const blob = new Blob([res.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const report = reports.find(r => r._id === id);
      const filename = report ? `${report.title.replace(/\s+/g, '_')}.csv` : `report_${id}.csv`;
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to download CSV');
      console.error(err);
    }
  };

  const handleOpenScheduleDialog = () => {
    setScheduleDialogOpen(true);
  };

  const handleCloseScheduleDialog = () => {
    setScheduleDialogOpen(false);
    setScheduleFormData({
      reportType: 'Monthly',
      frequency: 'monthly',
      dayOfMonth: 1,
      emailRecipients: '',
      includeCharts: true,
      includeEnvironmentalImpact: true
    });
  };

  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleFormData({
      ...scheduleFormData,
      [name]: value
    });
  };

  const handleCreateSchedule = async () => {
    try {
      // This would call a separate API endpoint for creating scheduled reports
      await reportAPI.create({
        ...scheduleFormData,
        clientId: user.clientId || user.id,
        scheduled: true
      });
      
      fetchScheduledReports();
      handleCloseScheduleDialog();
    } catch (err) {
      setError('Failed to create scheduled report');
      console.error(err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Reports Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and generate comprehensive e-waste management reports
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Generate Reports" />
          <Tab label="Report History" />
          <Tab label="Scheduled Reports" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <StyledPaper elevation={0}>
          <RYGNECOReporting 
            clientId={user.clientId || user.id} 
            clientName={user.companyName || user.name} 
          />
        </StyledPaper>
      )}

      {tabValue === 1 && (
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Report History
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setTabValue(0)}
            >
              Generate New Report
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : reports.length === 0 ? (
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No reports found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Generate your first report to start tracking your environmental impact.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setTabValue(0)}
                  >
                    Generate Report
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Report Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Date Range</TableCell>
                    <TableCell align="right">CO₂ Saved</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report._id}>
                      <TableCell>{report.title || 'Untitled Report'}</TableCell>
                      <TableCell>
                        <Chip label={report.type || 'Custom'} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        {report.dateRange?.startDate && report.dateRange?.endDate 
                          ? `${new Date(report.dateRange.startDate).toLocaleDateString()} - ${new Date(report.dateRange.endDate).toLocaleDateString()}`
                          : 'Date range not available'}
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </StyledPaper>
      )}

      {tabValue === 2 && (
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Scheduled Reports
            </Typography>
            <Button
              variant="contained"
              startIcon={<ScheduleIcon />}
              onClick={handleOpenScheduleDialog}
            >
              Schedule New Report
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : scheduledReports.length === 0 ? (
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No scheduled reports
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Set up automatic report generation to receive regular updates.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<ScheduleIcon />}
                    onClick={handleOpenScheduleDialog}
                  >
                    Schedule Report
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {scheduledReports.map((schedule) => (
                <Grid item xs={12} md={6} lg={4} key={schedule._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {schedule.reportType} Report
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Frequency: {schedule.frequency}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Next Run: {new Date(schedule.nextRun).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Recipients: {schedule.emailRecipients}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </StyledPaper>
      )}

      {/* Schedule Report Dialog */}
      <Dialog open={scheduleDialogOpen} onClose={handleCloseScheduleDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Automatic Report</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    name="reportType"
                    value={scheduleFormData.reportType}
                    onChange={handleScheduleInputChange}
                    label="Report Type"
                  >
                    <MenuItem value="Monthly">Monthly Report</MenuItem>
                    <MenuItem value="Quarterly">Quarterly Report</MenuItem>
                    <MenuItem value="Annual">Annual Report</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    name="frequency"
                    value={scheduleFormData.frequency}
                    onChange={handleScheduleInputChange}
                    label="Frequency"
                  >
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                    <MenuItem value="annually">Annually</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {scheduleFormData.frequency === 'monthly' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Day of Month"
                    name="dayOfMonth"
                    type="number"
                    value={scheduleFormData.dayOfMonth}
                    onChange={handleScheduleInputChange}
                    InputProps={{ inputProps: { min: 1, max: 31 } }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Recipients"
                  name="emailRecipients"
                  value={scheduleFormData.emailRecipients}
                  onChange={handleScheduleInputChange}
                  helperText="Separate multiple emails with commas"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseScheduleDialog}>Cancel</Button>
          <Button onClick={handleCreateSchedule} variant="contained">
            Create Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientReports; 