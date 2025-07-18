import { Lightbulb, Car, Zap, Utensils, Recycle } from 'lucide-react';

const SuggestionsList = () => {
  const suggestions = [
    {
      id: 1,
      icon: Car,
      title: 'Use Public Transport',
      description: 'Taking the bus or train instead of driving can reduce your daily emissions by up to 4.6 kg CO₂',
      impact: 'High Impact',
      impactColor: 'text-red-600 bg-red-100'
    },
    {
      id: 2,
      icon: Zap,
      title: 'Switch to LED Bulbs',
      description: 'LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs',
      impact: 'Medium Impact',
      impactColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 3,
      icon: Utensils,
      title: 'Reduce Meat Consumption',
      description: 'Having one meat-free day per week can save approximately 1.3 kg CO₂ per day',
      impact: 'High Impact',
      impactColor: 'text-red-600 bg-red-100'
    },
    {
      id: 4,
      icon: Recycle,
      title: 'Recycle More',
      description: 'Proper recycling can reduce household waste emissions by up to 30%',
      impact: 'Low Impact',
      impactColor: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="h-6 w-6 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-900">Personalized Suggestions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion) => {
          const IconComponent = suggestion.icon;
          return (
            <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <IconComponent className="h-5 w-5 text-blue-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${suggestion.impactColor}`}>
                      {suggestion.impact}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {suggestion.description}
                  </p>
                  
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          💡 <strong>Tip:</strong> Implementing just 2-3 of these suggestions can reduce your monthly emissions by 20-30%!
        </p>
      </div>
    </div>
  );
};

export default SuggestionsList;
