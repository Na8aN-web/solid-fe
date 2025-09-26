import React, { useEffect } from "react";
import { Plus, Minus, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  fetchUserCart,
  removeProductFromCart,
  updateCartItemQuantity,
  removeAllProductFromCart,
  clearCartError
} from "../../../store/slices/cartSlice"; 
import { useAppDispatch, useAppSelector } from "../../../store/hooks"; // Use your typed hooks

// Define your cart types (adjust based on your actual types file)
interface Cart {
  _id: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    inStock?: boolean;
  };
  quantity: number;
  price: number;
}

const ShoppingCart = () => {
  // Use typed hooks instead of the regular ones
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    // Fetch cart data when component mounts
    dispatch(fetchUserCart());
  }, [dispatch]);

  useEffect(() => {
    // Clear error after some time
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearCartError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleQuantityUpdate = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      // Now this should work without TypeScript errors
      await dispatch(updateCartItemQuantity({ productId, quantity: newQuantity })).unwrap();
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await dispatch(removeProductFromCart({ productId })).unwrap();
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleClearCart = async () => {
    try {
      await dispatch(removeAllProductFromCart()).unwrap();
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  // Loading state
  if (loading && !cart) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-customGray3">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cart) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen">
        <div className="px-5 py-6 bg-white lg:bg-[#F5F5F5] w-full">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-customBrown mb-2">Your cart is empty</h3>
            <p className="text-customGray3 mb-6">Add some items to get started</p>
            <Link 
              to="/products" 
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // const subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  // const discount = subtotal * 0.2; // 20% discount as shown in your original code
  // const deliveryFee = 2000; // Standard delivery fee
  // const totalAmount = subtotal - discount + deliveryFee;

  return (
    <div>
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

      {/* <section className="bg-[#F5F5F5]">
        <div className="px-5 py-6 bg-white lg:bg-[#F5F5F5] w-full">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
        </div>
        <div className="lg:flex lg:gap-5 lg:px-5 lg:pb-12">
          <div className="bg-white w-full lg:w-2/3 lg:p-5 self-start px-5 lg:rounded-lg lg:border lg:border-[#D9D9D9]">
            <table className="w-full">
              <tr className="w-full bg-[#F5F5F5]">
                <td className="pl-3 py-4 text-sm text-customGray1 font-normal lg:hidden">
                  subtotal: <span className="font-bold">total items</span>
                </td>
                <td className="text-sm font-medium pr-3 py-4 lg:hidden">
                  ₦subtotal
                </td>
                <td className="pl-5 py-4 text-sm text-customGray1 font-normal hidden lg:table-cell">
                  Item details
                </td>
                <td className="text-sm font-medium pr-5 py-4 hidden lg:table-cell">
                  Item price total
                </td>
                <td className="text-sm font-medium pr-5 py-4 hidden lg:table-cell">
                  Action
                </td>
              </tr>
              
              {cart.items.map((item) => (
                <tr key={item._id} className="border-t">
                  <td>
                    <div className="flex gap-8 py-5 px-2 w-full">
                      
                      <div className="flex flex-col gap-4">
                        <img
                          src={item.productId.image || "/tyres.svg"}
                          alt={item.productId.name}
                          className="w-[80px] h-[80px] object-cover"
                        />

                        
                        <div className="flex items-center justify-center border rounded-[2px] max-w-[106px] h-[28px] lg:hidden">
                          <button
                            className="flex-1 w-full text-center active:bg-[#b5b4b4] disabled:opacity-50"
                            onClick={() => handleQuantityUpdate(item.productId._id, item.quantity - 1)}
                            disabled={loading || item.quantity <= 1}
                          >
                            <Minus className="w-4" />
                          </button>
                          <span className="flex-[2] w-full text-center border-l border-r text-customBrown text-base font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="flex-1 w-full text-center active:bg-[#b5b4b4] disabled:opacity-50"
                            onClick={() => handleQuantityUpdate(item.productId._id, item.quantity + 1)}
                            disabled={loading}
                          >
                            <Plus className="w-4" />
                          </button>
                        </div>
                      </div>

                      
                      <div className="flex flex-col justify-between">
                        <div className="space-y-1/2 block">
                          <p className="text-sm text-customBrown">
                            {item.productId.name}
                          </p>
                          <p className="text-base text-customBrown">
                            ₦{item.productId.price.toLocaleString()}
                          </p>

                  
                          <div className="flex flex-col gap-1">
                            <span className={`text-xs ${item.productId.inStock !== false ? 'text-[#15B70D]' : 'text-red-500'}`}>
                              {item.productId.inStock !== false ? 'In Stock' : 'Out of Stock'}
                            </span>

                            
                            <div className="hidden lg:flex items-center justify-center border rounded-[2px] max-w-[106px] h-[28px]">
                              <button
                                className="flex-1 w-full text-center active:bg-[#b5b4b4] disabled:opacity-50"
                                onClick={() => handleQuantityUpdate(item.productId._id, item.quantity - 1)}
                                disabled={loading || item.quantity <= 1}
                              >
                                <Minus className="w-4" />
                              </button>
                              <span className="flex-[2] w-full text-center border-l border-r text-customBrown text-base font-medium">
                                {item.quantity}
                              </span>
                              <button
                                className="flex-1 w-full text-center active:bg-[#b5b4b4] disabled:opacity-50"
                                onClick={() => handleQuantityUpdate(item.productId._id, item.quantity + 1)}
                                disabled={loading}
                              >
                                <Plus className="w-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        
                        <div 
                          className="flex gap-2 items-center lg:hidden cursor-pointer hover:opacity-70"
                          onClick={() => handleRemoveItem(item.productId._id)}
                        >
                          <X className="w-4" />
                          <p className="text-sm text-customGray3">Remove</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td className="hidden lg:table-cell">
                    <div 
                      className="flex gap-2 items-center cursor-pointer hover:opacity-70"
                      onClick={() => handleRemoveItem(item.productId._id)}
                    >
                      <X className="w-4" />
                      <p className="text-sm text-customGray3">Remove</p>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
            
            <div className="flex justify-between items-center py-4">
              <Link
                to="/products"
                className="flex items-center gap-2 py-8 lg:pt-12 lg:pb-0"
              >
                <img src="/arrowleft.svg" alt="" />
                <p className="text-sm text-primary">Continue Shopping</p>
              </Link>
              
              <button
                onClick={handleClearCart}
                className="text-sm text-red-500 hover:text-red-700 underline"
                disabled={loading}
              >
                Clear Cart
              </button>
            </div>
            
            <Link to="/checkout">
              <button 
                className="bg-primary py-4 text-white text-sm rounded w-full lg:hidden disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Proceed to checkout'}
              </button>
            </Link>
          </div>
          
          <div className="lg:w-1/3 bg-white p-5 lg:rounded-lg">
            <div className="hidden lg:block">
              <div>
                <form action="" className="">
                  <label
                    htmlFor="instruction"
                    className="text-sm font-semibold text-customBrown"
                  >
                    Instruction on Delivery
                  </label>
                  <textarea
                    name="instruction"
                    id=""
                    className="w-full border p-4 h-[100px] rounded-lg mt-3"
                    placeholder="e.g. Please ensure the part is compatible with a 2016 Toyota Corolla, model LE"
                  ></textarea>
                  <div className="relative pt-3 pb-5 border-b">
                    <img
                      src="/address-marker-outline.svg"
                      alt=""
                      className="w-4 absolute left-4 top-7"
                    />
                    <input
                      type="text"
                      placeholder="Enter Code Here"
                      className="border h-12 px-10 w-full rounded-lg bg-[#FFF8EE] text-base"
                    />
                    <span className="absolute right-4 bottom-9 text-xs text-customGold">
                      APPLY COUPON
                    </span>
                  </div>
                  <div className="space-y-2 pt-6">
                    <div className="flex justify-between text-sm font-semibold text-customBrown pb-1 border-b">
                      <h3>Order Summary</h3>
                      <p>{cart.totalItems} Items</p>
                    </div>
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
                    <div className="flex justify-between">
                      <p className="text-sm text-customGray3 flex gap-2 items-center">
                        Delivery
                        <span className="text-[10px] text-primary font-medium flex gap-2 bg-[#BFCCD8] px-3 py-[2px] rounded-2xl">
                          standard
                          <img
                            src="/standardarrow.svg"
                            alt="Delivery Type Arrow"
                          />
                        </span>
                      </p>
                      <span className="text-xs text-customBrown font-medium">
                        ₦{deliveryFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-customBrown pb-2 border-b">
                      <h3>Total</h3>
                      <p>₦{totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <button 
                      className="bg-primary py-4 text-white text-sm rounded w-full mt-4 disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Proceed to checkout'}
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ShoppingCart;