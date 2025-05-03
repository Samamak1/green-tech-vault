import React, { createContext, useState, useContext, useEffect } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
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
      
      // This would be an API call in a real application
      // For now, we'll simulate a delay
      setTimeout(() => {
        // Data is already set in the initial state
        setLoading(false);
      }, 500);
    };
    
    fetchProfileData();
  }, []);

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