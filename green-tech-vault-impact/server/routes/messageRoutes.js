const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Apply authentication middleware to all message routes
router.use(authMiddleware);

// Route for sending a new message
router.post('/', messageController.sendMessage);

// Route for getting messages (sent or received)
router.get('/', messageController.getMessages);

// Route for getting a single message by ID
router.get('/:id', messageController.getMessage);

// Route for marking a message as read
router.patch('/:id/read', messageController.markAsRead);

// Route for deleting a message
router.delete('/:id', messageController.deleteMessage);

// Route for searching users (to send messages to)
router.get('/search/users', messageController.searchUsers);

// Route for getting unread message count
router.get('/count/unread', messageController.getUnreadCount);

module.exports = router; 