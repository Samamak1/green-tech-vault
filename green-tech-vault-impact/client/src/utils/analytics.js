// Enhanced Analytics utility for RYGNeco
// Handles Google Analytics, custom events, user engagement, and performance tracking

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

class Analytics {
  constructor() {
    this.isInitialized = false;
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.userInteractions = 0;
    this.engagementEvents = [];
    this.performanceMetrics = {};
    
    this.init();
  }

  init() {
    if (typeof window !== 'undefined' && window.gtag) {
      this.isInitialized = true;
      console.log('Analytics initialized');
      
      // Track session start
      this.trackEvent('session_start', {
        session_id: this.sessionId,
        timestamp: this.startTime
      });
      
      // Set up Core Web Vitals tracking
      this.initWebVitals();
      
      // Set up user engagement tracking
      this.initEngagementTracking();
      
      // Set up error tracking
      this.initErrorTracking();
    }
  }

  generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  // Page view tracking
  trackPageView(path, title) {
    if (!this.isInitialized) return;
    
    window.gtag('config', 'G-RYGNECO2024', {
      page_path: path,
      page_title: title,
      custom_map: {
        'dimension1': this.getUserType(),
        'dimension2': this.getPageCategory(path)
      }
    });
    
    // Track page load performance
    this.trackPagePerformance(path);
  }

  // Custom event tracking
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized) return;
    
    const eventData = {
      ...parameters,
      session_id: this.sessionId,
      user_type: this.getUserType(),
      timestamp: Date.now()
    };
    
    window.gtag('event', eventName, eventData);
    
    console.log('Analytics Event:', eventName, eventData);
  }

  // User interaction tracking
  trackInteraction(action, element, value = null) {
    this.userInteractions++;
    
    this.trackEvent('user_interaction', {
      action: action,
      element: element,
      value: value,
      interaction_count: this.userInteractions
    });
  }

  // E-commerce tracking for pickup scheduling
  trackPickupScheduled(pickupData) {
    this.trackEvent('schedule_pickup', {
      event_category: 'E-commerce',
      event_label: 'Pickup Scheduled',
      pickup_type: pickupData.type,
      pickup_value: pickupData.estimatedValue || 0,
      device_count: pickupData.deviceCount || 0,
      location: pickupData.location
    });
    
    // Enhanced e-commerce tracking
    window.gtag('event', 'purchase', {
      transaction_id: pickupData.id,
      value: pickupData.estimatedValue || 0,
      currency: 'USD',
      items: [{
        item_id: pickupData.id,
        item_name: 'E-waste Pickup',
        category: pickupData.type,
        quantity: 1,
        price: pickupData.estimatedValue || 0
      }]
    });
  }

  // User engagement metrics
  trackEngagement(eventType, data = {}) {
    const engagementEvent = {
      type: eventType,
      timestamp: Date.now(),
      data: data
    };
    
    this.engagementEvents.push(engagementEvent);
    
    // Track significant engagement milestones
    if (this.engagementEvents.length % 10 === 0) {
      this.trackEvent('engagement_milestone', {
        total_events: this.engagementEvents.length,
        session_duration: Date.now() - this.startTime,
        event_type: eventType
      });
    }
  }

  // Form tracking
  trackFormStart(formName) {
    this.trackEvent('form_start', {
      form_name: formName,
      event_category: 'Form Interaction'
    });
  }

  trackFormSubmit(formName, success = true, errorMessage = null) {
    this.trackEvent('form_submit', {
      form_name: formName,
      success: success,
      error_message: errorMessage,
      event_category: 'Form Interaction'
    });
  }

  trackFormFieldError(formName, fieldName, errorType) {
    this.trackEvent('form_field_error', {
      form_name: formName,
      field_name: fieldName,
      error_type: errorType,
      event_category: 'Form Interaction'
    });
  }

  // Search tracking
  trackSearch(searchTerm, resultsCount, category = null) {
    this.trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
      category: category,
      event_category: 'Search'
    });
  }

  // File download/upload tracking
  trackFileDownload(fileName, fileType, fileSize = null) {
    this.trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      file_size: fileSize,
      event_category: 'File Interaction'
    });
  }

  trackFileUpload(fileName, fileType, fileSize = null, success = true) {
    this.trackEvent('file_upload', {
      file_name: fileName,
      file_type: fileType,
      file_size: fileSize,
      success: success,
      event_category: 'File Interaction'
    });
  }

  // Core Web Vitals tracking
  initWebVitals() {
    getCLS((metric) => {
      this.performanceMetrics.cls = metric.value;
      this.trackEvent('web_vitals_cls', {
        value: Math.round(metric.value * 1000),
        rating: metric.rating,
        event_category: 'Performance'
      });
    });

    getFID((metric) => {
      this.performanceMetrics.fid = metric.value;
      this.trackEvent('web_vitals_fid', {
        value: Math.round(metric.value),
        rating: metric.rating,
        event_category: 'Performance'
      });
    });

    getFCP((metric) => {
      this.performanceMetrics.fcp = metric.value;
      this.trackEvent('web_vitals_fcp', {
        value: Math.round(metric.value),
        rating: metric.rating,
        event_category: 'Performance'
      });
    });

    getLCP((metric) => {
      this.performanceMetrics.lcp = metric.value;
      this.trackEvent('web_vitals_lcp', {
        value: Math.round(metric.value),
        rating: metric.rating,
        event_category: 'Performance'
      });
    });

    getTTFB((metric) => {
      this.performanceMetrics.ttfb = metric.value;
      this.trackEvent('web_vitals_ttfb', {
        value: Math.round(metric.value),
        rating: metric.rating,
        event_category: 'Performance'
      });
    });

    // INP (Interaction to Next Paint) not available in this web-vitals version
    // Will be added when web-vitals is updated to support it
  }

  // Page performance tracking
  trackPagePerformance(path) {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      if (navigation) {
        const metrics = {
          dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp_connection: navigation.connectEnd - navigation.connectStart,
          tls_handshake: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
          ttfb: navigation.responseStart - navigation.requestStart,
          content_download: navigation.responseEnd - navigation.responseStart,
          dom_processing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
          resource_loading: navigation.loadEventEnd - navigation.domContentLoadedEventEnd,
          total_load_time: navigation.loadEventEnd - navigation.navigationStart
        };

        this.trackEvent('page_performance', {
          page_path: path,
          ...metrics,
          event_category: 'Performance'
        });
      }
    }
  }

  // User engagement tracking setup
  initEngagementTracking() {
    if (typeof window === 'undefined') return;

    let isActive = true;
    let activeTime = 0;
    let lastActiveTime = Date.now();

    const trackActivity = () => {
      if (isActive) {
        activeTime += Date.now() - lastActiveTime;
      }
      lastActiveTime = Date.now();
      isActive = true;
    };

    const trackInactivity = () => {
      isActive = false;
    };

    // Track user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
      document.addEventListener(event, trackActivity, { passive: true });
    });

    // Track when user becomes inactive
    ['blur', 'visibilitychange'].forEach(event => {
      document.addEventListener(event, trackInactivity);
    });

    // Send engagement data periodically
    setInterval(() => {
      if (activeTime > 1000) { // Only track if user was active for more than 1 second
        this.trackEvent('user_engagement_interval', {
          active_time: Math.round(activeTime / 1000),
          total_time: Math.round((Date.now() - this.startTime) / 1000),
          engagement_rate: Math.round((activeTime / (Date.now() - this.startTime)) * 100),
          event_category: 'Engagement'
        });
      }
    }, 60000); // Every minute

    // Track session end on page unload
    window.addEventListener('beforeunload', () => {
      const sessionDuration = Date.now() - this.startTime;
      this.trackEvent('session_end', {
        session_duration: Math.round(sessionDuration / 1000),
        active_time: Math.round(activeTime / 1000),
        total_interactions: this.userInteractions,
        engagement_events: this.engagementEvents.length,
        performance_metrics: this.performanceMetrics
      });
    });
  }

  // Error tracking
  initErrorTracking() {
    if (typeof window === 'undefined') return;

    window.addEventListener('error', (event) => {
      this.trackEvent('javascript_error', {
        error_message: event.message,
        error_filename: event.filename,
        error_line: event.lineno,
        error_column: event.colno,
        event_category: 'Error'
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent('promise_rejection', {
        error_message: event.reason?.message || 'Unknown promise rejection',
        event_category: 'Error'
      });
    });
  }

  // Utility functions
  getUserType() {
    // Determine user type based on authentication status, role, etc.
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      
      if (token) {
        return userRole || 'authenticated';
      }
    }
    return 'anonymous';
  }

  getPageCategory(path) {
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/schedule')) return 'scheduling';
    if (path.includes('/pickup')) return 'pickup';
    if (path.includes('/impact')) return 'impact';
    if (path.includes('/contact')) return 'contact';
    if (path.includes('/about')) return 'about';
    if (path.includes('/login') || path.includes('/register')) return 'auth';
    return 'general';
  }

  // A/B Testing support
  trackExperiment(experimentName, variant) {
    this.trackEvent('experiment_view', {
      experiment_name: experimentName,
      variant: variant,
      event_category: 'Experiment'
    });
  }

  // Conversion tracking
  trackConversion(conversionType, value = null, currency = 'USD') {
    this.trackEvent('conversion', {
      conversion_type: conversionType,
      value: value,
      currency: currency,
      event_category: 'Conversion'
    });
  }
}

// Create and export analytics instance
const analytics = new Analytics();

// Export tracking functions for easy use
export const trackPageView = (path, title) => analytics.trackPageView(path, title);
export const trackEvent = (eventName, parameters) => analytics.trackEvent(eventName, parameters);
export const trackInteraction = (action, element, value) => analytics.trackInteraction(action, element, value);
export const trackPickupScheduled = (pickupData) => analytics.trackPickupScheduled(pickupData);
export const trackEngagement = (eventType, data) => analytics.trackEngagement(eventType, data);
export const trackFormStart = (formName) => analytics.trackFormStart(formName);
export const trackFormSubmit = (formName, success, errorMessage) => analytics.trackFormSubmit(formName, success, errorMessage);
export const trackFormFieldError = (formName, fieldName, errorType) => analytics.trackFormFieldError(formName, fieldName, errorType);
export const trackSearch = (searchTerm, resultsCount, category) => analytics.trackSearch(searchTerm, resultsCount, category);
export const trackFileDownload = (fileName, fileType, fileSize) => analytics.trackFileDownload(fileName, fileType, fileSize);
export const trackFileUpload = (fileName, fileType, fileSize, success) => analytics.trackFileUpload(fileName, fileType, fileSize, success);
export const trackExperiment = (experimentName, variant) => analytics.trackExperiment(experimentName, variant);
export const trackConversion = (conversionType, value, currency) => analytics.trackConversion(conversionType, value, currency);

export default analytics; 