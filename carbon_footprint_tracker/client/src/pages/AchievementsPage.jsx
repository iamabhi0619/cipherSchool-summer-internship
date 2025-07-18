import { useState } from "react";
import { Trophy, Medal, Users } from "lucide-react";
import AchievementGrid from "../components/Achievements/AchievementGrid";
import AchievementLeaderboard from "../components/Achievements/AchievementLeaderboard";
import OverviewCard from "../components/Achievements/OverviewCard";

const AchievementsPage = () => {
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 px-20 py-3">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          <div className="flex justify-between items-center">
            <p className="font-medium">{error}</p>
            <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
              ×
            </button>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-forest-green rounded-xl">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-navy">Achievements</h1>
            </div>
            <p className="text-steel-blue">
              Track your progress and unlock rewards for your eco-friendly actions
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-2">
        <div className="flex space-x-1">
          {[
            { id: "overview", label: "Overview", icon: <Trophy className="w-4 h-4" /> },
            { id: "browse", label: "Browse All", icon: <Medal className="w-4 h-4" /> },
            { id: "leaderboard", label: "Leaderboard", icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-forest-green text-white shadow-sm"
                  : "text-steel-blue hover:text-navy cursor-pointer hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <OverviewCard />
        </div>
      )}

      {activeTab === "browse" && (
        <div className="space-y-6">
          <AchievementGrid
          />
        </div>
      )}

      {activeTab === "leaderboard" && <AchievementLeaderboard />}
    </div>
  );
};

export default AchievementsPage;
