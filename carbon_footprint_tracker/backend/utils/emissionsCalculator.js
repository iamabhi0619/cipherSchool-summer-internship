const { Activity } = require('../models/Activity');


const calculateEmissions = async (userId) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const [
        todayActivities,
        weekActivities,
        monthActivities,
        yearActivities,
        allActivities
    ] = await Promise.all([
        Activity.find({ user: userId, date: { $gte: todayStart } }),
        Activity.find({ user: userId, date: { $gte: weekStart } }),
        Activity.find({ user: userId, date: { $gte: monthStart } }),
        Activity.find({ user: userId, date: { $gte: yearStart } }),
        Activity.find({ user: userId }).sort({ date: -1 }).limit(100)
    ]);

    const emissions = {
        today: todayActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0),
        week: weekActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0),
        month: monthActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0),
        year: yearActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0),
        total: allActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0)
    };

    return {
        emissions,
        activities: {
            todayActivities,
            weekActivities,
            monthActivities,
            yearActivities,
            allActivities
        }
    };
};

const calculateCategoryBreakdown = (monthActivities, monthEmissions) => {
    const categoryBreakdown = monthActivities.reduce((acc, activity) => {
        const category = activity.category;
        if (!acc[category]) {
            acc[category] = {
                emissions: 0,
                count: 0,
                percentage: 0
            };
        }
        acc[category].emissions += activity.carbonEmission;
        acc[category].count += 1;
        return acc;
    }, {});

    Object.keys(categoryBreakdown).forEach(category => {
        categoryBreakdown[category].percentage = monthEmissions > 0
            ? Math.round((categoryBreakdown[category].emissions / monthEmissions) * 100)
            : 0;
    });

    return categoryBreakdown;
};


const getWeeklyTrend = async (userId) => {
    const now = new Date();
    const weeklyTrend = [];

    for (let i = 7; i >= 0; i--) {
        const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        const weekStart = new Date(weekEnd.getTime() - 7 * 24 * 60 * 60 * 1000);

        const weekActivities = await Activity.find({
            user: userId,
            date: { $gte: weekStart, $lt: weekEnd }
        });

        const weekEmissions = weekActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0);

        weeklyTrend.push({
            week: `Week ${8 - i}`,
            emissions: Math.round(weekEmissions * 100) / 100,
            activities: weekActivities.length,
            startDate: weekStart.toISOString().split('T')[0],
            endDate: weekEnd.toISOString().split('T')[0]
        });
    }

    return weeklyTrend;
};

module.exports = {
    calculateEmissions,
    calculateCategoryBreakdown,
    getWeeklyTrend
};
