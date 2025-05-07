const express = require('express');
const router = express.Router();

// Mock pickup data
const pickups = [
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
];

/**
 * @route   GET /api/pickups
 * @desc    Get all pickups
 * @access  Private
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: pickups
  });
});

/**
 * @route   GET /api/pickups/:id
 * @desc    Get pickup by ID
 * @access  Private
 */
router.get('/:id', (req, res) => {
  const pickup = pickups.find(p => p.id === req.params.id);
  
  if (!pickup) {
    return res.status(404).json({
      success: false,
      error: 'Pickup not found'
    });
  }
  
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
  res.json({
    success: true,
    data: {
      id: Date.now().toString(),
      ...req.body
    }
  });
});

/**
 * @route   PUT /api/pickups/:id
 * @desc    Update a pickup
 * @access  Private
 */
router.put('/:id', (req, res) => {
  const pickup = pickups.find(p => p.id === req.params.id);
  
  if (!pickup) {
    return res.status(404).json({
      success: false,
      error: 'Pickup not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      ...pickup,
      ...req.body
    }
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
    message: 'Pickup deleted successfully'
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