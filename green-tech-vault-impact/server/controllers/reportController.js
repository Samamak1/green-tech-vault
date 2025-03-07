const Report = require('../models/Report');
const Company = require('../models/Company');
const Pickup = require('../models/Pickup');

/**
 * @desc    Get all reports
 * @route   GET /api/reports
 * @access  Private
 */
exports.getReports = async (req, res) => {
  try {
    // Filter by company if provided
    const filter = {};
    if (req.query.company) {
      filter.company = req.query.company;
    }
    
    const reports = await Report.find(filter)
      .populate('company', 'name contactPerson')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Get single report
 * @route   GET /api/reports/:id
 * @access  Private
 */
exports.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('company', 'name contactPerson email')
      .populate('pickups');
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Create new report
 * @route   POST /api/reports
 * @access  Private
 */
exports.createReport = async (req, res) => {
  try {
    // Check if company exists
    const company = await Company.findById(req.body.company);
    if (!company) {
      return res.status(404).json({
        success: false,
        error: 'Company not found'
      });
    }
    
    // Create report
    const report = await Report.create(req.body);
    
    // Generate report data if pickups are provided
    if (req.body.pickups && req.body.pickups.length > 0) {
      await report.generateFromPickups();
    }
    
    res.status(201).json({
      success: true,
      data: report
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
 * @desc    Update report
 * @route   PUT /api/reports/:id
 * @access  Private
 */
exports.updateReport = async (req, res) => {
  try {
    let report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }
    
    // Update report
    report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    // Regenerate report data if pickups are provided
    if (req.body.pickups) {
      await report.generateFromPickups();
    }
    
    res.status(200).json({
      success: true,
      data: report
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
 * @desc    Delete report
 * @route   DELETE /api/reports/:id
 * @access  Private
 */
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }
    
    await report.remove();
    
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
 * @desc    Generate report for a company
 * @route   POST /api/reports/generate
 * @access  Private
 */
exports.generateReport = async (req, res) => {
  try {
    const { company, type, startDate, endDate, title } = req.body;
    
    // Check if company exists
    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return res.status(404).json({
        success: false,
        error: 'Company not found'
      });
    }
    
    // Find pickups within date range
    const pickups = await Pickup.find({
      company,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      },
      status: 'Completed'
    });
    
    if (pickups.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No completed pickups found in the specified date range'
      });
    }
    
    // Create report
    const report = await Report.create({
      company,
      type,
      title: title || `${type} Report - ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}`,
      dateRange: {
        startDate,
        endDate
      },
      pickups: pickups.map(pickup => pickup._id),
      status: 'Draft'
    });
    
    // Generate report data
    await report.generateFromPickups();
    
    res.status(201).json({
      success: true,
      data: report
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
 * @desc    Publish report
 * @route   PUT /api/reports/:id/publish
 * @access  Private
 */
exports.publishReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }
    
    // Update status to Published
    report.status = 'Published';
    await report.save();
    
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 