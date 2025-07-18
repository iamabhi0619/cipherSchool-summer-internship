import { useState, useEffect } from "react";
import AchievementCard from "./AchievementCard";
import { Grid, List } from "lucide-react";
import api from "../../lib/api";

const AchievementGrid = () => {
  const [achievements, setAchievements] = useState([]);
  const [groupedByCategory, setGroupedByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("points");
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await api.get("/achievements/all");
        const data = res.data?.data || {};
        setAchievements(data.achievements || []);
        setGroupedByCategory(data.groupedByCategory || {});
        setCategories(data.categories || []);
        setTotalCount(data.totalCount || 0);
        setActiveCategory((data.categories && data.categories[0]) || "");
      } catch {
        setAchievements([]);
        setGroupedByCategory({});
        setCategories([]);
        setTotalCount(0);
        setError("Failed to load achievements.");
      }
      setIsLoading(false);
    };
    fetchAchievements();
  }, []);

  // Get achievements for active category
  const categoryAchievements = activeCategory
    ? groupedByCategory[activeCategory] || []
    : achievements;

  const sortedAchievements = [...categoryAchievements].sort((a, b) => {
    switch (sortBy) {
      case "points":
        return (b.points || 0) - (a.points || 0);
      case "rarity": {
        const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
        return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
      }
      case "category":
        return (a.category || "").localeCompare(b.category || "");
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
        <div
          className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-red-500 mb-2">{error}</h3>
        <p className="text-steel-blue">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-navy">
            Achievements{" "}
            <span className="text-base font-normal text-steel-blue">({totalCount})</span>
          </h2>
        </div>
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-turquoise"
          >
            <option value="points">Sort by Points</option>
            <option value="rarity">Sort by Rarity</option>
            <option value="category">Sort by Category</option>
          </select>
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-turquoise shadow-sm"
                  : "text-steel-blue hover:text-turquoise"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white text-turquoise shadow-sm"
                  : "text-steel-blue hover:text-turquoise"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeCategory === cat
                ? "bg-turquoise text-white border-turquoise shadow"
                : "bg-white text-turquoise border-gray-200 hover:bg-turquoise/10 cursor-pointer"
            }`}
          >
            {cat.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            <span className="ml-2 text-xs text-navy font-semibold">
              {groupedByCategory[cat]?.length || 0}
            </span>
          </button>
        ))}
      </div>
      {/* No Results */}
      {sortedAchievements.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-navy mb-2">No achievements found</h3>
          <p className="text-steel-blue">No achievements available in this category.</p>
        </div>
      )}
      {/* Achievement Grid/List */}
      {sortedAchievements.length > 0 && (
        <div
          className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
        >
          {sortedAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id || achievement._id}
              achievement={achievement}
              userProgress={achievement.userProgress}
              isUnlocked={achievement.userProgress?.isUnlocked}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementGrid;
