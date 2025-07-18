import { useState, useEffect } from "react";
import { Filter, Search, SortAsc, RefreshCw } from "lucide-react";
import GoalsHeader from "../components/Goals/GoalsHeader";
import GoalsStats from "../components/Goals/GoalsStats";
import GoalFormContainer from "../components/Goals/GoalFormContainer";
import CreateGoalForm from "../components/Goals/CreateGoalForm";
import GoalsList from "../components/Goals/GoalsList";
import GoalTips from "../components/Goals/GoalTips";
import goalService from "../services/goalService";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [goalStats, setGoalStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  // Fetch goals from API
  const fetchGoals = async (filters = {}) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await goalService.getAllGoals(filters);
      
      if (response.success) {
        setGoals(response.data.goals || []);
      } else {
        setError(response.error);
        // Fallback to mock data if API fails
        setGoals([
          {
            _id: "1",
            title: "Switch to LED bulbs in all rooms",
            description: "Replace traditional bulbs with energy-efficient LED lights",
            category: "energy",
            isCompleted: false,
            priority: "high",
            estimatedImpact: 45,
            unit: "kg CO₂/year",
            progress: 25,
            tags: ["energy-saving", "home-improvement"]
          },
          {
            _id: "2",
            title: "Walk or bike to work 3 times per week",
            description: "Choose eco-friendly transportation for short distances",
            category: "transportation",
            isCompleted: false,
            priority: "high",
            estimatedImpact: 520,
            unit: "kg CO₂/year",
            progress: 60,
            tags: ["transportation", "health"]
          },
          {
            _id: "3",
            title: "Compost food scraps",
            description: "Set up home composting system",
            category: "food",
            isCompleted: true,
            priority: "medium",
            estimatedImpact: 180,
            unit: "kg CO₂/year",
            progress: 100,
            tags: ["waste-reduction", "gardening"]
          },
          {
            _id: "4",
            title: "Unplug electronics when not in use",
            description: "Reduce phantom power consumption",
            category: "energy",
            isCompleted: false,
            priority: "medium",
            estimatedImpact: 60,
            unit: "kg CO₂/year",
            progress: 40,
            tags: ["energy-saving", "electronics"]
          }
        ]);
      }
    } catch (err) {
      setError("Failed to fetch goals. Please try again.");
      console.error("Fetch goals error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch goal statistics
  const fetchGoalStats = async () => {
    try {
      const response = await goalService.getStats();
      
      if (response.success) {
        setGoalStats(response.data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch goal stats:", err);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchGoals();
    fetchGoalStats();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    const filters = {};
    if (categoryFilter) filters.category = categoryFilter;
    if (statusFilter) filters.status = statusFilter;
    if (priorityFilter) filters.priority = priorityFilter;
    
    fetchGoals(filters);
  }, [categoryFilter, statusFilter, priorityFilter]);

  // Handle creating a new goal
  const handleCreateGoal = async (goalData) => {
    try {
      const response = await goalService.createGoal(goalData);
      
      if (response.success) {
        setNotification("Goal created successfully!");
        setShowCreateForm(false);
        await fetchGoals();
        await fetchGoalStats();
        setTimeout(() => setNotification(""), 3000);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to create goal. Please try again.");
      console.error("Create goal error:", err);
    }
  };

  // Handle completing a goal
  const handleCompleteGoal = async (goalId) => {
    try {
      const response = await goalService.completeGoal(goalId);
      
      if (response.success) {
        setNotification("Goal completed! Great job! 🎉");
        await fetchGoals();
        await fetchGoalStats();
        setTimeout(() => setNotification(""), 3000);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to complete goal. Please try again.");
      console.error("Complete goal error:", err);
    }
  };

  // Handle updating goal progress
  const handleUpdateProgress = async (goalId, progress) => {
    try {
      const response = await goalService.updateProgress(goalId, progress);
      
      if (response.success) {
        setNotification("Progress updated!");
        await fetchGoals();
        await fetchGoalStats();
        setTimeout(() => setNotification(""), 2000);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to update progress. Please try again.");
      console.error("Update progress error:", err);
    }
  };

  // Handle deleting a goal
  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) {
      return;
    }

    try {
      const response = await goalService.deleteGoal(goalId);
      
      if (response.success) {
        setNotification("Goal deleted successfully");
        await fetchGoals();
        await fetchGoalStats();
        setTimeout(() => setNotification(""), 3000);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to delete goal. Please try again.");
      console.error("Delete goal error:", err);
    }
  };

  // Filter and sort goals
  const filteredAndSortedGoals = goals
    .filter(goal => 
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Refresh all data
  const handleRefresh = () => {
    fetchGoals();
    fetchGoalStats();
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
      {/* Notification Banner */}
      {notification && (
        <div className="bg-mint-green/20 border border-mint-green/30 text-forest-green px-4 py-3 rounded-xl mb-4">
          <p className="font-medium">{notification}</p>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          <div className="flex justify-between items-center">
            <p className="font-medium">{error}</p>
            <button
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <GoalsHeader onAddGoal={() => setShowCreateForm(!showCreateForm)} />
      
      {/* Create Goal Form */}
      {showCreateForm && (
        <GoalFormContainer>
          <CreateGoalForm 
            onSubmit={handleCreateGoal} 
            onCancel={() => setShowCreateForm(false)} 
          />
        </GoalFormContainer>
      )}

      {/* Statistics */}
      <GoalsStats goals={goals} stats={goalStats} />

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-steel-blue" />
              <input
                type="text"
                placeholder="Search goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-sky-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green/50 focus:border-mint-green"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-sky-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green/50 focus:border-mint-green text-sm"
            >
              <option value="">All Categories</option>
              <option value="energy">Energy</option>
              <option value="transportation">Transportation</option>
              <option value="food">Food</option>
              <option value="housing">Housing</option>
              <option value="shopping">Shopping</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-sky-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green/50 focus:border-mint-green text-sm"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-sky-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green/50 focus:border-mint-green text-sm"
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Sort Options */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-3 py-2 border border-sky-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green/50 focus:border-mint-green text-sm"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="priority-desc">High Priority First</option>
              <option value="estimatedImpact-desc">Highest Impact First</option>
              <option value="progress-desc">Most Progress First</option>
              <option value="title-asc">A-Z</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-1 px-3 py-2 bg-ocean-blue/10 text-ocean-blue rounded-lg hover:bg-ocean-blue/20 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(categoryFilter || statusFilter || priorityFilter || searchTerm) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-steel-blue font-medium">Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-mint-green/20 text-forest-green rounded-md text-xs">
                Search: "{searchTerm}"
              </span>
            )}
            {categoryFilter && (
              <span className="px-2 py-1 bg-ocean-blue/20 text-ocean-blue rounded-md text-xs">
                Category: {categoryFilter}
              </span>
            )}
            {statusFilter && (
              <span className="px-2 py-1 bg-turquoise/20 text-turquoise rounded-md text-xs">
                Status: {statusFilter}
              </span>
            )}
            {priorityFilter && (
              <span className="px-2 py-1 bg-lavender/20 text-navy rounded-md text-xs">
                Priority: {priorityFilter}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
                setStatusFilter("");
                setPriorityFilter("");
              }}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs hover:bg-gray-200 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Goals List */}
      <GoalsList 
        goals={filteredAndSortedGoals} 
        onToggleGoal={handleCompleteGoal}
        onUpdateProgress={handleUpdateProgress}
        onDeleteGoal={handleDeleteGoal}
      />

      {/* Goal Tips */}
      <GoalTips />
    </div>
  );
};

export default GoalsPage;
