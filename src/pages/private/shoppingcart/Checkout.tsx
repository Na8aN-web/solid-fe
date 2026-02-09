import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchUserCart } from "../../../store/slices/cartSlice";
import { fetchAllAddresses, setSelectedAddress } from "../../../store/slices/addressSlice";
import { applyCoupon, initiatePayment, clearCoupon, clearPaymentLink, clearCheckoutError, InitiatePaymentRequest } from "../../../store/slices/checkoutSlice";
import { CartItem } from "../../../services/cart/types";
import { Address } from "../../../store/slices/addressSlice";

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { cart, loading: cartLoading } = useAppSelector((state) => state.cart);
  const { addresses, selectedAddress, loading: addressLoading } = useAppSelector(
    (state) => state.address
  );
  const {
    couponLoading,
    couponError,
    couponDiscount,
    paymentLoading,
    paymentError,
    paymentLink,
    appliedCouponCode
  } = useAppSelector((state) => state.checkout);

  const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType | null>(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [userId, setUserId] = useState<string>("");

  enum DeliveryType {
    FastDelivery = "fast-delivery",
    StandardDelivery = "standard-delivery",
  }

  const deliveryTypes = [
    {
      type: DeliveryType.FastDelivery,
      label: "Fast Delivery",
      price: 7700,
      description: "To be delivered Tomorrow 03-24",
      recommendation: "Recommended",
    },
    {
      type: DeliveryType.StandardDelivery,
      label: "Standard Delivery",
      price: 1700,
      description: "To be delivered between Fri 03 -10 Dec 24",
    },
  ];

  useEffect(() => {
    dispatch(fetchUserCart());
    dispatch(fetchAllAddresses());
    
    // Get user ID from localStorage or your auth state
    const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    
    // Get current user from your auth state
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserId(user._id || user.id || "");
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, [dispatch]);

   useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (!token) {
      // Store redirect intent
      sessionStorage.setItem('checkout_redirect', 'true');
      // Redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Handle payment link redirection
  useEffect(() => {
    if (paymentLink) {
      // Redirect to payment gateway or show payment modal
      window.open(paymentLink, '_blank');
      
      // Optional: Track payment initiation
      console.log("Payment initiated, redirecting to:", paymentLink);
      
      // Clear payment link after use
      setTimeout(() => {
        dispatch(clearPaymentLink());
      }, 3000);
    }
  }, [paymentLink, dispatch]);

  // Clear errors on component unmount
  useEffect(() => {
    return () => {
      dispatch(clearCheckoutError());
    };
  }, [dispatch]);

  // Calculate totals with coupon discount
  const calculateTotals = () => {
    if (!cart?.products || cart.products.length === 0) {
      return { subtotal: 0, discount: 0, couponDiscountAmount: 0, deliveryFee: 0, total: 0 };
    }

    const subtotal = cart.products.reduce(
      (sum: number, item: CartItem) => sum + item.product.salesPrice * item.quantity,
      0
    );
    
    // Apply coupon discount if available
    const couponDiscountAmount = couponDiscount ? (subtotal * couponDiscount) / 100 : 0;
    const regularDiscount = subtotal * 0.2; // Your existing 20% discount
    const totalDiscount = regularDiscount + couponDiscountAmount;
    
    const selectedDelivery = deliveryTypes.find(d => d.type === selectedDeliveryType);
    const deliveryFee = selectedDelivery ? selectedDelivery.price : 0;
    const total = subtotal - totalDiscount + deliveryFee;

    return { 
      subtotal, 
      discount: regularDiscount, 
      couponDiscount: couponDiscountAmount,
      deliveryFee, 
      total,
      totalDiscount
    };
  };

  const { subtotal, discount, couponDiscount: couponDiscountAmount, deliveryFee, total, totalDiscount } = calculateTotals();

  const handleDeliveryTypeSelect = (type: DeliveryType) => {
    setSelectedDeliveryType(type);
  };

  const handleAddressSelect = (addressId: string) => {
    const address = addresses.find((addr) => addr._id === addressId);
    if (address) {
      dispatch(setSelectedAddress(address));
      setShowAddressModal(false);
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      alert("Please enter a coupon code");
      return;
    }
    
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
    
    dispatch(applyCoupon({ 
      code: couponCode.trim(), 
      userId: userId 
    }));
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    dispatch(clearCoupon());
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    if (!selectedDeliveryType) {
      alert("Please select a delivery method");
      return;
    }
    if (!cart?.products || cart.products.length === 0) {
      alert("Your cart is empty");
      return;
    }
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    // Prepare payment data
    const paymentData: InitiatePaymentRequest = {
      provider: "opay" as const,
      amount: total * 100, // Convert to kobo/pesewas
      orderId: `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: selectedAddress.email,
      phone: selectedAddress.phone,
      user: {
        id: userId,
        firstName: selectedAddress.firstName,
        lastName: selectedAddress.lastName,
        address: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          country: "Nigeria" // Add if available
        }
      }
    };

    // Dispatch payment initiation
    dispatch(initiatePayment(paymentData));
  };

  const ProductReview = () => (
    <div className="pt-8">
      <h3 className="text-sm font-semibold text-customGray1 pb-3">
        Product Details & Review
      </h3>
      {cart?.products && cart.products.length > 0 ? (
        <>
          {cart.products.map((item: CartItem) => (
            <div
              key={item.product._id}
              className="border-b lg:border lg:rounded-xl lg:p-5 border-[#D9D9D9] pb-4 mb-4 w-full"
            >
              <div className="flex gap-6 items-center">
                <div className="lg:border lg:rounded-2xl lg:px-5 py-3">
                  <img
                    src={item.product.images[0] || "/tyres.svg"}
                    alt={item.product.name}
                    className="w-[100px]"
                  />
                </div>
                <div className="lg:flex lg:justify-between w-full space-y-1">
                  <div className="space-y-1">
                    <p className="text-xs text-customBrown font-normal">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-customGray3 hidden lg:block">
                      Delivery fee:{" "}
                      <span className="text-[#15B70D] font-semibold">Free</span>
                    </p>
                    <p className="text-sm font-semibold text-customBrown">
                      ₦{item.product.salesPrice.toLocaleString()}{" "}
                      <span className="text-customGray3">per item</span>
                    </p>
                  </div>
                  <div className="flex gap-1 items-center lg:flex-col lg:gap-6">
                    <p className="text-xs lg:text-sm text-customGray3">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-xs lg:text-base lg:text-primary text-customGray3 font-bold">
                      (₦{(item.product.salesPrice * item.quantity).toLocaleString()})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link to="/cart">
            <p className="text-base text-primary font-semibold text-center cursor-pointer hover:underline">
              Modify Cart
            </p>
          </Link>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-customGray3 mb-4">Your cart is empty</p>
          <Link to="/products">
            <button className="bg-primary text-white px-6 py-2 rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );

  if (cartLoading || addressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-customGray3">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Error Modals */}
      {(couponError || paymentError) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600">Error</h3>
              <button
                onClick={() => dispatch(clearCheckoutError())}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              {couponError || paymentError}
            </p>
            <button
              onClick={() => dispatch(clearCheckoutError())}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <section className="p-5 sm:px-8 lg:px-10 lg:bg-[#F5F5F5]">
        <h2 className="text-xl text-customBrown font-semibold lg:hidden">
          Checkout
        </h2>
        <Link
          to="/cart"
          className="hidden lg:flex items-center gap-2 pb-6 pt-2"
        >
          <img src="/arrowleft.svg" alt="" />
          <p className="text-sm text-primary font-semibold">Back to cart</p>
        </Link>

        <section className="lg:flex lg:gap-5 lg:pb-12">
          {/* Payment details and review Desktop*/}
          <section className="bg-white w-full lg:w-2/3 lg:px-10 self-start lg:pb-8 lg:rounded-lg lg:border lg:border-[#D9D9D9]">
            <div className="hidden lg:block">
              <ProductReview />
            </div>

            {/* Delivery Address */}
            <div className="pt-6">
              <h3 className="text-sm font-semibold text-customGray1 pb-3">
                Delivery Address
              </h3>
              
              {selectedAddress ? (
                <div className="shadow-[0_4px_12px_#00000026] rounded-lg p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="/home-outline.svg" alt="" className="w-4" />
                        <p className="text-sm font-semibold text-customBrown">
                          {selectedAddress.firstName} {selectedAddress.lastName}
                        </p>
                        {selectedAddress.isDefault && (
                          <span className="bg-[#BFCCD8] text-xs text-primary px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-customGray3 mb-1">
                        {selectedAddress.street}
                      </p>
                      <p className="text-sm text-customGray3 mb-1">
                        {selectedAddress.city}, {selectedAddress.state}
                      </p>
                      <p className="text-sm text-customGray3">
                        {selectedAddress.phone} | {selectedAddress.email}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="text-primary text-sm hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                <div className="shadow-[0_4px_12px_#00000026] rounded-lg p-5 flex justify-center items-center flex-col text-center space-y-3">
                  <img src="/checkoutaddress.svg" alt="" />
                  <p className="text-base text-customBrown">No address saved</p>
                  <p className="text-xs text-customGray3">
                    Add an address to specify your delivery address
                  </p>
                  <Link to="/add-address" className="w-full">
                    <button className="bg-primary rounded p-4 w-full text-base text-white font-normal">
                      Add delivery address
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Address Selection Modal */}
            {showAddressModal && addresses.length > 0 && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Select Address</h3>
                    <button
                      onClick={() => setShowAddressModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div
                        key={address._id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedAddress?._id === address._id
                            ? "border-primary bg-blue-50"
                            : "border-gray-200 hover:border-primary"
                        }`}
                        onClick={() => handleAddressSelect(address._id)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold">
                            {address.firstName} {address.lastName}
                          </p>
                          {address.isDefault && (
                            <span className="bg-[#BFCCD8] text-xs text-primary px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-customGray3">{address.street}</p>
                        <p className="text-sm text-customGray3">
                          {address.city}, {address.state}
                        </p>
                        <p className="text-sm text-customGray3">
                          {address.phone} | {address.email}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link to="/add-address">
                    <button className="mt-4 w-full border border-primary text-primary py-3 rounded-lg hover:bg-blue-50">
                      Add New Address
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Delivery Shipping */}
            <div className="pt-8">
              <h3 className="text-sm text-customGray1 pb-3 font-semibold">
                Delivery Shipping
              </h3>
              <div className="space-y-4">
                {deliveryTypes.map((deliveryType) => (
                  <div
                    key={deliveryType.type}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all duration-300
                      ${
                        selectedDeliveryType === deliveryType.type
                          ? "border-[#003366]"
                          : "border-[#E3E6EA] hover:border-blue-300"
                      }
                    `}
                    onClick={() => handleDeliveryTypeSelect(deliveryType.type)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3
                          ${
                            selectedDeliveryType === deliveryType.type
                              ? "border-[#003366] bg-[#003366] text-white"
                              : "border-[#E3E6EA]"
                          }
                        `}
                      >
                        {selectedDeliveryType === deliveryType.type && (
                          <span className="text-xs">✓</span>
                        )}
                      </div>
                      <div className="flex justify-between w-full">
                        <h3
                          className={`font-normal text-sm ${
                            selectedDeliveryType === deliveryType.type
                              ? "text-customBrown"
                              : "text-[#5E5E5E]"
                          }`}
                        >
                          ₦{deliveryType.price.toLocaleString()}{" "}
                          <span className="inline-block bg-gray-200 h-2 w-2 mb-[2px] rounded-full"></span>{" "}
                          {deliveryType.label}
                        </h3>
                        {deliveryType.recommendation && (
                          <div className="px-2 py-[5px] rounded-md bg-[#BFCCD8]">
                            <p className="text-xs text-primary">
                              {deliveryType.recommendation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <p
                      className={`text-sm mt-2 pl-8 ${
                        selectedDeliveryType === deliveryType.type
                          ? "text-[#003366]"
                          : "text-[#5E5E5E]"
                      }`}
                    >
                      {deliveryType.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right Side - Instructions and Payment */}
          <section className="lg:w-1/3 bg-white lg:px-8 lg:pb-8 self-start lg:rounded-lg">
            <div className="pt-6">
              <label
                htmlFor="InstructDelivery"
                className="leading-8 text-sm text-customGray1 pb-3 font-semibold"
              >
                Instruction on Delivery
              </label>
              <textarea
                name="InstructDelivery"
                placeholder="e.g. Please ensure the part is compatible with a 2016 Toyota Corolla, model LE"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none h-24"
              />
            </div>

            {/* Payment Methods */}
            <div className="pt-8">
              <h3 className="text-sm text-customGray1 pb-2 font-semibold">
                Payment Methods
              </h3>
              <p className="text-sm text-customGray3 pb-3">
                Select a payment method
              </p>
              <div className="flex justify-between gap-4">
                <div className="flex-1 border px-5 py-7 rounded-xl cursor-pointer hover:border-primary transition-colors">
                  <img src="/paymentcard.svg" alt="" />
                  <p className="text-sm text-customGray3 pt-2">
                    Pay with Debit card/ Credit card
                  </p>
                </div>
                <div className="flex-1 border px-5 py-7 rounded-xl cursor-pointer hover:border-primary transition-colors">
                  <img src="/bank.svg" alt="" />
                  <p className="text-sm text-customGray3 pt-2">
                    Pay with Bank transfer
                  </p>
                </div>
              </div>
            </div>

            {/* Product Review Mobile */}
            <div className="lg:hidden">
              <ProductReview />
            </div>

            {/* Payment Summary */}
            <div>
              <div className="space-y-2 pt-6">
                <div className="flex justify-between pt-2">
                  <p className="text-sm text-customGray3">Subtotal:</p>
                  <span className="text-sm font-semibold text-customBrown">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-customGray3">Discount:</p>
                  <span className="text-xs text-customBrown font-medium">
                    (20%) -₦{discount.toLocaleString()}
                  </span>
                </div>
                
                {/* Coupon Discount Display */}
                {couponDiscount && (
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-customGray3 flex items-center gap-2">
                      Coupon Discount
                      {appliedCouponCode && (
                        <span className="text-xs text-primary bg-green-100 px-2 py-1 rounded">
                          {appliedCouponCode}
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600 font-medium">
                        ({couponDiscount}%) -₦{(couponDiscountAmount || 0).toLocaleString()}
                      </span>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <p className="text-sm text-customGray3 flex gap-2 items-center">
                    Delivery
                    {selectedDeliveryType && (
                      <span className="text-[10px] text-primary font-medium flex gap-2 bg-[#BFCCD8] px-3 py-[2px] rounded-2xl">
                        {selectedDeliveryType === DeliveryType.FastDelivery ? "fast" : "standard"}
                      </span>
                    )}
                  </p>
                  <span className="text-xs text-customBrown font-medium">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-customBrown pb-2 border-b">
                  <h3>Total</h3>
                  <p>₦{total.toLocaleString()}</p>
                </div>
              </div>
              
              {/* Coupon Section */}
              <div className="relative pt-3 pb-5 border-b">
                <img
                  src="/address-marker-outline.svg"
                  alt=""
                  className="w-4 absolute left-4 top-7"
                />
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponLoading || !!couponDiscount}
                  className={`border h-12 px-10 w-full rounded-lg ${
                    couponDiscount ? 'bg-green-50' : 'bg-[#FFF8EE]'
                  } text-base disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !couponCode.trim() || !!couponDiscount}
                  className="absolute right-4 bottom-9 text-xs text-customGold cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {couponLoading ? (
                    <span className="flex items-center gap-1">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-customGold"></div>
                      Applying...
                    </span>
                  ) : couponDiscount ? (
                    "Applied ✓"
                  ) : (
                    "APPLY COUPON"
                  )}
                </button>
              </div>
              
              {couponLoading && (
                <div className="text-center py-2">
                  <p className="text-sm text-blue-600">Applying coupon...</p>
                </div>
              )}
              
              <button
                onClick={handleCheckout}
                disabled={
                  !selectedAddress || 
                  !selectedDeliveryType || 
                  cartLoading || 
                  paymentLoading ||
                  !cart?.products ||
                  cart.products.length === 0
                }
                className="bg-primary py-4 text-white text-sm rounded w-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center"
              >
                {paymentLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  `Pay ₦${total.toLocaleString()}`
                )}
              </button>
              
              {paymentLoading && (
                <p className="text-center text-sm text-blue-600 mt-2">
                  Redirecting to payment gateway...
                </p>
              )}
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Checkout;