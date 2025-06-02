export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    // If section doesn't exist, scroll to top
    scrollToTop();
  }
};

// Enhanced navigation function that handles both internal and external links
export const handleNavigation = (url, navigate) => {
  if (url.includes('#')) {
    const [path, hash] = url.split('#');
    if (path === window.location.pathname || path === '') {
      // Same page, just scroll to section
      scrollToSection(hash);
    } else {
      // Different page, navigate then scroll
      navigate(path);
      setTimeout(() => {
        if (hash) {
          scrollToSection(hash);
        } else {
          scrollToTop();
        }
      }, 100);
    }
  } else {
    // Regular navigation, always scroll to top
    navigate(url);
    setTimeout(() => {
      scrollToTop();
    }, 100);
  }
}; 