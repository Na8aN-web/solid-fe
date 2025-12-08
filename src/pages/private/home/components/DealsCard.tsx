import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addProductToCart } from "../../../../store/slices/cartSlice";

interface DealsCardProps {
  productId: string;
  image: string;
  title: string;
  category: string;
  price?: string;
  oldPrice?: string;
  discount?: string;
  reviews?: string;
  onAddToCart?: (productId: string, productName: string) => void; // Add callback
  cartLoading?: boolean; // Add loading state
  addingProductId?: string | null; // Track which product is being added
}

const DealsCard: React.FC<DealsCardProps> = ({
  image,
  title,
  category,
  oldPrice,
  discount,
  reviews,
  productId,
  onAddToCart,
  cartLoading = false,
  addingProductId = null,
}) => {
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
    <div className="border px-4 md:px-12 py-6 rounded-2xl text-start lg:flex">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-16">
        <div className="relative">
          {discount && (
            <span className="bg-primary text-white text-xs p-2 rounded-3xl absolute top-[-5px] right-[-60px] xl:top-[-50px]">
              {discount}
            </span>
          )}
          {/* Fixed main image size */}
          <div className="w-full lg:w-[250px] h-48 flex items-center justify-center overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex justify-center lg:flex-col items-center gap-4 w-full pb-6">
          {/* Fixed thumbnail sizes */}
          <div className="border p-3 rounded-2xl w-24 h-24 flex justify-center items-center overflow-hidden">
            <img src={image} alt={title} className="w-16 h-16 object-contain" />
          </div>
          <div className="border p-3 rounded-2xl w-24 h-24 flex justify-center items-center overflow-hidden">
            <img src={image} alt={title} className="w-16 h-16 object-contain" />
          </div>
          <div className="border p-3 rounded-2xl w-24 h-24 flex justify-center items-center overflow-hidden">
            <img src={image} alt={title} className="w-16 h-16 object-contain" />
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-[10px] font-semibold text-customGray2 leading-normal">
          {category}
        </p>
        <h3 className="text-sm font-medium text-customBrown leading-relaxed">
          {title}
        </h3>
        <div className="flex items-center gap-1 py-2">
          <img src="/stars.svg" alt="stars" />
          <span className="text-sm font-medium text-customGray3">
            ({reviews} Reviews)
          </span>
        </div>
        <div className="flex items-center gap-2">
          {oldPrice && (
            <p className="text-sm font-semibold text-customGray3 line-through">
              {oldPrice}
            </p>
          )}
        </div>
        <div className="flex gap-3 pt-4">
          <button 
            onClick={handleAddToCart}
            disabled={cartLoading && addingProductId === productId}
            className={`flex items-center justify-center gap-2 border rounded border-primary py-2 w-full sm:w-56 ${
              cartLoading && addingProductId === productId
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "hover:border-2 hover:border-primary transition-colors"
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
                Adding...
              </>
            ) : (
              <>
                <img src="/add-cart.svg" alt="cart" />
                <span className="text-sm text-primary font-normal">
                  Add to cart
                </span>
              </>
            )}
          </button>
          <button 
            onClick={handleFavorite}
            className="border rounded border-primary py-2 px-3 hover:bg-primary transition-colors"
          >
            <img src="/favourite.svg" alt="favourite" className="w-6" />
          </button>
        </div>
        <hr className="border-t border-gray-200 my-6" />
        <div className="flex items-center justify-around sm:justify-center sm:items-start gap-2">
          <div className="flex flex-col items-center gap-2">
            <span className="border py-2 w-11 flex justify-center text-sm text-customBrown1 rounded-lg">
              123
            </span>
            <p className="text-sm text-customGray1">Days</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="border py-2 w-11 flex justify-center text-sm text-customBrown1 rounded-lg">
              12
            </span>
            <p className="text-sm text-customGray1">Hours</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="border py-2 w-11 flex justify-center text-sm text-customBrown1 rounded-lg">
              23
            </span>
            <p className="text-sm text-customGray1">Mins</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="border py-2 w-11 flex justify-center text-sm text-customBrown1 rounded-lg">
              56
            </span>
            <p className="text-sm text-customGray1">Secs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsCard;