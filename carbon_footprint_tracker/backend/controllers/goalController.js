const { Goal } = require('../models/Goal');
const { User } = require('../models/User');
const { updateCarbonScore } = require('../utils/dashboardHelpers');
const { checkAndUnlockAchievements } = require('../utils/achievementsCalculator');

exports.createGoal = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            priority,
            estimatedImpact,
            unit,
            targetDate,
            tags,
            notes
        } = req.body;

        const userId = req.user.id;

        // Validate required fields
        if (!title || !description || !category || !estimatedImpact) {
            return res.status(400).json({
                message: 'Please provide all required fields: title, description, category, and estimatedImpact'
            });
        }

        // Create new goal
        const goal = new Goal({
            title,
            description,
            category,
            priority: priority || 'medium',
            estimatedImpact,
            unit: unit || 'kg CO₂/year',
            targetDate,
            tags: tags || [],
            notes: notes || '',
            userId
        });

        await goal.save();

        // Update user stats
        const user = await User.findById(userId);
        if (user) {
            user.stats.goalsInProgress = (user.stats.goalsInProgress || 0) + 1;
            await user.save();
        }

        res.status(201).json({
            message: 'Goal created successfully',
            goal
        });
    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserGoals = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status, category, priority } = req.query;

        // Build filter object
        let filter = { userId };
        
        if (status === 'completed') {
            filter.isCompleted = true;
        } else if (status === 'active') {
            filter.isCompleted = false;
        }
        
        if (category) {
            filter.category = category;
        }
        
        if (priority) {
            filter.priority = priority;
        }

        const goals = await Goal.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Goals retrieved successfully',
            goals,
            count: goals.length
        });
    } catch (error) {
        console.error('Error getting user goals:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const userId = req.user.id;

        const goal = await Goal.findOne({ _id: goalId, userId });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json({
            message: 'Goal retrieved successfully',
            goal
        });
    } catch (error) {
        console.error('Error getting goal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const userId = req.user.id;
        const updateData = req.body;

        // Remove userId from update data to prevent tampering
        delete updateData.userId;

        const goal = await Goal.findOneAndUpdate(
            { _id: goalId, userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json({
            message: 'Goal updated successfully',
            goal
        });
    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Mark goal as completed
exports.completeGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const userId = req.user.id;

        const goal = await Goal.findOne({ _id: goalId, userId });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.isCompleted) {
            return res.status(400).json({ message: 'Goal is already completed' });
        }

        // Mark as completed
        goal.isCompleted = true;
        goal.completedAt = new Date();
        goal.progress = 100;
        await goal.save();

        // Update user stats and carbon score
        const user = await User.findById(userId);
        if (user) {
            user.stats.goalsCompleted = (user.stats.goalsCompleted || 0) + 1;
            user.stats.goalsInProgress = Math.max(0, (user.stats.goalsInProgress || 1) - 1);
            
            // Award carbon score points
            const basePoints = goal.estimatedImpact * 10;
            const priorityMultiplier = {
                'high': 1.5,
                'medium': 1.0,
                'low': 0.7
            };
            const points = Math.round(basePoints * (priorityMultiplier[goal.priority] || 1.0));
            
            await updateCarbonScore(user, points, 'goal_completion');
        }

        // 🎉 Check for achievements after goal completion!
        try {
            await checkAndUnlockAchievements(userId, 'goal_completed');
        } catch (achievementError) {
            console.warn('Achievement check failed:', achievementError);
            // Don't fail the goal completion if achievement check fails
        }

        res.status(200).json({
            message: 'Goal completed successfully',
            goal
        });
    } catch (error) {
        console.error('Error completing goal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update goal progress
exports.updateGoalProgress = async (req, res) => {
    try {
        const { goalId } = req.params;
        const { progress } = req.body;
        const userId = req.user.id;

        if (progress < 0 || progress > 100) {
            return res.status(400).json({ message: 'Progress must be between 0 and 100' });
        }

        const goal = await Goal.findOne({ _id: goalId, userId });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        const oldProgress = goal.progress;
        goal.progress = progress;

        // Auto-complete if progress reaches 100%
        if (progress === 100 && !goal.isCompleted) {
            goal.isCompleted = true;
            goal.completedAt = new Date();
            
            // Update user stats
            const user = await User.findById(userId);
            if (user) {
                user.stats.goalsCompleted = (user.stats.goalsCompleted || 0) + 1;
                user.stats.goalsInProgress = Math.max(0, (user.stats.goalsInProgress || 1) - 1);
                await user.save();
            }
        }

        await goal.save();

        res.status(200).json({
            message: 'Goal progress updated successfully',
            goal
        });
    } catch (error) {
        console.error('Error updating goal progress:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const userId = req.user.id;

        const goal = await Goal.findOneAndDelete({ _id: goalId, userId });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Update user stats if goal was active
        if (!goal.isCompleted) {
            const user = await User.findById(userId);
            if (user) {
                user.stats.goalsInProgress = Math.max(0, (user.stats.goalsInProgress || 1) - 1);
                await user.save();
            }
        }

        res.status(200).json({
            message: 'Goal deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get goal statistics
exports.getGoalStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const [totalGoals, completedGoals, activeGoals] = await Promise.all([
            Goal.countDocuments({ userId }),
            Goal.countDocuments({ userId, isCompleted: true }),
            Goal.countDocuments({ userId, isCompleted: false })
        ]);

        const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

        // Get category breakdown
        const categoryStats = await Goal.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        // Get priority breakdown
        const priorityStats = await Goal.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: '$priority', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            message: 'Goal statistics retrieved successfully',
            stats: {
                total: totalGoals,
                completed: completedGoals,
                active: activeGoals,
                completionRate,
                categoryBreakdown: categoryStats.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {}),
                priorityBreakdown: priorityStats.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {})
            }
        });
    } catch (error) {
        console.error('Error getting goal statistics:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
