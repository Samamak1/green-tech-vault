const express = require('express');
const router = express.Router();

// Mock dashboard data
const dashboardData = {
  stats: {
    totalCompanies: 15,
    totalDevices: 450,
    totalWeight: 1568,
    co2Saved: 1257
  },
  recentPickups: [
    {
      id: '1',
      rygnContact: "Sarah Johnson",
      date: '01/24/2025',
      time: '14:00',
      location: 'Cincinnati Warehouse',
      status: 'Complete',
      weight: 2.5
    },
    {
      id: '2',
      rygnContact: "Michael Chen",
      date: '03/15/2025',
      time: '10:30',
      location: 'Cincinnati Warehouse',
      status: 'In Process',
      weight: 1.8
    }
  ],
  devicesByType: [
    { type: 'Laptop', count: 150 },
    { type: 'Desktop', count: 100 },
    { type: 'Monitor', count: 120 },
    { type: 'Tablet', count: 50 },
    { type: 'Smartphone', count: 30 }
  ],
  devicesByDisposition: [
    { status: 'Refurbished', count: 280 },
    { status: 'Recycled', count: 150 },
    { status: 'Disposed', count: 20 }
  ]
};

// Get dashboard data
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: dashboardData
  });
});

// Get client dashboard data
router.get('/client', (req, res) => {
  res.json({
    success: true,
    data: {
      stats: {
        totalDevices: 45,
        totalWeight: 156.8,
        co2Saved: 125.7,
        treesPlanted: 12
      },
      recentPickups: dashboardData.recentPickups,
      devicesByType: [
        { type: 'Laptop', count: 15 },
        { type: 'Desktop', count: 10 },
        { type: 'Monitor', count: 12 },
        { type: 'Tablet', count: 5 },
        { type: 'Smartphone', count: 3 }
      ],
      devicesByDisposition: [
        { status: 'Refurbished', count: 28 },
        { status: 'Recycled', count: 15 },
        { status: 'Disposed', count: 2 }
      ]
    }
  });
});

module.exports = router; 