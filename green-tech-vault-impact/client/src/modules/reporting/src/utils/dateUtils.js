/**
 * Date Utilities
 * Date manipulation and validation functions
 */

/**
 * Check if a value is a valid date
 * @param {any} date - Value to check
 * @returns {boolean} True if valid date
 */
export function isValidDate(date) {
  if (!date) return false;
  
  const dateObj = date instanceof Date ? date : new Date(date);
  return !isNaN(dateObj.getTime());
}

/**
 * Get quarter number from date
 * @param {Date} date - Date to get quarter from
 * @returns {number} Quarter number (1-4)
 */
export function getQuarter(date) {
  const dateObj = date instanceof Date ? date : new Date(date);
  return Math.floor(dateObj.getMonth() / 3) + 1;
}

/**
 * Get date range for a specific period
 * @param {string} period - Period type ('day', 'week', 'month', 'quarter', 'year')
 * @param {Date} referenceDate - Reference date (default: today)
 * @returns {Object} Object with startDate and endDate
 */
export function getDateRange(period, referenceDate = new Date()) {
  const date = new Date(referenceDate);
  let startDate, endDate;

  switch (period) {
    case 'day':
      startDate = new Date(date.setHours(0, 0, 0, 0));
      endDate = new Date(date.setHours(23, 59, 59, 999));
      break;

    case 'week':
      const dayOfWeek = date.getDay();
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Monday start
      startDate = new Date(date.setDate(date.getDate() + diff));
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'month':
      startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
      break;

    case 'quarter':
      const quarter = getQuarter(date);
      const quarterStartMonth = (quarter - 1) * 3;
      startDate = new Date(date.getFullYear(), quarterStartMonth, 1);
      endDate = new Date(date.getFullYear(), quarterStartMonth + 3, 0, 23, 59, 59, 999);
      break;

    case 'year':
      startDate = new Date(date.getFullYear(), 0, 1);
      endDate = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;

    default:
      throw new Error(`Invalid period: ${period}`);
  }

  return { startDate, endDate };
}

/**
 * Add days to a date
 * @param {Date} date - Base date
 * @param {number} days - Days to add (can be negative)
 * @returns {Date} New date
 */
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to a date
 * @param {Date} date - Base date
 * @param {number} months - Months to add (can be negative)
 * @returns {Date} New date
 */
export function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to a date
 * @param {Date} date - Base date
 * @param {number} years - Years to add (can be negative)
 * @returns {Date} New date
 */
export function addYears(date, years) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Get difference between two dates in days
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Days difference
 */
export function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1 - date2) / oneDay));
}

/**
 * Get difference between two dates in months
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Months difference
 */
export function monthsBetween(date1, date2) {
  const yearDiff = date2.getFullYear() - date1.getFullYear();
  const monthDiff = date2.getMonth() - date1.getMonth();
  return yearDiff * 12 + monthDiff;
}

/**
 * Check if date is today
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is today
 */
export function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

/**
 * Check if date is in the past
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export function isPast(date) {
  return date < new Date();
}

/**
 * Check if date is in the future
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in the future
 */
export function isFuture(date) {
  return date > new Date();
}

/**
 * Get start of day
 * @param {Date} date - Date to process
 * @returns {Date} Start of day
 */
export function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get end of day
 * @param {Date} date - Date to process
 * @returns {Date} End of day
 */
export function endOfDay(date) {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Get start of month
 * @param {Date} date - Date to process
 * @returns {Date} Start of month
 */
export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Get end of month
 * @param {Date} date - Date to process
 * @returns {Date} End of month
 */
export function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

/**
 * Get start of quarter
 * @param {Date} date - Date to process
 * @returns {Date} Start of quarter
 */
export function startOfQuarter(date) {
  const quarter = getQuarter(date);
  const startMonth = (quarter - 1) * 3;
  return new Date(date.getFullYear(), startMonth, 1);
}

/**
 * Get end of quarter
 * @param {Date} date - Date to process
 * @returns {Date} End of quarter
 */
export function endOfQuarter(date) {
  const quarter = getQuarter(date);
  const endMonth = quarter * 3;
  return new Date(date.getFullYear(), endMonth, 0, 23, 59, 59, 999);
}

/**
 * Get start of year
 * @param {Date} date - Date to process
 * @returns {Date} Start of year
 */
export function startOfYear(date) {
  return new Date(date.getFullYear(), 0, 1);
}

/**
 * Get end of year
 * @param {Date} date - Date to process
 * @returns {Date} End of year
 */
export function endOfYear(date) {
  return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
}

/**
 * Get array of dates between two dates
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @param {string} interval - Interval ('day', 'week', 'month')
 * @returns {Array<Date>} Array of dates
 */
export function getDatesBetween(startDate, endDate, interval = 'day') {
  const dates = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(new Date(current));
    
    switch (interval) {
      case 'day':
        current.setDate(current.getDate() + 1);
        break;
      case 'week':
        current.setDate(current.getDate() + 7);
        break;
      case 'month':
        current.setMonth(current.getMonth() + 1);
        break;
      default:
        throw new Error(`Invalid interval: ${interval}`);
    }
  }

  return dates;
}

/**
 * Parse date string with multiple format support
 * @param {string} dateString - Date string to parse
 * @returns {Date|null} Parsed date or null
 */
export function parseDate(dateString) {
  if (!dateString) return null;

  // Try ISO format first
  let date = new Date(dateString);
  if (!isNaN(date.getTime())) return date;

  // Try common formats
  const formats = [
    /(\d{1,2})\/(\d{1,2})\/(\d{4})/, // MM/DD/YYYY
    /(\d{4})-(\d{1,2})-(\d{1,2})/, // YYYY-MM-DD
    /(\d{1,2})-(\d{1,2})-(\d{4})/, // DD-MM-YYYY
  ];

  for (const format of formats) {
    const match = dateString.match(format);
    if (match) {
      // Determine the order based on the format
      if (format.source.includes('\\d{4})-')) {
        // YYYY-MM-DD
        date = new Date(match[1], match[2] - 1, match[3]);
      } else if (dateString.indexOf('/') > -1) {
        // MM/DD/YYYY
        date = new Date(match[3], match[1] - 1, match[2]);
      } else {
        // DD-MM-YYYY
        date = new Date(match[3], match[2] - 1, match[1]);
      }
      
      if (!isNaN(date.getTime())) return date;
    }
  }

  return null;
} 