import React from "react";
import stars from "../images/stars.svg";
import addCart from "../images/add-cart.svg";
import favourite from "../images/favourite.svg";



interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  reviews?: string;
}

const DealsCard: React.FC<ProductCardProps> = ({
  image,
  title,
  category,
  price,
  oldPrice,
  discount,
  reviews,
}) => {
  return (
    <div className="border inline-flex items-start gap-6 px-12 py-6 rounded-2xl">
      <div className="flex items-end gap-16">
        <div className="relative">
          {discount && (
            <span className="bg-primary text-white text-xs p-2 rounded-3xl absolute top-[-45px] right-[-40px]">
              {discount}
            </span>
          )}
          <img src={image} alt="" className="w-52" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="border p-3 rounded-2xl">
            <img src={image} alt="" className="w-10" />
          </div>
          <div className="border p-3 rounded-2xl">
            <img src={image} alt="" className="w-10" />
          </div>
          <div className="border p-3 rounded-2xl">
            <img src={image} alt="" className="w-10" />
          </div>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-customGray2 leading-normal">
          {category}
        </p>
        <h3 className="text-sm font-medium text-customBrown leading-relaxed">
          {title}
        </h3>
        <div className="flex items-center gap-1 py-2">
          <img src={stars} alt="" />
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
          <button className="flex items-center justify-center gap-2 border rounded border-primary py-2 w-full">
            <img src={addCart} alt="" />
            <span className="text-sm text-primary font-normal">
              Add to cart
            </span>
          </button>
          <button className="border rounded border-primary py-2 px-3">
            <img src={favourite} alt="" className="w-6" />
          </button>
        </div>
        <hr className="border-t border-gray-200 my-6" />
        <div className="flex items-center justify-between gap-2">
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
