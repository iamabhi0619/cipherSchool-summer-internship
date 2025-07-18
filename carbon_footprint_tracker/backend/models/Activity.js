const mongoose = require('mongoose');
const { 
  ENVIRONMENTAL_FACTORS, 
  ENERGY_FACTORS, 
  FOOD_FACTORS, 
  SHOPPING_FACTORS 
} = require('../constants/carbonFactors');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please provide an activity category'],
    enum: ['transportation', 'energy', 'food', 'housing', 'shopping']
  },
  type: {
    type: String,
    required: [true, 'Please provide an activity type']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
    min: [0, 'Amount must be positive']
  },
  unit: {
    type: String,
    required: [true, 'Please provide a unit']
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
    default: Date.now
  },
  carbonEmission: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
});


// Get emission factors from constants
const getEmissionFactors = () => {
  return {
    transportation: Object.keys(ENVIRONMENTAL_FACTORS.EMISSIONS_FACTORS).reduce((acc, key) => {
      acc[key.toLowerCase()] = { 
        factor: ENVIRONMENTAL_FACTORS.EMISSIONS_FACTORS[key], 
        unit: 'km' 
      };
      return acc;
    }, {}),
    
    energy: Object.keys(ENERGY_FACTORS).reduce((acc, key) => {
      acc[key.toLowerCase()] = { 
        factor: ENERGY_FACTORS[key], 
        unit: 'kWh' 
      };
      return acc;
    }, {}),
    
    food: Object.keys(FOOD_FACTORS).reduce((acc, key) => {
      acc[key.toLowerCase()] = { 
        factor: FOOD_FACTORS[key], 
        unit: 'kg' 
      };
      return acc;
    }, {}),
    
    shopping: Object.keys(SHOPPING_FACTORS).reduce((acc, key) => {
      acc[key.toLowerCase()] = { 
        factor: SHOPPING_FACTORS[key], 
        unit: key.includes('ELECTRONICS') ? 'items' : key.includes('CLOTHING') ? 'items' : 'kg'
      };
      return acc;
    }, {})
  };
};

const emissionFactors = getEmissionFactors();

const Activity = mongoose.model('Activity', activitySchema);

module.exports = { Activity };
