import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchWishlist,
  toggleProductInWishlist,
} from "../../../../../store/slices/wishlistSlice";
import { addProductToCart } from "../../../../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import LoaderSpinner from "../../../../../components/LoaderSpinner";

const SavedItems = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wishlist, loading } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const itemsPerPage = 12;

  // wishlist products
  const wishlistProducts = wishlist?.products || [];
  const totalItems = wishlistProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = wishlistProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Fetch wishlist on mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleToggleWishlist = async (productId: string) => {
    try {
      await dispatch(toggleProductInWishlist(productId)).unwrap();
    } catch {}
  };

  const handleAddToCart = async (productId: string, product: any) => {
    setAddingToCart(productId);
    try {
      await dispatch(
        addProductToCart({
          productId,
          quantity: 1,
          productData: {
            _id: product._id,
            name: product.name,
            image: product.image,
            images: product.images || [product.image],
            salesPrice: product.salesPrice || product.displayPrice,
            displayPrice: product.displayPrice || product.salesPrice,
            stockStatus: product.stockStatus || "In Stock",
            brand: product.brand || {
              _id: "unknown",
              name: product.brandName || "Unknown",
            },
          },
        })
      ).unwrap();
      alert("Product added to cart!");
    } catch {
    } finally {
      setAddingToCart(null);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-4 md:p-5 mb-12">
        <h1 className="text-customBrown font-medium text-xl pb-4">
          Saved Items
        </h1>
        <div className="flex items-center justify-center py-20">
          <LoaderSpinner txt="Loading wishlist" />
        </div>
      </div>
    );
  }

  // Empty state
  if (!wishlist || wishlistProducts.length === 0) {
    return (
      <div className="p-4 md:p-5 mb-12">
        <h1 className="text-customBrown font-medium text-xl pb-4">
          Saved Items
        </h1>
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="/empty-wishlist.svg"
            alt="Empty wishlist"
            className="w-32 h-32 mb-4"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
          />
          <p className="text-gray-500 text-lg mb-2">Your wishlist is empty</p>
          <p className="text-gray-400 text-sm mb-4">
            Start adding products you love to your wishlist
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-5 mb-12">
      <h1 className="text-customBrown font-medium text-xl pb-4">
        Saved Items ({totalItems})
      </h1>
      <section className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {currentItems.map((product) => (
          <div
            key={product._id}
            className="w-full bg-white rounded-[20px] p-2 lg:p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Remove from wishlist button */}
            <div
              className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] bg-red-50 flex items-center justify-center rounded ml-auto cursor-pointer hover:bg-red-100 transition-colors"
              onClick={() => handleToggleWishlist(product._id)}
              title="Remove from wishlist"
            >
              <img src="/favorite.svg" alt="Remove" className="w-[15px]" />
            </div>

            {/* Discount badge */}
            {product.discount && (
              <div className="w-[38px] h-[38px] bg-primary rounded-[20px] flex items-center justify-center -mt-2">
                <span className="text-xs font-normal text-white">
                  -{product.discount}%
                </span>
              </div>
            )}

            {/* Product image */}
            <div
              className="cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <img
                src={
                  (Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0]
                    : product.image) || "/placeholder.png"
                }
                alt={product.name}
                className="w-full h-[110px] lg:h-[200px] object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
            </div>

            {/* Product details */}
            <div className="space-y-1 pb-3 pt-5 lg:space-y-2 lg:pb-5 lg:pt-7">
              <h2 className="text-[10px] font-semibold text-customGray2 truncate uppercase">
                {product.categoryName || "PRODUCT"}
              </h2>
              <p
                className="text-sm font-medium text-customBrown truncate cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleProductClick(product._id)}
              >
                {product.name}
              </p>
              <div className="flex items-center gap-1">
                <img src="/stars.svg" alt="stars" />
                <span className="text-xs md:text-sm font-medium text-customGray3">
                  ({product.numReviews || 0} Reviews)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-customBrown">
                  ₦
                  {product.salesPrice?.toLocaleString() ||
                    product.displayPrice?.toLocaleString()}
                </p>
                {product.regularPrice &&
                  product.regularPrice >
                    (product.salesPrice || product.displayPrice) && (
                    <p className="text-[11px] font-semibold text-customGray3 line-through">
                      ₦{product.regularPrice.toLocaleString()}
                    </p>
                  )}
              </div>
            </div>

            {/* Add to cart button */}
            <button
              onClick={() => handleAddToCart(product._id, product)}
              disabled={addingToCart === product._id}
              className={`flex items-center justify-center gap-2 border rounded border-primary py-3 px-1 w-full transition-colors ${
                addingToCart === product._id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-blue-700"
              }`}
            >
              {addingToCart === product._id ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                  <span className="text-[11px] text-white font-semibold">
                    Adding...
                  </span>
                </>
              ) : (
                <>
                  <img src="/cart-w.svg" alt="cart" className="w-[13px]" />
                  <span className="text-[11px] text-sm text-white font-semibold">
                    Add to cart
                  </span>
                </>
              )}
            </button>
          </div>
        ))}
      </section>

      {/* Pagination - only show if there are multiple pages */}
      {totalPages > 1 && (
        <>
          <div className="flex justify-center items-center gap-2 pt-6 pb-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-[35px] w-[35px] border rounded-3xl disabled:opacity-50 flex justify-center items-center hover:bg-gray-100 transition-colors"
            >
              <img
                src="/next.svg"
                alt="Previous"
                className="w-[5px] rotate-180"
              />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded-3xl transition-colors ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="h-[35px] w-[35px] border rounded-3xl disabled:opacity-50 flex justify-center items-center hover:bg-gray-100 transition-colors"
            >
              <img src="/next.svg" alt="Next" className="w-[5px]" />
            </button>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-xs text-customBrown">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)}{" "}
              of {totalItems} Products
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedItems;
