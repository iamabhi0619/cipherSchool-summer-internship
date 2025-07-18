import { Trophy, Users, TrendingUp, Clock } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import api from "../../lib/api";

import { useState } from "react";
const AchievementLeaderboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await api.get("/achievements/leaderboard");
        const data = response.data?.data || {};
        setLeaderboard(data.leaderboard || []);
        setTotalUsers(data.totalUsers || 0);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching leaderboard data");
        toast.error(error.response?.data?.message || "Error fetching leaderboard data");
        setError("Failed to load leaderboard.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600";
      case 2:
        return "from-gray-300 to-gray-500";
      case 3:
        return "from-orange-400 to-orange-600";
      default:
        return "from-sky-blue to-turquoise";
    }
  };

  const getPointsBadgeColor = (points) => {
    if (points >= 10000) return "bg-purple-500";
    if (points >= 5000) return "bg-yellow-500";
    if (points >= 2000) return "bg-blue-500";
    if (points >= 1000) return "bg-green-500";
    return "bg-gray-400";
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Users className="w-5 h-5 text-turquoise animate-pulse" />
          <h2 className="text-lg font-semibold text-navy">Achievement Leaderboard</h2>
        </div>
        <div className="h-8 bg-gray-200 rounded w-32 mx-auto animate-pulse mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <Trophy className="w-16 h-16 text-red-400 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-red-500 mb-2">{error}</h3>
        <p className="text-steel-blue">Please try again later.</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Users className="w-5 h-5 text-turquoise" />
          <h2 className="text-lg font-semibold text-navy">Achievement Leaderboard</h2>
        </div>
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-steel-blue mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-navy mb-2">No leaderboard data</h3>
          <p className="text-steel-blue">
            The leaderboard will appear once users start earning achievements.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-turquoise" />
            <h2 className="text-lg font-semibold text-navy">Achievement Leaderboard</h2>
          </div>
          <div className="text-sm text-steel-blue">
            Updated <Clock className="w-4 h-4 inline ml-1" /> just now
          </div>
        </div>

        <p className="text-steel-blue">
          See how you stack up against other eco-champions based on achievement points earned.
        </p>
      </div>

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-navy mb-6 text-center">🏆 Top Performers</h3>
          <div className="flex items-end justify-center space-x-4 mb-6">
            {leaderboard.slice(0, 3).map((entry, idx) => (
              <div className="text-center" key={entry._id}>
                <div className="relative">
                  <div className={`w-${idx === 1 ? "20" : "16"} h-${idx === 1 ? "20" : "16"} rounded-full bg-gradient-to-b ${getRankColor(idx + 1)} flex items-center justify-center mb-2 mx-auto`}>
                    <span className={`text-${idx === 1 ? "3xl" : "2xl"}`}>{getRankIcon(idx + 1)}</span>
                  </div>
                  <div className={`absolute -top-${idx === 1 ? "2" : "1"} -right-1 w-${idx === 1 ? "7" : "6"} h-${idx === 1 ? "7" : "6"} bg-white rounded-full flex items-center justify-center border-2 ${idx === 1 ? "border-yellow-500" : idx === 2 ? "border-orange-500" : "border-gray-400"}`}>
                    <span className={`text-xs font-bold ${idx === 1 ? "text-yellow-600" : idx === 2 ? "text-orange-600" : "text-gray-600"}`}>{idx + 1}</span>
                  </div>
                </div>
                <h4 className={`font-semibold text-navy ${idx === 1 ? "font-bold" : "text-sm"}`}>{entry.name || "Anonymous"}</h4>
                <p className={`text-${idx === 1 ? "sm" : "xs"} text-steel-blue`}>{entry.stats?.totalAchievementPoints?.toLocaleString()} pts</p>
                <div className={`w-12 h-${idx === 1 ? "20" : idx === 2 ? "12" : "16"} ${idx === 1 ? "bg-yellow-200" : idx === 2 ? "bg-orange-200" : "bg-gray-200"} rounded-t-lg mx-auto mt-2`}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-navy">Complete Rankings</h3>
          <p className="text-sm text-steel-blue">Total Users: {totalUsers}</p>
        </div>
        <div className="divide-y divide-gray-100">
          {leaderboard.map((entry, index) => {
            const rank = entry.rank || index + 1;
            const isTopThree = rank <= 3;
            return (
              <div
                key={entry._id || index}
                className={`p-4 hover:bg-gray-50 transition-colors ${isTopThree ? "bg-gradient-to-r from-yellow-50 to-orange-50" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${isTopThree ? `bg-gradient-to-b ${getRankColor(rank)}` : "bg-steel-blue"}`}
                    >
                      {typeof getRankIcon(rank) === "string" && getRankIcon(rank).includes("#") ? (
                        <span className="text-sm">{getRankIcon(rank)}</span>
                      ) : (
                        <span className="text-lg">{getRankIcon(rank)}</span>
                      )}
                    </div>
                    {/* User Info */}
                    <div className="flex items-center space-x-2">
                      <img
                        src={entry.avatar || "/default-avatar.png"}
                        alt={entry.name}
                        className="w-8 h-8 rounded-full border border-gray-200"
                      />
                      <div>
                        <h4 className="font-semibold text-navy">{entry.name || "Anonymous User"}</h4>
                        <div className="flex items-center space-x-3 text-sm text-steel-blue">
                          <span>{entry.stats?.achievementsUnlocked || 0} achievements</span>
                          <span>•</span>
                          <span>{entry.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Points and Carbon Score */}
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getPointsBadgeColor(entry.stats?.totalAchievementPoints)}`}>
                      {entry.stats?.totalAchievementPoints?.toLocaleString() || 0} pts
                    </span>
                    <div className="text-xs text-turquoise mt-1">Carbon Score: {entry.carbonScore}</div>
                    {entry.stats?.lastAchievementDate && (
                      <div className="text-xs text-steel-blue mt-1">
                        Last Achievement: {new Date(entry.stats.lastAchievementDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Position (if not in top visible) */}
      {leaderboard.length > 10 && (
        <div className="bg-white rounded-2xl shadow-md p-4 border-2 border-turquoise/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-turquoise flex items-center justify-center text-white font-semibold text-sm">
                You
              </div>
              <div>
                <p className="font-semibold text-navy">Your Current Position</p>
                <p className="text-sm text-steel-blue">Keep climbing the leaderboard!</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-turquoise">#25 • 1,250 pts</p>
              <p className="text-xs text-steel-blue">12 achievements</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementLeaderboard;
