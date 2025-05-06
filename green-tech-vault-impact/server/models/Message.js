const mongoose = require('mongoose');

// Define the schema for messages
const messageSchema = new mongoose.Schema({
  // Sender of the message (reference to User model)
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Recipient of the message (reference to User model)
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Content of the message
  content: {
    type: String,
    required: true,
    trim: true
  },
  // Subject line for the message
  subject: {
    type: String,
    trim: true,
    default: '(No Subject)'
  },
  // Timestamp for when the message was sent
  timestamp: {
    type: Date,
    default: Date.now
  },
  // Read status of the message
  read: {
    type: Boolean,
    default: false
  },
  // Whether the message has been deleted by sender
  deletedBySender: {
    type: Boolean,
    default: false
  },
  // Whether the message has been deleted by recipient
  deletedByRecipient: {
    type: Boolean,
    default: false
  }
});

// Define static methods for the Message model
messageSchema.statics = {
  /**
   * Get messages for a specific user (either sent or received)
   * @param {String} userId - The ID of the user
   * @param {String} type - Either 'sent' or 'received'
   * @param {Number} limit - Maximum number of messages to return
   * @param {Number} skip - Number of messages to skip for pagination
   */
  async getMessagesForUser(userId, type, limit = 10, skip = 0) {
    const query = {};
    
    if (type === 'sent') {
      query.sender = userId;
      query.deletedBySender = false;
    } else if (type === 'received') {
      query.recipient = userId;
      query.deletedByRecipient = false;
    }
    
    // Find messages and populate sender and recipient details
    return this.find(query)
      .sort({ timestamp: -1 }) // Most recent messages first
      .skip(skip)
      .limit(limit)
      .populate('sender', 'username email firstName lastName companyName userType')
      .populate('recipient', 'username email firstName lastName companyName userType');
  },

  /**
   * Mark a message as read
   * @param {String} messageId - The ID of the message
   */
  async markAsRead(messageId) {
    return this.findByIdAndUpdate(messageId, { read: true }, { new: true });
  },

  /**
   * Delete a message (soft delete)
   * @param {String} messageId - The ID of the message
   * @param {String} userId - The ID of the user performing the deletion
   * @param {String} role - Whether the user is the 'sender' or 'recipient'
   */
  async deleteMessage(messageId, userId, role) {
    const message = await this.findById(messageId);
    
    if (!message) {
      throw new Error('Message not found');
    }
    
    // Check if the user is the sender or recipient
    if (role === 'sender' && message.sender.toString() === userId) {
      message.deletedBySender = true;
    } else if (role === 'recipient' && message.recipient.toString() === userId) {
      message.deletedByRecipient = true;
    } else {
      throw new Error('Unauthorized to delete this message');
    }
    
    // If both sender and recipient have deleted the message, we can permanently delete it
    if (message.deletedBySender && message.deletedByRecipient) {
      return this.findByIdAndDelete(messageId);
    }
    
    return message.save();
  }
};

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message; 