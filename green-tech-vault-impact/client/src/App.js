import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import NewLandingPage from './pages/NewLandingPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import HowItWorksPage from './pages/HowItWorksPage';
import JoinUsPage from './pages/JoinUsPage';
import EducationPage from './pages/EducationPage';
import AssetTrackingReportPage from './pages/AssetTrackingReportPage';
import EnvironmentalImpactReportPage from './pages/EnvironmentalImpactReportPage';
import CEOProfile from './pages/CEOProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewLandingPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/get-involved" element={<GetInvolvedPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/join" element={<JoinUsPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/asset-tracking-report" element={<AssetTrackingReportPage />} />
      <Route path="/environmental-impact-report" element={<EnvironmentalImpactReportPage />} />
      <Route path="/ceo-profile" element={<CEOProfile />} />
      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App; 