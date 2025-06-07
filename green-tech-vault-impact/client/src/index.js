import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { LayoutEditorProvider } from './context/LayoutEditorContext';
import reportWebVitals from './reportWebVitals';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#185B5F',
    },
    secondary: {
      main: '#62CBD0',
    },
    teal: {
      main: '#185B5F',
      light: '#62CBD0',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ProfileProvider>
            <LayoutEditorProvider>
              <App />
            </LayoutEditorProvider>
          </ProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 