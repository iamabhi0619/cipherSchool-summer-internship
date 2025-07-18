import { Leaf } from "lucide-react";

const DashboardHeader = ({ user, dashboardData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-sky-blue/20 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy mb-1">Welcome back, {user?.name}!</h1>
          <p className="text-steel-blue text-sm">
            Here's your carbon footprint overview • {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-3">
          <div className="bg-mint-green p-3 rounded-xl">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div className="text-right">
            <p className="text-xs text-steel-blue">Carbon Score</p>
            <p className="text-2xl font-bold text-navy">
              {dashboardData?.userProfile?.carbonScore || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
