import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityForm from "../components/ActivityForm";
import { Plus, Save, ArrowLeft, Leaf, Target, Calendar, FileText, Search } from "lucide-react";
import QuickStats from "../components/Activity/QuickStats";
import CategoryCard from "../components/Activity/CategoryCard";
import TipsSection from "../components/Activity/TipsSection";
import { toast } from "sonner";
import api from "../lib/api";

const ActivityFormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleActivitySubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      // Prepare API payload
      const payload = {
        category: formData.category,
        type: formData.type,
        amount: parseFloat(formData.amount),
        unit: formData.unit,
        date: formData.date || new Date().toISOString().split("T")[0],
        ...(formData.description && { description: formData.description }),
      };

      const response = await api.post("/activities", payload);

      toast.success(response.data.message || "Activity logged successfully!");
      // Navigate back to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log activity. Please try again.");
      console.error("Error logging activity:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-lavender p-4 w-full">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-sky-blue/30 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-forest-green rounded-2xl shadow-md">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-navy mb-1">Log New Activity</h1>
                <p className="text-steel-blue">
                  Track your carbon-emitting activities to monitor your environmental impact
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-3 text-steel-blue hover:text-navy transition-all duration-200 bg-lavender px-6 py-3 rounded-xl hover:bg-sky-blue/20 shadow-sm hover:shadow-md cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* Activity Form - Takes 2 columns */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white rounded-2xl shadow-lg border border-lavender/50 p-8 h-full">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-emerald rounded-xl shadow-md">
                  <Save className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-navy">Activity Details</h2>
              </div>

              <ActivityForm onSubmit={handleActivitySubmit} isSubmitting={isSubmitting} />
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4 h-full">
            {/* Quick Stats */}
            <QuickStats />
            <CategoryCard />
            {/* Activity Categories */}
          </div>
        </div>

        {/* Tips Section */}
        <TipsSection />
      </div>
    </div>
  );
};

export default ActivityFormPage;
