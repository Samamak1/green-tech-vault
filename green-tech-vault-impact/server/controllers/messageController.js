const Message = require('../models/Message');
const User = require('../models/User');
const emailService = require('../services/emailService');

/**
 * Controller for handling message-related operations
 */
const messageController = {
  /**
   * Send a new message
   * @param {Object} req - Request object with sender, recipient, subject, and content
   * @param {Object} res - Response object
   */
  async sendMessage(req, res) {
    try {
      const { recipientId, subject, content } = req.body;
      const senderId = req.user._id; // Assuming authenticated user

      // Validate required fields
      if (!recipientId || !content) {
        return res.status(400).json({ 
          success: false, 
          message: 'Recipient and message content are required' 
        });
      }

      // Find recipient user to ensure they exist
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        return res.status(404).json({ 
          success: false, 
          message: 'Recipient not found' 
        });
      }

      // Create and save the new message
      const newMessage = new Message({
        sender: senderId,
        recipient: recipientId,
        subject: subject || '(No Subject)',
        content,
        timestamp: new Date(),
        read: false
      });

      await newMessage.save();

      // Get sender details for email notification
      const sender = await User.findById(senderId);

      // Send email notification to recipient
      try {
        await emailService.sendMessageNotification(recipient, sender, subject);
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
        // Continue even if email fails - we don't want to fail the API call
      }

      // Return the created message with populated sender and recipient
      const populatedMessage = await Message.findById(newMessage._id)
        .populate('sender', 'username email firstName lastName companyName userType')
        .populate('recipient', 'username email firstName lastName companyName userType');

      return res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: populatedMessage
      });
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send message',
        error: error.message
      });
    }
  },

  /**
   * Get messages for the logged-in user
   * @param {Object} req - Request object with query parameters
   * @param {Object} res - Response object
   */
  async getMessages(req, res) {
    try {
      const userId = req.user._id; // Assuming authenticated user
      const { type = 'received', page = 1, limit = 10 } = req.query;
      
      // Validate message type
      if (!['sent', 'received'].includes(type)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid message type. Must be "sent" or "received"' 
        });
      }

      // Calculate pagination skip value
      const skip = (page - 1) * limit;
      
      // Get messages based on type
      const messages = await Message.getMessagesForUser(
        userId,
        type,
        parseInt(limit),
        skip
      );

      // Get total count for pagination
      const query = type === 'sent' 
        ? { sender: userId, deletedBySender: false }
        : { recipient: userId, deletedByRecipient: false };
      
      const total = await Message.countDocuments(query);
      
      return res.status(200).json({
        success: true,
        data: {
          messages,
          pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            limit: parseInt(limit)
          }
        }
      });
    } catch (error) {
      console.error('Error getting messages:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get messages',
        error: error.message
      });
    }
  },

  /**
   * Get a single message by ID
   * @param {Object} req - Request object with message ID
   * @param {Object} res - Response object
   */
  async getMessage(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id; // Assuming authenticated user

      // Find the message and populate sender and recipient
      const message = await Message.findById(id)
        .populate('sender', 'username email firstName lastName companyName userType')
        .populate('recipient', 'username email firstName lastName companyName userType');

      // Check if message exists
      if (!message) {
        return res.status(404).json({ 
          success: false, 
          message: 'Message not found' 
        });
      }

      // Ensure user is either the sender or recipient
      if (message.sender._id.toString() !== userId.toString() && 
          message.recipient._id.toString() !== userId.toString()) {
        return res.status(403).json({ 
          success: false, 
          message: 'Not authorized to access this message' 
        });
      }

      // If user is the recipient and message is unread, mark as read
      if (message.recipient._id.toString() === userId.toString() && !message.read) {
        message.read = true;
        await message.save();
      }

      return res.status(200).json({
        success: true,
        data: message
      });
    } catch (error) {
      console.error('Error getting message:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get message',
        error: error.message
      });
    }
  },

  /**
   * Mark a message as read
   * @param {Object} req - Request object with message ID
   * @param {Object} res - Response object
   */
  async markAsRead(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id; // Assuming authenticated user

      // Find the message
      const message = await Message.findById(id);

      // Check if message exists
      if (!message) {
        return res.status(404).json({ 
          success: false, 
          message: 'Message not found' 
        });
      }

      // Ensure user is the recipient
      if (message.recipient.toString() !== userId.toString()) {
        return res.status(403).json({ 
          success: false, 
          message: 'Not authorized to mark this message as read' 
        });
      }

      // Mark as read
      const updatedMessage = await Message.markAsRead(id);

      return res.status(200).json({
        success: true,
        message: 'Message marked as read',
        data: updatedMessage
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to mark message as read',
        error: error.message
      });
    }
  },

  /**
   * Delete a message (soft delete)
   * @param {Object} req - Request object with message ID
   * @param {Object} res - Response object
   */
  async deleteMessage(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id; // Assuming authenticated user

      // Find the message
      const message = await Message.findById(id);

      // Check if message exists
      if (!message) {
        return res.status(404).json({ 
          success: false, 
          message: 'Message not found' 
        });
      }

      // Determine if user is sender or recipient
      let role;
      if (message.sender.toString() === userId.toString()) {
        role = 'sender';
      } else if (message.recipient.toString() === userId.toString()) {
        role = 'recipient';
      } else {
        return res.status(403).json({ 
          success: false, 
          message: 'Not authorized to delete this message' 
        });
      }

      // Delete message based on role
      await Message.deleteMessage(id, userId, role);

      return res.status(200).json({
        success: true,
        message: 'Message deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete message',
        error: error.message
      });
    }
  },

  /**
   * Search for users to message (for admin use)
   * @param {Object} req - Request object with search query
   * @param {Object} res - Response object
   */
  async searchUsers(req, res) {
    try {
      const { query } = req.query;
      const userId = req.user._id; // Assuming authenticated user
      
      // Validate search query
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Search query is required' 
        });
      }

      // Search for users by username or email
      const users = await User.find({
        $and: [
          { _id: { $ne: userId } }, // Exclude the current user
          {
            $or: [
              { username: { $regex: query, $options: 'i' } },
              { email: { $regex: query, $options: 'i' } },
              { companyName: { $regex: query, $options: 'i' } }
            ]
          }
        ]
      }).select('username email firstName lastName companyName userType');

      return res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Error searching users:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to search users',
        error: error.message
      });
    }
  },

  /**
   * Get unread message count for the logged-in user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getUnreadCount(req, res) {
    try {
      const userId = req.user._id; // Assuming authenticated user

      // Count unread messages
      const count = await Message.countDocuments({
        recipient: userId,
        read: false,
        deletedByRecipient: false
      });

      return res.status(200).json({
        success: true,
        data: { count }
      });
    } catch (error) {
      console.error('Error getting unread count:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get unread message count',
        error: error.message
      });
    }
  }
};

module.exports = messageController; 