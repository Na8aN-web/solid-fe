import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import { cartState, cartProduct, Cart } from "../../services/cart/types";

const initialState: cartState = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch cart"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

export const addProductToCart = createAsyncThunk<
  Cart,
  { productId: string },
  { rejectValue: string }
>("cart/addProductToCart", async ({ productId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put("/cart/add", { productId });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to add product to cart"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

export const removeProductFromCart = createAsyncThunk<
  Cart,
  { productId: string },
  { rejectValue: string }
>("cart/removeProductFromCart", async ({ productId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/cart/remove/${productId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to remove product from cart"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

export const updateCartItemQuantity = createAsyncThunk<
  Cart,
  { productId: string },
  { rejectValue: string }
>("cart/updateCartItemQuantity", async ({ productId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put("/cart/update");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to update cart product"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

export const removeAllProductFromCart = createAsyncThunk<
  Cart,
  { productId: string },
  { rejectValue: string }
>(
  "cart/removeAllProductFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/cart/clear");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message ||
            "Failed to remove product from wishlist"
        );
      }
      return rejectWithValue("Network error. Please try again.");
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
    },
  },
  extraReducers: (builder) => {
    // Fetch user cart
    builder.addCase(fetchUserCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchUserCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add product to cart
    builder.addCase(addProductToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Remove product from cart
    builder.addCase(removeProductFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(removeProductFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Remove all product from cart
    builder.addCase(removeAllProductFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeAllProductFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(removeAllProductFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update cart item quantity
    builder.addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
      builder.addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
    clearCartError,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
