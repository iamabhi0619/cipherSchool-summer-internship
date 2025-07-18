import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { LogOut, Leaf, BarChart3, Plus, Trophy, Users, FileText, Target } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-mint-green/20 sticky top-0 z-50">
      <div className="max-w-full px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-emerald/10 rounded-lg group-hover:bg-emerald/20 transition-all duration-300">
              <Leaf className="h-5 w-5 text-emerald" />
            </div>
            <span className="text-lg font-bold text-navy">GreenLog</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-steel-blue hover:text-navy hover:bg-sky-blue/10 transition-all duration-200"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            
            <Link
              to="/log-activity"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-steel-blue hover:text-navy hover:bg-mint-green/10 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Log</span>
            </Link>
            
            <Link
              to="/goals"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-steel-blue hover:text-navy hover:bg-turquoise/10 transition-all duration-200"
            >
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Goals</span>
            </Link>
            
            <Link
              to="/achievements"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-steel-blue hover:text-navy hover:bg-jade/10 transition-all duration-200"
            >
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-medium">Achievement</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-emerald to-turquoise rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {(user?.name || "User").charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-steel-blue text-sm font-medium">
                {(user?.name || "User").split(' ')[0]}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-steel-blue hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Exit</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
