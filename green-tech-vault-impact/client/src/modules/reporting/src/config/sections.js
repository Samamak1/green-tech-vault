/**
 * Report Sections Configuration
 * Defines all available report sections and their properties
 */

export const sections = {
  executiveSummary: {
    name: 'Executive Summary',
    description: 'High-level overview and key achievements',
    icon: '🎯',
    required: true,
    category: 'overview',
    estimatedPages: 0.5,
    dependencies: [],
    dataRequirements: {
      kpis: true,
      summary: true
    },
    features: {
      charts: false,
      tables: false,
      interactive: false
    }
  },

  kpis: {
    name: 'Key Performance Indicators',
    description: 'Metrics dashboard with visual indicators',
    icon: '📊',
    required: false,
    category: 'metrics',
    estimatedPages: 1,
    dependencies: [],
    dataRequirements: {
      metrics: true,
      trends: true
    },
    features: {
      charts: true,
      tables: false,
      interactive: true
    }
  },

  environmentalImpact: {
    name: 'Environmental Impact Analysis',
    description: 'Carbon footprint, resource recovery, and sustainability metrics',
    icon: '🌍',
    required: false,
    category: 'environmental',
    estimatedPages: 1.5,
    dependencies: ['kpis'],
    dataRequirements: {
      environmental: true,
      carbon: true,
      resources: true
    },
    features: {
      charts: true,
      tables: true,
      interactive: true
    }
  },

  assetTracking: {
    name: 'Asset Tracking & Chain of Custody',
    description: 'Detailed tracking information and processing breakdown',
    icon: '📋',
    required: false,
    category: 'operational',
    estimatedPages: 1.5,
    dependencies: [],
    dataRequirements: {
      assets: true,
      tracking: true,
      custody: true
    },
    features: {
      charts: true,
      tables: true,
      interactive: false
    }
  },

  financialImpact: {
    name: 'Financial Impact & Tax Benefits',
    description: 'Cost-benefit analysis and tax documentation',
    icon: '💰',
    required: false,
    category: 'financial',
    estimatedPages: 1,
    dependencies: ['kpis'],
    dataRequirements: {
      financial: true,
      taxes: true,
      costs: true
    },
    features: {
      charts: true,
      tables: true,
      interactive: false
    }
  },

  csrImpact: {
    name: 'CSR Impact & Community Benefits',
    description: 'Corporate social responsibility and community impact',
    icon: '🤝',
    required: false,
    category: 'social',
    estimatedPages: 1,
    dependencies: ['environmentalImpact'],
    dataRequirements: {
      csr: true,
      community: true,
      donations: true
    },
    features: {
      charts: false,
      tables: true,
      interactive: false
    }
  },

  compliance: {
    name: 'Compliance & Certifications',
    description: 'Regulatory compliance status and certifications',
    icon: '✅',
    required: false,
    category: 'compliance',
    estimatedPages: 1,
    dependencies: [],
    dataRequirements: {
      compliance: true,
      certifications: true,
      audits: true
    },
    features: {
      charts: false,
      tables: true,
      interactive: false
    }
  },

  recommendations: {
    name: 'Strategic Recommendations',
    description: 'Future opportunities and action items',
    icon: '🚀',
    required: false,
    category: 'strategic',
    estimatedPages: 1,
    dependencies: ['kpis', 'environmentalImpact', 'financialImpact'],
    dataRequirements: {
      trends: true,
      benchmarks: true,
      opportunities: true
    },
    features: {
      charts: true,
      tables: false,
      interactive: false
    }
  },

  dataDestruction: {
    name: 'Data Destruction Certificates',
    description: 'Detailed data sanitization and destruction records',
    icon: '🔒',
    required: false,
    category: 'security',
    estimatedPages: 0.5,
    dependencies: ['assetTracking'],
    dataRequirements: {
      dataDestruction: true,
      certificates: true
    },
    features: {
      charts: false,
      tables: true,
      interactive: false
    }
  },

  processingBreakdown: {
    name: 'Processing Breakdown',
    description: 'Detailed breakdown of processing methods and outcomes',
    icon: '⚙️',
    required: false,
    category: 'operational',
    estimatedPages: 1,
    dependencies: ['assetTracking'],
    dataRequirements: {
      processing: true,
      methods: true,
      outcomes: true
    },
    features: {
      charts: true,
      tables: true,
      interactive: true
    }
  },

  timeline: {
    name: 'Project Timeline',
    description: 'Chronological view of activities and milestones',
    icon: '📅',
    required: false,
    category: 'operational',
    estimatedPages: 0.5,
    dependencies: [],
    dataRequirements: {
      timeline: true,
      milestones: true
    },
    features: {
      charts: false,
      tables: false,
      interactive: true
    }
  },

  benchmarking: {
    name: 'Industry Benchmarking',
    description: 'Comparison with industry standards and best practices',
    icon: '📈',
    required: false,
    category: 'analysis',
    estimatedPages: 1,
    dependencies: ['kpis'],
    dataRequirements: {
      benchmarks: true,
      industry: true,
      standards: true
    },
    features: {
      charts: true,
      tables: true,
      interactive: false
    }
  }
};

/**
 * Section categories for organization
 */
export const sectionCategories = {
  overview: {
    name: 'Overview',
    description: 'High-level summaries and key information',
    icon: '📋',
    color: '#3498db'
  },
  metrics: {
    name: 'Metrics & KPIs',
    description: 'Performance indicators and measurements',
    icon: '📊',
    color: '#27ae60'
  },
  environmental: {
    name: 'Environmental',
    description: 'Sustainability and environmental impact',
    icon: '🌍',
    color: '#2ecc71'
  },
  operational: {
    name: 'Operational',
    description: 'Process and operational details',
    icon: '⚙️',
    color: '#f39c12'
  },
  financial: {
    name: 'Financial',
    description: 'Financial impact and benefits',
    icon: '💰',
    color: '#e67e22'
  },
  social: {
    name: 'Social Impact',
    description: 'Community and social responsibility',
    icon: '🤝',
    color: '#9b59b6'
  },
  compliance: {
    name: 'Compliance',
    description: 'Regulatory and certification status',
    icon: '✅',
    color: '#34495e'
  },
  security: {
    name: 'Security',
    description: 'Data security and protection',
    icon: '🔒',
    color: '#e74c3c'
  },
  strategic: {
    name: 'Strategic',
    description: 'Future planning and recommendations',
    icon: '🚀',
    color: '#8e44ad'
  },
  analysis: {
    name: 'Analysis',
    description: 'Comparative analysis and insights',
    icon: '📈',
    color: '#16a085'
  }
};

/**
 * Get section configuration by key
 * @param {string} sectionKey - Section key
 * @returns {Object|null} Section configuration
 */
export function getSection(sectionKey) {
  return sections[sectionKey] || null;
}

/**
 * Get all sections as array
 * @returns {Array} Array of section objects with keys
 */
export function getAllSections() {
  return Object.keys(sections).map(key => ({
    key,
    ...sections[key]
  }));
}

/**
 * Get sections by category
 * @param {string} category - Category to filter by
 * @returns {Array} Array of sections in the category
 */
export function getSectionsByCategory(category) {
  return Object.keys(sections)
    .filter(key => sections[key].category === category)
    .map(key => ({
      key,
      ...sections[key]
    }));
}

/**
 * Get required sections
 * @returns {Array} Array of required sections
 */
export function getRequiredSections() {
  return Object.keys(sections)
    .filter(key => sections[key].required)
    .map(key => ({
      key,
      ...sections[key]
    }));
}

/**
 * Validate section dependencies
 * @param {Array} selectedSections - Array of selected section keys
 * @returns {Object} Validation result with missing dependencies
 */
export function validateSectionDependencies(selectedSections) {
  const missing = [];
  const warnings = [];

  selectedSections.forEach(sectionKey => {
    const section = sections[sectionKey];
    if (section && section.dependencies) {
      section.dependencies.forEach(dep => {
        if (!selectedSections.includes(dep)) {
          missing.push({
            section: sectionKey,
            dependency: dep,
            dependencyName: sections[dep]?.name || dep
          });
        }
      });
    }
  });

  return {
    isValid: missing.length === 0,
    missing,
    warnings
  };
}

/**
 * Calculate estimated pages for selected sections
 * @param {Array} selectedSections - Array of selected section keys
 * @returns {number} Estimated total pages
 */
export function calculateEstimatedPages(selectedSections) {
  return selectedSections.reduce((total, sectionKey) => {
    const section = sections[sectionKey];
    return total + (section?.estimatedPages || 0);
  }, 0);
}

/**
 * Get sections with specific features
 * @param {string} feature - Feature to filter by
 * @returns {Array} Array of sections with the feature
 */
export function getSectionsWithFeature(feature) {
  return Object.keys(sections)
    .filter(key => sections[key].features && sections[key].features[feature])
    .map(key => ({
      key,
      ...sections[key]
    }));
} 