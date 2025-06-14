// Comprehensive Performance Monitoring Utility for RYGNeco
// Tracks Core Web Vitals, resource loading, bundle analysis, and provides optimization recommendations

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import analytics from './analytics';

class PerformanceMonitor {
  constructor() {
    this.isInitialized = false;
    this.metrics = {
      coreWebVitals: {},
      customMetrics: {},
      resourceTimings: [],
      performanceEntries: []
    };
    this.observers = [];
    this.benchmarks = {
      lcp: { good: 2500, needsImprovement: 4000 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      fcp: { good: 1800, needsImprovement: 3000 },
      ttfb: { good: 600, needsImprovement: 1500 },
      inp: { good: 200, needsImprovement: 500 }
    };
    
    this.init();
  }

  init() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.setupCoreWebVitals();
      this.setupCustomMetrics();
      this.setupResourceMonitoring();
      this.setupPerformanceObservers();
      this.setupMemoryMonitoring();
      this.setupNetworkMonitoring();
      this.isInitialized = true;
      console.log('Performance Monitor initialized');
    }
  }

  // Core Web Vitals monitoring
  setupCoreWebVitals() {
    // Largest Contentful Paint
    getLCP((metric) => {
      this.metrics.coreWebVitals.lcp = {
        value: metric.value,
        rating: this.getRating('lcp', metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now()
      };
      this.reportMetric('lcp', metric);
    });

    // First Input Delay
    getFID((metric) => {
      this.metrics.coreWebVitals.fid = {
        value: metric.value,
        rating: this.getRating('fid', metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now()
      };
      this.reportMetric('fid', metric);
    });

    // Cumulative Layout Shift
    getCLS((metric) => {
      this.metrics.coreWebVitals.cls = {
        value: metric.value,
        rating: this.getRating('cls', metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now()
      };
      this.reportMetric('cls', metric);
    });

    // First Contentful Paint
    getFCP((metric) => {
      this.metrics.coreWebVitals.fcp = {
        value: metric.value,
        rating: this.getRating('fcp', metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now()
      };
      this.reportMetric('fcp', metric);
    });

    // Time to First Byte
    getTTFB((metric) => {
      this.metrics.coreWebVitals.ttfb = {
        value: metric.value,
        rating: this.getRating('ttfb', metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now()
      };
      this.reportMetric('ttfb', metric);
    });

    // INP (Interaction to Next Paint) not available in this web-vitals version
    // Will be added when web-vitals is updated to support it
  }

  // Custom performance metrics
  setupCustomMetrics() {
    // Track React hydration time
    this.trackReactHydration();
    
    // Track bundle loading time
    this.trackBundleLoading();
    
    // Track API response times
    this.trackAPIPerformance();
    
    // Track image loading performance
    this.trackImageLoading();
    
    // Track user interaction responsiveness
    this.trackInteractionResponsiveness();
  }

  trackReactHydration() {
    const startTime = performance.now();
    
    // Listen for React hydration completion
    const checkHydration = () => {
      const root = document.getElementById('root');
      if (root && root.children.length > 0) {
        const hydrationTime = performance.now() - startTime;
        this.metrics.customMetrics.reactHydration = {
          duration: hydrationTime,
          rating: hydrationTime < 1000 ? 'good' : hydrationTime < 2000 ? 'needs-improvement' : 'poor',
          timestamp: Date.now()
        };
        
        analytics.trackEvent('performance_react_hydration', {
          duration: Math.round(hydrationTime),
          rating: this.metrics.customMetrics.reactHydration.rating
        });
      } else {
        setTimeout(checkHydration, 100);
      }
    };
    
    checkHydration();
  }

  trackBundleLoading() {
    const bundleEntries = performance.getEntriesByType('resource')
      .filter(entry => entry.name.includes('bundle') || entry.name.includes('chunk'));
    
    const bundleMetrics = bundleEntries.map(entry => ({
      name: entry.name,
      size: entry.transferSize,
      loadTime: entry.responseEnd - entry.requestStart,
      downloadTime: entry.responseEnd - entry.responseStart,
      rating: this.getRating('resource', entry.responseEnd - entry.requestStart)
    }));

    this.metrics.customMetrics.bundleLoading = {
      bundles: bundleMetrics,
      totalSize: bundleMetrics.reduce((sum, bundle) => sum + bundle.size, 0),
      totalLoadTime: Math.max(...bundleMetrics.map(bundle => bundle.loadTime)),
      timestamp: Date.now()
    };

    analytics.trackEvent('performance_bundle_loading', {
      bundle_count: bundleMetrics.length,
      total_size: this.metrics.customMetrics.bundleLoading.totalSize,
      total_load_time: Math.round(this.metrics.customMetrics.bundleLoading.totalLoadTime)
    });
  }

  trackAPIPerformance() {
    // Override fetch to monitor API calls
    const originalFetch = window.fetch;
    const apiMetrics = [];

    window.fetch = async function(...args) {
      const startTime = performance.now();
      const url = args[0];
      
      try {
        const response = await originalFetch.apply(this, args);
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (url.includes('/api/')) {
          apiMetrics.push({
            url: url,
            duration: duration,
            status: response.status,
            success: response.ok,
            timestamp: Date.now()
          });
          
          analytics.trackEvent('performance_api_call', {
            endpoint: url,
            duration: Math.round(duration),
            status: response.status,
            success: response.ok
          });
        }
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (url.includes('/api/')) {
          apiMetrics.push({
            url: url,
            duration: duration,
            status: 0,
            success: false,
            error: error.message,
            timestamp: Date.now()
          });
        }
        
        throw error;
      }
    };

    this.metrics.customMetrics.apiPerformance = apiMetrics;
  }

  trackImageLoading() {
    const imageObserver = new PerformanceObserver((list) => {
      const imageEntries = list.getEntries()
        .filter(entry => entry.initiatorType === 'img');
      
      imageEntries.forEach(entry => {
        const imageMetric = {
          url: entry.name,
          loadTime: entry.responseEnd - entry.requestStart,
          size: entry.transferSize,
          renderTime: entry.responseEnd - entry.startTime,
          rating: this.getRating('image', entry.responseEnd - entry.requestStart),
          timestamp: Date.now()
        };
        
        if (!this.metrics.customMetrics.imageLoading) {
          this.metrics.customMetrics.imageLoading = [];
        }
        this.metrics.customMetrics.imageLoading.push(imageMetric);
        
        // Track slow loading images
        if (imageMetric.loadTime > 2000) {
          analytics.trackEvent('performance_slow_image', {
            url: imageMetric.url,
            load_time: Math.round(imageMetric.loadTime),
            size: imageMetric.size
          });
        }
      });
    });

    imageObserver.observe({ entryTypes: ['resource'] });
    this.observers.push(imageObserver);
  }

  trackInteractionResponsiveness() {
    let interactionCount = 0;
    let totalInteractionTime = 0;
    
    const eventTypes = ['click', 'keydown', 'touchstart'];
    
    eventTypes.forEach(eventType => {
      document.addEventListener(eventType, (event) => {
        const startTime = performance.now();
        
        // Use requestAnimationFrame to measure responsiveness
        requestAnimationFrame(() => {
          const endTime = performance.now();
          const interactionTime = endTime - startTime;
          
          interactionCount++;
          totalInteractionTime += interactionTime;
          
          this.metrics.customMetrics.interactionResponsiveness = {
            averageTime: totalInteractionTime / interactionCount,
            totalInteractions: interactionCount,
            lastInteractionTime: interactionTime,
            rating: this.getRating('interaction', interactionTime),
            timestamp: Date.now()
          };
          
          // Track slow interactions
          if (interactionTime > 100) {
            analytics.trackEvent('performance_slow_interaction', {
              event_type: eventType,
              interaction_time: Math.round(interactionTime),
              target: event.target.tagName
            });
          }
        });
      }, { passive: true });
    });
  }

  // Resource monitoring
  setupResourceMonitoring() {
    const resourceObserver = new PerformanceObserver((list) => {
      const resources = list.getEntries();
      
      resources.forEach(resource => {
        const resourceMetric = {
          name: resource.name,
          type: resource.initiatorType,
          size: resource.transferSize,
          loadTime: resource.responseEnd - resource.requestStart,
          dnsTime: resource.domainLookupEnd - resource.domainLookupStart,
          tcpTime: resource.connectEnd - resource.connectStart,
          requestTime: resource.responseStart - resource.requestStart,
          responseTime: resource.responseEnd - resource.responseStart,
          rating: this.getRating('resource', resource.responseEnd - resource.requestStart),
          timestamp: Date.now()
        };
        
        this.metrics.resourceTimings.push(resourceMetric);
        
        // Track large resources
        if (resourceMetric.size > 500000) { // 500KB
          analytics.trackEvent('performance_large_resource', {
            url: resourceMetric.name,
            size: resourceMetric.size,
            load_time: Math.round(resourceMetric.loadTime)
          });
        }
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.push(resourceObserver);
  }

  // Performance observers setup
  setupPerformanceObservers() {
    // Long task observer
    if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        const longTasks = list.getEntries();
        
        longTasks.forEach(task => {
          const longTaskMetric = {
            duration: task.duration,
            startTime: task.startTime,
            attribution: task.attribution,
            timestamp: Date.now()
          };
          
          if (!this.metrics.customMetrics.longTasks) {
            this.metrics.customMetrics.longTasks = [];
          }
          this.metrics.customMetrics.longTasks.push(longTaskMetric);
          
          analytics.trackEvent('performance_long_task', {
            duration: Math.round(task.duration),
            start_time: Math.round(task.startTime)
          });
        });
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.push(longTaskObserver);
    }

    // Layout shift observer
    if ('PerformanceObserver' in window) {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        const layoutShifts = list.getEntries();
        
        layoutShifts.forEach(shift => {
          if (!shift.hadRecentInput) {
            const layoutShiftMetric = {
              value: shift.value,
              sources: shift.sources,
              timestamp: Date.now()
            };
            
            if (!this.metrics.customMetrics.layoutShifts) {
              this.metrics.customMetrics.layoutShifts = [];
            }
            this.metrics.customMetrics.layoutShifts.push(layoutShiftMetric);
            
            // Track significant layout shifts
            if (shift.value > 0.1) {
              analytics.trackEvent('performance_layout_shift', {
                value: Math.round(shift.value * 1000),
                sources_count: shift.sources.length
              });
            }
          }
        });
      });

      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(layoutShiftObserver);
    }
  }

  // Memory monitoring
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      const trackMemory = () => {
        const memoryInfo = {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          usagePercentage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100,
          timestamp: Date.now()
        };
        
        this.metrics.customMetrics.memoryUsage = memoryInfo;
        
        // Track high memory usage
        if (memoryInfo.usagePercentage > 80) {
          analytics.trackEvent('performance_high_memory', {
            usage_percentage: Math.round(memoryInfo.usagePercentage),
            used_heap: memoryInfo.usedJSHeapSize,
            total_heap: memoryInfo.totalJSHeapSize
          });
        }
      };
      
      // Track memory every 30 seconds
      setInterval(trackMemory, 30000);
      trackMemory(); // Initial measurement
    }
  }

  // Network monitoring
  setupNetworkMonitoring() {
    if ('connection' in navigator) {
      const updateNetworkInfo = () => {
        const connection = navigator.connection;
        const networkInfo = {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
          timestamp: Date.now()
        };
        
        this.metrics.customMetrics.networkInfo = networkInfo;
        
        analytics.trackEvent('performance_network_info', {
          effective_type: networkInfo.effectiveType,
          downlink: networkInfo.downlink,
          rtt: networkInfo.rtt,
          save_data: networkInfo.saveData
        });
      };
      
      connection.addEventListener('change', updateNetworkInfo);
      updateNetworkInfo(); // Initial measurement
    }
  }

  // Rating system
  getRating(metric, value) {
    const benchmark = this.benchmarks[metric];
    if (!benchmark) return 'unknown';
    
    if (metric === 'resource' || metric === 'image' || metric === 'interaction') {
      // For resource loading times
      if (value <= 1000) return 'good';
      if (value <= 2500) return 'needs-improvement';
      return 'poor';
    }
    
    if (value <= benchmark.good) return 'good';
    if (value <= benchmark.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  // Report metrics to analytics
  reportMetric(metricName, metric) {
    analytics.trackEvent(`core_web_vital_${metricName}`, {
      value: Math.round(metric.value),
      rating: this.getRating(metricName, metric.value),
      delta: Math.round(metric.delta || 0),
      id: metric.id
    });
  }

  // Performance analysis and recommendations
  getPerformanceAnalysis() {
    const analysis = {
      score: this.calculatePerformanceScore(),
      coreWebVitals: this.analyzeCoreWebVitals(),
      resources: this.analyzeResources(),
      recommendations: this.generateRecommendations(),
      timestamp: Date.now()
    };
    
    return analysis;
  }

  calculatePerformanceScore() {
    const cwv = this.metrics.coreWebVitals;
    let score = 100;
    
    // Deduct points for poor metrics
    Object.keys(cwv).forEach(metric => {
      if (cwv[metric] && cwv[metric].rating === 'poor') {
        score -= 20;
      } else if (cwv[metric] && cwv[metric].rating === 'needs-improvement') {
        score -= 10;
      }
    });
    
    return Math.max(0, score);
  }

  analyzeCoreWebVitals() {
    const cwv = this.metrics.coreWebVitals;
    const analysis = {};
    
    Object.keys(cwv).forEach(metric => {
      if (cwv[metric]) {
        analysis[metric] = {
          value: cwv[metric].value,
          rating: cwv[metric].rating,
          benchmark: this.benchmarks[metric],
          status: cwv[metric].rating === 'good' ? 'PASS' : 'FAIL'
        };
      }
    });
    
    return analysis;
  }

  analyzeResources() {
    const resources = this.metrics.resourceTimings;
    const analysis = {
      totalResources: resources.length,
      totalSize: resources.reduce((sum, r) => sum + (r.size || 0), 0),
      averageLoadTime: resources.reduce((sum, r) => sum + r.loadTime, 0) / resources.length,
      slowResources: resources.filter(r => r.loadTime > 2000),
      largeResources: resources.filter(r => r.size > 500000),
      resourceTypes: {}
    };
    
    // Group by resource type
    resources.forEach(resource => {
      if (!analysis.resourceTypes[resource.type]) {
        analysis.resourceTypes[resource.type] = {
          count: 0,
          totalSize: 0,
          averageLoadTime: 0
        };
      }
      
      analysis.resourceTypes[resource.type].count++;
      analysis.resourceTypes[resource.type].totalSize += resource.size || 0;
      analysis.resourceTypes[resource.type].averageLoadTime += resource.loadTime;
    });
    
    // Calculate averages
    Object.keys(analysis.resourceTypes).forEach(type => {
      const typeData = analysis.resourceTypes[type];
      typeData.averageLoadTime = typeData.averageLoadTime / typeData.count;
    });
    
    return analysis;
  }

  generateRecommendations() {
    const recommendations = [];
    const cwv = this.metrics.coreWebVitals;
    const resources = this.analyzeResources();
    
    // LCP recommendations
    if (cwv.lcp && cwv.lcp.rating === 'poor') {
      recommendations.push({
        type: 'LCP',
        priority: 'high',
        message: 'Largest Contentful Paint is slow. Consider optimizing images, reducing server response times, and eliminating render-blocking resources.',
        value: cwv.lcp.value,
        benchmark: this.benchmarks.lcp.good
      });
    }
    
    // FID recommendations
    if (cwv.fid && cwv.fid.rating === 'poor') {
      recommendations.push({
        type: 'FID',
        priority: 'high',
        message: 'First Input Delay is high. Consider reducing JavaScript execution time and breaking up long tasks.',
        value: cwv.fid.value,
        benchmark: this.benchmarks.fid.good
      });
    }
    
    // CLS recommendations
    if (cwv.cls && cwv.cls.rating === 'poor') {
      recommendations.push({
        type: 'CLS',
        priority: 'medium',
        message: 'Cumulative Layout Shift is high. Ensure images and ads have dimensions, and avoid inserting content above existing content.',
        value: cwv.cls.value,
        benchmark: this.benchmarks.cls.good
      });
    }
    
    // Resource recommendations
    if (resources.largeResources.length > 0) {
      recommendations.push({
        type: 'RESOURCES',
        priority: 'medium',
        message: `${resources.largeResources.length} large resources detected. Consider compressing images and implementing lazy loading.`,
        details: resources.largeResources.map(r => ({ url: r.name, size: r.size }))
      });
    }
    
    if (resources.slowResources.length > 0) {
      recommendations.push({
        type: 'RESOURCES',
        priority: 'medium',
        message: `${resources.slowResources.length} slow-loading resources detected. Consider using a CDN and optimizing server response times.`,
        details: resources.slowResources.map(r => ({ url: r.name, loadTime: r.loadTime }))
      });
    }
    
    // Memory recommendations
    const memory = this.metrics.customMetrics.memoryUsage;
    if (memory && memory.usagePercentage > 70) {
      recommendations.push({
        type: 'MEMORY',
        priority: 'low',
        message: 'High memory usage detected. Consider optimizing component rendering and removing unused code.',
        usage: memory.usagePercentage
      });
    }
    
    return recommendations;
  }

  // Export performance data
  exportPerformanceData() {
    const data = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: this.metrics,
      analysis: this.getPerformanceAnalysis()
    };
    
    return data;
  }

  // Performance monitoring controls
  startMonitoring() {
    this.isMonitoring = true;
    console.log('Performance monitoring started');
  }

  stopMonitoring() {
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect());
    console.log('Performance monitoring stopped');
  }

  // Get current metrics
  getMetrics() {
    return {
      ...this.metrics,
      isInitialized: this.isInitialized,
      timestamp: Date.now()
    };
  }

  // Performance budget checking
  checkPerformanceBudget(budget = {}) {
    const defaultBudget = {
      lcp: 2500,
      fid: 100,
      cls: 0.1,
      bundleSize: 250000, // 250KB
      imageSize: 100000,  // 100KB per image
      apiResponseTime: 1000
    };
    
    const activeBudget = { ...defaultBudget, ...budget };
    const violations = [];
    
    // Check Core Web Vitals
    Object.keys(this.metrics.coreWebVitals).forEach(metric => {
      const metricData = this.metrics.coreWebVitals[metric];
      if (metricData && activeBudget[metric] && metricData.value > activeBudget[metric]) {
        violations.push({
          type: 'core-web-vital',
          metric: metric,
          actual: metricData.value,
          budget: activeBudget[metric],
          severity: metricData.rating
        });
      }
    });
    
    // Check bundle size
    const bundleMetrics = this.metrics.customMetrics.bundleLoading;
    if (bundleMetrics && bundleMetrics.totalSize > activeBudget.bundleSize) {
      violations.push({
        type: 'bundle-size',
        actual: bundleMetrics.totalSize,
        budget: activeBudget.bundleSize,
        severity: 'high'
      });
    }
    
    return {
      passed: violations.length === 0,
      violations: violations,
      score: Math.max(0, 100 - (violations.length * 10))
    };
  }
}

// Create and export performance monitor instance
const performanceMonitor = new PerformanceMonitor();

// Export utility functions
export const getPerformanceMetrics = () => performanceMonitor.getMetrics();
export const getPerformanceAnalysis = () => performanceMonitor.getPerformanceAnalysis();
export const exportPerformanceData = () => performanceMonitor.exportPerformanceData();
export const checkPerformanceBudget = (budget) => performanceMonitor.checkPerformanceBudget(budget);
export const startMonitoring = () => performanceMonitor.startMonitoring();
export const stopMonitoring = () => performanceMonitor.stopMonitoring();

export default performanceMonitor; 