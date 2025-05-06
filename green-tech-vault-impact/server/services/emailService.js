const nodemailer = require('nodemailer');

// Configure the email transport
// For production, use actual SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io', // Default to mailtrap for development
  port: process.env.EMAIL_PORT || 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Service for handling email notifications
 */
const emailService = {
  /**
   * Send a notification email when a user receives a new message
   * @param {Object} recipient - The recipient user object (needs email and username)
   * @param {Object} sender - The sender user object (needs username)
   * @param {String} messageSubject - The subject of the message
   */
  async sendMessageNotification(recipient, sender, messageSubject) {
    if (!recipient.email) {
      console.error('Recipient email is required to send notifications');
      return;
    }

    // Create the email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'notifications@rygneco.com',
      to: recipient.email,
      subject: 'New Message on RYGNeco Platform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://rygneco.com/logo.png" alt="RYGNeco Logo" style="max-width: 150px;" />
          </div>
          <h2 style="color: #185B5F; margin-bottom: 20px;">You've received a new message</h2>
          <p style="margin-bottom: 15px;">Hello ${recipient.username || 'there'},</p>
          <p style="margin-bottom: 15px;">You've received a new message from <strong>${sender.username}</strong> on your RYGNeco account.</p>
          ${messageSubject ? `<p style="margin-bottom: 15px;"><strong>Subject:</strong> ${messageSubject}</p>` : ''}
          <p style="margin-bottom: 25px;">Please log in to read the complete message and respond if needed.</p>
          <div style="text-align: center;">
            <a href="${process.env.APP_URL || 'https://rygneco.com'}/messages" 
               style="background-color: #185B5F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
              View Message
            </a>
          </div>
          <p style="margin-top: 25px; font-size: 12px; color: #666; text-align: center;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Message notification sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending message notification:', error);
      throw error;
    }
  }
};

module.exports = emailService; 