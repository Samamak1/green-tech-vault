import React, { useEffect } from 'react';
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
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

// Layout components
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import MainLayout from './components/layout/MainLayout';
import ClientSidebar from './components/layout/ClientSidebar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import GridOverlay from './components/GridOverlay';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import PerformanceMonitor from './components/PerformanceMonitor';

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
import GetInvolvedPage from './pages/GetInvolvedPage';
import EducationPage from './pages/EducationPage';

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

// Import utilities
import ErrorBoundary from './components/ErrorBoundary';
import analytics, { trackPageView } from './utils/analytics';
import { loadAccessibilityPreferences, addSkipLink } from './utils/accessibility';

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

// Analytics tracking component
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null;
}

// Accessibility setup component
function AccessibilitySetup() {
  useEffect(() => {
    // Load accessibility preferences
    loadAccessibilityPreferences();
    
    // Add skip link to main content
    addSkipLink('main-content', 'Skip to main content');
    
    // Add main content ID to the main container
    const mainContent = document.querySelector('#root > div');
    if (mainContent) {
      mainContent.id = 'main-content';
      mainContent.setAttribute('role', 'main');
    }
  }, []);

  return null;
}

// PWA install prompt component
function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = React.useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install prompt
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      // Track the installation
      analytics.trackEvent('pwa_install_prompt', {
        event_category: 'PWA',
        event_label: outcome,
        outcome: outcome
      });
      
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    analytics.trackEvent('pwa_install_dismissed', {
      event_category: 'PWA',
      event_label: 'Install Prompt Dismissed'
    });
  };

  if (!showInstallPrompt) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#4ECDC4',
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
        Install RYGNeco App
      </div>
      <div style={{ marginBottom: '12px', fontSize: '14px' }}>
        Install our app for a better experience with offline access and faster loading.
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleInstallClick}
          style={{
            background: 'white',
            color: '#4ECDC4',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid white',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Later
        </button>
      </div>
    </div>
  );
}

function App() {
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Initialize analytics
    if (window.gtag) {
      analytics.setUserProperties({
        app_version: process.env.REACT_APP_VERSION || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      });
    }

    // Track app initialization
    analytics.trackEvent('app_initialized', {
      event_category: 'App Lifecycle',
      event_label: 'App Started',
      timestamp: new Date().toISOString()
    });

    // Set up error tracking
    window.addEventListener('error', (event) => {
      analytics.trackError(event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      analytics.trackError(new Error(event.reason), {
        type: 'unhandled_promise_rejection'
      });
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        analytics.trackEvent('page_hidden', {
          event_category: 'Engagement',
          event_label: 'Page Hidden'
        });
      } else {
        analytics.trackEvent('page_visible', {
          event_category: 'Engagement',
          event_label: 'Page Visible'
        });
      }
    });

    // Track time on page
    let startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Date.now() - startTime;
      analytics.trackTimeOnPage(window.location.pathname, timeSpent);
    };

    window.addEventListener('beforeunload', trackTimeOnPage);
    
    return () => {
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <ProfileProvider>
          <LayoutEditorProvider>
            <MessageProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                <Router>
                  <AnalyticsTracker />
                  <AccessibilitySetup />
                  <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <main style={{ flex: 1 }}>
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
                        
                        <Route path="/get-involved" element={
                          <MainLayout>
                            <GetInvolvedPage />
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
                          <MainLayout>
                            <SchedulePickup />
                          </MainLayout>
                        } />
                        
                        <Route path="/schedule-pickup/:clientId" element={
                          <MainLayout>
                            <SchedulePickup />
                          </MainLayout>
                        } />
                        
                        {/* E-waste Item Detail Page */}
                        {/* Temporarily hidden - detail pages not accessible to users
                        <Route path="/e-waste-item/:itemName" element={
                          <MainLayout>
                            <EwasteItemDetailPage />
                          </MainLayout>
                        } />
                        
                        {/* Specific E-waste Item Pages */}
                        {/* <Route path="/e-waste-item/keyboards" element={
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
                        {/* <Route path="/e-waste-item/desktop-computer" element={
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
                        {/* <Route path="/e-waste-item/laptop" element={
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
                        
                        {/* Smartphones */}
                        {/* <Route path="/e-waste-item/smartphones" element={
                          <MainLayout>
                            <EwasteItemDetailPage preloadedItemData={{
                              name: "Smartphones",
                              category: "Mobile Devices",
                              description: "Smartphones are sophisticated devices packed with valuable materials in a small form factor. They contain lithium-ion batteries, precious metals like gold and silver in circuit boards, rare earth elements in speakers and vibration motors, and various specialized sensors. Due to their complex construction and hazardous materials, smartphones require careful disassembly and specialized recycling processes.",
                              conditions: [
                                "All smartphone brands and models",
                                "Working or non-working condition",
                                "Phones with cracked screens accepted",
                                "Water-damaged devices included",
                                "Remove SIM cards and memory cards before drop-off"
                              ],
                              notes: [
                                "Perform factory reset to wipe personal data",
                                "Remove cases and screen protectors",
                                "Batteries will be removed and recycled separately"
                              ],
                              process: [
                                "Data Destruction – Secure wiping of internal storage",
                                "Battery Removal – Lithium-ion batteries safely extracted",
                                "Component Disassembly – Screens, circuit boards, and cameras separated",
                                "Precious Metal Recovery – Gold, silver, and platinum extracted from components",
                                "Rare Earth Processing – Elements like neodymium and tantalum recovered"
                              ],
                              impact: [
                                "Prevent lithium-ion batteries from causing landfill fires",
                                "Recover critical materials like cobalt and lithium for new batteries",
                                "Reduce demand for conflict minerals through responsible recycling",
                                "Keep toxic materials like lead and mercury from contaminating water sources"
                              ],
                              relatedItems: ["Cell Phones", "Tablets", "Smart Watches", "Chargers"],
                              categoryDetail: "Mobile Devices"
                            }} />
                          </MainLayout>
                        } />
                        
                        {/* Monitors */}
                        {/* <Route path="/e-waste-item/monitors" element={
                          <MainLayout>
                            <EwasteItemDetailPage preloadedItemData={{
                              name: "Monitors",
                              category: "Computers",
                              description: "Computer monitors contain valuable materials including LCD or LED panels, metal frames, plastic casings, and electronic components. Modern monitors may contain mercury in backlights (older LCD models) and various rare earth elements. The recycling process requires careful handling due to potential hazardous materials and the valuable metals contained in electronic components.",
                              conditions: [
                                "LCD, LED, and OLED monitors",
                                "All sizes from small to ultra-wide displays",
                                "Working or non-working condition",
                                "Monitors with cracked screens accepted",
                                "Gaming and professional monitors included"
                              ],
                              notes: [
                                "Remove all cables and stands if possible",
                                "CRT monitors processed separately due to lead content",
                                "No touch screen monitors with integrated computers"
                              ],
                              process: [
                                "Manual Disassembly – Plastic casings and metal frames separated",
                                "Screen Processing – LCD panels and backlights carefully removed",
                                "Electronic Component Recovery – Circuit boards and power supplies extracted",
                                "Metal Recovery – Aluminum and steel frames processed for recycling",
                                "Hazardous Material Handling – Mercury and other toxins safely contained"
                              ],
                              impact: [
                                "Prevent mercury from entering ecosystems",
                                "Recover aluminum and steel for new manufacturing",
                                "Reduce demand for rare earth mining",
                                "Keep plastic waste from landfills and oceans"
                              ],
                              relatedItems: ["Desktop Computer", "Laptops", "Cables", "Keyboards"],
                              categoryDetail: "Computer Displays"
                            }} />
                          </MainLayout>
                        } />
                        
                        {/* Printers */}
                        {/* <Route path="/e-waste-item/printers" element={
                          <MainLayout>
                            <EwasteItemDetailPage preloadedItemData={{
                              name: "Printers",
                              category: "Office Equipment",
                              description: "Printers are complex devices containing motors, sensors, plastic components, metal parts, and electronic circuits. They often contain valuable metals in their circuit boards and motors. Inkjet and laser printers require different recycling approaches due to their distinct mechanisms and potential toner or ink residue.",
                              conditions: [
                                "Inkjet, laser, and dot matrix printers",
                                "All-in-one devices (printer/scanner/fax combinations)",
                                "Working or non-working condition",
                                "Commercial and home office printers",
                                "3D printers and specialty printing equipment"
                              ],
                              notes: [
                                "Remove all ink cartridges and toner before drop-off",
                                "Remove paper from all trays",
                                "Power cords can be included"
                              ],
                              process: [
                                "Cartridge Removal – Ink and toner cartridges processed separately",
                                "Mechanical Disassembly – Motors, gears, and mechanical parts separated",
                                "Plastic Sorting – Different plastic types identified and sorted",
                                "Metal Recovery – Steel frames and copper wiring extracted",
                                "Electronic Processing – Circuit boards processed for precious metal recovery"
                              ],
                              impact: [
                                "Prevent toner and ink chemicals from contaminating soil",
                                "Recover metals from motors and electronic components",
                                "Recycle plastic components into new products",
                                "Reduce demand for virgin materials in new printer manufacturing"
                              ],
                              relatedItems: ["Scanners", "Copiers", "Toner Cartridges", "Cables"],
                              categoryDetail: "Office Equipment"
                            }} />
                          </MainLayout>
                        } />
                        
                        {/* Tablets */}
                        {/* <Route path="/e-waste-item/tablets" element={
                          <MainLayout>
                            <EwasteItemDetailPage preloadedItemData={{
                              name: "Tablets",
                              category: "Mobile Devices",
                              description: "Tablets combine the complexity of smartphones with larger screens and batteries. They contain lithium-ion or lithium-polymer batteries, touchscreens with rare earth elements, aluminum or plastic casings, and sophisticated circuit boards with precious metals. Their flat design requires specialized disassembly techniques to safely access internal components.",
                              conditions: [
                                "iPads, Android tablets, and Windows tablets",
                                "All screen sizes from 7-inch to 12-inch+",
                                "Working or non-working condition",
                                "Cracked screens and water damage accepted",
                                "E-readers and tablet-laptop hybrids included"
                              ],
                              notes: [
                                "Perform factory reset to remove personal data",
                                "Remove any protective cases or screen protectors",
                                "Include charging cables if available"
                              ],
                              process: [
                                "Secure Data Wiping – Multiple-pass data destruction",
                                "Battery Extraction – Careful removal of large lithium batteries",
                                "Screen Separation – Touchscreen and LCD components separated",
                                "Circuit Board Processing – Motherboards processed for precious metals",
                                "Casing Recovery – Aluminum and plastic materials sorted for recycling"
                              ],
                              impact: [
                                "Safely handle large lithium-ion batteries to prevent fires",
                                "Recover aluminum for new device manufacturing",
                                "Extract rare earth elements from speakers and motors",
                                "Prevent glass and plastic waste from entering landfills"
                              ],
                              relatedItems: ["Smartphones", "E-Readers", "Chargers", "Stylus Pens"],
                              categoryDetail: "Mobile Computing"
                            }} />
                          </MainLayout>
                        } />
                        
                        {/* Televisions */}
                        {/* <Route path="/e-waste-item/televisions" element={
                          <MainLayout>
                            <EwasteItemDetailPage preloadedItemData={{
                              name: "Televisions",
                              category: "Entertainment",
                              description: "Modern televisions contain sophisticated display technology, electronic components, and various materials requiring specialized recycling. LCD and LED TVs contain backlights that may have mercury, while OLED displays have different material compositions. Older CRT televisions contain significant amounts of lead and require separate handling protocols.",
                              conditions: [
                                "LCD, LED, OLED, and plasma televisions",
                                "All sizes from small portable to large home theater",
                                "Working or non-working condition",
                                "Smart TVs and regular televisions",
                                "CRT televisions accepted with special handling"
                              ],
                              notes: [
                                "Remove batteries from remote controls",
                                "CRT TVs require special appointment due to lead content",
                                "Remove any streaming devices or cables"
                              ],
                              process: [
                                "Component Separation – Stands, speakers, and back panels removed",
                                "Screen Processing – LCD panels and backlights carefully extracted",
                                "Circuit Board Recovery – Main boards and power supplies processed",
                                "Hazardous Material Handling – Mercury and lead safely contained",
                                "Material Sorting – Plastics, metals, and glass separated for recycling"
                              ],
                              impact: [
                                "Prevent mercury and lead from contaminating soil and water",
                                "Recover valuable metals from circuit boards and speakers",
                                "Recycle plastic casings into new electronic products",
                                "Reduce demand for rare earth elements through material recovery"
                              ],
                              relatedItems: ["Gaming Consoles", "Audio Equipment", "Remote Controls", "Cables"],
                              categoryDetail: "Entertainment Electronics"
                            }} />
                          </MainLayout>
                        } />
                        
                        {/* Add more routes for all accepted items... */}
                        {/* <Route path="/e-waste-item/:itemSlug" element={
                          <MainLayout>
                            <EwasteItemDetailPage />
                          </MainLayout>
                        } /> */}
                        
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
                    </main>
                    <Footer />
                    <GridOverlay />
                    <PWAInstallPrompt />
                    <AccessibilityToolbar />
                    <PerformanceMonitor />
                  </div>
                </Router>
              </LocalizationProvider>
            </MessageProvider>
          </LayoutEditorProvider>
        </ProfileProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 