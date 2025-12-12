import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface DealsCardProps {
  productId: string;
  image: string;
  title: string;
  category: string;
  price?: string;
  oldPrice?: string;
  discount?: string;
  reviews?: string;
  onAddToCart?: (productId: string, productName: string) => void;
  cartLoading?: boolean;
  addingProductId?: string | null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate countdown to end of month
  const calculateTimeLeft = useMemo(() => {
    return (): TimeLeft => {
      const now = new Date();
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
      );

      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Check if this product is being added to cart
  const isAddingToCart = cartLoading && addingProductId === productId;

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
  };

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  // Format time with leading zeros
  const formatTime = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  return (
    <article
      className="border px-4 md:px-10 py-6 rounded-2xl text-start lg:flex gap-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white w-full h-full min-h-[360px]"
      onClick={handleCardClick}
      aria-label={`Deal: ${title}`}
    >
      {/* Image Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-16 lg:flex-shrink-0">
        {/* Main Product Image */}
        <div className="relative">
          {discount && (
            <span
              className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full absolute -top-2 -right-14 xl:-top-12 shadow-md"
              aria-label={`${discount} discount`}
            >
              {discount}
            </span>
          )}
          <figure className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </figure>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex lg:flex-col justify-center items-center gap-4 pb-6 lg:pb-0">
          {[1, 2, 3].map((index) => (
            <figure
              key={index}
              className="border p-3 rounded-2xl md:w-20 h-20 flex justify-center items-center overflow-hidden hover:border-primary transition-colors"
            >
              <img
                src={image}
                alt={`${title} view ${index}`}
                className="w-full min-w-10 h-10 object-contain"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex-1 flex flex-col">
        {/* Product Info */}
        <header className="mb-4">
          <p className="text-[10px] font-semibold text-customGray2 uppercase tracking-wide mb-1">
            {category}
          </p>
          <h3 className="text-sm md:text-base font-medium text-customBrown leading-relaxed line-clamp-2">
            {title}
          </h3>
        </header>

        {/* Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <img src="/stars.svg" alt="5 star rating" className="h-4" />
          <span className="text-sm font-medium text-customGray3">
            ({reviews || "0"} Reviews)
          </span>
        </div>

        {/* Price */}
        {oldPrice && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-customGray3 line-through">
              {oldPrice}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`flex items-center justify-center gap-2 border rounded-lg border-primary py-3 px-4 w-full sm:max-w-56 transition-all ${
              isAddingToCart
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "hover:bg-primary hover:text-white active:scale-95"
            }`}
            aria-label={isAddingToCart ? "Adding to cart" : "Add to cart"}
          >
            {isAddingToCart ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-sm font-medium">Adding...</span>
              </>
            ) : (
              <>
                <img src="/add-cart.svg" alt="" aria-hidden="true" />
                <span className="text-sm text-primary font-medium">
                  Add to cart
                </span>
              </>
            )}
          </button>

          <button
            onClick={handleFavorite}
            className="border rounded-lg border-primary p-3 hover:bg-primary hover:bg-opacity-10 transition-colors flex-shrink-0"
            aria-label="Add to favorites"
          >
            <img
              src="/favourite.svg"
              alt=""
              className="w-6 h-6"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Countdown Timer */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <div
            className="flex items-center justify-around sm:justify-center gap-3"
            role="timer"
            aria-label="Deal countdown timer"
          >
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Mins" />
            <CountdownUnit value={timeLeft.seconds} label="Secs" />
          </div>
        </div>
      </div>
    </article>
  );
};

// Countdown Unit Component
const CountdownUnit: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => {
  const formatTime = (val: number): string => val.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="border border-gray-300 py-2 px-3 min-w-[44px] flex justify-center text-base text-customBrown1 rounded-lg font-semibold bg-gray-50"
        aria-label={`${value} ${label.toLowerCase()}`}
      >
        {formatTime(value)}
      </span>
      <p className="text-xs text-customGray1 font-medium">{label}</p>
    </div>
  );
};

export default DealsCard;
