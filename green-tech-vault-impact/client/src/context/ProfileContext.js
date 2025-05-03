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
    profilePicture: null,
    // Additional address data
    country: 'United Kingdom',
    city: 'Leeds, East London',
    postalCode: 'ERT 2354',
    taxId: 'AS45645756'
  });
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const loadProfileData = () => {
      setLoading(true);
      
      try {
        // Check if we have saved profile data in localStorage
        const savedProfileData = localStorage.getItem('profileData');
        if (savedProfileData) {
          setProfileData(JSON.parse(savedProfileData));
        }
        
        // Check if we have a saved profile picture URL
        const savedProfilePictureUrl = localStorage.getItem('profilePictureUrl');
        if (savedProfilePictureUrl) {
          setProfilePictureUrl(savedProfilePictureUrl);
        }
      } catch (error) {
        console.error('Error loading profile data from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfileData();
  }, []);

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('profileData', JSON.stringify(profileData));
      } catch (error) {
        console.error('Error saving profile data to localStorage:', error);
      }
    }
  }, [profileData, loading]);

  // Save profile picture URL to localStorage whenever it changes
  useEffect(() => {
    if (!loading && profilePictureUrl) {
      try {
        localStorage.setItem('profilePictureUrl', profilePictureUrl);
      } catch (error) {
        console.error('Error saving profile picture URL to localStorage:', error);
      }
    }
  }, [profilePictureUrl, loading]);

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