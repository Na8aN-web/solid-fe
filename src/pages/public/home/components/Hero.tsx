import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../store";
import { fetchCategories } from "../../../../store/slices/categoriesSlice";
import SearchFilter from "../../../../components/SearchFilter";
import LandingNavbar from "../../../../components/LandingNavbar";
import "./Hero.css";

interface HeroSectionProps {
  onSearch?: (query: string, category: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, selectedCategory);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <div
      className="relative w-full min-h-screen
        bg-[linear-gradient(180deg,#003366_0%,#4f7194_45%,#cfdbe7_75%,#ffffff_100%)]
        font-roboto py-3 max-h-screen"
    >
      <div
        className="
    pointer-events-none
    absolute inset-x-0 bottom-0
    h-[420px]
    hero-perspective-grid
  "
      />

      <LandingNavbar />
      <div className="mx-auto px-6 w-full pt-[20px]">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-[32px] md:text-[40px] lg:text-[64px] w-full max-w-[900px] leading-tight font-semibold mb-4 text-white">
            Your One-Stop Platform for Quality Automotive{" "}
            <span className="text-[#FFC300]">Spare Parts</span>
          </h1>
          <p className="text-white my-3 text-[16px] md:text-2xl w-full md:w-[600px]">
            Find the right parts for cars, trucks, and tractors from trusted
            manufacturers and suppliers.
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <SearchFilter />
        </div>

        {/* Auto Parts Images */}
        <div>
          <div className="absolute bottom-10 left-0 right-0 md:px-0">
            <picture>
              {/* When screen ≤ 768px, use mobile image */}
              <source
                media="(max-width: 640px)"
                srcSet="/perspectiveGridImgMobile.svg"
              />

              {/* Default (desktop) */}
              <img
                src="/perspectiveGridImg.png"
                className="w-full max-w-[1100px] h-auto mx-auto"
                alt="perspective-grid"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
