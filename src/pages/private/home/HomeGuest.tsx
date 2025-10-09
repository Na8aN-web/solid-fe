// import {useState} from "react";
// import Navbar from "./components/Navbar";
// import BrandNav from "./components/BrandNav";
import PopularVehicleTypes from "./components/PopularVehicleTypes";
import NewArrivals from "./components/NewArrivals";
import FeaturedProducts from "./components/FeaturedProducts";
import DealsOfTheDay from "./components/DealsOfTheDay";
import { Link } from "react-router-dom";


const HomeGuest = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ShopNowButton = () => (
    <Link
      to="/products"
      className="bg-primary text-white w-28 h-12 rounded-lg text-base flex items-center justify-center"
    >
      Shop Now
    </Link>
  );

  return (
    <div className="pb-16">
      {/* <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <BrandNav isMenuOpen={isMenuOpen} /> */}
      <main>
        <div className="px-5 sm:px-8 lg:px-10">
          {/* Hero content */}
          <section className="bg-white pt-12 lg:pt-0">
            <div className="flex justify-between w-full items-center gap-2 bg-customLight lg:bg-white">
              <div className="flex items-center justify-between w-full sm:overflow-hidden pl-8 py-8 lg:py-0">
                <div>
                  <p className="text-xs sm:text-sm text-customBrown font-normal pb-2 sm:pb-6">
                    WELCOME TO SOLID SPARE PARTS
                  </p>
                  <h1 className="text-xl sm:text-4xl text-customBrown font-semibold w-56 sm:w-80 leading-tight pb-4 sm:pb-8">
                    Quality Auto Spare Parts at a go!
                  </h1>
                  <ShopNowButton />
                </div>
                <div className="sm:flex-shrink-0">
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet="/car-header.svg"
                    />
                    <source
                      media="(max-width: 1023px)"
                      srcSet="/herosmall-car.svg"
                    />
                    <img
                      src="/herosmall-car.svg"
                      alt="car"
                      className="w-full md:max-w-[570px]"
                    />
                  </picture>
                </div>
              </div>
              <div className="hidden lg:flex flex-col justify-between gap-6 pl-5">
                <div className="bg-white flex flex-col items-center justify-center w-[300px] h-64">
                  <p className="text-base text-customBrown font-normal">
                    ONLY THIS WEEK
                  </p>
                  <p className="text-4xl text-customBrown font-bold">
                    HUGE SALES
                  </p>
                </div>
                <div className="bg-primary flex flex-col items-center justify-center w-full h-64">
                  <p className="text-base text-white font-normal">
                    ONLY THIS WEEK
                  </p>
                  <p className="text-4xl text-white font-bold">HUGE SALES</p>
                </div>
              </div>
            </div>
          </section>
          {/* Popular Vehicle type */}
          <PopularVehicleTypes />
          <section className="flex justify-between gap-4 py-1">
            <div className="w-full bg-black py-4">
              <div className="flex justify-between items-center gap-4 pl-7">
                <div>
                  <p className="text-white text-xl font-bold md:text-2xl">
                    BODY PARTS
                  </p>
                  <p className="text-sm md:text-base font-normal text-white">
                    FOR ANY VEHICLE
                  </p>
                  <p className="text-sm md:text-base font-normal text-white pt-4">
                    COUPE, SEDAN, SUV AND
                  </p>
                  <p className="text-sm md:text-base font-normal text-customGold pb-4">
                    MANY MORE
                  </p>
                  <ShopNowButton />
                </div>
                <picture>
                  <source media="(min-width: 768px)" srcSet="/half-car.svg" />
                  <source media="(min-width: 540px)" srcSet="/half-car.svg" />
                  <img
                    src="/halfcar2.svg"
                    alt="Flowers"
                    style={{ width: "auto" }}
                  />
                </picture>
                {/* <img src="/half-car.svg" alt="car" className="w-full h-auto" /> */}
              </div>
            </div>
            <div className="w-full  bg-black py-4 hidden lg:block">
              <div className="inline-flex items-center gap-4 pl-7">
                <div>
                  <p className="text-white text-2xl font-bold">BODY PARTS</p>
                  <p className="text-base font-normal text-white">
                    FOR ANY VEHICLE
                  </p>
                  <p className="text-base font-normal text-white pt-4">
                    COUPE, SEDAN, SUV AND
                  </p>
                  <p className="text-base font-normal text-customGold pb-4">
                    MANY MORE
                  </p>
                  <ShopNowButton />
                </div>
                <img
                  src="/half-car.svg"
                  alt="car"
                  className="w-full min-w-[235px] h-auto"
                />
              </div>
            </div>
          </section>
          {/* New Arrivals */}
          <NewArrivals />
          <section className="flex flex-col lg:flex-row justify-between items-center gap-6 py-6">
            <div
              className="w-full h-[158px] md:h-[273px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/car-engine.jpeg')" }}
            >
             <ShopNowButton />
            </div>
            <div className="bg-primary flex flex-col items-center justify-center w-full h-[158px] md:h-[273px]">
              <p className="text-base text-white font-normal">ONLY THIS WEEK</p>
              <p className="text-4xl text-white font-bold">HUGE SALES</p>
            </div>
            <div
              className="w-full h-[158px] md:h-[273px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/car-engine.jpeg')" }}
            >
            <ShopNowButton />
            </div>
          </section>
          {/* Featured Products */}
          <FeaturedProducts />
          <section className="flex flex-col lg:flex-row justify-between items-center gap-6 py-6">
            <div
              className="w-full h-[158px] md:h-[273px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/car-engine.jpeg')" }}
            >
             <ShopNowButton />
            </div>
            <div className="bg-primary flex flex-col items-center justify-center w-full h-[158px] md:h-[273px]">
              <p className="text-base text-white font-normal">ONLY THIS WEEK</p>
              <p className="text-4xl text-white font-bold">HUGE SALES</p>
            </div>
            <div
              className="w-full h-[158px] md:h-[273px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/car-engine.jpeg')" }}
            >
             <ShopNowButton />
            </div>
          </section>
          {/* Deals of the day */}
          <DealsOfTheDay />
        </div>
      </main>
    </div>
  );
};

export default HomeGuest;
