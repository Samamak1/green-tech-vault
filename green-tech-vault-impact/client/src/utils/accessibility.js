// Accessibility utility for RYGNeco
// Provides ARIA helpers, keyboard navigation, and screen reader support

class AccessibilityManager {
  constructor() {
    this.focusableElements = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(',');
    
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupMotionPreferences();
  }

  // ARIA Helpers
  setAriaLabel(element, label) {
    if (element) {
      element.setAttribute('aria-label', label);
    }
  }

  setAriaExpanded(element, expanded) {
    if (element) {
      element.setAttribute('aria-expanded', expanded.toString());
    }
  }

  setAriaHidden(element, hidden) {
    if (element) {
      element.setAttribute('aria-hidden', hidden.toString());
    }
  }

  // Screen Reader Announcements
  announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  // Focus Management
  setupFocusManagement() {
    // Add focus indicators for keyboard users
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Add CSS for focus indicators
    this.addFocusStyles();
  }

  addFocusStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }

      .keyboard-navigation *:focus {
        outline: 2px solid #4ECDC4 !important;
        outline-offset: 2px !important;
      }

      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #4ECDC4;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
      }

      .skip-link:focus {
        top: 6px;
      }

      .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Skip Links
  addSkipLink(targetId, text = 'Skip to main content') {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.className = 'skip-link';
    skipLink.textContent = text;
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    return skipLink;
  }

  // Focus Trap for Modals
  createFocusTrap(container) {
    const focusableElements = container.querySelectorAll(this.focusableElements);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const trapFocus = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        this.releaseFocusTrap(container);
      }
    };

    container.addEventListener('keydown', trapFocus);
    container.setAttribute('data-focus-trap', 'true');
    
    // Focus first element
    if (firstElement) {
      firstElement.focus();
    }

    return {
      release: () => this.releaseFocusTrap(container),
      trapFocus
    };
  }

  releaseFocusTrap(container) {
    const trapFunction = container.trapFocus;
    if (trapFunction) {
      container.removeEventListener('keydown', trapFunction);
      container.removeAttribute('data-focus-trap');
    }
  }

  // Keyboard Navigation
  setupKeyboardNavigation() {
    // Arrow key navigation for custom components
    document.addEventListener('keydown', (e) => {
      const target = e.target;
      
      // Handle arrow keys in custom components
      if (target.getAttribute('role') === 'tablist') {
        this.handleTablistNavigation(e);
      } else if (target.getAttribute('role') === 'menu') {
        this.handleMenuNavigation(e);
      }
    });
  }

  handleTablistNavigation(e) {
    const tablist = e.target.closest('[role="tablist"]');
    const tabs = tablist.querySelectorAll('[role="tab"]');
    const currentIndex = Array.from(tabs).indexOf(e.target);

    let newIndex;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    tabs[newIndex].focus();
    tabs[newIndex].click();
  }

  handleMenuNavigation(e) {
    const menu = e.target.closest('[role="menu"]');
    const items = menu.querySelectorAll('[role="menuitem"]');
    const currentIndex = Array.from(items).indexOf(e.target);

    let newIndex;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;
      case 'Escape':
        e.preventDefault();
        this.closeMenu(menu);
        return;
      default:
        return;
    }

    items[newIndex].focus();
  }

  // Screen Reader Support
  setupScreenReaderSupport() {
    // Add landmarks if missing
    this.addLandmarks();
    
    // Enhance form labels
    this.enhanceFormLabels();
  }

  addLandmarks() {
    // Add main landmark if missing
    if (!document.querySelector('main')) {
      const mainContent = document.querySelector('#root > div') || document.querySelector('.App');
      if (mainContent && !mainContent.closest('main')) {
        const main = document.createElement('main');
        mainContent.parentNode.insertBefore(main, mainContent);
        main.appendChild(mainContent);
      }
    }

    // Add navigation landmarks
    const navElements = document.querySelectorAll('nav:not([role])');
    navElements.forEach(nav => {
      nav.setAttribute('role', 'navigation');
    });
  }

  enhanceFormLabels() {
    // Ensure all form inputs have labels
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (!label && input.placeholder) {
          input.setAttribute('aria-label', input.placeholder);
        }
      }
    });
  }

  // Motion Preferences
  setupMotionPreferences() {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
    }

    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    });
  }

  // High Contrast Mode
  enableHighContrastMode() {
    document.body.classList.add('high-contrast');
    localStorage.setItem('high-contrast', 'true');
  }

  disableHighContrastMode() {
    document.body.classList.remove('high-contrast');
    localStorage.removeItem('high-contrast');
  }

  // Font Size Adjustment
  increaseFontSize() {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    document.documentElement.style.fontSize = `${Math.min(currentSize * 1.1, 24)}px`;
    localStorage.setItem('font-size', document.documentElement.style.fontSize);
  }

  decreaseFontSize() {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    document.documentElement.style.fontSize = `${Math.max(currentSize * 0.9, 12)}px`;
    localStorage.setItem('font-size', document.documentElement.style.fontSize);
  }

  resetFontSize() {
    document.documentElement.style.fontSize = '';
    localStorage.removeItem('font-size');
  }

  // Load saved preferences
  loadAccessibilityPreferences() {
    // Load high contrast preference
    if (localStorage.getItem('high-contrast') === 'true') {
      this.enableHighContrastMode();
    }

    // Load font size preference
    const savedFontSize = localStorage.getItem('font-size');
    if (savedFontSize) {
      document.documentElement.style.fontSize = savedFontSize;
    }
  }
}

// Create singleton instance
const accessibilityManager = new AccessibilityManager();

// Export utility functions
export const announceToScreenReader = (message, priority) => 
  accessibilityManager.announceToScreenReader(message, priority);

export const createFocusTrap = (container) => 
  accessibilityManager.createFocusTrap(container);

export const setAriaLabel = (element, label) => 
  accessibilityManager.setAriaLabel(element, label);

export const setAriaExpanded = (element, expanded) => 
  accessibilityManager.setAriaExpanded(element, expanded);

export const setAriaHidden = (element, hidden) => 
  accessibilityManager.setAriaHidden(element, hidden);

export const addSkipLink = (targetId, text) => 
  accessibilityManager.addSkipLink(targetId, text);

export const enableHighContrastMode = () => 
  accessibilityManager.enableHighContrastMode();

export const disableHighContrastMode = () => 
  accessibilityManager.disableHighContrastMode();

export const increaseFontSize = () => 
  accessibilityManager.increaseFontSize();

export const decreaseFontSize = () => 
  accessibilityManager.decreaseFontSize();

export const resetFontSize = () => 
  accessibilityManager.resetFontSize();

export const loadAccessibilityPreferences = () => 
  accessibilityManager.loadAccessibilityPreferences();

export default accessibilityManager; 