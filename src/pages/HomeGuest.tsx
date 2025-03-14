// import React from "react";
import arrowRight from "../images/arrowright.svg";
import doubleRight from "../images/double-right.svg";
import passengerCars from "../images/passenger-car.svg";
import suvs from "../images/suvs.svg";
import trucks from "../images/trucks.svg";
import heavy from "../images/equip-heavy.svg";
import tricycles from "../images/tricycles.svg";
import buses from "../images/buses.svg";
import shockAbsorb from "../images/shock-absorber.svg";
import fuelPump from "../images/fuel-pump.svg";
import tyres from "../images/tyres.svg";
import fuelFilter from "../images/fuel-filter.svg";
import exhaust from "../images/performance-exhaust.svg";
import radiator from "../images/radiator.svg";
import carEngine from "../images/car-engine.svg";
import halfCar from "../images/half-car.svg";
import ProductCard from "../product/ProductCard";
import DealsCard from "../product/DealsCard";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

const HomeGuest = () => {
  return (
    <div className="px-10 py-16">
      <main>
        {/* Popular Vehicle type */}
        <section className="py-8">
          <div className="flex justify-between items-center pb-6">
            <div className="flex gap-0 items-center">
              <img src={doubleRight} alt="" />
              <h2 className="text-2xl text-customGray1 font-semibold">
                Popular Vehicles Types
              </h2>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-base font-semibold text-customGray1">
                See All
              </p>
              <img src={arrowRight} alt="" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <img src={passengerCars} alt="" />
              <p className="text-sm text-customBrown font-normal pt-4">
                Passengers Cars
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src={suvs} alt="" />
              <p className="text-sm text-customBrown font-normal pt-4">
                SUVs and Crossovers
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src={trucks} alt="" />
              <p className="text-sm text-customBrown font-normal pt-4">
                Trucks
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src={heavy} alt="" />
              <p className="text-sm text-customBrown font-normal pt-4">
                Heavy Equipment and Machinery
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src={tricycles} alt="" />
              <p className="text-sm text-customBrown font-normal pt-4">
                Tricycles
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src={buses} alt="" />
              <p className="text-sm text-customBrown font-normal pt-4">Buses</p>
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
              <img src={halfCar} alt="" className="w-auto h-auto" />
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
              <img src={halfCar} alt="" className="w-auto h-auto" />
            </div>
          </div>
        </section>
        {/* New Arrivals */}
        <section>
          <div className="flex justify-between items-center py-6">
            <div className="flex gap-0 items-center">
              <img src={doubleRight} alt="" />
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
                image={shockAbsorb}
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
                image={fuelPump}
                title="Fuel Pump"
                category="REPAIR PARTS"
                price="N60,000.00"
                reviews="88"
              />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard
                image={tyres}
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
                image={fuelFilter}
                title="Fuel Filter"
                category="FILTERS"
                price="N60,000.00"
                reviews="88"
              />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard
                image={exhaust}
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
                image={radiator}
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
            <img src={carEngine} alt="" className="h-[273px" />
          </div>
          <div className="bg-primary flex flex-col items-center justify-center w-full h-[273px]">
            <p className="text-base text-white font-normal">ONLY THIS WEEK</p>
            <p className="text-4xl text-white font-bold">HUGE SALES</p>
          </div>
          <div className="w-full">
            <img src={carEngine} alt="" className="h-[273px" />
          </div>
        </section>
        {/* Featured Products */}
        <section>
          <div className="flex justify-between items-center py-6">
            <div className="flex gap-0 items-center">
              <img src={doubleRight} alt="" />
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
                image={shockAbsorb}
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
                image={fuelPump}
                title="Fuel Pump"
                category="REPAIR PARTS"
                price="N60,000.00"
                reviews="88"
              />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard
                image={tyres}
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
                image={fuelFilter}
                title="Fuel Filter"
                category="FILTERS"
                price="N60,000.00"
                reviews="88"
              />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard
                image={exhaust}
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
                image={radiator}
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
                image={shockAbsorb}
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
                image={fuelPump}
                title="Fuel Pump"
                category="REPAIR PARTS"
                price="N60,000.00"
                reviews="88"
              />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard
                image={tyres}
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
                image={fuelFilter}
                title="Fuel Filter"
                category="FILTERS"
                price="N60,000.00"
                reviews="88"
              />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard
                image={exhaust}
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
                image={radiator}
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
            <img src={carEngine} alt="" className="h-[273px" />
          </div>
          <div className="bg-primary flex flex-col items-center justify-center w-full h-[273px]">
            <p className="text-base text-white font-normal">ONLY THIS WEEK</p>
            <p className="text-4xl text-white font-bold">HUGE SALES</p>
          </div>
          <div className="w-full">
            <img src={carEngine} alt="" className="h-[273px" />
          </div>
        </section>
        {/* Deals of the day */}
        <section>
          <div className="flex justify-between items-center py-6">
            <div className="flex gap-0 items-center">
              <img src={doubleRight} alt="" />
              <h2 className="text-2xl text-customGray1 font-semibold">
                Featured Products
              </h2>
            </div>
            <ul className="flex gap-6 items-center">
              <li>
                <img src={arrowRight} alt="" />
              </li>
              <li>
                <img src={arrowRight} alt="" />
              </li>
            </ul>
          </div>
          <div className="flex justify-between gap-4">
            <DealsCard
              image={tyres}
              title="Shock Absorber"
              category="PERFORMANCE PARTS"
              price="N60,000.00"
              oldPrice="N80,000.00"
              discount="-18%"
              reviews="88"
            />
            <DealsCard
              image={tyres}
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
  );
};

export default HomeGuest;
