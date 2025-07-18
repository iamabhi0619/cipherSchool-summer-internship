import CategoryCard from "./CategoryCard";

const CategoryBreakdown = ({ dashboardData }) => {
  // Calculate total emissions for percentage calculation
  const totalEmissions = dashboardData?.totalMonthlyEmissions || 0;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6 h-full">
      <h3 className="text-lg font-semibold text-navy mb-4">Emissions by Category</h3>
      <div className="space-y-3">
        {dashboardData?.categoryData?.length > 0 ? (
          dashboardData.categoryData.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
              emissions={category?.emissions || "N/A"}
              color={category?.color || "#387999"}
              trend={category?.trend || "-"}
              percentage={Math.round(((category?.emissions || 0) / Math.max(totalEmissions, 1)) * 100)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-steel-blue">
            <p className="text-sm">No category data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
