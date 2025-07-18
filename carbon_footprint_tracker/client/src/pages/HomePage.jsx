import { Link } from "react-router-dom";
import { Leaf, BarChart3, Target, Users, Award, Zap } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-lavender overflow-hidden">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-lavender/30 p-1.5 rounded-xl shadow-sm">
                <img src="./logo.svg" alt="Logo" className="h-8 w-8" />
              </div>
              <span className="text-2xl font-bold text-navy">GreenLog</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/features"
                className="text-steel-blue hover:text-navy font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                to="/about"
                className="text-steel-blue hover:text-navy font-medium transition-colors"
              >
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-navy hover:text-teal px-4 py-2 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-forest-green hover:bg-emerald text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-navy mb-8 leading-tight">
              Track Your
              <span className="text-forest-green"> Carbon Footprint</span>
            </h1>
            <p className="text-xl md:text-2xl text-steel-blue mb-12 max-w-3xl mx-auto leading-relaxed">
              Monitor, reduce, and offset your environmental impact with our comprehensive carbon
              footprint tracking platform. Make a difference for our planet, one step at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-forest-green hover:bg-emerald text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 inline-flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span>Start Tracking Now</span>
                <Zap className="h-6 w-6" />
              </Link>
              <Link
                to="/login"
                className="bg-white/80 backdrop-blur-sm hover:bg-white text-navy px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 border border-lavender/50 hover:border-sky-blue shadow-lg hover:shadow-xl"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Why Choose
              <span className="text-forest-green"> GreenLog?</span>
            </h2>
            <p className="text-xl text-steel-blue max-w-2xl mx-auto">
              Powerful features designed to help you understand and reduce your environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-lavender/30 hover:border-sky-blue/50 transform hover:-translate-y-2">
              <div className="bg-sky-blue w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">Real-time Analytics</h3>
              <p className="text-steel-blue leading-relaxed">
                Monitor your carbon emissions with detailed charts and actionable insights
              </p>
            </div>

            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-lavender/30 hover:border-mint-green/50 transform hover:-translate-y-2">
              <div className="bg-forest-green w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">Goal Setting</h3>
              <p className="text-steel-blue leading-relaxed">
                Set and track reduction goals to stay motivated on your eco journey
              </p>
            </div>

            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-lavender/30 hover:border-turquoise/50 transform hover:-translate-y-2">
              <div className="bg-teal w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">Community</h3>
              <p className="text-steel-blue leading-relaxed">
                Connect with eco-warriors and compare progress with the global community
              </p>
            </div>

            <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-lavender/30 hover:border-jade/50 transform hover:-translate-y-2">
              <div className="bg-emerald w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">Achievements</h3>
              <p className="text-steel-blue leading-relaxed">
                Unlock badges and rewards for your eco-friendly actions and milestones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Make a<span className="text-mint-green"> Difference?</span>
            </h2>
            <p className="text-sky-blue mb-10 text-xl leading-relaxed">
              Join thousands of eco-conscious individuals who are already tracking and reducing
              their carbon footprint with GreenLog
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-white hover:bg-mint-green text-navy hover:text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-transparent hover:border-mint-green"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="bg-transparent hover:bg-white/10 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 border-2 border-white/50 hover:border-mint-green backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-lavender p-1.5 rounded-xl shadow-sm">
                  <img src="./logo.svg" alt="Logo" className="h-8 w-8" />
                </div>
                <span className="text-2xl font-bold text-white">GreenLog</span>
              </div>
              <p className="text-sky-blue text-lg leading-relaxed max-w-md">
                Making the world greener, one step at a time. Track, reduce, and offset your carbon
                footprint with our comprehensive platform.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-sky-blue hover:text-mint-green transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/goals"
                    className="text-sky-blue hover:text-mint-green transition-colors"
                  >
                    Goals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leaderboard"
                    className="text-sky-blue hover:text-mint-green transition-colors"
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/achievements"
                    className="text-sky-blue hover:text-mint-green transition-colors"
                  >
                    Achievements
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sky-blue hover:text-mint-green transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sky-blue hover:text-mint-green transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sky-blue hover:text-mint-green transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sky-blue hover:text-mint-green transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-teal/30 pt-8 text-center">
            <p className="text-sky-blue">
              &copy; 2025 GreenLog. Making the world greener, one step at a time.
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      </footer>
    </div>
  );
};

export default HomePage;
