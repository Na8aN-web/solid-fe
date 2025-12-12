import React, { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import RecommendedProduct from "../../../private/home/components/RecommendedProduct";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchProductById,
  fetchRelatedProducts,
} from "../../../../store/slices/productSlice";
import { Product } from "../types/product";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../../../store/slices/cartSlice";
import { FaStar } from "react-icons/fa";
import LoaderSpinner from "../../../../components/LoaderSpinner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // UI State
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "reviews"
  >("description");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [quantityCount, setQuantityCount] = useState<number>(1);
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

<<<<<<< Updated upstream
  // Redux State
=======
  useEffect(() => {
    // Reset all UI states when product changes
    setActiveTab("description");
    setIsDescriptionOpen(false);
    setIsSpecsOpen(false);
    setIsReviewsOpen(false);
    setQuantityCount(1);
  }, [id]);

  // Your existing useEffect for fetching data
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      dispatch(fetchRelatedProducts(id));
    }
  }, [dispatch, id]);

>>>>>>> Stashed changes
  const product = useAppSelector(
    (state) => state.products.product as Product | null
  );
  const relatedProducts = useAppSelector(
    (state) => state.products.relatedProducts
  );
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);
  const { loading: cartLoading } = useAppSelector((state) => state.cart);

  // Fetch product data
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      dispatch(fetchRelatedProducts(id));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, id]);

<<<<<<< Updated upstream
  // Price Calculations
  const priceCalculations = useMemo(() => {
    if (!product) return null;
=======
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);
>>>>>>> Stashed changes

    const pricePerUnit = product.salesPrice || 0;
    const regularPricePerUnit = product.regularPrice || 0;
    const discountPerUnit = regularPricePerUnit - pricePerUnit;
    const discountPercentage =
      regularPricePerUnit > 0
        ? Math.round((discountPerUnit / regularPricePerUnit) * 100)
        : 0;

    const subtotal = pricePerUnit * quantityCount;
    const totalDiscount = discountPerUnit * quantityCount;
    const total = subtotal;

    return {
      discountPercentage,
      subtotal: Math.floor(subtotal),
      totalDiscount: Math.floor(totalDiscount),
      total: Math.floor(total),
      pricePerUnit: Math.floor(pricePerUnit),
      regularPricePerUnit: Math.floor(regularPricePerUnit),
    };
  }, [product?.salesPrice, product?.regularPrice, quantityCount]);

  // Star Rating Calculation
  const starCount = useMemo(() => {
    const reviews = product?.numReviews || 0;
    if (reviews >= 60) return 5;
    if (reviews >= 30) return 4;
    if (reviews >= 20) return 3;
    if (reviews >= 10) return 2;
    if (reviews >= 1) return 1;
    return 0;
  }, [product?.numReviews]);

  // Handlers

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addProductToCart({
        productId: product._id,
        quantity: quantityCount,
        productData: {
          _id: product._id,
          name: product.name,
          images: product.images || [],
          salesPrice: product.salesPrice,
          displayPrice: product.salesPrice,
          regularPrice: product.regularPrice,
          stockStatus: product.stockStatus,
          brand: product.brand,
          category: product.category,
          maker: product.brand?.name || "Unknown",
        },
      })
    );
  };

  const handleBuyNow = () => {
    if (!product) return;

    dispatch(
      addProductToCart({
        productId: product._id,
        quantity: quantityCount,
      })
    ).then(() => {
      navigate("/cart");
    });
  };

  // Loading and Error States
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoaderSpinner txt="Product" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-red-500">Error loading product: {error}</div>
      </div>
    );
  }

  if (!product || !priceCalculations) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoaderSpinner />
      </div>
    );
  }

<<<<<<< Updated upstream
  // Destructure product data with defaults
=======
  const handleAddToCart = () => {
    if (product) {
      const productData = {
        _id: product._id,
        name: product.name,
        images: product.images || [],
        salesPrice: product.salesPrice,
        displayPrice: product.salesPrice, // Add this for consistency
        regularPrice: product.regularPrice,
        stockStatus: product.stockStatus,
        brand: product.brand,
        category: product.category,
        maker: product.brand?.name || 'Unknown' // Add maker for consistency
      };

      dispatch(
        addProductToCart({
          productId: product._id,
          quantity: quantityCount,
          productData
        })
      );
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(
        addProductToCart({
          productId: product._id,
          quantity: quantityCount,
        })
      ).then(() => {
        navigate("/cart"); // Navigate to cart page
      });
    }
  };

>>>>>>> Stashed changes
  const {
    name = "Unknown Product",
    brand,
    category,
    briefDescription = "No description available",
    fullDescription = "No description available",
    images = [],
    packageSize,
    weight = 0,
    stockStatus = "Unknown",
    quantityInStock = 0,
    rating = 0,
    numReviews = 0,
    material = "Unknown",
    minStock = 0,
    minOrderQuantity = 1,
    store = "Unknown Store",
    sku = "N/A",
    partNumber = "N/A",
    units = "units",
  } = product;

  return (
    <div className="bg-[#F5F5F5] pb-10">
      <section className="lg:px-5 lg:py-4">
        {/* Breadcrumb */}
        <h2 className="py-2 px-5">
          <Link to="/products">
            <img src="/white-left.png" alt="back" />
          </Link>
        </h2>

        <div className="lg:flex lg:gap-6">
          {/* Left Column - Product Details */}
          <div className="py-6 px-4 lg:px-8 flex flex-col lg:w-2/3 gap-6 lg:gap-10 lg:flex-row bg-white lg:rounded-lg">
            {/* Image Gallery */}
            <div className="flex-1">
              <ProductImageGallery images={images} name={name} />
              <ShareSection />
            </div>

            {/* Product Info */}
            <div className="space-y-3 flex-1">
              <h2 className="text-xl text-customBrown">{name}</h2>

              <StarRating rating={starCount} numReviews={numReviews} />
              {/* brand */}
              <p className="text-sm text-customGray3">
                Brand:
                <span className="text-customBrown">{brand?.name}</span>
              </p>

              <PriceDisplay prices={priceCalculations} />

              <StockIndicator quantity={quantityInStock} />
              {/* description */}
              <div>
                <h3 className="text-sm text-shadeGray font-medium pb-2">
                  Description
                </h3>
                <p className="text-sm text-customGray2">{briefDescription}</p>
              </div>

              <DeliveryWarrantyInfo />

              <SellerInformation store={store} />
            </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="py-6 px-4 lg:px-8 bg-white lg:rounded-lg lg:w-1/3 self-start">
            <OrderDetails
              quantityCount={quantityCount}
              setQuantityCount={setQuantityCount}
              prices={priceCalculations}
            />

            <DeliveryReturnsSection />

            <OrderForm
              prices={priceCalculations}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
              cartLoading={cartLoading}
            />
          </div>
        </div>
      </section>

      {/* Product Specifications Tabs */}
      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDescriptionOpen={isDescriptionOpen}
        setIsDescriptionOpen={setIsDescriptionOpen}
        isSpecsOpen={isSpecsOpen}
        setIsSpecsOpen={setIsSpecsOpen}
        isReviewsOpen={isReviewsOpen}
        setIsReviewsOpen={setIsReviewsOpen}
        product={product}
        starCount={starCount}
      />

      <RecommendedProduct relatedProducts={relatedProducts} />
    </div>
  );
};

// Sub-Components
const ProductImageGallery = ({
  images,
  name,
}: {
  images: string[];
  name: string;
}) => (
  <div className="flex flex-col flex-1 items-center gap-16 w-full pt-24">
    <div className="h-[220px] border">
      {images.length > 0 ? (
        <img
          src={images[0]}
          alt={name}
          className="w-[220px] h-[220px] object-fill"
        />
      ) : (
        <div className="w-[220px] h-[220px] flex items-center justify-center bg-gray-100">
          <span>No Image</span>
        </div>
      )}
    </div>
    <div className="flex items-center justify-between w-full">
      {[0, 1, 1].map((index, i) => (
        <div
          key={i}
          className="border px-4 py-4 rounded flex justify-center items-center"
        >
          <img
            src={images[index] || images[0]}
            alt={`${name} thumbnail ${i + 1}`}
            className="w-[65px] h-[65px] object-fill"
          />
        </div>
      ))}
    </div>
  </div>
);

const ShareSection = () => (
  <div className="flex justify-between flex-1 items-center pt-8">
    <p className="text-sm text-customGray3">Share This Product</p>
    <div className="flex gap-2">
      <img src="/facebookshare.svg" alt="Share on Facebook" />
      <img src="/xshare.svg" alt="Share on X" />
      <img src="/whatsappshare.svg" alt="Share on WhatsApp" />
    </div>
  </div>
);

const StarRating = ({
  rating,
  numReviews,
}: {
  rating: number;
  numReviews: number;
}) => {
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            color={index < rating ? "gold" : "lightgrey"}
            className="w-4 h-4"
          />
        ))}
      </div>
      <span className="text-xs text-customGray3">({numReviews} reviews)</span>
    </div>
  );
};

const PriceDisplay = ({ prices }: { prices: any }) => (
  <>
    <p className="text-xl text-customBrown">
      ₦{prices.pricePerUnit}.00
      <span className="text-sm text-customGray3 line-through ml-2">
        ₦{prices.regularPricePerUnit}.00
      </span>
    </p>
    <p className="text-xs text-customGray3">
      You save ₦{prices.totalDiscount} ({prices.discountPercentage}%)
    </p>
  </>
);

const StockIndicator = ({ quantity }: { quantity: number }) => (
  <div className="flex gap-2 items-center">
    <img src="/vector.svg" alt="Stock indicator" />
    <span className="text-xs text-[#F24844]">{quantity} Units left</span>
  </div>
);

const DeliveryWarrantyInfo = () => (
  <div className="space-y-2 px-2 border rounded-xl">
    <InfoRow
      icon="/delivery.svg"
      title="Delivery"
      description="Estimated delivery time 1-9 business days"
    />
    <InfoRow
      icon="/warranty.svg"
      title="Warranty"
      description="Warranty information unavailable for this item."
      hasBorder
    />
    <InfoRow
      icon="/return-policy.svg"
      title="Return Policy"
      description="Eligible items can be returned for free within 7 days of delivery"
    />
  </div>
);

const InfoRow = ({
  icon,
  title,
  description,
  hasBorder = false,
}: {
  icon: string;
  title: string;
  description: string;
  hasBorder?: boolean;
}) => (
  <div
    className={`flex gap-6 items-center py-4 ${hasBorder ? "border-t border-b" : ""}`}
  >
    <img src={icon} alt={title} />
    <div className="space-y-1">
      <h4 className="text-customBrown text-sm font-bold">{title}</h4>
      <p className="text-xs text-shadeGray">{description}</p>
    </div>
  </div>
);

const SellerInformation = ({ store }: { store: string }) => (
  <div className="space-y-3">
    <h3 className="text-sm text-shadeGray">Seller Information</h3>
    <div className="border rounded-xl flex justify-between items-center py-4 px-2">
      <div className="flex gap-2">
        <img src="/warehouse.svg" alt="Store" />
        <div>
          <p className="text-sm text-customBrown">{store}</p>
          <p className="text-xs text-shadeGray">200 successful sales</p>
        </div>
      </div>
      <div className="border border-primary py-2 px-4 rounded-lg">
        <p className="text-primary text-xs">Visit Store</p>
      </div>
    </div>
    <div className="space-y-3">
      <ProgressBar label="Product Quality" percentage={80} />
      <ProgressBar label="Delivery Rate" percentage={80} />
    </div>
  </div>
);

const ProgressBar = ({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) => (
  <div>
    <div className="flex justify-between pb-1">
      <p className="text-xs text-shadeGray">{label}</p>
      <span className="text-xs text-shadeGray">{percentage}%</span>
    </div>
    <img src="/progressbar.svg" alt={`${label} progress`} />
  </div>
);

const OrderDetails = ({ quantityCount, setQuantityCount, prices }: any) => (
  <div className="pb-6">
    <h3 className="text-sm text-customBrown border-b leading-8 mb-6">
      Order Details
    </h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm text-customGray3">Quantity:</p>
        <div className="flex items-center justify-around border border-gray-300 rounded-[2px] w-[106px] h-[28px]">
          <button
            className="flex-1 w-full text-center bg-[#F6F6F6] active:bg-[#b5b4b4]"
            onClick={() =>
              setQuantityCount((prev: number) => (prev > 1 ? prev - 1 : 1))
            }
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 mx-auto" />
          </button>
          <span className="flex-1 w-full text-center border-l border-r text-customBrown text-base font-meduim">
            {quantityCount}
          </span>
          <button
            className="flex-1 w-full text-center bg-[#F6F6F6] active:bg-[#b5b4b4]"
            onClick={() => setQuantityCount((prev: number) => prev + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-sm text-customGray3">Subtotal:</p>
        <span className="text-sm text-customBrown font-meduim">
          ₦{prices.subtotal}
        </span>
      </div>

      <div className="flex justify-between">
        <p className="text-sm text-customGray3 flex gap-2 items-center">
          Discount
          <span className="text-[10px] text-customBrown font-meduim flex gap-2 bg-[#BFCCD8] px-3 py-[2px] rounded-2xl">
            standard
            <img src="/standardarrow.svg" alt="Discount Type" />
          </span>
        </p>
        <span className="text-sm text-green-600 font-meduim">
          -{prices.discountPercentage}% (₦{prices.totalDiscount})
        </span>
      </div>

      <div className="flex justify-between border-t pt-3">
        <p className="text-base text-customBrown font-semibold">Total:</p>
        <span className="text-base text-customBrown font-semibold">
          ₦{prices.total}
        </span>
      </div>
    </div>
  </div>
);

const DeliveryReturnsSection = () => (
  <div className="border-b pb-1">
    <h3 className="text-sm text-customBrown border-b leading-8 mb-6">
      Delivery & Returns
    </h3>
    <p className="text-sm text-customGray3 font-normal">
      Same day delivery available in
    </p>
    <span className="text-sm text-customGray3 font-semibold">Lagos</span>
  </div>
);

const OrderForm = ({ prices, onBuyNow, onAddToCart, cartLoading }: any) => (
  <form className="py-6">
    <div className="flex flex-col border-b pb-6">
      <label htmlFor="address" className="text-sm text-customGray3 pb-3">
        Choose your location
      </label>
      <div className="relative">
        <img
          src="/address-marker-outline.svg"
          alt=""
          className="w-4 absolute left-4 top-4"
        />
        <input
          type="text"
          id="address"
          placeholder="Enter an address"
          className="border h-12 px-10 w-full rounded-lg"
        />
        <img
          src="/standardarrow.svg"
          alt=""
          className="w-4 absolute right-4 bottom-4"
        />
      </div>
    </div>

    <div className="flex flex-col border-b pb-6 pt-6">
      <label htmlFor="coupon" className="text-sm text-customGray3 pb-3">
        COUPON
      </label>
      <div className="relative">
        <img
          src="/address-marker-outline.svg"
          alt=""
          className="w-4 absolute left-4 top-4"
        />
        <input
          type="text"
          id="coupon"
          placeholder="Enter Code Here"
          className="border h-12 px-10 w-full rounded-lg"
        />
        <button
          type="button"
          className="absolute right-4 bottom-4 text-xs text-customGold"
        >
          APPLY COUPON
        </button>
      </div>
    </div>

    <div className="pt-6 pb-4 border-b space-y-2">
      <div className="flex justify-between">
        <p className="text-sm text-customGray3">Subtotal:</p>
        <span className="text-sm text-customBrown font-meduim">
          ₦{prices.subtotal}
        </span>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-customGray3">Discount:</p>
        <span className="text-sm text-green-600 font-meduim">
          -₦{prices.totalDiscount}
        </span>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-customBrown font-medium">Total</p>
        <span className="text-base text-customBrown font-meduim">
          ₦{prices.total}
        </span>
      </div>
    </div>

    <div className="space-y-6 pt-6">
      <button
        type="button"
        onClick={onBuyNow}
        disabled={cartLoading}
        className="bg-primary rounded-lg h-[60px] w-full text-base text-white disabled:bg-gray-400"
      >
        {cartLoading ? "Processing..." : "Buy Now"}
      </button>
      <button
        type="button"
        onClick={onAddToCart}
        disabled={cartLoading}
        className="bg-white border border-primary rounded-lg h-[60px] w-full text-base text-primary disabled:bg-gray-100 disabled:text-gray-400"
      >
        {cartLoading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  </form>
);

const ProductTabs = ({
  activeTab,
  setActiveTab,
  isDescriptionOpen,
  setIsDescriptionOpen,
  isSpecsOpen,
  setIsSpecsOpen,
  isReviewsOpen,
  setIsReviewsOpen,
  product,
  starCount,
}: any) => (
  <section className="bg-white lg:rounded-lg px-4 lg:px-10 lg:m-5">
    {/* Desktop Tabs */}
    <div className="hidden md:block">
      <div className="flex gap-20 border-b md:mb-6">
        {["description", "specs", "reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`text-sm font-medium py-2 capitalize ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-shadeGray"
            }`}
          >
            {tab === "specs" ? "Specifications" : tab}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "description" && (
          <DescriptionSection
            product={product}
            isOpen={isDescriptionOpen}
            setIsOpen={setIsDescriptionOpen}
          />
        )}
        {activeTab === "specs" && (
          <SpecsSection
            product={product}
            isOpen={isSpecsOpen}
            setIsOpen={setIsSpecsOpen}
          />
        )}
        {activeTab === "reviews" && (
          <ReviewsSection
            product={product}
            starCount={starCount}
            isOpen={isReviewsOpen}
            setIsOpen={setIsReviewsOpen}
          />
        )}
      </div>
    </div>

    {/* Mobile Accordion */}
    <div className="block md:hidden space-y-8">
      <DescriptionSection
        product={product}
        isOpen={isDescriptionOpen}
        setIsOpen={setIsDescriptionOpen}
      />
      <SpecsSection
        product={product}
        isOpen={isSpecsOpen}
        setIsOpen={setIsSpecsOpen}
      />
      <ReviewsSection
        product={product}
        starCount={starCount}
        isOpen={isReviewsOpen}
        setIsOpen={setIsReviewsOpen}
      />
    </div>
  </section>
);

const DescriptionSection = ({ product, isOpen, setIsOpen }: any) => (
  <section className="text-sm text-shadeGray pb-4 space-y-1 border-b">
    <div
      className="flex justify-between items-center pb-2 md:hidden"
      onClick={() => setIsOpen(!isOpen)}
    >
      <h2 className="text-sm text-primary font-meduim">Description</h2>
      <img
        src="/arrow-down.svg"
        alt="Toggle description"
        className={`w-4 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </div>
    <div className={isOpen ? "hidden" : "block"}>
      <p>{product.fullDescription || "No description available"}</p>
      <ul className="list-disc pl-5 space-y-1 pt-3">
        <li>
          <strong>Brand:</strong> {product.brand?.name || "Unknown Brand"}
        </li>
        <li>
          <strong>Category:</strong>{" "}
          {product.category?.name || "Unknown Category"}
        </li>
        <li>
          <strong>Material:</strong> {product.material || "Unknown"}
        </li>
        <li>
          <strong>Part Number:</strong> {product.partNumber || "N/A"}
        </li>
        <li>
          <strong>Stock Status:</strong> {product.stockStatus || "Unknown"}
        </li>
        <li>
          <strong>In Stock:</strong> {product.quantityInStock || 0}{" "}
          {product.units || "units"}
        </li>
        <li>
          <strong>Minimum Order Quantity:</strong>{" "}
          {product.minOrderQuantity || 1}
        </li>
        <li>
          <strong>Weight:</strong> {product.weight || 0} kg
        </li>
        <li>
          <strong>Dimensions (L×B×W):</strong> {product.packageSize?.length} ×{" "}
          {product.packageSize?.breadth} × {product.packageSize?.width} cm
        </li>
        <li>
          <strong>Rating:</strong> {product.rating?.toFixed(1) || "0.0"} / 5 (
          {product.numReviews || 0} reviews)
        </li>
        <li>
          <strong>SKU:</strong> {product.sku || "N/A"}
        </li>
        <li>
          <strong>Store:</strong> {product.store || "Unknown Store"}
        </li>
      </ul>
    </div>
  </section>
);

const SpecsSection = ({ product, isOpen, setIsOpen }: any) => (
  <section className="text-sm text-shadeGray pb-4 space-y-1 border-b">
    <div
      className="flex justify-between items-center pb-2 md:hidden"
      onClick={() => setIsOpen(!isOpen)}
    >
      <h2 className="text-sm text-primary font-meduim">Specifications</h2>
      <img
        src="/arrow-down.svg"
        alt="Toggle specifications"
        className={`w-4 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </div>
    <div className={isOpen ? "hidden" : "block"}>
      <div className="md:hidden">
        <table className="border w-full">
          <tbody>
            <tr>
              <th className="border py-3 px-2 text-left">Dimensions</th>
              <td className="border py-3 px-2 text-left">
                {`${product.packageSize?.length || 0} cm x ${product.packageSize?.breadth || 0} cm x ${product.packageSize?.width || 0} cm`}
              </td>
            </tr>
            <tr>
              <th className="border py-3 px-2 text-left">Weight</th>
              <td className="border py-3 px-2 text-left">
                {product.weight || 0} kg
              </td>
            </tr>
            <tr>
              <th className="border py-3 px-2 text-left">Main Material</th>
              <td className="border py-3 px-2 text-left">
                {product.material || "Unknown"}
              </td>
            </tr>
            <tr>
              <th className="border py-3 px-2 text-left">Product Type</th>
              <td className="border py-3 px-2 text-left">
                {product.category?.name || "Unknown Category"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="hidden md:block">
        <table className="table-fixed w-full border">
          <thead>
            <tr className="divide-x">
              {["Dimensions", "Weight", "Main Material", "Product Type"].map(
                (header) => (
                  <th key={header} className="w-1/4 pt-5 px-2 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src="/specicon.svg"
                        alt={`${header} icon`}
                        className="w-12 h-12 mb-1"
                      />
                      <span>{header}</span>
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="divide-x">
              <td className="w-1/4 py-3 px-2 text-center">
                {`${product.packageSize?.length || 0} cm x ${product.packageSize?.breadth || 0} cm x ${product.packageSize?.width || 0} cm`}
              </td>
              <td className="w-1/4 py-3 px-2 text-center">
                {product.weight || 0} kg
              </td>
              <td className="w-1/4 py-3 px-2 text-center">
                {product.material || "Unknown"}
              </td>
              <td className="w-1/4 py-3 px-2 text-center">
                {product.category?.name || "Unknown Category"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const ReviewsSection = ({ product, starCount, isOpen, setIsOpen }: any) => {
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  const ratingBreakdown = [
    { stars: 5, count: 60, barImage: "/fivebar.svg" },
    { stars: 4, count: 30, barImage: "/fourbar.svg" },
    { stars: 3, count: 20, barImage: "/threebar.svg" },
    { stars: 2, count: 10, barImage: "/twobar.svg" },
    { stars: 1, count: 1, barImage: "/onebar.svg" },
  ];

  const mockReviews = [
    {
      id: 1,
      initial: "C",
      name: "Chibuzor",
      date: "20-11-2024",
      title: "Not too bad",
      comment:
        "Smaller than i imagined but what i selected. Prompt Delivery. Thank you",
    },
    {
      id: 2,
      initial: "C",
      name: "Chibuzor",
      date: "20-11-2024",
      title: "Not too bad",
      comment:
        "Smaller than i imagined but what i selected. Prompt Delivery. Thank you",
    },
    {
      id: 3,
      initial: "C",
      name: "Chibuzor",
      date: "20-11-2024",
      title: "Not too bad",
      comment:
        "Smaller than i imagined but what i selected. Prompt Delivery. Thank you",
    },
  ];

  return (
    <section className="pb-4 space-y-1">
      <div
        className="flex justify-between items-center pb-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-sm text-primary font-meduim">Reviews</h2>
        <img src="/arrow-down.svg" alt="Toggle reviews" className="w-4" />
      </div>
      <div className={isOpen ? "hidden" : "block"}>
        <div className="space-y-4 md:space-y-0 md:flex md:items-start gap-20 border-b md:border-b-0">
          {/* Total Reviews */}
          <div className="space-y-2">
            <h3 className="text-xs text-customBrown">Total Review</h3>
            <p className="text-2xl text-customBrown">{product.numReviews}</p>
            <span className="text-xs text-customGray3">Verified reviews</span>
          </div>

          {/* Average Rating */}
          <div className="space-y-2">
            <h3 className="text-xs text-customBrown">Average Rating</h3>
            <div className="flex items-center gap-4">
              <p className="text-2xl text-customBrown">4.0</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    color={index < starCount ? "gold" : "lightgrey"}
                    className="w-4 h-4"
                  />
                ))}
              </div>
            </div>
            <span className="text-xs text-customGray3">
              Average rating on this product
            </span>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-1 pb-6">
            {ratingBreakdown.map(({ stars, count, barImage }) => (
              <div key={stars} className="flex gap-3 items-center">
                <img src="/onestar.svg" alt={`${stars} star`} />
                <span className="text-sm">{stars}</span>
                <img src={barImage} alt={`${stars} star rating bar`} />
                <span className="text-sm">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6 border-b md:border-b-0 py-6">
          {mockReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
<<<<<<< Updated upstream
=======

  return (
    <div className="bg-[#F5F5F5] pb-10">
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <LoaderSpinner txt="Product" />
        </div>
      ) : (
        <div>
          <section className="lg:px-5 lg:py-4">
            <h2 className="py-2 px-5 flex flex-row items-center"><Link to="/products"><img src="/white-left.png" alt="back" /></Link> {product?.name}</h2>
            <div className="lg:flex lg:gap-6">
              <div className="py-6 px-4 lg:px-8 flex flex-col lg:w-2/3 gap-6 lg:gap-10 lg:flex-row bg-white lg:rounded-lg">
                <div className="flex-1">
                  <div className="flex flex-col flex-1 items-center gap-16 w-full pt-24">
                    <div className="h-[220px] border">
                      {images.length > 0 ? (
                        <img
                          src={images[0]}
                          alt={name}
                          className="w-[220px] h-[220px] object-fill"
                        />
                      ) : (
                        <div className="w-[220px] h-[220px] flex items-center justify-center bg-gray-100">
                          <span>No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="border px-4 py-4 rounded flex justify-center items-center">
                        <img
                          src={images[0]}
                          alt={name}
                          className="w-[65px] h-[65px] object-fill"
                        />
                      </div>
                      <div className="border px-4 py-4 rounded flex justify-center items-center">
                        <img
                          src={images[1]}
                          alt={name}
                          className="w-[65px] h-[65px] object-fill"
                        />
                      </div>
                      <div className="border px-4 py-4 rounded flex justify-center items-center">
                        <img
                          src={images[1]}
                          alt={name}
                          className="w-[65px] h-[65px] object-fill"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between flex-1 items-center pt-8">
                    <p className="text-sm text-customGray3">
                      Share This Product
                    </p>
                    <div className="flex gap-2">
                      <img src="/facebookshare.svg" alt="" />
                      <img src="/xshare.svg" alt="" />
                      <img src="/whatsappshare.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  <h2 className="text-xl text-customBrown">{name}</h2>
                  {/* review */}
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          color={index < starCount ? "gold" : "lightgrey"}
                          className="w-4 h-4"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-customGray3">
                      ({numReviews} reviews)
                    </span>
                  </div>
                  {/* brand */}
                  <p className="text-sm text-customGray3">
                    Brand:{" "}
                    <span className="text-customBrown">{brand?.name}</span>
                  </p>
                  {/* price */}
                  <p className="text-xl text-customBrown">
                    {`₦${Math.floor(salesPrice)}.00`}
                    <span className="text-sm text-customGray3">
                      {`₦${Math.floor(regularPrice)}.00`}
                    </span>
                  </p>
                  <p className="text-xs text-customGray3">
                    You save ₦{savedPrice}
                  </p>
                  <div className="flex gap-2 items-center">
                    <img src="/vector.svg" alt="" />
                    <span className="text-xs text-[#F24844]">
                      {quantityInStock} Units left
                    </span>
                  </div>
                  {/* description */}
                  <div>
                    <h3 className="text-sm text-shadeGray font-medium pb-2">
                      Description
                    </h3>
                    <p className="text-sm text-customGray2">
                      {briefDescription}
                    </p>
                  </div>
                  <div className="space-y-2 px-2 border rounded-xl">
                    <div className="flex gap-6 items-center py-4">
                      <img src="/delivery.svg" alt="" />
                      <div className="space-y-1">
                        <h4 className="text-customBrown text-sm font-bold">
                          Delivery
                        </h4>
                        <p className="text-xs text-shadeGray">
                          Estimated delivery time 1-9 business days
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center border-t border-b py-4">
                      <img src="/warranty.svg" alt="" />
                      <div className="space-y-1">
                        <h4 className="text-customBrown text-sm font-bold">
                          Warranty
                        </h4>
                        <p className="text-xs text-shadeGray">
                          Warranty information unavailable for this item.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center py-4">
                      <img src="/return-policy.svg" alt="" />
                      <div className="space-y-1">
                        <h4 className="text-customBrown text-sm font-bold">
                          Return Policy
                        </h4>
                        <p className="text-xs text-shadeGray">
                          Eligible items can be returned for free within 7 days
                          of delivery
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* seller information */}
                  <div className="space-y-3">
                    <h3 className="text-sm text-shadeGray">
                      Seller Information
                    </h3>
                    <div className="border rounded-xl flex justify-between items-center py-4 px-2">
                      <div className="flex gap-2">
                        <img src="/warehouse.svg" alt="" />
                        <div>
                          <p className="text-sm text-customBrown">{store}</p>
                          <p className="text-xs text-shadeGray">
                            200 successful sales
                          </p>
                        </div>
                      </div>
                      <div className="border border-primary py-2 px-4 rounded-lg">
                        <p className="text-primary text-xs">Visit Store</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between pb-1">
                          <p className="text-xs text-shadeGray">
                            Product Quality
                          </p>
                          <span className="text-xs text-shadeGray">80%</span>
                        </div>
                        <img src="/progressbar.svg" alt="" />
                      </div>
                      <div>
                        <div className="flex justify-between pb-1">
                          <p className="text-xs text-shadeGray">
                            Delivery Rate
                          </p>
                          <span className="text-xs text-shadeGray">80%</span>
                        </div>
                        <img src="/progressbar.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-6 px-4 lg:px-8 bg-white lg:rounded-lg lg:w-1/3 self-start">
                {/* order details */}
                <div className="pb-6">
                  <h3 className="text-sm text-customBrown border-b leading-8 mb-6">
                    Order Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-customGray3">Quantity:</p>
                      <div className="flex items-center justify-around border border-gray-300 rounded-[2px] w-[106px] h-[28px]">
                        <button
                          className="flex-1 w-full text-center bg-[#F6F6F6] active:bg-[#b5b4b4]"
                          onClick={() =>
                            setQuantityCount((prev) =>
                              prev > 1 ? prev - 1 : 1
                            )
                          }
                        >
                          <Minus />
                        </button>
                        <span className="flex-1 w-full text-center border-l border-r text-customBrown text-base font-meduim">
                          {quantityCount}
                        </span>
                        <button
                          className="flex-1 w-full text-center bg-[#F6F6F6] active:bg-[#b5b4b4]"
                          onClick={() => setQuantityCount((prev) => prev + 1)}
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-customGray3">Price:</p>
                      <span className="text-sm text-customBrown font-meduim">
                        ₦{totalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-customGray3">Discount:</p>
                      <span className="text-sm text-customBrown font-meduim">
                        ({discountPercent}%) -₦{discountPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-customGray3 flex gap-2 items-center">
                        Discount
                        <span className="text-[10px] text-customBrown font-meduim flex gap-2 bg-[#BFCCD8] px-3 py-[2px] rounded-2xl">
                          standard
                          <img
                            src="/standardarrow.svg"
                            alt="Discount Type Arrow"
                          />
                        </span>
                      </p>
                      <span className="text-sm text-customBrown font-meduim">
                        ({discountPercent}%) -₦{discountPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-b pb-1">
                  <h3 className="text-sm text-customBrown border-b leading-8 mb-6">
                    Delivery & Returns
                  </h3>
                  <p className="text-sm text-customGray3 font-normal">
                    Same day delivery available in
                  </p>
                  <span className="text-sm text-customGray3 font-semibold">
                    Lagos
                  </span>
                </div>
                <form action="" className="py-6">
                  <div className="flex flex-col border-b pb-6">
                    <label
                      htmlFor="address"
                      className="text-sm text-customGray3 pb-3"
                    >
                      Choose your location
                    </label>
                    <div className="relative">
                      <img
                        src="/address-marker-outline.svg"
                        alt=""
                        className="w-4 absolute left-4 top-4"
                      />
                      <input
                        type="text"
                        placeholder="Enter an address"
                        className="border h-12 px-10 w-full rounded-lg"
                      />
                      <img
                        src="/standardarrow.svg"
                        alt=""
                        className="w-4 absolute right-4 bottom-4"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col border-b pb-6 pt-6">
                    <label
                      htmlFor="coupon"
                      className="text-sm text-customGray3 pb-3"
                    >
                      COUPON
                    </label>
                    <div className="relative">
                      <img
                        src="/address-marker-outline.svg"
                        alt=""
                        className="w-4 absolute left-4 top-4"
                      />
                      <input
                        type="text"
                        placeholder="Enter Code Here"
                        className="border h-12 px-10 w-full rounded-lg"
                      />
                      <span className="absolute right-4 bottom-4 text-xs text-customGold">
                        APPLY COUPON
                      </span>
                    </div>
                  </div>
                  <div className="pt-6 pb-4 border-b space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-customGray3">Subtotal:</p>
                      <span className="text-sm text-customBrown font-meduim">
                        ₦{totalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-customBrown font-medium">
                        Total
                      </p>
                      <span className="text-base text-customBrown font-meduim">
                        ₦{totalPrice}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-6 pt-6">
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      disabled={cartLoading}
                      className="bg-primary rounded-lg h-[60px] w-full text-base text-white disabled:bg-gray-400"
                    >
                      {cartLoading ? "Processing..." : "Buy Now"}
                    </button>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={cartLoading}
                      className="bg-white border border-primary rounded-lg h-[60px] w-full text-base text-primary disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      {cartLoading ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/* Specifications */}
          <section className="bg-white lg:rounded-lg px-4 lg:px-10 lg:m-5">
            {/* tab header */}
            <div className="hidden md:block">
              <div className="flex gap-20 border-b md:mb-6">
                {["description", "specs", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`text-sm font-medium py-2 ${activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-shadeGray"
                      }`}
                  >
                    {tab === "description"
                      ? "Description"
                      : tab === "specs"
                        ? "Specifications"
                        : "Reviews"}
                  </button>
                ))}
              </div>
              <div>
                {activeTab === "description" && <DescriptionSection />}
                {activeTab === "specs" && <SpecsSection />}
                {activeTab === "reviews" && <ReviewsSection />}
              </div>
            </div>
            <div className="block md:hidden space-y-8">
              <DescriptionSection />
              <SpecsSection />
              <ReviewsSection />
            </div>
          </section>
          <RecommendedProduct relatedProducts={relatedProducts} />
        </div>
      )}
    </div>
  );
>>>>>>> Stashed changes
};

const ReviewItem = ({ review }: { review: any }) => (
  <div className="flex items-center gap-6 md:gap-12">
    <div className="flex flex-col gap-2 items-center md:flex-row">
      <div className="bg-[#D9E1E8] w-[50px] h-[50px] flex justify-center items-center rounded-full">
        <span className="text-primary text-xl">{review.initial}</span>
      </div>
      <p className="text-xs text-primary font-bold">{review.name}</p>
    </div>
    <div className="space-y-1">
      <div className="flex gap-8 pb-1">
        <img src="/stars.svg" alt="5 star rating" />
        <p className="text-xs text-customGray3">{review.date}</p>
      </div>
      <p className="text-xs text-primary font-semibold">{review.title}</p>
      <p className="text-xs text-customGray3">{review.comment}</p>
    </div>
  </div>
);

export default ProductDetails;
