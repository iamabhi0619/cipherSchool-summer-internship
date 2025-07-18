import GoalCard from "./GoalCard";

const GoalsList = ({ goals, onToggleGoal, onUpdateProgress, onDeleteGoal }) => {
  if (goals.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-sky-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-semibold text-navy mb-2">No goals found</h3>
          <p className="text-steel-blue mb-6">
            Start creating eco-friendly goals to reduce your carbon footprint and make a positive impact on the environment.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-mint-green hover:bg-forest-green text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Create Your First Goal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard 
          key={goal._id || goal.id} 
          goal={goal} 
          onToggle={onToggleGoal}
          onUpdateProgress={onUpdateProgress}
          onDelete={onDeleteGoal}
        />
      ))}
    </div>
  );
};

export default GoalsList;
