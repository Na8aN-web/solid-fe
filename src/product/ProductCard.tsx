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

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  category,
  price,
  oldPrice,
  discount,
  reviews,
}) => {
  return (
    <div className="inline-block">
      <div className="border inline-block rounded-xl p-4 mb-3 h-52 w-48">
        {discount && (
          <span className="bg-primary text-white text-xs p-2 rounded-3xl">
            {discount}
          </span>
        )}
        <img src={image} alt="" className="px-4 h-36" />
      </div>
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
          <span className="text-sm text-primary font-normal">Add to cart</span>
        </button>
        <button className="border rounded border-primary py-2 px-3">
          <img src={favourite} alt="" className="w-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
