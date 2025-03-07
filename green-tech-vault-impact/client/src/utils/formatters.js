/**
 * Format a date string or Date object to a readable format
 * @param {string|Date} date - The date to format
 * @param {string} format - Optional format string (default: 'MMM DD, YYYY')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'MMM DD, YYYY') => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return '-';
    }
    
    const options = {};
    
    if (format.includes('MMM')) {
      options.month = 'short';
    } else if (format.includes('MMMM')) {
      options.month = 'long';
    } else if (format.includes('MM')) {
      options.month = '2-digit';
    }
    
    if (format.includes('DD')) {
      options.day = '2-digit';
    } else if (format.includes('D')) {
      options.day = 'numeric';
    }
    
    if (format.includes('YYYY')) {
      options.year = 'numeric';
    } else if (format.includes('YY')) {
      options.year = '2-digit';
    }
    
    if (format.includes('HH')) {
      options.hour = '2-digit';
      options.hour12 = false;
    }
    
    if (format.includes('mm')) {
      options.minute = '2-digit';
    }
    
    if (format.includes('ss')) {
      options.second = '2-digit';
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  } catch (error) {
    console.error('Date formatting error:', error);
    return '-';
  }
};

/**
 * Format a number with commas as thousands separators
 * @param {number} number - The number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '-';
  
  try {
    return new Intl.NumberFormat('en-US').format(number);
  } catch (error) {
    console.error('Number formatting error:', error);
    return '-';
  }
};

/**
 * Format a currency value
 * @param {number} value - The value to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
  if (value === null || value === undefined) return '-';
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return '-';
  }
};

/**
 * Format a percentage value
 * @param {number} value - The value to format (0-100)
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '-';
  
  try {
    return `${value.toFixed(decimals)}%`;
  } catch (error) {
    console.error('Percentage formatting error:', error);
    return '-';
  }
};

/**
 * Truncate a string to a maximum length and add ellipsis if needed
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @returns {string} Truncated string
 */
export const truncateString = (str, maxLength = 50) => {
  if (!str) return '';
  
  if (str.length <= maxLength) {
    return str;
  }
  
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Capitalize the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}; 