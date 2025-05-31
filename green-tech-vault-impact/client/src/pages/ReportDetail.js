import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Container
} from '@mui/material';
import { 
  Download as DownloadIcon,
  Share as ShareIcon,
  ArrowBack as ArrowBackIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { reportAPI } from '../services/api';
import ReportTemplate from '../components/ReportTemplate';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReportDetails();
  }, [id]);

  const fetchReportDetails = async () => {
    try {
      setLoading(true);
      const res = await reportAPI.getById(id);
      setReport(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load report details');
      console.error('Report details fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const res = await reportAPI.downloadPdf(id);
      
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const filename = report ? `${report.title.replace(/\s+/g, '_')}.pdf` : `report_${id}.pdf`;
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error('PDF download error:', err);
      setError('Failed to download PDF. Please try again.');
    }
  };

  const handleDownloadCsv = async () => {
    try {
      const res = await reportAPI.downloadCsv(id);
      
      const blob = new Blob([res.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const filename = report ? `${report.title.replace(/\s+/g, '_')}.csv` : `report_${id}.csv`;
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error('CSV download error:', err);
      setError('Failed to download CSV. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: report.title,
        text: `Check out this environmental impact report: ${report.title}`,
        url: url
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        alert('Report link copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!report && !loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          Report not found. The report may have been deleted or you don't have permission to view it.
        </Alert>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Action Bar - No print on print */}
      <Box 
        sx={{ 
          backgroundColor: 'white', 
          borderBottom: '1px solid #e0e0e0',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          '@media print': {
            display: 'none'
          }
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            py: 2 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                sx={{ mr: 2 }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6">
                View Report
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
              >
                Print
              </Button>
              <Button
                variant="outlined"
                startIcon={<PdfIcon />}
                onClick={handleDownloadPdf}
              >
                Download PDF
              </Button>
              <Button
                variant="outlined"
                startIcon={<CsvIcon />}
                onClick={handleDownloadCsv}
              >
                Download CSV
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={handleShare}
              >
                Share
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {error && (
        <Container maxWidth="xl">
          <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        </Container>
      )}

      {/* Report Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ReportTemplate reportData={report} />
      </Container>
    </Box>
  );
};

export default ReportDetail; 