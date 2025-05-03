import React, { useState } from 'react';
import { Box, Paper, Typography, Slider, TextField, Button, IconButton } from '@mui/material';
import { useLayoutEditor } from '../context/LayoutEditorContext';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// Resize handle positions
const HANDLE_POSITIONS = [
  'top-left', 'top', 'top-right',
  'left', 'right',
  'bottom-left', 'bottom', 'bottom-right'
];

const GridOverlay = () => {
  const { 
    isEditMode, 
    showGrid, 
    gridSize, 
    boundaries,
    selectedElement,
    toggleGrid, 
    changeGridSize,
    startDrag,
    startResize,
    saveLayout,
    resetLayout,
    toggleEditMode
  } = useLayoutEditor();
  
  const [controlsOpen, setControlsOpen] = useState(true);
  const [localGridSize, setLocalGridSize] = useState(gridSize);

  // Update grid size with debounce
  const handleGridSizeChange = (event, newValue) => {
    setLocalGridSize(newValue);
    changeGridSize(newValue);
  };

  // Toggle controls panel
  const toggleControls = () => {
    setControlsOpen(!controlsOpen);
  };

  // Map cursor styles for resize handles
  const getHandleCursor = (position) => {
    switch (position) {
      case 'top-left': 
      case 'bottom-right': 
        return 'nwse-resize';
      case 'top-right': 
      case 'bottom-left': 
        return 'nesw-resize';
      case 'top': 
      case 'bottom': 
        return 'ns-resize';
      case 'left': 
      case 'right': 
        return 'ew-resize';
      default: 
        return 'move';
    }
  };

  // Get handle position style
  const getHandlePosition = (position, rect) => {
    const handleSize = 12;
    const halfSize = handleSize / 2;
    
    const positions = {
      'top-left': { top: -halfSize, left: -halfSize },
      'top': { top: -halfSize, left: `calc(50% - ${halfSize}px)` },
      'top-right': { top: -halfSize, right: -halfSize },
      'left': { top: `calc(50% - ${halfSize}px)`, left: -halfSize },
      'right': { top: `calc(50% - ${halfSize}px)`, right: -halfSize },
      'bottom-left': { bottom: -halfSize, left: -halfSize },
      'bottom': { bottom: -halfSize, left: `calc(50% - ${halfSize}px)` },
      'bottom-right': { bottom: -halfSize, right: -halfSize }
    };
    
    return positions[position];
  };

  if (!isEditMode) return null;

  return (
    <>
      {/* Grid Overlay */}
      {showGrid && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9000,
            pointerEvents: 'none', // Allow clicking through the grid
            backgroundImage: `
              linear-gradient(to right, rgba(78, 205, 196, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(78, 205, 196, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />
      )}

      {/* Boundary Highlights */}
      {boundaries.visible && boundaries.elements.map((item) => (
        <Box
          key={item.id}
          sx={{
            position: 'absolute',
            top: item.rect.y,
            left: item.rect.x,
            width: item.rect.width,
            height: item.rect.height,
            border: `2px dashed ${selectedElement && selectedElement.id === item.id ? '#4ECDC4' : '#FF6B6B'}`,
            backgroundColor: 'rgba(78, 205, 196, 0.05)',
            zIndex: 9001,
            pointerEvents: 'none', // Allow clicking through the highlighting
          }}
        />
      ))}
      
      {/* Draggable Handles for Boundaries */}
      {boundaries.visible && boundaries.elements.map((item) => (
        <React.Fragment key={`handle-container-${item.id}`}>
          {/* Header drag handle */}
          <Box
            key={`handle-${item.id}`}
            sx={{
              position: 'absolute',
              top: item.rect.y - 20,
              left: item.rect.x,
              padding: '2px 8px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '4px 4px 0 0',
              fontSize: '12px',
              zIndex: 9002,
              cursor: 'move',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
            }}
            onMouseDown={(e) => startDrag(e, item.id)}
          >
            <DragIndicatorIcon fontSize="small" sx={{ mr: 0.5 }} />
            {item.id}
          </Box>

          {/* Resize handles on corners and sides */}
          {HANDLE_POSITIONS.map(position => (
            <Box
              key={`resize-${item.id}-${position}`}
              sx={{
                position: 'absolute',
                width: 12,
                height: 12,
                backgroundColor: selectedElement && selectedElement.id === item.id ? '#4ECDC4' : '#FF6B6B',
                border: '1px solid white',
                borderRadius: '50%',
                zIndex: 9003,
                cursor: getHandleCursor(position),
                ...getHandlePosition(position, item.rect),
                // Place the handle relative to the boundary
                top: position.includes('top') ? item.rect.y - 6 
                  : position.includes('bottom') ? item.rect.y + item.rect.height - 6 
                  : item.rect.y + (item.rect.height / 2) - 6,
                left: position.includes('left') ? item.rect.x - 6 
                  : position.includes('right') ? item.rect.x + item.rect.width - 6 
                  : item.rect.x + (item.rect.width / 2) - 6,
                transition: 'all 0.1s ease',
                '&:hover': {
                  transform: 'scale(1.2)',
                  backgroundColor: '#4ECDC4',
                },
              }}
              onMouseDown={(e) => startResize(e, item.id, position)}
            />
          ))}
        </React.Fragment>
      ))}

      {/* Controls Panel */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          top: 80,
          right: controlsOpen ? 20 : -280,
          width: 280,
          zIndex: 9003,
          p: 2,
          borderRadius: 2,
          transition: 'right 0.3s ease',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Layout Editor</Typography>
          <IconButton size="small" onClick={toggleControls}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Grid Settings
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Button
              variant={showGrid ? "contained" : "outlined"}
              size="small"
              startIcon={<GridViewIcon />}
              onClick={toggleGrid}
              sx={{ 
                bgcolor: showGrid ? '#4ECDC4' : 'transparent',
                color: showGrid ? 'white' : '#4ECDC4',
                borderColor: '#4ECDC4',
                textTransform: 'none',
                mr: 1
              }}
            >
              {showGrid ? 'Hide Grid' : 'Show Grid'}
            </Button>
            <TextField
              size="small"
              label="Grid Size"
              type="number"
              value={localGridSize}
              onChange={(e) => setLocalGridSize(parseInt(e.target.value) || 10)}
              onBlur={() => changeGridSize(localGridSize)}
              InputProps={{ inputProps: { min: 5, max: 100 } }}
              sx={{ width: 100 }}
            />
          </Box>
          <Slider
            value={localGridSize}
            onChange={handleGridSizeChange}
            min={5}
            max={50}
            step={1}
            valueLabelDisplay="auto"
            sx={{
              color: '#4ECDC4',
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#4ECDC4',
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Boundary Information
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {boundaries.elements.length} boundaries detected
          </Typography>
          {selectedElement && (
            <Box>
              <Typography variant="caption" display="block">
                Selected: {selectedElement.id}
              </Typography>
              <Typography variant="caption" display="block">
                Position: {Math.round(selectedElement.rect.x)}x{Math.round(selectedElement.rect.y)}
              </Typography>
              <Typography variant="caption" display="block">
                Size: {Math.round(selectedElement.rect.width)}x{Math.round(selectedElement.rect.height)}
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
          Tip: Drag elements by their handles. Resize using the corner and edge handles.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            startIcon={<RestoreIcon />}
            onClick={resetLayout}
            sx={{ 
              borderColor: '#FF6B6B',
              color: '#FF6B6B',
              textTransform: 'none'
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveLayout}
            sx={{ 
              bgcolor: '#4ECDC4',
              color: 'white',
              textTransform: 'none'
            }}
          >
            Save Layout
          </Button>
        </Box>
      </Paper>

      {/* Toggle Controls Button (Only visible when controls are hidden) */}
      {!controlsOpen && (
        <Button
          variant="contained"
          onClick={toggleControls}
          sx={{
            position: 'fixed',
            top: 80,
            right: 20,
            zIndex: 9003,
            bgcolor: '#4ECDC4',
            color: 'white',
            textTransform: 'none',
            boxShadow: 3,
          }}
        >
          Open Controls
        </Button>
      )}
    </>
  );
};

export default GridOverlay; 