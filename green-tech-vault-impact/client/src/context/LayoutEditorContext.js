import React, { createContext, useState, useContext, useEffect } from 'react';

const LayoutEditorContext = createContext();

export const useLayoutEditor = () => useContext(LayoutEditorContext);

export const LayoutEditorProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(45); // Fixed grid size to 45px
  const [boundaries, setBoundaries] = useState({
    visible: false,
    elements: []
  });
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originalRect, setOriginalRect] = useState(null);

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

  // Set grid size - but now we'll ignore changing the size since it's fixed at 45px
  const changeGridSize = (size) => {
    // Fixed at 45px, so this is effectively a no-op function now
    // setGridSize(size);
    return;
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
          padding: container.style.padding,
          position: container.style.position,
          left: container.style.left,
          top: container.style.top,
          width: container.style.width,
          height: container.style.height
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
    setIsResizing(false);
    setDragStart({
      x: event.clientX,
      y: event.clientY
    });
    
    // Find and select the element
    const element = boundaries.elements.find(el => el.id === elementId);
    setSelectedElement(element);
    setOriginalRect({ ...element.rect });
  };

  // Handle starting a resize operation
  const startResize = (event, elementId, direction) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({
      x: event.clientX,
      y: event.clientY
    });
    
    // Find and select the element
    const element = boundaries.elements.find(el => el.id === elementId);
    setSelectedElement(element);
    setOriginalRect({ ...element.rect });
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
          let newX = originalRect.x + deltaX;
          let newY = originalRect.y + deltaY;
          
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
    } 
    else if (isResizing && selectedElement) {
      const deltaX = event.clientX - dragStart.x;
      const deltaY = event.clientY - dragStart.y;
      
      // Update element size based on the resize direction
      const updatedElements = boundaries.elements.map(el => {
        if (el.id === selectedElement.id) {
          const rect = { ...originalRect };
          
          // Handle resize based on direction
          if (resizeDirection.includes('left')) {
            rect.x = originalRect.x + deltaX;
            rect.width = originalRect.width - deltaX;
          } else if (resizeDirection.includes('right')) {
            rect.width = originalRect.width + deltaX;
          }
          
          if (resizeDirection.includes('top')) {
            rect.y = originalRect.y + deltaY;
            rect.height = originalRect.height - deltaY;
          } else if (resizeDirection.includes('bottom')) {
            rect.height = originalRect.height + deltaY;
          }
          
          // Snap to grid if enabled
          if (showGrid) {
            if (resizeDirection.includes('left') || resizeDirection.includes('right')) {
              rect.width = Math.round(rect.width / gridSize) * gridSize;
            }
            if (resizeDirection.includes('top') || resizeDirection.includes('bottom')) {
              rect.height = Math.round(rect.height / gridSize) * gridSize;
            }
            if (resizeDirection.includes('left')) {
              rect.x = originalRect.x + originalRect.width - rect.width;
            }
            if (resizeDirection.includes('top')) {
              rect.y = originalRect.y + originalRect.height - rect.height;
            }
          }
          
          // Ensure minimum size
          rect.width = Math.max(rect.width, 50);
          rect.height = Math.max(rect.height, 50);
          
          // If resizing from left/top, adjust position too
          if (resizeDirection.includes('left')) {
            rect.x = originalRect.x + originalRect.width - rect.width;
          }
          if (resizeDirection.includes('top')) {
            rect.y = originalRect.y + originalRect.height - rect.height;
          }
          
          return {
            ...el,
            rect
          };
        }
        return el;
      });
      
      setBoundaries({
        ...boundaries,
        elements: updatedElements
      });
    }
  };

  // Handle ending a drag or resize operation
  const endDrag = () => {
    if ((isDragging || isResizing) && selectedElement) {
      // Apply new position/size to the actual DOM element
      const element = selectedElement.element;
      const newRect = boundaries.elements.find(el => el.id === selectedElement.id).rect;
      
      // Apply styles to the actual element
      element.style.position = 'absolute';
      element.style.left = `${newRect.x}px`;
      element.style.top = `${newRect.y}px`;
      element.style.width = `${newRect.width}px`;
      element.style.height = `${newRect.height}px`;
      
      // Update the displayed element in boundaries with the new rect
      const updatedElements = boundaries.elements.map(el => {
        if (el.id === selectedElement.id) {
          return {
            ...el,
            rect: { ...newRect }
          };
        }
        return el;
      });
      
      setBoundaries({
        ...boundaries,
        elements: updatedElements
      });
    }
    
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  };

  // Save the current layout
  const saveLayout = () => {
    // In a real app, this would save to backend/localStorage
    boundaries.elements.forEach(item => {
      const { element, rect } = item;
      
      // Apply final position and size
      element.style.position = 'absolute';
      element.style.left = `${rect.x}px`;
      element.style.top = `${rect.y}px`;
      element.style.width = `${rect.width}px`;
      element.style.height = `${rect.height}px`;
      
      // Save to localStorage
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
      element.style.position = originalStyles.position || '';
      element.style.left = originalStyles.left || '';
      element.style.top = originalStyles.top || '';
      element.style.width = originalStyles.width || '';
      element.style.height = originalStyles.height || '';
      
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
            
            // Apply saved position and size
            element.style.position = 'absolute';
            element.style.left = `${rect.x}px`;
            element.style.top = `${rect.y}px`;
            element.style.width = `${rect.width}px`;
            element.style.height = `${rect.height}px`;
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
  }, [isDragging, isResizing, dragStart, selectedElement, boundaries, resizeDirection, originalRect]);

  return (
    <LayoutEditorContext.Provider
      value={{
        isEditMode,
        showGrid,
        gridSize, // Always 45px now
        boundaries,
        selectedElement,
        toggleEditMode,
        toggleGrid,
        changeGridSize,
        findContentBoundaries,
        selectElement,
        startDrag,
        startResize,
        saveLayout,
        resetLayout
      }}
    >
      {children}
    </LayoutEditorContext.Provider>
  );
}; 