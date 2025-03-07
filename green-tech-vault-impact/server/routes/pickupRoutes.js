const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/pickups
 * @desc    Get all pickups
 * @access  Private
 */
router.get('/', (req, res) => {
  // Mock data for pickups
  const pickups = [
    {
      _id: '1',
      scheduledDate: '2025-03-15',
      location: 'Corporate HQ',
      contactPerson: 'John Smith',
      contactPhone: '(555) 123-4567',
      notes: 'Please arrive before 3pm',
      status: 'completed',
      devices: 12,
      weight: 45.2,
      createdAt: '2025-03-01T12:00:00Z',
      updatedAt: '2025-03-15T16:30:00Z'
    },
    {
      _id: '2',
      scheduledDate: '2025-03-20',
      location: 'Branch Office',
      contactPerson: 'Sarah Johnson',
      contactPhone: '(555) 987-6543',
      notes: 'Security check required at entrance',
      status: 'scheduled',
      devices: 0,
      weight: 0,
      createdAt: '2025-03-05T09:15:00Z',
      updatedAt: '2025-03-05T09:15:00Z'
    },
    {
      _id: '3',
      scheduledDate: '2025-03-10',
      location: 'Data Center',
      contactPerson: 'Michael Brown',
      contactPhone: '(555) 456-7890',
      notes: 'Large volume of servers to be collected',
      status: 'completed',
      devices: 15,
      weight: 78.3,
      createdAt: '2025-02-25T14:30:00Z',
      updatedAt: '2025-03-10T17:45:00Z'
    }
  ];

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = pickups.length;

  res.json({
    success: true,
    count: pickups.length,
    total,
    data: pickups.slice(startIndex, endIndex)
  });
});

/**
 * @route   GET /api/pickups/:id
 * @desc    Get pickup by ID
 * @access  Private
 */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  // Mock data for a single pickup
  const pickup = {
    _id: id,
    scheduledDate: '2025-03-15',
    location: 'Corporate HQ',
    contactPerson: 'John Smith',
    contactPhone: '(555) 123-4567',
    notes: 'Please arrive before 3pm',
    status: 'completed',
    devices: [
      {
        _id: '1',
        type: 'Laptop',
        manufacturer: 'Dell',
        model: 'XPS 13',
        serialNumber: 'DL12345678',
        status: 'Refurbished',
        weight: 1.2
      },
      {
        _id: '2',
        type: 'Desktop',
        manufacturer: 'HP',
        model: 'EliteDesk 800',
        serialNumber: 'HP87654321',
        status: 'Recycled',
        weight: 8.3
      }
    ],
    totalDevices: 12,
    totalWeight: 45.2,
    createdAt: '2025-03-01T12:00:00Z',
    updatedAt: '2025-03-15T16:30:00Z'
  };

  res.json({
    success: true,
    data: pickup
  });
});

/**
 * @route   POST /api/pickups
 * @desc    Create a new pickup
 * @access  Private
 */
router.post('/', (req, res) => {
  // Mock creating a new pickup
  const newPickup = {
    _id: Date.now().toString(),
    ...req.body,
    devices: [],
    totalDevices: 0,
    totalWeight: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    data: newPickup
  });
});

/**
 * @route   PUT /api/pickups/:id
 * @desc    Update a pickup
 * @access  Private
 */
router.put('/:id', (req, res) => {
  const id = req.params.id;
  
  // Mock updating a pickup
  const updatedPickup = {
    _id: id,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: updatedPickup
  });
});

/**
 * @route   DELETE /api/pickups/:id
 * @desc    Delete a pickup
 * @access  Private
 */
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    data: {}
  });
});

/**
 * @route   PUT /api/pickups/:id/complete
 * @desc    Mark a pickup as completed
 * @access  Private
 */
router.put('/:id/complete', (req, res) => {
  const id = req.params.id;
  
  // Mock completing a pickup
  const completedPickup = {
    _id: id,
    status: 'completed',
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: completedPickup
  });
});

module.exports = router; 