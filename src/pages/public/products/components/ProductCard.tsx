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

import React, { useState } from "react";
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

  // Modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"login" | "success" | "error">("login");

  // Check if product is in wishlist
  const isInWishlist = wishlist?.products?.some(
    (product) => product._id === productId
  );

  const handleProductClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const closeModal = () => {
    setShowLoginModal(false);
    setShowCartModal(false);
    setShowWishlistModal(false);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking wishlist button
    
    if (!isAuthenticated) {
      setModalType("login");
      setModalMessage("Please login to add items to wishlist");
      setShowLoginModal(true);
      return;
    }

    if (productId) {
      dispatch(toggleProductInWishlist(productId))
        .unwrap()
        .then((result) => {
          setModalType("success");
          setModalMessage(
            result.action === "added"
              ? "Added to wishlist successfully!"
              : "Removed from wishlist successfully!"
          );
          setShowWishlistModal(true);
        })
        .catch((error) => {
          setModalType("error");
          setModalMessage("Failed to update wishlist. Please try again.");
          setShowWishlistModal(true);
          console.error("Wishlist error:", error);
        });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    
    if (!isAuthenticated) {
      setModalType("login");
      setModalMessage("Please login to add items to cart");
      setShowLoginModal(true);
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
          setModalType("success");
          setModalMessage("Product added to cart successfully!");
          setShowCartModal(true);
        })
        .catch((error) => {
          setModalType("error");
          setModalMessage("Failed to add to cart. Please try again.");
          setShowCartModal(true);
          console.error("Failed to add to cart:", error);
        });
    }
  };

  const handleLoginRedirect = () => {
    closeModal();
    navigate("/login");
  };

  // Reusable Modal Component
  const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    message, 
    type,
    showLoginButton = false 
  }: { 
    isOpen: boolean; 
    onClose: () => void; 
    title: string; 
    message: string; 
    type: "login" | "success" | "error";
    showLoginButton?: boolean;
  }) => {
    if (!isOpen) return null;

    const getIcon = () => {
      switch (type) {
        case "success":
          return (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          );
        case "error":
          return (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          );
        case "login":
          return (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          );
      }
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            {getIcon()}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 mb-6">{message}</p>
            </div>
            <div className="flex justify-center gap-3">
              {showLoginButton ? (
                <>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLoginRedirect}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-800 focus:outline-none"
                  >
                    Go to Login
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-800 focus:outline-none"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Modals */}
      <Modal
        isOpen={showLoginModal}
        onClose={closeModal}
        title="Authentication Required"
        message={modalMessage}
        type={modalType}
        showLoginButton={true}
      />

      <Modal
        isOpen={showCartModal}
        onClose={closeModal}
        title={modalType === "success" ? "Success!" : "Error!"}
        message={modalMessage}
        type={modalType}
      />

      <Modal
        isOpen={showWishlistModal}
        onClose={closeModal}
        title={modalType === "success" ? "Success!" : "Error!"}
        message={modalMessage}
        type={modalType}
      />

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
    </>
  );
};

export default ProductCard;