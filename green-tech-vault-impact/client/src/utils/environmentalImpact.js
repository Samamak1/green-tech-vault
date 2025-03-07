/**
 * Environmental Impact Calculation Utilities for the frontend
 * Based on industry benchmarks for e-waste recycling and refurbishment
 */

// CO2 footprint of manufacturing new devices (kg CO2)
export const newDeviceFootprint = {
  Laptop: 250, // 200-300 kg CO2
  Desktop: 350, // 300-400 kg CO2
  'LCD Monitor': 175, // 150-200 kg CO2
  Smartphone: 65, // 50-80 kg CO2
  Tablet: 110, // 100-120 kg CO2
  Server: 750, // 500-1000+ kg CO2
  Printer: 120,
  'Networking Equipment': 100,
  Other: 100
};

// Percentage of emissions avoided by refurbishing (70-80%)
export const refurbishmentSavingsPercent = 75; // Using midpoint of 70-80%

// CO2 savings per kg of e-waste recycled (kg CO2/kg e-waste)
export const recyclingSavingsPerKg = 1.4; // Using midpoint of 1.2-1.6 kg CO2/kg

/**
 * Calculate CO2 savings for a refurbished device
 * @param {string} deviceType - Type of device
 * @returns {number} - CO2 savings in kg
 */
export const calculateRefurbishmentCO2Savings = (deviceType) => {
  const footprint = newDeviceFootprint[deviceType] || newDeviceFootprint.Other;
  return footprint * (refurbishmentSavingsPercent / 100);
};

/**
 * Calculate CO2 savings for recycled e-waste
 * @param {number} weight - Weight in kg
 * @returns {number} - CO2 savings in kg
 */
export const calculateRecyclingCO2Savings = (weight) => {
  return weight * recyclingSavingsPerKg;
};

/**
 * Calculate environmental equivalents
 * @param {number} co2Saved - CO2 savings in kg
 * @returns {Object} - Environmental equivalents
 */
export const calculateEnvironmentalEquivalents = (co2Saved) => {
  // Average tree absorbs ~22kg CO2 per year
  const treesEquivalent = Math.round(co2Saved / 22);
  
  // Average car emits ~4.6 metric tons of CO2 per year
  const carsEquivalent = Math.round((co2Saved / 4600) * 100) / 100;
  
  return {
    trees: treesEquivalent,
    cars: carsEquivalent
  };
};

/**
 * Calculate landfill diversion rate
 * @param {number} totalWeight - Total weight in kg
 * @param {number} divertedWeight - Weight diverted from landfill in kg
 * @returns {number} - Landfill diversion rate as percentage
 */
export const calculateLandfillDiversionRate = (totalWeight, divertedWeight) => {
  if (totalWeight === 0) return 0;
  return (divertedWeight / totalWeight) * 100;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Format weight values (kg) to appropriate units
 * @param {number} weight - Weight in kilograms
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted weight string with units
 */
export const formatWeight = (weight, decimals = 1) => {
  if (weight === null || weight === undefined) return '-';
  
  try {
    const numWeight = Number(weight);
    
    if (isNaN(numWeight)) {
      return '-';
    }
    
    // Convert to appropriate units
    if (numWeight >= 1000) {
      // Convert to metric tons for large weights
      return `${(numWeight / 1000).toFixed(decimals)} tonnes`;
    } else if (numWeight < 0.1) {
      // Convert to grams for very small weights
      return `${(numWeight * 1000).toFixed(0)} g`;
    } else {
      // Use kilograms for normal weights
      return `${numWeight.toFixed(decimals)} kg`;
    }
  } catch (error) {
    console.error('Weight formatting error:', error);
    return '-';
  }
};

/**
 * Format CO2 emissions values (kg) to appropriate units
 * @param {number} co2 - CO2 in kilograms
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted CO2 string with units
 */
export const formatCO2 = (co2, decimals = 1) => {
  if (co2 === null || co2 === undefined) return '-';
  
  try {
    const numCO2 = Number(co2);
    
    if (isNaN(numCO2)) {
      return '-';
    }
    
    // Convert to appropriate units
    if (numCO2 >= 1000) {
      // Convert to metric tons for large amounts
      return `${(numCO2 / 1000).toFixed(decimals)} tonnes CO₂`;
    } else {
      // Use kilograms for normal amounts
      return `${numCO2.toFixed(decimals)} kg CO₂`;
    }
  } catch (error) {
    console.error('CO2 formatting error:', error);
    return '-';
  }
};

/**
 * Get color for device type
 * @param {string} deviceType - Type of device
 * @returns {string} - Color hex code
 */
export const getDeviceTypeColor = (deviceType) => {
  const colors = {
    Laptop: '#4CAF50',
    Desktop: '#2196F3',
    'LCD Monitor': '#9C27B0',
    Smartphone: '#F44336',
    Tablet: '#FF9800',
    Server: '#607D8B',
    Printer: '#795548',
    'Networking Equipment': '#00BCD4',
    Other: '#9E9E9E'
  };
  
  return colors[deviceType] || colors.Other;
};

/**
 * Get color for disposition
 * @param {string} disposition - Disposition (Refurbish, Recycle, Landfill)
 * @returns {string} - Color hex code
 */
export const getDispositionColor = (disposition) => {
  const colors = {
    Refurbish: '#4CAF50', // Green
    Recycle: '#2196F3', // Blue
    Landfill: '#F44336' // Red
  };
  
  return colors[disposition] || '#9E9E9E';
};

/**
 * Calculate CO2 emissions saved based on device type and weight
 * @param {string} deviceType - Type of device
 * @param {number} weight - Weight in kilograms
 * @returns {number} CO2 emissions saved in kilograms
 */
export const calculateCO2Saved = (deviceType, weight) => {
  if (!weight || isNaN(Number(weight))) {
    return 0;
  }
  
  const numWeight = Number(weight);
  
  // CO2 emission factors (kg CO2 per kg of device)
  // These are approximate values based on lifecycle assessments
  const emissionFactors = {
    laptop: 340,
    desktop: 280,
    tablet: 120,
    phone: 80,
    printer: 40,
    monitor: 200,
    server: 600,
    networking: 100,
    peripheral: 30,
    other: 50
  };
  
  const factor = emissionFactors[deviceType] || emissionFactors.other;
  
  return numWeight * factor;
};

/**
 * Calculate materials recovered from e-waste based on device type and weight
 * @param {string} deviceType - Type of device
 * @param {number} weight - Weight in kilograms
 * @returns {Object} Materials recovered in kilograms
 */
export const calculateMaterialsRecovered = (deviceType, weight) => {
  if (!weight || isNaN(Number(weight))) {
    return {
      metals: 0,
      plastics: 0,
      glass: 0,
      rareEarthMetals: 0,
      other: 0
    };
  }
  
  const numWeight = Number(weight);
  
  // Material composition percentages by device type
  const materialComposition = {
    laptop: {
      metals: 0.65,
      plastics: 0.20,
      glass: 0.05,
      rareEarthMetals: 0.02,
      other: 0.08
    },
    desktop: {
      metals: 0.70,
      plastics: 0.15,
      glass: 0.02,
      rareEarthMetals: 0.01,
      other: 0.12
    },
    tablet: {
      metals: 0.45,
      plastics: 0.30,
      glass: 0.20,
      rareEarthMetals: 0.02,
      other: 0.03
    },
    phone: {
      metals: 0.40,
      plastics: 0.35,
      glass: 0.20,
      rareEarthMetals: 0.03,
      other: 0.02
    },
    printer: {
      metals: 0.50,
      plastics: 0.40,
      glass: 0.02,
      rareEarthMetals: 0.01,
      other: 0.07
    },
    monitor: {
      metals: 0.30,
      plastics: 0.30,
      glass: 0.35,
      rareEarthMetals: 0.01,
      other: 0.04
    },
    server: {
      metals: 0.80,
      plastics: 0.10,
      glass: 0.01,
      rareEarthMetals: 0.03,
      other: 0.06
    },
    networking: {
      metals: 0.60,
      plastics: 0.30,
      glass: 0.01,
      rareEarthMetals: 0.02,
      other: 0.07
    },
    peripheral: {
      metals: 0.40,
      plastics: 0.50,
      glass: 0.01,
      rareEarthMetals: 0.01,
      other: 0.08
    },
    other: {
      metals: 0.50,
      plastics: 0.30,
      glass: 0.05,
      rareEarthMetals: 0.01,
      other: 0.14
    }
  };
  
  const composition = materialComposition[deviceType] || materialComposition.other;
  
  return {
    metals: numWeight * composition.metals,
    plastics: numWeight * composition.plastics,
    glass: numWeight * composition.glass,
    rareEarthMetals: numWeight * composition.rareEarthMetals,
    other: numWeight * composition.other
  };
}; 