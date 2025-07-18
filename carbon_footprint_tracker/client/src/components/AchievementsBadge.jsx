import { Trophy, Award, Star, Target, Zap, Users, Lock } from 'lucide-react';

const AchievementsBadge = ({ achievement }) => {
  const getIcon = (iconName) => {
    const icons = {
      trophy: Trophy,
      award: Award,
      star: Star,
      target: Target,
      zap: Zap,
      users: Users
    };
    return icons[iconName] || Trophy;
  };

  const getRarityStyles = (rarity) => {
    const styles = {
      common: {
        border: 'border-gray-300',
        bg: 'bg-gray-50',
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-600',
        textColor: 'text-gray-700'
      },
      uncommon: {
        border: 'border-green-300',
        bg: 'bg-green-50',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        textColor: 'text-green-700'
      },
      rare: {
        border: 'border-blue-300',
        bg: 'bg-blue-50',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        textColor: 'text-blue-700'
      },
      epic: {
        border: 'border-purple-300',
        bg: 'bg-purple-50',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        textColor: 'text-purple-700'
      },
      legendary: {
        border: 'border-yellow-300',
        bg: 'bg-yellow-50',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        textColor: 'text-yellow-700'
      }
    };
    return styles[rarity] || styles.common;
  };

  const IconComponent = getIcon(achievement.icon);
  const styles = getRarityStyles(achievement.rarity);
  const progressPercentage = achievement.progress ? (achievement.progress / achievement.maxProgress) * 100 : 0;

  return (
    <div className={`relative rounded-lg border-2 p-4 transition-all duration-300 hover:shadow-md ${
      achievement.unlocked 
        ? `${styles.border} ${styles.bg}`
        : 'border-gray-200 bg-gray-50 opacity-60'
    }`}>
      {/* Locked Overlay */}
      {!achievement.unlocked && (
        <div className="absolute top-2 right-2">
          <Lock className="h-4 w-4 text-gray-400" />
        </div>
      )}

      {/* Achievement Icon */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
        achievement.unlocked ? styles.iconBg : 'bg-gray-100'
      }`}>
        <IconComponent className={`h-6 w-6 ${
          achievement.unlocked ? styles.iconColor : 'text-gray-400'
        }`} />
      </div>

      {/* Achievement Title */}
      <h3 className={`text-center font-semibold mb-1 ${
        achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
      }`}>
        {achievement.title}
      </h3>

      {/* Achievement Description */}
      <p className={`text-xs text-center mb-3 ${
        achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
      }`}>
        {achievement.description}
      </p>

      {/* Progress Bar (for locked achievements) */}
      {!achievement.unlocked && achievement.progress !== undefined && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{achievement.progress}/{achievement.maxProgress}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Achievement Points and Rarity */}
      <div className="flex items-center justify-between">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          achievement.unlocked ? styles.textColor : 'text-gray-500'
        } ${achievement.unlocked ? styles.iconBg : 'bg-gray-100'}`}>
          {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
        </div>
        
        <div className="flex items-center space-x-1">
          <Star className={`h-3 w-3 ${
            achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'
          }`} />
          <span className={`text-xs font-medium ${
            achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {achievement.points}
          </span>
        </div>
      </div>

      {/* Unlocked Date */}
      {achievement.unlocked && achievement.unlockedAt && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Shine Effect for Unlocked Achievements */}
      {achievement.unlocked && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300 transform -skew-x-12"></div>
      )}
    </div>
  );
};

export default AchievementsBadge;
