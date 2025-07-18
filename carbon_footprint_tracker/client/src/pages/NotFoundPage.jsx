import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Leaf } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen h-screen w-screen overflow-hidden bg-gradient-to-br from-mint-green/30 via-sky-blue/20 to-lavender/30 flex items-center justify-center px-4 animate-fadeInUp">
      <div className="max-w-lg w-full text-center shadow-xl rounded-3xl bg-white/80 p-6 border border-sky-blue/30 flex flex-col justify-center items-center h-[90vh]">
        {/* Logo & Brand */}
        <div className="flex justify-center mb-4 animate-slideInRight">
          <div className="flex items-center space-x-2">
            <Leaf className="h-12 w-12 text-turquoise drop-shadow" />
            <span className="text-3xl font-extrabold text-navy tracking-tight">EcoTracker</span>
          </div>
        </div>

        {/* Animated 404 Illustration */}
        <div className="mb-4">
          <div className="text-8xl font-extrabold text-lavender mb-1 animate-bounce">404</div>
          <div className="text-6xl mb-1 animate-fadeInUp">🌱</div>
          <div className="text-base text-steel-blue italic">Lost in the forest of pages...</div>
        </div>

        {/* Error Message */}
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold text-navy mb-2 animate-fadeInUp">
            Page Not Found
          </h1>
          <p className="text-steel-blue mb-4 animate-fadeInUp">
            Oops! You’ve wandered off the eco-friendly path.<br />
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 justify-center mb-3 animate-fadeInUp w-full">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 w-full md:w-auto bg-turquoise hover:bg-mint-green text-white px-5 py-2 rounded-xl font-semibold shadow transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go to Dashboard</span>
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full md:w-auto bg-lavender hover:bg-sky-blue text-navy px-5 py-2 rounded-xl font-semibold shadow transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-4 pt-4 border-t border-lavender/40 animate-fadeInUp w-full">
          <p className="text-sm text-steel-blue mb-2">Need help finding something?</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link 
              to="/log-activity" 
              className="text-turquoise hover:text-mint-green transition-colors font-semibold"
            >
              Log Activity
            </Link>
            <Link 
              to="/goals" 
              className="text-turquoise hover:text-mint-green transition-colors font-semibold"
            >
              View Goals
            </Link>
            <Link 
              to="/achievements" 
              className="text-turquoise hover:text-mint-green transition-colors font-semibold"
            >
              Achievements
            </Link>
          </div>
        </div>

        {/* Environmental Tip */}
        <div className="mt-4 p-3 bg-mint-green/10 rounded-xl border border-mint-green/20 animate-fadeInUp w-full">
          <p className="text-sm text-forest-green font-semibold">
            💡 <strong>Eco Tip:</strong> Every small action counts towards reducing your carbon footprint!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
