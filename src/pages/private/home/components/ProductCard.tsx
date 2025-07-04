import React from "react";
import { FaStar } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { addProductToCart } from "../../../../store/slices/cartSlice";
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
}) => {
  const Star = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const Favourite = MdFavoriteBorder as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addProductToCart({ productId, quantity: 1 }));
  };

  return (
    <div className="w-full text-left">
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
          className="flex items-center justify-center gap-2 border rounded border-primary py-2 px-1 w-full"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          <img src="/blue-cart.svg" alt="cart" />
          <span className="text-[10px] text-primary font-normal">
            Add to cart
          </span>
        </button>
        <button
          className="border rounded border-primary py-2 px-3"
          onClick={(e) => {
            e.stopPropagation();
            // handle add to wishlist logic
          }}
        >
          <Favourite />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
