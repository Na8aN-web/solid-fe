// src/store/slices/wishlistSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import { Wishlist, WishlistState } from "../../services/wishlist/types";

const initialState: WishlistState = {
    wishlist: null,
    loading: false,
    error: null,
};

export const fetchUserWishlist = createAsyncThunk(
    "wishlist/fetchUserWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/wishlists/user");
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch wishlist");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const createUserWishlist = createAsyncThunk(
    "wishlist/createUserWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/wishlists/user");
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to create wishlist");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const deleteUserWishlist = createAsyncThunk(
    "wishlist/deleteUserWishlist",
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.delete("/wishlists/user");
            return null;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to delete wishlist");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const addProductToWishlist = createAsyncThunk<
  Wishlist,
  { productId: string },
  { rejectValue: string }
>(
    "wishlist/addProductToWishlist",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("/wishlists/user/product", { productId });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to add product to wishlist");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const removeProductFromWishlist = createAsyncThunk<
  Wishlist,
  { productId: string },
  { rejectValue: string }
>(
    "wishlist/removeProductFromWishlist",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete("/wishlists/user/product", { data: { productId } });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to remove product from wishlist");
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
    },
    extraReducers: (builder) => {
        // Fetch user wishlist
        builder.addCase(fetchUserWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUserWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        });
        builder.addCase(fetchUserWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create user wishlist
        builder.addCase(createUserWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createUserWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        });
        builder.addCase(createUserWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Delete user wishlist
        builder.addCase(deleteUserWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteUserWishlist.fulfilled, (state) => {
            state.loading = false;
            state.wishlist = null;
        });
        builder.addCase(deleteUserWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Add product to wishlist
        builder.addCase(addProductToWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        });
        builder.addCase(addProductToWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Remove product from wishlist
        builder.addCase(removeProductFromWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(removeProductFromWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        });
        builder.addCase(removeProductFromWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {
    clearWishlistError,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;