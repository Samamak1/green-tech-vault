import React, { createContext, useState, useContext, useEffect } from 'react';

const LayoutEditorContext = createContext();

export const useLayoutEditor = () => useContext(LayoutEditorContext);

export const LayoutEditorProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(20); // Grid size in pixels
  const [boundaries, setBoundaries] = useState({
    visible: false,
    elements: []
  });
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Toggle edit mode state
  const toggleEditMode = () => {
    const newMode = !isEditMode;
    setIsEditMode(newMode);
    
    // When turning off edit mode, also hide grid and boundaries
    if (!newMode) {
      setShowGrid(false);
      setBoundaries({ ...boundaries, visible: false });
    } else {
      // When turning on edit mode, show grid and find boundaries
      setShowGrid(true);
      findContentBoundaries();
    }
  };

  // Toggle grid visibility
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  // Set grid size
  const changeGridSize = (size) => {
    setGridSize(size);
  };

  // Find and highlight content boundaries
  const findContentBoundaries = () => {
    // Get all content containers with boundary styles
    const containers = document.querySelectorAll('[data-boundary="true"]');
    const boundaryElements = [];

    containers.forEach((container, index) => {
      const rect = container.getBoundingClientRect();
      boundaryElements.push({
        id: `boundary-${index}`,
        element: container,
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        },
        originalStyles: {
          maxWidth: container.style.maxWidth,
          margin: container.style.margin,
          padding: container.style.padding
        }
      });
    });

    setBoundaries({
      visible: true,
      elements: boundaryElements
    });
  };

  // Handle selecting a boundary element
  const selectElement = (elementId) => {
    const element = boundaries.elements.find(el => el.id === elementId);
    if (element) {
      setSelectedElement(element);
    }
  };

  // Handle starting a drag operation
  const startDrag = (event, elementId) => {
    event.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: event.clientX,
      y: event.clientY
    });
    selectElement(elementId);
  };

  // Handle moving during a drag operation
  const handleDrag = (event) => {
    if (isDragging && selectedElement) {
      const deltaX = event.clientX - dragStart.x;
      const deltaY = event.clientY - dragStart.y;
      
      // Update element position
      const updatedElements = boundaries.elements.map(el => {
        if (el.id === selectedElement.id) {
          // Snap to grid if grid is enabled
          let newX = el.rect.x + deltaX;
          let newY = el.rect.y + deltaY;
          
          if (showGrid) {
            newX = Math.round(newX / gridSize) * gridSize;
            newY = Math.round(newY / gridSize) * gridSize;
          }
          
          return {
            ...el,
            rect: {
              ...el.rect,
              x: newX,
              y: newY
            }
          };
        }
        return el;
      });
      
      setBoundaries({
        ...boundaries,
        elements: updatedElements
      });
      
      setDragStart({
        x: event.clientX,
        y: event.clientY
      });
    }
  };

  // Handle ending a drag operation
  const endDrag = () => {
    if (isDragging && selectedElement) {
      // Apply new position to the actual DOM element
      const element = selectedElement.element;
      const newPos = boundaries.elements.find(el => el.id === selectedElement.id).rect;
      
      element.style.position = 'absolute';
      element.style.left = `${newPos.x}px`;
      element.style.top = `${newPos.y}px`;
      element.style.width = `${newPos.width}px`;
      element.style.height = `${newPos.height}px`;
    }
    
    setIsDragging(false);
    setSelectedElement(null);
  };

  // Save the current layout
  const saveLayout = () => {
    // In a real app, this would save to backend/localStorage
    // For now, we'll just apply the styles directly
    boundaries.elements.forEach(item => {
      const { element, rect } = item;
      
      // Apply final position
      element.style.maxWidth = `${rect.width}px`;
      element.style.height = `${rect.height}px`;
      
      // You could save these values to localStorage here
      localStorage.setItem(`layout-${item.id}`, JSON.stringify(rect));
    });
    
    // Turn off edit mode
    toggleEditMode();
  };

  // Reset layout to default
  const resetLayout = () => {
    boundaries.elements.forEach(item => {
      const { element, originalStyles } = item;
      
      // Reset to original styles
      element.style.maxWidth = originalStyles.maxWidth;
      element.style.margin = originalStyles.margin;
      element.style.padding = originalStyles.padding;
      element.style.position = '';
      element.style.left = '';
      element.style.top = '';
      
      // Remove from localStorage
      localStorage.removeItem(`layout-${item.id}`);
    });
    
    // Find boundaries again to update state
    findContentBoundaries();
  };
  
  // Load saved layout from localStorage on mount
  useEffect(() => {
    const loadSavedLayout = () => {
      if (boundaries.elements.length > 0) {
        boundaries.elements.forEach(item => {
          const savedLayout = localStorage.getItem(`layout-${item.id}`);
          if (savedLayout) {
            const rect = JSON.parse(savedLayout);
            const element = item.element;
            
            // Apply saved position
            element.style.maxWidth = `${rect.width}px`;
            element.style.height = `${rect.height}px`;
            element.style.position = 'absolute';
            element.style.left = `${rect.x}px`;
            element.style.top = `${rect.y}px`;
          }
        });
      }
    };
    
    if (isEditMode) {
      loadSavedLayout();
    }
  }, [boundaries.elements, isEditMode]);

  // Add event listeners for drag operations
  useEffect(() => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', endDrag);
    
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', endDrag);
    };
  }, [isDragging, dragStart, selectedElement, boundaries]);

  return (
    <LayoutEditorContext.Provider
      value={{
        isEditMode,
        showGrid,
        gridSize,
        boundaries,
        selectedElement,
        toggleEditMode,
        toggleGrid,
        changeGridSize,
        findContentBoundaries,
        selectElement,
        startDrag,
        saveLayout,
        resetLayout
      }}
    >
      {children}
    </LayoutEditorContext.Provider>
  );
}; 