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
 * Format weight values (kg) to appropriate units
 * @param {number} weight - Weight in kilograms
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted weight string with units
 */
export const formatWeight = (weight, decimals = 1) => {
  if (weight === null || weight === undefined) return '-';
  
  try {
    const numWeight = Number(weight);
    
    if (isNaN(numWeight)) {
      return '-';
    }
    
    // Convert to appropriate units
    if (numWeight >= 1000) {
      // Convert to metric tons for large weights
      return `${(numWeight / 1000).toFixed(decimals)} tonnes`;
    } else if (numWeight < 0.1) {
      // Convert to grams for very small weights
      return `${(numWeight * 1000).toFixed(0)} g`;
    } else {
      // Use kilograms for normal weights
      return `${numWeight.toFixed(decimals)} kg`;
    }
  } catch (error) {
    console.error('Weight formatting error:', error);
    return '-';
  }
};

/**
 * Format CO2 emissions values (kg) to appropriate units
 * @param {number} co2 - CO2 in kilograms
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted CO2 string with units
 */
export const formatCO2 = (co2, decimals = 1) => {
  if (co2 === null || co2 === undefined) return '-';
  
  try {
    const numCO2 = Number(co2);
    
    if (isNaN(numCO2)) {
      return '-';
    }
    
    // Convert to appropriate units
    if (numCO2 >= 1000) {
      // Convert to metric tons for large amounts
      return `${(numCO2 / 1000).toFixed(decimals)} tonnes CO₂`;
    } else {
      // Use kilograms for normal amounts
      return `${numCO2.toFixed(decimals)} kg CO₂`;
    }
  } catch (error) {
    console.error('CO2 formatting error:', error);
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