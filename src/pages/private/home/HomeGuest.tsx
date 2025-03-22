import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/grid";
import "./styles.css";
// import required modules
import { Grid, FreeMode, Navigation } from "swiper/modules";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import DealsCard from "./components/DealsCard";

const HomeGuest = () => {
  return (
    <div className="pb-16">
      <Navbar />
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
                  <button className="border h-12 w-28 rounded-lg bg-primary text-white text-sm font-semibold">
                    Shop Now
                  </button>
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
          <section className="py-8">
            <div className="flex justify-between items-center pb-2 sm:pb-6">
              <div className="flex gap-0 items-center">
                <img
                  src="/double-right.svg"
                  alt="right"
                  className="w-9 md:w-16"
                />
                <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
                  Popular Vehicles Types
                </h2>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-base font-semibold text-customGray1">
                  See All
                </p>
                <img src="/arrow-right.svg" alt="right" />
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
                  <button className="bg-primary text-white w-28 h-12 rounded-lg text-base">
                    Shop Now
                  </button>
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
                  <button className="bg-primary text-white w-28 h-12 rounded-lg">
                    Shop Now
                  </button>
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
          <section>
            <div className="flex justify-between items-center py-6">
              <div className="flex gap-0 items-center">
                <img
                  src="/double-right.svg"
                  alt="right"
                  className="w-9 md:w-16"
                />
                <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
                  New Arrivals
                </h2>
              </div>
              <div className="block lg:hidden">
                <button className="flex items-center justify-center gap-2 bg-primary text-white w-20 sm:w-28 h-12 rounded-lg text-base">
                  <img src="/filter-solid.svg" alt="" />
                  Filter
                </button>
              </div>
              <div className="hidden lg:block">
                <ul className="flex gap-4 lg:gap-6 items-center text-xs font-semibold text-customGray1 text-center">
                  <li className="bg-primary p-2 rounded-lg text-white">
                    Passengers Cars
                  </li>
                  <li>SUVs and Crossover</li>
                  <li>Trucks</li>
                  <li>Buses</li>
                  <li>Keke(Tricyles)</li>
                  <li>Motorcycles</li>
                  <li>Heavy Machinery</li>
                </ul>
              </div>
            </div>
            <Swiper
              slidesPerView={2.2} // Shows part of the next slide
              spaceBetween={15} // Adjust spacing
              freeMode={true}
              pagination={{ clickable: true }}
              modules={[FreeMode]}
              className="w-full"
              breakpoints={{
                640: { slidesPerView: 3.3, spaceBetween: 20 }, // Small tablets
                768: { slidesPerView: 4.3, spaceBetween: 20 }, // Tablets
                1280: { slidesPerView: 6, spaceBetween: 20 }, // Desktops
              }}
            >
              <SwiperSlide>
                <ProductCard
                  image="/shock-absorber.svg"
                  title="Shock Absorber"
                  category="PERFORMANCE PARTS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/fuel-pump.svg"
                  title="Fuel Pump"
                  category="REPAIR PARTS"
                  price="N60,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/tyres.svg"
                  title="Michellene Tyres"
                  category="WHEELS & TYRES"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/fuel-filter.svg"
                  title="Fuel Filter"
                  category="FILTERS"
                  price="N60,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/performance-exhaust.svg"
                  title="Performance Exhaust System"
                  category="PERFORMANCE PARTS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/radiator.svg"
                  title="Radiator"
                  category="COOLING & HEATING SYSTEMS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  reviews="88"
                />
              </SwiperSlide>
            </Swiper>
          </section>
          <section className="flex flex-col lg:flex-row justify-between items-center gap-6 py-6">
            <div
              className="w-full h-[158px] md:h-[273px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/car-engine.jpeg')" }}
            >
              <button className="bg-primary text-white w-28 h-12 rounded-lg text-base">
                Shop Now
              </button>
            </div>
            <div className="bg-primary flex flex-col items-center justify-center w-full h-[158px] md:h-[273px]">
              <p className="text-base text-white font-normal">ONLY THIS WEEK</p>
              <p className="text-4xl text-white font-bold">HUGE SALES</p>
            </div>
            <div
              className="w-full h-[158px] md:h-[273px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/car-engine.jpeg')" }}
            >
              <button className="bg-primary text-white w-28 h-12 rounded-lg text-base">
                Shop Now
              </button>
            </div>
          </section>
          {/* Featured Products */}
          <section>
            <div className="flex justify-between items-center py-6">
              <div className="flex gap-0 items-center">
                <img
                  src="/double-right.svg"
                  alt="right"
                  className="w-9 md:w-16"
                />
                <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
                  Featured Products
                </h2>
              </div>
              <div className="block lg:hidden">
                <button className="flex items-center justify-center gap-2 bg-primary text-white w-20 sm:w-28 h-12 rounded-lg text-base">
                  <img src="/filter-solid.svg" alt="" />
                  Filter
                </button>
              </div>
              <div className="hidden lg:block">
                <ul className="flex gap-4 lg:gap-6 items-center text-xs font-semibold text-customGray1 text-center">
                  <li className="bg-primary p-2 rounded-lg text-white">
                    Passengers Cars
                  </li>
                  <li>SUVs and Crossover</li>
                  <li>Trucks</li>
                  <li>Buses</li>
                  <li>Keke(Tricyles)</li>
                  <li>Motorcycles</li>
                  <li>Heavy Machinery</li>
                </ul>
              </div>
            </div>
            <Swiper
              modules={[Navigation, Grid]}
              navigation={false}
              spaceBetween={20}
              slidesPerView={2.2}
              grid={{ rows: 2, fill: "row" }}
              className="w-full"
              breakpoints={{
                640: { slidesPerView: 3.3, spaceBetween: 20 }, // Small tablets
                768: { slidesPerView: 4.3, spaceBetween: 20 }, // Tablets
                1280: { slidesPerView: 6, spaceBetween: 20 }, // Desktops
              }}
            >
              <SwiperSlide>
                <ProductCard
                  image="/shock-absorber.svg"
                  title="Shock Absorber"
                  category="PERFORMANCE PARTS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/fuel-pump.svg"
                  title="Fuel Pump"
                  category="REPAIR PARTS"
                  price="N60,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/tyres.svg"
                  title="Michellene Tyres"
                  category="WHEELS & TYRES"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/fuel-filter.svg"
                  title="Fuel Filter"
                  category="FILTERS"
                  price="N60,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/performance-exhaust.svg"
                  title="Performance Exhaust System"
                  category="PERFORMANCE PARTS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/radiator.svg"
                  title="Radiator"
                  category="COOLING & HEATING SYSTEMS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/shock-absorber.svg"
                  title="Shock Absorber"
                  category="PERFORMANCE PARTS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/fuel-pump.svg"
                  title="Fuel Pump"
                  category="REPAIR PARTS"
                  price="N60,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/tyres.svg"
                  title="Michellene Tyres"
                  category="WHEELS & TYRES"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/fuel-filter.svg"
                  title="Fuel Filter"
                  category="FILTERS"
                  price="N60,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/performance-exhaust.svg"
                  title="Performance Exhaust System"
                  category="PERFORMANCE PARTS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/radiator.svg"
                  title="Radiator"
                  category="COOLING & HEATING SYSTEMS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/shock-absorber.svg"
                  title="Shock Absorber"
                  category="PERFORMANCE PARTS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/fuel-pump.svg"
                  title="Fuel Pump"
                  category="REPAIR PARTS"
                  price="N60,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/tyres.svg"
                  title="Michellene Tyres"
                  category="WHEELS & TYRES"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/fuel-filter.svg"
                  title="Fuel Filter"
                  category="FILTERS"
                  price="N60,000.00"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/performance-exhaust.svg"
                  title="Performance Exhaust System"
                  category="PERFORMANCE PARTS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  discount="-18%"
                  reviews="88"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  image="/radiator.svg"
                  title="Radiator"
                  category="COOLING & HEATING SYSTEMS"
                  price="N60,000.00"
                  oldPrice="N80,000.00"
                  reviews="88"
                />
              </SwiperSlide>
            </Swiper>
          </section>
          <section className="flex flex-col lg:flex-row justify-between items-center gap-6 py-6">
            <div
              className="w-full h-[158px] md:h-[273px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/car-engine.jpeg')" }}
            >
              <button className="bg-primary text-white w-28 h-12 rounded-lg text-base">
                Shop Now
              </button>
            </div>
            <div className="bg-primary flex flex-col items-center justify-center w-full h-[158px] md:h-[273px]">
              <p className="text-base text-white font-normal">ONLY THIS WEEK</p>
              <p className="text-4xl text-white font-bold">HUGE SALES</p>
            </div>
            <div
              className="w-full h-[158px] md:h-[273px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/car-engine.jpeg')" }}
            >
              <button className="bg-primary text-white w-28 h-12 rounded-lg text-base">
                Shop Now
              </button>
            </div>
          </section>
          {/* Deals of the day */}
          <section className="relative">
            <div className="flex justify-between items-center py-6">
              <div className="flex gap-0 items-center">
                <img
                  src="/double-right.svg"
                  alt="right"
                  className="w-9 md:w-16"
                />
                <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
                  Deals of the Day
                </h2>
              </div>
              <div className="flex gap-3">
                <button className="custom-prev w-9 h-9 bg-white rounded-full border">
                  ❮
                </button>
                <button className="custom-next w-9 h-9 bg-white rounded-full border">
                  ❯
                </button>
              </div>
            </div>
            <div>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                modules={[Navigation]}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                className="mySwiper"
                breakpoints={{
                  // 320: { slidesPerView: 1 }, // Small phones
                  // 640: { slidesPerView: 1 }, // Small tablets
                  // 768: { slidesPerView: 2 }, // Tablets
                  1280: { slidesPerView: 2 }, // Desktops
                }}
              >
                <SwiperSlide>
                  <DealsCard
                    image="/tyres.svg"
                    title="Shock Absorber"
                    category="PERFORMANCE PARTS"
                    price="N60,000.00"
                    oldPrice="N80,000.00"
                    discount="-18%"
                    reviews="88"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <DealsCard
                    image="/tyres.svg"
                    title="Shock Absorber"
                    category="PERFORMANCE PARTS"
                    price="N60,000.00"
                    oldPrice="N80,000.00"
                    discount="-18%"
                    reviews="88"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <DealsCard
                    image="/tyres.svg"
                    title="Shock Absorber"
                    category="PERFORMANCE PARTS"
                    price="N60,000.00"
                    oldPrice="N80,000.00"
                    discount="-18%"
                    reviews="88"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <DealsCard
                    image="/tyres.svg"
                    title="Shock Absorber"
                    category="PERFORMANCE PARTS"
                    price="N60,000.00"
                    oldPrice="N80,000.00"
                    discount="-18%"
                    reviews="88"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomeGuest;
