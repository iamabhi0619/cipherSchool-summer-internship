import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityForm from '../components/ActivityForm';
import { Plus, Save, ArrowLeft, Leaf, Zap } from 'lucide-react';
import { getCategoriesArray } from '../data/activityData';

const ActivityFormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const categories = getCategoriesArray();

  const handleActivitySubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare API payload
      const payload = {
        category: formData.category,
        type: formData.type,
        amount: parseFloat(formData.amount),
        unit: formData.unit,
        date: formData.date || new Date().toISOString().split('T')[0],
        ...(formData.description && { description: formData.description })
      };

      // Call API
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to log activity');
      }
      
      // Show success message
      alert('Activity logged successfully!');
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to log activity. Please try again.');
      console.error('Error logging activity:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-lavender p-4 w-full">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-sky-blue/30 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-forest-green rounded-2xl shadow-md">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-navy mb-1">Log New Activity</h1>
                <p className="text-steel-blue">
                  Track your carbon-emitting activities to monitor your environmental impact
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-3 text-steel-blue hover:text-navy transition-all duration-200 bg-lavender px-6 py-3 rounded-xl hover:bg-sky-blue/20 shadow-sm hover:shadow-md cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-lavender/50 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-emerald rounded-xl shadow-md">
                  <Save className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-navy">Activity Details</h2>
              </div>
              
              <ActivityForm 
                onSubmit={handleActivitySubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-mint-green/50 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-turquoise rounded-lg">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy">Quick Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-mint-green/10 p-4 rounded-xl border border-mint-green/30 cursor-pointer hover:bg-mint-green/20 transition-colors">
                  <p className="text-sm text-steel-blue">Activities This Week</p>
                  <p className="text-2xl font-bold text-navy">12</p>
                </div>
                <div className="bg-emerald/10 p-4 rounded-xl border border-emerald/30 cursor-pointer hover:bg-emerald/20 transition-colors">
                  <p className="text-sm text-steel-blue">CO₂ Tracked Today</p>
                  <p className="text-2xl font-bold text-navy">24.5 kg</p>
                </div>
              </div>
            </div>

            {/* Activity Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-ocean-blue/50 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-ocean-blue rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy">Categories</h3>
              </div>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div 
                    key={category.value}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md`}
                    style={{
                      backgroundColor: `rgb(var(--color-${category.color}) / 0.1)`,
                      borderColor: `rgb(var(--color-${category.color}) / 0.3)`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = `rgb(var(--color-${category.color}) / 0.2)`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = `rgb(var(--color-${category.color}) / 0.1)`;
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.emoji}</span>
                      <span className="text-sm font-semibold text-navy">{category.name}</span>
                    </div>
                    <span 
                      className="text-xs text-white px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `rgb(var(--color-${category.color}))`
                      }}
                    >
                      {category.typeCount} types
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-lavender/50 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-navy rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-navy">💡 Logging Tips</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-mint-green p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Be Accurate</h4>
              </div>
              <p className="text-white/90 text-sm text-center">Provide realistic estimates for distance, consumption, and duration</p>
            </div>
            <div className="bg-emerald p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📅</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Log Regularly</h4>
              </div>
              <p className="text-white/90 text-sm text-center">Daily logging provides the most accurate carbon footprint tracking</p>
            </div>
            <div className="bg-forest-green p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Include Details</h4>
              </div>
              <p className="text-white/90 text-sm text-center">More specific information leads to better emission calculations</p>
            </div>
            <div className="bg-turquoise p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Small Activities</h4>
              </div>
              <p className="text-white/90 text-sm text-center">Even small activities like device usage contribute to your footprint</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFormPage;
