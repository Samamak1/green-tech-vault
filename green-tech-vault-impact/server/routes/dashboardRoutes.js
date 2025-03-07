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
      recycledDevices: 69
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
  
  let data = [];
  
  // Generate sample data based on metric and period
  if (metric === 'ewaste') {
    data = [
      { label: 'Jan', value: 120 },
      { label: 'Feb', value: 150 },
      { label: 'Mar', value: 180 },
      { label: 'Apr', value: 110 },
      { label: 'May', value: 160 },
      { label: 'Jun', value: 140 },
      { label: 'Jul', value: 170 },
      { label: 'Aug', value: 190 },
      { label: 'Sep', value: 210 },
      { label: 'Oct', value: 230 },
      { label: 'Nov', value: 250 },
      { label: 'Dec', value: 270 }
    ];
  } else if (metric === 'co2') {
    data = [
      { label: 'Jan', value: 350 },
      { label: 'Feb', value: 420 },
      { label: 'Mar', value: 510 },
      { label: 'Apr', value: 320 },
      { label: 'May', value: 480 },
      { label: 'Jun', value: 390 },
      { label: 'Jul', value: 510 },
      { label: 'Aug', value: 570 },
      { label: 'Sep', value: 630 },
      { label: 'Oct', value: 690 },
      { label: 'Nov', value: 750 },
      { label: 'Dec', value: 810 }
    ];
  } else if (metric === 'deviceTypes') {
    data = [
      { label: 'Laptops', value: 45 },
      { label: 'Desktops', value: 25 },
      { label: 'Monitors', value: 30 },
      { label: 'Phones', value: 20 },
      { label: 'Tablets', value: 15 },
      { label: 'Printers', value: 10 },
      { label: 'Other', value: 5 }
    ];
  } else if (metric === 'disposition') {
    data = [
      { label: 'Refurbished', value: 55 },
      { label: 'Recycled', value: 35 },
      { label: 'Pending', value: 10 }
    ];
  }
  
  res.json({
    success: true,
    data
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

module.exports = router; 