const { Achievement } = require('../models/Achievement');
const { UserAchievement } = require('../models/UserAchievement');
const { User } = require('../models/User');
const { Activity } = require('../models/Activity');
const { Goal } = require('../models/Goal');


const ACHIEVEMENT_DEFINITIONS = [
  // 🔥 STREAK ACHIEVEMENTS - Keep users coming back!
  {
    id: 'first_steps',
    title: '👶 First Steps',
    description: 'Log your first activity and start your eco journey!',
    category: 'activity_logging',
    difficulty: 'easy',
    icon: '🚶‍♀️',
    badgeColor: '#4CAF50',
    requirement: { type: 'total_activities', value: 1, period: 'all_time' },
    points: 50,
    rarity: 'common',
    unlockMessage: 'Welcome to your carbon tracking journey! Every small step counts! 🌱'
  },
  
  {
    id: 'week_warrior',
    title: '🔥 Week Warrior',
    description: 'Log activities for 7 consecutive days',
    category: 'streak',
    difficulty: 'medium',
    icon: '🔥',
    badgeColor: '#FF9800',
    requirement: { type: 'streak_days', value: 7, period: 'all_time' },
    points: 200,
    bonus: { carbonScoreMultiplier: 1.1, duration: 7 },
    rarity: 'rare',
    unlockMessage: 'You\'re on fire! 🔥 Keep that streak burning! +10% carbon score boost for 7 days!'
  },
  
  {
    id: 'month_master',
    title: '🌙 Month Master',
    description: 'Maintain a 30-day logging streak',
    category: 'streak',
    difficulty: 'hard',
    icon: '🌙',
    badgeColor: '#9C27B0',
    requirement: { type: 'streak_days', value: 30, period: 'all_time' },
    points: 1000,
    bonus: { carbonScoreMultiplier: 1.25, duration: 30 },
    rarity: 'epic',
    prerequisites: ['week_warrior'],
    unlockMessage: 'Incredible dedication! 🌙 You\'ve mastered the art of consistency! +25% boost for 30 days!'
  },
  
  {
    id: 'legendary_streak',
    title: '⚡ Legendary Streak',
    description: 'Achieve a mind-blowing 100-day streak!',
    category: 'streak',
    difficulty: 'legendary',
    icon: '⚡',
    badgeColor: '#FFD700',
    requirement: { type: 'streak_days', value: 100, period: 'all_time' },
    points: 5000,
    bonus: { carbonScoreMultiplier: 1.5, duration: 100 },
    rarity: 'legendary',
    prerequisites: ['month_master'],
    unlockMessage: '⚡ LEGENDARY STATUS ACHIEVED! You\'re a true eco champion! +50% boost for 100 days!'
  },

  // 🌱 CARBON REDUCTION ACHIEVEMENTS
  {
    id: 'carbon_saver',
    title: '🌱 Carbon Saver',
    description: 'Save your first 10kg of CO₂',
    category: 'carbon_reduction',
    difficulty: 'easy',
    icon: '🌱',
    badgeColor: '#4CAF50',
    requirement: { type: 'carbon_saved', value: 10, period: 'all_time' },
    points: 100,
    rarity: 'common',
    unlockMessage: 'Every kilogram counts! You\'ve saved 10kg CO₂! 🌱'
  },
  
  {
    id: 'eco_defender',
    title: '🛡️ Eco Defender',
    description: 'Reduce your carbon footprint by 100kg CO₂',
    category: 'carbon_reduction',
    difficulty: 'medium',
    icon: '🛡️',
    badgeColor: '#2196F3',
    requirement: { type: 'carbon_saved', value: 100, period: 'all_time' },
    points: 500,
    rarity: 'rare',
    prerequisites: ['carbon_saver'],
    unlockMessage: 'You\'re protecting our planet! 100kg CO₂ saved! 🛡️'
  },
  
  {
    id: 'planet_protector',
    title: '🌍 Planet Protector',
    description: 'Save an incredible 500kg of CO₂!',
    category: 'carbon_reduction',
    difficulty: 'hard',
    icon: '🌍',
    badgeColor: '#795548',
    requirement: { type: 'carbon_saved', value: 500, period: 'all_time' },
    points: 2500,
    bonus: { carbonScoreMultiplier: 1.2, duration: 60 },
    rarity: 'epic',
    prerequisites: ['eco_defender'],
    unlockMessage: '🌍 PLANET PROTECTOR! 500kg CO₂ saved! You\'re making a real difference!'
  },

  // 🎯 GOAL ACHIEVEMENTS
  {
    id: 'goal_getter',
    title: '🎯 Goal Getter',
    description: 'Complete your first eco goal!',
    category: 'goal_achievement',
    difficulty: 'easy',
    icon: '🎯',
    badgeColor: '#E91E63',
    requirement: { type: 'goals_completed', value: 1, period: 'all_time' },
    points: 150,
    rarity: 'common',
    unlockMessage: 'Goal achieved! 🎯 Setting and reaching goals is the key to success!'
  },
  
  {
    id: 'goal_crusher',
    title: '💪 Goal Crusher',
    description: 'Crush 10 eco goals like a champion!',
    category: 'goal_achievement',
    difficulty: 'medium',
    icon: '💪',
    badgeColor: '#FF5722',
    requirement: { type: 'goals_completed', value: 10, period: 'all_time' },
    points: 750,
    rarity: 'rare',
    prerequisites: ['goal_getter'],
    unlockMessage: '💪 GOAL CRUSHER! 10 goals down! You\'re unstoppable!'
  },

  // 🚗 TRANSPORT ACHIEVEMENTS
  {
    id: 'bike_enthusiast',
    title: '🚲 Bike Enthusiast',
    description: 'Log 10 cycling activities',
    category: 'transport',
    difficulty: 'medium',
    icon: '🚲',
    badgeColor: '#4CAF50',
    requirement: { type: 'category_activities', value: 10, period: 'all_time' },
    points: 300,
    rarity: 'rare',
    unlockMessage: '🚲 Pedal power! You\'re cycling your way to a cleaner planet!'
  },
  
  {
    id: 'walk_warrior',
    title: '🚶‍♂️ Walking Warrior',
    description: 'Choose walking over driving 20 times',
    category: 'transport',
    difficulty: 'medium',
    icon: '🚶‍♂️',
    badgeColor: '#607D8B',
    requirement: { type: 'category_activities', value: 20, period: 'all_time' },
    points: 400,
    rarity: 'rare',
    unlockMessage: '🚶‍♂️ Walking Warrior! Every step counts for the planet!'
  },

  // ⚡ ENERGY ACHIEVEMENTS
  {
    id: 'energy_saver',
    title: '💡 Energy Saver',
    description: 'Log 15 energy-saving activities',
    category: 'energy',
    difficulty: 'medium',
    icon: '💡',
    badgeColor: '#FFC107',
    requirement: { type: 'category_activities', value: 15, period: 'all_time' },
    points: 350,
    rarity: 'rare',
    unlockMessage: '💡 Bright idea! You\'re lighting the way to sustainability!'
  },

  // 🍃 FOOD ACHIEVEMENTS
  {
    id: 'plant_power',
    title: '🥬 Plant Power',
    description: 'Choose plant-based meals 25 times',
    category: 'food',
    difficulty: 'medium',
    icon: '🥬',
    badgeColor: '#8BC34A',
    requirement: { type: 'category_activities', value: 25, period: 'all_time' },
    points: 500,
    rarity: 'rare',
    unlockMessage: '🥬 Plant Power activated! Your food choices are healing the planet!'
  },

  // 🗑️ WASTE ACHIEVEMENTS
  {
    id: 'zero_waste_hero',
    title: '♻️ Zero Waste Hero',
    description: 'Log 20 waste reduction activities',
    category: 'waste',
    difficulty: 'hard',
    icon: '♻️',
    badgeColor: '#009688',
    requirement: { type: 'category_activities', value: 20, period: 'all_time' },
    points: 600,
    rarity: 'epic',
    unlockMessage: '♻️ Zero Waste Hero! You\'re turning trash into treasure!'
  },

  // 🌟 SPECIAL ACHIEVEMENTS
  {
    id: 'perfect_week',
    title: '⭐ Perfect Week',
    description: 'Log activities and meet all goals for 7 consecutive days',
    category: 'special',
    difficulty: 'hard',
    icon: '⭐',
    badgeColor: '#FFD700',
    requirement: { type: 'perfect_week', value: 1, period: 'weekly' },
    points: 1500,
    bonus: { carbonScoreMultiplier: 1.3, duration: 14 },
    rarity: 'epic',
    unlockMessage: '⭐ PERFECT WEEK! Flawless execution! +30% bonus for 2 weeks!'
  },
  
  {
    id: 'carbon_champion',
    title: '👑 Carbon Champion',
    description: 'Achieve top 1% carbon score globally',
    category: 'special',
    difficulty: 'legendary',
    icon: '👑',
    badgeColor: '#FFD700',
    requirement: { type: 'carbon_champion', value: 1, period: 'monthly' },
    points: 10000,
    bonus: { carbonScoreMultiplier: 2.0, duration: 30 },
    rarity: 'legendary',
    unlockMessage: '👑 CARBON CHAMPION! You\'re in the elite 1%! DOUBLE POINTS for 30 days!'
  },

  // 🏃‍♀️ ACTIVITY MILESTONES
  {
    id: 'activity_addict',
    title: '🏃‍♀️ Activity Addict',
    description: 'Log 50 activities total',
    category: 'activity_logging',
    difficulty: 'medium',
    icon: '🏃‍♀️',
    badgeColor: '#E91E63',
    requirement: { type: 'total_activities', value: 50, period: 'all_time' },
    points: 400,
    rarity: 'rare',
    prerequisites: ['first_steps'],
    unlockMessage: '🏃‍♀️ Activity Addict! You can\'t stop, won\'t stop tracking!'
  },
  
  {
    id: 'logging_legend',
    title: '📚 Logging Legend',
    description: 'Log an incredible 200 activities!',
    category: 'activity_logging',
    difficulty: 'hard',
    icon: '📚',
    badgeColor: '#3F51B5',
    requirement: { type: 'total_activities', value: 200, period: 'all_time' },
    points: 1200,
    bonus: { carbonScoreMultiplier: 1.15, duration: 45 },
    rarity: 'epic',
    prerequisites: ['activity_addict'],
    unlockMessage: '📚 LOGGING LEGEND! 200 activities! Your dedication is inspirational!'
  },

  // 🌟 ADDITIONAL BEGINNER ACHIEVEMENTS - More fun entry points!
  {
    id: 'eco_curious',
    title: '🤔 Eco Curious',
    description: 'Getting started! Log your second activity.',
    category: 'activity_logging',
    difficulty: 'easy',
    icon: '🤔',
    badgeColor: '#607D8B',
    requirement: { type: 'total_activities', value: 2, period: 'all_time' },
    points: 75,
    rarity: 'common',
    prerequisites: ['first_steps'],
    unlockMessage: 'Curiosity is the first step to change! 🤔 Keep exploring!'
  },

  {
    id: 'weekend_eco_warrior',
    title: '🏖️ Weekend Eco Warrior',
    description: 'No days off! Log an activity on the weekend.',
    category: 'special',
    difficulty: 'easy',
    icon: '🏖️',
    badgeColor: '#FF9800',
    requirement: { type: 'weekend_activity', value: 1, period: 'all_time' },
    points: 150,
    rarity: 'common',
    unlockMessage: '🏖️ Weekend warrior! Even your free time counts for the planet!'
  },

  {
    id: 'daily_difference',
    title: '☀️ Daily Difference',
    description: 'Consistency matters! Log activities for 5 consecutive days.',
    category: 'streak',
    difficulty: 'easy',
    icon: '☀️',
    badgeColor: '#FFC107',
    requirement: { type: 'streak_days', value: 5, period: 'all_time' },
    points: 250,
    bonus: { carbonScoreMultiplier: 1.08, duration: 5 },
    rarity: 'common',
    unlockMessage: '☀️ Making a daily difference! 5 days strong! +8% bonus!'
  },

  // 🎯 MORE GOAL ACHIEVEMENTS
  {
    id: 'goal_starter',
    title: '🎯 Goal Starter',
    description: 'Taking aim! Create your first eco goal.',
    category: 'goal_achievement',
    difficulty: 'easy',
    icon: '🎯',
    badgeColor: '#2196F3',
    requirement: { type: 'goals_created', value: 1, period: 'all_time' },
    points: 100,
    rarity: 'common',
    unlockMessage: '🎯 Goal starter! Every journey begins with a single goal!'
  },

  {
    id: 'goal_focused',
    title: '🔍 Goal Focused',
    description: 'Committed! Complete 3 eco goals.',
    category: 'goal_achievement',
    difficulty: 'medium',
    icon: '🔍',
    badgeColor: '#9C27B0',
    requirement: { type: 'goals_completed', value: 3, period: 'all_time' },
    points: 400,
    rarity: 'rare',
    prerequisites: ['goal_getter'],
    unlockMessage: '🔍 Goal focused! 3 goals conquered! You\'re on a roll!'
  },

  // 💚 MORE CARBON IMPACT ACHIEVEMENTS
  {
    id: 'carbon_aware',
    title: '💡 Carbon Aware',
    description: 'Awareness is key! Save your first 25kg of CO₂.',
    category: 'carbon_reduction',
    difficulty: 'easy',
    icon: '💡',
    badgeColor: '#4CAF50',
    requirement: { type: 'carbon_saved', value: 25, period: 'all_time' },
    points: 300,
    rarity: 'common',
    prerequisites: ['carbon_saver'],
    unlockMessage: '💡 Carbon awareness activated! 25kg CO₂ saved!'
  },

  {
    id: 'emission_fighter',
    title: '⚔️ Emission Fighter',
    description: 'Fighting for the planet! Save 150kg of CO₂.',
    category: 'carbon_reduction',
    difficulty: 'medium',
    icon: '⚔️',
    badgeColor: '#F44336',
    requirement: { type: 'carbon_saved', value: 150, period: 'all_time' },
    points: 700,
    rarity: 'rare',
    prerequisites: ['eco_defender'],
    unlockMessage: '⚔️ Emission fighter! 150kg CO₂ defeated! Keep fighting!'
  },

  // 🚀 ACTIVITY MILESTONE ACHIEVEMENTS
  {
    id: 'activity_rookie',
    title: '🎖️ Activity Rookie',
    description: 'Getting the hang of it! Log 10 total activities.',
    category: 'activity_logging',
    difficulty: 'easy',
    icon: '🎖️',
    badgeColor: '#795548',
    requirement: { type: 'total_activities', value: 10, period: 'all_time' },
    points: 200,
    rarity: 'common',
    prerequisites: ['first_steps'],
    unlockMessage: '🎖️ Activity rookie! 10 activities logged! You\'re getting good at this!'
  },
  
  {
    id: 'eco_dedicated',
    title: '🌟 Eco Dedicated',
    description: 'True dedication! Log 75 total activities.',
    category: 'activity_logging',
    difficulty: 'medium',
    icon: '🌟',
    badgeColor: '#FF5722',
    requirement: { type: 'total_activities', value: 75, period: 'all_time' },
    points: 900,
    rarity: 'rare',
    prerequisites: ['activity_rookie'],
    unlockMessage: '🌟 Eco dedicated! 75 activities! Your dedication shines bright!'
  }
];


const initializeAchievements = async () => {
  try {
    console.log('🚀 Initializing achievement system...');
    
    for (const achievementDef of ACHIEVEMENT_DEFINITIONS) {
      await Achievement.findOneAndUpdate(
        { id: achievementDef.id },
        achievementDef,
        { upsert: true, new: true }
      );
    }
    
    console.log(`✅ ${ACHIEVEMENT_DEFINITIONS.length} achievements initialized!`);
    return { success: true, count: ACHIEVEMENT_DEFINITIONS.length };
  } catch (error) {
    console.error('❌ Error initializing achievements:', error);
    throw error;
  }
};

const checkAndUnlockAchievements = async (userId, triggerType = null) => {
  try {
    console.log(`🔍 Checking achievements for user ${userId}...`);
    
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const userActivities = await Activity.find({ user: userId });
    const userGoals = await Goal.find({ userId: userId });
    
    const unlockedAchievements = [];
    const availableAchievements = await Achievement.find({ isActive: true });
    
    for (const achievement of availableAchievements) {
      // Check if user already has this achievement
      const existingUserAchievement = await UserAchievement.findOne({
        userId: userId,
        achievementId: achievement.id
      });
      
      if (existingUserAchievement && existingUserAchievement.isUnlocked) {
        continue; // Already unlocked
      }
      
      // Check prerequisites
      if (achievement.prerequisites && achievement.prerequisites.length > 0) {
        const prerequisitesMet = await checkPrerequisites(userId, achievement.prerequisites);
        if (!prerequisitesMet) continue;
      }
      
      // Calculate progress
      const progress = await calculateAchievementProgress(
        userId, 
        achievement, 
        user, 
        userActivities, 
        userGoals
      );
      
      // Create or update user achievement
      const userAchievement = await UserAchievement.findOneAndUpdate(
        { userId: userId, achievementId: achievement.id },
        {
          userId: userId,
          achievementId: achievement.id,
          progress: {
            current: progress.current,
            target: progress.target,
            percentage: Math.min(100, Math.round((progress.current / progress.target) * 100))
          }
        },
        { upsert: true, new: true }
      );
      
      // Check if achievement should be unlocked
      if (progress.current >= progress.target && !userAchievement.isUnlocked) {
        await unlockAchievement(userId, achievement, userAchievement);
        unlockedAchievements.push({
          achievement: achievement,
          userAchievement: userAchievement
        });
      }
    }
    
    console.log(`🎉 ${unlockedAchievements.length} new achievements unlocked!`);
    return unlockedAchievements;
    
  } catch (error) {
    console.error('❌ Error checking achievements:', error);
    throw error;
  }
};

const calculateAchievementProgress = async (userId, achievement, user, userActivities, userGoals) => {
  const requirement = achievement.requirement;
  let current = 0;
  const target = requirement.value;
  
  switch (requirement.type) {
    case 'total_activities':
      current = userActivities.length;
      break;
      
    case 'streak_days':
      current = user.stats.streakDays || 0;
      break;
      
    case 'carbon_saved':
      current = user.stats.carbonSaved || 0;
      break;
      
    case 'goals_completed':
      current = userGoals.filter(goal => goal.isCompleted).length;
      break;
      
    case 'category_activities':
      // This would need category-specific logic based on achievement
      const categoryMap = {
        'bike_enthusiast': 'transportation',
        'walk_warrior': 'transportation', 
        'energy_saver': 'energy',
        'plant_power': 'food',
        'zero_waste_hero': 'waste'
      };
      
      const category = categoryMap[achievement.id];
      if (category) {
        current = userActivities.filter(activity => 
          activity.category.toLowerCase() === category.toLowerCase()
        ).length;
      }
      break;
      
    case 'perfect_week':
      // Check if user had a perfect week (complex logic)
      current = await checkPerfectWeek(userId);
      break;
      
    case 'carbon_champion':
      // Check if user is in top 1% (complex logic)
      current = await checkCarbonChampionStatus(userId);
      break;
      
    default:
      current = 0;
  }
  
  return { current, target };
};

/**
 * Unlock an achievement for a user
 */
const unlockAchievement = async (userId, achievement, userAchievement) => {
  try {
    // Update user achievement
    userAchievement.isUnlocked = true;
    userAchievement.unlockedAt = new Date();
    await userAchievement.save();
    
    // Update user stats and award points
    const user = await User.findById(userId);
    user.stats.achievementsUnlocked = (user.stats.achievementsUnlocked || 0) + 1;
    user.stats.totalAchievementPoints = (user.stats.totalAchievementPoints || 0) + achievement.points;
    user.stats.lastAchievementDate = new Date();
    
    // Award carbon score points
    user.carbonScore = (user.carbonScore || 0) + achievement.points;
    
    // Add to carbon score history
    user.carbonScoreHistory.push({
      score: achievement.points,
      date: new Date(),
      reason: 'achievement_unlock'
    });
    
    // Apply bonus if available
    if (achievement.bonus && achievement.bonus.duration > 0) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + achievement.bonus.duration);
      
      user.activeBonuses.push({
        achievementId: achievement.id,
        multiplier: achievement.bonus.carbonScoreMultiplier || 1.0,
        expiresAt: expiresAt
      });
    }
    
    await user.save();
    
    console.log(`🎉 Achievement unlocked: ${achievement.title} for user ${userId}`);
    
  } catch (error) {
    console.error('❌ Error unlocking achievement:', error);
    throw error;
  }
};

/**
 * Check if prerequisites are met
 */
const checkPrerequisites = async (userId, prerequisites) => {
  const userAchievements = await UserAchievement.find({
    userId: userId,
    achievementId: { $in: prerequisites },
    isUnlocked: true
  });
  
  return userAchievements.length === prerequisites.length;
};

/**
 * Helper functions for complex achievement types
 */
const checkPerfectWeek = async (userId) => {
  // Complex logic to check if user had a perfect week
  // (logged activities every day and met all goals)
  return 0; // Placeholder
};

const checkCarbonChampionStatus = async (userId) => {
  // Complex logic to check if user is in top 1% globally
  return 0; // Placeholder
};

/**
 * Get user's achievement progress and stats
 */
const getUserAchievements = async (userId) => {
  try {
    const [userAchievements, allAchievements, user] = await Promise.all([
      UserAchievement.find({ userId: userId }),
      Achievement.find({ isActive: true }),
      User.findById(userId)
    ]);
    
    const unlockedAchievements = userAchievements.filter(ua => ua.isUnlocked);
    const inProgressAchievements = userAchievements
      .filter(ua => !ua.isUnlocked && ua.progress.percentage > 0)
      .sort((a, b) => b.progress.percentage - a.progress.percentage);
    
    const recentAchievements = unlockedAchievements
      .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
      .slice(0, 5);
    
    // Calculate achievement stats
    const achievementStats = {
      total: allAchievements.length,
      unlocked: unlockedAchievements.length,
      inProgress: inProgressAchievements.length,
      completionRate: Math.round((unlockedAchievements.length / allAchievements.length) * 100),
      totalPoints: user.stats.totalAchievementPoints || 0,
      lastUnlocked: user.stats.lastAchievementDate,
      
      // Category breakdown
      categories: {
        streak: unlockedAchievements.filter(ua => 
          allAchievements.find(a => a.id === ua.achievementId)?.category === 'streak'
        ).length,
        carbonReduction: unlockedAchievements.filter(ua => 
          allAchievements.find(a => a.id === ua.achievementId)?.category === 'carbon_reduction'
        ).length,
        goals: unlockedAchievements.filter(ua => 
          allAchievements.find(a => a.id === ua.achievementId)?.category === 'goal_achievement'
        ).length,
        transport: unlockedAchievements.filter(ua => 
          allAchievements.find(a => a.id === ua.achievementId)?.category === 'transport'
        ).length
      },
      
      // Rarity breakdown
      rarities: {
        common: unlockedAchievements.filter(ua => 
          allAchievements.find(a => a.id === ua.achievementId)?.rarity === 'common'
        ).length,
        rare: unlockedAchievements.filter(ua => 
          allAchievements.find(a => a.id === ua.achievementId)?.rarity === 'rare'
        ).length,
        epic: unlockedAchievements.filter(ua => 
          allAchievements.find(a => a.id === ua.achievementId)?.rarity === 'epic'
        ).length,
        legendary: unlockedAchievements.filter(ua => 
          allAchievements.find(a => a.id === ua.achievementId)?.rarity === 'legendary'
        ).length
      }
    };
    
    return {
      recent: recentAchievements,
      unlocked: unlockedAchievements,
      inProgress: inProgressAchievements.slice(0, 10), // Top 10 closest to completion
      stats: achievementStats,
      activeBonuses: user.activeBonuses.filter(bonus => new Date() < bonus.expiresAt)
    };
    
  } catch (error) {
    console.error('❌ Error getting user achievements:', error);
    throw error;
  }
};

module.exports = {
  initializeAchievements,
  checkAndUnlockAchievements,
  getUserAchievements,
  ACHIEVEMENT_DEFINITIONS
};
