/**
 * Formatting Utilities
 * Common formatting functions for reports
 */

/**
 * Format a number with thousands separators and decimal places
 * @param {number} number - Number to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted number
 */
export function formatNumber(number, decimals = 0) {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0';
  }
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
}

/**
 * Format currency values
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency
 */
export function formatCurrency(amount, currency = 'USD') {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format style ('short', 'long', 'full', or custom)
 * @returns {string} Formatted date
 */
export function formatDate(date, format = 'short') {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    
    case 'full':
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    
    case 'month-year':
      return dateObj.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
    
    case 'quarter':
      const quarter = Math.floor(dateObj.getMonth() / 3) + 1;
      return `Q${quarter} ${dateObj.getFullYear()}`;
    
    default:
      return dateObj.toLocaleDateString('en-US');
  }
}

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export function formatPercentage(value, decimals = 0) {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0%';
  }
  
  return `${formatNumber(value, decimals)}%`;
}

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format time duration
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} Formatted duration
 */
export function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''}`;
  }
}

/**
 * Format weight
 * @param {number} pounds - Weight in pounds
 * @param {string} unit - Target unit ('lbs', 'kg', 'tons')
 * @returns {string} Formatted weight
 */
export function formatWeight(pounds, unit = 'lbs') {
  if (typeof pounds !== 'number' || isNaN(pounds)) {
    return '0 lbs';
  }
  
  switch (unit) {
    case 'kg':
      return `${formatNumber(pounds * 0.453592, 2)} kg`;
    
    case 'tons':
      return `${formatNumber(pounds / 2000, 2)} tons`;
    
    case 'lbs':
    default:
      return `${formatNumber(pounds)} lbs`;
  }
}

/**
 * Format phone number
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
}

/**
 * Format array as list
 * @param {Array} items - Items to format
 * @param {string} separator - Separator (default: ', ')
 * @param {string} lastSeparator - Last separator (default: ' and ')
 * @returns {string} Formatted list
 */
export function formatList(items, separator = ', ', lastSeparator = ' and ') {
  if (!Array.isArray(items) || items.length === 0) {
    return '';
  }
  
  if (items.length === 1) {
    return items[0].toString();
  }
  
  if (items.length === 2) {
    return items.join(lastSeparator);
  }
  
  const lastItem = items[items.length - 1];
  const otherItems = items.slice(0, -1);
  
  return otherItems.join(separator) + lastSeparator + lastItem;
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength, suffix = '...') {
  if (!text || text.length <= maxLength) {
    return text || '';
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Format change value with arrow
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @param {boolean} showPercentage - Show as percentage (default: true)
 * @returns {string} Formatted change
 */
export function formatChange(current, previous, showPercentage = true) {
  if (!previous || previous === 0) {
    return 'N/A';
  }
  
  const change = ((current - previous) / previous) * 100;
  const arrow = change > 0 ? '↑' : change < 0 ? '↓' : '→';
  const changeText = showPercentage
    ? `${Math.abs(change).toFixed(1)}%`
    : formatNumber(Math.abs(current - previous));
  
  return `${arrow} ${changeText}`;
}

/**
 * Format metric with unit
 * @param {number} value - Metric value
 * @param {string} unit - Unit of measurement
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted metric
 */
export function formatMetric(value, unit, decimals = 0) {
  return `${formatNumber(value, decimals)} ${unit}`;
}

/**
 * Format date range
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {string} Formatted date range
 */
export function formatDateRange(startDate, endDate) {
  const start = formatDate(startDate, 'short');
  const end = formatDate(endDate, 'short');
  
  return `${start} - ${end}`;
}

/**
 * Format ordinal number
 * @param {number} number - Number to format
 * @returns {string} Formatted ordinal
 */
export function formatOrdinal(number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = number % 100;
  
  return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
} 