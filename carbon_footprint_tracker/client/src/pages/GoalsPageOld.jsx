import { useState, useEffect } from "react";
import { Filter, Search, SortAsc, RefreshCw } from "lucide-react";
import GoalsHeader from "../components/Goals/GoalsHeader";
import GoalsStats from "../components/Goals/GoalsStats";
import GoalFormContainer from "../components/Goals/GoalFormContainer";
import CreateGoalForm from "../components/Goals/CreateGoalForm";
import GoalsList from "../components/Goals/GoalsList";
import GoalTips from "../components/Goals/GoalTips";
import goalService from "../services/goalService";
import { useAuth } from "../context/useAuth";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch goals
    const fetchGoals = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setGoals([
        {
          id: 1,
          title: "Switch to LED bulbs in all rooms",
          description: "Replace traditional bulbs with energy-efficient LED lights",
          category: "energy",
          completed: false,
          priority: "high",
          estimatedImpact: 45,
          unit: "kg CO₂/year"
        },
        {
          id: 2,
          title: "Walk or bike to work 3 times per week",
          description: "Choose eco-friendly transportation for short distances",
          category: "transportation",
          completed: false,
          priority: "high",
          estimatedImpact: 520,
          unit: "kg CO₂/year"
        },
        {
          id: 3,
          title: "Compost food scraps",
          description: "Set up home composting system",
          category: "food",
          completed: true,
          priority: "medium",
          estimatedImpact: 180,
          unit: "kg CO₂/year"
        },
        {
          id: 4,
          title: "Unplug electronics when not in use",
          description: "Reduce phantom power consumption",
          category: "energy",
          completed: false,
          priority: "medium",
          estimatedImpact: 60,
          unit: "kg CO₂/year"
        },
      ]);
      setIsLoading(false);
    };

    fetchGoals();
  }, []);

  const handleCreateGoal = (goalData) => {
    const newGoal = {
      id: goals.length + 1,
      ...goalData,
      completed: false,
    };
    setGoals([...goals, newGoal]);
    setShowCreateForm(false);
  };

  const toggleGoalCompletion = (goalId) => {
    setGoals(
      goals.map((goal) => (goal.id === goalId ? { ...goal, completed: !goal.completed } : goal))
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender/20 to-sky-blue/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-mint-green/20 border-t-mint-green mx-auto mb-4"></div>
          <p className="text-steel-blue font-medium">Loading your eco actions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-20 py-3">
      <GoalsHeader onAddGoal={() => setShowCreateForm(!showCreateForm)} />
      
      {showCreateForm && (
        <GoalFormContainer>
          <CreateGoalForm 
            onSubmit={handleCreateGoal} 
            onCancel={() => setShowCreateForm(false)} 
          />
        </GoalFormContainer>
      )}

      <GoalsStats goals={goals} />
      <GoalsList goals={goals} onToggleGoal={toggleGoalCompletion} />
      <GoalTips />
    </div>
  );
};

export default GoalsPage;
