const InsightsCard = ({ insights }) => (
  <div className="bg-white rounded-xl shadow-md border border-lavender/30 p-4 h-full">
    <h3 className="text-sm font-semibold text-navy mb-3">Weekly Insights</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="text-steel-blue">Best performing day:</span>
        <span className="font-medium text-emerald">
          {insights ? insights.bestDay : "N/A"}
        </span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="text-steel-blue">Needs improvement:</span>
        <span className="font-medium text-red-500">
          {insights ? insights.worstDay : "N/A"}
        </span>
      </div>
      <div className="pt-2 border-t border-lavender/50">
        <p className="text-xs text-steel-blue mb-1">💡 Quick Tip:</p>
        <p className="text-xs text-navy">
          {insights ? insights.improvementTip : "N/A"}
        </p>
      </div>
    </div>
  </div>
);

export default InsightsCard;
