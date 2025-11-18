import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../styles.css";
// import required modules
import { Navigation } from "swiper/modules";
import DealsCard from "./DealsCard";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { dealsOfTheDay } from "../../../../store/slices/productSlice";
import LoaderSpinner from "../../../../components/LoaderSpinner";
import { Link } from "react-router-dom";

const DealsOfTheDay = () => {
  const dispatch = useAppDispatch();

  const newDeals = useAppSelector(
    (state) => state.products.dealsOfTheDay ?? []
  );

  const loading = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(dealsOfTheDay());
  }, [dispatch]);

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
          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <LoaderSpinner txt="Deals of the day"/>
            </div>
          ) : (
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
                1280: { slidesPerView: 2 }, // Desktops
              }}
            >
              {newDeals.map((deal) => {
                const discount =
                  ((deal.regularPrice - deal.displayPrice) /
                    deal.regularPrice) *
                  100;
                const formattedDiscount = `${Math.round(discount)}%`;
                return (
                  <SwiperSlide key={deal._id}>
                    <Link to={`/product/${deal._id}`}>
                      <DealsCard
                        productId={deal._id}
                        image={deal.image}
                        title={deal.name}
                        category={deal.categoryName}
                        price={`₦${Math.floor(deal.displayPrice)}.00`}
                        oldPrice={`₦${Math.floor(deal.regularPrice)}.00`}
                        rating={deal.rating}
                        discount={formattedDiscount}
                        reviews={deal.numReviews?.toString()}
                        displayPrice={deal.displayPrice}
                        regularPrice={deal.regularPrice}
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </section>
    </div>
  );
};

export default DealsOfTheDay;
