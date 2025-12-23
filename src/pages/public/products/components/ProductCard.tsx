// import React from "react";

// interface ProductCardProps {
//   image: string;
//   title: string;
//   category: string;
//   price: string;
//   oldPrice?: string;
//   discount?: string;
//   reviews?: string;
//   productId?: string;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   image,
//   title,
//   category,
//   price,
//   oldPrice,
//   discount,
//   reviews,
//   productId,
// }) => {
//   return (
//     <div key={productId} className="inline-block w-full">
//       <div className="flex flex-col items-start justify-center border rounded-xl p-4 mb-3 w-full h-40 py-4 lg:h-52">
//         {discount && (
//           <span className="bg-primary text-white text-xs p-2 rounded-3xl">
//             {discount}
//           </span>
//         )}
//         <img src={image} alt={title} className="px-4 w-32 m-auto lg:w-36" />
//       </div>
//       <p className="text-[10px] font-semibold text-customGray2 truncate leading-normal">
//         {category}
//       </p>
//       <h3 className="text-sm font-medium text-customBrown truncate leading-relaxed">
//         {title}
//       </h3>
//       <div className="flex items-center justify-center gap-1 py-2">
//         <img src="/stars.svg" alt="stars" />
//         <span className="text-xs md:text-sm font-medium text-customGray3">
//           ({reviews} Reviews)
//         </span>
//       </div>
//       <div className="flex items-center justify-center gap-2">
//         <p className="text-sm font-semibold text-customBrown">{price}</p>
//         {oldPrice && (
//           <p className="text-[11px] font-semibold text-customGray3 line-through">
//             {oldPrice}
//           </p>
//         )}
//       </div>
//       <div className="flex gap-3 pt-4">
//         <button className="flex items-center justify-center gap-2 border rounded border-primary py-2 px-1 w-full">
//           <img src="/blue-cart.svg" alt="cart" />
//           <span className="text-[11px] sm:text-sm text-primary font-normal">Add to cart</span>
//         </button>
//         <button className="border rounded border-primary py-2 px-3">
//           <img src="/favourite.svg" alt="favourite" className="w-6" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toggleProductInWishlist } from "../../../../store/slices/wishlistSlice";
import { addProductToCart } from "../../../../store/slices/cartSlice";

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  reviews?: string;
  productId?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  category,
  price,
  oldPrice,
  discount,
  reviews,
  productId,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Check if product is in wishlist
  const isInWishlist = wishlist?.products?.some(
    (product) => product._id === productId
  );

  const handleProductClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking wishlist button
    
    if (!isAuthenticated) {
      alert("Please login to add items to wishlist");
      navigate("/login");
      return;
    }

    if (productId) {
      dispatch(toggleProductInWishlist(productId))
        .unwrap()
        .then((result) => {
          console.log(
            result.action === "added"
              ? "Added to wishlist"
              : "Removed from wishlist"
          );
        })
        .catch((error) => {
          console.error("Wishlist error:", error);
        });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (productId) {
      dispatch(
        addProductToCart({
          productId,
          quantity: 1,
          productData: {
            _id: productId,
            name: title,
            image: image,
            images: [image],
            salesPrice: parseFloat(price.replace(/[₦,]/g, "")),
            displayPrice: parseFloat(price.replace(/[₦,]/g, "")),
            categoryName: category,
          },
        })
      )
        .unwrap()
        .then(() => {
          alert("Product added to cart!");
        })
        .catch((error) => {
          console.error("Failed to add to cart:", error);
          alert("Failed to add to cart");
        });
    }
  };

  return (
    <div key={productId} className="inline-block w-full">
      <div
        className="flex flex-col items-start justify-center border rounded-xl p-4 mb-3 w-full h-40 py-4 lg:h-52 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={handleProductClick}
      >
        {discount && (
          <span className="bg-primary text-white text-xs p-2 rounded-3xl">
            {discount}
          </span>
        )}
        <img 
          src={image} 
          alt={title} 
          className="px-4 w-32 m-auto lg:w-36 object-contain" 
        />
      </div>
      <p className="text-[10px] font-semibold text-customGray2 truncate leading-normal uppercase">
        {category}
      </p>
      <h3
        className="text-sm font-medium text-customBrown truncate leading-relaxed cursor-pointer hover:text-primary"
        onClick={handleProductClick}
      >
        {title}
      </h3>
      <div className="flex items-center justify-center gap-1 py-2">
        <img src="/stars.svg" alt="stars" />
        <span className="text-xs md:text-sm font-medium text-customGray3">
          ({reviews} Reviews)
        </span>
      </div>
      <div className="flex items-center justify-center gap-2">
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
          className="flex items-center justify-center gap-2 border rounded border-primary py-2 px-1 w-full hover:bg-blue-50 transition-colors"
        >
          <img src="/blue-cart.svg" alt="cart" />
          <span className="text-[11px] sm:text-sm text-primary font-normal">
            Add to cart
          </span>
        </button>
        <button
          onClick={handleToggleWishlist}
          className={`border rounded py-2 px-3 transition-colors ${
            isInWishlist
              ? "bg-red-50 border-red-500"
              : "border-primary hover:bg-blue-50"
          }`}
        >
          <img
            src={isInWishlist ? "/favorite.svg" : "/favourite.svg"}
            alt="wishlist"
            className="w-6"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
