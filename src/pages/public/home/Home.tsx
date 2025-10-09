import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { fetchCategories } from "../../../store/slices/categoriesSlice";
import { fetchVehicleTypes } from "../../../store/slices/vehicleSlice";
import HeroSection from "./components/Hero";
import HowItWorks from "../howitworks/HowItWorks";
import PopularCategories from "./components/PopularCategories";
import WhyChooseSolidParts from "./components/WhyChooseSolid";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Testimonial from "./components/Testimonial";
import ManufacturersGrid from "./components/Manufacturers";
import DealsOfTheDay from "./components/DealsOfTheDay";
import Features from "./components/Features";
import InteractiveFAQPage from "./components/Faq";
import VehicleBlogPage from "./components/Blog";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state: RootState) => state.categories);

  const {
    vehicleTypes,
    loading: vehicleTypesLoading,
    error: vehicleTypesError,
  } = useSelector((state: RootState) => state.vehicle);

  console.log(categories);

  // Fetch categories and vehicle types on component mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchVehicleTypes());
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle vehicle type click - redirect to products page with filter
  const handleVehicleTypeClick = (vehicleTypeId: string) => {
    navigate(`/products?vehicleType=${encodeURIComponent(vehicleTypeId)}`);
  };

  // Handle navigation for carousel buttons (optional functionality)
  const handleNext = () => {
    // You can implement carousel navigation logic here if needed
    console.log("Next vehicle types");
  };

  const handlePrev = () => {
    // You can implement carousel navigation logic here if needed
    console.log("Previous vehicle types");
  };

  return (
    <div>
      <header className="w-full">
        {/* Top Navigation Bar */}
        <HeroSection />
      </header>
      <div className="bg-[#FFF6D9] px-[40px] md:px-[80px] py-[40px] font-roboto">
        <h2 className="text-[20px] md:text-[24px] font-semibold text-customBrown mb-4 font-roboto">
          Find Your Vehicle Parts
        </h2>
        <div className="flex flex-wrap flex-col md:flex-row justify-between gap-4">
          {/* Category Select - now using API data */}
          <div className="relative w-full md:w-[250px]">
            <select className="appearance-none pl-[50px] py-[20px] border rounded-[12px] pr-[60px] outline-none focus:ring-0 focus:border-gray-300 w-full bg-white">
              <option>Select Category</option>
              {categoriesLoading ? (
                <option disabled>Loading categories...</option>
              ) : categoriesError ? (
                <option disabled>Error loading categories</option>
              ) : (
                categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            <img
              src="/arrow-down.svg"
              alt="arrow-down"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-[14px] h-[14px]"
            />
          </div>

          {/* Other selects remain unchanged */}
          {["Maker", "Model", "Year", "Engine"].map((item) => (
            <div key={item} className="relative w-full md:w-[220px]">
              <select className="appearance-none pl-[50px] py-[20px] border rounded-[12px] pr-[60px] outline-none focus:ring-0 focus:border-gray-300 w-full">
                <option>Select {item}</option>
              </select>
              <img
                src="/arrow-down.svg"
                alt="arrow-down"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-[14px] h-[14px]"
              />
            </div>
          ))}

          <button className="px-[50px] py-[20px] bg-primary text-white rounded-[12px] w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
      <PopularCategories />
      
      {/* Dynamic Vehicle Types Section */}
      <section className="py-[20px] px-[20px] md:px-[80px]">
        <div className="flex justify-between items-center pb-2 sm:pb-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Popular Vehicles Types
            </h2>
          </div>
          {/* <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div> */}
        </div>

        {vehicleTypesLoading ? (
          <div className="flex justify-between items-center">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : vehicleTypesError ? (
          <div className="text-center text-red-500 py-4">
            Error loading vehicle types: {vehicleTypesError}
          </div>
        ) : vehicleTypes && vehicleTypes.length > 0 ? (
          <div className="flex justify-between items-center flex-wrap gap-4">
            {vehicleTypes.slice(0, 6).map((vehicleType, index) => (
              <button
                key={vehicleType._id || index}
                onClick={() => handleVehicleTypeClick(vehicleType._id)}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200 p-2 rounded-lg hover:bg-gray-50 min-w-[200px]"
              >
                <img 
                  src={vehicleType.image || "/passenger-car.svg"}
                  alt={vehicleType.name}
                  className="w-12 h-12 sm:w-full sm:h-full object-contain"
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
        ) : (
          <div className="text-center text-gray-500 py-4">
            No vehicle types available
          </div>
        )}
      </section>

      <WhyChooseSolidParts />
      <Testimonial />
      <ManufacturersGrid />
      <DealsOfTheDay />
      <Features />
      <InteractiveFAQPage />
      <VehicleBlogPage />
    </div>
  );
};

export default Header;