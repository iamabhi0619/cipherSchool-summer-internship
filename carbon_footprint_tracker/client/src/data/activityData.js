// Activity Categories and Types Data
// This file contains all the activity categories, their types, and related information
// for the Carbon Footprint Tracker application

export const ACTIVITY_CATEGORIES = {
  TRANSPORTATION: 'transportation',
  ENERGY: 'energy',
  FOOD: 'food',
  HOUSING: 'housing',
  SHOPPING: 'shopping'
};

export const ACTIVITY_TYPES = {
  // Transportation (12 types)
  [ACTIVITY_CATEGORIES.TRANSPORTATION]: {
    CAR_GASOLINE: { label: 'Car (Gasoline)', unit: 'km' },
    CAR_DIESEL: { label: 'Car (Diesel)', unit: 'km' },
    CAR_ELECTRIC: { label: 'Car (Electric)', unit: 'km' },
    CAR_HYBRID: { label: 'Car (Hybrid)', unit: 'km' },
    MOTORCYCLE: { label: 'Motorcycle', unit: 'km' },
    BUS: { label: 'Bus', unit: 'km' },
    TRAIN: { label: 'Train', unit: 'km' },
    SUBWAY: { label: 'Subway/Metro', unit: 'km' },
    FLIGHT_DOMESTIC: { label: 'Flight (Domestic)', unit: 'km' },
    FLIGHT_INTERNATIONAL: { label: 'Flight (International)', unit: 'km' },
    BICYCLE: { label: 'Bicycle', unit: 'km' },
    WALKING: { label: 'Walking', unit: 'km' }
  },

  // Energy (11 types)
  [ACTIVITY_CATEGORIES.ENERGY]: {
    ELECTRICITY_GRID: { label: 'Electricity (Grid)', unit: 'kWh' },
    ELECTRICITY_RENEWABLE: { label: 'Electricity (Renewable)', unit: 'kWh' },
    NATURAL_GAS: { label: 'Natural Gas', unit: 'cubic meters' },
    HEATING_OIL: { label: 'Heating Oil', unit: 'liters' },
    PROPANE: { label: 'Propane', unit: 'kg' },
    COAL: { label: 'Coal', unit: 'kg' },
    WOOD_BIOMASS: { label: 'Wood/Biomass', unit: 'kg' },
    SOLAR: { label: 'Solar Energy', unit: 'kWh' },
    WIND: { label: 'Wind Energy', unit: 'kWh' },
    HYDROELECTRIC: { label: 'Hydroelectric', unit: 'kWh' },
    GEOTHERMAL: { label: 'Geothermal', unit: 'kWh' }
  },

  // Food (15 types)
  [ACTIVITY_CATEGORIES.FOOD]: {
    BEEF: { label: 'Beef', unit: 'kg' },
    PORK: { label: 'Pork', unit: 'kg' },
    CHICKEN: { label: 'Chicken', unit: 'kg' },
    FISH_SEAFOOD: { label: 'Fish/Seafood', unit: 'kg' },
    DAIRY_MILK: { label: 'Dairy/Milk', unit: 'liters' },
    CHEESE: { label: 'Cheese', unit: 'kg' },
    EGGS: { label: 'Eggs', unit: 'pieces' },
    RICE: { label: 'Rice', unit: 'kg' },
    WHEAT_BREAD: { label: 'Wheat/Bread', unit: 'kg' },
    VEGETABLES_LOCAL: { label: 'Vegetables (Local)', unit: 'kg' },
    VEGETABLES_AVERAGE: { label: 'Vegetables (Average)', unit: 'kg' },
    FRUITS_LOCAL: { label: 'Fruits (Local)', unit: 'kg' },
    FRUITS_IMPORTED: { label: 'Fruits (Imported)', unit: 'kg' },
    PROCESSED_FOOD: { label: 'Processed Food', unit: 'kg' },
    BEVERAGES: { label: 'Beverages', unit: 'liters' }
  },

  // Housing (8 types)
  [ACTIVITY_CATEGORIES.HOUSING]: {
    ELECTRICITY: { label: 'Electricity Usage', unit: 'kWh' },
    NATURAL_GAS_HOME: { label: 'Natural Gas (Home)', unit: 'cubic meters' },
    HEATING_OIL_HOME: { label: 'Heating Oil (Home)', unit: 'liters' },
    WATER_USAGE: { label: 'Water Usage', unit: 'liters' },
    WASTE_GENERAL: { label: 'General Waste', unit: 'kg' },
    WASTE_RECYCLING: { label: 'Recycling', unit: 'kg' },
    WASTE_COMPOST: { label: 'Composting', unit: 'kg' },
    HOME_MAINTENANCE: { label: 'Home Maintenance', unit: 'hours' }
  },

  // Shopping (7 types)
  [ACTIVITY_CATEGORIES.SHOPPING]: {
    CLOTHING_NEW: { label: 'Clothing (New)', unit: 'items' },
    CLOTHING_SECONDHAND: { label: 'Clothing (Second-hand)', unit: 'items' },
    ELECTRONICS_SMARTPHONE: { label: 'Electronics (Smartphone)', unit: 'items' },
    ELECTRONICS_LAPTOP: { label: 'Electronics (Laptop)', unit: 'items' },
    ELECTRONICS_OTHER: { label: 'Electronics (Other)', unit: 'items' },
    FURNITURE: { label: 'Furniture', unit: 'items' },
    BOOKS_PAPER: { label: 'Books/Paper Products', unit: 'items' }
  }
};

// Category display information
export const CATEGORY_INFO = {
  [ACTIVITY_CATEGORIES.TRANSPORTATION]: {
    name: 'Transportation',
    emoji: '🚗',
    color: 'forest-green',
    description: 'Cars, flights, public transit',
    typeCount: Object.keys(ACTIVITY_TYPES[ACTIVITY_CATEGORIES.TRANSPORTATION]).length
  },
  [ACTIVITY_CATEGORIES.ENERGY]: {
    name: 'Energy',
    emoji: '⚡',
    color: 'emerald',
    description: 'Electricity, heating, fuel',
    typeCount: Object.keys(ACTIVITY_TYPES[ACTIVITY_CATEGORIES.ENERGY]).length
  },
  [ACTIVITY_CATEGORIES.FOOD]: {
    name: 'Food',
    emoji: '🍽️',
    color: 'mint-green',
    description: 'Meals, groceries, dining',
    typeCount: Object.keys(ACTIVITY_TYPES[ACTIVITY_CATEGORIES.FOOD]).length
  },
  [ACTIVITY_CATEGORIES.HOUSING]: {
    name: 'Housing',
    emoji: '🏠',
    color: 'sky-blue',
    description: 'Home energy, utilities',
    typeCount: Object.keys(ACTIVITY_TYPES[ACTIVITY_CATEGORIES.HOUSING]).length
  },
  [ACTIVITY_CATEGORIES.SHOPPING]: {
    name: 'Shopping',
    emoji: '🛍️',
    color: 'turquoise',
    description: 'Purchases, electronics',
    typeCount: Object.keys(ACTIVITY_TYPES[ACTIVITY_CATEGORIES.SHOPPING]).length
  }
};

// Helper functions
export const getCategoryTypes = (category) => {
  return ACTIVITY_TYPES[category] || {};
};

export const getCategoryInfo = (category) => {
  return CATEGORY_INFO[category] || {};
};

export const getAllCategories = () => {
  return Object.values(ACTIVITY_CATEGORIES);
};

export const getTypeLabel = (category, type) => {
  return ACTIVITY_TYPES[category]?.[type]?.label || type;
};

export const getTypeUnit = (category, type) => {
  return ACTIVITY_TYPES[category]?.[type]?.unit || 'units';
};

// Get all types for a category as array of objects
export const getCategoryTypesArray = (category) => {
  const types = getCategoryTypes(category);
  return Object.entries(types).map(([key, value]) => ({
    value: key,
    label: value.label,
    unit: value.unit
  }));
};

// Get all categories as array of objects
export const getCategoriesArray = () => {
  return Object.entries(CATEGORY_INFO).map(([key, value]) => ({
    value: key,
    name: value.name,
    emoji: value.emoji,
    color: value.color,
    description: value.description,
    typeCount: value.typeCount
  }));
};
