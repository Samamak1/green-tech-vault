import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Verify token is valid and not expired
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            // Token expired
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUser(null);
          } else {
            // Set auth token header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Get user data
            const res = await axios.get('/api/auth/me');
            
            setUser(res.data.data);
            setIsAuthenticated(true);
            
            // Check if user is admin
            setIsAdmin(res.data.data.role === 'admin');
          }
        }
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
        setError(err.response?.data?.error || 'Authentication error');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/auth/register', formData);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
      
      setUser(res.data.data.user);
      setIsAuthenticated(true);
      
      // Check if user is admin
      setIsAdmin(res.data.data.user.role === 'admin');
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/auth/login', formData);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
      
      setUser(res.data.data.user);
      setIsAuthenticated(true);
      
      // Check if user is admin
      setIsAdmin(res.data.data.user.role === 'admin');
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Admin login
  const adminLogin = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add admin flag to login request
      const res = await axios.post('/api/auth/login', {
        ...formData,
        isAdminLogin: true
      });
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
      
      setUser(res.data.data.user);
      setIsAuthenticated(true);
      setIsAdmin(true);
      
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Admin login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        error,
        register,
        login,
        adminLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 