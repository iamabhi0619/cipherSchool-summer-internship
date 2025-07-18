const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getUserDashboard, 
  getCarbonLeaderboard, 
  getUserCarbonHistory, 
  updateCarbonMetrics,
  getUserProfile,
  getCarbonScoreDebug
} = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', verifyToken, getUserDashboard);
router.get('/profile', verifyToken, getUserProfile);
router.get('/carbon-history', verifyToken, getUserCarbonHistory);
router.get('/leaderboard', getCarbonLeaderboard); // Public endpoint
router.post('/update-carbon-metrics', verifyToken, updateCarbonMetrics);
router.get('/debug/carbon-score', verifyToken, getCarbonScoreDebug); // Debug endpoint

module.exports = router;