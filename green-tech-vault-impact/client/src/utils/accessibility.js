// Comprehensive Accessibility Utility for RYGNeco
// Handles focus management, keyboard navigation, screen reader support, and accessibility preferences

class AccessibilityManager {
  constructor() {
    this.isInitialized = false;
    this.preferences = {
      highContrast: false,
      reducedMotion: false,
      largeText: false,
      keyboardNavigation: true,
      screenReader: false
    };
    this.focusHistory = [];
    this.keyboardTrapElements = [];
    this.announcements = [];
    
    this.init();
  }

  init() {
    if (typeof window !== 'undefined') {
      this.loadPreferences();
      this.detectSystemPreferences();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
      this.setupAccessibilityShortcuts();
      this.isInitialized = true;
      console.log('Accessibility Manager initialized');
    }
  }

  // Load user accessibility preferences
  loadPreferences() {
    if (localStorage.getItem('accessibility-preferences')) {
      try {
        const saved = JSON.parse(localStorage.getItem('accessibility-preferences'));
        this.preferences = { ...this.preferences, ...saved };
        this.applyPreferences();
      } catch (error) {
        console.error('Error loading accessibility preferences:', error);
      }
    }
  }

  // Save accessibility preferences
  savePreferences() {
    localStorage.setItem('accessibility-preferences', JSON.stringify(this.preferences));
    this.applyPreferences();
  }

  // Detect system accessibility preferences
  detectSystemPreferences() {
    if (window.matchMedia) {
      // High contrast mode
      const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
      this.preferences.highContrast = highContrastQuery.matches;
      highContrastQuery.addEventListener('change', (e) => {
        this.preferences.highContrast = e.matches;
        this.applyPreferences();
      });

      // Reduced motion
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.preferences.reducedMotion = reducedMotionQuery.matches;
      reducedMotionQuery.addEventListener('change', (e) => {
        this.preferences.reducedMotion = e.matches;
        this.applyPreferences();
      });

      // Dark mode preference
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeQuery.addEventListener('change', (e) => {
        document.documentElement.classList.toggle('dark-mode', e.matches);
      });

      // Large text preference
      const largeTextQuery = window.matchMedia('(prefers-reduced-data: reduce)');
      largeTextQuery.addEventListener('change', (e) => {
        this.preferences.largeText = e.matches;
        this.applyPreferences();
      });
    }

    // Detect screen reader
    this.detectScreenReader();
  }

  // Detect screen reader usage
  detectScreenReader() {
    // Check for common screen reader indicators
    const hasScreenReader = !!(
      window.speechSynthesis ||
      window.navigator.userAgent.includes('NVDA') ||
      window.navigator.userAgent.includes('JAWS') ||
      window.navigator.userAgent.includes('VoiceOver') ||
      window.navigator.userAgent.includes('TalkBack') ||
      document.querySelector('[aria-hidden="true"]')
    );

    this.preferences.screenReader = hasScreenReader;
    
    // Also check for high contrast mode as indicator
    if (this.preferences.highContrast) {
      this.preferences.screenReader = true;
    }
  }

  // Apply accessibility preferences
  applyPreferences() {
    const root = document.documentElement;
    
    // High contrast mode
    root.classList.toggle('high-contrast', this.preferences.highContrast);
    
    // Reduced motion
    root.classList.toggle('reduced-motion', this.preferences.reducedMotion);
    
    // Large text
    root.classList.toggle('large-text', this.preferences.largeText);
    
    // Keyboard navigation
    root.classList.toggle('keyboard-navigation', this.preferences.keyboardNavigation);
    
    // Screen reader optimizations
    root.classList.toggle('screen-reader', this.preferences.screenReader);

    // Apply CSS custom properties
    root.style.setProperty('--animation-duration', this.preferences.reducedMotion ? '0.01ms' : '200ms');
    root.style.setProperty('--transition-duration', this.preferences.reducedMotion ? '0.01ms' : '150ms');
    
    if (this.preferences.largeText) {
      root.style.setProperty('--base-font-size', '1.25rem');
      root.style.setProperty('--line-height', '1.6');
    } else {
      root.style.setProperty('--base-font-size', '1rem');
      root.style.setProperty('--line-height', '1.5');
    }

    // Notify components of preference changes
    window.dispatchEvent(new CustomEvent('accessibility-preferences-changed', {
      detail: this.preferences
    }));
  }

  // Keyboard navigation setup
  setupKeyboardNavigation() {
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
    
    // Track if user is using keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.preferences.keyboardNavigation = true;
        document.body.classList.add('using-keyboard');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });
  }

  // Handle keyboard navigation
  handleKeyboardNavigation(event) {
    const { key, ctrlKey, altKey, shiftKey } = event;

    // Handle accessibility shortcuts
    if (altKey && shiftKey) {
      switch (key) {
        case 'C':
          event.preventDefault();
          this.toggleHighContrast();
          break;
        case 'M':
          event.preventDefault();
          this.toggleReducedMotion();
          break;
        case 'L':
          event.preventDefault();
          this.toggleLargeText();
          break;
        case 'S':
          event.preventDefault();
          this.skipToMainContent();
          break;
        case 'H':
          event.preventDefault();
          this.showAccessibilityHelp();
          break;
      }
    }

    // Handle escape key for modal/dialog closing
    if (key === 'Escape') {
      this.handleEscapeKey();
    }

    // Handle tab trapping
    if (key === 'Tab') {
      this.handleTabTrapping(event);
    }

    // Handle arrow keys for custom navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      this.handleArrowNavigation(event);
    }
  }

  // Focus management
  setupFocusManagement() {
    // Track focus history for better navigation
    document.addEventListener('focusin', (event) => {
      this.focusHistory.push(event.target);
      if (this.focusHistory.length > 10) {
        this.focusHistory.shift();
      }
    });

    // Handle focus loss
    document.addEventListener('focusout', (event) => {
      setTimeout(() => {
        if (!document.activeElement || document.activeElement === document.body) {
          this.restoreFocus();
        }
      }, 100);
    });
  }

  // Focus management methods
  focusElement(element, options = {}) {
    if (!element) return false;
    
    const { scroll = true, preventScroll = false } = options;
    
    try {
      if (preventScroll) {
        element.focus({ preventScroll: true });
      } else {
        element.focus();
        if (scroll) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return true;
    } catch (error) {
      console.error('Error focusing element:', error);
      return false;
    }
  }

  saveFocus() {
    this.savedFocus = document.activeElement;
  }

  restoreFocus() {
    if (this.savedFocus && this.savedFocus.focus) {
      this.focusElement(this.savedFocus);
    } else if (this.focusHistory.length > 0) {
      const lastFocused = this.focusHistory[this.focusHistory.length - 1];
      if (lastFocused && lastFocused.focus) {
        this.focusElement(lastFocused);
      }
    }
  }

  // Focus trap management
  trapFocus(element) {
    if (!element) return;
    
    const focusableElements = this.getFocusableElements(element);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const trapConfig = {
      container: element,
      firstElement,
      lastElement,
      previousActiveElement: document.activeElement
    };

    this.keyboardTrapElements.push(trapConfig);
    this.focusElement(firstElement);
  }

  releaseFocusTrap(element) {
    const trapIndex = this.keyboardTrapElements.findIndex(trap => trap.container === element);
    if (trapIndex > -1) {
      const trap = this.keyboardTrapElements[trapIndex];
      this.keyboardTrapElements.splice(trapIndex, 1);
      
      if (trap.previousActiveElement) {
        this.focusElement(trap.previousActiveElement);
      }
    }
  }

  // Get focusable elements
  getFocusableElements(container = document) {
    const focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ].join(',');

    return Array.from(container.querySelectorAll(focusableSelectors))
      .filter(element => {
        return element.offsetWidth > 0 && 
               element.offsetHeight > 0 && 
               !element.hasAttribute('aria-hidden');
      });
  }

  // Handle tab trapping
  handleTabTrapping(event) {
    if (this.keyboardTrapElements.length === 0) return;

    const currentTrap = this.keyboardTrapElements[this.keyboardTrapElements.length - 1];
    const focusableElements = this.getFocusableElements(currentTrap.container);
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey) {
      if (activeElement === firstElement) {
        event.preventDefault();
        this.focusElement(lastElement);
      }
    } else {
      if (activeElement === lastElement) {
        event.preventDefault();
        this.focusElement(firstElement);
      }
    }
  }

  // Handle escape key
  handleEscapeKey() {
    // Close any open modals, dropdowns, etc.
    const modals = document.querySelectorAll('[role="dialog"][aria-hidden="false"]');
    const dropdowns = document.querySelectorAll('[aria-expanded="true"]');
    
    if (modals.length > 0) {
      const lastModal = modals[modals.length - 1];
      const closeButton = lastModal.querySelector('[aria-label*="close"], [aria-label*="Close"], .close');
      if (closeButton) {
        closeButton.click();
      }
    }
    
    if (dropdowns.length > 0) {
      dropdowns.forEach(dropdown => {
        dropdown.setAttribute('aria-expanded', 'false');
        dropdown.blur();
      });
    }
  }

  // Handle arrow navigation
  handleArrowNavigation(event) {
    const activeElement = document.activeElement;
    const parent = activeElement.closest('[role="menu"], [role="menubar"], [role="tablist"], [role="radiogroup"]');
    
    if (!parent) return;

    const role = parent.getAttribute('role');
    const items = Array.from(parent.querySelectorAll(`[role="${this.getItemRole(role)}"]`))
      .filter(item => !item.hasAttribute('disabled') && !item.hasAttribute('aria-disabled'));
    
    const currentIndex = items.indexOf(activeElement);
    if (currentIndex === -1) return;

    let newIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = items.length - 1;
        break;
    }

    if (newIndex !== currentIndex) {
      event.preventDefault();
      this.focusElement(items[newIndex]);
    }
  }

  getItemRole(containerRole) {
    const roleMap = {
      'menu': 'menuitem',
      'menubar': 'menuitem',
      'tablist': 'tab',
      'radiogroup': 'radio'
    };
    return roleMap[containerRole] || 'option';
  }

  // Screen reader support
  setupScreenReaderSupport() {
    this.liveRegion = this.createLiveRegion();
    this.setupHeadingNavigation();
    this.setupLandmarkNavigation();
  }

  createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.setAttribute('aria-relevant', 'additions text');
    liveRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(liveRegion);
    return liveRegion;
  }

  // Announce to screen readers
  announce(message, priority = 'polite') {
    if (!this.liveRegion) return;
    
    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      this.liveRegion.textContent = '';
    }, 1000);
    
    console.log('Screen reader announcement:', message);
  }

  // Accessibility shortcuts setup
  setupAccessibilityShortcuts() {
    this.addSkipLink();
    this.setupHeadingNavigation();
    this.setupLandmarkNavigation();
  }

  addSkipLink() {
    if (document.querySelector('.skip-link')) return;

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      border-radius: 0 0 4px 4px;
      z-index: 10000;
      transition: top 0.2s ease;
      font-size: 14px;
      font-weight: bold;
    `;

    skipLink.addEventListener('focus', function() {
      this.style.top = '0';
    });

    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });

    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector('#main-content') || document.querySelector('main') || document.querySelector('[role="main"]');
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupHeadingNavigation() {
    document.addEventListener('keydown', (event) => {
      if (event.altKey && event.key >= '1' && event.key <= '6') {
        event.preventDefault();
        const level = parseInt(event.key);
        const heading = document.querySelector(`h${level}`);
        if (heading) {
          this.focusElement(heading);
          this.announce(`Navigated to heading level ${level}: ${heading.textContent}`);
        }
      }
    });
  }

  setupLandmarkNavigation() {
    const landmarks = [
      { key: 'b', selector: 'nav', name: 'navigation' },
      { key: 'c', selector: '[role="contentinfo"], footer', name: 'content info' },
      { key: 'f', selector: 'form', name: 'form' },
      { key: 'm', selector: 'main, [role="main"]', name: 'main content' },
      { key: 's', selector: 'aside, [role="complementary"]', name: 'sidebar' }
    ];

    document.addEventListener('keydown', (event) => {
      if (event.altKey && event.shiftKey) {
        const landmark = landmarks.find(l => l.key === event.key.toLowerCase());
        if (landmark) {
          event.preventDefault();
          const element = document.querySelector(landmark.selector);
          if (element) {
            this.focusElement(element);
            this.announce(`Navigated to ${landmark.name}`);
          }
        }
      }
    });
  }

  // Preference toggle methods
  toggleHighContrast() {
    this.preferences.highContrast = !this.preferences.highContrast;
    this.savePreferences();
    this.announce(`High contrast ${this.preferences.highContrast ? 'enabled' : 'disabled'}`);
  }

  toggleReducedMotion() {
    this.preferences.reducedMotion = !this.preferences.reducedMotion;
    this.savePreferences();
    this.announce(`Reduced motion ${this.preferences.reducedMotion ? 'enabled' : 'disabled'}`);
  }

  toggleLargeText() {
    this.preferences.largeText = !this.preferences.largeText;
    this.savePreferences();
    this.announce(`Large text ${this.preferences.largeText ? 'enabled' : 'disabled'}`);
  }

  skipToMainContent() {
    const main = document.querySelector('#main-content') || document.querySelector('main') || document.querySelector('[role="main"]');
    if (main) {
      this.focusElement(main);
      this.announce('Skipped to main content');
    }
  }

  showAccessibilityHelp() {
    const helpText = `
      Accessibility shortcuts:
      Alt + Shift + C: Toggle high contrast
      Alt + Shift + M: Toggle reduced motion
      Alt + Shift + L: Toggle large text
      Alt + Shift + S: Skip to main content
      Alt + Shift + H: Show this help
      Alt + 1-6: Navigate to heading levels
      Alt + Shift + B: Navigate to navigation
      Alt + Shift + M: Navigate to main content
      Alt + Shift + F: Navigate to form
      Escape: Close dialogs and dropdowns
    `;
    this.announce(helpText);
  }

  // Color contrast utilities
  checkColorContrast(foreground, background) {
    const getLuminance = (color) => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return 0;
      
      const [r, g, b] = rgb.map(c => {
        c = parseInt(c) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    
    return {
      ratio: ratio,
      aa: ratio >= 4.5,
      aaa: ratio >= 7,
      aaLarge: ratio >= 3,
      aaaLarge: ratio >= 4.5
    };
  }

  // Form accessibility helpers
  validateFormAccessibility(form) {
    const issues = [];
    
    // Check for labels
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      const label = form.querySelector(`label[for="${input.id}"]`) || input.closest('label');
      if (!label && !input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
        issues.push(`Input missing label: ${input.name || input.type}`);
      }
    });

    // Check for fieldsets
    const radioGroups = form.querySelectorAll('input[type="radio"]');
    const checkboxGroups = form.querySelectorAll('input[type="checkbox"]');
    
    if (radioGroups.length > 1 && !form.querySelector('fieldset')) {
      issues.push('Radio buttons should be grouped in fieldsets');
    }

    return issues;
  }

  // Image accessibility helpers
  validateImageAccessibility() {
    const images = document.querySelectorAll('img');
    const issues = [];

    images.forEach(img => {
      if (!img.alt && !img.getAttribute('aria-hidden')) {
        issues.push(`Image missing alt text: ${img.src}`);
      }
      
      if (img.alt && img.alt.length > 100) {
        issues.push(`Alt text too long (${img.alt.length} chars): ${img.src}`);
      }
    });

    return issues;
  }

  // Get accessibility status
  getAccessibilityStatus() {
    return {
      preferences: this.preferences,
      focusHistory: this.focusHistory.length,
      trapCount: this.keyboardTrapElements.length,
      announcements: this.announcements.length,
      isInitialized: this.isInitialized
    };
  }
}

// Create and export accessibility manager instance
const accessibilityManager = new AccessibilityManager();

// Export convenience functions
export const focusElement = (element, options) => accessibilityManager.focusElement(element, options);
export const announce = (message, priority) => accessibilityManager.announce(message, priority);
export const trapFocus = (element) => accessibilityManager.trapFocus(element);
export const releaseFocusTrap = (element) => accessibilityManager.releaseFocusTrap(element);
export const saveFocus = () => accessibilityManager.saveFocus();
export const restoreFocus = () => accessibilityManager.restoreFocus();
export const getFocusableElements = (container) => accessibilityManager.getFocusableElements(container);
export const toggleHighContrast = () => accessibilityManager.toggleHighContrast();
export const toggleReducedMotion = () => accessibilityManager.toggleReducedMotion();
export const toggleLargeText = () => accessibilityManager.toggleLargeText();
export const checkColorContrast = (fg, bg) => accessibilityManager.checkColorContrast(fg, bg);
export const validateFormAccessibility = (form) => accessibilityManager.validateFormAccessibility(form);
export const validateImageAccessibility = () => accessibilityManager.validateImageAccessibility();
export const getAccessibilityStatus = () => accessibilityManager.getAccessibilityStatus();
export const loadAccessibilityPreferences = () => accessibilityManager.loadPreferences();
export const addSkipLink = () => accessibilityManager.addSkipLink();

export default accessibilityManager; 