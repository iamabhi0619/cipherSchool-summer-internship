import { TrendingUp, TrendingDown, Minus, Trophy, Award, Medal } from 'lucide-react';

const LeaderboardTable = ({ data }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank) => {
    if (rank <= 3) return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    if (rank <= 10) return 'bg-gradient-to-r from-green-400 to-blue-500 text-white';
    if (rank <= 50) return 'bg-gradient-to-r from-blue-400 to-purple-500 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rank</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">User</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Carbon Saved</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Streak</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Achievements</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Trend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr 
              key={index}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                user.isCurrentUser ? 'bg-blue-50 hover:bg-blue-100' : ''
              }`}
            >
              {/* Rank */}
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBadgeColor(user.rank)}`}>
                    {user.rank}
                  </div>
                  {getRankIcon(user.rank)}
                </div>
              </td>

              {/* User */}
              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{user.avatar}</span>
                  </div>
                  <div>
                    <p className={`font-medium ${user.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          You
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </td>

              {/* Carbon Saved */}
              <td className="py-4 px-4">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{user.carbonSaved}</p>
                  <p className="text-xs text-gray-500">kg CO₂</p>
                </div>
              </td>

              {/* Streak */}
              <td className="py-4 px-4">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{user.streakDays}</p>
                  <p className="text-xs text-gray-500">days</p>
                </div>
              </td>

              {/* Achievements */}
              <td className="py-4 px-4">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{user.achievements}</p>
                  <p className="text-xs text-gray-500">badges</p>
                </div>
              </td>

              {/* Trend */}
              <td className="py-4 px-4">
                <div className="flex justify-center">
                  {getTrendIcon(user.trend)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
          Load More Rankings
        </button>
      </div>
    </div>
  );
};

export default LeaderboardTable;
