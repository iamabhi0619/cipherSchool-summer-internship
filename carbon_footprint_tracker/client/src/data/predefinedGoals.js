export const predefinedGoals = [
  // Energy Goals
  {
    id: 'energy_1',
    title: 'Switch to LED bulbs in all rooms',
    description: 'Replace traditional bulbs with energy-efficient LED lights',
    category: 'energy',
    priority: 'high',
    estimatedImpact: 45, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'energy_2',
    title: 'Unplug electronics when not in use',
    description: 'Reduce phantom power consumption',
    category: 'energy',
    priority: 'medium',
    estimatedImpact: 60, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'energy_3',
    title: 'Set thermostat 2°C lower in winter',
    description: 'Reduce heating energy consumption',
    category: 'energy',
    priority: 'high',
    estimatedImpact: 240, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'energy_4',
    title: 'Use cold water for washing clothes',
    description: 'Reduce water heating energy',
    category: 'energy',
    priority: 'medium',
    estimatedImpact: 150, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'energy_5',
    title: 'Air dry clothes instead of using dryer',
    description: 'Eliminate dryer energy consumption',
    category: 'energy',
    priority: 'medium',
    estimatedImpact: 320, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'energy_6',
    title: 'Install a programmable thermostat',
    description: 'Optimize heating and cooling schedules',
    category: 'energy',
    priority: 'high',
    estimatedImpact: 180, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'energy_7',
    title: 'Seal air leaks around windows and doors',
    description: 'Improve home insulation efficiency',
    category: 'energy',
    priority: 'high',
    estimatedImpact: 300, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'energy_8',
    title: 'Use energy-efficient appliances',
    description: 'Replace old appliances with ENERGY STAR rated ones',
    category: 'energy',
    priority: 'high',
    estimatedImpact: 500, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'energy_9',
    title: 'Turn off lights when leaving rooms',
    description: 'Reduce unnecessary lighting consumption',
    category: 'energy',
    priority: 'low',
    estimatedImpact: 25, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'energy_10',
    title: 'Use natural light during the day',
    description: 'Keep curtains open and avoid artificial lighting',
    category: 'energy',
    priority: 'low',
    estimatedImpact: 30, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },

  // Transportation Goals
  {
    id: 'transport_1',
    title: 'Walk or bike to work 3 times per week',
    description: 'Choose eco-friendly transportation for short distances',
    category: 'transportation',
    priority: 'high',
    estimatedImpact: 520, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'transport_2',
    title: 'Use public transportation instead of driving',
    description: 'Take bus, train, or metro for daily commute',
    category: 'transportation',
    priority: 'high',
    estimatedImpact: 1200, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'transport_3',
    title: 'Carpool to work twice a week',
    description: 'Share rides with colleagues or neighbors',
    category: 'transportation',
    priority: 'medium',
    estimatedImpact: 600, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'transport_4',
    title: 'Work from home 2 days per week',
    description: 'Reduce commuting emissions through remote work',
    category: 'transportation',
    priority: 'high',
    estimatedImpact: 800, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'transport_5',
    title: 'Combine errands into one trip',
    description: 'Plan multiple tasks for single car trips',
    category: 'transportation',
    priority: 'medium',
    estimatedImpact: 200, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'transport_6',
    title: 'Keep car tires properly inflated',
    description: 'Improve fuel efficiency through tire maintenance',
    category: 'transportation',
    priority: 'low',
    estimatedImpact: 80, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'transport_7',
    title: 'Drive at or below speed limit',
    description: 'Reduce fuel consumption through efficient driving',
    category: 'transportation',
    priority: 'low',
    estimatedImpact: 150, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'transport_8',
    title: 'Use video calls instead of business travel',
    description: 'Replace flights and long drives with virtual meetings',
    category: 'transportation',
    priority: 'high',
    estimatedImpact: 2000, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'transport_9',
    title: 'Take vacation trips by train instead of plane',
    description: 'Choose rail travel for medium-distance trips',
    category: 'transportation',
    priority: 'medium',
    estimatedImpact: 300, // kg CO₂/trip saved
    unit: 'kg CO₂/trip'
  },
  {
    id: 'transport_10',
    title: 'Use electric or hybrid vehicle',
    description: 'Switch to more efficient vehicle technology',
    category: 'transportation',
    priority: 'high',
    estimatedImpact: 1800, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },

  // Food Goals
  {
    id: 'food_1',
    title: 'Eat meat-free meals 3 days per week',
    description: 'Reduce meat consumption to lower carbon footprint',
    category: 'food',
    priority: 'high',
    estimatedImpact: 480, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'food_2',
    title: 'Buy locally grown produce',
    description: 'Choose local farmers market or local grocery options',
    category: 'food',
    priority: 'medium',
    estimatedImpact: 120, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'food_3',
    title: 'Grow your own herbs and vegetables',
    description: 'Start a home garden or container gardening',
    category: 'food',
    priority: 'medium',
    estimatedImpact: 90, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'food_4',
    title: 'Reduce food waste by meal planning',
    description: 'Plan weekly meals and shopping lists',
    category: 'food',
    priority: 'high',
    estimatedImpact: 300, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'food_5',
    title: 'Use reusable water bottles',
    description: 'Replace single-use plastic bottles',
    category: 'food',
    priority: 'low',
    estimatedImpact: 50, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'food_6',
    title: 'Bring reusable bags for grocery shopping',
    description: 'Eliminate plastic bag usage',
    category: 'food',
    priority: 'low',
    estimatedImpact: 15, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'food_7',
    title: 'Choose organic foods when possible',
    description: 'Support sustainable farming practices',
    category: 'food',
    priority: 'medium',
    estimatedImpact: 80, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'food_8',
    title: 'Compost food scraps',
    description: 'Set up home composting system',
    category: 'food',
    priority: 'medium',
    estimatedImpact: 180, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'food_9',
    title: 'Buy in bulk to reduce packaging',
    description: 'Purchase larger quantities to minimize packaging waste',
    category: 'food',
    priority: 'medium',
    estimatedImpact: 40, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'food_10',
    title: 'Use tap water with filter instead of bottled',
    description: 'Install water filter and use reusable containers',
    category: 'food',
    priority: 'medium',
    estimatedImpact: 100, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },

  // Waste Goals
  {
    id: 'waste_1',
    title: 'Recycle paper, plastic, glass, and metal',
    description: 'Properly sort and recycle all recyclable materials',
    category: 'waste',
    priority: 'high',
    estimatedImpact: 250, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'waste_2',
    title: 'Use digital receipts and bills',
    description: 'Go paperless for all possible transactions',
    category: 'waste',
    priority: 'low',
    estimatedImpact: 20, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'waste_3',
    title: 'Repair items instead of replacing them',
    description: 'Fix clothes, electronics, and furniture when possible',
    category: 'waste',
    priority: 'medium',
    estimatedImpact: 200, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'waste_4',
    title: 'Donate or sell items instead of throwing away',
    description: 'Give second life to unwanted items',
    category: 'waste',
    priority: 'medium',
    estimatedImpact: 150, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'waste_5',
    title: 'Use rechargeable batteries',
    description: 'Replace disposable batteries with rechargeable ones',
    category: 'waste',
    priority: 'low',
    estimatedImpact: 25, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'waste_6',
    title: 'Print double-sided documents',
    description: 'Reduce paper consumption by 50%',
    category: 'waste',
    priority: 'low',
    estimatedImpact: 30, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'waste_7',
    title: 'Use refillable containers for bulk items',
    description: 'Bring own containers to bulk stores',
    category: 'waste',
    priority: 'medium',
    estimatedImpact: 60, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'waste_8',
    title: 'Buy products with minimal packaging',
    description: 'Choose items with less plastic and cardboard',
    category: 'waste',
    priority: 'medium',
    estimatedImpact: 80, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },

  // Housing Goals
  {
    id: 'housing_1',
    title: 'Install low-flow showerheads and faucets',
    description: 'Reduce water heating energy consumption',
    category: 'housing',
    priority: 'medium',
    estimatedImpact: 120, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'housing_2',
    title: 'Use eco-friendly cleaning products',
    description: 'Switch to biodegradable and non-toxic cleaners',
    category: 'housing',
    priority: 'low',
    estimatedImpact: 35, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'housing_3',
    title: 'Plant trees or maintain existing garden',
    description: 'Increase carbon absorption around home',
    category: 'housing',
    priority: 'medium',
    estimatedImpact: 200, // kg CO₂/year absorbed
    unit: 'kg CO₂/year'
  },
  {
    id: 'housing_4',
    title: 'Install solar panels or use renewable energy',
    description: 'Switch to clean energy sources',
    category: 'housing',
    priority: 'high',
    estimatedImpact: 1500, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'housing_5',
    title: 'Use smart power strips',
    description: 'Automatically cut phantom power loads',
    category: 'housing',
    priority: 'medium',
    estimatedImpact: 100, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'housing_6',
    title: 'Insulate water heater and pipes',
    description: 'Reduce heat loss in water heating system',
    category: 'housing',
    priority: 'medium',
    estimatedImpact: 140, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'housing_7',
    title: 'Use ceiling fans instead of AC when possible',
    description: 'Reduce air conditioning energy consumption',
    category: 'housing',
    priority: 'medium',
    estimatedImpact: 180, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'housing_8',
    title: 'Install double-pane windows',
    description: 'Improve home insulation and energy efficiency',
    category: 'housing',
    priority: 'high',
    estimatedImpact: 400, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'housing_9',
    title: 'Use rainwater collection for garden',
    description: 'Reduce water consumption and treatment energy',
    category: 'housing',
    priority: 'medium',
    estimatedImpact: 70, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'housing_10',
    title: 'Switch to renewable energy provider',
    description: 'Choose green energy plan from utility company',
    category: 'housing',
    priority: 'high',
    estimatedImpact: 2000, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },

  // Additional Goals
  {
    id: 'lifestyle_1',
    title: 'Buy second-hand clothes',
    description: 'Choose thrift stores and consignment shops',
    category: 'waste',
    priority: 'medium',
    estimatedImpact: 160, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'lifestyle_2',
    title: 'Use library books instead of buying new',
    description: 'Borrow books, magazines, and media',
    category: 'waste',
    priority: 'low',
    estimatedImpact: 40, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'lifestyle_3',
    title: 'Switch to paperless banking and billing',
    description: 'Receive all statements electronically',
    category: 'waste',
    priority: 'low',
    estimatedImpact: 25, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'lifestyle_4',
    title: 'Use streaming instead of physical media',
    description: 'Choose digital music, movies, and games',
    category: 'waste',
    priority: 'low',
    estimatedImpact: 15, // kg CO₂/year saved
    unit: 'kg CO₂/year'
  },
  {
    id: 'lifestyle_5',
    title: 'Participate in community clean-up events',
    description: 'Join local environmental initiatives',
    category: 'waste',
    priority: 'low',
    estimatedImpact: 50, // kg CO₂/event saved
    unit: 'kg CO₂/event'
  }
];

export const getGoalsByCategory = (category) => {
  return predefinedGoals.filter(goal => goal.category === category);
};

export const getGoalById = (id) => {
  return predefinedGoals.find(goal => goal.id === id);
};

export const getAllCategories = () => {
  return [...new Set(predefinedGoals.map(goal => goal.category))];
};
