import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../store";
import { fetchBrands } from "../../../../store/slices/brandSlice";
import { fetchCategories } from "../../../../store/slices/categoriesSlice"; // Import the categories slice
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

interface BrandNavProps {
  isMenuOpen: boolean;
}

const BrandNav: React.FC<BrandNavProps> = ({ isMenuOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading: brandsLoading, error: brandsError } = useSelector((state: RootState) => state.brands);
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state: RootState) => state.categories);
  const [isDropOpen, setIsDropOpen] = useState(false);

  // Fetch brands and categories on component mount
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Prepare brands array for display
  const displayBrands = brands?.map(brand => brand.name);

  return (
    <div className="flex flex-col items-center lg:flex-row w-full gap-5 pt-6 pb-3 z-10 bg-white">
      <div className="w-full lg:w-72 relative">
        <div className="flex items-center justify-between gap-4 px-8 h-14 bg-primary">
          <div
            className="flex justify-between lg:w-full items-center gap-4"
            onClick={() => setIsDropOpen(!isDropOpen)}
          >
            <p className="text-base text-white font-normal">All Categories</p>
            {isDropOpen ? (
              <ChevronUp className="w-5 h-5 text-white" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white" />
            )}
          </div>
          <p className="text-base text-white font-semibold lg:hidden">
            See All
          </p>
        </div>
        <div
          className={`px-4 py-2 bg-white w-full absolute z-50 transition-all duration-300 ease-in-out ${
            isDropOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-10 opacity-0 invisible"
          }`}
        >
          <h2 className="text-customBrown font-semibold text-base py-5">
            Categories
          </h2>
          
          {categoriesLoading ? (
            <div className="flex justify-center py-4">
              <div className="text-sm text-gray-500">Loading categories...</div>
            </div>
          ) : categoriesError ? (
            <div className="flex justify-center py-4">
              <div className="text-sm text-red-500">Error: {categoriesError}</div>
            </div>
          ) : (
            <ul className="flex flex-col justify-around items-start gap-3 h-inherit text-gray-500 text-sm font-normal">
              {categories?.map((category) => (
                <li 
                  key={category._id}
                  className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    {/* Commented out the icon since we don't have category icons from API */}
                    {/* <img src="/game-icons_race-car.svg" alt={category.name} className="w-auto"/> */}
                    <span>{category.name}</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </li>
              ))}
              <li className="text-primary cursor-pointer">See More +</li>
            </ul>
          )}
        </div>
      </div>

      {/* main navigation */}
      <div
        className={`w-full lg:w-3/4 relative ${isMenuOpen ? "-z-10" : "z-10"}`}
      >
        {/* Loading state */}
        {brandsLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="text-sm text-gray-500">Loading brands...</div>
          </div>
        )}

        {/* Error state */}
        {brandsError && (
          <div className="flex items-center justify-center py-4">
            <div className="text-sm text-red-500">Error: {brandsError}</div>
          </div>
        )}

        {/* Brands navigation */}
        {!brandsLoading && !brandsError && (
          <>
            <button className="custom-next w-9 h-9 absolute right-0 top-[-7px] text-customBrown z-10">
              ❯
            </button>
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              modules={[Navigation]}
              navigation={{
                nextEl: ".custom-next",
              }}
              breakpoints={{
                640: { slidesPerView: 6 }, // Small tablets
                768: { slidesPerView: 7 }, // Tablets
                1280: { slidesPerView: 10 }, // Desktops
              }}
            >
              {displayBrands?.map((brand, index) => (
                <SwiperSlide key={index}>
                  <p className="text-sm cursor-pointer hover:text-primary transition-colors">
                    {brand}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default BrandNav;