/**
 * Environmental Impact Calculation Utilities
 * Based on industry benchmarks for e-waste recycling and refurbishment
 */

// CO2 footprint of manufacturing new devices (kg CO2)
const newDeviceFootprint = {
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
const refurbishmentSavingsPercent = 75; // Using midpoint of 70-80%

// CO2 savings per kg of e-waste recycled (kg CO2/kg e-waste)
const recyclingSavingsPerKg = 1.4; // Using midpoint of 1.2-1.6 kg CO2/kg

// Material composition estimates by device type (percentages)
const materialComposition = {
  Laptop: {
    metals: 50,
    plastics: 30,
    glass: 10,
    rareEarthMetals: 0.3
  },
  Desktop: {
    metals: 65,
    plastics: 20,
    glass: 5,
    rareEarthMetals: 0.1
  },
  'LCD Monitor': {
    metals: 20,
    plastics: 10,
    glass: 70,
    rareEarthMetals: 0.1
  },
  Smartphone: {
    metals: 35,
    plastics: 40,
    glass: 20,
    rareEarthMetals: 0.5
  },
  Tablet: {
    metals: 30,
    plastics: 45,
    glass: 20,
    rareEarthMetals: 0.3
  },
  Server: {
    metals: 70,
    plastics: 15,
    glass: 5,
    rareEarthMetals: 0.2
  },
  Printer: {
    metals: 40,
    plastics: 50,
    glass: 5,
    rareEarthMetals: 0.1
  },
  'Networking Equipment': {
    metals: 60,
    plastics: 35,
    glass: 0,
    rareEarthMetals: 0.2
  },
  Other: {
    metals: 45,
    plastics: 30,
    glass: 5,
    rareEarthMetals: 0.1
  }
};

/**
 * Calculate CO2 savings for a refurbished device
 * @param {string} deviceType - Type of device
 * @returns {number} - CO2 savings in kg
 */
const calculateRefurbishmentCO2Savings = (deviceType) => {
  const footprint = newDeviceFootprint[deviceType] || newDeviceFootprint.Other;
  return footprint * (refurbishmentSavingsPercent / 100);
};

/**
 * Calculate CO2 savings for recycled e-waste
 * @param {number} weight - Weight in kg
 * @returns {number} - CO2 savings in kg
 */
const calculateRecyclingCO2Savings = (weight) => {
  return weight * recyclingSavingsPerKg;
};

/**
 * Calculate materials recovered from recycled e-waste
 * @param {string} deviceType - Type of device
 * @param {number} weight - Weight in kg
 * @returns {Object} - Materials recovered in kg
 */
const calculateMaterialsRecovered = (deviceType, weight) => {
  const composition = materialComposition[deviceType] || materialComposition.Other;
  
  return {
    metals: weight * (composition.metals / 100),
    plastics: weight * (composition.plastics / 100),
    glass: weight * (composition.glass / 100),
    rareEarthMetals: weight * (composition.rareEarthMetals / 100)
  };
};

/**
 * Calculate environmental equivalents
 * @param {number} co2Saved - CO2 savings in kg
 * @returns {Object} - Environmental equivalents
 */
const calculateEnvironmentalEquivalents = (co2Saved) => {
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
const calculateLandfillDiversionRate = (totalWeight, divertedWeight) => {
  if (totalWeight === 0) return 0;
  return (divertedWeight / totalWeight) * 100;
};

module.exports = {
  newDeviceFootprint,
  refurbishmentSavingsPercent,
  recyclingSavingsPerKg,
  materialComposition,
  calculateRefurbishmentCO2Savings,
  calculateRecyclingCO2Savings,
  calculateMaterialsRecovered,
  calculateEnvironmentalEquivalents,
  calculateLandfillDiversionRate
}; 