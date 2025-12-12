import React from "react";
import SectionHeading from "./SectionHeading";
import belle from "../../../../assets/belle.svg";
import dole from "../../../../assets/dole.png";
import panda from "../../../../assets/panda.png";
import domino from "../../../../assets/dominos.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Navigation, Grid, Autoplay } from "swiper/modules";

const manufacturerLogos = [
  { name: "Belle", logo: belle },
  { name: "Dole", logo: dole },
  { name: "Panda", logo: panda },
  { name: "Domino's", logo: domino },
];

const manufacturers = Array(12)
  .fill(null)
  .map((_, index) => manufacturerLogos[index % manufacturerLogos.length]);

const ManufacturersGrid: React.FC = () => {
  return (
    <div className="bg-[#F3F3F3] pt-[30px] pb-[50px]">
      <div className="px-[20px] md:px-[80px] pb-2">
        <SectionHeading title="Some of Our Partners" />
      </div>

      <div>
        <Swiper
          modules={[Navigation, Grid, Autoplay]}
          navigation={false}
          slidesPerView={2}
          spaceBetween={15}
          grid={{ rows: 1, fill: "row" }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="w-full"
          breakpoints={{
            375: { slidesPerView: 2.2, spaceBetween: 15 },
            640: { slidesPerView: 3.3, spaceBetween: 20 },
            768: { slidesPerView: 4.3, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {manufacturers.map((manufacturer, index) => (
            <SwiperSlide key={index}>
              <div className="w-full py-2 flex items-center justify-center h-32 hover:shadow-lg transition-shadow duration-300">
                <img
                  src={manufacturer.logo}
                  alt={manufacturer.name}
                  className="w-full max-h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ManufacturersGrid;
