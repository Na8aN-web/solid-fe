import { useState, useEffect } from "react";
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
import { featuredProducts } from "../../../../store/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import LoaderSpinner from "../../../../components/LoaderSpinner";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useAppDispatch();

  const featProducts = useAppSelector(
    (state) => state.products.featuredProducts ?? []
  );

  const loading = useAppSelector((state) => state.products.loading);
  // const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(featuredProducts());
  }, [dispatch]);

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
            <img src="/double-right.svg" alt="right" className="w-9 md:w-16" />
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
            <ul className="flex gap-4 lg:gap-3 items-center text-xs font-semibold text-customGray1 text-center">
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <LoaderSpinner />
            </div>
          ) : (
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
              {featProducts.map((product) => {
                const discount =
                  ((product.regularPrice - product.displayPrice) /
                    product.regularPrice) *
                  100;
                const formattedDiscount = `${Math.round(discount)}%`;
                return (
                  <SwiperSlide key={product._id}>
                    {/* <Link to={`/product/${product._id}`}> */}
                      <ProductCard
                        productId={product._id}
                        image={product.image}
                        title={product.name}
                        category={product.category}
                        rating={product.rating}
                        price={`₦${Math.floor(product.displayPrice)}.00`}
                        oldPrice={`₦${Math.floor(product.regularPrice)}.00`}
                        discount={formattedDiscount}
                        numReviews={product.numReviews}
                      />
                    {/* </Link> */}
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

export default FeaturedProducts;
