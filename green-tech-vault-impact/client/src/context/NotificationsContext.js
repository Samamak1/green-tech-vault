import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      sender: "John Doe",
      action: "has submitted a leave request for July 25-27 2024",
      timestamp: "July 18, 2024",
      time: "09:00 PM",
      isRead: false,
      type: "leave"
    },
    {
      id: 2,
      sender: "Michael Brown",
      action: "contract is up for renewal on July 21, 2024",
      timestamp: "July 15, 2024",
      time: "05:10 PM",
      isRead: false,
      type: "contract"
    },
    {
      id: 3,
      sender: "Emily Davis",
      action: "has set up a meeting for July 20, 2024, at 3:00 PM",
      timestamp: "July 16, 2024",
      time: "03:47 PM",
      isRead: false,
      type: "meeting"
    },
    {
      id: 4,
      sender: "Matthew Martinez",
      action: "has scheduled a meeting for July 23, 2024",
      timestamp: "July 16, 2024",
      time: "11:30 AM",
      isRead: false,
      type: "meeting"
    },
    {
      id: 5,
      sender: "Nelfer Harris",
      action: "contract renewal is up for review on November 15, 2024",
      timestamp: "July 6, 2024",
      time: "10:00 AM",
      isRead: false,
      type: "contract"
    },
    {
      id: 6,
      sender: "Anthony White",
      action: "has been added to the team as of today",
      timestamp: "July 15, 2024",
      time: "04:30 PM",
      isRead: false,
      type: "team"
    },
    {
      id: 7,
      sender: "Sarah Johnson",
      action: "contract renewal has been submitted for review",
      timestamp: "July 14, 2024",
      time: "03:15 PM",
      isRead: false,
      type: "contract"
    }
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we're using mock data
        setTimeout(() => {
          setNotifications(mockNotifications);
          setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true } 
          : notif
      )
    );
    
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => ({ ...notif, isRead: true }))
    );
    
    setUnreadCount(0);
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    
    if (!notification.isRead) {
      setUnreadCount(prev => prev + 1);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext; 