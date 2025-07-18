import { TrendingDown, Calendar, Leaf, Zap } from "lucide-react";
import StatCard from "./StatCard";

const DashboardStats = ({ dashboardData }) => {
  // Calculate total weekly emissions for current week display
  const currentWeekTotal = dashboardData?.weeklyData?.reduce((sum, day) => sum + (day?.emissions || 0), 0) || 0;
  
  // Format weekly change properly
  const weeklyChange = dashboardData?.weeklyChange || 0;
  const weeklyChangeDisplay = weeklyChange > 0 ? `+${weeklyChange}%` : `${weeklyChange}%`;
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Current Score"
        value={dashboardData?.currentScore || "N/A"}
        unit="kg CO₂"
        change={`Weekly: ${currentWeekTotal.toFixed(1)} kg`}
        icon={Leaf}
        color="forest-green"
        bgColor="bg-white"
      />
      <StatCard
        title="Weekly Change"
        value={Math.abs(weeklyChange).toFixed(1)}
        unit="%"
        change={weeklyChangeDisplay}
        icon={TrendingDown}
        color="emerald"
        bgColor="bg-white"
      />
      <StatCard
        title="Monthly Goal"
        value={dashboardData?.monthlyGoal || "N/A"}
        unit="kg target"
        change={dashboardData?.monthlyGoal && currentWeekTotal 
          ? `${Math.round((currentWeekTotal / dashboardData.monthlyGoal) * 100)}% progress` 
          : "No progress"}
        icon={Calendar}
        color="ocean-blue"
        bgColor="bg-white"
      />
      <StatCard
        title="Total Reduction"
        value={dashboardData?.totalReduction || "N/A"}
        unit="kg CO₂"
        change={dashboardData?.carbonMetrics?.totalEmissionsReduced 
          ? `+${dashboardData.carbonMetrics.totalEmissionsReduced} kg saved` 
          : "No reduction yet"}
        icon={Zap}
        color="turquoise"
        bgColor="bg-white"
      />
    </div>
  );
};

export default DashboardStats;
