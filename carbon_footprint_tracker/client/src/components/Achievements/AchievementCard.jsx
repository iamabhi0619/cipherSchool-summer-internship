import { Lock, CheckCircle, TrendingUp } from "lucide-react";

const AchievementCard = ({ achievement, userProgress = null, isUnlocked = false }) => {
  // Use userProgress from achievement if not passed as prop
  const effectiveUserProgress = userProgress || achievement.userProgress || null;
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return '#FFD700';
      case 'epic': return '#9C27B0';
      case 'rare': return '#2196F3';
      case 'common': 
      default: return '#4CAF50';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'legendary': return '👑';
      case 'hard': return '🔥';
      case 'medium': return '⭐';
      case 'easy': 
      default: return '🌟';
    }
  };

  const progress = effectiveUserProgress?.progress || { current: 0, target: 1, percentage: 0 };
  const unlocked = isUnlocked || effectiveUserProgress?.isUnlocked || false;

  return (
    <div 
      className={`
        bg-white rounded-2xl shadow-md border-l-4 p-6 transition-all duration-200 hover:shadow-lg
        ${unlocked 
          ? "border-l-mint-green bg-mint-green/5" 
          : "border-l-steel-blue/30 hover:border-l-mint-green"
        }
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${getRarityColor(achievement.rarity)}20` }}
          >
            {achievement.icon}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`text-lg font-semibold ${unlocked ? 'text-navy' : 'text-steel-blue'}`}>
                {achievement.title}
              </h3>
              {unlocked && <CheckCircle className="w-5 h-5 text-mint-green" />}
              {!unlocked && progress.percentage > 0 && <TrendingUp className="w-4 h-4 text-turquoise" />}
              {!unlocked && progress.percentage === 0 && <Lock className="w-4 h-4 text-steel-blue" />}
            </div>
            
            <p className="text-steel-blue text-sm mb-3">{achievement.description}</p>
            
            {/* Progress Bar */}
            {!unlocked && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-steel-blue">Progress</span>
                  <span className="text-xs font-semibold text-navy">
                    {progress.current} / {progress.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300 bg-turquoise"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Unlocked Date */}
            {unlocked && userProgress?.unlockedAt && (
              <p className="text-xs text-mint-green font-medium mb-3">
                ✅ Unlocked on {new Date(userProgress.unlockedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Category */}
          <span className="text-xs px-2 py-1 bg-sky-blue/10 text-ocean-blue rounded-md font-medium">
            {achievement.category?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          
          {/* Rarity */}
          <span 
            className="text-xs px-2 py-1 rounded-md capitalize font-medium text-white"
            style={{ backgroundColor: getRarityColor(achievement.rarity) }}
          >
            {achievement.rarity}
          </span>
          
          {/* Difficulty */}
          <span className="text-xs px-2 py-1 bg-gray-100 capitalize text-gray-700 rounded-md font-medium">
            {getDifficultyIcon(achievement.difficulty)} {achievement.difficulty}
          </span>
        </div>

        {/* Points */}
        <div className="flex items-center space-x-1">
          <span className="text-lg">💎</span>
          <span className="text-sm font-bold text-navy">{achievement.points}</span>
        </div>
      </div>

      {/* Unlock Message */}
      {unlocked && achievement.unlockMessage && (
        <div className="mt-3 p-3 bg-mint-green/10 rounded-lg border border-mint-green/20">
          <p className="text-sm text-forest-green italic">
            "{achievement.unlockMessage}"
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
