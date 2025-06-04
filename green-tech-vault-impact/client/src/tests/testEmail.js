import dotenv from 'dotenv';
import { sendPickupConfirmationEmail } from '../utils/emailService';

// Load environment variables
dotenv.config();

const testPickupDetails = {
  date: '2024-03-20',
  time: '10:00 AM - 12:00 PM',
  address: '123 Main St, Cincinnati, OH 45202',
  contactName: 'Test User',
  contactPhone: '(555) 123-4567',
  contactEmail: 'leilaameyer2@gmail.com'
};

// Send test email
sendPickupConfirmationEmail(testPickupDetails)
  .then(() => console.log('Test email sent successfully'))
  .catch(error => console.error('Error sending test email:', error)); 