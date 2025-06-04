import nodemailer from 'nodemailer';
import PickupConfirmationEmail from '../templates/PickupConfirmationEmail';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'info@rygneco.com',
    pass: process.env.EMAIL_PASSWORD // This should be set in your environment variables
  }
});

export const sendPickupConfirmationEmail = async (pickupDetails) => {
  const { html } = PickupConfirmationEmail({ pickupDetails });
  
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"RYGNeco" <info@rygneco.com>',
      to: pickupDetails.contactEmail,
      subject: 'Your E-Waste Pickup Confirmation',
      html: html
    });

    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}; 