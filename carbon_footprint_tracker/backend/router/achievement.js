const express = require('express');
const router = express.Router();
const {
    getAllAchievements,
    checkAchievements,
    getAchievementLeaderboard,
    getUserAchievements
} = require('../controllers/achievementController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('', getUserAchievements);
router.post('/check', checkAchievements);

// 🎯 Browse achievements
router.get('/all', getAllAchievements);
router.get('/leaderboard', getAchievementLeaderboard);


module.exports = router;
