import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack
} from '@mui/material';
import { 
  ErrorOutline as ErrorIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
  ExpandMore as ExpandMoreIcon,
  BugReport as BugReportIcon
} from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Report error to analytics if available
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: true,
        error_id: this.state.errorId
      });
    }

    // Report to external error tracking service
    this.reportError(error, errorInfo);
  }

  reportError = (error, errorInfo) => {
    // Create error report
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorId: this.state.errorId,
      userId: this.getUserId(),
      appVersion: process.env.REACT_APP_VERSION || '1.0.0'
    };

    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Report');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Full Report:', errorReport);
      console.groupEnd();
    }

    // Send to error reporting service (implement your preferred service)
    this.sendErrorReport(errorReport);
  };

  getUserId = () => {
    // Get user ID from localStorage or context if available
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.id || 'anonymous';
    } catch {
      return 'anonymous';
    }
  };

  sendErrorReport = async (errorReport) => {
    try {
      // Send to your error reporting endpoint
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport)
      });
    } catch (reportingError) {
      console.error('Failed to send error report:', reportingError);
    }
  };

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      showDetails: false
    });
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorId } = this.state;
      const isDevelopment = process.env.NODE_ENV === 'development';

      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            padding: 3
          }}
        >
          <Paper
            elevation={3}
            sx={{
              maxWidth: 600,
              width: '100%',
              padding: 4,
              textAlign: 'center'
            }}
          >
            {/* Error Icon and Title */}
            <Box sx={{ mb: 3 }}>
              <ErrorIcon 
                sx={{ 
                  fontSize: 64, 
                  color: '#ff6b6b',
                  mb: 2 
                }} 
              />
              <Typography variant="h4" component="h1" gutterBottom>
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                We're sorry for the inconvenience. The application encountered an unexpected error.
              </Typography>
              
              {/* Error ID */}
              <Chip 
                label={`Error ID: ${errorId}`}
                size="small"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Box>

            {/* Action Buttons */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
              sx={{ mb: 3 }}
            >
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleRetry}
                sx={{ 
                  backgroundColor: '#4ECDC4',
                  '&:hover': { backgroundColor: '#41b5a8' }
                }}
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={this.handleRefresh}
              >
                Refresh Page
              </Button>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={this.handleGoHome}
              >
                Go Home
              </Button>
            </Stack>

            {/* User-friendly suggestions */}
            <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="subtitle2" gutterBottom>
                What you can try:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Refresh the page or try again</li>
                <li>Check your internet connection</li>
                <li>Clear your browser cache and cookies</li>
                <li>Try using a different browser</li>
                <li>Contact support if the problem persists</li>
              </ul>
            </Alert>

            {/* Contact Support */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Need help? Contact our support team:
              </Typography>
              <Button
                variant="text"
                href="mailto:support@rygn.eco?subject=Error Report - ID: ${errorId}"
                sx={{ color: '#4ECDC4' }}
              >
                support@rygn.eco
              </Button>
            </Box>

            {/* Technical Details (Development or on request) */}
            {(isDevelopment || this.state.showDetails) && error && (
              <Accordion sx={{ textAlign: 'left' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="error-details-content"
                  id="error-details-header"
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BugReportIcon sx={{ mr: 1, color: '#ff6b6b' }} />
                    <Typography variant="subtitle2">
                      Technical Details
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Error Message:
                    </Typography>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        backgroundColor: '#f5f5f5',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        overflow: 'auto'
                      }}
                    >
                      {error.message}
                    </Paper>
                  </Box>

                  {error.stack && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Stack Trace:
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          backgroundColor: '#f5f5f5',
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          overflow: 'auto',
                          maxHeight: 200
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                          {error.stack}
                        </pre>
                      </Paper>
                    </Box>
                  )}

                  {errorInfo && errorInfo.componentStack && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Component Stack:
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          backgroundColor: '#f5f5f5',
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          overflow: 'auto',
                          maxHeight: 200
                        }}
                      >
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                          {errorInfo.componentStack}
                        </pre>
                      </Paper>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            )}

            {/* Show Details Button for Production */}
            {!isDevelopment && !this.state.showDetails && (
              <Button
                variant="text"
                size="small"
                onClick={this.toggleDetails}
                sx={{ mt: 2, color: '#666' }}
              >
                Show Technical Details
              </Button>
            )}
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 