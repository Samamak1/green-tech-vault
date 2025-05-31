/**
 * E-Waste Reporting Module
 * Main entry point for the reporting system
 */

import { ReportGenerator } from './core/ReportGenerator.js';
import { DataProcessor } from './core/DataProcessor.js';
import { TemplateEngine } from './core/TemplateEngine.js';
import { ReportCustomizer } from './components/ReportCustomizer.js';
import { ReportViewer } from './components/ReportViewer.js';
import { ExportManager } from './components/ExportManager.js';
import { reportTypes } from './config/reportTypes.js';
import { sections } from './config/sections.js';
import defaultConfig from './config/defaults.js';

/**
 * Main ReportingModule class for dashboard integration
 */
export class ReportingModule {
  constructor(config = {}) {
    this.config = {
      clientId: config.clientId || 'default',
      clientName: config.clientName || 'Demo Client',
      branding: config.branding || { companyName: 'RYGNECO', logo: '🌱' },
      ...config
    };
    
    // Initialize core components
    this.dataProcessor = new DataProcessor(this.config);
    this.templateEngine = new TemplateEngine(this.config);
    this.reportGenerator = new ReportGenerator(this.config, this.dataProcessor, this.templateEngine);
    
    // Initialize UI components
    this.customizer = new ReportCustomizer(this.config);
    this.viewer = new ReportViewer(this.config);
    this.exportManager = new ExportManager(this.config);
    
    // Bind methods to maintain context
    this.generateReport = this.generateReport.bind(this);
    this.renderCustomizer = this.renderCustomizer.bind(this);
    this.exportToPDF = this.exportToPDF.bind(this);
  }

  /**
   * Generate a report
   * @param {string} reportType - Type of report to generate
   * @param {Object} options - Report generation options
   * @returns {Promise<Object>} Generated report
   */
  async generateReport(reportType, options = {}) {
    try {
      const report = await this.reportGenerator.generate(reportType, options);
      return report;
    } catch (error) {
      console.error('Report generation failed:', error);
      throw error;
    }
  }

  /**
   * Render report customizer interface
   * @param {string} containerId - DOM element ID to render into
   * @param {Object} callbacks - Event callbacks
   */
  renderCustomizer(containerId, callbacks = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container element not found: ${containerId}`);
    }

    // Create customizer HTML
    container.innerHTML = `
      <div class="report-customizer">
        <h3>Customize Your Report</h3>
        
        <div class="customizer-section">
          <h4>Report Type</h4>
          <select id="report-type" class="form-control">
            <option value="pickup">Per Pickup Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="quarterly" selected>Quarterly Report</option>
            <option value="semi-annual">Semi-Annual Report</option>
            <option value="annual">Annual Report</option>
          </select>
        </div>
        
        <div class="customizer-section">
          <h4>Select Sections</h4>
          <div class="section-selector">
            <div class="section-option selected">
              <label>
                <input type="checkbox" name="sections" value="executiveSummary" checked>
                Executive Summary
              </label>
            </div>
            <div class="section-option selected">
              <label>
                <input type="checkbox" name="sections" value="kpis" checked>
                Key Performance Indicators
              </label>
            </div>
            <div class="section-option selected">
              <label>
                <input type="checkbox" name="sections" value="environmentalImpact" checked>
                Environmental Impact
              </label>
            </div>
            <div class="section-option">
              <label>
                <input type="checkbox" name="sections" value="assetTracking">
                Asset Tracking
              </label>
            </div>
            <div class="section-option">
              <label>
                <input type="checkbox" name="sections" value="financialImpact">
                Financial Impact
              </label>
            </div>
            <div class="section-option">
              <label>
                <input type="checkbox" name="sections" value="csrImpact">
                CSR Impact
              </label>
            </div>
            <div class="section-option">
              <label>
                <input type="checkbox" name="sections" value="compliance">
                Compliance Status
              </label>
            </div>
            <div class="section-option">
              <label>
                <input type="checkbox" name="sections" value="recommendations">
                Recommendations
              </label>
            </div>
          </div>
        </div>
        
        <div class="customizer-section">
          <h4>Date Range</h4>
          <div class="date-range-picker">
            <input type="date" id="start-date" class="date-input">
            <span>to</span>
            <input type="date" id="end-date" class="date-input">
          </div>
        </div>
        
        <div class="export-options">
          <button id="generate-btn" class="export-button primary">Generate Report</button>
          <button id="preview-btn" class="export-button secondary">Preview</button>
        </div>
      </div>
    `;

    // Add event listeners
    this.attachCustomizerEvents(container, callbacks);
  }

  /**
   * Attach event listeners to customizer
   */
  attachCustomizerEvents(container, callbacks) {
    // Section checkboxes
    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const option = e.target.closest('.section-option');
        if (e.target.checked) {
          option.classList.add('selected');
        } else {
          option.classList.remove('selected');
        }
      });
    });

    // Generate button
    const generateBtn = container.querySelector('#generate-btn');
    if (generateBtn && callbacks.onGenerate) {
      generateBtn.addEventListener('click', async () => {
        const reportType = container.querySelector('#report-type').value;
        const sections = {};
        
        container.querySelectorAll('input[name="sections"]').forEach(checkbox => {
          sections[checkbox.value] = checkbox.checked;
        });

        const startDate = container.querySelector('#start-date').value;
        const endDate = container.querySelector('#end-date').value;

        const options = {
          sections,
          dateRange: {
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null
          }
        };

        try {
          generateBtn.disabled = true;
          generateBtn.innerHTML = '<span class="loading-spinner"></span> Generating...';
          
          const report = await this.generateReport(reportType, options);
          callbacks.onGenerate(report);
        } catch (error) {
          console.error('Report generation failed:', error);
          if (callbacks.onError) {
            callbacks.onError(error);
          }
        } finally {
          generateBtn.disabled = false;
          generateBtn.innerHTML = 'Generate Report';
        }
      });
    }

    // Preview button
    const previewBtn = container.querySelector('#preview-btn');
    if (previewBtn && callbacks.onPreview) {
      previewBtn.addEventListener('click', () => {
        callbacks.onPreview();
      });
    }
  }

  /**
   * Render a report in the viewer component
   * @param {string} containerId - DOM element ID to render in
   * @param {Object} reportData - Report data to display
   */
  renderReport(containerId, reportData) {
    return this.viewer.render(containerId, reportData);
  }

  /**
   * Export report to PDF
   * @param {string} reportHtml - HTML content to export
   * @param {string} filename - Output filename
   */
  async exportToPDF(reportHtml, filename = 'report.pdf') {
    // This would use a library like jspdf or puppeteer
    // For now, we'll use the browser's print functionality
    const printWindow = window.open('', '_blank');
    printWindow.document.write(reportHtml);
    printWindow.document.close();
    printWindow.print();
  }

  /**
   * Export report to various formats
   * @param {Object} reportData - Report data
   * @param {string} format - Export format (pdf, html, json)
   * @param {string} filename - Output filename
   */
  async exportReport(reportData, format = 'pdf', filename = 'report') {
    return this.exportManager.export(reportData, format, filename);
  }

  /**
   * Get available report sections
   * @returns {Array} Available sections
   */
  getAvailableSections() {
    return sections;
  }

  /**
   * Get available report types
   * @returns {Array} Available report types
   */
  getReportTypes() {
    return reportTypes;
  }

  /**
   * Update configuration
   * @param {Object} newConfig - New configuration values
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    
    // Update component configurations
    this.dataProcessor.updateConfig(this.config);
    this.templateEngine.updateConfig(this.config);
    this.reportGenerator.updateConfig(this.config);
    this.customizer.updateConfig(this.config);
    this.viewer.updateConfig(this.config);
    this.exportManager.updateConfig(this.config);
  }

  /**
   * Validate client data structure
   * @param {Object} clientData - Client data to validate
   * @returns {Object} Validation result
   */
  validateClientData(clientData) {
    return this.dataProcessor.validateData(clientData);
  }

  /**
   * Get report preview without full generation
   * @param {string} type - Report type
   * @param {Object} options - Preview options
   * @returns {Object} Preview data
   */
  getReportPreview(type, options = {}) {
    return this.reportGenerator.getPreview(type, options);
  }

  /**
   * Destroy the module and clean up resources
   */
  destroy() {
    this.customizer.destroy();
    this.viewer.destroy();
    this.exportManager.destroy();
  }
}

// Export individual components for advanced usage
export {
  ReportGenerator,
  DataProcessor,
  TemplateEngine,
  ReportCustomizer,
  ReportViewer,
  ExportManager,
  reportTypes,
  sections,
  defaultConfig
};

// Export utility functions
export * from './utils/dateUtils.js';
export * from './utils/formatters.js';
export * from './utils/validators.js';

// Export for ES6 modules (React)
export { ReportingModule };

// Export for CommonJS (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ReportingModule };
} 