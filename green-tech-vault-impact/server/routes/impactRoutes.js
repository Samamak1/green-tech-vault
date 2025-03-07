const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/impact/summary
 * @desc    Get impact summary
 * @access  Private
 */
router.get('/summary', (req, res) => {
  // Mock data for impact summary
  const summary = {
    totalDevicesCollected: 156,
    totalWeightCollected: 1250.5,
    totalCO2Saved: 3750.8,
    totalRefurbished: 87,
    totalRecycled: 69,
    landfillDiversionRate: 92.5,
    materialsRecovered: {
      metals: 625.25,
      plastics: 375.15,
      glass: 125.05,
      rareEarthMetals: 62.53,
      other: 62.52
    },
    environmentalEquivalents: {
      treesSaved: 187,
      carEmissions: 15000,
      homeEnergy: 9500,
      waterSaved: 25000
    }
  };

  res.json({ 
    success: true, 
    data: summary
  });
});

/**
 * @route   GET /api/impact/trends
 * @desc    Get impact trends
 * @access  Private
 */
router.get('/trends', (req, res) => {
  // Mock data for impact trends
  const trends = {
    monthly: [
      { period: '2025-01', devices: 45, weight: 156.8, co2Saved: 470.4 },
      { period: '2025-02', devices: 52, weight: 182.3, co2Saved: 546.9 },
      { period: '2025-03', devices: 59, weight: 207.5, co2Saved: 622.5 }
    ],
    quarterly: [
      { period: 'Q1 2025', devices: 156, weight: 546.6, co2Saved: 1639.8 },
      { period: 'Q4 2024', devices: 142, weight: 497.0, co2Saved: 1491.0 },
      { period: 'Q3 2024', devices: 128, weight: 448.0, co2Saved: 1344.0 }
    ],
    yearly: [
      { period: '2025', devices: 156, weight: 546.6, co2Saved: 1639.8 },
      { period: '2024', devices: 512, weight: 1792.0, co2Saved: 5376.0 },
      { period: '2023', devices: 423, weight: 1480.5, co2Saved: 4441.5 }
    ]
  };

  res.json({ 
    success: true, 
    data: trends
  });
});

/**
 * @route   GET /api/impact/by-device-type
 * @desc    Get impact by device type
 * @access  Private
 */
router.get('/by-device-type', (req, res) => {
  // Mock data for impact by device type
  const byDeviceType = {
    laptops: {
      count: 62,
      weight: 74.4,
      co2Saved: 223.2,
      refurbished: 45,
      recycled: 17
    },
    desktops: {
      count: 35,
      weight: 350.0,
      co2Saved: 1050.0,
      refurbished: 12,
      recycled: 23
    },
    monitors: {
      count: 28,
      weight: 168.0,
      co2Saved: 504.0,
      refurbished: 18,
      recycled: 10
    },
    printers: {
      count: 15,
      weight: 225.0,
      co2Saved: 675.0,
      refurbished: 3,
      recycled: 12
    },
    phones: {
      count: 16,
      weight: 3.2,
      co2Saved: 9.6,
      refurbished: 9,
      recycled: 7
    }
  };

  res.json({ 
    success: true, 
    data: byDeviceType
  });
});

/**
 * @route   GET /api/impact/by-disposition
 * @desc    Get impact by disposition
 * @access  Private
 */
router.get('/by-disposition', (req, res) => {
  // Mock data for impact by disposition
  const byDisposition = {
    refurbished: {
      count: 87,
      weight: 437.5,
      co2Saved: 1312.5,
      deviceTypes: {
        laptops: 45,
        desktops: 12,
        monitors: 18,
        printers: 3,
        phones: 9
      }
    },
    recycled: {
      count: 69,
      weight: 813.0,
      co2Saved: 2439.0,
      deviceTypes: {
        laptops: 17,
        desktops: 23,
        monitors: 10,
        printers: 12,
        phones: 7
      },
      materialsRecovered: {
        metals: 406.5,
        plastics: 243.9,
        glass: 81.3,
        other: 81.3
      }
    }
  };

  res.json({ 
    success: true, 
    data: byDisposition
  });
});

/**
 * @route   GET /api/impact/certificates
 * @desc    Get impact certificates
 * @access  Private
 */
router.get('/certificates', (req, res) => {
  // Mock data for impact certificates
  const certificates = [
    {
      _id: '1',
      title: 'Q1 2025 Environmental Impact Certificate',
      issuedDate: '2025-04-01T10:00:00Z',
      metrics: {
        devices: 156,
        weight: 546.6,
        co2Saved: 1639.8,
        treesPlanted: 82
      },
      downloadUrl: '/api/impact/certificates/1/download',
      thumbnailUrl: '/api/impact/certificates/1/thumbnail'
    },
    {
      _id: '2',
      title: 'Annual 2024 Environmental Impact Certificate',
      issuedDate: '2025-01-15T09:00:00Z',
      metrics: {
        devices: 512,
        weight: 1792.0,
        co2Saved: 5376.0,
        treesPlanted: 269
      },
      downloadUrl: '/api/impact/certificates/2/download',
      thumbnailUrl: '/api/impact/certificates/2/thumbnail'
    }
  ];

  res.json({ 
    success: true, 
    data: certificates
  });
});

/**
 * @route   GET /api/impact/certificates/:id/download
 * @desc    Download impact certificate
 * @access  Private
 */
router.get('/certificates/:id/download', (req, res) => {
  // In a real implementation, this would generate and return a PDF certificate
  res.json({
    success: true,
    message: 'Certificate download is not implemented in this mock API'
  });
});

/**
 * @route   GET /api/impact/certificates/:id/thumbnail
 * @desc    Get impact certificate thumbnail
 * @access  Private
 */
router.get('/certificates/:id/thumbnail', (req, res) => {
  // In a real implementation, this would return a thumbnail image
  res.json({
    success: true,
    message: 'Certificate thumbnail is not implemented in this mock API'
  });
});

module.exports = router; 