import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Configure axios with auth interceptor
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token !== 'null') {
      try {
        // Basic validation to ensure token looks valid
        const parts = token.split('.');
        if (parts.length === 3) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Invalid token format:', error);
        localStorage.removeItem('token');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      // Don't log 401 errors as they're expected for unauthenticated users
      return Promise.reject(new Error('Authentication required'));
    }
    return Promise.reject(error);
  }
);

// Create message context
const MessageContext = createContext();

// Custom hook to use the message context
export const useMessages = () => useContext(MessageContext);

// Provider component for the message context
export const MessageProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageType, setMessageType] = useState('received'); // 'received' or 'sent'
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Base API URL for messages
  const API_URL = '/messages';

  // Check if user is authenticated with valid token
  const isAuthenticated = () => {
    if (!user) return false;
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') return false;
    try {
      const parts = token.split('.');
      return parts.length === 3;
    } catch {
      return false;
    }
  };

  // Fetch messages (either received or sent)
  const fetchMessages = async (type = messageType, page = 1, limit = 10) => {
    if (!isAuthenticated()) {
      setMessages([]);
      setPagination({ page: 1, limit: 10, total: 0, pages: 0 });
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get(`${API_URL}?type=${type}&page=${page}&limit=${limit}`);
      // Handle different response formats
      if (response.data && response.data.data) {
        setMessages(response.data.data.messages || []);
        setPagination(response.data.data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0
        });
      } else {
        // Fallback for empty or malformed responses
        setMessages([]);
        setPagination({
          page: 1,
          limit: 10,
          total: 0,
          pages: 0
        });
      }
      setMessageType(type);
    } catch (error) {
      if (error.message === 'Authentication required') {
        // Silent fail for auth errors - user is not logged in
        setMessages([]);
        setError(null);
      } else {
        console.error('Error fetching messages:', error);
        setError('Failed to load messages. Please try again later.');
        setMessages([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single message by ID
  const fetchMessage = async (messageId) => {
    if (!isAuthenticated() || !messageId) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get(`${API_URL}/${messageId}`);
      setSelectedMessage(response.data.data);
      return response.data.data;
    } catch (error) {
      if (error.message !== 'Authentication required') {
        console.error('Error fetching message:', error);
        setError('Failed to load message. Please try again later.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async (recipientId, subject, content) => {
    if (!isAuthenticated()) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post(API_URL, {
        recipientId,
        subject,
        content
      });
      
      // If we're currently viewing sent messages, add the new message to the list
      if (messageType === 'sent') {
        setMessages(prevMessages => [response.data.data, ...prevMessages]);
      }
      
      return response.data.data;
    } catch (error) {
      if (error.message !== 'Authentication required') {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again later.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Mark a message as read
  const markAsRead = async (messageId) => {
    if (!isAuthenticated() || !messageId) return;
    
    try {
      await apiClient.patch(`${API_URL}/${messageId}/read`);
      
      // Update the message in the list
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg._id === messageId ? { ...msg, read: true } : msg
        )
      );
      
      // Update the selected message if it's currently selected
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage(prev => ({ ...prev, read: true }));
      }
      
      // Update unread count
      fetchUnreadCount();
    } catch (error) {
      if (error.message !== 'Authentication required') {
        console.error('Error marking message as read:', error);
      }
    }
  };

  // Delete a message
  const deleteMessage = async (messageId) => {
    if (!isAuthenticated() || !messageId) return false;
    
    try {
      await apiClient.delete(`${API_URL}/${messageId}`);
      
      // Remove the message from the list
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg._id !== messageId)
      );
      
      // Clear selected message if it's the one being deleted
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage(null);
      }
      
      return true;
    } catch (error) {
      if (error.message !== 'Authentication required') {
        console.error('Error deleting message:', error);
        setError('Failed to delete message. Please try again later.');
      }
      return false;
    }
  };

  // Search for users to message (for admin use)
  const searchUsers = async (query) => {
    if (!isAuthenticated()) return [];
    
    setSearchQuery(query);
    
    try {
      const response = await apiClient.get(`${API_URL}/search/users?query=${query}`);
      setRecipients(response.data.data);
      return response.data.data;
    } catch (error) {
      if (error.message !== 'Authentication required') {
        console.error('Error searching users:', error);
        setError('Failed to search users. Please try again later.');
      }
      return [];
    }
  };

  // Get unread message count
  const fetchUnreadCount = async () => {
    if (!isAuthenticated()) {
      setUnreadCount(0);
      return 0;
    }
    
    try {
      const response = await apiClient.get(`${API_URL}/count/unread`);
      const count = response.data?.data?.count || 0;
      setUnreadCount(count);
      return count;
    } catch (error) {
      if (error.message !== 'Authentication required') {
        console.error('Error fetching unread count:', error);
      }
      setUnreadCount(0);
      return 0;
    }
  };

  // Initial data fetch when user changes
  useEffect(() => {
    if (user && isAuthenticated()) {
      fetchMessages('received', 1, 10);
      fetchUnreadCount();
    } else {
      setMessages([]);
      setUnreadCount(0);
      setSelectedMessage(null);
      setError(null);
    }
  }, [user]);

  // Context value with state and functions
  const value = {
    messages,
    loading,
    error,
    unreadCount,
    selectedMessage,
    recipients,
    searchQuery,
    messageType,
    pagination,
    fetchMessages,
    fetchMessage,
    sendMessage,
    markAsRead,
    deleteMessage,
    searchUsers,
    fetchUnreadCount,
    setSelectedMessage
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext; 