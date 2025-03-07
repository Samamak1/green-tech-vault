const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please specify device type'],
    enum: ['Laptop', 'Desktop', 'LCD Monitor', 'Smartphone', 'Tablet', 'Server', 'Printer', 'Networking Equipment', 'Other'],
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  serialNumber: {
    type: String,
    trim: true
  },
  weight: {
    type: Number, // in kg
    required: [true, 'Please specify device weight']
  },
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Non-functional'],
    default: 'Fair'
  },
  status: {
    type: String,
    enum: ['Received', 'Assessed', 'Refurbished', 'Recycled', 'Sold', 'Donated'],
    default: 'Received'
  },
  disposition: {
    type: String,
    enum: ['Refurbish', 'Recycle', 'Landfill'],
    default: 'Recycle'
  },
  // Environmental impact factors based on device type
  environmentalImpact: {
    // CO2 footprint of manufacturing a new device (kg CO2)
    newDeviceFootprint: {
      type: Number,
      default: function() {
        switch(this.type) {
          case 'Laptop': return 250; // 200-300 kg CO2
          case 'Desktop': return 350; // 300-400 kg CO2
          case 'LCD Monitor': return 175; // 150-200 kg CO2
          case 'Smartphone': return 65; // 50-80 kg CO2
          case 'Tablet': return 110; // 100-120 kg CO2
          case 'Server': return 750; // 500-1000+ kg CO2
          default: return 100; // Default value for other devices
        }
      }
    },
    // Percentage of emissions avoided by refurbishing (70-80%)
    refurbishmentSavingsPercent: {
      type: Number,
      default: 75 // 75% is the midpoint of 70-80%
    },
    // CO2 savings per kg of e-waste recycled (kg CO2/kg e-waste)
    recyclingSavingsPerKg: {
      type: Number,
      default: 1.4 // 1.2-1.6 kg CO2/kg e-waste, using 1.4 as midpoint
    },
    // Material composition estimates (percentages)
    materialComposition: {
      metals: {
        type: Number, // percentage
        default: function() {
          switch(this.type) {
            case 'Desktop': return 65;
            case 'Server': return 70;
            case 'Laptop': return 50;
            case 'Smartphone': return 35;
            case 'Tablet': return 30;
            default: return 45;
          }
        }
      },
      plastics: {
        type: Number, // percentage
        default: function() {
          switch(this.type) {
            case 'Desktop': return 20;
            case 'Server': return 15;
            case 'Laptop': return 30;
            case 'Smartphone': return 40;
            case 'Tablet': return 45;
            default: return 30;
          }
        }
      },
      glass: {
        type: Number, // percentage
        default: function() {
          switch(this.type) {
            case 'LCD Monitor': return 70;
            case 'Smartphone': return 20;
            case 'Tablet': return 20;
            case 'Laptop': return 10;
            default: return 5;
          }
        }
      },
      rareEarthMetals: {
        type: Number, // percentage
        default: function() {
          switch(this.type) {
            case 'Smartphone': return 0.5;
            case 'Laptop': return 0.3;
            case 'Tablet': return 0.3;
            case 'Server': return 0.2;
            default: return 0.1;
          }
        }
      }
    }
  },
  notes: {
    type: String,
    trim: true
  },
  pickup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pickup',
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate CO2 savings based on disposition
DeviceSchema.methods.calculateCO2Savings = function() {
  if (this.disposition === 'Refurbish') {
    // For refurbished devices: newDeviceFootprint * refurbishmentSavingsPercent / 100
    return this.environmentalImpact.newDeviceFootprint * (this.environmentalImpact.refurbishmentSavingsPercent / 100);
  } else if (this.disposition === 'Recycle') {
    // For recycled devices: weight * recyclingSavingsPerKg
    return this.weight * this.environmentalImpact.recyclingSavingsPerKg;
  }
  return 0; // No savings for landfill
};

// Calculate materials recovered based on weight and material composition
DeviceSchema.methods.calculateMaterialsRecovered = function() {
  if (this.disposition === 'Recycle') {
    const composition = this.environmentalImpact.materialComposition;
    return {
      metals: this.weight * (composition.metals / 100),
      plastics: this.weight * (composition.plastics / 100),
      glass: this.weight * (composition.glass / 100),
      rareEarthMetals: this.weight * (composition.rareEarthMetals / 100)
    };
  }
  return {
    metals: 0,
    plastics: 0,
    glass: 0,
    rareEarthMetals: 0
  };
};

module.exports = mongoose.model('Device', DeviceSchema); 