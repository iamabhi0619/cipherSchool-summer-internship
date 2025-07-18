import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ChartSection = ({ weeklyData, categoryData }) => {
  return (
    <div className="space-y-6">
      {/* Weekly Emissions Chart */}
      <div className="bg-mint-green/20 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Emissions</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} kg CO₂`, "Emissions"]}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Bar dataKey="emissions" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-sky-blue/20 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emissions by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="emissions"
                label={({ category, emissions }) => `${category}: ${emissions}kg`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} kg CO₂`, "Emissions"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {categoryData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-600">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
