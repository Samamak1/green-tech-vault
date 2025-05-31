/**
 * Validation Utilities
 * Data validation functions for reports
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate number within range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if valid
 */
export function isInRange(value, min, max) {
  return typeof value === 'number' && value >= min && value <= max;
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} True if has value
 */
export function isRequired(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
}

/**
 * Validate date range
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {boolean} True if valid range
 */
export function isValidDateRange(startDate, endDate) {
  return startDate instanceof Date && 
         endDate instanceof Date && 
         startDate <= endDate;
}

/**
 * Validate report data structure
 * @param {Object} data - Report data
 * @returns {Object} Validation result
 */
export function validateReportData(data) {
  const errors = [];
  const warnings = [];

  // Check required fields
  if (!data.client || !data.client.id) {
    errors.push('Client ID is required');
  }

  if (!data.dateRange || !isValidDateRange(data.dateRange.startDate, data.dateRange.endDate)) {
    errors.push('Valid date range is required');
  }

  // Check data quality
  if (!data.assets || data.assets.length === 0) {
    warnings.push('No asset data found');
  }

  if (data.assets && data.assets.some(asset => !asset.weight || asset.weight <= 0)) {
    warnings.push('Some assets have invalid weight data');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate asset data
 * @param {Object} asset - Asset data
 * @returns {Object} Validation result
 */
export function validateAsset(asset) {
  const errors = [];

  if (!asset.id) errors.push('Asset ID is required');
  if (!asset.category) errors.push('Asset category is required');
  if (!isInRange(asset.weight, 0, 10000)) errors.push('Asset weight must be between 0 and 10,000 lbs');
  if (asset.value && !isInRange(asset.value, 0, 1000000)) errors.push('Asset value must be between $0 and $1,000,000');

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate financial data
 * @param {Object} financial - Financial data
 * @returns {Object} Validation result
 */
export function validateFinancialData(financial) {
  const errors = [];
  const warnings = [];

  // Check for negative values where not expected
  if (financial.serviceFees < 0) errors.push('Service fees cannot be negative');
  if (financial.taxDeductions < 0) errors.push('Tax deductions cannot be negative');
  
  // Check for reasonable values
  if (financial.taxDeductions > financial.netBenefit * 2) {
    warnings.push('Tax deductions seem unusually high compared to net benefit');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate percentage value
 * @param {number} value - Value to validate
 * @returns {boolean} True if valid percentage
 */
export function isValidPercentage(value) {
  return typeof value === 'number' && value >= 0 && value <= 100;
}

/**
 * Validate report configuration
 * @param {Object} config - Report configuration
 * @returns {Object} Validation result
 */
export function validateReportConfig(config) {
  const errors = [];
  const warnings = [];

  // Required configuration
  if (!config.reportType) errors.push('Report type is required');
  if (!config.sections || Object.keys(config.sections).length === 0) {
    errors.push('At least one section must be selected');
  }

  // Check section dependencies
  if (config.sections) {
    if (config.sections.financialImpact && !config.sections.kpis) {
      warnings.push('Financial Impact section works best with KPIs section enabled');
    }
    
    if (config.sections.recommendations && !config.sections.environmentalImpact) {
      warnings.push('Recommendations section requires Environmental Impact data');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate client data
 * @param {Object} client - Client data
 * @returns {Object} Validation result
 */
export function validateClientData(client) {
  const errors = [];

  if (!client.id) errors.push('Client ID is required');
  if (!client.name || client.name.trim().length === 0) errors.push('Client name is required');
  
  if (client.email && !isValidEmail(client.email)) {
    errors.push('Invalid client email address');
  }
  
  if (client.phone && !isValidPhone(client.phone)) {
    errors.push('Invalid client phone number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize HTML content
 * @param {string} html - HTML to sanitize
 * @returns {string} Sanitized HTML
 */
export function sanitizeHtml(html) {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
}

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export function validateFileUpload(file, options = {}) {
  const errors = [];
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf']
  } = options;

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / 1024 / 1024}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`);
  }

  const extension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0];
  if (extension && !allowedExtensions.includes(extension)) {
    errors.push(`File extension ${extension} is not allowed`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
} 