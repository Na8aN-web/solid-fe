import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "../styles.css";
import { Grid, Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getRecentlyViewed } from "../../../../store/slices/userSlice";
import { fetchProductById } from "../../../../store/slices/productSlice";
import { Product } from "../../../../services/products/types";

const Recents = () => {
  const dispatch = useAppDispatch();
  const { recentlyViewed, loading } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch recently viewed product IDs
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getRecentlyViewed());
    }
  }, [dispatch, isAuthenticated]);

  // Fetch full product details for each recently viewed product
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (recentlyViewed.length === 0) {
        setRecentProducts([]);
        return;
      }

      setLoadingProducts(true);
      try {
        // Fetch details for each product ID
        const productPromises = recentlyViewed.map((productId) =>
          dispatch(fetchProductById(productId)).unwrap()
        );

        const results = await Promise.all(productPromises);

        // Extract products from results (results have { product: Product } structure)
        const products = results
          .map((result) => result.product)
          .filter(Boolean);
        setRecentProducts(products);
      } catch (error) {
        console.error("Failed to fetch recently viewed products:", error);
        setRecentProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProductDetails();
  }, [recentlyViewed, dispatch]);

   // Don't show section if user is not authenticated or no products
   if (!isAuthenticated || recentProducts.length === 0) {
    return null;
  }

   // Show loading state
   if (loading || loadingProducts) {
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
          <div className="flex items-center justify-center py-10">
            <p className="text-gray-500">Loading recently viewed products...</p>
          </div>
        </section>
      </div>
    );
  }

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
          grid={{ rows: 2, fill: "row" }}
          className="w-full"
          breakpoints={{
            375: { slidesPerView: 2.2, spaceBetween: 15 }, // Small tablets
            640: { slidesPerView: 3.3, spaceBetween: 20 }, // Small tablets
            768: { slidesPerView: 4.3, spaceBetween: 20 }, // Tablets
            1280: { slidesPerView: 6, spaceBetween: 20 }, // Desktops
          }}
        >
        {recentProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard
                image={product.image || (product.image?.[0] || "/placeholder.png")}
                title={product.name}
                category={product.categoryName || product.category}
                price={`₦${product.salesPrice?.toLocaleString() || product.displayPrice?.toLocaleString()}`}
                oldPrice={
                  product.regularPrice && product.regularPrice > product.salesPrice
                    ? `₦${product.regularPrice.toLocaleString()}`
                    : undefined
                }
                discount={
                  product.discount
                    ? `-${product.discount}%`
                    : undefined
                }
                reviews={product.numReviews?.toString() || "0"}
                productId={product._id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Recents;
