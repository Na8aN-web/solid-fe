import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

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
  onAddToCart?: (productId: string, productName: string) => void; // Add callback
  cartLoading?: boolean; // Add loading state
  addingProductId?: string | null; // Track which product is being added
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
  onAddToCart,
  cartLoading = false,
  addingProductId = null,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const Favourite = MdFavoriteBorder as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const { cart } = useAppSelector((state) => state.cart);
  const cartState = useAppSelector((state) => state.cart);
  // const cartLoading = cartState.loading || false;
  // const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [lastAddedProduct, setLastAddedProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(productId, title);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add favorite functionality here if needed
    // console.log("Add to favorite:", productId);
  };

  return (
    <div className="w-full text-left">
      <Link to={`/product/${productId}`}>
        <div className="flex flex-col items-start justify-center border rounded-xl p-4 mb-3 w-full h-40 py-4 lg:h-52">
          {discount && (
            <span className="bg-primary text-white text-xs w-[38px] h-[26px] rounded-3xl flex justify-center items-center">
              {discount}
            </span>
          )}
          <img
            src={image}
            alt={title}
            className="px-4 w-[100px] h-[100px] m-auto lg:w-[140px] lg:h-[130px]"
          />
        </div>
      </Link>
      <p className="text-[10px] font-semibold text-customGray2 truncate leading-normal">
        {category}
      </p>
      <h3 className="text-sm font-medium text-customBrown truncate leading-relaxed w-[18ch] xl:w-[25ch]">
        {title}
      </h3>
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
          ({numReviews} Reviews)
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
          disabled={cartLoading && addingProductId === productId}
          className={`flex items-center justify-center gap-2 border rounded border-primary py-2 px-1 w-full ${
            cartLoading && addingProductId === productId
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "hover:border-2 hover:border-primary hover:text-white transition-colors"
          }`}
        >
          {cartLoading && addingProductId === productId ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
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
              <span className="text-[10px]">Adding...</span>
            </>
          ) : (
            <>
              <img src="/blue-cart.svg" alt="cart" />
              <span className="text-[10px] text-primary font-normal ">
                Add to cart
              </span>
            </>
          )}
        </button>
        <button
          className="border rounded border-primary py-2 px-3 hover:bg-primary transition-colors"
          onClick={handleFavorite}
        >
          <Favourite className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;