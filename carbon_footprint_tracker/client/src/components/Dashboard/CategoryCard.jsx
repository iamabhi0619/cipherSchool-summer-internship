import { Car, Zap, Apple, MoreHorizontal } from "lucide-react";

const CategoryCard = ({ category, emissions, color, trend, percentage }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "car":
        return Car;
      case "zap":
        return Zap;
      case "apple":
        return Apple;
      default:
        return MoreHorizontal;
    }
  };

  const Icon = getIcon(category?.icon);

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-lavender/30 hover:border-steel-blue/30 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color || "#387999"}15` }}>
          <Icon className="h-4 w-4" style={{ color: color || "#387999" }} />
        </div>
        <div>
          <p className="text-sm font-medium text-navy">{category?.category || "Unknown"}</p>
          <p className="text-xs text-steel-blue">{percentage || 0}% of total</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-navy">{emissions || "N/A"} kg</p>
        <p className={`text-xs ${(trend || "").startsWith("-") ? "text-emerald" : "text-red-500"}`}>
          {trend || "-"} vs last week
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
