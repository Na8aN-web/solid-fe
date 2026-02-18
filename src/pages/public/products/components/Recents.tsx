import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "../styles.css";
import { Grid, Navigation } from "swiper/modules";

import ProductCard from "../../../private/home/components/ProductCard";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getRecentlyViewed } from "../../../../store/slices/userSlice";
import { Product } from "../../../../services/products/types";

const Recents = () => {
  const dispatch = useAppDispatch();
  const { recentlyViewed, loading } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getRecentlyViewed());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated || loading) return null;
  if (!Array.isArray(recentlyViewed) || recentlyViewed.length === 0)
    return null;

  return (
    <div className="px-4">
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
          grid={{ rows: 1, fill: "row" }}
          className="w-full"
          breakpoints={{
            375: { slidesPerView: 2.2, spaceBetween: 15 },
            640: { slidesPerView: 3.3, spaceBetween: 20 },
            768: { slidesPerView: 4.3, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {recentlyViewed.map((product: Product & { images?: string[] }) => {
            const discount =
              product.regularPrice && product.salesPrice
                ? Math.round(
                    ((product.regularPrice - product.salesPrice) /
                      product.regularPrice) *
                      100,
                  )
                : null;

            return (
              <SwiperSlide key={product._id}>
                <ProductCard
                  productId={product._id}
                  image={product.images?.[0] || ""} // use first image from array
                  title={product.name}
                  category={product.category}
                  displayPrice={product.displayPrice}
                  regularPrice={product.regularPrice}
                  discount={discount ? `${discount}%` : undefined}
                  numReviews={product.numReviews}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </div>
  );
};

export default Recents;
