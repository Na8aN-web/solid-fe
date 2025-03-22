import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import DealsCard from './DealsCard';

const DealsOfTheDay = () => {
  return (
    <section className="relative py-[20px] px-[20px] md:px-[80px]">
      <div className="flex justify-between items-center py-6">
        <div className="flex gap-0 items-center">
          <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
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
            1280: { slidesPerView: 2 },
          }}
        >
          {Array(4).fill(null).map((_, index) => (
            <SwiperSlide key={index}>
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
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
