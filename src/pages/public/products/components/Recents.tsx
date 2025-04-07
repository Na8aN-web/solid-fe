import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "../styles.css";
// import required modules
import { Grid, Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";

const Recents = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    "Passengers Cars",
    "SUVs and Crossover",
    "Trucks",
    "Buses",
    "Keke (Tricycles)",
    "Motorcycles",
    "Heavy Machinery",
  ];
  return (
    <div>
      <section>
        <div className="flex justify-between items-center py-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Recently Viewed
            </h2>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Grid]}
          navigation={false}
          slidesPerView={2}
          spaceBetween={15}
          grid={{ rows: 2, fill: "row" }}
          className="w-full"
          breakpoints={{
            375: { slidesPerView: 2.2, spaceBetween: 15 }, // Small tablets
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
    </div>
  );
};

export default Recents;
