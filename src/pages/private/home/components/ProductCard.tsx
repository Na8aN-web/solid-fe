import React from "react";

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
    <div className="inline-block w-full">
      <div className="flex flex-col items-start justify-center border rounded-xl p-4 mb-3 w-full h-36 py-4 lg:h-52">
        {discount && (
          <span className="bg-primary text-white text-xs p-2 rounded-3xl">
            {discount}
          </span>
        )}
        <img src={image} alt={title} className="px-4" />
      </div>
      <p className="text-[10px] font-semibold text-customGray2 leading-normal">
        {category}
      </p>
      <h3 className="text-sm font-medium text-customBrown leading-relaxed">
        {title}
      </h3>
      <div className="flex items-center gap-1 py-2">
        <img src="/stars.svg" alt="stars" />
        <span className="text-xs md:text-sm font-medium text-customGray3">
          ({reviews} Reviews)
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
        <button className="flex items-center justify-center gap-0 border rounded border-primary py-2 px-1 w-full">
          <img src="/blue-cart.svg" alt="cart" />
          <span className="text-sm text-primary font-normal">Add to cart</span>
        </button>
        <button className="border rounded border-primary py-2 px-3">
          <img src="/favourite.svg" alt="favourite" className="w-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
