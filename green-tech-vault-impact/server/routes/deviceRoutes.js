const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/devices
 * @desc    Get all devices
 * @access  Private
 */
router.get('/', (req, res) => {
  // Mock data for devices
  const devices = [
    {
      _id: '1',
      type: 'Laptop',
      manufacturer: 'Dell',
      model: 'XPS 13',
      serialNumber: 'DL12345678',
      status: 'Refurbished',
      weight: 1.2,
      pickupId: '1',
      createdAt: '2025-03-01T12:00:00Z',
      updatedAt: '2025-03-15T16:30:00Z'
    },
    {
      _id: '2',
      type: 'Desktop',
      manufacturer: 'HP',
      model: 'EliteDesk 800',
      serialNumber: 'HP87654321',
      status: 'Recycled',
      weight: 8.3,
      pickupId: '1',
      createdAt: '2025-03-01T12:00:00Z',
      updatedAt: '2025-03-15T16:30:00Z'
    },
    {
      _id: '3',
      type: 'Monitor',
      manufacturer: 'LG',
      model: '27UK850-W',
      serialNumber: 'LG98765432',
      status: 'Refurbished',
      weight: 6.2,
      pickupId: '3',
      createdAt: '2025-03-10T14:00:00Z',
      updatedAt: '2025-03-10T17:45:00Z'
    }
  ];

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = devices.length;

  res.json({
    success: true,
    count: devices.length,
    total,
    data: devices.slice(startIndex, endIndex)
  });
});

/**
 * @route   POST /api/devices
 * @desc    Create a new device
 * @access  Private
 */
router.post('/', (req, res) => {
  // Mock creating a new device
  const newDevice = {
    _id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    data: newDevice
  });
});

/**
 * @route   GET /api/devices/:id
 * @desc    Get device by ID
 * @access  Private
 */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  // Mock data for a single device
  const device = {
    _id: id,
    type: 'Laptop',
    manufacturer: 'Dell',
    model: 'XPS 13',
    serialNumber: 'DL12345678',
    status: 'Refurbished',
    weight: 1.2,
    pickupId: '1',
    pickupDate: '2025-03-15',
    disposition: {
      method: 'Refurbished',
      date: '2025-03-20',
      notes: 'Upgraded RAM and SSD'
    },
    createdAt: '2025-03-01T12:00:00Z',
    updatedAt: '2025-03-15T16:30:00Z'
  };

  res.json({
    success: true,
    data: device
  });
});

/**
 * @route   PUT /api/devices/:id
 * @desc    Update device
 * @access  Private
 */
router.put('/:id', (req, res) => {
  const id = req.params.id;
  
  // Mock updating a device
  const updatedDevice = {
    _id: id,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: updatedDevice
  });
});

/**
 * @route   DELETE /api/devices/:id
 * @desc    Delete device
 * @access  Private
 */
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    data: {}
  });
});

/**
 * @route   PUT /api/devices/:id/disposition
 * @desc    Update device disposition
 * @access  Private
 */
router.put('/:id/disposition', (req, res) => {
  const id = req.params.id;
  
  // Mock updating device disposition
  const updatedDevice = {
    _id: id,
    disposition: {
      method: req.body.disposition,
      date: new Date().toISOString(),
      notes: req.body.notes || ''
    },
    status: req.body.disposition,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: updatedDevice
  });
});

module.exports = router; 