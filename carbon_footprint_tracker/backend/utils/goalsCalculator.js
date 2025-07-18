const { Goal } = require('../models/Goal');

const getGoalsData = async (userId) => {
    try {
        const [activeGoals, completedGoals, allGoals] = await Promise.all([
            Goal.find({ userId: userId, isCompleted: false }).sort({ targetDate: 1 }),
            Goal.find({ userId: userId, isCompleted: true }).sort({ completedAt: -1 }).limit(5),
            Goal.find({ userId: userId })
        ]);

        // Calculate total estimated impact from active goals
        const totalEstimatedImpact = activeGoals.reduce((sum, goal) => sum + goal.estimatedImpact, 0);
        
        // Calculate average progress of active goals
        const averageProgress = activeGoals.length > 0 
            ? Math.round(activeGoals.reduce((sum, goal) => sum + goal.progress, 0) / activeGoals.length)
            : 0;

        // Group goals by category
        const goalsByCategory = allGoals.reduce((acc, goal) => {
            acc[goal.category] = (acc[goal.category] || 0) + 1;
            return acc;
        }, {});

        // Group goals by priority
        const goalsByPriority = allGoals.reduce((acc, goal) => {
            acc[goal.priority] = (acc[goal.priority] || 0) + 1;
            return acc;
        }, {});

        const goalStats = {
            total: allGoals.length,
            active: activeGoals.length,
            completed: completedGoals.length,
            completionRate: allGoals.length > 0 ? Math.round((completedGoals.length / allGoals.length) * 100) : 0,
            totalEstimatedImpact,
            averageProgress,
            categoryBreakdown: goalsByCategory,
            priorityBreakdown: goalsByPriority,
            overdue: activeGoals.filter(goal => goal.targetDate && new Date(goal.targetDate) < new Date()).length
        };

        return {
            active: activeGoals.slice(0, 3),
            completed: completedGoals,
            stats: goalStats,
            recentGoals: allGoals.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt)).slice(0, 5)
        };
    } catch (error) {
        console.error('Error getting goals data:', error);
        throw error;
    }
};

// Calculate carbon score based on goal completion and progress
const calculateCarbonScoreFromGoals = (goals) => {
    let score = 0;
    
    goals.forEach(goal => {
        if (goal.isCompleted) {
            // Award points based on estimated impact and priority
            let basePoints = goal.estimatedImpact * 10;
            
            // Priority multiplier
            const priorityMultiplier = {
                'high': 1.5,
                'medium': 1.0,
                'low': 0.7
            };
            
            score += basePoints * (priorityMultiplier[goal.priority] || 1.0);
        } else {
            // Award partial points based on progress
            score += (goal.progress / 100) * goal.estimatedImpact * 5;
        }
    });
    
    return Math.round(score);
};

module.exports = {
    getGoalsData,
    calculateCarbonScoreFromGoals
};
