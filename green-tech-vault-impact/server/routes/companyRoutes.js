const express = require('express');
const router = express.Router();

// Mock company data
const companies = [
  {
    id: '1',
    name: "Leila's Company",
    contactPerson: 'Leila Meyer',
    email: 'leilaameyer2@gmail.com',
    phone: '(555) 123-4567',
    address: '123 Green St, Cincinnati OH, 51729',
    website: 'www.leilascompany.com',
    industry: 'Technology',
    employees: '42',
    username: '@lmeyer'
  }
];

/**
 * @route   GET /api/companies
 * @desc    Get all companies
 * @access  Private/Admin
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: companies
  });
});

/**
 * @route   GET /api/companies/me
 * @desc    Get current user's company
 * @access  Private
 */
router.get('/me', (req, res) => {
  // Mock data for the current user's company
  const company = {
    _id: '1',
    name: 'Tech Solutions Inc.',
    contactPerson: 'John Smith',
    email: 'john@techsolutions.com',
    phone: '(555) 123-4567',
    address: '123 Tech Blvd, San Francisco, CA',
    logo: null,
    website: 'https://techsolutions.com',
    industry: 'Technology',
    employeeCount: 250,
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-03-01T14:30:00Z'
  };

  res.json({
    success: true,
    data: company
  });
});

/**
 * @route   PUT /api/companies/me
 * @desc    Update current user's company
 * @access  Private
 */
router.put('/me', (req, res) => {
  // Mock updating the current user's company
  const updatedCompany = {
    _id: '1',
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: updatedCompany
  });
});

/**
 * @route   GET /api/companies/me/impact
 * @desc    Get current user's company environmental impact
 * @access  Private
 */
router.get('/me/impact', (req, res) => {
  // Mock data for the current user's company environmental impact
  const impact = {
    totalDevices: 45,
    totalWeight: 156.8,
    co2Saved: 470.4,
    treesPlanted: 24,
    waterSaved: 12500,
    energySaved: 18750,
    landfillDiverted: 156.8,
    materialsRecovered: {
      metals: 78.4,
      plastics: 47.0,
      glass: 15.7,
      other: 15.7
    },
    deviceBreakdown: {
      laptops: 18,
      desktops: 12,
      monitors: 8,
      printers: 4,
      phones: 3
    },
    dispositionBreakdown: {
      refurbished: 28,
      recycled: 17
    },
    monthlyTrend: [
      { month: 'Jan', devices: 12, weight: 42.5 },
      { month: 'Feb', devices: 15, weight: 53.2 },
      { month: 'Mar', devices: 18, weight: 61.1 }
    ]
  };

  res.json({
    success: true,
    data: impact
  });
});

/**
 * @route   GET /api/companies/:id
 * @desc    Get company by ID
 * @access  Private/Admin
 */
router.get('/:id', (req, res) => {
  const company = companies.find(c => c.id === req.params.id);
  
  if (!company) {
    return res.status(404).json({
      success: false,
      error: 'Company not found'
    });
  }
  
  res.json({
    success: true,
    data: company
  });
});

/**
 * @route   PUT /api/companies/:id
 * @desc    Update company
 * @access  Private/Admin
 */
router.put('/:id', (req, res) => {
  const company = companies.find(c => c.id === req.params.id);
  
  if (!company) {
    return res.status(404).json({
      success: false,
      error: 'Company not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      ...company,
      ...req.body
    }
  });
});

/**
 * @route   DELETE /api/companies/:id
 * @desc    Delete company
 * @access  Private/Admin
 */
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Company deleted successfully'
  });
});

/**
 * @route   GET /api/companies/:id/impact
 * @desc    Get company environmental impact
 * @access  Private/Admin
 */
router.get('/:id/impact', (req, res) => {
  // Mock data for a company's environmental impact
  const impact = {
    totalDevices: 45,
    totalWeight: 156.8,
    co2Saved: 470.4,
    treesPlanted: 24,
    waterSaved: 12500,
    energySaved: 18750,
    landfillDiverted: 156.8,
    materialsRecovered: {
      metals: 78.4,
      plastics: 47.0,
      glass: 15.7,
      other: 15.7
    },
    deviceBreakdown: {
      laptops: 18,
      desktops: 12,
      monitors: 8,
      printers: 4,
      phones: 3
    },
    dispositionBreakdown: {
      refurbished: 28,
      recycled: 17
    },
    monthlyTrend: [
      { month: 'Jan', devices: 12, weight: 42.5 },
      { month: 'Feb', devices: 15, weight: 53.2 },
      { month: 'Mar', devices: 18, weight: 61.1 }
    ]
  };

  res.json({
    success: true,
    data: impact
  });
});

/**
 * @route   PUT /api/companies/:id/impact
 * @desc    Update company environmental impact
 * @access  Private/Admin
 */
router.put('/:id/impact', (req, res) => {
  const id = req.params.id;
  
  // Mock updating a company's environmental impact
  const updatedImpact = {
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: updatedImpact
  });
});

module.exports = router; 