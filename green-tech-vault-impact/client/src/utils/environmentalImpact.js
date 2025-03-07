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
 * Format weight in kg or tonnes
 * @param {number} weight - Weight in kg
 * @returns {string} - Formatted weight
 */
export const formatWeight = (weight) => {
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(2)} tonnes`;
  }
  return `${weight.toFixed(2)} kg`;
};

/**
 * Format CO2 in kg or tonnes
 * @param {number} co2 - CO2 in kg
 * @returns {string} - Formatted CO2
 */
export const formatCO2 = (co2) => {
  if (co2 >= 1000) {
    return `${(co2 / 1000).toFixed(2)} tonnes CO₂`;
  }
  return `${co2.toFixed(2)} kg CO₂`;
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