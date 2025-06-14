// Analytics utility for RYGNeco
// Handles Google Analytics, performance monitoring, and custom event tracking

class Analytics {
  constructor() {
    this.isInitialized = false;
    this.userId = null;
    this.sessionId = this.generateSessionId();
    this.pageLoadTime = null;
    this.performanceMetrics = {};
    
    this.init();
  }

  init() {
    // Initialize analytics when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Check if gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      this.isInitialized = true;
      this.setupPerformanceMonitoring();
      this.setupUserTracking();
      this.trackPageLoad();
    } else {
      console.warn('Google Analytics not available');
    }
  }

  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // User and Session Tracking
  setUserId(userId) {
    this.userId = userId;
    if (this.isInitialized) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        user_id: userId
      });
    }
  }

  setUserProperties(properties) {
    if (this.isInitialized) {
      window.gtag('set', {
        user_properties: properties
      });
    }
  }

  // Page Tracking
  trackPageView(pagePath, pageTitle) {
    if (this.isInitialized) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: pagePath,
        page_title: pageTitle,
        session_id: this.sessionId
      });
    }
    
    // Track custom page view event
    this.trackEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      timestamp: new Date().toISOString()
    });
  }

  // Event Tracking
  trackEvent(eventName, parameters = {}) {
    if (this.isInitialized) {
      window.gtag('event', eventName, {
        ...parameters,
        session_id: this.sessionId,
        user_id: this.userId
      });
    }
    
    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, parameters);
    }
  }

  // E-commerce and Business Events
  trackPickupRequest(pickupData) {
    this.trackEvent('pickup_request', {
      event_category: 'E-waste',
      event_label: 'Pickup Scheduled',
      value: 1,
      pickup_type: pickupData.type,
      device_count: pickupData.deviceCount,
      company_size: pickupData.companySize
    });
  }

  trackQuoteRequest(quoteData) {
    this.trackEvent('quote_request', {
      event_category: 'Lead Generation',
      event_label: 'Quote Requested',
      value: 1,
      service_type: quoteData.serviceType,
      estimated_devices: quoteData.deviceCount
    });
  }

  trackFormSubmission(formName, formData) {
    this.trackEvent('form_submit', {
      event_category: 'Form',
      event_label: formName,
      form_name: formName,
      form_fields: Object.keys(formData).length
    });
  }

  trackDownload(fileName, fileType) {
    this.trackEvent('file_download', {
      event_category: 'Download',
      event_label: fileName,
      file_name: fileName,
      file_type: fileType
    });
  }

  trackSearch(searchTerm, resultsCount) {
    this.trackEvent('search', {
      event_category: 'Search',
      search_term: searchTerm,
      results_count: resultsCount
    });
  }

  // User Engagement
  trackTimeOnPage(pagePath, timeSpent) {
    this.trackEvent('time_on_page', {
      event_category: 'Engagement',
      event_label: pagePath,
      value: Math.round(timeSpent / 1000), // Convert to seconds
      page_path: pagePath
    });
  }

  trackScrollDepth(percentage) {
    this.trackEvent('scroll_depth', {
      event_category: 'Engagement',
      event_label: `${percentage}%`,
      value: percentage
    });
  }

  trackButtonClick(buttonName, location) {
    this.trackEvent('button_click', {
      event_category: 'UI Interaction',
      event_label: buttonName,
      button_name: buttonName,
      button_location: location
    });
  }

  trackVideoPlay(videoTitle, videoDuration) {
    this.trackEvent('video_play', {
      event_category: 'Video',
      event_label: videoTitle,
      video_title: videoTitle,
      video_duration: videoDuration
    });
  }

  // Performance Monitoring
  setupPerformanceMonitoring() {
    // Track Core Web Vitals using web-vitals library
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(this.onCLS.bind(this));
      getFID(this.onFID.bind(this));
      getFCP(this.onFCP.bind(this));
      getLCP(this.onLCP.bind(this));
      getTTFB(this.onTTFB.bind(this));
    }).catch(() => {
      console.warn('web-vitals library not available, using fallback performance monitoring');
      this.setupFallbackPerformanceMonitoring();
    });

    // Track page load performance
    window.addEventListener('load', () => {
      this.trackPageLoadPerformance();
    });
  }

  setupFallbackPerformanceMonitoring() {
    // Fallback performance monitoring without web-vitals library
    if ('PerformanceObserver' in window) {
      try {
        // Observe paint metrics
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.performanceMetrics.fcp = entry.startTime;
              this.trackEvent('web_vital_fcp', {
                event_category: 'Performance',
                value: Math.round(entry.startTime),
                metric_value: entry.startTime
              });
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });

        // Observe largest contentful paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.performanceMetrics.lcp = lastEntry.startTime;
          this.trackEvent('web_vital_lcp', {
            event_category: 'Performance',
            value: Math.round(lastEntry.startTime),
            metric_value: lastEntry.startTime
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Observe layout shifts
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          this.performanceMetrics.cls = clsValue;
          this.trackEvent('web_vital_cls', {
            event_category: 'Performance',
            value: Math.round(clsValue * 1000),
            metric_value: clsValue
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Observe first input delay
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidValue = entry.processingStart - entry.startTime;
            this.performanceMetrics.fid = fidValue;
            this.trackEvent('web_vital_fid', {
              event_category: 'Performance',
              value: Math.round(fidValue),
              metric_value: fidValue
            });
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

      } catch (error) {
        console.warn('Performance monitoring not fully supported:', error);
      }
    }
  }

  onCLS(metric) {
    this.performanceMetrics.cls = metric.value;
    this.trackEvent('web_vital_cls', {
      event_category: 'Performance',
      value: Math.round(metric.value * 1000),
      metric_value: metric.value
    });
  }

  onFID(metric) {
    this.performanceMetrics.fid = metric.value;
    this.trackEvent('web_vital_fid', {
      event_category: 'Performance',
      value: Math.round(metric.value),
      metric_value: metric.value
    });
  }

  onFCP(metric) {
    this.performanceMetrics.fcp = metric.value;
    this.trackEvent('web_vital_fcp', {
      event_category: 'Performance',
      value: Math.round(metric.value),
      metric_value: metric.value
    });
  }

  onLCP(metric) {
    this.performanceMetrics.lcp = metric.value;
    this.trackEvent('web_vital_lcp', {
      event_category: 'Performance',
      value: Math.round(metric.value),
      metric_value: metric.value
    });
  }

  onTTFB(metric) {
    this.performanceMetrics.ttfb = metric.value;
    this.trackEvent('web_vital_ttfb', {
      event_category: 'Performance',
      value: Math.round(metric.value),
      metric_value: metric.value
    });
  }

  trackPageLoadPerformance() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        const firstByte = navigation.responseStart - navigation.fetchStart;
        
        this.pageLoadTime = loadTime;
        
        this.trackEvent('page_load_performance', {
          event_category: 'Performance',
          load_time: Math.round(loadTime),
          dom_content_loaded: Math.round(domContentLoaded),
          time_to_first_byte: Math.round(firstByte)
        });
      }
    }
  }

  // Error Tracking
  trackError(error, errorInfo = {}) {
    this.trackEvent('javascript_error', {
      event_category: 'Error',
      event_label: error.message,
      error_message: error.message,
      error_stack: error.stack,
      error_url: window.location.href,
      ...errorInfo
    });
  }

  trackApiError(endpoint, statusCode, errorMessage) {
    this.trackEvent('api_error', {
      event_category: 'API Error',
      event_label: endpoint,
      api_endpoint: endpoint,
      status_code: statusCode,
      error_message: errorMessage
    });
  }

  // User Behavior Tracking
  setupUserTracking() {
    // Track user interactions
    this.setupScrollTracking();
    this.setupClickTracking();
    this.setupFormTracking();
  }

  setupScrollTracking() {
    let maxScroll = 0;
    let scrollTimer = null;
    
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }
      
      // Debounce scroll tracking
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (maxScroll >= 25 && maxScroll % 25 === 0) {
          this.trackScrollDepth(maxScroll);
        }
      }, 500);
    });
  }

  setupClickTracking() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      
      // Track button clicks
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        const buttonText = button.textContent.trim();
        const buttonId = button.id || 'unknown';
        
        this.trackButtonClick(buttonText || buttonId, window.location.pathname);
      }
      
      // Track link clicks
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target : target.closest('a');
        const linkText = link.textContent.trim();
        const linkHref = link.href;
        
        this.trackEvent('link_click', {
          event_category: 'Navigation',
          event_label: linkText,
          link_text: linkText,
          link_url: linkHref,
          link_external: !linkHref.includes(window.location.hostname)
        });
      }
    });
  }

  setupFormTracking() {
    document.addEventListener('submit', (event) => {
      const form = event.target;
      if (form.tagName === 'FORM') {
        const formName = form.name || form.id || 'unknown_form';
        const formData = new FormData(form);
        const formFields = {};
        
        for (let [key, value] of formData.entries()) {
          formFields[key] = typeof value === 'string' ? value.length : 'file';
        }
        
        this.trackFormSubmission(formName, formFields);
      }
    });
  }

  // Conversion Tracking
  trackConversion(conversionName, value = 0, currency = 'USD') {
    this.trackEvent('conversion', {
      event_category: 'Conversion',
      event_label: conversionName,
      value: value,
      currency: currency,
      conversion_name: conversionName
    });
  }

  // Custom Dimensions and Metrics
  setCustomDimension(index, value) {
    if (this.isInitialized) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        [`custom_map.dimension${index}`]: value
      });
    }
  }

  // Utility Methods
  getPerformanceMetrics() {
    return {
      ...this.performanceMetrics,
      pageLoadTime: this.pageLoadTime,
      sessionId: this.sessionId,
      userId: this.userId
    };
  }

  // Debug Mode
  enableDebugMode() {
    if (this.isInitialized) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        debug_mode: true
      });
    }
  }
}

// Create singleton instance
const analytics = new Analytics();

// Export convenience methods
export const trackEvent = (eventName, parameters) => analytics.trackEvent(eventName, parameters);
export const trackPageView = (pagePath, pageTitle) => analytics.trackPageView(pagePath, pageTitle);
export const trackPickupRequest = (pickupData) => analytics.trackPickupRequest(pickupData);
export const trackQuoteRequest = (quoteData) => analytics.trackQuoteRequest(quoteData);
export const trackFormSubmission = (formName, formData) => analytics.trackFormSubmission(formName, formData);
export const trackError = (error, errorInfo) => analytics.trackError(error, errorInfo);
export const trackApiError = (endpoint, statusCode, errorMessage) => analytics.trackApiError(endpoint, statusCode, errorMessage);
export const trackConversion = (conversionName, value, currency) => analytics.trackConversion(conversionName, value, currency);
export const setUserId = (userId) => analytics.setUserId(userId);
export const setUserProperties = (properties) => analytics.setUserProperties(properties);
export const getPerformanceMetrics = () => analytics.getPerformanceMetrics();

export default analytics; 