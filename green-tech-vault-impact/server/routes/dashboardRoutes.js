const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/dashboard/summary
 * @desc    Get dashboard summary data
 * @access  Private
 */
router.get('/summary', (req, res) => {
  res.json({
    success: true,
    data: {
      totalDevices: 156,
      totalWeight: 1250.5,
      co2Saved: 3750.8,
      pickupsCompleted: 12,
      refurbishedDevices: 87,
      recycledDevices: 69,
      // Additional properties that might be needed
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
        homeEnergy: 9500
      }
    }
  });
});

/**
 * @route   GET /api/dashboard/chart
 * @desc    Get chart data for dashboard
 * @access  Private
 */
router.get('/chart', (req, res) => {
  const { metric, period } = req.query;
  
  let labels = [];
  let values = [];
  
  // Generate sample data based on metric and period
  if (metric === 'ewaste') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    values = [120, 150, 180, 110, 160, 140, 170, 190, 210, 230, 250, 270];
  } else if (metric === 'co2') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    values = [350, 420, 510, 320, 480, 390, 510, 570, 630, 690, 750, 810];
  } else if (metric === 'deviceTypes') {
    labels = ['Laptops', 'Desktops', 'Monitors', 'Phones', 'Tablets', 'Printers', 'Other'];
    values = [45, 25, 30, 20, 15, 10, 5];
  } else if (metric === 'disposition') {
    labels = ['Refurbished', 'Recycled', 'Pending'];
    values = [55, 35, 10];
  }
  
  res.json({
    success: true,
    data: {
      labels,
      values
    }
  });
});

/**
 * @route   GET /api/dashboard/recent-pickups
 * @desc    Get recent pickups for dashboard
 * @access  Private
 */
router.get('/recent-pickups', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        date: '2025-03-01',
        location: 'Corporate HQ',
        status: 'completed',
        devices: 12,
        weight: 45.2
      },
      {
        id: '2',
        date: '2025-03-05',
        location: 'Branch Office',
        status: 'completed',
        devices: 8,
        weight: 32.7
      },
      {
        id: '3',
        date: '2025-03-10',
        location: 'Data Center',
        status: 'completed',
        devices: 15,
        weight: 78.3
      },
      {
        id: '4',
        date: '2025-03-15',
        location: 'Remote Office',
        status: 'in-progress',
        devices: 5,
        weight: 18.5
      },
      {
        id: '5',
        date: '2025-03-20',
        location: 'Warehouse',
        status: 'scheduled',
        devices: 0,
        weight: 0
      }
    ]
  });
});

/**
 * @route   GET /api/dashboard/recent-devices
 * @desc    Get recent devices for dashboard
 * @access  Private
 */
router.get('/recent-devices', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        type: 'Laptop',
        manufacturer: 'Dell',
        model: 'XPS 13',
        status: 'Refurbished',
        date: '2025-03-01'
      },
      {
        id: '2',
        type: 'Desktop',
        manufacturer: 'HP',
        model: 'EliteDesk 800',
        status: 'Recycled',
        date: '2025-03-02'
      },
      {
        id: '3',
        type: 'Monitor',
        manufacturer: 'LG',
        model: '27UK850-W',
        status: 'Refurbished',
        date: '2025-03-03'
      },
      {
        id: '4',
        type: 'Printer',
        manufacturer: 'Brother',
        model: 'HL-L2350DW',
        status: 'Recycled',
        date: '2025-03-04'
      },
      {
        id: '5',
        type: 'Phone',
        manufacturer: 'Apple',
        model: 'iPhone 12',
        status: 'Refurbished',
        date: '2025-03-05'
      }
    ]
  });
});

module.exports = router; 