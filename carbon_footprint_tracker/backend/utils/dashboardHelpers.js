const { ENVIRONMENTAL_FACTORS, RECOMMENDATION_THRESHOLDS } = require('../constants/carbonFactors');

const calculateEnvironmentalImpact = (yearlyEmissions) => {
    return {
        treesEquivalent: Math.round((yearlyEmissions / ENVIRONMENTAL_FACTORS.TREE_CO2_ABSORPTION_PER_YEAR) * 100) / 100,
        carsOffRoad: Math.round((yearlyEmissions / ENVIRONMENTAL_FACTORS.CAR_EMISSIONS_PER_YEAR) * 100) / 100,
        milesFlown: Math.round((yearlyEmissions / ENVIRONMENTAL_FACTORS.FLIGHT_EMISSIONS_PER_MILE) * 100) / 100,
        energyUsage: Math.round((yearlyEmissions / ENVIRONMENTAL_FACTORS.ENERGY_EMISSIONS_PER_KWH) * 100) / 100
    };
};

const generateRecommendations = (emissions, currentStreak, activeGoals) => {
    const recommendations = [];

    if (emissions.week > emissions.month / 4) {
        recommendations.push({
            type: 'warning',
            title: 'High Weekly Emissions',
            message: 'Your emissions this week are above average. Consider using public transport or reducing energy usage.'
        });
    }

    if (currentStreak === 0) {
        recommendations.push({
            type: 'info',
            title: 'Log Activity Today',
            message: 'Keep tracking your carbon footprint by logging an activity today!'
        });
    }

    if (activeGoals.length === 0) {
        recommendations.push({
            type: 'suggestion',
            title: 'Set a Goal',
            message: 'Setting goals helps you stay motivated. Create your first carbon reduction goal!'
        });
    }

    if (emissions.month > RECOMMENDATION_THRESHOLDS.HIGH_MONTHLY_EMISSIONS) {
        recommendations.push({
            type: 'tip',
            title: 'High Monthly Emissions',
            message: 'Consider switching to renewable energy sources or carpooling to reduce your footprint.'
        });
    }

    if (emissions.today > emissions.week / 7 * 1.5) {
        recommendations.push({
            type: 'alert',
            title: 'High Daily Emissions',
            message: 'Today\'s emissions are significantly higher than your weekly average.'
        });
    }

    return recommendations;
};

const formatUserProfile = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        carbonScore: user.carbonScore || 0,
        carbonMetrics: user.carbonMetrics || {
            totalEmissionsReduced: 0,
            monthlyAverage: 0,
            yearlyTarget: 0,
            bestMonth: { value: 0, date: null }
        },
        level: user.stats?.level || 1,
        points: user.stats?.points || 0,
        rank: user.stats?.rank || null,
        joinDate: user.createdAt,
        preferences: user.preferences,
        stats: user.stats
    };
};

// Calculate carbon score ranking
const getCarbonScoreRank = (carbonScore) => {
    if (carbonScore >= 10000) return 'Carbon Champion';
    if (carbonScore >= 5000) return 'Eco Warrior';
    if (carbonScore >= 2500) return 'Green Guardian';
    if (carbonScore >= 1000) return 'Earth Defender';
    if (carbonScore >= 500) return 'Climate Conscious';
    if (carbonScore >= 100) return 'Eco Beginner';
    return 'Getting Started';
};

// Update carbon score based on various activities
const updateCarbonScore = async (user, points, reason) => {
    try {
        user.carbonScore = (user.carbonScore || 0) + points;
        
        // Add to score history
        if (!user.carbonScoreHistory) {
            user.carbonScoreHistory = [];
        }
        
        user.carbonScoreHistory.push({
            score: points,
            date: new Date(),
            reason: reason
        });
        
        // Keep only last 50 entries
        if (user.carbonScoreHistory.length > 50) {
            user.carbonScoreHistory = user.carbonScoreHistory.slice(-50);
        }
        
        // Update rank based on new score
        user.stats.currentRank = getCarbonScoreRank(user.carbonScore);
        
        await user.save();
        return user.carbonScore;
    } catch (error) {
        console.error('Error updating carbon score:', error);
        throw error;
    }
};

module.exports = {
    calculateEnvironmentalImpact,
    generateRecommendations,
    formatUserProfile,
    getCarbonScoreRank,
    updateCarbonScore
};
