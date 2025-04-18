import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from './context/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Layout components
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';

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
import BrandedLanding from './pages/BrandedLanding';
import SchedulePickup from './pages/SchedulePickup';
import BrandedLogin from './pages/BrandedLogin';
import BrandedAdminLogin from './pages/BrandedAdminLogin';

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
      main: '#c70039', // Changed from olive green to rich red
      light: '#dd3361', // Lighter version of primary
      dark: '#a1002e', // Darker version of primary
      contrastText: '#fff',
    },
    secondary: {
      main: '#3e0315', // Dark red background complementing the primary color
      light: '#5c142a',
      dark: '#2a000d',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      card: '#3e0315', // Dark red for cards
      sidebar: '#1e1e1e', // Dark sidebar background
      gradient: 'radial-gradient(circle at 0% 0%, #3e0315, #3e0315, #c70039)', // Circular gradient
    },
    success: {
      main: '#c70039',
      light: '#dd3361',
      dark: '#a1002e',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#ffffff',
      accent: '#c70039', // Rich red for accent text
    },
    chart: {
      clothing: '#c70039', // Rich red for clothing category
      cosmetics: '#3e0315', // Dark red for cosmetics category
      others: '#a0a0a0', // Gray for others category
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none', // Dashboard buttons don't use uppercase
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
          padding: '8px 16px',
        },
        containedPrimary: {
          boxShadow: 'none', // Dashboard buttons don't have shadows
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&.Mui-selected': {
            backgroundColor: 'rgba(199, 0, 57, 0.2)',
          },
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<BrandedLanding />} />
          <Route path="/login" element={<BrandedLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<BrandedAdminLogin />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/schedule-pickup" element={<SchedulePickup />} />
          
          {/* Client Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={isAdmin ? <Navigate to="/admin" /> : <SimpleDashboard />} />
            <Route path="company-profile" element={<CompanyProfile />} />
            <Route path="pickups" element={<Pickups />} />
            <Route path="pickups/:id" element={<PickupDetail />} />
            <Route path="devices" element={<Devices />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/:id" element={<ReportDetail />} />
            <Route path="statistics" element={<Dashboard />} />
            <Route path="database" element={<h1>Database</h1>} />
            <Route path="team" element={<h1>Team</h1>} />
            <Route path="promotion" element={<h1>Promotion</h1>} />
            <Route path="store" element={<h1>My Store</h1>} />
            <Route path="notifications" element={<h1>Notifications</h1>} />
            <Route path="settings" element={<h1>Settings</h1>} />
            <Route path="trash" element={<h1>Trash</h1>} />
            <Route path="help" element={<h1>Help</h1>} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="clients/:clientId" element={<AdminClientDetail />} />
            <Route path="pickup-calendar" element={<AdminPickupCalendar />} />
            <Route path="pickup-detail" element={<AdminPickupDetail />} />
            <Route path="pickups/:pickupId" element={<AdminPickupDetail />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 