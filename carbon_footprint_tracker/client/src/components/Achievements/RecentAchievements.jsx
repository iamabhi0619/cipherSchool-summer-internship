import moment from "moment";
import { Sparkles, Clock, Calendar } from "lucide-react";

const getRarityColor = (rarity) => {
  switch (rarity) {
    case "legendary":
      return "#FFD700";
    case "epic":
      return "#9C27B0";
    case "rare":
      return "#2196F3";
    case "common":
    default:
      return "#4CAF50";
  }
};

const RecentAchievements = ({ achievements, achievementDetails = [] }) => {
  // Convert achievementDetails array to object for fast lookup
  const detailsMap = Array.isArray(achievementDetails)
    ? achievementDetails.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {})
    : achievementDetails;

  const recent = achievements?.recent || [];

  if (!recent.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-forest-green" />
          <h2 className="text-lg font-semibold text-navy">Recent Achievements</h2>
        </div>
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-steel-blue mx-auto mb-3 opacity-50" />
          <p className="text-steel-blue">No recent achievements</p>
          <p className="text-sm text-steel-blue mt-1">
            Keep working towards your goals to unlock new achievements!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-shadow-forest-green" />
          <h2 className="text-lg font-semibold text-navy">Recent Achievements</h2>
        </div>
        <span className="text-sm text-steel-blue">Last 30 days</span>
      </div>
      <div className="space-y-4">
        {recent.slice(0, 4).map((item) => {
          const details = detailsMap[item.achievementId] || {};
          return (
            <div key={item._id} className="group">
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-mint-green/5 to-turquoise/5 border border-mint-green/10 hover:border-mint-green/20 transition-all duration-200">
                {/* Icon with glow effect */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl relative"
                  style={{ backgroundColor: `${getRarityColor(details.rarity)}20` }}
                >
                  {details.icon}
                  <div className="absolute inset-0 rounded-xl bg-mint-green/20 animate-pulse"></div>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-semibold text-navy group-hover:text-forest-green transition-colors">
                      {details.title}
                    </h3>
                    <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                      <span className="text-sm">💎</span>
                      <span className="text-sm font-bold text-navy">{details.points}</span>
                    </div>
                  </div>
                  <p className="text-xs text-steel-blue mb-2 line-clamp-1">{details.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center capitalize space-x-2">
                      {/* Rarity Badge */}
                      <span
                        className="text-xs px-2 py-1 rounded-md font-medium text-white"
                        style={{ backgroundColor: getRarityColor(details.rarity) }}
                      >
                        {details.rarity}
                      </span>
                      {/* Category */}
                      <span className="text-xs px-2 py-1 bg-sky-blue/10 text-ocean-blue rounded font-medium">
                        {details.category
                          ?.replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                    {/* Time ago */}
                    <div className="flex items-center space-x-1 text-xs text-teal font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>{moment(item.unlockedAt).fromNow()}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Unlock Message */}
              {details.unlockMessage && (
                <div className="ml-16 mt-2 p-3 bg-mint-green/5 rounded-lg border-l-2 border-mint-green/30">
                  <p className="text-xs text-forest-green italic">"{details.unlockMessage}"</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentAchievements;
