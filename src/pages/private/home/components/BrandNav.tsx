import { useState } from "react";
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
  const [isDropOpen, setIsDropOpen] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          className={`px-4 py-2 bg-white w-full absolute z-50 transition-all duration-300 ease-in-out${isDropOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-10 opacity-0 invisible"}`}
        >
          <h2 className="text-customBrown font-semibold text-base py-5">
            Categories
          </h2>
          <ul className="flex flex-col justify-around items-start  gap-3 h-inherit text-gray-500 text-sm font-normal">
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="/game-icons_race-car.svg" alt="body-part" className="w-auto"/>
                <span>Body Parts</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </li>
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="/iconoir_electronics-chip.svg" alt="electronics" className="w-auto"/>
                <span>Electronics</span>
              </div>
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                className="w-4 h-4"
              />
            </li>
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="performance-part.svg" alt="performance-part" className="w-auto"/>
                <span>Performance Parts</span>
              </div>
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                className="w-4 h-4"
              />
            </li>
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="/repair-parts.svg" alt="repair-parts" className="w-auto"/>
                <span>Repairs Parts</span>
              </div>
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                className="w-4 h-4"
              />
            </li>
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="/wheels-tyres.svg" alt="wheels-tyres" className="w-auto"/>
                <span>Wheels & Tyres</span>
              </div>
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                className="w-4 h-4"
              />
            </li>
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="/tools-equip.png" alt="tools-equip" />
                <span>Tools & Equipments</span>
              </div>
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                className="w-4 h-4"
              />
            </li>
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="/steering.svg" alt="steering" className="w-auto"/>
                <span>Steering Systems</span>
              </div>
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                className="w-4 h-4"
              />
            </li>
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="/filter.svg" alt="filters"className="w-auto" />
                <span>Filters</span>
              </div>
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                className="w-4 h-4"
              />
            </li>
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="/cooling-heat.svg" alt="cooling-heat" className="w-auto"/>
                <span>Cooling & Heating Systems</span>
              </div>
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                className="w-4 h-4"
              />
            </li>
            <li className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-4">
                <img src="/air-conditioner.svg" alt="air-condition" className="w-auto"/>
                <span>Air Conditioning</span>
              </div>
              <img
                src="/arrow-right.svg"
                alt="arrow-right"
                className="w-4 h-4"
              />
            </li>
            <li>See More +</li>
          </ul>
        </div>
      </div>

      {/* main navigation */}
      <div
        className={`w-full lg:w-3/4 relative ${isDropOpen || isMenuOpen ? "-z-10" : "z-10"}`}
      >
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
          {[
            "All Brands",
            "Toyota",
            "Mercedes",
            "BMW",
            "Ford",
            "Honda",
            "Hyundai",
            "Kia",
            "Mazda",
            "Audi",
          ].map((brand, index) => (
            <SwiperSlide key={index}>
              <p className="text-sm">{brand}</p>
            </SwiperSlide>
          ))}
          {/* <button className="custom-next w-9 h-9 absolute right-0 top-0 text-customBrown z-10">
          ❯
        </button> */}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandNav;
