import { useState } from "react";
import { 
  Check, 
  Edit3, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  Tag,
  MoreVertical,
  Target
} from "lucide-react";

const GoalCard = ({ goal, onToggle, onUpdateProgress, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [showProgressUpdate, setShowProgressUpdate] = useState(false);
  const [newProgress, setNewProgress] = useState(goal.progress || 0);

  const handleProgressUpdate = () => {
    onUpdateProgress(goal._id || goal.id, newProgress);
    setShowProgressUpdate(false);
  };

  const handleDelete = () => {
    onDelete(goal._id || goal.id);
    setShowActions(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-orange-50 text-orange-700 border-orange-200";
      case "low": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "energy": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "transportation": return "bg-ocean-blue/10 text-ocean-blue border border-ocean-blue/20";
      case "food": return "bg-mint-green/10 text-forest-green border border-mint-green/20";
      case "housing": return "bg-lavender/50 text-teal border border-lavender";
      case "shopping": return "bg-turquoise/10 text-turquoise border border-turquoise/20";
      default: return "bg-steel-blue/10 text-steel-blue border border-steel-blue/20";
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-md border-l-4 p-6 transition-all duration-200 hover:shadow-lg relative ${
        goal.isCompleted || goal.completed
          ? "border-l-mint-green bg-mint-green/5" 
          : "border-l-forest-green hover:border-l-emerald"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <button
            onClick={() => onToggle(goal._id || goal.id)}
            className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
              goal.isCompleted || goal.completed
                ? "bg-mint-green border-mint-green text-white shadow-md"
                : "border-steel-blue/30 hover:border-forest-green hover:bg-forest-green/10"
            }`}
          >
            {(goal.isCompleted || goal.completed) && (
              <Check className="w-4 h-4" />
            )}
          </button>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3
                className={`text-xl font-semibold ${
                  goal.isCompleted || goal.completed 
                    ? "line-through text-steel-blue" 
                    : "text-navy"
                }`}
              >
                {goal.title}
              </h3>
              
              {/* Actions Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-steel-blue" />
                </button>
                
                {showActions && (
                  <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[150px]">
                    <button
                      onClick={() => {
                        setShowProgressUpdate(true);
                        setShowActions(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center space-x-2 text-sm"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Update Progress</span>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full text-left px-3 py-2 hover:bg-red-50 flex items-center space-x-2 text-sm text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Goal</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-steel-blue text-sm mb-4">{goal.description}</p>

            {/* Progress Bar */}
            {(goal.progress !== undefined && goal.progress !== null) && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-steel-blue font-medium">Progress</span>
                  <span className="text-sm font-semibold text-navy">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      goal.progress === 100 
                        ? "bg-mint-green" 
                        : goal.progress >= 75 
                        ? "bg-forest-green" 
                        : goal.progress >= 50 
                        ? "bg-turquoise" 
                        : "bg-ocean-blue"
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Tags */}
            {goal.tags && goal.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-steel-blue" />
                <div className="flex flex-wrap gap-1">
                  {goal.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-sky-blue/10 text-steel-blue rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center flex-wrap gap-3">
              {/* Category */}
              <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getCategoryColor(goal.category)}`}>
                {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
              </span>

              {/* Priority */}
              <span className={`text-xs px-3 py-1.5 rounded-full font-medium border ${getPriorityColor(goal.priority)}`}>
                {goal.priority} priority
              </span>

              {/* Impact */}
              <div className="flex items-center space-x-1 bg-emerald/10 text-emerald px-3 py-1.5 rounded-full border border-emerald/20">
                <Target className="w-3 h-3" />
                <span className="text-xs font-semibold">
                  {goal.estimatedImpact} {goal.unit || "kg CO₂/year"} saved
                </span>
              </div>

              {/* Target Date */}
              {goal.targetDate && (
                <div className="flex items-center space-x-1 bg-lavender/20 text-navy px-3 py-1.5 rounded-full border border-lavender/30">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs font-semibold">
                    {formatDate(goal.targetDate)}
                  </span>
                </div>
              )}
            </div>

            {/* Notes */}
            {goal.notes && (
              <div className="mt-3 p-3 bg-sky-blue/5 rounded-lg border border-sky-blue/10">
                <p className="text-sm text-steel-blue italic">
                  "{goal.notes}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Update Modal */}
      {showProgressUpdate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-navy mb-4">Update Progress</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-steel-blue mb-2">
                Progress: {newProgress}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={newProgress}
                onChange={(e) => setNewProgress(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-steel-blue mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowProgressUpdate(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-steel-blue hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProgressUpdate}
                className="flex-1 px-4 py-2 bg-mint-green text-white rounded-lg hover:bg-forest-green transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
