/**
 * Report Types Configuration
 * Defines all available report types and their properties
 */

export const reportTypes = {
  pickup: {
    name: 'Per Pickup Report',
    description: 'Detailed report for a specific pickup event',
    icon: '📦',
    maxPages: 3,
    defaultSections: [
      'executiveSummary',
      'assetTracking',
      'compliance'
    ],
    requiredSections: ['executiveSummary'],
    dataRequirements: {
      pickupDate: true,
      assets: true,
      location: true
    },
    timeframe: 'single-event',
    features: {
      chainOfCustody: true,
      dataDestruction: true,
      itemizedList: true,
      photos: true
    }
  },

  monthly: {
    name: 'Monthly Report',
    description: 'Comprehensive monthly performance summary',
    icon: '📅',
    maxPages: 4,
    defaultSections: [
      'executiveSummary',
      'kpis',
      'environmentalImpact',
      'financialImpact'
    ],
    requiredSections: ['executiveSummary', 'kpis'],
    dataRequirements: {
      monthlyData: true,
      assets: true,
      financials: true
    },
    timeframe: 'monthly',
    features: {
      trendAnalysis: true,
      monthOverMonth: true,
      kpiDashboard: true,
      charts: true
    }
  },

  quarterly: {
    name: 'Quarterly Report',
    description: 'Detailed quarterly analysis and insights',
    icon: '📊',
    maxPages: 6,
    defaultSections: [
      'executiveSummary',
      'kpis',
      'environmentalImpact',
      'assetTracking',
      'financialImpact',
      'csrImpact'
    ],
    requiredSections: ['executiveSummary', 'kpis'],
    dataRequirements: {
      quarterlyData: true,
      assets: true,
      financials: true,
      environmental: true
    },
    timeframe: 'quarterly',
    features: {
      comprehensiveAnalysis: true,
      quarterOverQuarter: true,
      detailedCharts: true,
      recommendations: true,
      benchmarking: true
    }
  },

  semiAnnual: {
    name: 'Semi-Annual Report',
    description: 'Comprehensive 6-month performance review',
    icon: '📈',
    maxPages: 8,
    defaultSections: [
      'executiveSummary',
      'kpis',
      'environmentalImpact',
      'assetTracking',
      'financialImpact',
      'csrImpact',
      'compliance'
    ],
    requiredSections: ['executiveSummary', 'kpis', 'compliance'],
    dataRequirements: {
      semiAnnualData: true,
      assets: true,
      financials: true,
      environmental: true,
      compliance: true
    },
    timeframe: 'semi-annual',
    features: {
      strategicAnalysis: true,
      yearOverYear: true,
      complianceReview: true,
      strategicRecommendations: true,
      industryBenchmarks: true
    }
  },

  annual: {
    name: 'Annual Report',
    description: 'Complete yearly sustainability and performance report',
    icon: '📋',
    maxPages: 12,
    defaultSections: [
      'executiveSummary',
      'kpis',
      'environmentalImpact',
      'assetTracking',
      'financialImpact',
      'csrImpact',
      'compliance',
      'recommendations'
    ],
    requiredSections: [
      'executiveSummary',
      'kpis',
      'environmentalImpact',
      'compliance'
    ],
    dataRequirements: {
      annualData: true,
      assets: true,
      financials: true,
      environmental: true,
      compliance: true,
      csr: true
    },
    timeframe: 'annual',
    features: {
      comprehensiveReview: true,
      yearOverYear: true,
      strategicPlanning: true,
      executiveSummary: true,
      detailedAnalytics: true,
      futureProjections: true,
      industryComparison: true
    }
  }
};

/**
 * Get report type configuration by key
 * @param {string} type - Report type key
 * @returns {Object|null} Report type configuration
 */
export function getReportType(type) {
  return reportTypes[type] || null;
}

/**
 * Get all available report types as array
 * @returns {Array} Array of report type objects with keys
 */
export function getAllReportTypes() {
  return Object.keys(reportTypes).map(key => ({
    key,
    ...reportTypes[key]
  }));
}

/**
 * Validate if a report type exists
 * @param {string} type - Report type to validate
 * @returns {boolean} True if valid
 */
export function isValidReportType(type) {
  return type in reportTypes;
}

/**
 * Get report types by feature
 * @param {string} feature - Feature to filter by
 * @returns {Array} Array of report types that have the feature
 */
export function getReportTypesByFeature(feature) {
  return Object.keys(reportTypes).filter(key => 
    reportTypes[key].features && reportTypes[key].features[feature]
  ).map(key => ({
    key,
    ...reportTypes[key]
  }));
}

/**
 * Get report types by timeframe
 * @param {string} timeframe - Timeframe to filter by
 * @returns {Array} Array of report types for the timeframe
 */
export function getReportTypesByTimeframe(timeframe) {
  return Object.keys(reportTypes).filter(key => 
    reportTypes[key].timeframe === timeframe
  ).map(key => ({
    key,
    ...reportTypes[key]
  }));
} 