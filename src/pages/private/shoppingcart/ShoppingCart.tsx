import React, { useEffect, useState } from "react";
import { Plus, Minus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchUserCart,
  removeProductFromCart,
  updateCartItemQuantity,
  removeAllProductFromCart,
  clearCartError,
} from "../../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CartItem } from "../../../services/cart/types";
import CheckoutAuthModal from "./CheckoutAuthModal";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useAppSelector((state) => state.cart);
  const [initialLoad, setInitialLoad] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }

    // Mock coupon codes (replace with actual API call)
    const validCoupons: Record<string, number> = {
      SAVE10: 0.1,
      SAVE20: 0.2,
      WELCOME: 0.15,
    };

    if (validCoupons[code]) {
      setAppliedCoupon({ code, discount: validCoupons[code] });
      setCouponError("");
      alert(`Coupon "${code}" applied! ${validCoupons[code] * 100}% discount`);
    } else {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    return !!token;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // For guest users, try to load from session storage first
    if (!isAuthenticated()) {
      const guestCart = sessionStorage.getItem("guest_cart");
      if (guestCart) {
        try {
          const parsedCart = JSON.parse(guestCart);
          // Dispatch an action to set the cart directly
          dispatch({ type: "cart/setCart", payload: parsedCart });
          setInitialLoad(false);
          return;
        } catch (error) {
          console.error("Error parsing guest cart:", error);
        }
      }
    }

    // For authenticated users or if no guest cart exists, fetch normally
    dispatch(fetchUserCart())
      .unwrap()
      .then(() => {
        setInitialLoad(false);
      })
      .catch((error) => {
        console.error("Failed to fetch cart:", error);
        setInitialLoad(false);
      });
  }, [dispatch]);

  // Update loading logic to be more specific
  const isLoading = loading && initialLoad;

  // More robust empty cart check
  const hasProducts = React.useMemo(() => {
    return (
      cart?.products && Array.isArray(cart.products) && cart.products.length > 0
    );
  }, [cart?.products]);

  // Calculate totals safely
  const calculateTotals = React.useMemo(() => {
    if (!hasProducts || !cart?.products) {
      return {
        subtotal: 0,
        discount: 0,
        couponDiscount: 0,
        deliveryFee: 2000,
        totalAmount: 2000,
        totalItems: 0,
      };
    }

    const subtotal = cart.products.reduce(
      (total: number, item: CartItem) =>
        total + item.product.salesPrice * item.quantity,
      0
    );
    const discount = subtotal * 0.2;
    const couponDiscount = appliedCoupon
      ? subtotal * appliedCoupon.discount
      : 0;
    const deliveryFee = 2000;
    const totalAmount = subtotal - discount - couponDiscount + deliveryFee;
    const totalItems = cart.products.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    );

    return {
      subtotal,
      discount,
      couponDiscount,
      deliveryFee,
      totalAmount,
      totalItems,
    };
  }, [cart?.products, hasProducts, appliedCoupon]);

  const {
    subtotal,
    discount,
    couponDiscount,
    deliveryFee,
    totalAmount,
    totalItems,
  } = calculateTotals;

  // Remove item from cart
  const handleRemoveItem = async (productId: string) => {
    try {
      await dispatch(removeProductFromCart({ productId })).unwrap();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Update item quantity
  const handleQuantityUpdate = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    try {
      await dispatch(
        updateCartItemQuantity({ productId, quantity: newQuantity })
      ).unwrap();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  // Clear entire cart
  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await dispatch(removeAllProductFromCart()).unwrap();
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    }
  };

  // Handle checkout - check authentication first
  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      // Show authentication modal for guest users
      setShowAuthModal(true);
    } else {
      // Proceed to checkout for authenticated users
      navigate("/checkout");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-customGray3">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!hasProducts) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="px-5 py-6 bg-white lg:bg-[#F5F5F5] w-full">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-5">
          <h3 className="text-xl font-semibold text-customBrown mb-2">
            Your cart is empty
          </h3>
          <p className="text-customGray3 mb-6 text-center">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products">
            <button className="bg-primary text-white py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-5">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => dispatch(clearCartError())}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Guest User Notice */}
      {!isAuthenticated() && hasProducts && (
        <div className="bg-amber-50 border border-amber-200 px-4 py-3 mx-5 mt-4 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-amber-600 mt-0.5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm text-amber-800 font-medium">
                Shopping as guest
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Your cart is saved locally. Create an account to proceed with
                checkout.
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="bg-[#F5F5F5]">
        <div className="px-5 py-6 bg-white lg:bg-[#F5F5F5] w-full">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
        </div>

        <div className="lg:flex lg:gap-6 lg:px-5 lg:pb-12">
          {/* Products Section */}
          <div className="bg-white w-full lg:w-2/3 lg:p-6 self-start px-5 lg:rounded-xl lg:border lg:border-[#D9D9D9] lg:shadow-sm">
            {/* Mobile Summary */}
            <div className="lg:hidden bg-[#F5F5F5] px-4 py-3 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-customGray1">
                  Subtotal:{" "}
                  <span className="font-bold">{totalItems} items</span>
                </span>
                <span className="text-sm font-medium">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Products List */}
            <div className="space-y-4">
              {cart!.products.map((item: CartItem) => (
                <div
                  key={item.product._id}
                  className="border-b border-gray-100 pb-4 last:border-b-0"
                >
                  <div className="flex gap-4 items-start">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.images[0] || "/tyres.svg"}
                        alt={item.product.name}
                        className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      {/* Product Name and Price */}
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="text-sm lg:text-base font-medium text-customBrown line-clamp-2 flex-1">
                          {item.product.name}
                        </h3>
                        <p className="text-base lg:text-lg font-semibold text-customBrown whitespace-nowrap ml-2">
                          ₦
                          {(
                            item.product.salesPrice * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>

                      {/* Unit Price */}
                      <p className="text-sm text-customGray3 mb-2">
                        ₦{item.product.salesPrice.toLocaleString()} each
                      </p>

                      {/* Stock Status */}
                      <div className="mb-3">
                        <span
                          className={`text-xs px-2 py-1 rounded ${item.product.stockStatus === "In Stock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {item.product.stockStatus}
                        </span>
                      </div>

                      {/* Quantity Controls and Remove Button */}
                      <div className="flex justify-between items-center">
                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-lg">
                          <button
                            className="p-2 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            onClick={() =>
                              handleQuantityUpdate(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                            disabled={loading || item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-customBrown font-medium min-w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="p-2 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            onClick={() =>
                              handleQuantityUpdate(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
                            disabled={loading}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.product._id)}
                          className="flex items-center gap-1 text-customGray3 hover:text-red-600 transition-colors p-2 disabled:opacity-50"
                          disabled={loading}
                        >
                          <X className="w-4 h-4" />
                          <span className="text-sm hidden sm:inline">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 mt-4 border-t">
              <Link
                to="/products"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors w-full sm:w-auto justify-center sm:justify-start"
              >
                <img
                  src="/arrowleft.svg"
                  alt="Back to shopping"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">Continue Shopping</span>
              </Link>

              <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-500 hover:text-red-700 underline transition-colors px-4 py-2 disabled:opacity-50"
                  disabled={loading}
                >
                  Clear Cart
                </button>

                <button
                  onClick={handleCheckout}
                  className="sm:hidden bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors w-full disabled:opacity-50"
                  disabled={loading || !hasProducts}
                >
                  {loading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3 bg-white p-6 lg:rounded-xl lg:border lg:border-[#D9D9D9] lg:shadow-sm lg:sticky lg:top-6 h-fit">
            {/* Delivery Instructions */}
            <div className="mb-6">
              <label
                htmlFor="instruction"
                className="block text-sm font-semibold text-customBrown mb-3"
              >
                Delivery Instructions
              </label>
              <textarea
                id="instruction"
                className="w-full border border-gray-300 p-3 h-24 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="e.g. Please ensure the part is compatible with a 2016 Toyota Corolla, model LE"
              />
            </div>

            {/* Coupon Code */}
            <div className="mb-6 pb-6 border-b">
              <div className="relative">
                <img
                  src="/address-marker-outline.svg"
                  alt="Coupon"
                  className="w-4 absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setCouponError("");
                  }}
                  placeholder="Enter coupon code"
                  className={`w-full border ${couponError ? "border-red-400" : "border-gray-300"} h-12 pl-10 pr-24 rounded-lg bg-[#FFF8EE] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                  disabled={!!appliedCoupon}
                />
                {!appliedCoupon ? (
                  <button
                    onClick={handleApplyCoupon}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-customGold font-medium hover:text-amber-600 transition-colors px-3 py-1"
                  >
                    APPLY COUPON
                  </button>
                ) : (
                  <button
                    onClick={handleRemoveCoupon}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-red-600 font-medium hover:text-red-700 transition-colors px-3 py-1"
                  >
                    REMOVE
                  </button>
                )}
              </div>
              {couponError && (
                <p className="text-xs text-red-500 mt-1">{couponError}</p>
              )}
              {appliedCoupon && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Coupon "{appliedCoupon.code}" applied (
                  {appliedCoupon.discount * 100}% off)
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="text-lg font-semibold text-customBrown">
                  Order Summary
                </h3>
                <p className="text-sm text-customGray3">
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-customGray3">Subtotal:</span>
                  <span className="font-semibold text-customBrown">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-customGray3">Discount:</span>
                  <span className="text-customBrown font-medium">
                    -₦{discount.toLocaleString()}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-customGray3">Coupon Discount:</span>
                    <span className="text-green-600 font-medium">
                      -₦{couponDiscount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-customGray3 flex items-center gap-2">
                    Delivery
                    <span className="text-[10px] text-primary font-medium bg-[#BFCCD8] px-2 py-1 rounded-full">
                      standard
                    </span>
                  </span>
                  <span className="text-customBrown font-medium">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold text-customBrown">
                  Total
                </span>
                <span className="text-lg font-bold text-customBrown">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button - Desktop */}
            <button
              onClick={handleCheckout}
              className="hidden lg:block mt-6 bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors w-full disabled:opacity-50 font-medium"
              disabled={loading || !hasProducts}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      <CheckoutAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default ShoppingCart;
