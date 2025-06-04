require('dotenv').config();
const axios = require('axios');

const testPickupRequest = {
  name: 'Test User',
  email: 'leilaameyer2@gmail.com', // Your test email
  address: '123 Test St, Cincinnati, OH 45202',
  pickupDate: '2024-03-25',
  pickupTime: '10:00 AM - 12:00 PM',
  contactPhone: '(555) 123-4567',
  items: 'Test items: 2 laptops, 1 printer',
  notes: 'This is a test submission'
};

const testPickupSubmission = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/pickups/schedule', testPickupRequest);
    console.log('Test submission successful:', response.data);
  } catch (error) {
    console.error('Test submission failed:', error.response?.data || error.message);
  }
};

testPickupSubmission(); 