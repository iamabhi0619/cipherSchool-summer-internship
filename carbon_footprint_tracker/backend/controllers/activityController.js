const { Activity } = require('../models/Activity');
const { User } = require('../models/User');
const { checkAndUnlockAchievements } = require('../utils/achievementsCalculator');
const { updateCarbonScore } = require('../utils/dashboardHelpers');
const {
    calculateTransportationEmissions,
    calculateEnergyEmissions,
    calculateFoodEmissions,
    calculateHousingEmissions,
    calculateShoppingEmissions,
    getAvailableTransportTypes,
    getAvailableEnergySources,
    getAvailableFoodTypes,
    getAvailableHousingTypes
} = require('../utils/carbonCalculator');

const calculateEmissions = (category, type, amount) => {
    try {
        switch (category.toLowerCase()) {
            case 'transportation':
                return calculateTransportationEmissions(type, amount);
            case 'energy':
                return calculateEnergyEmissions(type, amount);
            case 'food':
                return calculateFoodEmissions(type, amount);
            case 'housing':
                return calculateHousingEmissions(type, amount);
            case 'shopping':
                return calculateShoppingEmissions(type, amount);
            default:
                return amount * 0.1;
        }
    } catch (error) {
        console.error('Error calculating emissions:', error);
        return amount * 0.1;
    }
};

exports.createActivity = async (req, res) => {
    try {
        const { category, type, amount, unit, description, date, location } = req.body;
        const userId = req.user.id;

        if (!category || !type || !amount || !unit) {
            return res.status(400).json({
                message: 'Please provide all required fields: category, type, amount, unit'
            });
        }

        const validCategories = ['transportation', 'energy', 'food', 'housing', 'shopping'];
        if (!validCategories.includes(category.toLowerCase())) {
            return res.status(400).json({
                message: 'Invalid category. Must be one of: ' + validCategories.join(', ')
            });
        }

        // Calculate carbon emissions
        const carbonEmission = calculateEmissions(category, type, amount);

        // Create activity
        const activity = new Activity({
            user: userId,
            category: category.toLowerCase(),
            type,
            amount,
            unit,
            description,
            date: date ? new Date(date) : new Date(),
            carbonEmission,
            location
        });

        await activity.save();

        // Get user for carbon score update
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Calculate carbon score points based on activity
        // Higher emissions = lower score, Lower emissions = higher score
        // Base points for logging activity + bonus for eco-friendly activities
        let carbonPoints = 10; // Base points for logging any activity

        // Bonus points for low-emission activities (eco-friendly choices)
        if (carbonEmission < 1) carbonPoints += 20; // Very eco-friendly
        else if (carbonEmission < 5) carbonPoints += 10; // Moderately eco-friendly
        else if (carbonEmission < 10) carbonPoints += 5; // Somewhat eco-friendly

        // Category-specific bonuses
        const categoryBonuses = {
            'transportation': carbonEmission < 2 ? 15 : 0, // Bonus for walking, cycling
            'energy': carbonEmission < 3 ? 12 : 0, // Bonus for renewable energy
            'food': carbonEmission < 1.5 ? 18 : 0, // Bonus for plant-based meals
            'housing': carbonEmission < 5 ? 8 : 0, // Bonus for efficient housing
            'shopping': carbonEmission < 2 ? 10 : 0 // Bonus for sustainable shopping
        };

        carbonPoints += categoryBonuses[category.toLowerCase()] || 0;

        // Apply any active achievement bonuses
        if (user.activeBonuses && user.activeBonuses.length > 0) {
            const now = new Date();
            const activeMultipliers = user.activeBonuses
                .filter(bonus => bonus.expiresAt > now)
                .reduce((total, bonus) => total * bonus.multiplier, 1);
            
            carbonPoints = Math.round(carbonPoints * activeMultipliers);
        }

        // Update user stats and carbon score
        await User.findByIdAndUpdate(userId, {
            $inc: {
                'stats.totalActivitiesLogged': 1,
                'stats.totalPoints': carbonPoints,
                'stats.carbonSaved': Math.max(0, 10 - carbonEmission) // Savings compared to average activity
            }
        });

        // Update carbon score using the helper function
        await updateCarbonScore(user, carbonPoints, 'activity_logging');

        // 🎉 Check for new achievements after logging activity!
        try {
            await checkAndUnlockAchievements(userId, 'activity_logged');
        } catch (achievementError) {
            console.warn('Achievement check failed:', achievementError);
            // Don't fail the activity creation if achievement check fails
        }

        // Get updated user data to return current carbon score
        const updatedUser = await User.findById(userId).select('carbonScore stats');

        console.log(`✅ Activity logged: ${category} - ${type} (${carbonEmission}kg CO₂)`);
        console.log(`💰 Carbon points awarded: ${carbonPoints}`);
        console.log(`🏆 Updated carbon score: ${updatedUser.carbonScore}`);

        res.status(201).json({
            message: 'Activity created successfully',
            activity,
            carbonScore: {
                pointsAwarded: carbonPoints,
                totalScore: updatedUser.carbonScore,
                currentRank: updatedUser.stats.currentRank,
                totalActivities: updatedUser.stats.totalActivitiesLogged,
                carbonSaved: updatedUser.stats.carbonSaved
            }
        });

    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllActivities = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            page = 1,
            limit = 10,
            category,
            startDate,
            endDate,
            sortBy = 'date',
            sortOrder = 'desc'
        } = req.query;

        // Build filter object
        const filter = { user: userId };

        if (category) {
            filter.category = category.toLowerCase();
        }

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get activities with pagination
        const [activities, totalCount] = await Promise.all([
            Activity.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit)),
            Activity.countDocuments(filter)
        ]);

        // Calculate summary statistics
        const totalEmissions = activities.reduce((sum, activity) => sum + activity.carbonEmission, 0);
        const averageEmissions = activities.length > 0 ? totalEmissions / activities.length : 0;

        res.status(200).json({
            message: 'Activities retrieved successfully',
            data: {
                activities,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalCount / limit),
                    totalCount,
                    hasNextPage: page * limit < totalCount,
                    hasPrevPage: page > 1
                },
                summary: {
                    totalActivities: activities.length,
                    totalEmissions: Math.round(totalEmissions * 100) / 100,
                    averageEmissions: Math.round(averageEmissions * 100) / 100
                }
            }
        });

    } catch (error) {
        console.error('Error getting activities:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const activity = await Activity.findOne({ _id: id, user: userId });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json({
            message: 'Activity retrieved successfully',
            activity
        });

    } catch (error) {
        console.error('Error getting activity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { category, type, amount, unit, description, date, location } = req.body;

        const activity = await Activity.findOne({ _id: id, user: userId });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        if (category) {
            const validCategories = ['transportation', 'energy', 'food', 'housing', 'shopping'];
            if (!validCategories.includes(category.toLowerCase())) {
                return res.status(400).json({
                    message: 'Invalid category. Must be one of: ' + validCategories.join(', ')
                });
            }
            activity.category = category.toLowerCase();
        }

        if (type) activity.type = type;
        if (amount) activity.amount = amount;
        if (unit) activity.unit = unit;
        if (description !== undefined) activity.description = description;
        if (date) activity.date = new Date(date);
        if (location !== undefined) activity.location = location;

        if (category || type || amount) {
            activity.carbonEmission = calculateEmissions(
                activity.category,
                activity.type,
                activity.amount
            );
        }

        await activity.save();

        res.status(200).json({
            message: 'Activity updated successfully',
            activity
        });

    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const activity = await Activity.findOne({ _id: id, user: userId });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        await Activity.findByIdAndDelete(id);

        // Update user stats
        await User.findByIdAndUpdate(userId, {
            $inc: {
                'stats.totalActivitiesLogged': -1
            }
        });

        res.status(200).json({
            message: 'Activity deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getActivityStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const { period = 'month' } = req.query;

        const now = new Date();
        let startDate;

        switch (period) {
            case 'week':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            default: // month
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        const activities = await Activity.find({
            user: userId,
            date: { $gte: startDate }
        });

        const totalActivities = activities.length;
        const totalEmissions = activities.reduce((sum, activity) => sum + activity.carbonEmission, 0);
        const averageEmissions = totalActivities > 0 ? totalEmissions / totalActivities : 0;

        const categoryBreakdown = activities.reduce((acc, activity) => {
            if (!acc[activity.category]) {
                acc[activity.category] = {
                    count: 0,
                    emissions: 0
                };
            }
            acc[activity.category].count++;
            acc[activity.category].emissions += activity.carbonEmission;
            return acc;
        }, {});

        const typeFrequency = activities.reduce((acc, activity) => {
            const key = `${activity.category}-${activity.type}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        const mostFrequentTypes = Object.entries(typeFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([type, count]) => ({ type, count }));

        res.status(200).json({
            message: 'Activity statistics retrieved successfully',
            stats: {
                period,
                totalActivities,
                totalEmissions: Math.round(totalEmissions * 100) / 100,
                averageEmissions: Math.round(averageEmissions * 100) / 100,
                categoryBreakdown,
                mostFrequentTypes
            }
        });

    } catch (error) {
        console.error('Error getting activity stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getActivityTypes = async (req, res) => {
    try {
        const activityTypes = {
            transportation: getAvailableTransportTypes(),
            energy: getAvailableEnergySources(),
            food: getAvailableFoodTypes(),
            housing: getAvailableHousingTypes(),
            shopping: [
                'clothing_new', 'clothing_secondhand', 'electronics_smartphone',
                'electronics_laptop', 'furniture_wooden', 'books_new', 'books_digital'
            ]
        };

        res.status(200).json({
            message: 'Activity types retrieved successfully',
            activityTypes
        });

    } catch (error) {
        console.error('Error getting activity types:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getQuickStats = async (req, res) => {
    try {
        //need total activity for this week
        const totalActivitiesThisWeek = await Activity.countDocuments({
            user: req.user.id,
            date: {
                $gte: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
                $lt: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7))
            }
        });
        //CO₂ Tracked Today
        const totalEmissionsToday = await Activity.find({
            user: req.user.id,
            date: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lt: new Date(new Date().setHours(23, 59, 59, 999))
            }
        });
        const totalEmissions = totalEmissionsToday.reduce((sum, activity) => sum + activity.carbonEmission, 0);
        res.status(200).json({
            message: 'Quick stats retrieved successfully',
            data: {
                totalActivitiesThisWeek,
                totalEmissions
            }
        });
    } catch (error) {
        console.error('Error getting quick stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
