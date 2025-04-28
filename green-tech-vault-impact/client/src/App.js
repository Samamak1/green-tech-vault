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
import MainLayout from './components/layout/MainLayout';
import ClientDashboardLayout from './components/layout/ClientDashboardLayout';

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
import NewLandingPage from './pages/NewLandingPage';
import ContactPage from './pages/ContactPage';
import RecyclingOffersPage from './pages/RecyclingOffersPage';
import AboutUsPage from './pages/AboutUsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SchedulePickup from './pages/SchedulePickup';
import BrandedLogin from './pages/BrandedLogin';
import ClientLogin from './pages/ClientLogin';
import ClientRegister from './pages/ClientRegister';
import BrandedAdminLogin from './pages/BrandedAdminLogin';
import EnvironmentalImpactReportPage from './pages/EnvironmentalImpactReportPage';
import AssetTrackingReportPage from './pages/AssetTrackingReportPage';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminClientDetail from './pages/AdminClientDetail';
import AdminClientProfile from './pages/AdminClientProfile';
import AdminPickupDetail from './pages/AdminPickupDetail';
import AdminDeviceDetail from './pages/AdminDeviceDetail';
import AdminPickupCalendar from './pages/AdminPickupCalendar';
import Unauthorized from './pages/Unauthorized';
import AdminMessages from './pages/AdminMessages';

// Route Protection
import AdminRoute from './components/routing/AdminRoute';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1C392B', // Dark green
      light: '#2D6356', // Medium green
      dark: '#142B21', // Darker green
      contrastText: '#fff',
    },
    secondary: {
      main: '#2D6356', // Medium green
      light: '#4ECDC4', // Teal
      dark: '#1C392B', // Dark green
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      card: '#1C392B', // Dark green for cards
      sidebar: '#1e1e1e', // Dark sidebar background
      gradient: 'linear-gradient(90deg, #1C392B, #2D6356, #3C8975, #4ECDC4, #7FE0D9)', // Linear gradient of all shades
    },
    success: {
      main: '#4ECDC4', // Teal
      light: '#7FE0D9', // Light teal
      dark: '#3C8975', // Medium-dark teal/green
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#ffffff',
      accent: '#4ECDC4', // Teal for accent text
    },
    chart: {
      clothing: '#1C392B', // Dark green
      cosmetics: '#4ECDC4', // Teal
      others: '#a0a0a0', // Gray for others category
    },
    // Update teal color palette
    teal: {
      main: '#4ECDC4',
      light: '#7FE0D9',
      dark: '#3C8975',
      contrastText: '#ffffff',
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
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
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
            backgroundColor: 'rgba(28, 57, 43, 0.2)', // Dark green with transparency
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
          {/* Public Routes with MainLayout */}
          <Route path="/" element={
            <MainLayout>
              <NewLandingPage />
            </MainLayout>
          } />
          
          <Route path="/old" element={
            <MainLayout>
              <BrandedLanding />
            </MainLayout>
          } />
          
          <Route path="/contact" element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          } />
          
          <Route path="/recycling-offers" element={
            <MainLayout>
              <RecyclingOffersPage />
            </MainLayout>
          } />
          
          <Route path="/about-us" element={
            <MainLayout>
              <AboutUsPage />
            </MainLayout>
          } />
          
          <Route path="/how-it-works" element={
            <MainLayout>
              <HowItWorksPage />
            </MainLayout>
          } />
          
          <Route path="/environmental-impact-report" element={
            <MainLayout>
              <EnvironmentalImpactReportPage />
            </MainLayout>
          } />
          
          <Route path="/asset-tracking-report" element={
            <MainLayout>
              <AssetTrackingReportPage />
            </MainLayout>
          } />
          
          <Route path="/schedule-pickup" element={
            <MainLayout hideFooter={true}>
              <SchedulePickup />
            </MainLayout>
          } />
          
          <Route path="/schedule-pickup/:clientId" element={
            <MainLayout hideFooter={true}>
              <SchedulePickup />
            </MainLayout>
          } />
          
          {/* Auth Routes */}
          <Route path="/login" element={<ClientLogin />} />
          <Route path="/register" element={<ClientRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Client Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <ClientDashboardLayout />
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
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="reports" element={<h1>Admin Reports</h1>} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="clients/:clientId" element={<AdminClientProfile />} />
            <Route path="pickup-calendar" element={<AdminPickupCalendar />} />
            <Route path="pickup-detail" element={<AdminPickupDetail />} />
            <Route path="pickups/:pickupId" element={<AdminPickupDetail />} />
            <Route path="devices/:deviceId" element={<AdminDeviceDetail />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          } />
        </Routes>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 