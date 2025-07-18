const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide your name'], trim: true },
  email: { type: String, required: [true, 'Please provide your email'], unique: true, trim: true, lowercase: true },
  password: { type: String, required: [true, 'Please provide a password'] },
  avatar: { type: String, default: 'default-avatar.png' },
  
  // Enhanced Carbon Score System
  carbonScore: { 
    type: Number, 
    default: 0,
    min: 0
  },
  
  carbonScoreHistory: [{
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    reason: { type: String, enum: ['goal_completion', 'activity_logging', 'achievement_unlock', 'streak_bonus', 'manual_adjustment'] }
  }],
  
  // Carbon tracking metrics
  carbonMetrics: {
    totalEmissionsReduced: { type: Number, default: 0 }, // kg CO₂
    monthlyAverage: { type: Number, default: 0 },
    yearlyTarget: { type: Number, default: 0 },
    bestMonth: {
      value: { type: Number, default: 0 },
      date: { type: Date, default: null }
    }
  },
  
  lastLogin: { type: Date, default: Date.now },
  
  stats: {
    totalActivitiesLogged: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    currentRank: { type: String, default: 'Beginner' },
    totalPoints: { type: Number, default: 0 },
    carbonSaved: { type: Number, default: 0 },
    goalsCompleted: { type: Number, default: 0 },
    goalsInProgress: { type: Number, default: 0 },
    
    // Achievement stats
    achievementsUnlocked: { type: Number, default: 0 },
    totalAchievementPoints: { type: Number, default: 0 },
    lastAchievementDate: { type: Date, default: null },
    achievementStreak: { type: Number, default: 0 },
    
    // Category-specific achievements
    transportAchievements: { type: Number, default: 0 },
    energyAchievements: { type: Number, default: 0 },
    foodAchievements: { type: Number, default: 0 },
    wasteAchievements: { type: Number, default: 0 }
  },
  
  // Achievement bonuses currently active
  activeBonuses: [{
    achievementId: { type: String, required: true },
    multiplier: { type: Number, default: 1.0 },
    expiresAt: { type: Date, required: true }
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User };
