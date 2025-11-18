import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { addProductToCart } from "../../../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { Link, useNavigate } from "react-router-dom";

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
  maker?: string;
  displayPrice?: number;
  regularPrice?: number;
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
  maker,
  displayPrice,
  regularPrice,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const Favourite = MdFavoriteBorder as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const { cart } = useAppSelector((state) => state.cart);
  const cartState = useAppSelector((state) => state.cart);
  const cartLoading = cartState.loading || false;
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [lastAddedProduct, setLastAddedProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  // Check if this product is already in cart
  const isInCart =
    cart?.products?.some((item) => item.product._id === productId) || false;

  const handleAddToCart = async (productId: string, productName: string) => {
    const productData = {
      _id: productId,
      name: title,
      images: [image],
      salesPrice:
        displayPrice ||
        parseFloat(price?.replace("₦", "").replace(",", "") || "0"),
      displayPrice:
        displayPrice ||
        parseFloat(price?.replace("₦", "").replace(",", "") || "0"),
      regularPrice:
        regularPrice ||
        parseFloat(oldPrice?.replace("₦", "").replace(",", "") || "0"),
      stockStatus: "In Stock",
      brand: {
        _id: maker || "unknown",
        name: maker || "Unknown",
      },
      maker: maker || "Unknown",
    };

    try {
      setAddingProductId(productId);

      await dispatch(
        addProductToCart({
          productId,
          quantity: 1,
          productData,
        })
      ).unwrap();

      setAddedToCart(true);
      setLastAddedProduct({ id: productId, name: productName });
    } catch (error) {
      console.error("ProductCard - Failed to add product to cart:", error);
    } finally {
      setAddingProductId(null);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (addedToCart || isInCart) {
      // Navigate to cart
      navigate("/cart");
    } else {
      // Add to cart
      handleAddToCart(productId, title);
    }
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
          onClick={handleButtonClick}
          disabled={cartLoading && addingProductId === productId}
          className={`w-full flex items-center justify-center py-2 px-4 rounded transition text-sm ${
            isInCart
              ? "bg-customGray3 text-white hover:bg-blue-600"
              : cartLoading && addingProductId === productId
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-primary text-white hover:bg-blue-700"
          }`}
        >
          {cartLoading && addingProductId === productId ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Adding...
            </>
          ) : isInCart ? (
            <>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              View Cart
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </>
          )}
        </button>
        <button
          className="border rounded border-primary py-2 px-3"
          onClick={(e) => {
            e.stopPropagation();
            // handle add to wishlist logic
          }}
        >
          <Favourite className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
