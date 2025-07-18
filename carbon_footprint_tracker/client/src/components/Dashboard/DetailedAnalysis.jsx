const DetailedAnalysis = ({ dashboardData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-lavender/30 p-6">
      <h3 className="text-lg font-semibold text-navy mb-4">Detailed Carbon Footprint Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Pattern */}
        <div>
          <h4 className="text-sm font-semibold text-navy mb-3">Weekly Pattern Analysis</h4>
          <div className="space-y-3">
            {dashboardData?.weeklyData?.length > 0 ? (
              dashboardData.weeklyData.map((day, index) => {
                const emissions = day?.emissions || 0;
                const allEmissions = dashboardData.weeklyData.map(d => d?.emissions || 0);
                const minEmissions = Math.min(...allEmissions);
                const maxEmissions = Math.max(...allEmissions);
                const isLowest = emissions === minEmissions;
                const isHighest = emissions === maxEmissions;
                
                return (
                  <div key={index} className="flex items-center justify-between p-2 bg-lavender/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-navy w-10">{day?.day || "N/A"}</span>
                      <div className="flex-1 bg-lavender rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${isLowest ? 'bg-emerald' : isHighest ? 'bg-red-400' : 'bg-steel-blue'}`}
                          style={{ width: maxEmissions > 0 ? `${(emissions / maxEmissions) * 100}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-semibold ${isLowest ? 'text-emerald' : isHighest ? 'text-red-500' : 'text-navy'}`}>
                        {emissions} kg
                      </span>
                      {isLowest && <p className="text-xs text-emerald">Best</p>}
                      {isHighest && <p className="text-xs text-red-500">Needs work</p>}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-steel-blue">
                <p className="text-sm">No weekly data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Category Impact */}
        <div>
          <h4 className="text-sm font-semibold text-navy mb-3">Category Impact & Trends</h4>
          <div className="space-y-3">
            {dashboardData?.categoryData?.length > 0 ? (
              (() => {
                // Calculate total category emissions for proper percentage calculation
                const totalCategoryEmissions = dashboardData.categoryData.reduce((sum, cat) => sum + (cat?.emissions || 0), 0);
                const maxCategoryEmissions = Math.max(...dashboardData.categoryData.map(cat => cat?.emissions || 0));
                
                return dashboardData.categoryData.map((category, index) => (
                  <div key={index} className="p-3 bg-lavender/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category?.color || "#387999" }}
                        ></div>
                        <span className="text-sm font-medium text-navy">{category?.category || "Unknown"}</span>
                      </div>
                      <span className="text-sm font-semibold text-navy">{category?.emissions || "N/A"} kg</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-steel-blue">
                        {totalCategoryEmissions > 0 && category?.emissions 
                          ? Math.round((category.emissions / totalCategoryEmissions) * 100) + "% of total"
                          : "N/A% of total"}
                      </span>
                      <span className={`font-medium ${category?.trend === "New" ? 'text-blue-500' : (category?.trend || "").startsWith('-') ? 'text-emerald' : 'text-red-500'}`}>
                        {category?.trend || "-"}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-white rounded-full h-1">
                        <div 
                          className="h-1 rounded-full"
                          style={{ 
                            backgroundColor: category?.color || "#387999",
                            width: maxCategoryEmissions > 0 && category?.emissions 
                              ? `${(category.emissions / maxCategoryEmissions) * 100}%`
                              : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ));
              })()
            ) : (
              <div className="text-center py-8 text-steel-blue">
                <p className="text-sm">No category data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-lavender/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-steel-blue">Total Week</p>
            <p className="text-lg font-bold text-navy">
              {dashboardData?.weeklyData?.length > 0 
                ? dashboardData.weeklyData.reduce((sum, day) => sum + (day?.emissions || 0), 0).toFixed(1) + " kg"
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-steel-blue">Peak Day</p>
            <p className="text-lg font-bold text-red-500">
              {dashboardData?.weeklyData?.length > 0 
                ? Math.max(...dashboardData.weeklyData.map(d => d?.emissions || 0)).toFixed(1) + " kg"
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-steel-blue">Low Day</p>
            <p className="text-lg font-bold text-emerald">
              {dashboardData?.weeklyData?.length > 0 
                ? Math.min(...dashboardData.weeklyData.map(d => d?.emissions || 0)).toFixed(1) + " kg"
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-steel-blue">Monthly Total</p>
            <p className="text-lg font-bold text-ocean-blue">
              {dashboardData?.totalMonthlyEmissions 
                ? dashboardData.totalMonthlyEmissions.toFixed(1) + " kg"
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysis;
