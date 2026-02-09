import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import {
  Wishlist,
  WishlistState,
  WishlistResponse,
  WishlistProduct,
} from "../../services/wishlist/types";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};


// Create a new wishlist for the authenticated user
export const createWishlist = createAsyncThunk<
  Wishlist,
  void,
  { rejectValue: string }
>("wishlist/createWishlist", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/wishlists/user");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to create wishlist"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// Get the authenticated user's wishlist with product details
export const fetchWishlist = createAsyncThunk<
  Wishlist | null, // Allow null return
  void,
  { rejectValue: string }
>("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/wishlists/user");
    const wishlistData = response.data;
    return wishlistData;
  } catch (error: any) {
    if (error.response) {
      // If wishlist doesn't exist (404), return null
      if (error.response.status === 404) {
        return null; // Return null instead of empty object
      }
      return rejectWithValue(
        error.response.data.message || "Failed to fetch wishlist"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// Delete the authenticated user's wishlist
export const deleteWishlist = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("wishlist/deleteWishlist", async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.delete("/wishlists/user");
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to delete wishlist"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// Add a product to the authenticated user's wishlist
export const addProductToWishlist = createAsyncThunk<
  Wishlist,
  string,
  { rejectValue: string }
>("wishlist/addProduct", async (productId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(
      "/wishlists/user/product",
      { productId }
    );
    return response.data;
  } catch (error: any) {
    // Check if product already exists error
    if (error.response?.status === 400 || error.response?.status === 409) {
      // Product already in wishlist - this is not really an error
      return rejectWithValue("ALREADY_IN_WISHLIST");
    }
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to add product to wishlist"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// Remove a product from the authenticated user's wishlist
export const removeProductFromWishlist = createAsyncThunk<
  Wishlist,
  string,
  { rejectValue: string }
>("wishlist/removeProduct", async (productId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(
      "/wishlists/user/product",
      {
        data: { productId },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to remove product from wishlist"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// Toggle product in wishlist (add if not exists, remove if exists)
export const toggleProductInWishlist = createAsyncThunk<
  { wishlist: Wishlist; action: "added" | "removed" },
  string,
  { rejectValue: string }
>(
  "wishlist/toggleProduct",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const currentWishlist = state.wishlist.wishlist;

      // Check if product is already in wishlist
      const isInWishlist = currentWishlist?.products?.some(
        (product: WishlistProduct) => product._id === productId
      );

      if (isInWishlist) {
        // Remove from wishlist
        const response = await axiosInstance.delete(
          "/wishlists/user/product",
          {
            data: { productId },
          }
        );
        const wishlistData = response.data;
        return { wishlist: wishlistData, action: "removed" };
      } else {
        // Add to wishlist
        const response = await axiosInstance.put(
          "/wishlists/user/product",
          { productId }
        );
        const wishlistData = response.data;
        return { wishlist: wishlistData, action: "added" };
      }
    } catch (error: any) {
      // Handle "already in wishlist" case
      if (error.response?.status === 400 || error.response?.status === 409) {
        return rejectWithValue("ALREADY_IN_WISHLIST");
      }
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to toggle product in wishlist"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },
    clearWishlist: (state) => {
      state.wishlist = null;
    },
    resetWishlist: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create wishlist
    builder
      .addCase(createWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.error = null;
      })
      .addCase(createWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch wishlist
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        if (JSON.stringify(state.wishlist) !== JSON.stringify(action.payload)) {
          state.wishlist = action.payload;
        }
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete wishlist
    builder
      .addCase(deleteWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWishlist.fulfilled, (state) => {
        state.loading = false;
        state.wishlist = null;
        state.error = null;
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add product to wishlist
    builder
      .addCase(addProductToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.error = null;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.loading = false;
        // Don't set error for "already in wishlist" case
        if (action.payload !== "ALREADY_IN_WISHLIST") {
          state.error = action.payload as string;
        }
      });

    // Remove product from wishlist
    builder
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.error = null;
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Toggle product in wishlist
    builder
      .addCase(toggleProductInWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleProductInWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlist;
        state.error = null;
      })
      .addCase(toggleProductInWishlist.rejected, (state, action) => {
        state.loading = false;
        // Don't set error for "already in wishlist" case
        if (action.payload !== "ALREADY_IN_WISHLIST") {
          state.error = action.payload as string;
        }
      });
  },
});

export const { clearWishlistError, clearWishlist, resetWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;