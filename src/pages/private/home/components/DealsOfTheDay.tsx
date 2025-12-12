import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import DealsCard from "./DealsCard";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addProductToCart } from "../../../../store/slices/cartSlice";
import { dealsOfTheDay } from "../../../../store/slices/productSlice";
import SuccessModal from "../../../../components/SuccessModal";
import { RootState } from "../../../../store";
import SectionHeading from "../../../public/home/components/SectionHeading";

const DealsOfTheDay = () => {
  const dispatch = useAppDispatch();

  // Redux State
  const {
    dealsOfTheDay: dealProducts,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.products);

  const { loading: cartLoading } = useAppSelector(
    (state: RootState) => state.cart
  );

  // Local State
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Fetch deals on mount
  useEffect(() => {
    if (!dealProducts || dealProducts.length === 0) {
      dispatch(dealsOfTheDay());
    }
  }, [dispatch, dealProducts]);

  const handleAddToCart = useCallback(
    async (productId: string, productName: string) => {
      const product = dealProducts?.find((p) => p._id === productId);
  
      if (!product) {
        console.error("Product not found");
        return;
      }
  
      const productData = {
        _id: product._id,
        name: product.name,
        images: [product.image],
        salesPrice: product.displayPrice,
        displayPrice: product.displayPrice,
        regularPrice: product.regularPrice,
        stockStatus: "In Stock",
        brand: {
          _id: `brand-${product.brandName.toLowerCase().replace(/\s+/g, "-")}`,
          name: product.brandName,
        },
        category: {
          _id: product.category,
          name: product.categoryName,
        },
        maker: product.brandName,
      };
  
      try {
        setAddingProductId(productId); // Set loading state
        await dispatch(
          addProductToCart({
            productId,
            quantity: 1,
            productData,
          })
        ).unwrap();
  
        setLastAddedProduct({ id: productId, name: productName });
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Failed to add product to cart:", error);
      } finally {
        setAddingProductId(null); // Clear loading state
      }
    },
    [dispatch, dealProducts]
  );

  const handleViewCart = useCallback(() => {
    setShowSuccessModal(false);
    window.location.href = "/cart";
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowSuccessModal(false);
    setLastAddedProduct(null);
  }, []);

  // Calculate discount percentage
  const calculateDiscount = useCallback(
    (regularPrice: number, displayPrice: number): number => {
      if (regularPrice <= 0) return 0;
      return Math.round(((regularPrice - displayPrice) / regularPrice) * 100);
    },
    []
  );

  // Check if we have valid products
  const hasProducts = useMemo(
    () => dealProducts && dealProducts.length > 0,
    [dealProducts]
  );

  // Loading State
  if (loading) {
    return (
      <section className="relative py-[20px]">
        <SectionHeading title="Deals of the Day" />
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="relative py-[20px]">
        <SectionHeading title="Deals of the Day" />
        <div className="flex justify-center items-center py-12">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  // Empty State
  if (!hasProducts) {
    return (
      <section className="py-8 px-5 md:px-20">
        <SectionHeading title="Deals of the Day" />
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">No deals available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-[20px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 gap-4">
          <SectionHeading title="Deals of the Day" />

          {/* Navigation Controls */}
          <nav className="flex gap-3" aria-label="Deals navigation">
            <button
              className="custom-prev w-9 h-9 bg-white rounded-full border hover:bg-gray-50 transition-colors"
              aria-label="Previous deals"
            >
              ◀
            </button>
            <button
              className="custom-next w-9 h-9 bg-white rounded-full border hover:bg-gray-50 transition-colors"
              aria-label="Next deals"
            >
              ▶
            </button>
          </nav>
        </div>

        <div className="h-auto">
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            // className="mySwiper"
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 1.5, spaceBetween: 24 },
              1024: { slidesPerView: 1, spaceBetween: 24 },
              1280: { slidesPerView: 2, spaceBetween: 30 },
            }}
            className="deals-swiper"
            a11y={{
              prevSlideMessage: "Previous deal",
              nextSlideMessage: "Next deal",
            }}
          >
            {dealProducts.map((product) => {
              const discount = calculateDiscount(
                product.regularPrice,
                product.displayPrice
              );

              return (
                <SwiperSlide key={product._id}>
                  <DealsCard
                    image={product.image}
                    title={product.name}
                    category={product.categoryName || product.brandName}
                    price={`₦${product.displayPrice.toLocaleString()}`}
                    oldPrice={`₦${product.regularPrice.toLocaleString()}`}
                    discount={discount > 0 ? `-${discount}%` : ""}
                    reviews={product.numReviews?.toString() || "0"}
                    productId={product._id}
                    onAddToCart={handleAddToCart}
                    cartLoading={cartLoading}
                    addingProductId={addingProductId}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onViewCart={handleViewCart}
        productName={lastAddedProduct?.name}
      />
    </>
  );
};

export default DealsOfTheDay;
