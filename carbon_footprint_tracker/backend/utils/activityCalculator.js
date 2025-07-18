
const calculateStreaks = (allActivities) => {
    const now = new Date();
    
    const activityDates = allActivities.map(activity =>
        activity.date.toISOString().split('T')[0]
    );
    const uniqueDates = [...new Set(activityDates)].sort().reverse();

    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    // Calculate current streak
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
        let checkDate = uniqueDates[0] === today ? now : new Date(now.getTime() - 24 * 60 * 60 * 1000);

        for (const dateStr of uniqueDates) {
            const activityDate = checkDate.toISOString().split('T')[0];
            if (dateStr === activityDate) {
                currentStreak++;
                checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
            } else {
                break;
            }
        }
    }

    for (let i = 0; i < uniqueDates.length; i++) {
        if (i === 0) {
            tempStreak = 1;
        } else {
            const currentDate = new Date(uniqueDates[i]);
            const prevDate = new Date(uniqueDates[i - 1]);
            const dayDiff = (prevDate - currentDate) / (1000 * 60 * 60 * 24);

            if (dayDiff === 1) {
                tempStreak++;
            } else {
                maxStreak = Math.max(maxStreak, tempStreak);
                tempStreak = 1;
            }
        }
    }
    maxStreak = Math.max(maxStreak, tempStreak);

    return {
        current: currentStreak,
        maximum: maxStreak
    };
};

const formatRecentActivities = (allActivities) => {
    return allActivities.slice(0, 5).map(activity => ({
        id: activity._id,
        category: activity.category,
        type: activity.type,
        amount: activity.amount,
        unit: activity.unit,
        carbonEmission: Math.round(activity.carbonEmission * 100) / 100,
        date: activity.date,
        description: activity.description
    }));
};


const calculateActivityCounts = (todayActivities, weekActivities, monthActivities, allActivities) => {
    return {
        today: todayActivities.length,
        week: weekActivities.length,
        month: monthActivities.length,
        total: allActivities.length
    };
};

module.exports = {
    calculateStreaks,
    formatRecentActivities,
    calculateActivityCounts
};
