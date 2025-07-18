import api from '../lib/api.js';

class GoalService {
  constructor() {
    this.api = api;
  }

  // Get all goals with optional filtering
  async getAllGoals(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await this.api.get(`/goals?${params.toString()}`);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Create new goal
  async createGoal(goalData) {
    try {
      const response = await this.api.post('/goals', goalData);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Get goal statistics
  async getStats() {
    try {
      const response = await this.api.get('/goals/stats');
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Get specific goal
  async getGoal(goalId) {
    try {
      const response = await this.api.get(`/goals/${goalId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Update goal
  async updateGoal(goalId, updateData) {
    try {
      const response = await this.api.put(`/goals/${goalId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Complete goal
  async completeGoal(goalId) {
    try {
      const response = await this.api.patch(`/goals/${goalId}/complete`);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Update progress
  async updateProgress(goalId, progress) {
    try {
      const response = await this.api.patch(`/goals/${goalId}/progress`, { progress });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Delete goal
  async deleteGoal(goalId) {
    try {
      const response = await this.api.delete(`/goals/${goalId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Handle errors consistently
  handleError(error) {
    console.error('Goal service error:', error);
    
    if (error.response) {
      return { 
        success: false, 
        error: error.response.data.message || 'Server error',
        status: error.response.status 
      };
    } else if (error.request) {
      return { 
        success: false, 
        error: 'Network error. Please check your connection.' 
      };
    } else {
      return { 
        success: false, 
        error: 'An unexpected error occurred.' 
      };
    }
  }
}

// Create singleton instance
const goalService = new GoalService();
export default goalService;

// Export individual functions for easier importing
export const {
  getAllGoals,
  createGoal,
  getStats,
  getGoal,
  updateGoal,
  completeGoal,
  updateProgress,
  deleteGoal
} = goalService;
