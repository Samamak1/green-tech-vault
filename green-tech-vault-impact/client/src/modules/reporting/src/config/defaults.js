/**
 * Default Configuration Settings
 * Default values for the reporting module
 */

export const defaults = {
  // API Configuration
  apiEndpoint: null,
  apiTimeout: 30000,
  retryAttempts: 3,
  
  // Client Configuration
  clientId: null,
  clientName: 'Client',
  
  // UI Configuration
  theme: 'default',
  locale: 'en-US',
  currency: 'USD',
  dateFormat: 'MM/dd/yyyy',
  timezone: 'America/New_York',
  
  // Report Generation
  defaultReportType: 'quarterly',
  maxPages: 20,
  pageSize: 'letter', // letter, a4, legal
  orientation: 'portrait', // portrait, landscape
  
  // Export Settings
  exportFormats: ['pdf', 'html', 'json'],
  pdfOptions: {
    format: 'letter',
    margin: {
      top: '0.75in',
      right: '0.75in',
      bottom: '0.75in',
      left: '0.75in'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '',
    footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
  },
  
  // Customization Defaults
  defaultSections: {
    executiveSummary: true,
    kpis: true,
    environmentalImpact: false,
    assetTracking: false,
    financialImpact: false,
    csrImpact: false,
    compliance: false,
    recommendations: false
  },
  
  // Data Processing
  dataValidation: {
    strict: false,
    requireAllFields: false,
    allowEstimates: true
  },
  
  // Chart Configuration
  chartDefaults: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)'
        }
      }
    }
  },
  
  // Color Schemes
  colorSchemes: {
    default: {
      primary: '#27ae60',
      secondary: '#3498db',
      success: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#17a2b8',
      light: '#f8f9fa',
      dark: '#343a40'
    },
    corporate: {
      primary: '#2c3e50',
      secondary: '#34495e',
      success: '#27ae60',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#3498db',
      light: '#ecf0f1',
      dark: '#2c3e50'
    },
    environmental: {
      primary: '#27ae60',
      secondary: '#16a085',
      success: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#3498db',
      light: '#d5f4e6',
      dark: '#1e8449'
    }
  },
  
  // Performance Settings
  performance: {
    enableCaching: true,
    cacheTimeout: 300000, // 5 minutes
    lazyLoadImages: true,
    optimizeCharts: true
  },
  
  // Accessibility
  accessibility: {
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    highContrast: false,
    fontSize: 'normal' // small, normal, large
  },
  
  // Security
  security: {
    sanitizeHtml: true,
    allowExternalImages: false,
    validateFileUploads: true
  },
  
  // Branding
  branding: {
    companyName: 'RYGNECO',
    logo: '🌱',
    primaryColor: '#27ae60',
    secondaryColor: '#3498db',
    fontFamily: 'Arial, sans-serif',
    showWatermark: false
  },
  
  // Feature Flags
  features: {
    enableInteractiveCharts: true,
    enableDataExport: true,
    enableCustomSections: false,
    enableRealTimeData: false,
    enableCollaboration: false,
    enableVersioning: false
  },
  
  // Notification Settings
  notifications: {
    showProgress: true,
    showErrors: true,
    showSuccess: true,
    autoHide: true,
    autoHideDelay: 5000
  },
  
  // Debug Settings
  debug: {
    enabled: false,
    logLevel: 'warn', // error, warn, info, debug
    showPerformanceMetrics: false,
    enableConsoleOutput: false
  }
};

/**
 * Environment-specific defaults
 */
export const environmentDefaults = {
  development: {
    debug: {
      enabled: true,
      logLevel: 'debug',
      showPerformanceMetrics: true,
      enableConsoleOutput: true
    },
    performance: {
      enableCaching: false
    }
  },
  
  production: {
    debug: {
      enabled: false,
      logLevel: 'error',
      showPerformanceMetrics: false,
      enableConsoleOutput: false
    },
    performance: {
      enableCaching: true,
      optimizeCharts: true
    },
    security: {
      sanitizeHtml: true,
      allowExternalImages: false,
      validateFileUploads: true
    }
  },
  
  testing: {
    debug: {
      enabled: true,
      logLevel: 'info'
    },
    performance: {
      enableCaching: false
    },
    notifications: {
      autoHide: false
    }
  }
};

/**
 * Get configuration for specific environment
 * @param {string} environment - Environment name
 * @returns {Object} Merged configuration
 */
export function getEnvironmentConfig(environment = 'production') {
  const envConfig = environmentDefaults[environment] || {};
  return mergeDeep(defaults, envConfig);
}

/**
 * Deep merge utility function
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
function mergeDeep(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = mergeDeep(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

/**
 * Validate configuration object
 * @param {Object} config - Configuration to validate
 * @returns {Object} Validation result
 */
export function validateConfig(config) {
  const errors = [];
  const warnings = [];
  
  // Required fields
  if (!config.clientId) {
    errors.push('clientId is required');
  }
  
  // Validate theme
  if (config.theme && !['default', 'corporate', 'environmental'].includes(config.theme)) {
    warnings.push(`Unknown theme: ${config.theme}, falling back to default`);
  }
  
  // Validate locale
  if (config.locale && !/^[a-z]{2}-[A-Z]{2}$/.test(config.locale)) {
    warnings.push(`Invalid locale format: ${config.locale}`);
  }
  
  // Validate API endpoint
  if (config.apiEndpoint && !isValidUrl(config.apiEndpoint)) {
    errors.push(`Invalid API endpoint: ${config.apiEndpoint}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Check if string is valid URL
 * @param {string} string - String to validate
 * @returns {boolean} True if valid URL
 */
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Default export
export default defaults; 