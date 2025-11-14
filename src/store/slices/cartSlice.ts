import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import { cartState, Cart, CartResponse, CartItem } from "../../services/cart/types";

const initialState: cartState = {
  cart: null,
  loading: false,
  error: null,
};

// Session storage key for guest cart
const GUEST_CART_KEY = 'guest_cart';

// Helper function to check if user is authenticated
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  return !!token;
};

// Helper functions for guest cart management
const getGuestCart = (): Cart | null => {
  try {
    const cartData = sessionStorage.getItem(GUEST_CART_KEY);
    if (!cartData) return null;
    return JSON.parse(cartData);
  } catch (error) {
    console.error('Error reading guest cart:', error);
    return null;
  }
};

const saveGuestCart = (cart: Cart): void => {
  try {
    sessionStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving guest cart:', error);
  }
};

const clearGuestCart = (): void => {
  try {
    sessionStorage.removeItem(GUEST_CART_KEY);
  } catch (error) {
    console.error('Error clearing guest cart:', error);
  }
};

// Helper function to create empty cart structure
const createEmptyCart = (): Cart => ({
  products: [],
  total: 0,
  _id: 'guest',
  user: 'guest',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

// Helper function to normalize cart response
const normalizeCartResponse = (data: any): Cart => {
  if (data.cart) {
    return data.cart;
  }

  if (data.products) {
    return {
      products: data.products,
      total: data.total || data.products.reduce((sum: number, item: any) =>
        sum + (item.totalPrice || 0), 0
      ),
      _id: data._id || '',
      user: data.user || ''
    } as Cart;
  }

  return data as Cart;
};

// Fetch cart - loads guest cart for non-authenticated users, backend cart for authenticated users
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    // If not authenticated, return guest cart from session storage
    if (!isAuthenticated()) {
      const guestCart = getGuestCart();
      console.log("Loading guest cart:", guestCart);
      return guestCart || createEmptyCart();
    }

    // Authenticated: fetch from backend
    try {
      const response = await axiosInstance.get<any>("/cart");
      console.log("Raw cart response:", response.data);
      const normalizedCart = normalizeCartResponse(response.data);
      console.log("Normalized cart:", normalizedCart);
      return normalizedCart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// Add product to cart
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (
    { productId, quantity, productData }: { productId: string; quantity: number; productData?: any },
    { rejectWithValue, getState }
  ) => {
    // Guest user: handle locally only
    if (!isAuthenticated()) {
      try {
        const state = getState() as any;
        let currentCart = state.cart.cart || getGuestCart() || createEmptyCart();

        // Ensure we have product data for guest cart
        if (!productData) {
          return rejectWithValue("Product data is required for adding to cart");
        }

        const updatedCart = {
          ...currentCart,
          products: [...currentCart.products]
        };

        // Check if product already exists in cart
        const existingItemIndex = updatedCart.products.findIndex(
          (item: CartItem) => item.product._id === productId
        );

        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          updatedCart.products[existingItemIndex] = {
            ...updatedCart.products[existingItemIndex],
            quantity: updatedCart.products[existingItemIndex].quantity + quantity,
            totalPrice: updatedCart.products[existingItemIndex].product.salesPrice *
              (updatedCart.products[existingItemIndex].quantity + quantity)
          };
        } else {
          // Add new item
          updatedCart.products.push({
            product: {
              _id: productData._id,
              name: productData.name,
              images: productData.images || [productData.image] || [],
              salesPrice: productData.salesPrice || productData.displayPrice || productData.price,
              stockStatus: productData.stockStatus || 'In Stock',
              brand: productData.brand || {
                _id: productData.maker || 'unknown',
                name: productData.maker || 'Unknown'
              }
            },
            quantity,
            totalPrice: (productData.salesPrice || productData.displayPrice || productData.price) * quantity
          } as CartItem);
        }

        // Recalculate total
        updatedCart.total = updatedCart.products.reduce(
          (sum: number, item: CartItem) => sum + item.totalPrice,
          0
        );

        // Save to session storage
        saveGuestCart(updatedCart);
        console.log("Guest cart updated:", updatedCart);
        return updatedCart;
      } catch (error: any) {
        console.error('Error adding to guest cart:', error);
        return rejectWithValue("Failed to add product to guest cart");
      }
    }

    // Authenticated: use backend
    try {
      const response = await axiosInstance.post<any>("/cart/add", {
        productId,
        quantity,
      });
      console.log("Add to cart response:", response.data);
      const normalizedCart = normalizeCartResponse(response.data);
      return normalizedCart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart"
      );
    }
  }
);

// Remove product from cart
export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async ({ productId }: { productId: string }, { rejectWithValue, getState }) => {
    // Guest user: handle locally only
    if (!isAuthenticated()) {
      try {
        const state = getState() as any;
        let currentCart = state.cart.cart || getGuestCart();

        if (!currentCart) {
          return rejectWithValue("Cart is empty");
        }

        const updatedCart = {
          ...currentCart,
          products: currentCart.products.filter(
            (item: CartItem) => item.product._id !== productId
          )
        };

        updatedCart.total = updatedCart.products.reduce(
          (sum: number, item: CartItem) => sum + item.totalPrice,
          0
        );

        // // Remove product from cart
        // currentCart.products = currentCart.products.filter(
        //   (item: CartItem) => item.product._id !== productId
        // );

        // // Recalculate total
        // currentCart.total = currentCart.products.reduce(
        //   (sum: number, item: CartItem) => sum + item.totalPrice,
        //   0
        // );

        saveGuestCart(updatedCart);
        console.log("Product removed from guest cart:", updatedCart);
        return updatedCart;
      } catch (error: any) {
        console.error('Error removing from guest cart:', error);
    return rejectWithValue("Failed to remove product from guest cart");
      }
    }

    // Authenticated: use backend
    try {
      const response = await axiosInstance.delete<any>(
        `/cart/remove/${productId}`
      );
      console.log("Remove from cart response:", response.data);
      const normalizedCart = normalizeCartResponse(response.data);
      return normalizedCart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove product from cart"
      );
    }
  }
);

// Update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue, getState }
  ) => {
    // Guest user: handle locally only
    if (!isAuthenticated()) {
      try {
        const state = getState() as any;
        let currentCart = state.cart.cart;

        if (!currentCart) {
          return rejectWithValue("Cart is empty");
        }

        // Find and update product quantity
        const itemIndex = currentCart.products.findIndex(
          (item: CartItem) => item.product._id === productId
        );

        if (itemIndex === -1) {
          return rejectWithValue("Product not found in cart");
        }

        currentCart.products[itemIndex].quantity = quantity;
        currentCart.products[itemIndex].totalPrice =
          currentCart.products[itemIndex].product.salesPrice * quantity;

        // Recalculate total
        currentCart.total = currentCart.products.reduce(
          (sum: number, item: CartItem) => sum + item.totalPrice,
          0
        );

        saveGuestCart(currentCart);
        console.log("Quantity updated in guest cart:", currentCart);
        return currentCart;
      } catch (error: any) {
        return rejectWithValue("Failed to update quantity in guest cart");
      }
    }

    // Authenticated: use backend
    try {
      const response = await axiosInstance.put<any>("/cart/update", {
        productId,
        quantity,
      });
      console.log("Update quantity response:", response.data);
      const normalizedCart = normalizeCartResponse(response.data);
      return normalizedCart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item quantity"
      );
    }
  }
);

// Clear entire cart
export const removeAllProductFromCart = createAsyncThunk(
  "cart/removeAllProductFromCart",
  async (_, { rejectWithValue }) => {
    // Guest user: clear local cart only
    if (!isAuthenticated()) {
      clearGuestCart();
      console.log("Guest cart cleared");
      return null;
    }

    // Authenticated: use backend
    try {
      await axiosInstance.delete("/cart/clear");
      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

// Sync guest cart to backend when user logs in
export const syncGuestCartToBackend = createAsyncThunk(
  "cart/syncGuestCartToBackend",
  async (_, { rejectWithValue }) => {
    const guestCart = getGuestCart();

    if (!guestCart || guestCart.products.length === 0) {
      // No guest cart to sync, just fetch backend cart
      try {
        const response = await axiosInstance.get<any>("/cart");
        const normalizedCart = normalizeCartResponse(response.data);
        clearGuestCart(); // Clear guest cart after sync
        return normalizedCart;
      } catch (error: any) {
        return rejectWithValue("Failed to fetch cart after login");
      }
    }

    try {
      // Add all guest cart items to backend
      const promises = guestCart.products.map((item: CartItem) =>
        axiosInstance.post("/cart/add", {
          productId: item.product._id,
          quantity: item.quantity,
        })
      );

      await Promise.all(promises);

      // Fetch the updated cart
      const response = await axiosInstance.get<any>("/cart");
      const normalizedCart = normalizeCartResponse(response.data);

      // Clear guest cart after successful sync
      clearGuestCart();
      console.log("Guest cart synced to backend:", normalizedCart);

      return normalizedCart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to sync cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
    clearCart: (state) => {
      state.cart = null;
      if (!isAuthenticated()) {
        clearGuestCart();
      }
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Reset cart to initial state
    resetCart: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
      if (!isAuthenticated()) {
        clearGuestCart();
      }
    },

    // Update cart with product data
    updateCartProductData: (
      state,
      action: PayloadAction<{ productId: string; productData: any }>
    ) => {
      if (state.cart && state.cart.products) {
        state.cart.products = state.cart.products.map((item) =>
          item.product._id === action.payload.productId
            ? {
              ...item,
              product: {
                ...item.product,
                ...action.payload.productData,
              },
              totalPrice:
                action.payload.productData.salesPrice * item.quantity,
            }
            : item
        );
        state.cart.total = state.cart.products.reduce(
          (total, item) => total + item.totalPrice,
          0
        );

        // Update session storage for guest users
        if (!isAuthenticated() && state.cart) {
          saveGuestCart(state.cart);
        }
      }
    },

    // Debug action to check current state
    debugCartState: (state) => {
      console.log("Current Redux Cart State:", JSON.stringify(state.cart, null, 2));
      console.log("Has products:", state.cart?.products?.length);
      console.log("Is authenticated:", isAuthenticated());
    },
  },
  extraReducers: (builder) => {
    // Fetch user cart
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        console.log("Cart fetched and stored:", action.payload);
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Cart fetch failed:", action.payload);
      });

    // Add product to cart
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
        console.log("Product added, cart updated:", action.payload);
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Add to cart failed:", action.payload);
      });

    // Remove product from cart
    builder
      .addCase(removeProductFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        console.log("Product removed, cart updated:", action.payload);
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Remove from cart failed:", action.payload);
      });

    // Update cart item quantity
    builder
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        console.log("Quantity updated, cart updated:", action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Update quantity failed:", action.payload);
      });

    // Clear all products from cart
    builder
      .addCase(removeAllProductFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAllProductFromCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
        console.log("Cart cleared successfully");
      })
      .addCase(removeAllProductFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Clear cart failed:", action.payload);
      });

    // Sync guest cart to backend
    builder
      .addCase(syncGuestCartToBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncGuestCartToBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        console.log("Guest cart synced to backend:", action.payload);
      })
      .addCase(syncGuestCartToBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Cart sync failed:", action.payload);
      });
  },
});

export const {
  clearCartError,
  clearCart,
  updateCartProductData,
  debugCartState,
  resetCart,
  setCartLoading,
} = cartSlice.actions;

export default cartSlice.reducer;