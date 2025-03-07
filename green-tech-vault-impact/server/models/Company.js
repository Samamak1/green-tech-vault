const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a company name'],
    unique: true,
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  contactPerson: {
    type: String,
    required: [true, 'Please add a contact person'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  industry: {
    type: String,
    enum: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Other'],
    default: 'Other'
  },
  size: {
    type: String,
    enum: ['Small (1-50)', 'Medium (51-250)', 'Large (251-1000)', 'Enterprise (1000+)'],
    default: 'Small (1-50)'
  },
  sustainabilityGoals: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Environmental impact summary
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
    }
  }
});

module.exports = mongoose.model('Company', CompanySchema); 