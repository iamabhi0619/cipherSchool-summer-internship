const GoalModeSelector = ({ isCustom, onModeChange }) => {
  return (
    <div className="border-b border-lavender/30 pb-6">
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => onModeChange(true)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            isCustom 
              ? "bg-ocean-blue text-white shadow-md" 
              : "bg-lavender/20 text-steel-blue hover:bg-lavender/30"
          }`}
        >
          Create Custom Goal
        </button>
        <button
          type="button"
          onClick={() => onModeChange(false)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            !isCustom 
              ? "bg-ocean-blue text-white shadow-md" 
              : "bg-lavender/20 text-steel-blue hover:bg-lavender/30"
          }`}
        >
          Choose From Library
        </button>
      </div>
    </div>
  );
};

export default GoalModeSelector;
