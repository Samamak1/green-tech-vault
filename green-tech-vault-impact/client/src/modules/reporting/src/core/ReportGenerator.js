/**
 * Report Generator
 * Main class responsible for orchestrating report generation
 */

import { reportTypes, getReportType } from '../config/reportTypes.js';
import { sections, validateSectionDependencies } from '../config/sections.js';
import { formatDate, formatCurrency, formatNumber } from '../utils/formatters.js';

export class ReportGenerator {
  constructor({ dataProcessor, templateEngine, config }) {
    this.dataProcessor = dataProcessor;
    this.templateEngine = templateEngine;
    this.config = config;
    this.cache = new Map();
  }

  /**
   * Generate a complete report
   * @param {string} type - Report type
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generated report
   */
  async generate(type, options = {}) {
    const startTime = performance.now();
    
    try {
      // Validate report type
      const reportConfig = getReportType(type);
      if (!reportConfig) {
        throw new Error(`Invalid report type: ${type}`);
      }

      // Merge options with defaults
      const mergedOptions = this.mergeOptions(reportConfig, options);
      
      // Validate sections and dependencies
      const sectionValidation = this.validateSections(mergedOptions.sections);
      if (!sectionValidation.isValid) {
        throw new Error(`Section validation failed: ${sectionValidation.errors.join(', ')}`);
      }

      // Process data for the report
      const processedData = await this.dataProcessor.processForReport(type, mergedOptions);
      
      // Generate report content
      const reportContent = await this.generateContent(type, processedData, mergedOptions);
      
      // Calculate metadata
      const metadata = this.generateMetadata(type, mergedOptions, processedData);
      
      const endTime = performance.now();
      
      return {
        html: reportContent,
        metadata: {
          ...metadata,
          generationTime: endTime - startTime,
          generatedAt: new Date().toISOString()
        },
        options: mergedOptions,
        data: this.config.debug.enabled ? processedData : undefined
      };
      
    } catch (error) {
      this.logError('Report generation failed', error);
      throw error;
    }
  }

  /**
   * Generate report preview without full processing
   * @param {string} type - Report type
   * @param {Object} options - Preview options
   * @returns {Object} Preview data
   */
  getPreview(type, options = {}) {
    const reportConfig = getReportType(type);
    if (!reportConfig) {
      throw new Error(`Invalid report type: ${type}`);
    }

    const mergedOptions = this.mergeOptions(reportConfig, options);
    const sectionValidation = this.validateSections(mergedOptions.sections);
    
    return {
      type,
      name: reportConfig.name,
      description: reportConfig.description,
      estimatedPages: this.calculateEstimatedPages(mergedOptions.sections),
      sections: this.getSelectedSections(mergedOptions.sections),
      validation: sectionValidation,
      features: reportConfig.features
    };
  }

  /**
   * Generate report content
   * @param {string} type - Report type
   * @param {Object} data - Processed data
   * @param {Object} options - Generation options
   * @returns {Promise<string>} Generated HTML content
   */
  async generateContent(type, data, options) {
    const reportConfig = getReportType(type);
    const selectedSections = this.getSelectedSections(options.sections);
    
    // Generate header and footer
    const header = await this.generateHeader(data, options);
    const footer = await this.generateFooter(data, options);
    
    // Generate each section
    const sectionContents = await Promise.all(
      selectedSections.map(section => this.generateSection(section, data, options))
    );
    
    // Combine all content
    const templateData = {
      header,
      footer,
      sections: sectionContents,
      metadata: data.metadata,
      config: this.config,
      reportType: type,
      reportConfig
    };
    
    return this.templateEngine.render('report-layout', templateData);
  }

  /**
   * Generate individual section content
   * @param {Object} section - Section configuration
   * @param {Object} data - Report data
   * @param {Object} options - Generation options
   * @returns {Promise<string>} Section HTML content
   */
  async generateSection(section, data, options) {
    const sectionData = data.sections[section.key] || {};
    
    const templateData = {
      section,
      data: sectionData,
      metadata: data.metadata,
      config: this.config,
      formatters: {
        date: formatDate,
        currency: formatCurrency,
        number: formatNumber
      }
    };
    
    return this.templateEngine.render(`section-${section.key}`, templateData);
  }

  /**
   * Generate report header
   * @param {Object} data - Report data
   * @param {Object} options - Generation options
   * @returns {Promise<string>} Header HTML
   */
  async generateHeader(data, options) {
    const templateData = {
      client: data.client,
      reportInfo: data.metadata,
      branding: this.config.branding,
      pageNumber: '{{pageNumber}}',
      totalPages: '{{totalPages}}'
    };
    
    return this.templateEngine.render('header', templateData);
  }

  /**
   * Generate report footer
   * @param {Object} data - Report data
   * @param {Object} options - Generation options
   * @returns {Promise<string>} Footer HTML
   */
  async generateFooter(data, options) {
    const templateData = {
      generatedAt: data.metadata.generatedAt,
      compliance: data.compliance,
      branding: this.config.branding
    };
    
    return this.templateEngine.render('footer', templateData);
  }

  /**
   * Merge options with defaults
   * @param {Object} reportConfig - Report configuration
   * @param {Object} options - User options
   * @returns {Object} Merged options
   */
  mergeOptions(reportConfig, options) {
    const defaultSections = {};
    reportConfig.defaultSections.forEach(section => {
      defaultSections[section] = true;
    });
    
    return {
      sections: { ...defaultSections, ...options.sections },
      format: options.format || 'web',
      customizations: options.customizations || {},
      dateRange: options.dateRange || this.getDefaultDateRange(reportConfig.timeframe),
      filters: options.filters || {}
    };
  }

  /**
   * Validate selected sections
   * @param {Object} selectedSections - Selected sections object
   * @returns {Object} Validation result
   */
  validateSections(selectedSections) {
    const selectedKeys = Object.keys(selectedSections).filter(key => selectedSections[key]);
    const dependencyValidation = validateSectionDependencies(selectedKeys);
    
    const errors = [];
    const warnings = [];
    
    // Check for required sections
    const requiredSections = Object.keys(sections).filter(key => sections[key].required);
    requiredSections.forEach(required => {
      if (!selectedSections[required]) {
        errors.push(`Required section missing: ${sections[required].name}`);
      }
    });
    
    // Add dependency errors
    if (!dependencyValidation.isValid) {
      dependencyValidation.missing.forEach(missing => {
        errors.push(`Section "${missing.section}" requires "${missing.dependencyName}"`);
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings: [...warnings, ...dependencyValidation.warnings]
    };
  }

  /**
   * Get selected sections as array
   * @param {Object} selectedSections - Selected sections object
   * @returns {Array} Array of section configurations
   */
  getSelectedSections(selectedSections) {
    return Object.keys(selectedSections)
      .filter(key => selectedSections[key])
      .map(key => ({ key, ...sections[key] }))
      .sort((a, b) => this.getSectionOrder(a.key) - this.getSectionOrder(b.key));
  }

  /**
   * Get section display order
   * @param {string} sectionKey - Section key
   * @returns {number} Order index
   */
  getSectionOrder(sectionKey) {
    const order = {
      executiveSummary: 1,
      kpis: 2,
      environmentalImpact: 3,
      assetTracking: 4,
      financialImpact: 5,
      csrImpact: 6,
      compliance: 7,
      recommendations: 8,
      dataDestruction: 9,
      processingBreakdown: 10,
      timeline: 11,
      benchmarking: 12
    };
    
    return order[sectionKey] || 999;
  }

  /**
   * Calculate estimated pages for sections
   * @param {Object} selectedSections - Selected sections
   * @returns {number} Estimated pages
   */
  calculateEstimatedPages(selectedSections) {
    return Object.keys(selectedSections)
      .filter(key => selectedSections[key])
      .reduce((total, key) => {
        const section = sections[key];
        return total + (section?.estimatedPages || 0);
      }, 0);
  }

  /**
   * Generate report metadata
   * @param {string} type - Report type
   * @param {Object} options - Generation options
   * @param {Object} data - Processed data
   * @returns {Object} Metadata object
   */
  generateMetadata(type, options, data) {
    const reportConfig = getReportType(type);
    
    return {
      reportType: type,
      reportName: reportConfig.name,
      clientId: this.config.clientId,
      clientName: data.client?.name || this.config.clientName,
      dateRange: options.dateRange,
      sectionsIncluded: Object.keys(options.sections).filter(key => options.sections[key]),
      estimatedPages: this.calculateEstimatedPages(options.sections),
      format: options.format,
      version: '1.0.0',
      generatedBy: 'EcoTech Reporting Module'
    };
  }

  /**
   * Get default date range for timeframe
   * @param {string} timeframe - Report timeframe
   * @returns {Object} Date range object
   */
  getDefaultDateRange(timeframe) {
    const now = new Date();
    let startDate, endDate;
    
    switch (timeframe) {
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'quarterly':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        endDate = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
        break;
      case 'semi-annual':
        const half = now.getMonth() < 6 ? 0 : 1;
        startDate = new Date(now.getFullYear(), half * 6, 1);
        endDate = new Date(now.getFullYear(), (half + 1) * 6, 0);
        break;
      case 'annual':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = now;
    }
    
    return { startDate, endDate };
  }

  /**
   * Update configuration
   * @param {Object} newConfig - New configuration
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Log error with context
   * @param {string} message - Error message
   * @param {Error} error - Error object
   */
  logError(message, error) {
    if (this.config.debug.enabled) {
      console.error(`[ReportGenerator] ${message}:`, error);
    }
  }
} 