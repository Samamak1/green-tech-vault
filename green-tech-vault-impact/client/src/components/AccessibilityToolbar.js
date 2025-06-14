import React, { useState, useEffect } from 'react';
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
  ButtonGroup
} from '@mui/material';
import {
  Accessibility as AccessibilityIcon,
  TextIncrease as TextIncreaseIcon,
  TextDecrease as TextDecreaseIcon,
  Contrast as ContrastIcon,
  VolumeUp as VolumeUpIcon,
  Keyboard as KeyboardIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Speed as MotionIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  RecordVoiceOver as ScreenReaderIcon,
  Help as HelpIcon
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
  };

  const handleKeyboardNavigationInfo = () => {
    const shortcuts = [
      'Tab: Navigate forward',
      'Shift + Tab: Navigate backward',
      'Enter/Space: Activate buttons',
      'Escape: Close dialogs',
      'Arrow keys: Navigate menus',
      'Alt + Shift + A: Open accessibility toolbar'
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
      icon: <MotionIcon />
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
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 10000,
        '& .accessibility-toolbar': {
          filter: preferences.highContrast ? 'contrast(1.5)' : 'none'
        }
      }}
    >
      {/* Main Toggle Button */}
      <Tooltip title="Accessibility Options (Alt + Shift + A)" arrow>
        <IconButton
          onClick={handleToggleToolbar}
          aria-label="Open accessibility toolbar"
          aria-expanded={isOpen}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            marginBottom: 1,
            boxShadow: 3
          }}
        >
          <AccessibilityIcon />
        </IconButton>
      </Tooltip>

      {/* Accessibility Panel */}
      <Collapse in={isOpen}>
        <Paper
          className="accessibility-toolbar"
          elevation={8}
          sx={{
            p: 2,
            maxWidth: 350,
            backgroundColor: preferences.highContrast ? '#000' : 'background.paper',
            color: preferences.highContrast ? '#fff' : 'text.primary',
            border: preferences.highContrast ? '2px solid #fff' : 'none'
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" component="h2">
              Accessibility Options
            </Typography>
            <Box>
              <Tooltip title="Help">
                <IconButton onClick={handleShowHelp} size="small">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Close">
                <IconButton onClick={handleToggleToolbar} size="small">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Help Panel */}
          <Collapse in={showHelp}>
            <Paper 
              variant="outlined" 
              sx={{ p: 2, mb: 2, backgroundColor: 'action.hover' }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Keyboard Shortcuts:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                • Alt + Shift + A: Toggle this toolbar<br/>
                • Tab / Shift+Tab: Navigate elements<br/>
                • Enter/Space: Activate buttons<br/>
                • Escape: Close dialogs<br/>
                • Alt + 1-6: Jump to headings<br/>
                • Alt + Shift + M: Skip to main content
              </Typography>
            </Paper>
          </Collapse>

          {/* Accessibility Features */}
          {accessibilityFeatures.map((feature, index) => (
            <Box key={index} mb={2}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" flex={1}>
                  <Box mr={1} sx={{ color: feature.enabled ? 'primary.main' : 'text.secondary' }}>
                    {feature.icon}
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {feature.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
                <Switch
                  checked={feature.enabled}
                  onChange={feature.toggle}
                  size="small"
                  aria-label={feature.title}
                />
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Font Size Control */}
          <Box mb={2}>
            <Typography variant="body2" gutterBottom>
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
                { value: 125, label: '125%' },
                { value: 150, label: '150%' }
              ]}
              aria-label="Font size"
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Utility Buttons */}
          <Box display="flex" flexDirection="column" gap={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<KeyboardIcon />}
              onClick={handleKeyboardNavigationInfo}
              aria-label="Announce keyboard shortcuts"
            >
              Keyboard Shortcuts
            </Button>
            
            <Button
              variant="outlined"
              size="small"
              startIcon={<ScreenReaderIcon />}
              onClick={handleScreenReaderTest}
              aria-label="Test screen reader"
            >
              Test Screen Reader
            </Button>
            
            <Button
              variant="outlined"
              size="small"
              startIcon={<SettingsIcon />}
              onClick={handleReset}
              aria-label="Reset accessibility settings"
            >
              Reset Settings
            </Button>
          </Box>

          {/* Status Indicator */}
          <Box mt={2} p={1} bgcolor="action.hover" borderRadius={1}>
            <Typography variant="caption" display="block">
              Status: {Object.values(preferences).filter(Boolean).length} features enabled
            </Typography>
            {preferences.screenReader && (
              <Typography variant="caption" color="primary.main" display="block">
                Screen reader detected
              </Typography>
            )}
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default AccessibilityToolbar; 