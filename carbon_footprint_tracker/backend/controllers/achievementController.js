const { Achievement } = require('../models/Achievement');
const { UserAchievement } = require('../models/UserAchievement');
const { User } = require('../models/User');
const { 
  getUserAchievements: getAchievementsData, 
  checkAndUnlockAchievements, 
} = require('../utils/achievementsCalculator');

exports.getUserAchievements = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const achievementsData = await getAchievementsData(userId);
    
    res.status(200).json({
      message: 'User achievements retrieved successfully',
      data: achievementsData
    });
    
  } catch (error) {
    console.error('Error getting user achievements:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

exports.getAllAchievements = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, difficulty, rarity } = req.query;
    
    // Build filter object
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (rarity) filter.rarity = rarity;
    
    const [allAchievements, userAchievements] = await Promise.all([
      Achievement.find(filter).sort({ difficulty: 1, points: 1 }),
      UserAchievement.find({ userId: userId })
    ]);
    
    // Merge achievement data with user progress
    const achievementsWithProgress = allAchievements.map(achievement => {
      const userAchievement = userAchievements.find(ua => ua.achievementId === achievement.id);
      
      return {
        ...achievement.toObject(),
        userProgress: userAchievement ? {
          isUnlocked: userAchievement.isUnlocked,
          progress: userAchievement.progress,
          unlockedAt: userAchievement.unlockedAt
        } : {
          isUnlocked: false,
          progress: { current: 0, target: achievement.requirement.value, percentage: 0 },
          unlockedAt: null
        }
      };
    });
    
    // Group by category for better presentation
    const groupedAchievements = achievementsWithProgress.reduce((acc, achievement) => {
      if (!acc[achievement.category]) {
        acc[achievement.category] = [];
      }
      acc[achievement.category].push(achievement);
      return acc;
    }, {});
    
    res.status(200).json({
      message: 'All achievements retrieved successfully',
      data: {
        achievements: achievementsWithProgress,
        groupedByCategory: groupedAchievements,
        totalCount: allAchievements.length,
        categories: [...new Set(allAchievements.map(a => a.category))],
        difficulties: [...new Set(allAchievements.map(a => a.difficulty))],
        rarities: [...new Set(allAchievements.map(a => a.rarity))]
      }
    });
    
  } catch (error) {
    console.error('Error getting all achievements:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

exports.checkAchievements = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const newAchievements = await checkAndUnlockAchievements(userId);
    
    res.status(200).json({
      message: 'Achievement check completed',
      data: {
        newAchievements: newAchievements,
        count: newAchievements.length
      }
    });
    
  } catch (error) {
    console.error('Error checking achievements:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

exports.getAchievementLeaderboard = async (req, res) => {
  try {
    const { limit = 50, category } = req.query;
    
    let matchFilter = {};
    if (category) {
      const categoryAchievements = await Achievement.find({ category: category, isActive: true });
      const achievementIds = categoryAchievements.map(a => a.id);
      matchFilter.achievementId = { $in: achievementIds };
    }
    
    const leaderboard = await User.aggregate([
      {
        $match: { 'stats.achievementsUnlocked': { $gt: 0 } }
      },
      {
        $sort: { 
          'stats.totalAchievementPoints': -1, 
          'stats.achievementsUnlocked': -1,
          'carbonScore': -1
        }
      },
      {
        $limit: parseInt(limit)
      },
      {
        $project: {
          name: 1,
          email: 1,
          avatar: 1,
          carbonScore: 1,
          'stats.achievementsUnlocked': 1,
          'stats.totalAchievementPoints': 1,
          'stats.lastAchievementDate': 1
        }
      }
    ]);
    
    // Add rank to each user
    const rankedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      ...user
    }));
    
    res.status(200).json({
      message: 'Achievement leaderboard retrieved successfully',
      data: {
        leaderboard: rankedLeaderboard,
        totalUsers: rankedLeaderboard.length
      }
    });
    
  } catch (error) {
    console.error('Error getting achievement leaderboard:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};