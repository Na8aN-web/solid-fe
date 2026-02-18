import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "../styles.css";
import { Navigation, Grid } from "swiper/modules";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { newProducts } from "../../../../store/slices/productSlice";
import LoaderSpinner from "../../../../components/LoaderSpinner";
import { addProductToCart } from "../../../../store/slices/cartSlice";
import SuccessModal from "../../../../components/SuccessModal";

export interface Product {
  _id: string;
  name: string;
  category: string;
  images: string;
  salesPrice: number;
  regularPrice: number;
  discount?: number;
  numReviews?: number;
  displayPrice?: number;
}

const NewArrivals = () => {
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const newArrivals = useAppSelector(
    (state) => state.products.newArrivals ?? [],
  );

  const loading = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(newProducts());
  }, [dispatch]);

  // Extract unique display names from featured products
  const uniqueCategories = Array.from(
    new Set(newArrivals.map((product) => product.categoryName)),
  ).filter(Boolean); // remove null/undefined if any

  // filter featured products by active categoryName
  const filteredProducts = activeCategory
    ? newArrivals.filter((product) => product.categoryName === activeCategory)
    : newArrivals;

  const handleAddToCart = async (productId: string, productName: string) => {
    const product = newArrivals.find((p) => p._id === productId);

    if (!product) {
      return;
    }

    // Prepare product data for cart
    const productData = {
      _id: product._id,
      name: product.name,
      images: [product.image],
      salesPrice: product.displayPrice,
      displayPrice: product.displayPrice,
      regularPrice: product.regularPrice,
      stockStatus: "In Stock",
      brand: {
        _id: `brand-${product.brandName?.toLowerCase().replace(/\s+/g, "-")}`,
        name: product.brandName,
      },
      maker: product.brandName,
    };

    try {
      setAddingProductId(productId);
      await dispatch(
        addProductToCart({
          productId,
          quantity: 1,
          productData,
        }),
      ).unwrap();

      // Show success modal
      setLastAddedProduct({ id: productId, name: productName });
      setShowSuccessModal(true);
    } catch {
    } finally {
      setAddingProductId(null);
    }
  };

  const handleViewCart = () => {
    setShowSuccessModal(false);
    // Navigate to cart page
    window.location.href = "/cart";
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setLastAddedProduct(null);
  };

  return (
    <div>
      <section className="mb-2">
        <div className="flex justify-between items-center py-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.svg" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              New Arrivals
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
              <li
                onClick={() => setActiveCategory(null)}
                className={`p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeCategory === null
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                All
              </li>

              {uniqueCategories.map((categoryName, index) => (
                <li
                  key={index}
                  onClick={() => setActiveCategory(categoryName)}
                  className={`p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeCategory === categoryName
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {categoryName}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <LoaderSpinner txt="New Arivals" />
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Grid]}
              navigation={false}
              slidesPerView={2}
              spaceBetween={15}
              grid={{ rows: 1, fill: "row" }}
              className="w-full"
              breakpoints={{
                375: { slidesPerView: 2.2, spaceBetween: 15 }, // Small tablets
                640: { slidesPerView: 3.3, spaceBetween: 20 }, // Small tablets
                768: { slidesPerView: 4.3, spaceBetween: 20 }, // Tablets
                1280: { slidesPerView: 6, spaceBetween: 20 }, // Desktops
              }}
            >
              {filteredProducts.map((product) => {
                const discount =
                  ((product.regularPrice - product.displayPrice) /
                    product.regularPrice) *
                  100;
                const formattedDiscount = `${Math.round(discount)}%`;
                return (
                  <SwiperSlide key={product._id}>
                    <ProductCard
                      productId={product._id}
                      image={product.image}
                      title={product.name}
                      category={product.categoryName}
                      rating={product.rating}
                      displayPrice={product.displayPrice}
                      regularPrice={product.regularPrice}
                      discount={formattedDiscount}
                      numReviews={product.numReviews}
                      onAddToCart={handleAddToCart}
                      cartLoading={addingProductId !== null}
                      addingProductId={addingProductId}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </section>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onViewCart={handleViewCart}
        productName={lastAddedProduct?.name}
      />
    </div>
  );
};

export default NewArrivals;
