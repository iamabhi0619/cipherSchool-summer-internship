const MonthlyProgress = ({ dashboardData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-navy">Monthly Progress</h2>
        <div className="text-right">
          <p className="text-xs text-steel-blue">Goal Achievement</p>
          <p className="text-sm font-bold text-forest-green">
            {dashboardData?.monthlyGoal && dashboardData?.currentScore 
              ? Math.round((dashboardData.monthlyGoal / dashboardData.currentScore) * 100) + "%"
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="w-full bg-lavender rounded-full h-3">
          <div
            className="bg-forest-green h-3 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: dashboardData?.monthlyGoal && dashboardData?.currentScore
                ? `${Math.min((dashboardData.monthlyGoal / dashboardData.currentScore) * 100, 100)}%`
                : '0%',
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-steel-blue">
          <span>0 kg</span>
          <span className="font-medium">{dashboardData?.monthlyGoal || "N/A"} kg</span>
          <span>{dashboardData?.currentScore || "N/A"} kg</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyProgress;
