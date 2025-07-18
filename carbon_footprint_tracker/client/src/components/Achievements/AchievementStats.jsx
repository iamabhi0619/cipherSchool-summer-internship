import { Trophy, Award, Star, Target, TrendingUp, Calendar } from "lucide-react";

const AchievementStats = ({ userAchievements }) => {
  const stats = userAchievements?.stats;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* Total Achievements */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">Total</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats.total}</p>
          </div>
          <div className="p-3 bg-ocean-blue/10 rounded-xl">
            <Target className="h-7 w-7 text-ocean-blue" />
          </div>
        </div>
      </div>

      {/* Unlocked Achievements */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">Unlocked</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats.unlocked}</p>
          </div>
          <div className="p-3 bg-mint-green/20 rounded-xl">
            <Award className="h-7 w-7 text-forest-green" />
          </div>
        </div>
      </div>

      {/* In Progress */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">In Progress</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats.inProgress}</p>
          </div>
          <div className="p-3 bg-turquoise/10 rounded-xl">
            <TrendingUp className="h-7 w-7 text-turquoise" />
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">Completion</p>
            <p className="text-3xl font-bold text-navy mt-1">{stats.completionRate}%</p>
          </div>
          <div className="p-3 bg-emerald/10 rounded-xl">
            <Trophy className="h-7 w-7 text-emerald" />
          </div>
        </div>
      </div>

      {/* Total Points */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">Total Points</p>
            <p className="text-2xl font-bold text-navy mt-1">{stats.totalPoints}</p>
          </div>
          <div className="p-3 bg-forest-green/10 rounded-xl">
            <Star className="h-7 w-7 text-forest-green" />
          </div>
        </div>
      </div>

      {/* Last Unlocked */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-steel-blue">Latest</p>
            <p className="text-sm font-bold text-navy mt-1">
              {stats.lastUnlocked ? new Date(stats.lastUnlocked).toLocaleDateString() : "None yet"}
            </p>
          </div>
          <div className="p-3 bg-lavender/20 rounded-xl">
            <Calendar className="h-7 w-7 text-navy" />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {stats.categories && (
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-6 bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
          <h3 className="text-lg font-semibold text-navy mb-4">Category Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(stats.categories).map(([category, count]) => (
              <div key={category} className="text-center">
                <div className="text-2xl font-bold text-navy">{count}</div>
                <div className="text-sm text-steel-blue capitalize">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rarity Breakdown */}
      {stats.rarities && (
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-6 bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
          <h3 className="text-lg font-semibold text-navy mb-4">Rarity Distribution</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(stats.rarities).map(([rarity, count]) => (
              <div key={rarity} className="text-center">
                <div
                  className={`text-2xl font-bold ${
                    rarity === "legendary"
                      ? "text-yellow-600"
                      : rarity === "epic"
                      ? "text-purple-600"
                      : rarity === "rare"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {count}
                </div>
                <div className="text-sm text-steel-blue capitalize">{rarity}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementStats;
