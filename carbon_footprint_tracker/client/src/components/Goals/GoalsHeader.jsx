import { Target, Plus } from "lucide-react";

const GoalsHeader = ({ onAddGoal }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-mint-green rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-navy">Eco Action Goals</h1>
          </div>
          <p className="text-steel-blue">
            Complete these eco-friendly actions to reduce your carbon footprint
          </p>
        </div>

        <button
          onClick={onAddGoal}
          className="flex items-center space-x-2 bg-forest-green hover:bg-emerald text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add Action</span>
        </button>
      </div>
    </div>
  );
};

export default GoalsHeader;
