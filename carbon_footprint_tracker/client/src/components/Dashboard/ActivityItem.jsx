const ActivityItem = ({ activity, impact, date, type }) => (
  <div className="flex items-center justify-between p-3 bg-mint-green/5 rounded-lg border border-mint-green/20">
    <div className="flex-1">
      <p className="text-sm font-medium text-navy">{activity || "Unknown activity"}</p>
      <p className="text-xs text-steel-blue">{date ? new Date(date).toLocaleDateString() : "No date"}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-semibold text-emerald">{impact || "N/A"} kg CO₂</p>
      <span className="text-xs bg-emerald/10 text-emerald px-2 py-1 rounded-full">{type || "general"}</span>
    </div>
  </div>
);

export default ActivityItem;
