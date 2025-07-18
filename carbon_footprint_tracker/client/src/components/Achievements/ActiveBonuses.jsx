import { Zap, TrendingUp, Clock, Info } from "lucide-react";

const ActiveBonuses = ({ activeBonuses = [] }) => {
  const getBonusIcon = (type) => {
    switch (type) {
      case 'point_multiplier': return '✨';
      case 'streak_protection': return '🛡️';
      case 'daily_double': return '⚡';
      case 'achievement_boost': return '🚀';
      case 'activity_bonus': return '💪';
      default: return '🎯';
    }
  };

  const getBonusColor = (type) => {
    switch (type) {
      case 'point_multiplier': return '#FFD700';
      case 'streak_protection': return '#4CAF50';
      case 'daily_double': return '#FF9800';
      case 'achievement_boost': return '#9C27B0';
      case 'activity_bonus': return '#2196F3';
      default: return '#6B7280';
    }
  };

  const formatTimeRemaining = (expiresAt) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffMs = expiry - now;
    
    if (diffMs <= 0) return 'Expired';
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 24) {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ${diffHours % 24}h`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return `${diffMinutes}m`;
    }
  };

  const getProgressPercentage = (activatedAt, expiresAt) => {
    const now = new Date();
    const start = new Date(activatedAt);
    const end = new Date(expiresAt);
    
    const total = end - start;
    const elapsed = now - start;
    
    return Math.max(0, Math.min(100, (elapsed / total) * 100));
  };

  if (activeBonuses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-navy">Active Bonuses</h2>
        </div>
        
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-steel-blue opacity-50" />
          </div>
          <p className="text-steel-blue">No active bonuses</p>
          <p className="text-sm text-steel-blue mt-1">
            Complete achievements to unlock powerful bonuses!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-navy">Active Bonuses</h2>
        </div>
        <span className="text-sm text-steel-blue">
          {activeBonuses.length} active
        </span>
      </div>

      <div className="space-y-4">
        {activeBonuses.map((bonus, index) => {
          const timeRemaining = formatTimeRemaining(bonus.expiresAt);
          const progress = getProgressPercentage(bonus.activatedAt, bonus.expiresAt);
          const bonusColor = getBonusColor(bonus.type);
          const isExpiringSoon = timeRemaining.includes('m') && !timeRemaining.includes('h') && !timeRemaining.includes('d');
          
          return (
            <div key={bonus.id || index} className="relative overflow-hidden">
              <div 
                className="p-4 rounded-xl border-l-4 bg-gradient-to-r from-white to-gray-50"
                style={{ borderLeftColor: bonusColor }}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: `${bonusColor}20` }}
                  >
                    {getBonusIcon(bonus.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-navy">
                        {bonus.title || bonus.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {isExpiringSoon && (
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                        <Clock className="w-3 h-3 text-steel-blue" />
                        <span className={`text-xs font-medium ${isExpiringSoon ? 'text-red-500' : 'text-steel-blue'}`}>
                          {timeRemaining}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-steel-blue mb-3">
                      {bonus.description || `${bonus.type} bonus is currently active`}
                    </p>
                    
                    {/* Bonus Effect */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-navy">Effect:</span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full text-white font-medium"
                          style={{ backgroundColor: bonusColor }}
                        >
                          {bonus.effect || `${bonus.multiplier || '2'}x multiplier`}
                        </span>
                      </div>
                      
                      {bonus.usesRemaining !== undefined && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-steel-blue">Uses left:</span>
                          <span className="text-xs font-semibold text-navy">{bonus.usesRemaining}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${100 - progress}%`,
                            backgroundColor: bonusColor
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Source */}
                    {bonus.source && (
                      <div className="flex items-center space-x-1">
                        <Info className="w-3 h-3 text-steel-blue" />
                        <span className="text-xs text-steel-blue">
                          From: {bonus.source}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Animated gradient overlay for active effect */}
              <div 
                className="absolute inset-0 opacity-10 animate-pulse"
                style={{
                  background: `linear-gradient(90deg, transparent, ${bonusColor}, transparent)`,
                  animation: 'shimmer 3s ease-in-out infinite'
                }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Total Bonus Summary */}
      {activeBonuses.length > 1 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-navy mb-2">Combined Effect</h4>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-mint-green" />
                <span className="text-sm text-steel-blue">Total Multiplier:</span>
                <span className="text-sm font-bold text-mint-green">
                  {activeBonuses.reduce((acc, bonus) => acc * (bonus.multiplier || 1), 1).toFixed(1)}x
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expiring Soon Warning */}
      {activeBonuses.some(bonus => {
        const timeStr = formatTimeRemaining(bonus.expiresAt);
        return timeStr.includes('m') && !timeStr.includes('h') && !timeStr.includes('d');
      }) && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-yellow-800 font-medium">
              Some bonuses are expiring soon!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Add custom CSS for shimmer animation
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

// Inject the keyframes into the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
}

export default ActiveBonuses;
