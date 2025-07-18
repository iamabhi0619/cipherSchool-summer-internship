import { Zap, Car, Apple } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-navy">Quick Actions</h3>
        <div className="bg-turquoise/10 p-2 rounded-lg">
          <Zap className="h-5 w-5 text-turquoise" />
        </div>
      </div>
      
      {/* Quick Action Items */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between p-3 bg-lavender/10 rounded-lg hover:bg-lavender/20 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <Car className="h-4 w-4 text-forest-green" />
            <div>
              <p className="text-sm font-medium text-navy">Use public transport</p>
              <p className="text-xs text-steel-blue">Potential: -8 kg CO₂</p>
            </div>
          </div>
          <div className="text-xs bg-forest-green/10 text-forest-green px-2 py-1 rounded-full">
            High Impact
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-lavender/10 rounded-lg hover:bg-lavender/20 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <Zap className="h-4 w-4 text-ocean-blue" />
            <div>
              <p className="text-sm font-medium text-navy">Switch to LED bulbs</p>
              <p className="text-xs text-steel-blue">Potential: -3 kg CO₂</p>
            </div>
          </div>
          <div className="text-xs bg-ocean-blue/10 text-ocean-blue px-2 py-1 rounded-full">
            Easy Win
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-lavender/10 rounded-lg hover:bg-lavender/20 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <Apple className="h-4 w-4 text-emerald" />
            <div>
              <p className="text-sm font-medium text-navy">Plant-based meals</p>
              <p className="text-xs text-steel-blue">Potential: -5 kg CO₂</p>
            </div>
          </div>
          <div className="text-xs bg-emerald/10 text-emerald px-2 py-1 rounded-full">
            Daily Goal
          </div>
        </div>
      </div>
      
      {/* Weekly Challenge */}
      <div className="pt-4 border-t border-lavender/50">
        <div className="bg-gradient-to-r from-forest-green/10 to-emerald/10 p-3 rounded-lg">
          <p className="text-xs text-steel-blue mb-1">🎯 Weekly Challenge</p>
          <p className="text-sm font-medium text-navy">Reduce transport emissions by 15%</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex-1 bg-white/50 rounded-full h-2 mr-3">
              <div className="bg-forest-green h-2 rounded-full w-2/3"></div>
            </div>
            <span className="text-xs text-forest-green font-medium">67%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
