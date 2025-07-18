import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import InsightsCard from "../components/Dashboard/InsightsCard";

import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardStats from "../components/Dashboard/DashboardStats";
import MonthlyProgress from "../components/Dashboard/MonthlyProgress";
import WeeklyTrend from "../components/Dashboard/WeeklyTrend";
import CategoryBreakdown from "../components/Dashboard/CategoryBreakdown";
import RecentActivities from "../components/Dashboard/RecentActivities";
import CarbonFootprintScore from "../components/Dashboard/CarbonFootprintScore";
import EnvironmentalImpact from "../components/Dashboard/EnvironmentalImpact";
import QuickActions from "../components/Dashboard/QuickActions";
import PerformanceAnalytics from "../components/Dashboard/PerformanceAnalytics";
import DetailedAnalysis from "../components/Dashboard/DetailedAnalysis";
import api from "../lib/api";
import { toast } from "sonner";

const DashboardPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/users/dashboard");
        setDashboardData(response.data.data);
      } catch (error) {
        toast.error("Failed to load dashboard data. Please try again later.");
        console.error("Error fetching dashboard data:", error);
        setDashboardData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-lavender flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-forest-green border-t-transparent mx-auto mb-4"></div>
          <p className="text-navy font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lavender p-4 w-full space-y-6">
      <DashboardHeader user={user} dashboardData={dashboardData} />

      <DashboardStats dashboardData={dashboardData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* <MonthlyProgress dashboardData={dashboardData} /> */}
          <WeeklyTrend dashboardData={dashboardData} />
        </div>

        <div className="space-y-6 flex flex-col justify-between">
          <CategoryBreakdown dashboardData={dashboardData} />
          <RecentActivities dashboardData={dashboardData} />
          <InsightsCard insights={dashboardData?.insights} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CarbonFootprintScore dashboardData={dashboardData} />
        <EnvironmentalImpact dashboardData={dashboardData} />
        <QuickActions />
      </div>

      <PerformanceAnalytics dashboardData={dashboardData} />

      <DetailedAnalysis dashboardData={dashboardData} />
    </div>
  );
};

export default DashboardPage;
