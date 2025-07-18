const {
    ENVIRONMENTAL_FACTORS,
    ENERGY_FACTORS,
    FOOD_FACTORS,
    HOUSING_FACTORS,
    SHOPPING_FACTORS,
    WASTE_FACTORS,
    RECOMMENDATION_THRESHOLDS,
    ACHIEVEMENT_THRESHOLDS,
    UNIT_CONVERSIONS
} = require('../constants/carbonFactors');

const calculateTransportationEmissions = (transportType, distance) => {
    const factor = ENVIRONMENTAL_FACTORS.EMISSIONS_FACTORS[transportType.toUpperCase()];
    if (!factor) {
        throw new Error(`Unknown transport type: ${transportType}`);
    }
    return distance * factor;
};


const calculateEnergyEmissions = (energySource, consumption) => {
    const factor = ENERGY_FACTORS[energySource.toUpperCase()];
    if (!factor) {
        throw new Error(`Unknown energy source: ${energySource}`);
    }
    return consumption * factor;
};

const calculateFoodEmissions = (foodType, quantity) => {
    const factor = FOOD_FACTORS[foodType.toUpperCase()];
    if (!factor) {
        throw new Error(`Unknown food type: ${foodType}`);
    }
    return quantity * factor;
};


const calculateHousingEmissions = (housingType, amount) => {
    const housingEmissionFactors = {
        electricity: ENERGY_FACTORS.GRID_AVERAGE, // kWh
        heating: ENERGY_FACTORS.NATURAL_GAS / 10, // Assuming gas heating, converted for hours
        cooling: ENERGY_FACTORS.GRID_AVERAGE * 0.5, // AC usage per hour
        water_heating: ENERGY_FACTORS.GRID_AVERAGE * 0.3, // Water heater per hour
        lighting: ENERGY_FACTORS.GRID_AVERAGE * 0.05, // Lighting per hour
        appliances: ENERGY_FACTORS.GRID_AVERAGE * 0.1, // Appliances per hour
        waste_disposal: WASTE_FACTORS.LANDFILL, // per kg of waste
        water_usage: 0.0003 
    };

    const factor = housingEmissionFactors[housingType.toLowerCase()];
    if (!factor) {
        throw new Error(`Unknown housing type: ${housingType}`);
    }
    return amount * factor;
};

const calculateShoppingEmissions = (itemType, quantity) => {
    const factor = SHOPPING_FACTORS[itemType.toUpperCase()];
    if (!factor) {
        throw new Error(`Unknown item type: ${itemType}`);
    }
    return quantity * factor;
};

const calculateWasteEmissions = (wasteType, weight) => {
    const factor = WASTE_FACTORS[wasteType.toUpperCase()];
    if (!factor) {
        throw new Error(`Unknown waste type: ${wasteType}`);
    }
    return weight * factor;
};


const getEmissionCategory = (emissions, period) => {
    const thresholds = RECOMMENDATION_THRESHOLDS;
    const periodUpper = period.toUpperCase();
    
    const highThreshold = thresholds[`HIGH_${periodUpper}_EMISSIONS`];
    const moderateThreshold = thresholds[`MODERATE_${periodUpper}_EMISSIONS`];
    
    if (!highThreshold || !moderateThreshold) {
        throw new Error(`Unknown period: ${period}`);
    }
    
    if (emissions >= highThreshold) return 'high';
    if (emissions >= moderateThreshold) return 'moderate';
    return 'low';
};


const convertUnits = (value, fromUnit, toUnit) => {
    const conversionKey = `${fromUnit.toUpperCase()}_TO_${toUnit.toUpperCase()}`;
    const factor = UNIT_CONVERSIONS[conversionKey];
    
    if (!factor) {
        throw new Error(`No conversion available from ${fromUnit} to ${toUnit}`);
    }
    
    return value * factor;
};

const getAvailableTransportTypes = () => {
    return Object.keys(ENVIRONMENTAL_FACTORS.EMISSIONS_FACTORS);
};


const getAvailableEnergySources = () => {
    return Object.keys(ENERGY_FACTORS);
};


const getAvailableFoodTypes = () => {
    return Object.keys(FOOD_FACTORS);
};

/**
 * Get all available housing types
 * @returns {Array} List of available housing types
 */
const getAvailableHousingTypes = () => {
    return [
        'electricity', 'heating', 'cooling', 'water_heating', 
        'lighting', 'appliances', 'waste_disposal', 'water_usage'
    ];
};

const getAchievementThresholds = (type) => {
    return ACHIEVEMENT_THRESHOLDS[type.toUpperCase()] || [];
};

module.exports = {
    // Calculation functions
    calculateTransportationEmissions,
    calculateEnergyEmissions,
    calculateFoodEmissions,
    calculateHousingEmissions,
    calculateShoppingEmissions,
    calculateWasteEmissions,
    
    // Utility functions
    getEmissionCategory,
    convertUnits,
    
    // Getter functions
    getAvailableTransportTypes,
    getAvailableEnergySources,
    getAvailableFoodTypes,
    getAvailableHousingTypes,
    getAchievementThresholds,
    
    // Direct access to constants (for backward compatibility)
    ENVIRONMENTAL_FACTORS,
    ENERGY_FACTORS,
    FOOD_FACTORS,
    HOUSING_FACTORS,
    SHOPPING_FACTORS,
    WASTE_FACTORS,
    RECOMMENDATION_THRESHOLDS,
    ACHIEVEMENT_THRESHOLDS,
    UNIT_CONVERSIONS,
};
