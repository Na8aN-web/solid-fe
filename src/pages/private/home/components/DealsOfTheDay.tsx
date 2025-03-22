import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../styles.css";
// import required modules
import { Navigation } from "swiper/modules";
import DealsCard from "./DealsCard";


const DealsOfTheDay = () => {
  return (
    <div>
      <section className="relative">
        <div className="flex justify-between items-center py-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.svg" alt="right" className="w-9 md:w-16" />
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
  );
};

export default DealsOfTheDay;
