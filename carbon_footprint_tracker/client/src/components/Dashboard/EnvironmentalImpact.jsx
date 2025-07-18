import { TrendingDown } from "lucide-react";

const EnvironmentalImpact = ({ dashboardData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-navy">Environmental Impact</h3>
        <div className="bg-emerald/10 p-2 rounded-lg">
          <TrendingDown className="h-5 w-5 text-emerald" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-emerald/5 rounded-lg">
          <div>
            <p className="text-sm font-medium text-navy">Trees Saved</p>
            <p className="text-xs text-steel-blue">Based on CO₂ reduction</p>
          </div>
          <p className="text-lg font-bold text-emerald">
            {dashboardData?.totalReduction 
              ? Math.round(dashboardData.totalReduction / 22) + " 🌳"
              : "N/A"}
          </p>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-sky-blue/5 rounded-lg">
          <div>
            <p className="text-sm font-medium text-navy">Miles Offset</p>
            <p className="text-xs text-steel-blue">Car driving equivalent</p>
          </div>
          <p className="text-lg font-bold text-ocean-blue">
            {dashboardData?.totalReduction 
              ? Math.round(dashboardData.totalReduction * 2.5) + " mi"
              : "N/A"}
          </p>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-mint-green/5 rounded-lg">
          <div>
            <p className="text-sm font-medium text-navy">Energy Saved</p>
            <p className="text-xs text-steel-blue">kWh equivalent</p>
          </div>
          <p className="text-lg font-bold text-forest-green">
            {dashboardData?.totalReduction 
              ? Math.round(dashboardData.totalReduction * 1.2) + " kWh"
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpact;
