import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch the profile data from an API
    // For demo purposes, we're deriving it from the auth user data
    const fetchProfileData = () => {
      setLoading(true);
      
      if (user) {
        if (isAdmin) {
          // Admin users for demo
          setProfileData({
            fullName: 'Leila Meyer',
            jobTitle: 'CEO',
            email: 'leila.meyer@greentechvault.com',
            phone: '(555) 123-4567',
            username: 'lmeyer',
            password: '••••••••',
            profilePicture: null
          });
        } else {
          // Client users for demo
          setProfileData({
            fullName: user.companyName || "Leila's Company",
            jobTitle: user.position || 'Owner',
            email: user.email || 'leila@leilascompany.com',
            phone: user.phone || '(555) 987-6543',
            username: user.username || 'lmeyer',
            password: '••••••••',
            profilePicture: null
          });
        }
      } else {
        // Reset profile if no user
        setProfileData(null);
      }
      
      // This would be an API call in a real application
      // For now, we'll simulate a delay
      setTimeout(() => {
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