import { Calendar, FileText, Leaf, Search, Target } from "lucide-react";

function TipsSection() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-lavender/50 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-navy rounded-xl">
          <Leaf className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-navy">Logging Tips</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-turquoise p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-6 w-6 text-mint-green" />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Be Accurate</h4>
          </div>
          <p className="text-white/90 text-sm text-center">
            Provide realistic estimates for distance, consumption, and duration
          </p>
        </div>
        <div className="bg-turquoise p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-emerald" />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Log Regularly</h4>
          </div>
          <p className="text-white/90 text-sm text-center">
            Daily logging provides the most accurate carbon footprint tracking
          </p>
        </div>
        <div className="bg-turquoise p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-forest-green" />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Include Details</h4>
          </div>
          <p className="text-white/90 text-sm text-center">
            More specific information leads to better emission calculations
          </p>
        </div>
        <div className="bg-turquoise p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="h-6 w-6 text-turquoise" />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Small Activities</h4>
          </div>
          <p className="text-white/90 text-sm text-center">
            Even small activities like device usage contribute to your footprint
          </p>
        </div>
      </div>
    </div>
  );
}

export default TipsSection;
