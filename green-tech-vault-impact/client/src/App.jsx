import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { LayoutEditorProvider } from './context/LayoutEditorContext';
// Import other components and pages

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <LayoutEditorProvider>
          <Router>
            <Routes>
              {/* Your routes here */}
            </Routes>
          </Router>
        </LayoutEditorProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App; 