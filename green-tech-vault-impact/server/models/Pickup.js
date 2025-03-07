const mongoose = require('mongoose');

const PickupSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please add a pickup date'],
    default: Date.now
  },
  location: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  totalWeight: {
    type: Number, // in kg
    default: 0
  },
  deviceCount: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    trim: true
  },
  // Environmental impact summary for this pickup
  impactSummary: {
    co2Saved: {
      type: Number, // in kg
      default: 0
    },
    landfillDiverted: {
      type: Number, // in kg
      default: 0
    },
    refurbishedCount: {
      type: Number,
      default: 0
    },
    recycledCount: {
      type: Number,
      default: 0
    },
    materialsRecovered: {
      metals: {
        type: Number, // in kg
        default: 0
      },
      plastics: {
        type: Number, // in kg
        default: 0
      },
      glass: {
        type: Number, // in kg
        default: 0
      },
      rareEarthMetals: {
        type: Number, // in kg
        default: 0
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the impact summary based on devices
PickupSchema.methods.updateImpactSummary = async function() {
  const Device = mongoose.model('Device');
  
  // Get all devices for this pickup
  const devices = await Device.find({ pickup: this._id });
  
  // Reset counters
  this.deviceCount = devices.length;
  this.totalWeight = 0;
  this.impactSummary = {
    co2Saved: 0,
    landfillDiverted: 0,
    refurbishedCount: 0,
    recycledCount: 0,
    materialsRecovered: {
      metals: 0,
      plastics: 0,
      glass: 0,
      rareEarthMetals: 0
    }
  };
  
  // Calculate totals
  for (const device of devices) {
    // Add to total weight
    this.totalWeight += device.weight;
    
    // Add to CO2 savings
    this.impactSummary.co2Saved += device.calculateCO2Savings();
    
    // Add to landfill diversion (all weight except what goes to landfill)
    if (device.disposition !== 'Landfill') {
      this.impactSummary.landfillDiverted += device.weight;
    }
    
    // Count by disposition
    if (device.disposition === 'Refurbish') {
      this.impactSummary.refurbishedCount += 1;
    } else if (device.disposition === 'Recycle') {
      this.impactSummary.recycledCount += 1;
      
      // Add recovered materials
      const materials = device.calculateMaterialsRecovered();
      this.impactSummary.materialsRecovered.metals += materials.metals;
      this.impactSummary.materialsRecovered.plastics += materials.plastics;
      this.impactSummary.materialsRecovered.glass += materials.glass;
      this.impactSummary.materialsRecovered.rareEarthMetals += materials.rareEarthMetals;
    }
  }
  
  this.updatedAt = Date.now();
  return this.save();
};

// Generate report data for this pickup
PickupSchema.methods.generateReportData = function() {
  // Calculate percentages
  const refurbishedPercent = this.deviceCount > 0 ? 
    (this.impactSummary.refurbishedCount / this.deviceCount) * 100 : 0;
  
  const recycledPercent = this.deviceCount > 0 ? 
    (this.impactSummary.recycledCount / this.deviceCount) * 100 : 0;
  
  const landfillDiversionRate = this.totalWeight > 0 ? 
    (this.impactSummary.landfillDiverted / this.totalWeight) * 100 : 0;
  
  // Environmental equivalents
  // Average tree absorbs ~22kg CO2 per year
  const treesEquivalent = Math.round(this.impactSummary.co2Saved / 22);
  
  // Average car emits ~4.6 metric tons of CO2 per year
  const carsEquivalent = Math.round((this.impactSummary.co2Saved / 4600) * 100) / 100;
  
  return {
    pickupId: this._id,
    date: this.date,
    company: this.company,
    deviceCount: this.deviceCount,
    totalWeight: this.totalWeight,
    co2Saved: this.impactSummary.co2Saved,
    landfillDiverted: this.impactSummary.landfillDiverted,
    refurbished: {
      count: this.impactSummary.refurbishedCount,
      percent: refurbishedPercent
    },
    recycled: {
      count: this.impactSummary.recycledCount,
      percent: recycledPercent
    },
    materialsRecovered: this.impactSummary.materialsRecovered,
    landfillDiversionRate: landfillDiversionRate,
    environmentalEquivalents: {
      trees: treesEquivalent,
      cars: carsEquivalent
    }
  };
};

module.exports = mongoose.model('Pickup', PickupSchema); 