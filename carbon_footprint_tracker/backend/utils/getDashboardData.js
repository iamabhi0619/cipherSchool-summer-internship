const { User } = require('../models/User');
const { Activity } = require('../models/Activity');
const { Goal } = require('../models/Goal');
const { calculateEmissions, calculateCategoryBreakdown, getWeeklyTrend } = require('./emissionsCalculator');
const { getGoalsData, calculateCarbonScoreFromGoals } = require('./goalsCalculator');
const { getUserAchievements, checkAndUnlockAchievements } = require('./achievementsCalculator');
const { calculateStreaks, formatRecentActivities, calculateActivityCounts } = require('./activityCalculator');
const { calculateEnvironmentalImpact, generateRecommendations, formatUserProfile, getCarbonScoreRank } = require('./dashboardHelpers');

/**
 * Get daily emissions for the current week
 */
const getDailyWeeklyData = async (userId) => {
    const now = new Date();
    const weeklyData = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Get Monday of current week
    const currentDay = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);

        const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);

        const dayActivities = await Activity.find({
            user: userId,
            date: { $gte: dayStart, $lt: dayEnd }
        });

        const dayEmissions = dayActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0);

        weeklyData.push({
            day: dayNames[i],
            emissions: Math.round(dayEmissions * 100) / 100
        });
    }

    return weeklyData;
};

/**
 * Format category data with colors and trends
 */
const formatCategoryData = (categoryBreakdown, previousMonthBreakdown = {}) => {
    const categoryConfig = {
        transportation: { color: '#126f39', icon: 'car' },
        energy: { color: '#387999', icon: 'zap' },
        food: { color: '#37a65f', icon: 'apple' },
        housing: { color: '#3a9d90', icon: 'home' },
        shopping: { color: '#e74c3c', icon: 'shopping-bag' }
    };

    const categoryData = [];

    Object.keys(categoryBreakdown).forEach(category => {
        // Only process categories that are in our predefined config
        const config = categoryConfig[category];
        if (!config) {
            console.warn(`Unknown category found: ${category}. Skipping...`);
            return;
        }

        const current = categoryBreakdown[category];
        const previous = previousMonthBreakdown[category] || { emissions: 0 };

        let trend = '0%';
        if (previous.emissions > 0) {
            const change = ((current.emissions - previous.emissions) / previous.emissions) * 100;
            // Cap extreme percentages
            const cappedChange = Math.max(-100, Math.min(999, change));
            trend = `${cappedChange >= 0 ? '+' : ''}${Math.round(cappedChange)}%`;
        } else if (current.emissions > 0) {
            // If no previous data but current data exists, show as new
            trend = 'New';
        }

        categoryData.push({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            emissions: Math.round(current.emissions * 100) / 100,
            color: config.color,
            trend,
            icon: config.icon
        });
    });

    return categoryData.sort((a, b) => b.emissions - a.emissions);
};

/**
 * Format recent activities with impact
 */
const formatRecentActivitiesWithImpact = (activities) => {
    return activities.slice(-4).map(activity => {
        // Calculate impact (negative values for eco-friendly actions)
        let impact = activity.carbonEmission;

        // If it's a low-emission activity, show as positive impact (negative emissions)
        if (activity.category === 'transportation' &&
            (activity.type === 'bicycle' || activity.type === 'walking')) {
            impact = -Math.abs(impact);
        }

        // Format activity description with better formatting
        let activityDescription;
        if (activity.description && activity.description.trim() !== '') {
            // If there's a custom description, use it
            activityDescription = activity.description;
        } else {
            // Generate a readable description from type and amount
            const formattedType = activity.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const formattedAmount = activity.amount % 1 === 0 ? activity.amount : activity.amount.toFixed(1);
            activityDescription = `${formattedType} - ${formattedAmount} ${activity.unit}`;
        }

        return {
            date: activity.date.toISOString().split('T')[0],
            activity: activityDescription,
            impact: Math.round(impact * 100) / 100,
            type: activity.category
        };
    });
};

/**
 * Calculate comprehensive carbon score based on emissions, goals, and activities
 */
const calculateCarbonScore = (emissions, user, goals = []) => {
    const MAX_EXPECTED_EMISSIONS_PER_DAY = 38.7;

    // Get current date to calculate how many days have passed this month
    const now = new Date();
    const daysInMonth = now.getDate(); // Days elapsed in current month

    // Calculate average daily emissions for the month
    const avgDailyEmissions = daysInMonth > 0 ? emissions.month / daysInMonth : 0;

    // Base score from emissions: 100 - (Your Emissions / Max Expected Emissions) × 100
    let emissionsScore = 100 - (avgDailyEmissions / MAX_EXPECTED_EMISSIONS_PER_DAY) * 100;
    emissionsScore = Math.max(0, Math.min(100, emissionsScore));

    // Goal completion bonus
    const goalScore = calculateCarbonScoreFromGoals(goals);

    // Activity streak bonus
    const streakBonus = Math.min(50, (user.stats?.streakDays || 0) * 2);

    // Combine scores with weights
    const totalScore = (emissionsScore * 0.6) + (goalScore * 0.003) + (streakBonus * 0.4);

    return Math.round(Math.max(0, totalScore) * 100) / 100;
};

/**
 * Generate insights based on weekly data
 */
const generateInsights = (weeklyData, categoryData) => {
    // Find best and worst days
    const sortedDays = [...weeklyData].sort((a, b) => a.emissions - b.emissions);
    const bestDay = sortedDays[0].day;
    const worstDay = sortedDays[sortedDays.length - 1].day;

    // Generate improvement tip based on highest category
    const highestCategory = categoryData[0];
    let improvementTip = 'Great job tracking your carbon footprint! Keep logging activities to see trends.';

    if (highestCategory && highestCategory.emissions > 0) {
        const categoryTips = {
            transportation: 'Try using public transport, cycling, or walking to reduce transportation emissions',
            energy: 'Switch to LED bulbs and unplug devices when not in use to save energy',
            food: 'Consider more plant-based meals and reduce food waste to lower food emissions', 
            housing: 'Improve insulation and adjust thermostat settings to reduce housing emissions',
            shopping: 'Buy second-hand items and focus on quality over quantity when shopping'
        };
        
        improvementTip = categoryTips[highestCategory.category.toLowerCase()] || 
                        `Focus on reducing ${highestCategory.category.toLowerCase()} emissions for better results`;
    }

    return {
        bestDay,
        worstDay,
        improvementTip
    };
};

const getDashboardData = async (userId) => {
    try {
        // Get user details
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }

        // Calculate emissions and get activities
        const { emissions, activities } = await calculateEmissions(userId);
        const { todayActivities, weekActivities, monthActivities, allActivities } = activities;

        // Get goals data with new structure
        const goalsData = await getGoalsData(userId);
        const userGoals = await Goal.find({ userId: userId });

        // Calculate monthly goal from active goals or set intelligent default
        let monthlyGoal = goalsData.active.reduce((sum, goal) => sum + goal.estimatedImpact, 0);
        
        // If no goals are set, calculate an intelligent target based on current emissions
        if (monthlyGoal === 0) {
            const currentMonthlyEmissions = emissions.month;
            if (currentMonthlyEmissions > 0) {
                // Set goal to reduce current emissions by 10-20%
                monthlyGoal = Math.round(currentMonthlyEmissions * 0.85); // 15% reduction target
            } else {
                monthlyGoal = 120; // Default fallback
            }
        }

        // Calculate current score (today's emissions)
        const currentScore = Math.round(emissions.today * 100) / 100;

        // Calculate weekly change (current week vs previous week)
        const now = new Date();
        const lastWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        const thisWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const [lastWeekActivities, thisWeekActivities] = await Promise.all([
            Activity.find({
                user: userId,
                date: { $gte: lastWeekStart, $lt: thisWeekStart }
            }),
            Activity.find({
                user: userId,
                date: { $gte: thisWeekStart }
            })
        ]);

        const lastWeekEmissions = lastWeekActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0);
        const thisWeekEmissions = thisWeekActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0);
        const weeklyChange = Math.round((thisWeekEmissions - lastWeekEmissions) * 100) / 100;

        // Calculate total reduction based on realistic comparison
        // This represents actual CO₂ saved compared to previous month or target
        let totalReduction = 0;
        
        // Get previous month data for comparison
        const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        const prevMonthActivities = await Activity.find({
            user: userId,
            date: { $gte: prevMonthStart, $lte: prevMonthEnd }
        });
        const prevMonthEmissions = prevMonthActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0);
        
        // Calculate reduction compared to previous month
        if (prevMonthEmissions > 0 && prevMonthEmissions > emissions.month) {
            totalReduction = Math.round((prevMonthEmissions - emissions.month) * 100) / 100;
        }
        
        // If no previous month data or no improvement, check user's target
        if (totalReduction === 0 && user.carbonMetrics?.yearlyTarget && user.carbonMetrics.yearlyTarget > 0) {
            const targetMonthlyEmissions = user.carbonMetrics.yearlyTarget / 12;
            const daysThisMonth = now.getDate();
            const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            const expectedEmissionsToDate = (targetMonthlyEmissions / daysInMonth) * daysThisMonth;
            
            if (emissions.month < expectedEmissionsToDate) {
                totalReduction = Math.round((expectedEmissionsToDate - emissions.month) * 100) / 100;
            }
        }
        
        // If still no reduction calculated, show 0 (be honest about the data)
        totalReduction = Math.max(0, totalReduction);

        // Get daily weekly data
        const weeklyData = await getDailyWeeklyData(userId);

        // Calculate category breakdown for current month
        const categoryBreakdown = calculateCategoryBreakdown(monthActivities, emissions.month);

        // Use already calculated previous month data for trend calculation
        const prevCategoryBreakdown = calculateCategoryBreakdown(prevMonthActivities, prevMonthEmissions);

        // Format category data
        const categoryData = formatCategoryData(categoryBreakdown, prevCategoryBreakdown);

        // Format recent activities
        const recentActivities = formatRecentActivitiesWithImpact(allActivities);

        // Calculate comprehensive carbon score with new system
        const overallCarbonScore = calculateCarbonScore(emissions, user, userGoals);
        
        // Update carbon metrics with realistic values
        const daysThisMonth = new Date().getDate();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const monthlyAverage = daysThisMonth > 0 ? emissions.month / daysThisMonth : 0;
        
        // Update user's carbon metrics
        let needsUserUpdate = false;
        if (!user.carbonMetrics.monthlyAverage || Math.abs(user.carbonMetrics.monthlyAverage - monthlyAverage) > 1) {
            user.carbonMetrics.monthlyAverage = Math.round(monthlyAverage * 100) / 100;
            needsUserUpdate = true;
        }
        
        // Update total emissions reduced based on actual reductions calculated
        if (totalReduction > 0) {
            user.carbonMetrics.totalEmissionsReduced = totalReduction;
            needsUserUpdate = true;
        }
        
        // Check if this is the best month so far (lowest emissions per day)
        if (monthlyAverage > 0 && (!user.carbonMetrics.bestMonth.value || monthlyAverage < user.carbonMetrics.bestMonth.value)) {
            user.carbonMetrics.bestMonth = {
                value: Math.round(monthlyAverage * 100) / 100,
                date: new Date()
            };
            needsUserUpdate = true;
        }
        
        // Update carbon score if it has changed significantly
        if (Math.abs(user.carbonScore - overallCarbonScore) > 5) {
            user.carbonScore = overallCarbonScore;
            user.stats.currentRank = getCarbonScoreRank(overallCarbonScore);
            needsUserUpdate = true;
        }
        
        // Save user updates if needed
        if (needsUserUpdate) {
            await user.save();
        }

        // Check for new achievements (exciting!)
        const newAchievements = await checkAndUnlockAchievements(userId);
        
        // Get user's achievement data
        const achievementsData = await getUserAchievements(userId);

        // Generate insights
        const insights = generateInsights(weeklyData, categoryData);

        // Return enhanced data with achievements and goals
        return {
            currentScore,
            weeklyChange,
            monthlyGoal,
            totalReduction,
            totalMonthlyEmissions: Math.round(emissions.month * 100) / 100,
            overallCarbonScore,
            carbonScoreRank: getCarbonScoreRank(overallCarbonScore),
            carbonMetrics: user.carbonMetrics,
            goalsData: {
                active: goalsData.active,
                stats: goalsData.stats,
                completed: goalsData.completed.slice(0, 3)
            },
            achievementsData: {
                recent: achievementsData.recent,
                inProgress: achievementsData.inProgress.slice(0, 5), // Show top 5 closest
                stats: achievementsData.stats,
                activeBonuses: achievementsData.activeBonuses,
                newUnlocks: newAchievements // Freshly unlocked achievements to show notifications
            },
            weeklyData,
            categoryData,
            recentActivities,
            insights,
            userProfile: formatUserProfile(user)
        };

    } catch (error) {
        console.error('Error getting dashboard data:', error);
        throw error;
    }
};

module.exports = { getDashboardData };