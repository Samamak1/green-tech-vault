import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from './context/AuthContext';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import SimpleDashboard from './pages/SimpleDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CompanyProfile from './pages/CompanyProfile';
import Pickups from './pages/Pickups';
import PickupDetail from './pages/PickupDetail';
import Devices from './pages/Devices';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminClientDetail from './pages/AdminClientDetail';
import AdminPickupDetail from './pages/AdminPickupDetail';
import AdminPickupCalendar from './pages/AdminPickupCalendar';
import Unauthorized from './pages/Unauthorized';

// Route Protection
import AdminRoute from './components/routing/AdminRoute';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green color for environmental theme
      light: '#60ad5e',
      dark: '#005005',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00796b', // Teal as secondary color
      light: '#48a999',
      dark: '#004c40',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const { isAdmin } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Client Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={isAdmin ? <Navigate to="/admin" /> : <SimpleDashboard />} />
          <Route path="company-profile" element={<CompanyProfile />} />
          <Route path="pickups" element={<Pickups />} />
          <Route path="pickups/:id" element={<PickupDetail />} />
          <Route path="devices" element={<Devices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:id" element={<ReportDetail />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        
        <Route path="/admin/clients/:clientId" element={
          <AdminRoute>
            <AdminClientDetail />
          </AdminRoute>
        } />
        
        <Route path="/admin/pickup-calendar" element={
          <AdminRoute>
            <AdminPickupCalendar />
          </AdminRoute>
        } />
        
        <Route path="/admin/pickup-detail" element={
          <AdminRoute>
            <AdminPickupDetail />
          </AdminRoute>
        } />
        
        <Route path="/admin/pickups/:pickupId" element={
          <AdminRoute>
            <AdminPickupDetail />
          </AdminRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App; 