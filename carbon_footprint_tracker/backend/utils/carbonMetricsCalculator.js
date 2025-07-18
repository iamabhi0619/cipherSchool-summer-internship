const { User } = require('../models/User');
const { Activity } = require('../models/Activity');
const { Goal } = require('../models/Goal');
const { calculateEmissions } = require('./emissionsCalculator');
const { getCarbonScoreRank, updateCarbonScore } = require('./dashboardHelpers');
const { calculateCarbonScoreFromGoals } = require('./goalsCalculator');

/**
 * Utility to recalculate and update carbon metrics for all users
 * Run this periodically or when data needs to be refreshed
 */
const updateUserCarbonMetrics = async (userId = null) => {
    try {
        console.log('Starting carbon metrics update...');
        
        // Get users to update (specific user or all users)
        const users = userId ? [await User.findById(userId)] : await User.find({});
        
        for (const user of users) {
            if (!user) continue;
            
            console.log(`Updating metrics for user: ${user.email}`);
            
            // Calculate current emissions
            const { emissions } = await calculateEmissions(user._id);
            
            // Get user's goals
            const userGoals = await Goal.find({ userId: user._id });
            
            // Update monthly average
            const daysThisMonth = new Date().getDate();
            const monthlyAverage = daysThisMonth > 0 ? emissions.month / daysThisMonth : 0;
            
            // Update carbon metrics
            user.carbonMetrics = user.carbonMetrics || {};
            user.carbonMetrics.monthlyAverage = Math.round(monthlyAverage * 100) / 100;
            
            // Update yearly target (could be set by user or calculated)
            if (!user.carbonMetrics.yearlyTarget || user.carbonMetrics.yearlyTarget === 0) {
                // Set a reasonable yearly target based on current monthly average
                const estimatedYearlyEmissions = monthlyAverage * 12;
                user.carbonMetrics.yearlyTarget = Math.round(estimatedYearlyEmissions * 0.8); // 20% reduction target
            }
            
            // Update total emissions reduced (this should be calculated based on historical data vs targets)
            // For now, we'll use a simple calculation
            const targetMonthlyEmissions = user.carbonMetrics.yearlyTarget / 12;
            if (monthlyAverage < targetMonthlyEmissions) {
                const monthlyReduction = targetMonthlyEmissions - monthlyAverage;
                user.carbonMetrics.totalEmissionsReduced = Math.round(monthlyReduction * daysThisMonth * 100) / 100;
            }
            
            // Update best month if this month is better
            if (monthlyAverage > 0 && (!user.carbonMetrics.bestMonth?.value || monthlyAverage < user.carbonMetrics.bestMonth.value)) {
                user.carbonMetrics.bestMonth = {
                    value: Math.round(monthlyAverage * 100) / 100,
                    date: new Date()
                };
            }
            
            // Recalculate carbon score
            const MAX_EXPECTED_EMISSIONS_PER_DAY = 38.7;
            const avgDailyEmissions = monthlyAverage;
            let emissionsScore = 100 - (avgDailyEmissions / MAX_EXPECTED_EMISSIONS_PER_DAY) * 100;
            emissionsScore = Math.max(0, Math.min(100, emissionsScore));
            
            const goalScore = calculateCarbonScoreFromGoals(userGoals);
            const streakBonus = Math.min(50, (user.stats?.streakDays || 0) * 2);
            const totalScore = (emissionsScore * 0.6) + (goalScore * 0.003) + (streakBonus * 0.4);
            
            user.carbonScore = Math.round(Math.max(0, totalScore) * 100) / 100;
            user.stats.currentRank = getCarbonScoreRank(user.carbonScore);
            
            // Update goal statistics
            const completedGoals = userGoals.filter(goal => goal.isCompleted);
            const activeGoals = userGoals.filter(goal => !goal.isCompleted);
            user.stats.goalsCompleted = completedGoals.length;
            user.stats.goalsInProgress = activeGoals.length;
            
            await user.save();
            console.log(`Updated user ${user.email} - Score: ${user.carbonScore}, Rank: ${user.stats.currentRank}`);
        }
        
        console.log(`Carbon metrics update completed for ${users.length} users`);
        return { success: true, usersUpdated: users.length };
        
    } catch (error) {
        console.error('Error updating carbon metrics:', error);
        throw error;
    }
};

/**
 * Get carbon leaderboard with top users by carbon score
 */
const getCarbonLeaderboard = async (limit = 10) => {
    try {
        const leaderboard = await User.find({})
            .select('name email carbonScore stats.currentRank avatar')
            .sort({ carbonScore: -1 })
            .limit(limit);
            
        return leaderboard.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            email: user.email,
            carbonScore: user.carbonScore,
            carbonRank: user.stats?.currentRank || 'Getting Started',
            avatar: user.avatar
        }));
    } catch (error) {
        console.error('Error getting carbon leaderboard:', error);
        throw error;
    }
};

/**
 * Get user's carbon score history and trends
 */
const getUserCarbonHistory = async (userId, days = 30) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        // Get recent score history
        const recentHistory = user.carbonScoreHistory
            ?.slice(-days)
            ?.map(entry => ({
                date: entry.date,
                score: entry.score,
                reason: entry.reason,
                runningTotal: user.carbonScore // This could be improved to show historical totals
            })) || [];
            
        // Calculate trend
        let trend = 'stable';
        if (recentHistory.length >= 2) {
            const recent = recentHistory.slice(-5).reduce((sum, entry) => sum + entry.score, 0);
            const older = recentHistory.slice(-10, -5).reduce((sum, entry) => sum + entry.score, 0);
            
            if (recent > older + 10) trend = 'improving';
            else if (recent < older - 10) trend = 'declining';
        }
        
        return {
            currentScore: user.carbonScore,
            currentRank: user.stats?.currentRank || 'Getting Started',
            history: recentHistory,
            trend,
            totalEntries: user.carbonScoreHistory?.length || 0
        };
    } catch (error) {
        console.error('Error getting user carbon history:', error);
        throw error;
    }
};

module.exports = {
    updateUserCarbonMetrics,
    getCarbonLeaderboard,
    getUserCarbonHistory
};
