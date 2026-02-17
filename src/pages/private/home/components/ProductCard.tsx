import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toggleProductInWishlist } from "../../../../store/slices/wishlistSlice";
import { addProductToCart } from "../../../../store/slices/cartSlice";

interface ProductCardProps {
  productId: string;
  image: string;
  title: string;
  category: string;
  price?: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  numReviews?: number;
  // stockStatus: "In Stock" | "Out of Stock";
  onAddToCart?: (productId: string, productName: string) => void;
  cartLoading?: boolean;
  addingProductId?: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  image,
  title,
  category,
  oldPrice,
  discount,
  price,
  rating,
  numReviews,
  // stockStatus,
  onAddToCart,
  cartLoading = false,
  addingProductId = null,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FavouriteOutline = MdFavoriteBorder as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const FavouriteFilled = MdFavorite as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  const { cart } = useAppSelector((state) => state.cart);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  // const isOutOfStock = stockStatus !== "In Stock";

  // Check if product is in wishlist
  const isInWishlist =
    wishlist?.products?.some(
      (product) => product._id === productId || product.id === productId,
    ) || false;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      navigate("/login");
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
            image: image,
            images: [image],
            salesPrice: parseFloat(price?.replace(/[₦,]/g, "") || "0"),
            displayPrice: parseFloat(price?.replace(/[₦,]/g, "") || "0"),
            categoryName: category,
            // stockStatus,
            brand: {
              _id: "unknown",
              name: "Unknown",
            },
          },
        }),
      ).unwrap();
    } catch (error) {
      alert("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsTogglingWishlist(true);
    try {
      const result = await dispatch(
        toggleProductInWishlist(productId),
      ).unwrap();
    } catch (error: any) {
      // Only show error for real errors, not "already in wishlist"
      if (error !== "ALREADY_IN_WISHLIST") {
        alert("Failed to update wishlist");
      }
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  // Determine if we're using parent's loading state or local state
  const isCartLoading =
    (cartLoading && addingProductId) === (productId || isAddingToCart);

  return (
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
        </div>
        <span className="text-xs md:text-sm font-medium text-customGray3">
          ({numReviews || 0} Reviews)
        </span>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-customBrown">{price}</p>
        {oldPrice && (
          <p className="text-[11px] font-semibold text-customGray3 line-through">
            {oldPrice}
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
              <img src="/blue-cart.svg" alt="cart" className="w-auto h-auto" />
              <span className="text-[10px] text-primary font-normal">
                Add to Cart
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
  );
};

export default ProductCard;
