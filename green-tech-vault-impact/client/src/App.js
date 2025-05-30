import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { LayoutEditorProvider } from './context/LayoutEditorContext';
import { MessageProvider } from './context/MessageContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from '@mui/material';

// Layout components
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import MainLayout from './components/layout/MainLayout';
import ClientSidebar from './components/layout/ClientSidebar';
import Header from './components/layout/Header';

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
import ClientSchedulePickup from './pages/ClientSchedulePickup';
import BrandedLogin from './pages/BrandedLogin';
import ClientLogin from './pages/ClientLogin';
import ClientRegister from './pages/ClientRegister';
import BrandedAdminLogin from './pages/BrandedAdminLogin';
import EnvironmentalImpactReportPage from './pages/EnvironmentalImpactReportPage';
import AssetTrackingReportPage from './pages/AssetTrackingReportPage';
import Announcements from './pages/Announcements';
import TrialPage from './pages/TrialPage';
import PickupCalendar from './pages/PickupCalendar';
import RYGNProfile from './pages/RYGNProfile';
import ClientAnnouncements from './pages/ClientAnnouncements';
import ClientMessages from './pages/ClientMessages';
import ClientProfile from './pages/ClientProfile';
import Settings from './pages/Settings';
import QRMobileLogin from './pages/QRMobileLogin';
import Help from './pages/Help';
import ClientReports from './pages/ClientReports';
import CEOProfile from './pages/CEOProfile';
import EwasteItemDetailPage from './pages/EwasteItemDetailPage';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminClientDetail from './pages/AdminClientDetail';
import AdminClientProfile from './pages/AdminClientProfile';
import AdminPickupDetail from './pages/AdminPickupDetail';
import AdminDeviceDetail from './pages/AdminDeviceDetail';
import AdminPickupCalendar from './pages/AdminPickupCalendar';
import AdminAnnouncements from './pages/AdminAnnouncements';
import Unauthorized from './pages/Unauthorized';
import AdminMessages from './pages/AdminMessages';
import AdminProfile from './pages/AdminProfile';

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

// Main component layout adjustments - renamed to avoid conflict
const CustomClientDashboardLayout = () => {
  return (
    <>
      <ClientSidebar />
      <Box sx={{ flexGrow: 1, ml: '225px' }}>
        <Header />
        <Outlet />
      </Box>
    </>
  );
};

function App() {
  const { isAdmin } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <ProfileProvider>
        <LayoutEditorProvider>
          <MessageProvider>
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
                
                <Route path="/ceo-profile" element={
                  <MainLayout>
                    <CEOProfile />
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
                
                {/* E-waste Item Detail Page */}
                <Route path="/e-waste-item/:itemName" element={
                  <MainLayout>
                    <EwasteItemDetailPage />
                  </MainLayout>
                } />
                
                {/* Specific E-waste Item Pages */}
                <Route path="/e-waste-item/keyboards" element={
                  <MainLayout>
                    <EwasteItemDetailPage preloadedItemData={{
                      name: "Keyboards",
                      category: "Peripherals",
                      description: "Computer keyboards are one of the most commonly used peripheral devices. They come in various forms—wired, wireless, mechanical, and membrane. While small in size, they contain a mix of plastics, metals, and electronic components that can be hazardous if not properly recycled.",
                      conditions: [
                        "Wired or wireless keyboards",
                        "Mechanical, membrane, or ergonomic models",
                        "Keyboards with minor cosmetic damage (scratches, missing keycaps)",
                        "No batteries leaking or excessive corrosion"
                      ],
                      notes: [
                        "Remove batteries before drop-off (especially AA/AAA batteries).",
                        "No wet or moldy items."
                      ],
                      process: [
                        "Manual Disassembly – Plastic casing, rubber, and electronic parts are separated.",
                        "Material Sorting – Metals like copper and aluminum are extracted.",
                        "Shredding – Remaining parts are shredded and sorted by material type.",
                        "Reuse & Repurposing – Usable components are recovered for refurbishing or raw material supply."
                      ],
                      impact: [
                        "Prevent plastic waste from entering landfills",
                        "Recover precious metals like gold, copper, and silver",
                        "Reduce the demand for virgin materials used in new electronics",
                        "Lower greenhouse gas emissions associated with raw material extraction"
                      ],
                      relatedItems: ["Mouse", "Monitor", "USB Cable", "Laptop Dock"],
                      categoryDetail: "Computer Peripherals"
                    }} />
                  </MainLayout>
                } />
                
                {/* Desktop Computer */}
                <Route path="/e-waste-item/desktop-computer" element={
                  <MainLayout>
                    <EwasteItemDetailPage preloadedItemData={{
                      name: "Desktop Computer",
                      category: "Computers",
                      description: "Desktop computers are complex electronic devices containing valuable materials including precious metals, rare earth elements, and hazardous substances. A typical desktop contains steel, aluminum, copper, gold, silver, and various plastics. Proper recycling can recover up to 95% of these materials while preventing toxic substances like lead, mercury, and cadmium from entering the environment.",
                      conditions: [
                        "Complete desktop towers (CPU units)",
                        "All brands and models accepted",
                        "Working or non-working condition",
                        "Units with minor physical damage",
                        "Business and consumer desktop computers"
                      ],
                      notes: [
                        "Remove all personal data before disposal",
                        "No CRT monitors included (processed separately)",
                        "Remove batteries from internal components if accessible"
                      ],
                      process: [
                        "Data Destruction – Secure wiping of all storage devices",
                        "Disassembly – Manual removal of components like motherboards, power supplies, and drives",
                        "Material Separation – Steel cases, aluminum heat sinks, and copper wiring are sorted",
                        "Precious Metal Recovery – Gold, silver, and platinum extracted from circuit boards",
                        "Plastic Processing – Various plastics separated and prepared for recycling"
                      ],
                      impact: [
                        "Recover $91 billion worth of materials from global e-waste annually",
                        "Prevent 58,000 kg of mercury from entering ecosystems",
                        "Reduce CO2 emissions by 93 billion kg through material recovery",
                        "Conserve rare earth elements critical for new technology production"
                      ]
                    }} />
                  </MainLayout>
                } />
                
                {/* Laptop */}
                <Route path="/e-waste-item/laptop" element={
                  <MainLayout>
                    <EwasteItemDetailPage preloadedItemData={{
                      name: "Laptop",
                      category: "Computers",
                      description: "Laptops contain concentrated amounts of valuable materials in a compact form factor. They include lithium-ion batteries, LCD screens, motherboards with precious metals, and various rare earth elements. Due to their portable design, laptops require specialized recycling processes to safely handle integrated batteries and recover valuable components.",
                      conditions: [
                        "All laptop brands and models",
                        "Working or non-working condition",
                        "Laptops with cracked screens accepted",
                        "Units with missing keys or damaged cases",
                        "Gaming laptops and workstations included"
                      ],
                      notes: [
                        "Remove all personal data and perform secure data wiping",
                        "Batteries will be removed and recycled separately",
                        "Remove any external accessories before drop-off"
                      ],
                      process: [
                        "Secure Data Destruction – Multiple-pass data wiping or physical drive destruction",
                        "Battery Removal – Lithium-ion batteries safely extracted and processed separately", 
                        "Component Disassembly – LCD screens, motherboards, and memory modules separated",
                        "Precious Metal Extraction – Gold, silver, and palladium recovered from circuit boards",
                        "Material Recovery – Aluminum chassis, copper wiring, and rare earth magnets processed"
                      ],
                      impact: [
                        "Prevent lithium-ion battery fires in landfills",
                        "Recover critical materials like lithium, cobalt, and rare earth elements",
                        "Reduce demand for new mining of precious metals",
                        "Keep toxic substances like lead and mercury from contaminating soil and water"
                      ]
                    }} />
                  </MainLayout>
                } />
                
                {/* Add more routes for all accepted items... */}
                <Route path="/e-waste-item/:itemSlug" element={
                  <MainLayout>
                    <EwasteItemDetailPage />
                  </MainLayout>
                } />
                
                {/* Auth Routes */}
                <Route path="/login" element={<ClientLogin />} />
                <Route path="/register" element={<ClientRegister />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Client Routes - Use our custom layout component */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <CustomClientDashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={isAdmin ? <Navigate to="/admin" /> : <Dashboard />} />
                  <Route path="company-profile" element={<CompanyProfile />} />
                  <Route path="rygn-profile" element={<RYGNProfile />} />
                  <Route path="pickups" element={<PickupCalendar />} />
                  <Route path="pickups/:id" element={<PickupDetail />} />
                  <Route path="devices" element={<Devices />} />
                  <Route path="reports" element={<ClientReports />} />
                  <Route path="messages" element={<ClientMessages />} />
                  <Route path="announcements" element={<ClientAnnouncements />} />
                  <Route path="help" element={<Help />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="schedule-pickup" element={<ClientSchedulePickup />} />
                  <Route path="client-profile" element={<ClientProfile />} />
                </Route>
                
                {/* Report Detail Route - Outside of dashboard layout */}
                <Route path="/reports/:id" element={
                  <ProtectedRoute>
                    <ReportDetail />
                  </ProtectedRoute>
                } />
                
                {/* Add routes for the new pages */}
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }/>
                
                <Route path="/qr-mobile-login" element={
                  <ProtectedRoute>
                    <QRMobileLogin />
                  </ProtectedRoute>
                }/>
                
                <Route path="/help" element={
                  <ProtectedRoute>
                    <Help />
                  </ProtectedRoute>
                }/>
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <DashboardLayout />
                  </AdminRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="reports" element={<Reports />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="announcements" element={<TrialPage />} />
                    <Route path="schedule-pickup" element={<AdminAnnouncements />} />
                    <Route path="trial-page" element={<TrialPage />} />
                  <Route path="clients/:clientId" element={<AdminClientProfile />} />
                  <Route path="pickup-calendar" element={<AdminPickupCalendar />} />
                  <Route path="pickup-detail" element={<AdminPickupDetail />} />
                  <Route path="pickups/:pickupId" element={<AdminPickupDetail />} />
                  <Route path="devices/:deviceId" element={<AdminDeviceDetail />} />
                    <Route path="profile" element={<AdminProfile />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={
                  <MainLayout>
                    <NotFound />
                  </MainLayout>
                } />
              </Routes>
            </LocalizationProvider>
          </MessageProvider>
        </LayoutEditorProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App; 