const GoalPreview = ({ goal }) => {
  if (!goal) return null;

  return (
    <div className="bg-gradient-to-r from-mint-green/10 to-turquoise/10 p-5 rounded-xl border border-mint-green/20">
      <h4 className="font-semibold text-navy text-lg mb-2">{goal.title}</h4>
      <p className="text-steel-blue">{goal.description}</p>
    </div>
  );
};

export default GoalPreview;
