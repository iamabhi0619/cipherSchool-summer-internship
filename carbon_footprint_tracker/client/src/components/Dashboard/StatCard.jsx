import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

const StatCard = ({ title, value, unit, change, icon: Icon, color, bgColor }) => (
  <div
    className={`${bgColor} rounded-xl shadow-md border-1 border-navy p-4 hover:shadow-lg transition-all duration-200`}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-xs font-medium text-steel-blue mb-1">{title}</p>
        <div className="flex items-baseline space-x-1">
          <p className={`text-lg font-bold text-${color}`}>{value}</p>
          <span className="text-xs text-steel-blue">{unit}</span>
        </div>
        {change && (
          <div
            className={`flex items-center mt-1 text-xs ${
              change.startsWith("-") ? "text-emerald" : "text-red-500"
            }`}
          >
            {change.startsWith("-") ? (
              <ArrowDown className="h-3 w-3 mr-1" />
            ) : (
              <ArrowUp className="h-3 w-3 mr-1" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className={`bg-${color}/10 p-2 rounded-lg`}>
        {Icon && <Icon className={`h-4 w-4 text-${color}`} />}
      </div>
    </div>
  </div>
);

export default StatCard;
