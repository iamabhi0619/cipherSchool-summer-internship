const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  achievementId: {
    type: String,
    required: true
  },
  
  // Progress tracking
  isUnlocked: {
    type: Boolean,
    default: false
  },
  
  progress: {
    current: {
      type: Number,
      default: 0
    },
    target: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  
  // Unlock details
  unlockedAt: {
    type: Date,
    default: null
  },
  
  notificationSent: {
    type: Boolean,
    default: false
  },
  
  // Bonus tracking (if achievement provides temporary bonuses)
  bonusActive: {
    type: Boolean,
    default: false
  },
  
  bonusExpiresAt: {
    type: Date,
    default: null
  },
  
  // Streak tracking (for achievements that require maintaining streaks)
  streakData: {
    currentStreak: {
      type: Number,
      default: 0
    },
    lastActivityDate: {
      type: Date,
      default: null
    },
    bestStreak: {
      type: Number,
      default: 0
    }
  }
}, { 
  timestamps: true 
});

// Compound index for efficient queries
userAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });
userAchievementSchema.index({ userId: 1, isUnlocked: 1 });
userAchievementSchema.index({ userId: 1, bonusActive: 1 });

// Calculate progress percentage when progress changes
userAchievementSchema.pre('save', function(next) {
  if (this.progress.target > 0) {
    this.progress.percentage = Math.min(100, Math.round((this.progress.current / this.progress.target) * 100));
  }
  
  // Auto-unlock if progress reaches target
  if (this.progress.current >= this.progress.target && !this.isUnlocked) {
    this.isUnlocked = true;
    this.unlockedAt = new Date();
  }
  
  next();
});

const UserAchievement = mongoose.model('UserAchievement', userAchievementSchema);

module.exports = { UserAchievement };
