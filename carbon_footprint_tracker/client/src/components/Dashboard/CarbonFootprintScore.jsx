import { Leaf } from "lucide-react";

const CarbonFootprintScore = ({ dashboardData }) => {
  const overallScore = dashboardData?.overallCarbonScore || 0;
  const currentScore = dashboardData?.currentScore || 0;
  const scoreRank = dashboardData?.carbonScoreRank || "No Rank";
  
  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-navy">Carbon Footprint Score</h3>
        <div className="bg-forest-green/10 p-2 rounded-lg">
          <Leaf className="h-5 w-5 text-forest-green" />
        </div>
      </div>
      
      <div className="text-center mb-6">
        <div className="relative w-24 h-24 mx-auto mb-3">
          <div className="w-full h-full rounded-full border-8 border-lavender flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold text-navy">{overallScore.toFixed(1)}</p>
              <p className="text-xs text-steel-blue">Score</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-steel-blue font-medium">{scoreRank}</p>
        <p className="text-xs text-steel-blue mt-1">
          Current: {currentScore.toFixed(1)} kg CO₂
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-lavender/50">
        <h4 className="text-sm font-semibold text-navy mb-3">Score Breakdown</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-steel-blue">Weekly Average:</span>
            <span className="text-sm font-medium text-navy">
              {dashboardData?.weeklyData?.length > 0 
                ? (dashboardData.weeklyData.reduce((sum, day) => sum + (day?.emissions || 0), 0) / 7).toFixed(1) + " kg/day"
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-steel-blue">Best Day:</span>
            <span className="text-sm font-medium text-emerald">
              {dashboardData?.insights?.bestDay || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-steel-blue">Worst Day:</span>
            <span className="text-sm font-medium text-orange-500">
              {dashboardData?.insights?.worstDay || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-lavender/50">
        <h4 className="text-sm font-semibold text-navy mb-3">Monthly Comparison</h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-forest-green/5 p-3 rounded-lg">
            <p className="text-xs text-steel-blue">Best Month</p>
            <p className="text-sm font-semibold text-navy">
              {dashboardData?.carbonMetrics?.bestMonth?.value?.toFixed(1) || "N/A"} kg
            </p>
            <p className="text-xs text-emerald">
              {dashboardData?.carbonMetrics?.bestMonth?.date 
                ? new Date(dashboardData.carbonMetrics.bestMonth.date).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <div className="bg-lavender/30 p-3 rounded-lg">
            <p className="text-xs text-steel-blue">Monthly Avg</p>
            <p className="text-sm font-semibold text-steel-blue">
              {dashboardData?.carbonMetrics?.monthlyAverage?.toFixed(1) || "N/A"} kg
            </p>
            <p className="text-xs text-steel-blue">Average</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintScore;
