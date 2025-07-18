import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Calendar, Target, TrendingUp, CheckCircle } from 'lucide-react';

const GoalTracker = ({ goal }) => {
  const progressPercentage = Math.min(100, (goal.currentValue / goal.targetValue) * 100);
  const isCompleted = progressPercentage >= 100;
  const daysUntilDeadline = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntilDeadline < 0;

  const getCategoryColor = (category) => {
    const colors = {
      overall: 'bg-blue-100 text-blue-800',
      transportation: 'bg-red-100 text-red-800',
      energy: 'bg-yellow-100 text-yellow-800',
      food: 'bg-green-100 text-green-800',
      housing: 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = () => {
    if (isCompleted) return '#16a34a'; // green
    if (isOverdue) return '#dc2626'; // red
    if (progressPercentage > 75) return '#f59e0b'; // yellow
    return '#3b82f6'; // blue
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
            {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
              {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
            </span>
            
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                {isOverdue ? `Overdue by ${Math.abs(daysUntilDeadline)} days` : `${daysUntilDeadline} days left`}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="w-16 h-16 ml-4">
          <CircularProgressbar
            value={progressPercentage}
            text={`${Math.round(progressPercentage)}%`}
            styles={buildStyles({
              textColor: getStatusColor(),
              pathColor: getStatusColor(),
              trailColor: '#f3f4f6',
              textSize: '20px'
            })}
          />
        </div>
      </div>

      {/* Progress Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Target</p>
            <p className="font-semibold text-gray-900">{goal.targetValue} {goal.unit}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Current</p>
            <p className="font-semibold text-gray-900">{goal.currentValue} {goal.unit}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Deadline</p>
            <p className="font-semibold text-gray-900">
              {new Date(goal.deadline).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.min(100, progressPercentage)}%`,
              backgroundColor: getStatusColor()
            }}
          ></div>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: `${getStatusColor()}10` }}>
        <p className="text-sm" style={{ color: getStatusColor() }}>
          {isCompleted 
            ? '🎉 Congratulations! Goal completed!'
            : isOverdue 
            ? '⚠️ This goal is overdue. Consider adjusting the timeline.'
            : progressPercentage > 75
            ? '🚀 Great progress! You\'re almost there!'
            : '💪 Keep going! Every step counts toward your goal.'
          }
        </p>
      </div>
    </div>
  );
};

export default GoalTracker;
