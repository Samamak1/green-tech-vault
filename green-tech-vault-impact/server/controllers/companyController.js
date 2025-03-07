const Company = require('../models/Company');
const Pickup = require('../models/Pickup');
const Device = require('../models/Device');

/**
 * @desc    Get all companies
 * @route   GET /api/companies
 * @access  Private
 */
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    
    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Get single company
 * @route   GET /api/companies/:id
 * @access  Private
 */
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        error: 'Company not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Create new company
 * @route   POST /api/companies
 * @access  Private
 */
exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    
    res.status(201).json({
      success: true,
      data: company
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

/**
 * @desc    Update company
 * @route   PUT /api/companies/:id
 * @access  Private
 */
exports.updateCompany = async (req, res) => {
  try {
    let company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        error: 'Company not found'
      });
    }
    
    company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

/**
 * @desc    Delete company
 * @route   DELETE /api/companies/:id
 * @access  Private
 */
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        error: 'Company not found'
      });
    }
    
    // Check if company has pickups
    const pickups = await Pickup.find({ company: req.params.id });
    if (pickups.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete company with existing pickups'
      });
    }
    
    await company.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Get company environmental impact summary
 * @route   GET /api/companies/:id/impact
 * @access  Private
 */
exports.getCompanyImpact = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        error: 'Company not found'
      });
    }
    
    // Get all pickups for this company
    const pickups = await Pickup.find({ company: req.params.id });
    
    // Get all devices for this company
    const devices = await Device.find({ company: req.params.id });
    
    // Calculate environmental equivalents
    // Average tree absorbs ~22kg CO2 per year
    const treesEquivalent = Math.round(company.impactSummary.totalCO2Saved / 22);
    
    // Average car emits ~4.6 metric tons of CO2 per year
    const carsEquivalent = Math.round((company.impactSummary.totalCO2Saved / 4600) * 100) / 100;
    
    // Calculate landfill diversion rate
    const landfillDiversionRate = company.impactSummary.totalWeightCollected > 0 ? 
      (company.impactSummary.totalLandfillDiverted / company.impactSummary.totalWeightCollected) * 100 : 0;
    
    res.status(200).json({
      success: true,
      data: {
        company: company.name,
        pickupCount: pickups.length,
        deviceCount: devices.length,
        impactSummary: company.impactSummary,
        environmentalEquivalents: {
          trees: treesEquivalent,
          cars: carsEquivalent
        },
        landfillDiversionRate: landfillDiversionRate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Update company impact summary
 * @route   PUT /api/companies/:id/impact
 * @access  Private
 */
exports.updateCompanyImpact = async (req, res) => {
  try {
    let company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        error: 'Company not found'
      });
    }
    
    // Get all pickups for this company
    const pickups = await Pickup.find({ company: req.params.id });
    
    // Reset impact summary
    company.impactSummary = {
      totalDevicesCollected: 0,
      totalWeightCollected: 0,
      totalCO2Saved: 0,
      totalLandfillDiverted: 0,
      totalRefurbished: 0,
      totalRecycled: 0,
      materialsRecovered: {
        metals: 0,
        plastics: 0,
        glass: 0,
        rareEarthMetals: 0
      }
    };
    
    // Aggregate data from all pickups
    for (const pickup of pickups) {
      company.impactSummary.totalDevicesCollected += pickup.deviceCount;
      company.impactSummary.totalWeightCollected += pickup.totalWeight;
      company.impactSummary.totalCO2Saved += pickup.impactSummary.co2Saved;
      company.impactSummary.totalLandfillDiverted += pickup.impactSummary.landfillDiverted;
      company.impactSummary.totalRefurbished += pickup.impactSummary.refurbishedCount;
      company.impactSummary.totalRecycled += pickup.impactSummary.recycledCount;
      
      // Add materials recovered
      company.impactSummary.materialsRecovered.metals += pickup.impactSummary.materialsRecovered.metals;
      company.impactSummary.materialsRecovered.plastics += pickup.impactSummary.materialsRecovered.plastics;
      company.impactSummary.materialsRecovered.glass += pickup.impactSummary.materialsRecovered.glass;
      company.impactSummary.materialsRecovered.rareEarthMetals += pickup.impactSummary.materialsRecovered.rareEarthMetals;
    }
    
    await company.save();
    
    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 