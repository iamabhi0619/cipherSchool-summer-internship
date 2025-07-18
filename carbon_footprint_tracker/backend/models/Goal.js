const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  
  // Goal categorization
  category: {
    type: String,
    required: true,
    enum: ['energy', 'transportation', 'food', 'housing', 'shopping'],
    lowercase: true
  },
  
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  
  // Environmental impact
  estimatedImpact: {
    type: Number,
    required: true,
    min: 0
  },
  
  unit: {
    type: String,
    required: true,
    enum: [
      'kg CO₂/year',
      'kg CO₂/month', 
      'kg CO₂/week',
      'kg CO₂/day',
      'kg CO₂/trip',
      'kg CO₂/event'
    ],
    default: 'kg CO₂/year'
  },
  
  // Goal status and tracking
  isCompleted: {
    type: Boolean,
    default: false
  },
  
  completedAt: {
    type: Date,
    default: null
  },
  
  // User association
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Progress tracking
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  
  // Additional metadata
  tags: [{
    type: String,
    trim: true
  }],
  
  notes: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  
  // Tracking dates
  targetDate: {
    type: Date,
    default: null
  },
  
  startedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });



const Goal = mongoose.model('Goal', goalSchema);

module.exports = { Goal };
