import React from 'react';

const PickupConfirmationEmail = ({ pickupDetails }) => {
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://rygneco.com/logo.png" alt="RYGNeco Logo" style="max-width: 150px;" />
      </div>
      
      <h1 style="color: #073C3F; text-align: center; margin-bottom: 30px;">E-Waste Pickup Confirmation</h1>
      
      <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
        Thank you for scheduling an e-waste pickup with RYGNeco! We're excited to help you responsibly dispose of your electronic waste.
      </p>
      
      <div style="background-color: #E7F5F5; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #073C3F; margin-bottom: 15px;">Pickup Details</h2>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${pickupDetails.date}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${pickupDetails.time}</p>
        <p style="margin: 5px 0;"><strong>Location:</strong> ${pickupDetails.address}</p>
        <p style="margin: 5px 0;"><strong>Contact Person:</strong> ${pickupDetails.contactName}</p>
        <p style="margin: 5px 0;"><strong>Contact Phone:</strong> ${pickupDetails.contactPhone}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #073C3F; margin-bottom: 15px;">What to Expect</h2>
        <ul style="color: #333; padding-left: 20px;">
          <li style="margin-bottom: 10px;">Our team will arrive during your scheduled time window</li>
          <li style="margin-bottom: 10px;">Please ensure all items are easily accessible</li>
          <li style="margin-bottom: 10px;">We'll provide you with a receipt of collection</li>
          <li style="margin-bottom: 10px;">You'll receive an impact report after processing</li>
        </ul>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #073C3F; margin-bottom: 15px;">Preparation Tips</h2>
        <ul style="color: #333; padding-left: 20px;">
          <li style="margin-bottom: 10px;">Back up any important data</li>
          <li style="margin-bottom: 10px;">Remove any personal information from devices</li>
          <li style="margin-bottom: 10px;">Collect all cables and accessories if possible</li>
          <li style="margin-bottom: 10px;">Keep items in a dry, accessible location</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin-bottom: 30px;">
        <p style="color: #333; margin-bottom: 20px;">
          Need to make changes to your pickup? Have questions?<br />
          Contact us at info@rygneco.com or call (800) 123-4567
        </p>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 20px; text-align: center; color: #666;">
        <p style="font-size: 14px;">
          Thank you for choosing RYGNeco for your e-waste recycling needs.<br />
          Together, we're making a difference for our environment.
        </p>
        <div style="margin-top: 15px;">
          <a href="https://www.facebook.com/rygneco" style="margin: 0 10px; color: #073C3F; text-decoration: none;">Facebook</a>
          <a href="https://www.instagram.com/rygneco" style="margin: 0 10px; color: #073C3F; text-decoration: none;">Instagram</a>
          <a href="https://x.com/RYGNeco" style="margin: 0 10px; color: #073C3F; text-decoration: none;">X (Twitter)</a>
          <a href="https://linkedin.com/company/rygneco" style="margin: 0 10px; color: #073C3F; text-decoration: none;">LinkedIn</a>
        </div>
      </div>
    </div>
  `;

  return { html: emailContent };
};

export default PickupConfirmationEmail; 