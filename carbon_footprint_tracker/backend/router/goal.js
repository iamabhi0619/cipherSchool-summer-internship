const express = require('express');
const router = express.Router();
const {
    createGoal,
    getUserGoals,
    getGoal,
    updateGoal,
    completeGoal,
    updateGoalProgress,
    deleteGoal,
    getGoalStats
} = require('../controllers/goalController');
const { verifyToken } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(verifyToken);

// Goal CRUD routes
router.post('/', createGoal);
router.get('/', getUserGoals);
router.get('/stats', getGoalStats);
router.get('/:goalId', getGoal);
router.put('/:goalId', updateGoal);
router.patch('/:goalId/complete', completeGoal);
router.patch('/:goalId/progress', updateGoalProgress);
router.delete('/:goalId', deleteGoal);

module.exports = router;
