import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
// import required modules
import { FreeMode } from "swiper/modules";
import Navbar from "../../../components/Navbar";
import ProductCard from "./components/ProductCard";
import DealsCard from "./components/DealsCard";

const HomeGuest = () => {
  return (
    <div className="pb-16">
      <Navbar />
      <div className="px-10">
        {/* Hero content */}
        <section className="bg-white pr-8">
          <div className="flex justify-between w-full items-center bg-customLight pt-0">
            <div className="bg-white flex items-center justify-between w-full h-3/4 pl-14 ml-0 overflow-hidden">
              <div>
                <p className="text-sm text-customBrown font-normal pb-6">
                  WELCOME TO SOLID SPARE PARTS
                </p>
                <h1 className="text-4xl text-customBrown font-semibold w-80 leading-tight pb-8">
                  Quality Auto Spare Parts at a go!
                </h1>
                <button className="border h-12 w-28 rounded-lg bg-primary text-white text-sm font-semibold">
                  Shop Now
                </button>
              </div>
              <div className="flex-shrink-0">
                <img src="/car-header.svg" alt="car" className="w-[580px]" />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 pl-5">
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
        <main>
          {/* Popular Vehicle type */}
          <section className="py-8">
            <div className="flex justify-between items-center pb-6">
              <div className="flex gap-0 items-center">
                <img src="/double-right.svg" alt="right" />
                <h2 className="text-2xl text-customGray1 font-semibold">
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
              <div className="flex flex-col items-center">
                <img src="/trucks.svg" alt="trucks" />
                <p className="text-sm text-customBrown font-normal pt-4">
                  Trucks
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/equip-heavy.svg" alt="heavy-equipment" />
                <p className="text-sm text-customBrown font-normal pt-4">
                  Heavy Equipment and Machinery
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/tricycles.svg" alt="tricycle" />
                <p className="text-sm text-customBrown font-normal pt-4">
                  Tricycles
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/buses.svg" alt="buses" />
                <p className="text-sm text-customBrown font-normal pt-4">
                  Buses
                </p>
              </div>
            </div>
          </section>
          <section className="flex justify-between gap-4 py-1">
            <div className="w-full">
              <div className="inline-flex bg-black items-center gap-4 pl-7">
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
                <img src="/half-car.svg" alt="car" className="w-auto h-auto" />
              </div>
            </div>
            <div className="w-full">
              <div className="inline-flex bg-black items-center gap-4 pl-7">
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
                <img src="/half-car.svg" alt="car" className="w-auto h-auto" />
              </div>
            </div>
          </section>
          {/* New Arrivals */}
          <section>
            <div className="flex justify-between items-center py-6">
              <div className="flex gap-0 items-center">
                <img src="/double-right.svg" alt="right" />
                <h2 className="text-2xl text-customGray1 font-semibold">
                  New Arivals
                </h2>
              </div>
              <ul className="flex gap-6 items-center text-xs font-semibold text-customGray1">
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
            <Swiper
              slidesPerView={5.5} // Show 5 full slides + half of another
              spaceBetween={0} // Reduce space to prevent unexpected gaps
              freeMode={true}
              pagination={{ clickable: true }}
              modules={[FreeMode]}
              className="w-full"
              breakpoints={{
                320: { slidesPerView: 2.5 }, // Small phones
                640: { slidesPerView: 3 }, // Small tablets
                768: { slidesPerView: 4 }, // Tablets
                1024: { slidesPerView: 6 }, // Desktops
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
          <section className="flex justify-between items-center gap-6 py-6">
            <div className="w-full">
              <img src="/car-engine.svg" alt="car-engine" className="h-[273px]" />
            </div>
            <div className="bg-primary flex flex-col items-center justify-center w-full h-[273px]">
              <p className="text-base text-white font-normal">ONLY THIS WEEK</p>
              <p className="text-4xl text-white font-bold">HUGE SALES</p>
            </div>
            <div className="w-full">
            <img src="/car-engine.svg" alt="car-engine" className="h-[273px]" />
            </div>
          </section>
          {/* Featured Products */}
          <section>
            <div className="flex justify-between items-center py-6">
              <div className="flex gap-0 items-center">
                <img src="/double-right.svg" alt="right" />
                <h2 className="text-2xl text-customGray1 font-semibold">
                  Featured Products
                </h2>
              </div>
              <ul className="flex gap-6 items-center text-xs font-semibold text-customGray1">
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
            <Swiper
              slidesPerView={6}
              spaceBetween={0}
              freeMode={true}
              pagination={{ clickable: true }}
              modules={[FreeMode]}
              className="w-full mb-4"
              breakpoints={{
                320: { slidesPerView: 2.5 }, // Small phones
                640: { slidesPerView: 3 }, // Small tablets
                768: { slidesPerView: 4 }, // Tablets
                1024: { slidesPerView: 6 }, // Desktops
              }}
            >
              <SwiperSlide className="p-12">
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
            <Swiper
              slidesPerView={6}
              spaceBetween={0}
              freeMode={true}
              pagination={{ clickable: true }}
              modules={[FreeMode]}
              className="w-full"
              breakpoints={{
                320: { slidesPerView: 2.5 }, // Small phones
                640: { slidesPerView: 3 }, // Small tablets
                768: { slidesPerView: 4 }, // Tablets
                1024: { slidesPerView: 6 }, // Desktops
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
          <section className="flex justify-between items-center gap-6 py-6">
            <div className="w-full">
            <img src="/car-engine.svg" alt="car-engine" className="h-[273px]" />
            </div>
            <div className="bg-primary flex flex-col items-center justify-center w-full h-[273px]">
              <p className="text-base text-white font-normal">ONLY THIS WEEK</p>
              <p className="text-4xl text-white font-bold">HUGE SALES</p>
            </div>
            <div className="w-full">
            <img src="/car-engine.svg" alt="car-engine" className="h-[273px]" />
            </div>
          </section>
          {/* Deals of the day */}
          <section>
            <div className="flex justify-between items-center py-6">
              <div className="flex gap-0 items-center">
                <img src="/double-right.svg" alt="right" />
                <h2 className="text-2xl text-customGray1 font-semibold">
                  Featured Products
                </h2>
              </div>
              <ul className="flex gap-6 items-center">
                <li>
                  <img src="/arrow-right.svg" alt="right" />
                </li>
                <li>
                <img src="/arrow-right.svg" alt="right" />
                </li>
              </ul>
            </div>
            <div className="flex justify-between gap-4">
              <DealsCard
                image="/tyres.svg"
                title="Shock Absorber"
                category="PERFORMANCE PARTS"
                price="N60,000.00"
                oldPrice="N80,000.00"
                discount="-18%"
                reviews="88"
              />
              <DealsCard
               image="/tyres.svg"
                title="Shock Absorber"
                category="PERFORMANCE PARTS"
                price="N60,000.00"
                oldPrice="N80,000.00"
                discount="-18%"
                reviews="88"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomeGuest;
