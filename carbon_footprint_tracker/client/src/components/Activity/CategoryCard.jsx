import React, { useState } from "react";
import { Zap, Car, Home, Utensils, ShoppingBag, ArrowLeft } from "lucide-react";
import { getCategoriesArray, getCategoryTypesArray } from "../../data/activityData";

function CategoryCard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = getCategoriesArray();

  const getCategoryIcon = (categoryValue) => {
    const iconMap = {
      transportation: Car,
      energy: Zap,
      food: Utensils,
      housing: Home,
      shopping: ShoppingBag,
    };
    return iconMap[categoryValue] || Zap;
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleGoBack = () => {
    setSelectedCategory(null);
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-ocean-blue/50 p-6 h-96">
      {!selectedCategory ? (
        <>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-ocean-blue rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-navy">Categories</h3>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-80">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.value);

              return (
                <div
                  key={category.value}
                  className={`flex items-center justify-between px-3 py-1 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md`}
                  style={{
                    backgroundColor: `rgb(var(--color-${category.color}) / 0.1)`,
                    borderColor: `rgb(var(--color-${category.color}) / 0.3)`,
                  }}
                  onClick={() => handleCategoryClick(category)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `rgb(var(--color-${category.color}) / 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `rgb(var(--color-${category.color}) / 0.1)`;
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: `rgb(var(--color-${category.color}) / 0.2)`,
                      }}
                    >
                      <IconComponent
                        className="h-4 w-4"
                        style={{ color: `rgb(var(--color-${category.color}))` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-navy">{category.name}</span>
                  </div>
                  <span
                    className="text-xs text-white px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `rgb(var(--color-${category.color}))`,
                    }}
                  >
                    {category.typeCount} types
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-2 mb-3">
            <button
              onClick={handleGoBack}
              className="p-2 bg-steel-blue rounded-lg hover:bg-navy transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div
              className="p-2 rounded-lg"
              style={{
                backgroundColor: `rgb(var(--color-${selectedCategory.color}) / 0.2)`,
              }}
            >
              {(() => {
                const IconComponent = getCategoryIcon(selectedCategory.value);
                return (
                  <IconComponent
                    className="h-5 w-5"
                    style={{ color: `rgb(var(--color-${selectedCategory.color}))` }}
                  />
                );
              })()}
            </div>
            <h3 className="text-lg font-bold text-navy">{selectedCategory.name} Types</h3>
          </div>
          <div className="space-y-1.5 max-h-72 overflow-y-scroll">
            {getCategoryTypesArray(selectedCategory.value).map((type, index) => (
              <div
                key={type.value}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer border border-gray-200 hover:shadow-sm"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: `rgb(var(--color-${selectedCategory.color}))`,
                    }}
                  />
                  <span className="text-sm font-medium text-navy">{type.label}</span>
                </div>
                <span className="text-xs text-steel-blue bg-white px-2 py-1 rounded-full border border-gray-300">
                  {type.unit}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryCard;
