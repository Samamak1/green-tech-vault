import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Grid,
  IconButton,
  Collapse,
  Alert,
  Tooltip
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon
} from '@mui/icons-material';
// Performance metrics are collected directly via Performance API

const PerformanceMonitor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({
    cls: null,
    fid: null,
    fcp: null,
    lcp: null,
    ttfb: null,
    pageLoadTime: null
  });
  const [networkInfo, setNetworkInfo] = useState(null);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Initial metrics will be collected via Performance API observers

    // Set up performance observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // Observe paint metrics
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });

        // Observe largest contentful paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Observe layout shifts
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Observe first input delay
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

      } catch (error) {
        console.warn('Performance monitoring not fully supported:', error);
      }
    }

    // Get network information
    if ('connection' in navigator) {
      setNetworkInfo({
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      });

      navigator.connection.addEventListener('change', () => {
        setNetworkInfo({
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt
        });
      });
    }

    // Track page load time
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        setMetrics(prev => ({ ...prev, pageLoadTime: loadTime }));
      }
    });

    // Metrics are updated automatically via Performance API observers
    // No need for periodic updates as observers handle real-time updates
  }, []);

  const getMetricStatus = (value, thresholds) => {
    if (value === null || value === undefined) return 'unknown';
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getMetricColor = (status) => {
    switch (status) {
      case 'good': return 'success';
      case 'needs-improvement': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const formatTime = (time) => {
    if (time === null || time === undefined) return 'N/A';
    return `${Math.round(time)}ms`;
  };

  const formatCLS = (cls) => {
    if (cls === null || cls === undefined) return 'N/A';
    return cls.toFixed(3);
  };

  // Core Web Vitals thresholds
  const thresholds = {
    fcp: { good: 1800, needsImprovement: 3000 },
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    ttfb: { good: 800, needsImprovement: 1800 }
  };

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000,
        maxWidth: 400
      }}
    >
      {/* Toggle Button */}
      <Card sx={{ mb: 1 }}>
        <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SpeedIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle2">
                Performance Monitor
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setIsVisible(!isVisible)}
              aria-label={isVisible ? 'Hide performance metrics' : 'Show performance metrics'}
            >
              {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Collapse in={isVisible}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Core Web Vitals
            </Typography>

            <Grid container spacing={2}>
              {/* First Contentful Paint */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      FCP
                    </Typography>
                    <Tooltip title="First Contentful Paint - Time until first text or image is painted">
                      <InfoIcon sx={{ ml: 0.5, fontSize: 16, color: 'text.secondary' }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="h6">
                    {formatTime(metrics.fcp)}
                  </Typography>
                  <Chip
                    size="small"
                    label={getMetricStatus(metrics.fcp, thresholds.fcp)}
                    color={getMetricColor(getMetricStatus(metrics.fcp, thresholds.fcp))}
                  />
                </Box>
              </Grid>

              {/* Largest Contentful Paint */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      LCP
                    </Typography>
                    <Tooltip title="Largest Contentful Paint - Time until largest text or image is painted">
                      <InfoIcon sx={{ ml: 0.5, fontSize: 16, color: 'text.secondary' }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="h6">
                    {formatTime(metrics.lcp)}
                  </Typography>
                  <Chip
                    size="small"
                    label={getMetricStatus(metrics.lcp, thresholds.lcp)}
                    color={getMetricColor(getMetricStatus(metrics.lcp, thresholds.lcp))}
                  />
                </Box>
              </Grid>

              {/* First Input Delay */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      FID
                    </Typography>
                    <Tooltip title="First Input Delay - Time from first user interaction to browser response">
                      <InfoIcon sx={{ ml: 0.5, fontSize: 16, color: 'text.secondary' }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="h6">
                    {formatTime(metrics.fid)}
                  </Typography>
                  <Chip
                    size="small"
                    label={getMetricStatus(metrics.fid, thresholds.fid)}
                    color={getMetricColor(getMetricStatus(metrics.fid, thresholds.fid))}
                  />
                </Box>
              </Grid>

              {/* Cumulative Layout Shift */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      CLS
                    </Typography>
                    <Tooltip title="Cumulative Layout Shift - Visual stability of the page">
                      <InfoIcon sx={{ ml: 0.5, fontSize: 16, color: 'text.secondary' }} />
                    </Tooltip>
                  </Box>
                  <Typography variant="h6">
                    {formatCLS(metrics.cls)}
                  </Typography>
                  <Chip
                    size="small"
                    label={getMetricStatus(metrics.cls, thresholds.cls)}
                    color={getMetricColor(getMetricStatus(metrics.cls, thresholds.cls))}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* Page Load Time */}
            {metrics.pageLoadTime && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Page Load Time
                </Typography>
                <Typography variant="h6">
                  {formatTime(metrics.pageLoadTime)}
                </Typography>
              </Box>
            )}

            {/* Network Information */}
            {networkInfo && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Network
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    size="small"
                    label={`${networkInfo.effectiveType.toUpperCase()}`}
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={`${networkInfo.downlink} Mbps`}
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={`${networkInfo.rtt}ms RTT`}
                    variant="outlined"
                  />
                </Box>
              </Box>
            )}

            {/* Performance Tips */}
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Performance Tips:</strong>
                <br />
                • Good: Green metrics indicate excellent performance
                <br />
                • Needs Improvement: Yellow metrics could be optimized
                <br />
                • Poor: Red metrics need immediate attention
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Collapse>
    </Box>
  );
};

export default PerformanceMonitor; 