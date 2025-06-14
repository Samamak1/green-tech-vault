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
  Fab
} from '@mui/material';
import {
  Accessibility as AccessibilityIcon,
  TextIncrease as TextIncreaseIcon,
  TextDecrease as TextDecreaseIcon,
  Contrast as ContrastIcon,
  VolumeUp as VolumeUpIcon,
  Keyboard as KeyboardIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import {
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  enableHighContrastMode,
  disableHighContrastMode,
  announceToScreenReader
} from '../utils/accessibility';

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: localStorage.getItem('high-contrast') === 'true',
    fontSize: 16,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    screenReader: false,
    keyboardNavigation: false
  });

  useEffect(() => {
    // Load saved font size
    const savedFontSize = localStorage.getItem('font-size');
    if (savedFontSize) {
      setSettings(prev => ({
        ...prev,
        fontSize: parseFloat(savedFontSize)
      }));
    }

    // Listen for keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setSettings(prev => ({ ...prev, keyboardNavigation: true }));
      }
    };

    const handleMouseDown = () => {
      setSettings(prev => ({ ...prev, keyboardNavigation: false }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
    announceToScreenReader(
      isOpen ? 'Accessibility toolbar closed' : 'Accessibility toolbar opened'
    );
  };

  const handleIncreaseFontSize = () => {
    increaseFontSize();
    const newSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    setSettings(prev => ({ ...prev, fontSize: newSize }));
    announceToScreenReader('Font size increased');
  };

  const handleDecreaseFontSize = () => {
    decreaseFontSize();
    const newSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    setSettings(prev => ({ ...prev, fontSize: newSize }));
    announceToScreenReader('Font size decreased');
  };

  const handleResetFontSize = () => {
    resetFontSize();
    setSettings(prev => ({ ...prev, fontSize: 16 }));
    announceToScreenReader('Font size reset to default');
  };

  const handleToggleHighContrast = () => {
    const newHighContrast = !settings.highContrast;
    if (newHighContrast) {
      enableHighContrastMode();
      announceToScreenReader('High contrast mode enabled');
    } else {
      disableHighContrastMode();
      announceToScreenReader('High contrast mode disabled');
    }
    setSettings(prev => ({ ...prev, highContrast: newHighContrast }));
  };

  const handleToggleReducedMotion = () => {
    const newReducedMotion = !settings.reducedMotion;
    if (newReducedMotion) {
      document.body.classList.add('reduced-motion');
      localStorage.setItem('reduced-motion', 'true');
      announceToScreenReader('Reduced motion enabled');
    } else {
      document.body.classList.remove('reduced-motion');
      localStorage.removeItem('reduced-motion');
      announceToScreenReader('Reduced motion disabled');
    }
    setSettings(prev => ({ ...prev, reducedMotion: newReducedMotion }));
  };

  const handleFontSizeSliderChange = (event, newValue) => {
    document.documentElement.style.fontSize = `${newValue}px`;
    localStorage.setItem('font-size', `${newValue}px`);
    setSettings(prev => ({ ...prev, fontSize: newValue }));
  };

  const handleScreenReaderTest = () => {
    announceToScreenReader(
      'This is a test announcement for screen readers. RYGNeco accessibility features are working correctly.',
      'assertive'
    );
  };

  const handleKeyboardShortcutsHelp = () => {
    const shortcuts = `
      Keyboard shortcuts for RYGNeco:
      Tab - Navigate forward through interactive elements
      Shift + Tab - Navigate backward through interactive elements
      Enter or Space - Activate buttons and links
      Escape - Close dialogs and menus
      Arrow keys - Navigate within menus and tab lists
      Alt + A - Open accessibility toolbar
    `;
    announceToScreenReader(shortcuts, 'polite');
  };

  // Keyboard shortcut to open accessibility toolbar
  useEffect(() => {
    const handleKeyboardShortcut = (e) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => document.removeEventListener('keydown', handleKeyboardShortcut);
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="Open accessibility toolbar (Alt + A)"
        onClick={handleToggleDrawer}
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          zIndex: 1000,
          backgroundColor: '#4ECDC4',
          '&:hover': {
            backgroundColor: '#41b5a8'
          }
        }}
      >
        <AccessibilityIcon />
      </Fab>

      {/* Accessibility Toolbar Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleToggleDrawer}
        PaperProps={{
          sx: {
            width: 320,
            padding: 2
          }
        }}
        role="dialog"
        aria-labelledby="accessibility-toolbar-title"
        aria-describedby="accessibility-toolbar-description"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="accessibility-toolbar-title" variant="h6" component="h2">
            Accessibility Options
          </Typography>
          <IconButton
            onClick={handleToggleDrawer}
            aria-label="Close accessibility toolbar"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography 
          id="accessibility-toolbar-description" 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 3 }}
        >
          Customize your experience with these accessibility features.
        </Typography>

        {/* Font Size Controls */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Text Size
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Tooltip title="Decrease font size">
              <IconButton 
                onClick={handleDecreaseFontSize}
                aria-label="Decrease font size"
                size="small"
              >
                <TextDecreaseIcon />
              </IconButton>
            </Tooltip>
            <Box sx={{ flex: 1, mx: 2 }}>
              <Slider
                value={settings.fontSize}
                onChange={handleFontSizeSliderChange}
                min={12}
                max={24}
                step={1}
                marks={[
                  { value: 12, label: 'Small' },
                  { value: 16, label: 'Normal' },
                  { value: 20, label: 'Large' },
                  { value: 24, label: 'XL' }
                ]}
                valueLabelDisplay="auto"
                aria-label="Font size"
              />
            </Box>
            <Tooltip title="Increase font size">
              <IconButton 
                onClick={handleIncreaseFontSize}
                aria-label="Increase font size"
                size="small"
              >
                <TextIncreaseIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={handleResetFontSize}
            startIcon={<RefreshIcon />}
            fullWidth
          >
            Reset to Default
          </Button>
        </Paper>

        {/* Visual Preferences */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Visual Preferences
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.highContrast}
                onChange={handleToggleHighContrast}
                color="primary"
              />
            }
            label="High Contrast Mode"
            sx={{ mb: 1 }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.reducedMotion}
                onChange={handleToggleReducedMotion}
                color="primary"
              />
            }
            label="Reduce Motion"
          />
        </Paper>

        {/* Navigation Assistance */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Navigation Assistance
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <KeyboardIcon sx={{ mr: 1, color: settings.keyboardNavigation ? 'primary.main' : 'text.secondary' }} />
            <Typography variant="body2">
              Keyboard Navigation: {settings.keyboardNavigation ? 'Active' : 'Inactive'}
            </Typography>
          </Box>
          
          <Button
            variant="outlined"
            size="small"
            onClick={handleKeyboardShortcutsHelp}
            startIcon={<KeyboardIcon />}
            fullWidth
            sx={{ mb: 1 }}
          >
            Keyboard Shortcuts Help
          </Button>
        </Paper>

        {/* Screen Reader Support */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Screen Reader Support
          </Typography>
          
          <Button
            variant="outlined"
            size="small"
            onClick={handleScreenReaderTest}
            startIcon={<VolumeUpIcon />}
            fullWidth
          >
            Test Screen Reader
          </Button>
        </Paper>

        <Divider sx={{ my: 2 }} />

        {/* Additional Information */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Quick Access:</strong> Press Alt + A to open this toolbar anytime.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Need more help? Contact our accessibility team at{' '}
          <a href="mailto:accessibility@rygn.eco" style={{ color: '#4ECDC4' }}>
            accessibility@rygn.eco
          </a>
        </Typography>
      </Drawer>
    </>
  );
};

export default AccessibilityToolbar; 