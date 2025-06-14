import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Drawer,
  Typography,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Slider,
  Paper,
  Fab,
  Collapse,
  ButtonGroup,
  Grid
} from '@mui/material';
import {
  Accessibility as AccessibilityNewIcon,
  TextIncrease as TextIncreaseIcon,
  TextDecrease as TextDecreaseIcon,
  VolumeUp as SpeakerIcon,
  VolumeUp as VolumeUpIcon,
  Contrast as ContrastIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  Keyboard as KeyboardIcon,
  Help as HelpIcon,
  RecordVoiceOver as ScreenReaderIcon
} from '@mui/icons-material';
import {
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  enableHighContrastMode,
  disableHighContrastMode,
  announce,
  toggleHighContrast,
  toggleReducedMotion,
  toggleLargeText,
  getAccessibilityStatus
} from '../utils/accessibility';
import { useTheme } from '@mui/material/styles';

const AccessibilityToolbar = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    keyboardNavigation: true,
    screenReader: false
  });
  const [fontSize, setFontSize] = useState(100);
  const [showHelp, setShowHelp] = useState(false);
  const liveRegionRef = useRef(null);

  useEffect(() => {
    // Load accessibility preferences on mount
    const loadPreferences = () => {
      try {
        const saved = localStorage.getItem('accessibility-preferences');
        if (saved) {
          const savedPrefs = JSON.parse(saved);
          setPreferences(savedPrefs);
          setFontSize(savedPrefs.largeText ? 125 : 100);
        }
      } catch (error) {
        console.error('Error loading accessibility preferences:', error);
      }
    };

    loadPreferences();

    // Listen for preference changes
    const handlePreferenceChange = (event) => {
      setPreferences(event.detail);
    };

    window.addEventListener('accessibility-preferences-changed', handlePreferenceChange);

    // Detect system preferences
    if (window.matchMedia) {
      const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      if (highContrastQuery.matches) {
        setPreferences(prev => ({ ...prev, highContrast: true }));
      }
      
      if (reducedMotionQuery.matches) {
        setPreferences(prev => ({ ...prev, reducedMotion: true }));
      }
    }

    return () => {
      window.removeEventListener('accessibility-preferences-changed', handlePreferenceChange);
    };
  }, []);

  const handleToggleToolbar = () => {
    setIsOpen(!isOpen);
    announce(
      isOpen ? 'Accessibility toolbar closed' : 'Accessibility toolbar opened'
    );
  };

  const handleHighContrast = () => {
    toggleHighContrast();
    const newValue = !preferences.highContrast;
    setPreferences(prev => ({ ...prev, highContrast: newValue }));
    announce(`High contrast ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleReducedMotion = () => {
    toggleReducedMotion();
    const newValue = !preferences.reducedMotion;
    setPreferences(prev => ({ ...prev, reducedMotion: newValue }));
    announce(`Reduced motion ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleLargeText = () => {
    toggleLargeText();
    const newValue = !preferences.largeText;
    setPreferences(prev => ({ ...prev, largeText: newValue }));
    setFontSize(newValue ? 125 : 100);
    announce(`Large text ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleFontSizeChange = (event, newValue) => {
    setFontSize(newValue);
    const root = document.documentElement;
    root.style.setProperty('--base-font-size', `${newValue}%`);
    announce(`Font size changed to ${newValue}%`);
    localStorage.setItem('fontSize', newValue.toString());
  };

  const handleKeyboardShortcuts = () => {
    const shortcuts = [
      'Alt + Shift + A: Toggle accessibility toolbar',
      'Alt + Shift + H: Toggle high contrast',
      'Alt + Shift + M: Toggle reduced motion',
      'Alt + Shift + T: Toggle large text',
      'Tab: Navigate between elements'
    ];
    
    announce(`Keyboard shortcuts: ${shortcuts.join(', ')}`);
  };

  const handleScreenReaderTest = () => {
    announce('Screen reader test: This is a test announcement to verify screen reader functionality is working correctly.', 'assertive');
  };

  const handleShowHelp = () => {
    setShowHelp(!showHelp);
    if (!showHelp) {
      announce('Accessibility help panel opened');
    } else {
      announce('Accessibility help panel closed');
    }
  };

  const handleReset = () => {
    // Reset all accessibility preferences to defaults
    const defaultPrefs = {
      highContrast: false,
      reducedMotion: false,
      largeText: false,
      keyboardNavigation: true,
      screenReader: false
    };
    
    setPreferences(defaultPrefs);
    setFontSize(100);
    localStorage.setItem('accessibility-preferences', JSON.stringify(defaultPrefs));
    
    // Apply reset to DOM
    const root = document.documentElement;
    root.classList.remove('high-contrast', 'reduced-motion', 'large-text');
    root.style.setProperty('--base-font-size', '100%');
    
    announce('Accessibility settings reset to defaults');
  };

  const accessibilityFeatures = [
    {
      title: 'High Contrast Mode',
      description: 'Increases contrast for better readability',
      enabled: preferences.highContrast,
      toggle: handleHighContrast,
      icon: <ContrastIcon />
    },
    {
      title: 'Reduce Motion',
      description: 'Reduces animations and transitions',
      enabled: preferences.reducedMotion,
      toggle: handleReducedMotion,
      icon: <ContrastIcon />
    },
    {
      title: 'Large Text',
      description: 'Increases font size for better readability',
      enabled: preferences.largeText,
      toggle: handleLargeText,
      icon: <TextIncreaseIcon />
    }
  ];

  // Set up keyboard shortcut for accessibility toolbar
  useEffect(() => {
    const handleKeyboardShortcut = (event) => {
      if (event.altKey && event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        handleToggleToolbar();
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => document.removeEventListener('keydown', handleKeyboardShortcut);
  }, [isOpen]);

  return (
    <>
      {/* Accessibility Button - Fixed position */}
      <Button
        onClick={handleToggleToolbar}
        onKeyDown={handleKeyboardShortcuts}
        aria-label={isOpen ? 'Close accessibility toolbar' : 'Open accessibility toolbar'}
        aria-expanded={isOpen}
        aria-controls="accessibility-toolbar"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 2000, // Higher z-index to ensure it's clickable
          minWidth: 48,
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: '#1C392B',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          '&:hover': {
            backgroundColor: '#4ECDC4',
            transform: 'scale(1.05)',
          },
          '&:focus': {
            outline: '2px solid #4ECDC4',
            outlineOffset: '2px',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <AccessibilityNewIcon />
      </Button>

      {/* Accessibility Toolbar Panel */}
      <Paper
        id="accessibility-toolbar"
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          width: 320,
          maxHeight: '80vh',
          overflowY: 'auto',
          zIndex: 1999, // High z-index but below button
          display: isOpen ? 'block' : 'none',
          backgroundColor: 'white',
          border: '2px solid #4ECDC4',
          borderRadius: 2,
        }}
        role="dialog"
        aria-labelledby="toolbar-title"
        aria-describedby="toolbar-description"
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="toolbar-title" variant="h6" sx={{ fontWeight: 'bold', color: '#1C392B' }}>
              Accessibility Tools
            </Typography>
            <IconButton
              onClick={handleToggleToolbar}
              aria-label="Close accessibility toolbar"
              size="small"
              sx={{ 
                color: '#1C392B',
                '&:hover': { backgroundColor: 'rgba(76, 205, 196, 0.1)' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Typography id="toolbar-description" variant="body2" sx={{ mb: 2, color: '#666' }}>
            Customize your browsing experience with these accessibility options.
          </Typography>

          {/* Settings Grid */}
          <Grid container spacing={2}>
            {/* High Contrast Toggle */}
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 1.5,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                backgroundColor: preferences.highContrast ? 'rgba(76, 205, 196, 0.1)' : 'transparent'
              }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    High Contrast
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Increase color contrast for better visibility
                  </Typography>
                </Box>
                <Switch
                  checked={preferences.highContrast}
                  onChange={handleHighContrast}
                  color="primary"
                  inputProps={{ 'aria-label': 'Toggle high contrast mode' }}
                />
              </Box>
            </Grid>

            {/* Reduced Motion Toggle */}
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 1.5,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                backgroundColor: preferences.reducedMotion ? 'rgba(76, 205, 196, 0.1)' : 'transparent'
              }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Reduced Motion
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Minimize animations and transitions
                  </Typography>
                </Box>
                <Switch
                  checked={preferences.reducedMotion}
                  onChange={handleReducedMotion}
                  color="primary"
                  inputProps={{ 'aria-label': 'Toggle reduced motion' }}
                />
              </Box>
            </Grid>

            {/* Large Text Toggle */}
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 1.5,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                backgroundColor: preferences.largeText ? 'rgba(76, 205, 196, 0.1)' : 'transparent'
              }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Large Text
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Increase text size for easier reading
                  </Typography>
                </Box>
                <Switch
                  checked={preferences.largeText}
                  onChange={handleLargeText}
                  color="primary"
                  inputProps={{ 'aria-label': 'Toggle large text' }}
                />
              </Box>
            </Grid>

            {/* Font Size Slider */}
            <Grid item xs={12}>
              <Box sx={{ p: 1.5, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Font Size: {fontSize}%
                </Typography>
                <Slider
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  min={75}
                  max={150}
                  step={5}
                  marks={[
                    { value: 75, label: '75%' },
                    { value: 100, label: '100%' },
                    { value: 150, label: '150%' }
                  ]}
                  valueLabelDisplay="auto"
                  aria-label="Font size adjustment"
                  sx={{
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#4ECDC4',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#4ECDC4',
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleKeyboardShortcuts}
                  sx={{ 
                    borderColor: '#4ECDC4', 
                    color: '#1C392B',
                    '&:hover': { 
                      borderColor: '#1C392B',
                      backgroundColor: 'rgba(76, 205, 196, 0.1)' 
                    }
                  }}
                  aria-label="Announce keyboard shortcuts"
                >
                  <KeyboardIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                  Shortcuts
                </Button>
                
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleScreenReaderTest}
                  sx={{ 
                    borderColor: '#4ECDC4', 
                    color: '#1C392B',
                    '&:hover': { 
                      borderColor: '#1C392B',
                      backgroundColor: 'rgba(76, 205, 196, 0.1)' 
                    }
                  }}
                  aria-label="Test screen reader functionality"
                >
                  <ScreenReaderIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                  Test
                </Button>
                
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleShowHelp}
                  sx={{ 
                    borderColor: '#4ECDC4', 
                    color: '#1C392B',
                    '&:hover': { 
                      borderColor: '#1C392B',
                      backgroundColor: 'rgba(76, 205, 196, 0.1)' 
                    }
                  }}
                  aria-label={showHelp ? 'Hide help panel' : 'Show help panel'}
                >
                  <HelpIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                  Help
                </Button>
                
                <Button
                  variant="text"
                  size="small"
                  onClick={handleReset}
                  sx={{ 
                    color: '#666',
                    '&:hover': { 
                      backgroundColor: 'rgba(102, 102, 102, 0.1)' 
                    }
                  }}
                  aria-label="Reset all accessibility settings to defaults"
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Help Panel */}
          {showHelp && (
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: 'rgba(76, 205, 196, 0.05)', 
              borderRadius: 1,
              border: '1px solid rgba(76, 205, 196, 0.2)'
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Keyboard Shortcuts:
              </Typography>
              <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
                • Alt + Shift + A: Toggle accessibility toolbar
              </Typography>
              <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
                • Alt + Shift + H: Toggle high contrast
              </Typography>
              <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
                • Alt + Shift + M: Toggle reduced motion
              </Typography>
              <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
                • Alt + Shift + T: Toggle large text
              </Typography>
              <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
                • Alt + Shift + R: Reset all settings
              </Typography>
              <Typography variant="caption" component="div">
                • Tab: Navigate between elements
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Screen Reader Live Region */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      />
    </>
  );
};

export default AccessibilityToolbar; 