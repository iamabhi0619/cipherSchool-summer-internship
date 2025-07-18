import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../../lib/api";
import AchievementStats from "./AchievementStats";
import RecentAchievements from "./RecentAchievements";

function OverviewCard() {
  const [userAchievements, setUserAchievements] = useState(null);
  const [allAchievements, setAllAchievements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAchievements = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/achievements");
      const allResponse = await api.get("/achievements/all");
      setUserAchievements(response.data.data);
      setAllAchievements(allResponse.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching the Achievement Stats");
      toast.error(err.response?.data?.message || "Error fetching the Achievement Stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 rounded-full border-4 border-turquoise border-t-transparent animate-spin"></div>
        <span className="ml-3 text-steel-blue">Loading achievements...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <AchievementStats userAchievements={userAchievements} />
      <div className="mt-6">
        <RecentAchievements
          achievements={{ ...userAchievements }}
          achievementDetails={allAchievements?.achievements}
        />
      </div>
    </div>
  );
}

export default OverviewCard;
