const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  type: {
    type: String,
    enum: ['Pickup', 'Monthly', 'Quarterly', 'Annual', 'Custom'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  dateRange: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  pickups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pickup'
  }],
  impactSummary: {
    totalDevicesCollected: {
      type: Number,
      default: 0
    },
    totalWeightCollected: {
      type: Number, // in kg
      default: 0
    },
    totalCO2Saved: {
      type: Number, // in kg
      default: 0
    },
    totalLandfillDiverted: {
      type: Number, // in kg
      default: 0
    },
    totalRefurbished: {
      type: Number,
      default: 0
    },
    totalRecycled: {
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
    },
    environmentalEquivalents: {
      trees: {
        type: Number,
        default: 0
      },
      cars: {
        type: Number,
        default: 0
      }
    }
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  format: {
    type: String,
    enum: ['PDF', 'Web', 'Both'],
    default: 'Both'
  },
  pdfUrl: {
    type: String
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

// Generate report data from pickups
ReportSchema.methods.generateFromPickups = async function() {
  const Pickup = mongoose.model('Pickup');
  
  // Get all pickups for this report
  const pickups = await Pickup.find({
    _id: { $in: this.pickups },
    company: this.company
  });
  
  // Reset impact summary
  this.impactSummary = {
    totalDevicesCollected: 0,
    totalWeightCollected: 0,
    totalCO2Saved: 0,
    totalLandfillDiverted: 0,
    totalRefurbished: 0,
    totalRecycled: 0,
    materialsRecovered: {
      metals: 0,
      plastics: 0,
      glass: 0,
      rareEarthMetals: 0
    },
    environmentalEquivalents: {
      trees: 0,
      cars: 0
    }
  };
  
  // Aggregate data from all pickups
  for (const pickup of pickups) {
    this.impactSummary.totalDevicesCollected += pickup.deviceCount;
    this.impactSummary.totalWeightCollected += pickup.totalWeight;
    this.impactSummary.totalCO2Saved += pickup.impactSummary.co2Saved;
    this.impactSummary.totalLandfillDiverted += pickup.impactSummary.landfillDiverted;
    this.impactSummary.totalRefurbished += pickup.impactSummary.refurbishedCount;
    this.impactSummary.totalRecycled += pickup.impactSummary.recycledCount;
    
    // Add materials recovered
    this.impactSummary.materialsRecovered.metals += pickup.impactSummary.materialsRecovered.metals;
    this.impactSummary.materialsRecovered.plastics += pickup.impactSummary.materialsRecovered.plastics;
    this.impactSummary.materialsRecovered.glass += pickup.impactSummary.materialsRecovered.glass;
    this.impactSummary.materialsRecovered.rareEarthMetals += pickup.impactSummary.materialsRecovered.rareEarthMetals;
  }
  
  // Calculate environmental equivalents
  // Average tree absorbs ~22kg CO2 per year
  this.impactSummary.environmentalEquivalents.trees = Math.round(this.impactSummary.totalCO2Saved / 22);
  
  // Average car emits ~4.6 metric tons of CO2 per year
  this.impactSummary.environmentalEquivalents.cars = Math.round((this.impactSummary.totalCO2Saved / 4600) * 100) / 100;
  
  this.updatedAt = Date.now();
  return this.save();
};

module.exports = mongoose.model('Report', ReportSchema); 