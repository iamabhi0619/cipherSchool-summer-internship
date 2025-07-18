import ActivityItem from "./ActivityItem";

const RecentActivities = ({ dashboardData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6 h-full">
      <h3 className="text-lg font-semibold text-navy mb-4">Recent Eco Actions</h3>
      <div className="space-y-3">
        {dashboardData?.recentActivities?.length > 0 ? (
          dashboardData.recentActivities
            .slice(-4)
            .reverse()
            .map((activity, index) => (
              <ActivityItem
                key={index}
                activity={activity?.activity || "Unknown activity"}
                impact={activity?.impact || "N/A"}
                date={activity?.date || new Date().toISOString()}
                type={activity?.type || "general"}
              />
            ))
        ) : (
          <div className="text-center py-8 text-steel-blue">
            <p className="text-sm">No recent activities</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
