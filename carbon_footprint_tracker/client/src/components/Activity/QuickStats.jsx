import { Leaf, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../lib/api";

function QuickStats() {
  const [data, setData] = useState({
    totalActivitiesThisWeek: 0,
    totalEmissions: 0,
    weeklyGoal: 50,
    dailyAverage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulated API call - replace with actual API when available
        const response = await api.get("/activities/quick-stats");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching QuickStats: ", error);
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-mint-green/50 p-6 h-52">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-turquoise rounded-lg">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-navy">Quick Stats</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 animate-pulse rounded-xl h-12"></div>
          <div className="bg-gray-100 animate-pulse rounded-xl h-12"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-6 h-52">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-red-500 rounded-lg">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-navy">Quick Stats</h3>
        </div>
        <div className="flex items-center justify-center h-20">
          <p className="text-red-500 text-sm text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-mint-green/50 p-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-turquoise rounded-lg">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-navy">Quick Stats</h3>
      </div>

      <div className="space-y-2">
        {/* Activities This Week */}
        <div className="bg-mint-green/10 px-4 py-2 rounded-xl border border-mint-green/30 cursor-pointer hover:bg-mint-green/20 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-steel-blue font-semibold">Activities This Week</p>
              <p className="text-2xl font-bold text-navy">{data.totalActivitiesThisWeek}</p>
            </div>
            <div className="p-2 bg-mint-green/20 rounded-lg">
              <Calendar className="h-5 w-5 text-mint-green" />
            </div>
          </div>
        </div>

        {/* CO₂ Emissions */}
        <div className="bg-emerald/10 px-4 py-2 rounded-xl border border-emerald/30 cursor-pointer hover:bg-emerald/20 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-steel-blue font-semibold">CO₂ This Week</p>
              <p className="text-2xl font-bold text-navy">{data.totalEmissions} kg</p>
            </div>
            <div className="p-2 bg-emerald/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-emerald" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickStats;
