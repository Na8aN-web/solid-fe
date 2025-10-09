import React, { useEffect } from "react";
import { ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchVehicleTypes } from '../../../../store/slices/vehicleSlice';
import { useNavigate } from 'react-router-dom';

const PopularVehicleTypes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Get vehicle types from Redux store
  const { vehicleTypes, loading, error } = useAppSelector((state) => state.vehicle);

  useEffect(() => {
    // Fetch vehicle types when component mounts
    dispatch(fetchVehicleTypes());
  }, [dispatch]);

  // Handle vehicle type click - redirect to products page with filter
  const handleVehicleTypeClick = (vehicleTypeId: string) => {
    navigate(`/products?vehicleType=${encodeURIComponent(vehicleTypeId)}`);
  };

  // Handle main "See All" click
  const handleSeeAll = () => {
    navigate('/products');
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-8">
        <div className="flex justify-between items-center pb-2 sm:pb-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.svg" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Popular Vehicles Types
            </h2>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-base font-semibold text-customGray1">See All</p>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-8">
        <div className="flex justify-between items-center pb-2 sm:pb-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.svg" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Popular Vehicles Types
            </h2>
          </div>
        </div>
        <div className="text-center text-red-500">
          Error loading vehicle types: {error}
        </div>
      </section>
    );
  }

  // If no vehicle types are available, show empty state or return null
  if (!vehicleTypes || vehicleTypes.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex justify-between items-center pb-2 sm:pb-6">
        <div className="flex gap-0 items-center">
          <img src="/double-right.svg" alt="right" className="w-9 md:w-16" />
          <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
            Popular Vehicles Types
          </h2>
        </div>
        <button 
          onClick={handleSeeAll}
          className="flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <p className="text-base font-semibold text-customGray1">See All</p>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Display fetched vehicle types */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        {vehicleTypes.map((vehicleType, index) => (
          <button
            key={vehicleType._id || index}
            onClick={() => handleVehicleTypeClick(vehicleType._id)}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200 p-2 rounded-lg hover:bg-gray-50 min-w-[100px]"
          >
            <img 
              src={vehicleType.image || "/passenger-car.svg"} // Use vehicleType.image from API or fallback
              alt={vehicleType.name}
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              onError={(e) => {
                // Fallback if vehicle type image doesn't load
                (e.target as HTMLImageElement).src = "/passenger-car.svg";
              }}
            />
            <p className="text-sm text-customBrown font-normal pt-2 text-center max-w-24">
              {vehicleType.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PopularVehicleTypes;