import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchCategories } from '../../../../store/slices/categoriesSlice';
import { useNavigate } from 'react-router-dom';

const PopularCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get categories from Redux store
  const { categories, loading, error } = useAppSelector((state) => state.categories);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Fetch categories when component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle "View All" click - navigate to products page with category filter
  const handleViewAll = (categoryId: string, categoryName: string) => {
    // Use category ID for filtering, but you can also pass name for display
    navigate(`/products?category=${encodeURIComponent(categoryId)}`);
  };

  // Handle image loading errors
  const handleImageError = (categoryId: string) => {
    setImageErrors(prev => new Set(prev).add(categoryId));
  };

  // Check if image should use fallback
  const shouldUseFallback = (categoryId: string) => {
    return imageErrors.has(categoryId);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="mx-auto py-[20px] px-[20px] md:px-[80px]">
        <div className="flex items-center justify-between mb-8 font-roboto">
          <h2 className="text-[20px] md:text-[24px] font-semibold flex items-center text-[#3D3D3D]">
            <img 
              src="/double-right.png" 
              alt="double right arrow" 
              className="w-5 h-5 mr-2"
            />
            <span>Popular Categories</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white p-4 border rounded-lg shadow-lg animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-1/2 h-24 bg-gray-200 rounded"></div>
                <div className="w-1/2 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mx-auto py-[20px] px-[20px] md:px-[80px]">
        <div className="text-center text-red-500">
          Error loading categories: {error}
        </div>
      </div>
    );
  }

  // If no categories are available, show empty state or return null
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto py-[20px] px-[20px] md:px-[80px]">
      <div className="flex items-center justify-between mb-8 font-roboto">
        <h2 className="text-[20px] md:text-[24px] font-semibold flex items-center text-[#3D3D3D]">
          <img 
            src="/double-right.png" 
            alt="double right arrow" 
            className="w-5 h-5 mr-2"
          />
          <span>Popular Categories</span>
        </h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={category._id || index} className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1/2">
                <div className="w-full h-24 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={shouldUseFallback(category._id) || !category.image 
                      ? '/popular1.png' 
                      : category.image}
                    alt={category.name}
                    className="object-contain w-full h-full p-2"
                    loading="lazy"
                    onError={() => handleImageError(category._id)}
                    onLoad={(e) => {
                      // Remove any loading artifacts by ensuring smooth display
                      const img = e.target as HTMLImageElement;
                      img.style.opacity = '1';
                    }}
                    style={{ 
                      transition: 'opacity 0.2s ease-in-out',
                      opacity: shouldUseFallback(category._id) ? '1' : '0'
                    }}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <h3 className="font-bold mb-4 text-[14px] text-[#2D2828] line-clamp-2">
                  {category.name}
                </h3>
                <div className="pt-2">
                  <button
                    onClick={() => handleViewAll(category._id, category.name)}
                    className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    View All
                    <img 
                      src="/arrowrightsm.png" 
                      alt="arrow right" 
                      className="ml-1 w-2 h-2"
                      onError={(e) => {
                        // Fallback for the arrow icon
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;