import { Target, Calendar, TrendingDown, Award, BarChart3, Zap } from "lucide-react";

const GoalsStats = ({ goals, stats }) => {
  // Calculate local stats from goals if stats from API are not available
  const localStats = {
    total: goals.length,
    completed: goals.filter(g => g.isCompleted || g.completed).length,
    active: goals.filter(g => !(g.isCompleted || g.completed)).length,
    completionRate: goals.length > 0 
      ? Math.round((goals.filter(g => g.isCompleted || g.completed).length / goals.length) * 100) 
      : 0,
    totalImpact: goals.reduce((sum, goal) => sum + (goal.estimatedImpact || 0), 0),
    averageProgress: goals.length > 0 
      ? Math.round(goals.reduce((sum, goal) => sum + (goal.progress || 0), 0) / goals.length)
      : 0
  };

  // Use API stats if available, otherwise use local calculations
  const displayStats = stats || localStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Total Goals */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">Total Goals</p>
            <p className="text-3xl font-bold text-navy mt-1">{displayStats.total}</p>
          </div>
          <div className="p-3 bg-ocean-blue/10 rounded-xl">
            <Target className="h-7 w-7 text-ocean-blue" />
          </div>
        </div>
      </div>

      {/* Completed Goals */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">Completed</p>
            <p className="text-3xl font-bold text-navy mt-1">{displayStats.completed}</p>
          </div>
          <div className="p-3 bg-mint-green/20 rounded-xl">
            <Award className="h-7 w-7 text-forest-green" />
          </div>
        </div>
      </div>

      {/* Active Goals */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">Active</p>
            <p className="text-3xl font-bold text-navy mt-1">{displayStats.active}</p>
          </div>
          <div className="p-3 bg-turquoise/10 rounded-xl">
            <Calendar className="h-7 w-7 text-turquoise" />
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">Completion Rate</p>
            <p className="text-3xl font-bold text-navy mt-1">{displayStats.completionRate}%</p>
          </div>
          <div className="p-3 bg-emerald/10 rounded-xl">
            <TrendingDown className="h-7 w-7 text-emerald" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsStats;
