const express = require('express');
const router = express.Router();

// Mock device data
const devices = [
  {
    id: '1',
    type: 'Laptop',
    make: 'Dell',
    model: 'Latitude 7420',
    serial: 'SN5768291',
    status: 'Recycled',
    weight: 2.5
  },
  {
    id: '2',
    type: 'Desktop',
    make: 'HP',
    model: 'ProDesk 600',
    serial: 'SN8901234',
    status: 'Refurbished',
    weight: 8.3
  },
  {
    id: '3',
    type: 'Monitor',
    make: 'Samsung',
    model: 'S24R650',
    serial: 'SN1209348',
    status: 'Processed',
    weight: 3.7
  },
  {
    id: '4',
    type: 'Tablet',
    make: 'Apple',
    model: 'iPad Air',
    serial: 'SN4538721',
    status: 'Pending',
    weight: 0.9
  },
  {
    id: '5',
    type: 'Smartphone',
    make: 'Samsung',
    model: 'Galaxy S21',
    serial: 'SN9765412',
    status: 'Refurbished',
    weight: 0.5
  }
];

/**
 * @route   GET /api/devices
 * @desc    Get all devices
 * @access  Private
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: devices
  });
});

/**
 * @route   GET /api/devices/:id
 * @desc    Get device by ID
 * @access  Private
 */
router.get('/:id', (req, res) => {
  const device = devices.find(d => d.id === req.params.id);
  
  if (!device) {
    return res.status(404).json({
      success: false,
      error: 'Device not found'
    });
  }
  
  res.json({
    success: true,
    data: device
  });
});

/**
 * @route   POST /api/devices
 * @desc    Create a new device
 * @access  Private
 */
router.post('/', (req, res) => {
  res.json({
    success: true,
    data: {
      id: Date.now().toString(),
      ...req.body
    }
  });
});

/**
 * @route   PUT /api/devices/:id
 * @desc    Update device
 * @access  Private
 */
router.put('/:id', (req, res) => {
  const device = devices.find(d => d.id === req.params.id);
  
  if (!device) {
    return res.status(404).json({
      success: false,
      error: 'Device not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      ...device,
      ...req.body
    }
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
    message: 'Device deleted successfully'
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