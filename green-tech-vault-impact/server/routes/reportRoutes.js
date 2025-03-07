const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/reports
 * @desc    Get all reports
 * @access  Private
 */
router.get('/', (req, res) => {
  // Mock data for reports
  const reports = [
    {
      _id: '1',
      title: 'Q1 2025 Environmental Impact Report',
      type: 'quarterly',
      period: {
        start: '2025-01-01',
        end: '2025-03-31'
      },
      status: 'published',
      metrics: {
        totalDevices: 45,
        totalWeight: 156.8,
        co2Saved: 470.4,
        treesPlanted: 24
      },
      createdAt: '2025-04-01T10:00:00Z',
      updatedAt: '2025-04-05T14:30:00Z',
      publishedAt: '2025-04-05T14:30:00Z'
    },
    {
      _id: '2',
      title: 'Annual Environmental Impact 2024',
      type: 'annual',
      period: {
        start: '2024-01-01',
        end: '2024-12-31'
      },
      status: 'published',
      metrics: {
        totalDevices: 180,
        totalWeight: 625.2,
        co2Saved: 1875.6,
        treesPlanted: 94
      },
      createdAt: '2025-01-15T09:00:00Z',
      updatedAt: '2025-01-20T11:45:00Z',
      publishedAt: '2025-01-20T11:45:00Z'
    },
    {
      _id: '3',
      title: 'Q2 2025 Environmental Impact Report',
      type: 'quarterly',
      period: {
        start: '2025-04-01',
        end: '2025-06-30'
      },
      status: 'draft',
      metrics: {
        totalDevices: 0,
        totalWeight: 0,
        co2Saved: 0,
        treesPlanted: 0
      },
      createdAt: '2025-04-15T13:20:00Z',
      updatedAt: '2025-04-15T13:20:00Z'
    }
  ];

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = reports.length;

  res.json({
    success: true,
    count: reports.length,
    total,
    data: reports.slice(startIndex, endIndex)
  });
});

/**
 * @route   POST /api/reports
 * @desc    Create a new report
 * @access  Private
 */
router.post('/', (req, res) => {
  // Mock creating a new report
  const newReport = {
    _id: Date.now().toString(),
    ...req.body,
    status: 'draft',
    metrics: {
      totalDevices: 0,
      totalWeight: 0,
      co2Saved: 0,
      treesPlanted: 0
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    data: newReport
  });
});

/**
 * @route   GET /api/reports/:id
 * @desc    Get report by ID
 * @access  Private
 */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  // Mock data for a single report
  const report = {
    _id: id,
    title: 'Q1 2025 Environmental Impact Report',
    type: 'quarterly',
    period: {
      start: '2025-01-01',
      end: '2025-03-31'
    },
    status: 'published',
    metrics: {
      totalDevices: 45,
      totalWeight: 156.8,
      co2Saved: 470.4,
      treesPlanted: 24,
      waterSaved: 12500,
      energySaved: 18750
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
    materialRecovery: {
      metals: 78.4,
      plastics: 47.0,
      glass: 15.7,
      other: 15.7
    },
    createdAt: '2025-04-01T10:00:00Z',
    updatedAt: '2025-04-05T14:30:00Z',
    publishedAt: '2025-04-05T14:30:00Z'
  };

  res.json({
    success: true,
    data: report
  });
});

/**
 * @route   PUT /api/reports/:id
 * @desc    Update a report
 * @access  Private
 */
router.put('/:id', (req, res) => {
  const id = req.params.id;
  
  // Mock updating a report
  const updatedReport = {
    _id: id,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: updatedReport
  });
});

/**
 * @route   DELETE /api/reports/:id
 * @desc    Delete a report
 * @access  Private
 */
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    data: {}
  });
});

/**
 * @route   POST /api/reports/generate
 * @desc    Generate a new report
 * @access  Private
 */
router.post('/generate', (req, res) => {
  // Mock generating a report
  const generatedReport = {
    _id: Date.now().toString(),
    title: req.body.title || `Report ${new Date().toISOString().split('T')[0]}`,
    type: req.body.type || 'custom',
    period: req.body.period || {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    status: 'draft',
    metrics: {
      totalDevices: 32,
      totalWeight: 112.5,
      co2Saved: 337.5,
      treesPlanted: 17
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    data: generatedReport
  });
});

/**
 * @route   PUT /api/reports/:id/publish
 * @desc    Publish a report
 * @access  Private
 */
router.put('/:id/publish', (req, res) => {
  const id = req.params.id;
  
  // Mock publishing a report
  const publishedReport = {
    _id: id,
    status: 'published',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: publishedReport
  });
});

/**
 * @route   GET /api/reports/:id/pdf
 * @desc    Get report PDF
 * @access  Private
 */
router.get('/:id/pdf', (req, res) => {
  // In a real implementation, this would generate and return a PDF
  res.json({
    success: true,
    message: 'PDF generation is not implemented in this mock API'
  });
});

/**
 * @route   GET /api/reports/:id/csv
 * @desc    Get report CSV
 * @access  Private
 */
router.get('/:id/csv', (req, res) => {
  // In a real implementation, this would generate and return a CSV
  res.json({
    success: true,
    message: 'CSV generation is not implemented in this mock API'
  });
});

module.exports = router; 