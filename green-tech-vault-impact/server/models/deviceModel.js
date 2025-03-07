const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceType: {
    type: String,
    required: true,
    enum: ['Laptop', 'Desktop Tower', 'LCD Monitor', 'Smartphone', 'Tablet', 'Server', 'Other'],
    index: true
  },
  brand: {
    type: String,
    required: false
  },
  model: {
    type: String,
    required: false
  },
  averageWeight: {
    type: Number, // in kg
    required: true
  },
  carbonFootprint: {
    type: Number, // in kg CO2
    required: true,
    description: 'Estimated CO2 footprint for manufacturing a new device'
  },
  refurbishmentSavingsPercentage: {
    type: Number, // percentage (0-100)
    required: true,
    default: 75, // Default to 75% (midpoint of 70-80%)
    description: 'Percentage of carbon emissions saved when refurbishing vs. manufacturing new'
  },
  recyclingCO2SavingsPerKg: {
    type: Number, // in kg CO2 per kg of e-waste
    required: true,
    default: 1.4, // Default to 1.4 kg CO2 per kg (midpoint of 1.2-1.6)
    description: 'CO2 emissions saved per kg when recycling this device type'
  },
  materialComposition: {
    metals: {
      type: Number, // percentage (0-100)
      required: true,
      default: 25
    },
    plastics: {
      type: Number, // percentage (0-100)
      required: true,
      default: 20
    },
    glass: {
      type: Number, // percentage (0-100)
      required: true,
      default: 10
    },
    rareEarthMetals: {
      type: Number, // percentage (0-100)
      required: true,
      default: 0.5
    },
    otherMaterials: {
      type: Number, // percentage (0-100)
      required: true,
      default: 44.5
    }
  },
  hazardousComponents: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Pre-populate with standard device types
deviceSchema.statics.initializeDefaultDevices = async function() {
  const defaultDevices = [
    {
      deviceType: 'Laptop',
      averageWeight: 2.0,
      carbonFootprint: 250, // midpoint of 200-300 kg CO2
      refurbishmentSavingsPercentage: 75,
      recyclingCO2SavingsPerKg: 1.4,
      materialComposition: {
        metals: 30,
        plastics: 25,
        glass: 5,
        rareEarthMetals: 0.5,
        otherMaterials: 39.5
      },
      hazardousComponents: ['Lithium Battery', 'Mercury (in older models)']
    },
    {
      deviceType: 'Desktop Tower',
      averageWeight: 9.0,
      carbonFootprint: 350, // midpoint of 300-400 kg CO2
      refurbishmentSavingsPercentage: 75,
      recyclingCO2SavingsPerKg: 1.4,
      materialComposition: {
        metals: 60,
        plastics: 15,
        glass: 0,
        rareEarthMetals: 0.3,
        otherMaterials: 24.7
      },
      hazardousComponents: ['Lead Solder (in older models)', 'Lithium Battery']
    },
    {
      deviceType: 'LCD Monitor',
      averageWeight: 5.0,
      carbonFootprint: 175, // midpoint of 150-200 kg CO2
      refurbishmentSavingsPercentage: 75,
      recyclingCO2SavingsPerKg: 1.4,
      materialComposition: {
        metals: 20,
        plastics: 30,
        glass: 40,
        rareEarthMetals: 0.2,
        otherMaterials: 9.8
      },
      hazardousComponents: ['Mercury (in older models)']
    },
    {
      deviceType: 'Smartphone',
      averageWeight: 0.2,
      carbonFootprint: 65, // midpoint of 50-80 kg CO2
      refurbishmentSavingsPercentage: 75,
      recyclingCO2SavingsPerKg: 1.4,
      materialComposition: {
        metals: 25,
        plastics: 40,
        glass: 20,
        rareEarthMetals: 1.0,
        otherMaterials: 14
      },
      hazardousComponents: ['Lithium Battery']
    },
    {
      deviceType: 'Tablet',
      averageWeight: 0.5,
      carbonFootprint: 110, // midpoint of 100-120 kg CO2
      refurbishmentSavingsPercentage: 75,
      recyclingCO2SavingsPerKg: 1.4,
      materialComposition: {
        metals: 20,
        plastics: 35,
        glass: 30,
        rareEarthMetals: 0.8,
        otherMaterials: 14.2
      },
      hazardousComponents: ['Lithium Battery']
    },
    {
      deviceType: 'Server',
      averageWeight: 15.0,
      carbonFootprint: 750, // midpoint of 500-1000 kg CO2
      refurbishmentSavingsPercentage: 75,
      recyclingCO2SavingsPerKg: 1.4,
      materialComposition: {
        metals: 70,
        plastics: 10,
        glass: 0,
        rareEarthMetals: 0.5,
        otherMaterials: 19.5
      },
      hazardousComponents: ['Lead Solder (in older models)', 'Lithium Battery']
    }
  ];

  // Check if devices already exist
  const count = await this.countDocuments();
  if (count === 0) {
    await this.insertMany(defaultDevices);
    console.log('Default device types initialized');
  }
};

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device; 