import { Plus } from "lucide-react";

const GoalFormContainer = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-turquoise/10 rounded-lg">
          <Plus className="h-5 w-5 text-turquoise" />
        </div>
        <h2 className="text-xl font-semibold text-navy">Add New Eco Action</h2>
      </div>
      {children}
    </div>
  );
};

export default GoalFormContainer;
