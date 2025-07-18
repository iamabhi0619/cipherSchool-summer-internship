import { useState } from "react";
import { predefinedGoals, getGoalsByCategory, getAllCategories } from "../../data/predefinedGoals";
import GoalPreview from "./GoalPreview";
import { Calendar, Tag, FileText } from "lucide-react";

const CreateGoalForm = ({ onSubmit, onCancel }) => {
  const [mode, setMode] = useState("predefined"); // "predefined" or "custom"
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "energy",
    priority: "medium",
    estimatedImpact: "",
    unit: "kg CO₂/year",
    targetDate: "",
    tags: "",
    notes: ""
  });
  const [selectedPredefinedGoal, setSelectedPredefinedGoal] = useState("");

  const handlePredefinedGoalSelect = (goalId) => {
    if (goalId) {
      const goal = predefinedGoals.find(g => g.id === goalId);
      if (goal) {
        setFormData({
          ...formData,
          title: goal.title,
          description: goal.description,
          category: goal.category,
          priority: goal.priority,
          estimatedImpact: goal.estimatedImpact,
          unit: goal.unit
        });
      }
    } else {
      setFormData({ 
        ...formData,
        title: "",
        description: "",
        priority: "medium",
        estimatedImpact: "",
        unit: "kg CO₂/year"
      });
    }
    setSelectedPredefinedGoal(goalId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const goalData = {
      ...formData,
      estimatedImpact: parseFloat(formData.estimatedImpact) || 0,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      targetDate: formData.targetDate || null
    };

    onSubmit(goalData);
  };

  const filteredGoals = getGoalsByCategory(formData.category);
  const selectedGoal = selectedPredefinedGoal ? predefinedGoals.find(g => g.id === selectedPredefinedGoal) : null;

  const isFormValid = mode === "predefined" 
    ? selectedPredefinedGoal 
    : formData.title && formData.description && formData.estimatedImpact;

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          type="button"
          onClick={() => setMode("predefined")}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            mode === "predefined"
              ? "bg-white text-navy shadow-sm"
              : "text-steel-blue hover:text-navy"
          }`}
        >
          Choose Predefined Goal
        </button>
        <button
          type="button"
          onClick={() => setMode("custom")}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            mode === "custom"
              ? "bg-white text-navy shadow-sm"
              : "text-steel-blue hover:text-navy"
          }`}
        >
          Create Custom Goal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-navy mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => {
              handleInputChange(e);
              setSelectedPredefinedGoal("");
            }}
            className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise bg-white text-navy"
          >
            {getAllCategories().map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {mode === "predefined" ? (
          <>
            {/* Predefined Goal Selection */}
            <div>
              <label htmlFor="predefinedGoal" className="block text-sm font-semibold text-navy mb-2">
                Choose from {formData.category} goals ({filteredGoals.length} available) *
              </label>
              <select
                id="predefinedGoal"
                value={selectedPredefinedGoal}
                onChange={(e) => handlePredefinedGoalSelect(e.target.value)}
                className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise bg-white text-navy"
                required
              >
                <option value="">Select a goal...</option>
                {filteredGoals.map(goal => (
                  <option key={goal.id} value={goal.id}>
                    {goal.title} ({goal.estimatedImpact} {goal.unit})
                  </option>
                ))}
              </select>
            </div>

            {/* Goal Preview */}
            {selectedGoal && <GoalPreview goal={selectedGoal} />}
          </>
        ) : (
          <>
            {/* Custom Goal Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-semibold text-navy mb-2">
                  Goal Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Switch to LED bulbs"
                  className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise"
                  maxLength="200"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-semibold text-navy mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your goal and how you plan to achieve it..."
                  rows="3"
                  className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise resize-none"
                  maxLength="500"
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-semibold text-navy mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise bg-white text-navy"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Estimated Impact */}
              <div>
                <label htmlFor="estimatedImpact" className="block text-sm font-semibold text-navy mb-2">
                  Estimated Impact *
                </label>
                <input
                  type="number"
                  id="estimatedImpact"
                  name="estimatedImpact"
                  value={formData.estimatedImpact}
                  onChange={handleInputChange}
                  placeholder="120"
                  className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise"
                  min="0"
                  step="0.1"
                  required
                />
              </div>

              {/* Unit */}
              <div>
                <label htmlFor="unit" className="block text-sm font-semibold text-navy mb-2">
                  Unit
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise bg-white text-navy"
                >
                  <option value="kg CO₂/year">kg CO₂/year</option>
                  <option value="kg CO₂/month">kg CO₂/month</option>
                  <option value="kg CO₂/week">kg CO₂/week</option>
                  <option value="kg CO₂/day">kg CO₂/day</option>
                  <option value="kg CO₂/trip">kg CO₂/trip</option>
                  <option value="kg CO₂/event">kg CO₂/event</option>
                </select>
              </div>

              {/* Target Date */}
              <div>
                <label htmlFor="targetDate" className="block text-sm font-semibold text-navy mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Target Date (Optional)
                </label>
                <input
                  type="date"
                  id="targetDate"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise"
                />
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <label htmlFor="tags" className="block text-sm font-semibold text-navy mb-2">
                  <Tag className="inline w-4 h-4 mr-1" />
                  Tags (Optional)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="energy-saving, home-improvement, urgent (comma-separated)"
                  className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise"
                />
                <p className="text-xs text-steel-blue mt-1">Separate tags with commas</p>
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-semibold text-navy mb-2">
                  <FileText className="inline w-4 h-4 mr-1" />
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional details, steps, or reminders..."
                  rows="3"
                  className="w-full px-4 py-3 border border-sky-blue/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise resize-none"
                  maxLength="1000"
                />
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-steel-blue/30 text-steel-blue rounded-xl hover:bg-steel-blue/5 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-forest-green text-white rounded-xl hover:bg-emerald transition-all duration-200 shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isFormValid}
          >
            Create Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGoalForm;
