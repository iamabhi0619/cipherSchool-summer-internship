const { User } = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDashboardData } = require("../utils/getDashboardData");
const { getCarbonLeaderboard, getUserCarbonHistory, updateUserCarbonMetrics } = require("../utils/carbonMetricsCalculator");

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = generateToken(user);

    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user by auth middleware
    const data = await getDashboardData(userId);
    if (!data) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User dashboard data retrieved successfully', data });
  } catch (error) {
    console.error('Error getting user dashboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get carbon leaderboard
exports.getCarbonLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const leaderboard = await getCarbonLeaderboard(limit);
    
    res.status(200).json({ 
      message: 'Carbon leaderboard retrieved successfully', 
      leaderboard,
      count: leaderboard.length
    });
  } catch (error) {
    console.error('Error getting carbon leaderboard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user's carbon score history
exports.getUserCarbonHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const days = parseInt(req.query.days) || 30;
    
    const history = await getUserCarbonHistory(userId, days);
    
    res.status(200).json({ 
      message: 'Carbon score history retrieved successfully', 
      history
    });
  } catch (error) {
    console.error('Error getting carbon history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user's carbon metrics (admin or periodic task)
exports.updateCarbonMetrics = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const result = await updateUserCarbonMetrics(userId);
    
    res.status(200).json({ 
      message: 'Carbon metrics updated successfully', 
      result
    });
  } catch (error) {
    console.error('Error updating carbon metrics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user profile with enhanced carbon data
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Include carbon score rank
    const profile = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      carbonScore: user.carbonScore,
      carbonScoreRank: user.stats?.currentRank || 'Getting Started',
      carbonMetrics: user.carbonMetrics,
      stats: user.stats,
      joinDate: user.createdAt,
      lastLogin: user.lastLogin
    };
    
    res.status(200).json({ 
      message: 'User profile retrieved successfully', 
      profile
    });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Debug endpoint to check carbon score status
exports.getCarbonScoreDebug = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get recent activities for context
    const { Activity } = require('../models/Activity');
    const recentActivities = await Activity.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('category type carbonEmission date');

    const debugInfo = {
      userId: user._id,
      currentCarbonScore: user.carbonScore,
      currentRank: user.stats.currentRank,
      totalActivitiesLogged: user.stats.totalActivitiesLogged,
      totalPoints: user.stats.totalPoints,
      carbonSaved: user.stats.carbonSaved,
      recentCarbonHistory: user.carbonScoreHistory?.slice(-5) || [],
      recentActivities: recentActivities,
      activeBonuses: user.activeBonuses?.filter(bonus => bonus.expiresAt > new Date()) || [],
      lastUpdated: user.updatedAt
    };

    res.status(200).json({
      message: 'Carbon score debug info retrieved',
      debug: debugInfo
    });
  } catch (error) {
    console.error('Error getting carbon score debug:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};