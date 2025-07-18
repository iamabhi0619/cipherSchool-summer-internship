import { Calendar, TrendingDown, Leaf, Zap } from "lucide-react";

const PerformanceAnalytics = ({ dashboardData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6">
      <h3 className="text-lg font-semibold text-navy mb-4">Performance Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-mint-green/5 rounded-xl">
          <div className="bg-mint-green/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="h-6 w-6 text-forest-green" />
          </div>
          <p className="text-sm font-medium text-navy mb-1">Daily Average</p>
          <p className="text-lg font-bold text-forest-green">
            {dashboardData?.weeklyData?.length > 0 
              ? Math.round(dashboardData.weeklyData.reduce((sum, day) => sum + (day?.emissions || 0), 0) / 7) + " kg"
              : "N/A"}
          </p>
          <p className="text-xs text-steel-blue">Per day this week</p>
        </div>
        
        <div className="text-center p-4 bg-sky-blue/5 rounded-xl">
          <div className="bg-sky-blue/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingDown className="h-6 w-6 text-ocean-blue" />
          </div>
          <p className="text-sm font-medium text-navy mb-1">Weekly Trend</p>
          <p className="text-lg font-bold text-ocean-blue">
            {dashboardData?.weeklyData?.length >= 2 && dashboardData.weeklyData[6]?.emissions !== undefined && dashboardData.weeklyData[0]?.emissions !== undefined
              ? `${dashboardData.weeklyData[6].emissions < dashboardData.weeklyData[0].emissions ? '↓' : '↑'} ${Math.abs(dashboardData.weeklyData[6].emissions - dashboardData.weeklyData[0].emissions)} kg`
              : "N/A"}
          </p>
          <p className="text-xs text-steel-blue">Sun vs Mon</p>
        </div>
        
        <div className="text-center p-4 bg-emerald/5 rounded-xl">
          <div className="bg-emerald/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Leaf className="h-6 w-6 text-emerald" />
          </div>
          <p className="text-sm font-medium text-navy mb-1">Best Category</p>
          <p className="text-lg font-bold text-emerald">
            {dashboardData?.categoryData?.length > 0 
              ? dashboardData.categoryData.reduce((min, cat) => (cat?.emissions || Infinity) < (min?.emissions || Infinity) ? cat : min)?.category || "N/A"
              : "N/A"}
          </p>
          <p className="text-xs text-steel-blue">Lowest emissions</p>
        </div>
        
        <div className="text-center p-4 bg-turquoise/5 rounded-xl">
          <div className="bg-turquoise/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="h-6 w-6 text-turquoise" />
          </div>
          <p className="text-sm font-medium text-navy mb-1">Efficiency Score</p>
          <p className="text-lg font-bold text-turquoise">
            {dashboardData?.monthlyGoal && dashboardData?.currentScore
              ? Math.round(((dashboardData.monthlyGoal / dashboardData.currentScore) * 100)) + "%"
              : "N/A"}
          </p>
          <p className="text-xs text-steel-blue">Goal achievement</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
