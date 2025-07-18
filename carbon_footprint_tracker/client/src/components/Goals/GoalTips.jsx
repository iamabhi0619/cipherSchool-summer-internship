import { Lightbulb, Target, TrendingUp, Users, Calendar, Star } from "lucide-react";

const GoalTips = () => {
  const tips = [
    {
      title: "Start Simple",
      description: "Begin with easy actions that fit into your daily routine. Small changes compound over time.",
      icon: <Target className="w-5 h-5" />,
      color: "mint-green"
    },
    {
      title: "Make it Habit", 
      description: "Focus on actions you can repeat regularly. Consistency beats intensity for lasting impact.",
      icon: <Calendar className="w-5 h-5" />,
      color: "turquoise"
    },
    {
      title: "Track Progress",
      description: "Monitor your progress regularly. Seeing improvement motivates continued effort.", 
      icon: <TrendingUp className="w-5 h-5" />,
      color: "emerald"
    },
    {
      title: "Share & Inspire",
      description: "Share your achievements with friends and family. Lead by example and inspire others.",
      icon: <Users className="w-5 h-5" />,
      color: "ocean-blue"
    },
    {
      title: "Set Realistic Goals",
      description: "Choose achievable targets. Success builds momentum for bigger challenges.",
      icon: <Star className="w-5 h-5" />,
      color: "lavender"
    },
    {
      title: "Learn & Adapt",
      description: "Research new eco-friendly practices. Stay informed about sustainability trends.",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "forest-green"
    }
  ];

  const motivationalQuotes = [
    "Every small action creates a ripple effect for positive change.",
    "Your daily choices shape the world we leave behind.",
    "Progress, not perfection, is the goal of sustainability.",
    "Be the change you want to see in the world."
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-6">
      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-mint-green/20 via-turquoise/20 to-ocean-blue/20 rounded-2xl p-6 border border-mint-green/30">
        <div className="text-center">
          <div className="text-4xl mb-3">🌱</div>
          <blockquote className="text-lg font-medium text-navy italic mb-2">
            "{randomQuote}"
          </blockquote>
          <p className="text-steel-blue text-sm">— Your Carbon Footprint Journey</p>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-lavender/30 to-sky-blue/20 rounded-2xl p-6 border border-lavender/40">
        <div className="flex items-center space-x-2 mb-6">
          <Lightbulb className="w-6 h-6 text-forest-green" />
          <h3 className="text-xl font-semibold text-navy">Goal Success Tips</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:bg-white/80 transition-all duration-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 bg-${tip.color}/20 rounded-lg text-${tip.color === 'mint-green' ? 'forest-green' : tip.color === 'lavender' ? 'navy' : tip.color}`}>
                  {tip.icon}
                </div>
                <p className="font-semibold text-navy">{tip.title}</p>
              </div>
              <p className="text-steel-blue text-sm leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-6 p-4 bg-white/50 rounded-xl border border-white/30">
          <h4 className="font-semibold text-navy mb-2">📚 Quick Resources</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-steel-blue">Energy Saving:</span>
              <p className="text-steel-blue">LED bulbs use 75% less energy than incandescent bulbs</p>
            </div>
            <div>
              <span className="font-medium text-steel-blue">Transportation:</span>
              <p className="text-steel-blue">Walking/biking saves ~0.5kg CO₂ per mile vs driving</p>
            </div>
            <div>
              <span className="font-medium text-steel-blue">Food Choices:</span>
              <p className="text-steel-blue">Plant-based meals reduce carbon footprint by ~50%</p>
            </div>
            <div>
              <span className="font-medium text-steel-blue">Waste Reduction:</span>
              <p className="text-steel-blue">Composting diverts 30% of household waste from landfills</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalTips;
