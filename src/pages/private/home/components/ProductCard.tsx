import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toggleProductInWishlist } from "../../../../store/slices/wishlistSlice";
import { addProductToCart } from "../../../../store/slices/cartSlice";

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  productId: string;
  image: string;
  title: string;
  category: string;
  displayPrice: number;
  regularPrice?: number;
  discount?: string;
  rating?: number;
  numReviews?: number;
  onAddToCart?: (productId: string, productName: string) => void;
  cartLoading?: boolean;
  addingProductId?: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  image,
  title,
  category,
  displayPrice,
  regularPrice,
  discount,
  rating,
  numReviews,
  onAddToCart,
  cartLoading = false,
  addingProductId = null,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  // Modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formatCurrency = (amount?: number) => {
    if (typeof amount !== "number") return "₦0";
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  // Check if product is in wishlist
  const isInWishlist =
    wishlist?.products?.some(
      (product) => product._id === productId || product.id === productId,
    ) || false;

  const isCartLoading =
    (cartLoading && addingProductId === productId) || isAddingToCart;

  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FavouriteOutline = MdFavoriteBorder as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const FavouriteFilled = MdFavorite as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  // const isOutOfStock = stockStatus !== "In Stock";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    // If parent component provided callback, use it
    if (onAddToCart) {
      onAddToCart(productId, title);
      return;
    }

    // Otherwise, handle it here
    setIsAddingToCart(true);

    try {
      await dispatch(
        addProductToCart({
          productId,
          quantity: 1,
          productData: {
            _id: productId,
            name: title,
            image,
            images: [image],
            salesPrice: displayPrice,
            displayPrice: displayPrice,
            categoryName: category,
            brand: {
              _id: "unknown",
              name: "Unknown",
            },
          },
        }),
      ).unwrap();
    } catch (error) {
      setErrorMessage("Failed to add to cart");
      setShowErrorModal(true);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setIsTogglingWishlist(true);

    try {
      // const result = await dispatch(
      //   toggleProductInWishlist(productId),
      // ).unwrap();
      await dispatch(toggleProductInWishlist(productId)).unwrap();
    } catch (error: any) {
      // Only show error for real errors, not "already in wishlist"
      if (error !== "ALREADY_IN_WISHLIST") {
        setErrorMessage("Failed to update wishlist");
        setShowErrorModal(true);
      }
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  // Determine if we're using parent's loading state or local state
  // const isCartLoading =
  //   (cartLoading && addingProductId) === (productId || isAddingToCart);

  return (
    <>
      <div className="w-full text-left pb-1">
        <Link to={`/product/${productId}`}>
          <div className="flex flex-col items-start justify-center border rounded-xl p-4 mb-3 w-full h-40 py-4 lg:h-52 hover:shadow-lg transition-shadow cursor-pointer">
            {discount && (
              <span className="bg-primary text-white text-xs w-[38px] h-[26px] rounded-3xl flex justify-center items-center">
                {discount}
              </span>
            )}
            <img
              src={image}
              alt={title}
              className="px-4 w-[100px] h-[100px] m-auto lg:w-[140px] lg:h-[130px] object-contain"
            />
          </div>
        </Link>
        <p className="text-[10px] font-semibold text-customGray2 truncate leading-normal uppercase">
          {category}
        </p>
        <Link to={`/product/${productId}`}>
          <h3 className="text-sm font-medium text-customBrown truncate leading-relaxed w-[18ch] xl:w-[25ch] hover:text-primary transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 py-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                color={index < (rating ?? 0) ? "gold" : "lightgrey"}
                className="w-2 h-3"
              />
            ))}
            <span className="text-xs md:text-sm font-medium text-customGray3">
              ({numReviews || 0} Reviews)
            </span>
          </div>
        </div>
        {/* <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-customBrown">{price}</p>
        {oldPrice && (
          <p className="text-[11px] font-semibold text-customGray3 line-through">
            {oldPrice}
          </p>
        )}
      </div> */}

        <div className="flex items-center gap-2">
          <p className="font-semibold">{formatCurrency(displayPrice)}</p>
          {regularPrice && (
            <p className="text-sm text-gray-400 line-through">
              {formatCurrency(regularPrice)}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleAddToCart}
            disabled={isCartLoading}
            className={`flex items-center justify-center gap-2 border rounded border-primary py-2 px-1 w-full transition-colors ${
              isCartLoading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "hover:bg-blue-50 hover:border-2"
            }`}
          >
            {isCartLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-[10px] text-primary">Adding...</span>
              </>
            ) : (
              <>
                <img src="/blue-cart.svg" alt="cart" className="w-4 h-4" />
                <span className="text-sm text-primary font-normal">
                  Add to cart
                </span>
              </>
            )}
          </button>
          <button
            className={`border rounded py-2 px-3 transition-all ${
              isInWishlist
                ? "bg-blue-50 border-blue-50"
                : "border-primary hover:bg-blue-50"
            } ${isTogglingWishlist ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleFavorite}
            disabled={isTogglingWishlist}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isTogglingWishlist ? (
              <svg
                className="animate-spin h-4 w-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : isInWishlist ? (
              <FavouriteFilled className="w-4 h-4 text-primary" />
            ) : (
              <FavouriteOutline className="w-4 h-4 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Login Required Modal */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Login Required"
      >
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-6">
            Please login to add items to your cart or wishlist.
          </p>
          <div>
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
      >
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <button
            onClick={() => setShowErrorModal(false)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            {/* OK */}
            <p>{errorMessage}</p>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
