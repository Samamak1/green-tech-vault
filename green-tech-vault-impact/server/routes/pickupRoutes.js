const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Create the pickups directory if it doesn't exist
const pickupsDir = path.join(__dirname, '../pickups');
if (!fs.existsSync(pickupsDir)) {
  fs.mkdirSync(pickupsDir);
}

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@rygneco.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

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

// Helper function to validate required fields
const validatePickupData = (data) => {
  const requiredFields = ['name', 'email', 'address', 'pickupDate', 'pickupTime', 'contactPhone'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      isValid: false,
      error: 'Invalid email format'
    };
  }
  
  // Validate phone format (basic check)
  const phoneRegex = /^\+?[\d\s-()]+$/;
  if (!phoneRegex.test(data.contactPhone)) {
    return {
      isValid: false,
      error: 'Invalid phone number format'
    };
  }
  
  return { isValid: true };
};

// POST route for new pickup requests
router.post('/schedule', async (req, res) => {
  try {
    // Validate the request data
    const validation = validatePickupData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    const pickupData = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `pickup_${timestamp}.txt`;
    
    // Format the data for file storage
    const fileContent = `
Pickup Request - ${new Date().toLocaleString()}
-----------------------------------------
Name: ${pickupData.name}
Email: ${pickupData.email}
Address: ${pickupData.address}
Pickup Date: ${pickupData.pickupDate}
Pickup Time: ${pickupData.pickupTime}
Contact Phone: ${pickupData.contactPhone}
Items for Pickup: ${pickupData.items || 'Not specified'}
Additional Notes: ${pickupData.notes || 'None'}
-----------------------------------------
    `.trim();

    // Save to file
    fs.writeFileSync(path.join(pickupsDir, filename), fileContent);

    // Format email content
    const emailHtml = `
      <h2>New E-Waste Pickup Request</h2>
      <p>A new pickup request has been submitted:</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickupData.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickupData.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Address:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickupData.address}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pickup Date:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickupData.pickupDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pickup Time:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickupData.pickupTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact Phone:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickupData.contactPhone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Items for Pickup:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickupData.items || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Additional Notes:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickupData.notes || 'None'}</td>
        </tr>
      </table>
    `;

    // Send email
    await transporter.sendMail({
      from: '"RYGNeco" <info@rygneco.com>',
      to: 'info@rygneco.com',
      subject: 'New E-Waste Pickup Request',
      html: emailHtml
    });

    // Send confirmation email to customer
    const confirmationHtml = `
      <h2>E-Waste Pickup Request Confirmation</h2>
      <p>Dear ${pickupData.name},</p>
      <p>Thank you for scheduling an e-waste pickup with RYGNeco. We have received your request and will process it shortly.</p>
      <h3>Pickup Details:</h3>
      <ul>
        <li><strong>Date:</strong> ${pickupData.pickupDate}</li>
        <li><strong>Time:</strong> ${pickupData.pickupTime}</li>
        <li><strong>Address:</strong> ${pickupData.address}</li>
      </ul>
      <p>If you need to make any changes to your pickup request or have any questions, please contact us at info@rygneco.com.</p>
      <p>Thank you for choosing RYGNeco for your e-waste recycling needs!</p>
      <br>
      <p>Best regards,</p>
      <p>The RYGNeco Team</p>
    `;

    await transporter.sendMail({
      from: '"RYGNeco" <info@rygneco.com>',
      to: pickupData.email,
      subject: 'Your E-Waste Pickup Confirmation',
      html: confirmationHtml
    });

    res.status(200).json({ 
      message: 'Pickup request received and processed successfully',
      filename
    });
  } catch (error) {
    console.error('Error processing pickup request:', error);
    res.status(500).json({ 
      error: 'Failed to process pickup request',
      details: error.message
    });
  }
});

module.exports = router; 