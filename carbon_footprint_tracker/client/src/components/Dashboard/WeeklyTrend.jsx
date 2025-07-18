import ChartSection from "../ChartSection";

const WeeklyTrend = ({ dashboardData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6">
      <h3 className="text-lg font-semibold text-navy mb-4">Weekly Emissions Trend</h3>
      <ChartSection
        weeklyData={dashboardData?.weeklyData || []}
        categoryData={dashboardData?.categoryData || []}
      />
    </div>
  );
};

export default WeeklyTrend;
