import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: 'Leila Meyer',
    jobTitle: 'CEO',
    email: 'leila.meyer@greentechvault.com',
    phone: '(555) 123-4567',
    username: 'lmeyer',
    password: '••••••••',
    profilePicture: null
  });
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch the profile data from an API
    // For demo purposes, we're using hardcoded data
    const fetchProfileData = () => {
      setLoading(true);
      
      if (user) {
        // Show different profile data based on whether user is admin or client
        if (!isAdmin && user?.companyName) {
          setProfileData({
            fullName: user.companyName || 'Client Company',
            jobTitle: 'Client',
            email: user.email || 'client@example.com',
            phone: user.phone || '(555) 987-6543',
            username: user.username || 'client',
            password: '••••••••',
            profilePicture: null
          });
        } else {
          // Admin profile data (default)
          setProfileData({
            fullName: 'Leila Meyer',
            jobTitle: 'CEO',
            email: 'leila.meyer@greentechvault.com',
            phone: '(555) 123-4567',
            username: 'lmeyer',
            password: '••••••••',
            profilePicture: null
          });
        }
      }
      
      // This would be an API call in a real application
      // For now, we'll simulate a delay
      setTimeout(() => {
        // Data is already set in the initial state
        setLoading(false);
      }, 500);
    };
    
    fetchProfileData();
  }, [user, isAdmin]);

  const updateProfileData = (newData) => {
    setProfileData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const updateProfilePicture = (file) => {
    if (file) {
      setProfileData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePictureUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        profilePictureUrl,
        loading,
        updateProfileData,
        updateProfilePicture
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}; 