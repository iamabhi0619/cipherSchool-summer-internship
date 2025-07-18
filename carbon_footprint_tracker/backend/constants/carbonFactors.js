

const ENVIRONMENTAL_FACTORS = {
    // Trees and Carbon Absorption
    TREE_CO2_ABSORPTION_PER_YEAR: 22, // kg CO2 per tree per year

    // Transportation Emissions
    CAR_EMISSIONS_PER_YEAR: 4600, // kg CO2 per average car per year
    FLIGHT_EMISSIONS_PER_MILE: 0.25, // kg CO2 per mile flown

    // Energy Consumption
    ENERGY_EMISSIONS_PER_KWH: 0.5, // kg CO2 per kWh

    // Transportation (detailed)
    EMISSIONS_FACTORS: {
        // Per kilometer
        CAR_GASOLINE: 0.21, // kg CO2 per km
        CAR_DIESEL: 0.17, // kg CO2 per km
        CAR_ELECTRIC: 0.05, // kg CO2 per km (depending on grid)
        MOTORCYCLE: 0.13, // kg CO2 per km
        BUS: 0.08, // kg CO2 per km per passenger
        TRAIN: 0.04, // kg CO2 per km per passenger
        SUBWAY: 0.03, // kg CO2 per km per passenger
        BICYCLE: 0, // kg CO2 per km
        WALKING: 0, // kg CO2 per km

        // Aviation (per km)
        DOMESTIC_FLIGHT: 0.25, // kg CO2 per km
        INTERNATIONAL_FLIGHT: 0.18, // kg CO2 per km
        PRIVATE_JET: 2.0, // kg CO2 per km
    }
};

// Energy Consumption Factors
const ENERGY_FACTORS = {
    // Electricity by source (kg CO2 per kWh)
    COAL: 0.82,
    NATURAL_GAS: 0.35,
    NUCLEAR: 0.01,
    SOLAR: 0.04,
    WIND: 0.01,
    HYDRO: 0.02,
    ELECTRICITY: 0.5,


    // Heating fuels (kg CO2 per unit)
    HEATING_OIL_PER_LITER: 2.5,
    NATURAL_GAS_PER_CUBIC_METER: 2.0,
    PROPANE_PER_KG: 3.0,
    WOOD_PER_KG: 0.1, // Assuming sustainable sourcing
};

// Food and Diet Factors
const FOOD_FACTORS = {
    // kg CO2 per kg of food
    BEEF: 27.0,
    LAMB: 24.5,
    PORK: 7.6,
    CHICKEN: 5.7,
    FISH_FARMED: 5.1,
    FISH_WILD: 1.4,
    EGGS: 4.2,
    DAIRY_MILK: 3.2,
    CHEESE: 13.5,
    RICE: 2.7,
    WHEAT: 1.4,
    VEGETABLES_AVERAGE: 0.4,
    FRUITS_AVERAGE: 0.3,
    NUTS: 0.3,
    LEGUMES: 0.4,
};

// Housing and Utilities Factors
const HOUSING_FACTORS = {
    // per square meter per year
    APARTMENT_ELECTRICITY: 50, // kWh per m² per year
    HOUSE_ELECTRICITY: 75, // kWh per m² per year
    HEATING_GAS: 100, // kWh equivalent per m² per year
    WATER_HEATER: 0.2, // kg CO2 per liter of hot water
    AIR_CONDITIONING: 0.15, // kg CO2 per kWh
    SPACE_HEATING: 0.1, // kg CO2 per m² per year
    APPLIANCES: 0.05, // kg CO2 per m² per year

    // Water usage (kg CO2 per liter)
    WATER_SUPPLY: 0.001,
    HOT_WATER: 0.003,
};

// Shopping and Consumer Goods Factors
const SHOPPING_FACTORS = {
    // kg CO2 per item/kg
    CLOTHING_NEW: 10, // per item
    CLOTHING_SECONDHAND: 2, // per item
    ELECTRONICS_SMARTPHONE: 70, // per device
    ELECTRONICS_LAPTOP: 300, // per device
    ELECTRONICS_TV: 500, // per device
    FURNITURE_WOODEN: 30, // per item
    BOOKS_NEW: 2, // per book
    BOOKS_DIGITAL: 0.1, // per book
    PACKAGING_PLASTIC: 2, // per kg
    PACKAGING_CARDBOARD: 0.7, // per kg
};

// Waste Management Factors
const WASTE_FACTORS = {
    // kg CO2 per kg of waste
    LANDFILL: 0.5,
    RECYCLING: -0.1, // Negative because it saves emissions
    COMPOSTING: -0.2, // Negative because it saves emissions
    INCINERATION: 0.3,
    PLASTIC_WASTE: 2.0,
    ORGANIC_WASTE: 0.1,
};

// Recommendation Thresholds
const RECOMMENDATION_THRESHOLDS = {
    // Daily emissions (kg CO2)
    HIGH_DAILY_EMISSIONS: 50,
    MODERATE_DAILY_EMISSIONS: 25,
    LOW_DAILY_EMISSIONS: 10,

    // Weekly emissions (kg CO2)
    HIGH_WEEKLY_EMISSIONS: 300,
    MODERATE_WEEKLY_EMISSIONS: 150,
    LOW_WEEKLY_EMISSIONS: 75,

    // Monthly emissions (kg CO2)
    HIGH_MONTHLY_EMISSIONS: 1200,
    MODERATE_MONTHLY_EMISSIONS: 600,
    LOW_MONTHLY_EMISSIONS: 300,

    // Yearly emissions (kg CO2)
    HIGH_YEARLY_EMISSIONS: 15000,
    MODERATE_YEARLY_EMISSIONS: 8000,
    LOW_YEARLY_EMISSIONS: 4000,
};

// Achievement Thresholds - Making it exciting and engaging! 🏆
const ACHIEVEMENT_THRESHOLDS = {
    STREAK_DAYS: [1, 7, 30, 90, 365], // From first step to legendary
    TOTAL_ACTIVITIES: [1, 10, 50, 100, 200, 500, 1000],
    CARBON_SAVED: [10, 100, 500, 1000, 5000, 10000], // kg CO2
    GOALS_COMPLETED: [1, 5, 10, 25, 50, 100],
    CATEGORY_ACTIVITIES: {
        TRANSPORT: [5, 10, 25, 50],
        ENERGY: [5, 15, 30, 60],
        FOOD: [10, 25, 50, 100],
        WASTE: [5, 20, 40, 80]
    }
};

// Units and Conversions
const UNIT_CONVERSIONS = {
    // Distance
    KM_TO_MILES: 0.621371,
    MILES_TO_KM: 1.60934,

    // Weight
    KG_TO_LBS: 2.20462,
    LBS_TO_KG: 0.453592,
    TONS_TO_KG: 1000,

    // Energy
    KWH_TO_BTU: 3412.14,
    LITERS_TO_GALLONS: 0.264172,
};

module.exports = {
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
