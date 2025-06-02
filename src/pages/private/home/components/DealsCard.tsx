import React from "react";
import { FaStar } from "react-icons/fa";

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  reviews?: string;
  rating?: number;
}

const DealsCard: React.FC<ProductCardProps> = ({
  image,
  title,
  category,
  price,
  oldPrice,
  discount,
  reviews,
  rating,
}) => {
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  return (
    <div className="border px-4 md:px-12 py-6 rounded-2xl text-start lg:flex w-full">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-16">
        <div className="relative">
          {discount && (
            <span className="bg-primary text-white text-xs p-2 rounded-3xl absolute top-[-5px] right-[-60px] xl:top-[-50px]">
              {discount}
            </span>
          )}
          <img
            src={image}
            alt=""
            className="w-[140px] h-[140px] md:w-[200px] md:h-[200px]"
          />
        </div>
        <div className="flex justify-center lg:flex-col items-center gap-4 w-full pb-6">
          <div className="border p-4 rounded-2xl flex justify-center items-center">
            <img src={image} alt={title} className="w-12 h-12" />
          </div>
          <div className="border p-4 rounded-2xl flex justify-center items-center">
            <img src={image} alt={title} className="w-12 h-12" />
          </div>
          <div className="border p-4 rounded-2xl flex justify-center items-center">
            <img src={image} alt={title} className="w-12 h-12" />
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
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                color={index < (rating ?? 0) ? "gold" : "lightgrey"}
                className="w-3 h-3"
              />
            ))}
          </div>
          <span className="text-sm font-medium text-customGray3">
            ({reviews} Reviews)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-customBrown">{price}</p>
          {oldPrice && (
            <p className="text-sm font-semibold text-customGray3 line-through">
              {oldPrice}
            </p>
          )}
        </div>
        <div className="flex gap-3 pt-4">
          <button className="flex items-center justify-center gap-2 border rounded border-primary py-2 w-full sm:w-56">
            <img src="/add-cart.svg" alt="cart" />
            <span className="text-sm text-primary font-normal">
              Add to cart
            </span>
          </button>
          <button className="border rounded border-primary py-2 px-3">
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
