import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import HowItWorksPage from './pages/HowItWorksPage';
import JoinUsPage from './pages/JoinUsPage';
import EducationPage from './pages/EducationPage';
import AssetTrackingReportPage from './pages/AssetTrackingReportPage';
import EnvironmentalImpactReportPage from './pages/EnvironmentalImpactReportPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/join" element={<JoinUsPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/asset-tracking-report" element={<AssetTrackingReportPage />} />
        <Route path="/environmental-impact-report" element={<EnvironmentalImpactReportPage />} />
      </Routes>
    </Router>
  );
}

export default App; 