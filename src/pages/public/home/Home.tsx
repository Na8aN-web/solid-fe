import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { fetchCategories } from '../../../store/slices/categoriesSlice';
import Navbar from './components/LandingNavbar';
import HeroSection from './components/Hero';
import HowItWorks from './components/HowItWorks';
import PopularCategories from './components/PopularCategories';
import WhyChooseSolidParts from './components/WhyChooseSolid';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Testimonial from './components/Testimonial';
import ManufacturersGrid from './components/Manufacturers';
import DealsOfTheDay from './components/DealsOfTheDay';
import Features from './components/Features';
import InteractiveFAQPage from './components/Faq';
import VehicleBlogPage from './components/Blog';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state: RootState) => state.categories);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <header className="w-full">
        {/* Top Navigation Bar */}
        <Navbar />
        <HeroSection />
      </header>
      <div className="bg-[#FFF6D9] px-[40px] md:px-[80px] py-[40px] font-roboto">
        <h2 className="text-[20px] md:text-[24px] font-semibold text-customBrown mb-4 font-roboto">
          Find Your Vehicle Parts
        </h2>
        <div className="flex flex-wrap flex-col md:flex-row justify-between gap-4">
          {/* Category Select - now using API data */}
          <div className="relative w-full md:w-[250px]">
            <select
              className="appearance-none pl-[50px] py-[20px] border rounded-[12px] pr-[60px] outline-none focus:ring-0 focus:border-gray-300 w-full bg-white"
            >
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
              <select
                className="appearance-none pl-[50px] py-[20px] border rounded-[12px] pr-[60px] outline-none focus:ring-0 focus:border-gray-300 w-full"
              >
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
      <HowItWorks />
      <PopularCategories />
      <section className="py-[20px] px-[20px] md:px-[80px]">
        <div className="flex justify-between items-center pb-2 sm:pb-6">
          <div className="flex gap-0 items-center">
            <img
              src="/double-right.png"
              alt="right"
              className="w-9 md:w-16"
            />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Popular Vehicles Types
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <img src="/passenger-car.svg" alt="" />
            <p className="text-sm text-customBrown font-normal pt-4">
              Passengers Cars
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/suvs.svg" alt="suvs" />
            <p className="text-sm text-customBrown font-normal pt-4">
              SUVs and Crossovers
            </p>
          </div>
          <div className="sm:flex flex-col items-center hidden">
            <img src="/trucks.svg" alt="trucks" />
            <p className="text-sm text-customBrown font-normal pt-4">
              Trucks
            </p>
          </div>
          <div className="sm:flex flex-col items-center hidden">
            <img src="/equip-heavy.svg" alt="heavy-equipment" />
            <p className="text-sm text-customBrown font-normal pt-4">
              Heavy Equipment and Machinery
            </p>
          </div>
          <div className="lg:flex flex-col items-center hidden">
            <img src="/tricycles.svg" alt="tricycle" />
            <p className="text-sm text-customBrown font-normal pt-4">
              Tricycles
            </p>
          </div>
          <div className="lg:flex flex-col items-center hidden">
            <img src="/buses.svg" alt="buses" />
            <p className="text-sm text-customBrown font-normal pt-4">
              Buses
            </p>
          </div>
        </div>
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