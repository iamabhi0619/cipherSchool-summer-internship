const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  // Basic Achievement Info
  id: {
    type: String,
    required: true,
    unique: true
  },
  
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  
  // Achievement Metadata
  category: {
    type: String,
    required: true,
    enum: [
      'carbon_reduction',
      'streak',
      'activity_logging',
      'goal_achievement',
      'eco_warrior',
      'transport',
      'energy',
      'food',
      'waste',
      'special'
    ]
  },
  
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard', 'legendary'],
    default: 'easy'
  },
  
  // Badge and Visual
  icon: {
    type: String,
    required: true,
    default: '🏆'
  },
  
  badgeColor: {
    type: String,
    default: '#4CAF50'
  },
  
  // Achievement Requirements
  requirement: {
    type: {
      type: String,
      required: true,
      enum: [
        'streak_days',
        'total_activities',
        'carbon_saved',
        'goals_completed',
        'monthly_target',
        'category_activities',
        'emission_reduction',
        'consecutive_goals',
        'perfect_week',
        'carbon_champion'
      ]
    },
    value: {
      type: Number,
      required: true
    },
    period: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly', 'all_time'],
      default: 'all_time'
    }
  },
  
  // Rewards
  points: {
    type: Number,
    required: true,
    min: 10,
    default: 100
  },
  
  bonus: {
    carbonScoreMultiplier: {
      type: Number,
      default: 1.0
    },
    duration: {
      type: Number, // in days
      default: 0
    }
  },
  
  // Achievement Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  
  // Unlock conditions
  prerequisites: [{
    type: String // IDs of achievements that must be unlocked first
  }],
  
  unlockMessage: {
    type: String,
    maxlength: 200
  }
}, { 
  timestamps: true 
});

// Create indexes for better performance
achievementSchema.index({ category: 1, difficulty: 1 });
achievementSchema.index({ 'requirement.type': 1 });
achievementSchema.index({ isActive: 1 });

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = { Achievement };
