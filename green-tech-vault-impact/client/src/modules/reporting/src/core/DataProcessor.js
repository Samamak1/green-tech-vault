/**
 * Data Processor
 * Handles data aggregation, processing, and calculations for reports
 */

import { formatNumber, formatCurrency, formatDate } from '../utils/formatters.js';
import { isValidDate, getQuarter, getDateRange } from '../utils/dateUtils.js';

export class DataProcessor {
  constructor(config) {
    this.config = config;
    this.cache = new Map();
  }

  /**
   * Process data for a specific report type
   * @param {string} reportType - Type of report
   * @param {Object} options - Processing options
   * @returns {Promise<Object>} Processed data
   */
  async processForReport(reportType, options) {
    const { dateRange, filters, sections } = options;
    
    // Check cache first
    const cacheKey = this.getCacheKey(reportType, options);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Fetch raw data
      const rawData = await this.fetchData(dateRange, filters);
      
      // Process based on report sections
      const processedData = {
        metadata: this.generateMetadata(rawData, dateRange),
        client: this.processClientData(rawData.client),
        sections: {}
      };

      // Process each enabled section
      for (const [sectionKey, enabled] of Object.entries(sections)) {
        if (enabled) {
          processedData.sections[sectionKey] = await this.processSection(
            sectionKey,
            rawData,
            dateRange
          );
        }
      }

      // Calculate aggregated metrics
      processedData.summary = this.calculateSummaryMetrics(processedData.sections);
      
      // Cache the result
      if (this.config.performance.enableCaching) {
        this.cache.set(cacheKey, processedData);
        setTimeout(() => this.cache.delete(cacheKey), this.config.performance.cacheTimeout);
      }

      return processedData;
    } catch (error) {
      console.error('Data processing failed:', error);
      throw error;
    }
  }

  /**
   * Fetch raw data from API or database
   * @param {Object} dateRange - Date range for data
   * @param {Object} filters - Additional filters
   * @returns {Promise<Object>} Raw data
   */
  async fetchData(dateRange, filters) {
    // Simulate data fetching - replace with actual API calls
    return {
      client: {
        id: this.config.clientId,
        name: this.config.clientName || 'Sample Client',
        industry: 'Technology',
        size: 'Enterprise',
        location: 'Cincinnati, OH'
      },
      pickups: this.generatePickupData(dateRange),
      assets: this.generateAssetData(dateRange),
      processing: this.generateProcessingData(dateRange),
      financial: this.generateFinancialData(dateRange),
      environmental: this.generateEnvironmentalData(dateRange),
      compliance: this.generateComplianceData(),
      community: this.generateCommunityData(dateRange)
    };
  }

  /**
   * Process individual section data
   * @param {string} sectionKey - Section identifier
   * @param {Object} rawData - Raw data
   * @param {Object} dateRange - Date range
   * @returns {Promise<Object>} Processed section data
   */
  async processSection(sectionKey, rawData, dateRange) {
    switch (sectionKey) {
      case 'executiveSummary':
        return this.processExecutiveSummary(rawData, dateRange);
      
      case 'kpis':
        return this.processKPIs(rawData, dateRange);
      
      case 'environmentalImpact':
        return this.processEnvironmentalImpact(rawData, dateRange);
      
      case 'assetTracking':
        return this.processAssetTracking(rawData, dateRange);
      
      case 'financialImpact':
        return this.processFinancialImpact(rawData, dateRange);
      
      case 'csrImpact':
        return this.processCSRImpact(rawData, dateRange);
      
      case 'compliance':
        return this.processCompliance(rawData);
      
      case 'recommendations':
        return this.processRecommendations(rawData, dateRange);
      
      default:
        return {};
    }
  }

  /**
   * Process Executive Summary data
   */
  processExecutiveSummary(rawData, dateRange) {
    const totalWeight = rawData.assets.reduce((sum, a) => sum + a.weight, 0);
    const diversionRate = this.calculateDiversionRate(rawData.processing);
    const carbonImpact = this.calculateCarbonImpact(rawData.environmental);
    const financialBenefit = this.calculateFinancialBenefit(rawData.financial);

    return {
      text: `During ${this.formatDateRange(dateRange)}, EcoTech Solutions successfully processed ${formatNumber(totalWeight)} lbs of electronic waste, achieving a ${diversionRate}% landfill diversion rate. Your partnership has resulted in significant environmental impact, tax benefits of ${formatCurrency(financialBenefit.taxBenefits)}, and strengthened your corporate sustainability profile.`,
      highlights: [
        { label: 'Total Weight Processed', value: `${formatNumber(totalWeight)} lbs` },
        { label: 'Diversion Rate', value: `${diversionRate}%` },
        { label: 'Carbon Impact', value: `${carbonImpact.total} tons CO₂e` },
        { label: 'Financial Benefit', value: formatCurrency(financialBenefit.total) }
      ]
    };
  }

  /**
   * Process KPI data
   */
  processKPIs(rawData, dateRange) {
    const previousPeriod = this.getPreviousPeriod(dateRange);
    const previousData = this.generateHistoricalData(previousPeriod);

    return {
      cards: [
        {
          label: 'Total Pounds Processed',
          value: formatNumber(rawData.assets.reduce((sum, a) => sum + a.weight, 0)),
          change: this.calculateChange(rawData.assets, previousData.assets, 'weight'),
          changeClass: 'positive'
        },
        {
          label: 'Landfill Diversion Rate',
          value: `${this.calculateDiversionRate(rawData.processing)}%`,
          change: this.calculateRateChange(rawData.processing, previousData.processing),
          changeClass: 'positive'
        },
        {
          label: 'Tax Deduction Value',
          value: formatCurrency(rawData.financial.taxDeductions),
          change: this.calculateChange(rawData.financial, previousData.financial, 'taxDeductions'),
          changeClass: 'positive'
        },
        {
          label: 'CO₂ Tons Avoided',
          value: formatNumber(rawData.environmental.carbonAvoided, 1),
          change: this.calculateChange(rawData.environmental, previousData.environmental, 'carbonAvoided'),
          changeClass: 'positive'
        }
      ],
      trends: this.generateTrendData(rawData, dateRange)
    };
  }

  /**
   * Process Environmental Impact data
   */
  processEnvironmentalImpact(rawData, dateRange) {
    const carbon = rawData.environmental;
    const resources = this.calculateResourceRecovery(rawData.processing);

    return {
      carbonImpact: [
        {
          category: 'CO₂ Avoided (Manufacturing)',
          currentPeriod: `${carbon.manufacturingAvoided} tons`,
          ytdTotal: `${carbon.manufacturingAvoided} tons`
        },
        {
          category: 'CO₂ Avoided (Landfill Methane)',
          currentPeriod: `${carbon.landfillAvoided} tons`,
          ytdTotal: `${carbon.landfillAvoided} tons`
        },
        {
          category: 'Transportation Emissions',
          currentPeriod: `-${carbon.transportEmissions} tons`,
          ytdTotal: `-${carbon.transportEmissions} tons`
        },
        {
          category: 'Net Carbon Impact',
          currentPeriod: `${carbon.carbonAvoided} tons CO₂e`,
          ytdTotal: `${carbon.carbonAvoided} tons CO₂e`,
          highlight: true
        }
      ],
      preciousMetals: resources.preciousMetals,
      criticalMaterials: resources.criticalMaterials,
      monthlyTrends: this.generateMonthlyTrends(rawData, dateRange),
      savingsMetrics: [
        {
          icon: '💧',
          value: '1.2M Gallons',
          description: 'Water saved vs new manufacturing'
        },
        {
          icon: '⚡',
          value: '43,200 kWh',
          description: 'Energy saved through refurbishment'
        },
        {
          icon: '🏭',
          value: '89%',
          description: 'Reduction in manufacturing demand'
        }
      ],
      achievementMilestone: 'Your carbon impact equals removing 3.3 passenger vehicles from the road for one full year!'
    };
  }

  /**
   * Process Asset Tracking data
   */
  processAssetTracking(rawData, dateRange) {
    const assets = rawData.assets;
    const processing = rawData.processing;

    return {
      dataSecurityNotice: `All data-bearing devices processed through NIST 800-88 compliant sanitization. ${assets.length} certificates of data destruction issued.`,
      sampleAssetJourney: this.generateSampleAssetJourney(assets[0]),
      deviceCategories: this.aggregateByDeviceCategory(assets, processing),
      qualityMetrics: [
        {
          name: 'Refurbishment Success Rate',
          value: '94.2%',
          percentage: 94.2
        },
        {
          name: 'Data Destruction Compliance',
          value: '100%',
          percentage: 100
        },
        {
          name: 'Documentation Completeness',
          value: '98.7%',
          percentage: 98.7
        }
      ],
      globalDistribution: this.calculateGlobalDistribution(processing)
    };
  }

  /**
   * Process Financial Impact data
   */
  processFinancialImpact(rawData, dateRange) {
    const financial = rawData.financial;
    const roi = this.calculateROI(financial);

    return {
      financialBreakdown: [
        { category: 'EcoTech Service Fees', amount: formatCurrency(financial.serviceFees) },
        { category: 'Avoided Disposal Costs', amount: formatCurrency(financial.avoidedCosts) },
        { category: 'Revenue Share (Refurb Sales)', amount: formatCurrency(financial.revenueShare) },
        { category: 'Tax Deduction Value', amount: formatCurrency(financial.taxDeductions) },
        { 
          category: 'Net Financial Benefit', 
          amount: formatCurrency(financial.netBenefit),
          highlight: true
        }
      ],
      roi: roi.percentage,
      investment: formatCurrency(financial.serviceFees),
      returnAmount: formatCurrency(financial.netBenefit),
      paybackPeriod: `${roi.paybackMonths} months`,
      quarterlyComparison: this.generateQuarterlyComparison(financial),
      charitableContributions: this.processCharitableContributions(rawData.community),
      carbonCredits: [
        {
          type: 'Verified Carbon Units (VCU)',
          description: `${rawData.environmental.carbonAvoided} tons CO₂e × $12/ton = ${formatCurrency(rawData.environmental.carbonAvoided * 12)} potential revenue`
        },
        {
          type: 'Gold Standard Credits',
          description: 'Eligible under e-waste methodology AMS-III.BB'
        }
      ],
      costAvoidance: [
        { icon: '💰', category: 'Landfill Disposal Fees', amount: formatCurrency(1420) },
        { icon: '🚛', category: 'Transportation Costs', amount: formatCurrency(340) },
        { icon: '📋', category: 'Compliance Penalties', amount: '$0' },
        { icon: '🔒', category: 'Data Breach Risk', amount: 'Eliminated' }
      ],
      totalAvoidedCosts: formatCurrency(1760),
      taxDocumentation: 'All IRS Form 8283 documentation prepared and available for download. Includes fair market value assessments and 501(c)(3) verification for donated items.'
    };
  }

  /**
   * Process CSR Impact data
   */
  processCSRImpact(rawData, dateRange) {
    const community = rawData.community;

    return {
      csrSummary: `${rawData.client.name}'s partnership with RYGNECO has directly impacted ${community.organizations.length} educational institutions and community organizations, reaching over ${formatNumber(community.peopleImpacted)} students and community members. Your digital equity initiatives align with UN Sustainable Development Goals 4, 8, 9, and 12.`,
      communityStories: this.generateCommunityStories(community),
      sdgAlignment: [
        { number: '4', description: 'Quality Education - 3,400 students reached', color: '#e74c3c' },
        { number: '8', description: 'Decent Work - 23 countries reached', color: '#8e44ad' },
        { number: '9', description: 'Industry Innovation - Digital access', color: '#f39c12' },
        { number: '12', description: 'Responsible Consumption - 94% diverted', color: '#27ae60' }
      ],
      esgScores: [
        {
          category: 'Environmental Score',
          points: 12,
          percentage: 85,
          description: 'Waste reduction & carbon impact'
        },
        {
          category: 'Social Score',
          points: 8,
          percentage: 76,
          description: 'Community engagement & education'
        },
        {
          category: 'Governance Score',
          points: 5,
          percentage: 68,
          description: 'Transparency & compliance'
        }
      ],
      grantOpportunities: this.generateGrantOpportunities(),
      awardRecognition: 'Your program qualifies for: EPA Green Chemistry Award, Cincinnati Business Sustainability Award, and Ohio Recycling Award. Applications can be submitted using this report data.'
    };
  }

  /**
   * Calculate diversion rate from processing data
   */
  calculateDiversionRate(processing) {
    const total = processing.length;
    const diverted = processing.filter(p => p.method !== 'landfill').length;
    return Math.round((diverted / total) * 100);
  }

  /**
   * Calculate carbon impact
   */
  calculateCarbonImpact(environmental) {
    return {
      manufacturing: environmental.manufacturingAvoided,
      landfill: environmental.landfillAvoided,
      transport: environmental.transportEmissions,
      total: environmental.carbonAvoided
    };
  }

  /**
   * Calculate financial benefit
   */
  calculateFinancialBenefit(financial) {
    return {
      serviceFees: financial.serviceFees,
      avoidedCosts: financial.avoidedCosts,
      revenueShare: financial.revenueShare,
      taxBenefits: financial.taxDeductions,
      total: financial.netBenefit
    };
  }

  /**
   * Generate sample data (replace with actual data fetching)
   */
  generatePickupData(dateRange) {
    // Simulate pickup data
    return Array.from({ length: 12 }, (_, i) => ({
      id: `pickup-${i + 1}`,
      date: new Date(dateRange.startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
      location: 'Main Office',
      weight: Math.floor(Math.random() * 500) + 200,
      items: Math.floor(Math.random() * 50) + 20
    }));
  }

  generateAssetData(dateRange) {
    // Simulate asset data
    const categories = ['Desktop Computers', 'Laptops', 'Monitors', 'Servers', 'Mobile Devices', 'Peripherals'];
    return Array.from({ length: 847 }, (_, i) => ({
      id: `asset-${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      weight: Math.random() * 20 + 5,
      value: Math.random() * 500 + 50,
      serialNumber: `SN-2025-${String(i + 1).padStart(4, '0')}`,
      pickupDate: new Date(dateRange.startDate.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000)
    }));
  }

  generateProcessingData(dateRange) {
    // Simulate processing data
    const methods = ['refurbished', 'recycled', 'donated', 'recycled', 'refurbished', 'refurbished'];
    const destinations = ['South America', 'Southeast Asia', 'Eastern Europe', 'Africa', 'Local Donations', 'Material Recovery'];
    
    return this.generateAssetData(dateRange).map((asset, i) => ({
      assetId: asset.id,
      method: methods[Math.floor(Math.random() * methods.length)],
      destination: destinations[Math.floor(Math.random() * destinations.length)],
      processedDate: new Date(asset.pickupDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      certificateId: `CERT-2025-${String(i + 1).padStart(4, '0')}`
    }));
  }

  generateFinancialData(dateRange) {
    // Simulate financial data
    const serviceFees = 4250;
    const avoidedCosts = 1420;
    const revenueShare = 2340;
    const taxDeductions = 18450;
    
    return {
      serviceFees,
      avoidedCosts,
      revenueShare,
      taxDeductions,
      netBenefit: avoidedCosts + revenueShare + taxDeductions - serviceFees
    };
  }

  generateEnvironmentalData(dateRange) {
    // Simulate environmental data
    return {
      manufacturingAvoided: 12.4,
      landfillAvoided: 2.8,
      transportEmissions: 0.3,
      carbonAvoided: 15.2,
      waterSaved: 1200000, // gallons
      energySaved: 43200 // kWh
    };
  }

  generateComplianceData() {
    // Simulate compliance data
    return {
      certifications: ['R2:2013', 'e-Stewards', 'ISO 14001:2015', 'NIST 800-88'],
      audits: [
        { regulation: 'EPA RCRA', status: 'Compliant', nextAudit: '2025-08-15' },
        { regulation: 'State E-Waste Laws', status: 'Compliant', nextAudit: '2025-10-01' },
        { regulation: 'DOT Hazmat', status: 'Compliant', nextAudit: '2025-07-20' },
        { regulation: 'Data Protection', status: 'Compliant', nextAudit: '2025-09-15' }
      ]
    };
  }

  generateCommunityData(dateRange) {
    // Simulate community impact data
    return {
      organizations: [
        {
          name: 'Cincinnati Public Schools',
          type: 'Education',
          itemsDonated: 90,
          peopleImpacted: 340,
          value: 8450
        },
        {
          name: 'Boys & Girls Club of Greater Cincinnati',
          type: 'Community',
          itemsDonated: 79,
          peopleImpacted: 180,
          value: 5200
        }
      ],
      totalDonations: 169,
      peopleImpacted: 3400,
      totalValue: 18450
    };
  }

  /**
   * Generate cache key for processed data
   */
  getCacheKey(reportType, options) {
    return `${reportType}-${JSON.stringify(options)}`;
  }

  /**
   * Format date range for display
   */
  formatDateRange(dateRange) {
    const start = formatDate(dateRange.startDate);
    const end = formatDate(dateRange.endDate);
    return `${start} - ${end}`;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Validate data structure
   */
  validateData(data) {
    const errors = [];
    const warnings = [];

    // Check required fields
    if (!data.client) {
      errors.push('Client data is required');
    }

    if (!data.assets || data.assets.length === 0) {
      warnings.push('No asset data found');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Generate community stories
   */
  generateCommunityStories(community) {
    return [
      {
        organization: 'Cincinnati Public Schools - Roosevelt STEM Academy',
        icon: '🏫',
        iconColor: '#3498db',
        summary: '67 refurbished laptops donated | 340 students impacted',
        testimonial: 'The donation of these laptops has transformed our computer lab. Students who previously had limited access to technology now have 1:1 device access during STEM classes. This has improved our coding program participation by 145%.',
        author: 'Maria Santos',
        title: 'STEM Coordinator'
      },
      {
        organization: 'Boys & Girls Club of Greater Cincinnati',
        icon: '🏢',
        iconColor: '#e74c3c',
        summary: '34 desktops + 45 monitors donated | 180 youth impacted',
        testimonial: 'The computer lab upgrade has enabled us to launch our first-ever coding bootcamp for teenagers. We\'ve already seen 3 participants land paid internships with local tech companies.',
        author: 'James Mitchell',
        title: 'Program Director'
      }
    ];
  }

  /**
   * Generate grant opportunities
   */
  generateGrantOpportunities() {
    return [
      {
        source: 'EPA Environmental Justice Grant',
        type: 'Federal',
        eligibility: '✓ Qualified',
        value: 75000,
        status: 'Eligible - Nov 2025'
      },
      {
        source: 'Ohio EPA Waste Reduction Grant',
        type: 'State',
        eligibility: '✓ Qualified',
        value: 25000,
        status: 'Application Ready'
      },
      {
        source: 'Digital Equity Partnership (DEP)',
        type: 'Corporate',
        eligibility: '✓ Qualified',
        value: 150000,
        status: 'Pre-application'
      },
      {
        source: 'Sustainable Electronics Initiative',
        type: 'Foundation',
        eligibility: '✓ Qualified',
        value: 50000,
        status: 'Under Review'
      }
    ];
  }

  /**
   * Generate sample asset journey
   */
  generateSampleAssetJourney(asset) {
    return {
      model: 'Dell OptiPlex 7090',
      serial: asset.serialNumber || 'DL7090-ACM-2025-0234',
      timeline: [
        {
          date: 'Jan 15',
          event: 'Collected',
          location: 'ACME Corp HQ, Building A',
          details: 'GPS: 39.0458° N, 84.5120° W | Condition: Good | Est. Value: $485'
        },
        {
          date: 'Jan 16',
          event: 'Received',
          location: 'RYGNECO Processing Facility',
          details: 'Chain of custody signed by: M. Rodriguez | Weight: 12.3 lbs'
        },
        {
          date: 'Jan 18',
          event: 'Data Sanitization',
          location: 'NIST 800-88 3-pass wipe',
          details: 'Certificate: DS-2025-0234 | Verified by: K. Chen'
        },
        {
          date: 'Jan 22',
          event: 'Refurbishment',
          location: 'Hardware testing & OS installation',
          details: 'Quality Score: 94/100 | Refurb Cost: $67'
        },
        {
          date: 'Feb 03',
          event: 'Sale Completed',
          location: 'Shipped to TechReuse Brazil',
          details: 'Sale Price: $340 | Carbon offset: 0.8 tons CO₂'
        }
      ]
    };
  }

  /**
   * Aggregate assets by device category
   */
  aggregateByDeviceCategory(assets, processing) {
    const categories = {
      'Desktop Computers': { quantity: 234, weight: 1456, refurbRate: 72, avgValue: 285, destination: 'South America (45%)' },
      'Laptops': { quantity: 189, weight: 567, refurbRate: 81, avgValue: 195, destination: 'Southeast Asia (38%)' },
      'Monitors': { quantity: 156, weight: 487, refurbRate: 65, avgValue: 85, destination: 'Eastern Europe (52%)' },
      'Servers': { quantity: 23, weight: 287, refurbRate: 43, avgValue: 750, destination: 'Africa (60%)' },
      'Mobile Devices': { quantity: 187, weight: 34, refurbRate: 89, avgValue: 45, destination: 'Local Donations (67%)' },
      'Peripherals': { quantity: 58, weight: 16, refurbRate: 34, avgValue: 12, destination: 'Material Recovery (78%)' }
    };

    return Object.entries(categories).map(([category, data]) => ({
      category,
      quantity: data.quantity,
      weight: data.weight,
      refurbRate: data.refurbRate,
      avgValue: data.avgValue,
      primaryDestination: data.destination
    }));
  }

  /**
   * Calculate global distribution
   */
  calculateGlobalDistribution(processing) {
    return [
      { flag: '🇧🇷', country: 'Brazil', devices: 287, percentage: 33.9 },
      { flag: '🇵🇭', country: 'Philippines', devices: 156, percentage: 18.4 },
      { flag: '🇵🇱', country: 'Poland', devices: 134, percentage: 15.8 },
      { flag: '🇰🇪', country: 'Kenya', devices: 89, percentage: 10.5 },
      { flag: '🇺🇸', country: 'USA (Donations)', devices: 98, percentage: 11.6 },
      { flag: '🌍', country: 'Other', devices: 83, percentage: 9.8 }
    ];
  }

  /**
   * Process charitable contributions
   */
  processCharitableContributions(community) {
    return {
      organizations: [
        {
          name: 'Cincinnati Public Schools',
          status: 'Verified ✓',
          items: '67 Laptops, 23 Tablets',
          fairMarketValue: 8450,
          taxDeduction: 8450
        },
        {
          name: 'Boys & Girls Club of Greater Cincinnati',
          status: 'Verified ✓',
          items: '34 Desktops, 45 Monitors',
          fairMarketValue: 5200,
          taxDeduction: 5200
        },
        {
          name: 'Northern Kentucky University',
          status: 'Verified ✓',
          items: '12 Servers, 28 Accessories',
          fairMarketValue: 3200,
          taxDeduction: 3200
        },
        {
          name: 'Local Community Centers (4)',
          status: 'Verified ✓',
          items: '87 Mixed Devices',
          fairMarketValue: 1600,
          taxDeduction: 1600
        }
      ],
      total: 18450
    };
  }

  /**
   * Calculate resource recovery
   */
  calculateResourceRecovery(processing) {
    return {
      preciousMetals: [
        { metal: 'Gold', amount: '2.3 oz', value: 4830 },
        { metal: 'Silver', amount: '18.7 oz', value: 486 },
        { metal: 'Palladium', amount: '0.8 oz', value: 1024 },
        { metal: 'Platinum', amount: '0.3 oz', value: 312 }
      ],
      criticalMaterials: [
        { material: 'Lithium', amount: '47 lbs' },
        { material: 'Cobalt', amount: '23 lbs' },
        { material: 'Rare Earth Elements', amount: '12 lbs' },
        { material: 'Copper', amount: '234 lbs' }
      ]
    };
  }

  /**
   * Generate quarterly comparison data
   */
  generateQuarterlyComparison(financial) {
    return [
      { quarter: 'Q2 2024', value: '$8.2K', barHeight: 60 },
      { quarter: 'Q3 2024', value: '$11.5K', barHeight: 80 },
      { quarter: 'Q4 2024', value: '$13.2K', barHeight: 90 },
      { quarter: 'Q1 2025', value: '$18.0K', barHeight: 120 }
    ];
  }

  /**
   * Generate monthly trends
   */
  generateMonthlyTrends(rawData, dateRange) {
    return [
      { month: 'January', weight: 987, barHeight: 120 },
      { month: 'February', weight: 1156, barHeight: 140 },
      { month: 'March', weight: 704, barHeight: 100 }
    ];
  }

  /**
   * Calculate change between periods
   */
  calculateChange(current, previous, field) {
    const currentValue = current.reduce((sum, item) => sum + (item[field] || 0), 0);
    const previousValue = previous.reduce((sum, item) => sum + (item[field] || 0), 0);
    if (previousValue === 0) return '↑ New';
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return `${change > 0 ? '↑' : '↓'} ${Math.abs(change).toFixed(0)}% vs last period`;
  }

  /**
   * Calculate rate change
   */
  calculateRateChange(current, previous) {
    const currentRate = this.calculateDiversionRate(current);
    const previousRate = this.calculateDiversionRate(previous);
    const change = currentRate - previousRate;
    return `${change > 0 ? '↑' : '↓'} ${Math.abs(change)}% vs last period`;
  }

  /**
   * Get previous period
   */
  getPreviousPeriod(dateRange) {
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const diff = end - start;
    
    return {
      startDate: new Date(start.getTime() - diff),
      endDate: new Date(start.getTime() - 1)
    };
  }

  /**
   * Generate historical data
   */
  generateHistoricalData(period) {
    // Simulate historical data for comparison
    return {
      assets: this.generateAssetData(period),
      processing: this.generateProcessingData(period),
      financial: {
        taxDeductions: 14000,
        netBenefit: 13500
      },
      environmental: {
        carbonAvoided: 12.8
      }
    };
  }

  /**
   * Generate trend data
   */
  generateTrendData(rawData, dateRange) {
    // Generate trend data for charts
    return {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Pounds Processed',
        data: [650, 720, 800, 677]
      }]
    };
  }

  /**
   * Calculate ROI
   */
  calculateROI(financial) {
    const investment = financial.serviceFees;
    const returns = financial.netBenefit;
    const roi = ((returns / investment) * 100).toFixed(0);
    const paybackMonths = (investment / (returns / 3)).toFixed(1); // Quarterly report
    
    return {
      percentage: roi,
      paybackMonths
    };
  }

  /**
   * Process compliance data
   */
  processCompliance(rawData) {
    return rawData.compliance;
  }

  /**
   * Process recommendations
   */
  processRecommendations(rawData, dateRange) {
    return {
      optimizations: [
        {
          title: 'Volume Expansion',
          description: 'Target 3,500 lbs processing (+23% growth) through additional pickup locations'
        },
        {
          title: 'Carbon Credits',
          description: 'Register for Gold Standard program - potential $500+ quarterly revenue'
        }
      ],
      immediateActions: [
        'Submit Ohio EPA Waste Reduction Grant application ($25K potential)',
        'Schedule Q2 collection events at 3 additional locations',
        'Implement Gold Standard carbon credit registration',
        'Prepare EPA Environmental Justice Grant pre-application'
      ],
      mediumTermGoals: [
        'Launch employee engagement program for e-waste awareness',
        'Develop white paper on corporate e-waste best practices',
        'Submit sustainability award applications (3 programs)',
        'Expand community partnerships to include 2 additional schools'
      ],
      performanceTargets: [
        { metric: 'Volume Target', target: '3,500 lbs (+23%)', progressPercentage: 81 },
        { metric: 'Diversion Rate', target: '96% (+2%)', progressPercentage: 96 },
        { metric: 'Tax Benefits', target: '$22,000 (+19%)', progressPercentage: 84 },
        { metric: 'Carbon Impact', target: '18.5 tons CO₂e (+22%)', progressPercentage: 86 }
      ]
    };
  }

  /**
   * Generate metadata
   */
  generateMetadata(rawData, dateRange) {
    return {
      generatedDate: new Date(),
      reportName: 'E-Waste Management Report',
      reportSubtitle: 'Sustainability Impact Report',
      quarter: `Q${getQuarter(dateRange.startDate)}`,
      year: dateRange.startDate.getFullYear(),
      dateRange,
      totalPages: 6
    };
  }

  /**
   * Process client data
   */
  processClientData(client) {
    return {
      id: client.id,
      name: client.name,
      industry: client.industry,
      size: client.size,
      location: client.location
    };
  }

  /**
   * Calculate summary metrics
   */
  calculateSummaryMetrics(sections) {
    return {
      totalWeight: 2847,
      diversionRate: 94,
      taxBenefit: 18450,
      carbonAvoided: 15.2,
      devicesProcessed: 847,
      schoolsImpacted: 12,
      countriesReached: 23
    };
  }
} 