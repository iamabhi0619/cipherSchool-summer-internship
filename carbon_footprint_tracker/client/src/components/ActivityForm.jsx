import { useState } from 'react';
import { Car, Zap, Utensils, Home, ShoppingBag, Calendar, Info, TrendingUp, AlertCircle } from 'lucide-react';
import { 
  ACTIVITY_CATEGORIES, 
  getCategoriesArray, 
  getCategoryTypesArray,
  getCategoryInfo,
  getTypeUnit 
} from '../data/activityData';


const ActivityForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    category: '',
    type: '',
    amount: '',
    unit: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState(null);

  const categories = getCategoriesArray();

  const getCategoryIcon = (categoryValue) => {
    const iconMap = {
      [ACTIVITY_CATEGORIES.TRANSPORTATION]: Car,
      [ACTIVITY_CATEGORIES.ENERGY]: Zap,
      [ACTIVITY_CATEGORIES.FOOD]: Utensils,
      [ACTIVITY_CATEGORIES.HOUSING]: Home,
      [ACTIVITY_CATEGORIES.SHOPPING]: ShoppingBag
    };
    return iconMap[categoryValue] || Zap;
  };

  const getCarbonImpact = (category) => {
    const impactLevels = {
      [ACTIVITY_CATEGORIES.TRANSPORTATION]: { level: 'High', color: 'text-red-500', tip: 'Consider eco-friendly alternatives' },
      [ACTIVITY_CATEGORIES.ENERGY]: { level: 'Medium', color: 'text-orange-500', tip: 'Switch to renewable sources' },
      [ACTIVITY_CATEGORIES.FOOD]: { level: 'Medium', color: 'text-yellow-500', tip: 'Choose local and plant-based options' },
      [ACTIVITY_CATEGORIES.HOUSING]: { level: 'Medium', color: 'text-orange-500', tip: 'Improve energy efficiency' },
      [ACTIVITY_CATEGORIES.SHOPPING]: { level: 'Low', color: 'text-green-500', tip: 'Buy less, choose sustainable' }
    };
    return impactLevels[category] || { level: 'Unknown', color: 'text-gray-500', tip: 'General impact' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-update unit when type changes
      if (name === 'type' && value) {
        const unit = getTypeUnit(newData.category, value);
        newData.unit = unit;
      }
      
      // Reset type and unit when category changes
      if (name === 'category') {
        newData.type = '';
        newData.unit = '';
      }
      
      return newData;
    });
  };

  const handleCategorySelect = (categoryValue) => {
    setFormData(prev => ({ 
      ...prev, 
      category: categoryValue, 
      type: '', 
      unit: '' 
    }));
    setSelectedCategoryInfo(getCategoryInfo(categoryValue));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const currentCategoryTypes = formData.category ? getCategoryTypesArray(formData.category) : [];
  const currentImpact = formData.category ? getCarbonImpact(formData.category) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Activity Category Selection */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-lg font-bold text-navy">
            Choose Activity Category
          </label>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.value);
            const isSelected = formData.category === category.value;
            
            return (
              <div
                key={category.value}
                onClick={() => handleCategorySelect(category.value)}
                className={`relative p-1 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-105 ${
                  isSelected
                    ? 'border-2 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-steel-blue/30 bg-white'
                }`}
                style={{
                  borderColor: isSelected ? `rgb(var(--color-${category.color}))` : undefined,
                  backgroundColor: isSelected ? `rgb(var(--color-${category.color}) / 0.1)` : undefined
                }}
              >
                <div className="text-center">
                  <div 
                    className="w-10 h-10 rounded-xl mx-auto mb-1 flex items-center justify-center"
                    style={{
                      backgroundColor: isSelected 
                        ? `rgb(var(--color-${category.color}) / 0.2)` 
                        : 'rgb(var(--color-steel-blue) / 0.1)'
                    }}
                  >
                    <IconComponent 
                      className="h-6 w-6" 
                      style={{
                        color: isSelected 
                          ? `rgb(var(--color-${category.color}))` 
                          : 'rgb(var(--color-steel-blue))'
                      }} 
                    />
                  </div>
                  <h3 className={`text-sm font-semibold ${isSelected ? 'text-navy' : 'text-steel-blue'}`}>
                    {category.name}
                  </h3>
                  <p className="text-xs text-steel-blue/70 mt-1">
                    {category.typeCount} options
                  </p>
                </div>
                
                {isSelected && (
                  <div className="absolute -top-2 -right-2">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `rgb(var(--color-${category.color}))` }}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Category Impact Info */}
        {formData.category && currentImpact && (
          <div 
            className="mt-3 px-4 py-2 rounded-xl border"
            style={{
              backgroundColor: `rgb(var(--color-${selectedCategoryInfo?.color}) / 0.05)`,
              borderColor: `rgb(var(--color-${selectedCategoryInfo?.color}) / 0.2)`
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className={`h-5 w-5 ${currentImpact.color}`} />
                <span className="text-sm font-semibold text-navy">
                  Carbon Impact: <span className={currentImpact.color}>{currentImpact.level}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-steel-blue">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{currentImpact.tip}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activity Type Selection */}
      {formData.category && (
        <div>
          <label htmlFor="type" className="block text-lg font-bold text-navy mb-1">
            Select Specific Activity
          </label>
          <div className="relative">
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-forest-green bg-white text-navy text-lg font-medium cursor-pointer hover:border-steel-blue/50 transition-colors"
              style={{
                borderColor: formData.type ? `rgb(var(--color-${selectedCategoryInfo?.color}))` : undefined
              }}
            >
              <option value="">Choose your activity...</option>
              {currentCategoryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} ({type.unit})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Amount and Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="amount" className="block text-lg font-bold text-navy mb-1">
            Amount
            {formData.unit && (
              <span className="text-steel-blue font-medium ml-2">({formData.unit})</span>
            )}
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-forest-green bg-white text-navy text-lg hover:border-steel-blue/50 transition-colors"
              placeholder={`Enter amount in ${formData.unit || 'units'}`}
              style={{
                borderColor: formData.amount ? `rgb(var(--color-${selectedCategoryInfo?.color}))` : undefined
              }}
            />
            {formData.unit && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <span className="text-steel-blue font-medium">{formData.unit}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-lg font-bold text-navy mb-1">
            Date
          </label>
          <div className="relative">
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-forest-green bg-white text-navy text-lg cursor-pointer hover:border-steel-blue/50 transition-colors"
              style={{
                borderColor: formData.date ? `rgb(var(--color-${selectedCategoryInfo?.color}))` : undefined
              }}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-lg font-bold text-navy mb-1">
          Additional Details
          <span className="text-steel-blue font-medium ml-2">(Optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-forest-green bg-white text-navy text-lg resize-none hover:border-steel-blue/50 transition-colors"
          placeholder="Add any additional details about this activity (e.g., purpose, conditions, notes)..."
          style={{
            borderColor: formData.description ? `rgb(var(--color-${selectedCategoryInfo?.color}))` : undefined
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          onClick={() => {
            setFormData({
              category: '',
              type: '',
              amount: '',
              unit: '',
              date: new Date().toISOString().split('T')[0],
              description: ''
            });
            setSelectedCategoryInfo(null);
          }}
          className="px-8 py-2 border-2 border-gray-300 text-steel-blue rounded-xl hover:bg-gray-50 hover:border-steel-blue transition-all font-semibold cursor-pointer"
        >
          Reset Form
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting || !formData.category || !formData.type || !formData.amount}
          className="px-8 py-2 bg-forest-green text-white rounded-xl hover:bg-forest-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-3 font-semibold shadow-lg hover:shadow-xl cursor-pointer"
        >
          {isSubmitting && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          )}
          <span>{isSubmitting ? 'Logging Activity...' : 'Log Activity'}</span>
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;
