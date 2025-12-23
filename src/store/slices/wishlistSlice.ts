// // src/store/slices/wishlistSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/api/axios";
// import {
//   Wishlist,
//   WishlistState,
//   WishlistResponse,
//   WishlistProduct,
// } from "../../services/wishlist/types";

// const initialState: WishlistState = {
//   wishlist: null,
//   loading: false,
//   error: null,
// };

// // Create a new wishlist for the authenticated user
// export const createWishlist = createAsyncThunk<
//   Wishlist,
//   void,
//   { rejectValue: string }
// >("wishlist/createWishlist", async (_, { rejectWithValue }) => {
//   try {
//     const response =
//       await axiosInstance.post<WishlistResponse>("/wishlists/user");
//     return response.data.wishlist;
//   } catch (error: any) {
//     if (error.response) {
//       return rejectWithValue(
//         error.response.data.message || "Failed to create wishlist"
//       );
//     }
//     return rejectWithValue("Network error. Please try again.");
//   }
// });

// // Get the authenticated user's wishlist with product details
// // export const fetchWishlist = createAsyncThunk<
// //   Wishlist,
// //   void,
// //   { rejectValue: string }
// // >("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
// //   try {
// //     const response =
// //       await axiosInstance.get<WishlistResponse>("/wishlists/user");
// //       console.log("Fetched wishlist:", response.data.wishlist);
// //     return response.data.wishlist;
// //   } catch (error: any) {
// //     if (error.response) {
// //       // If wishlist doesn't exist (404), return empty wishlist structure
// //       if (error.response.status === 404) {
// //         return {
// //           _id: "",
// //           user: "",
// //           products: [],
// //         } as Wishlist;
// //       }
// //       return rejectWithValue(
// //         error.response.data.message || "Failed to fetch wishlist"
// //       );
// //     }
// //     return rejectWithValue("Network error. Please try again.");
// //   }
// // });

// // DEBUGGING VERSION - Add this temporarily to see what's being returned

// export const fetchWishlist = createAsyncThunk<
//   Wishlist,
//   void,
//   { rejectValue: string }
// >("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.get("/wishlists/user");
    
//     // Try to find the wishlist data
//     let wishlistData = null;
    
//     if (response.data.wishlist) {
//       wishlistData = response.data.wishlist;
//     } else if (response.data.data) {
//       wishlistData = response.data.data;
//     } else if (response.data._id) {
//       wishlistData = response.data;
//     }
  
//     if (!wishlistData) {
//       console.error("❌ Could not find wishlist in response!");
//       return {
//         _id: "",
//         user: "",
//         products: [],
//       } as Wishlist;
//     }
    
//     return wishlistData;
//   } catch (error: any) {
//     if (error.response) {
//       // If wishlist doesn't exist (404), return empty wishlist structure
//       if (error.response.status === 404) {
//         console.log("Wishlist not found (404), returning empty wishlist");
//         return {
//           _id: "",
//           user: "",
//           products: [],
//         } as Wishlist;
//       }
//       return rejectWithValue(
//         error.response.data.message || "Failed to fetch wishlist"
//       );
//     }
//     return rejectWithValue("Network error. Please try again.");
//   }
// });

// // Delete the authenticated user's wishlist
// export const deleteWishlist = createAsyncThunk<
//   void,
//   void,
//   { rejectValue: string }
// >("wishlist/deleteWishlist", async (_, { rejectWithValue }) => {
//   try {
//     await axiosInstance.delete("/wishlists/user");
//   } catch (error: any) {
//     if (error.response) {
//       return rejectWithValue(
//         error.response.data.message || "Failed to delete wishlist"
//       );
//     }
//     return rejectWithValue("Network error. Please try again.");
//   }
// });

// // Add a product to the authenticated user's wishlist
// export const addProductToWishlist = createAsyncThunk<
//   Wishlist,
//   string,
//   { rejectValue: string }
// >("wishlist/addProduct", async (productId, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.put<WishlistResponse>(
//       "/wishlists/user/product",
//       { productId }
//     );
//     return response.data.wishlist;
//   } catch (error: any) {
//     if (error.response) {
//       return rejectWithValue(
//         error.response.data.message || "Failed to add product to wishlist"
//       );
//     }
//     return rejectWithValue("Network error. Please try again.");
//   }
// });

// // Remove a product from the authenticated user's wishlist
// export const removeProductFromWishlist = createAsyncThunk<
//   Wishlist,
//   string,
//   { rejectValue: string }
// >("wishlist/removeProduct", async (productId, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.delete<WishlistResponse>(
//       "/wishlists/user/product",
//       {
//         data: { productId },
//       }
//     );
//     return response.data.wishlist;
//   } catch (error: any) {
//     if (error.response) {
//       return rejectWithValue(
//         error.response.data.message || "Failed to remove product from wishlist"
//       );
//     }
//     return rejectWithValue("Network error. Please try again.");
//   }
// });

// // Toggle product in wishlist (add if not exists, remove if exists)
// export const toggleProductInWishlist = createAsyncThunk<
//   { wishlist: Wishlist; action: "added" | "removed" },
//   string,
//   { rejectValue: string }
// >(
//   "wishlist/toggleProduct",
//   async (productId, { rejectWithValue, getState }) => {
//     try {
//       const state = getState() as any;
//       const currentWishlist = state.wishlist.wishlist;

//       // Check if product is already in wishlist
//       const isInWishlist = currentWishlist?.products?.some(
//         (product: WishlistProduct) => product._id === productId
//       );

//       if (isInWishlist) {
//         // Remove from wishlist
//         const response = await axiosInstance.delete<WishlistResponse>(
//           "/wishlists/user/product",
//           {
//             data: { productId },
//           }
//         );
//         return { wishlist: response.data.wishlist, action: "removed" };
//       } else {
//         // Add to wishlist
//         const response = await axiosInstance.put<WishlistResponse>(
//           "/wishlists/user/product",
//           { productId }
//         );
//         return { wishlist: response.data.wishlist, action: "added" };
//       }
//     } catch (error: any) {
//       if (error.response) {
//         return rejectWithValue(
//           error.response.data.message || "Failed to toggle product in wishlist"
//         );
//       }
//       return rejectWithValue("Network error. Please try again.");
//     }
//   }
// );

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     clearWishlistError: (state) => {
//       state.error = null;
//     },
//     clearWishlist: (state) => {
//       state.wishlist = null;
//     },
//     resetWishlist: (state) => {
//       state.wishlist = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Create wishlist
//     builder
//       .addCase(createWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist = action.payload;
//         state.error = null;
//       })
//       .addCase(createWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Fetch wishlist
//     builder
//       .addCase(fetchWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Delete wishlist
//     builder
//       .addCase(deleteWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteWishlist.fulfilled, (state) => {
//         state.loading = false;
//         state.wishlist = null;
//         state.error = null;
//       })
//       .addCase(deleteWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Add product to wishlist
//     builder
//       .addCase(addProductToWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addProductToWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist = action.payload;
//         state.error = null;
//       })
//       .addCase(addProductToWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Remove product from wishlist
//     builder
//       .addCase(removeProductFromWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist = action.payload;
//         state.error = null;
//       })
//       .addCase(removeProductFromWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Toggle product in wishlist
//     builder
//       .addCase(toggleProductInWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(toggleProductInWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist = action.payload.wishlist;
//         state.error = null;
//       })
//       .addCase(toggleProductInWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearWishlistError, clearWishlist, resetWishlist } =
//   wishlistSlice.actions;

// export default wishlistSlice.reducer;


// src/store/slices/wishlistSlice.ts
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

// Helper function to normalize API response - handles direct product array
const normalizeWishlistResponse = (response: any): Wishlist => {
  console.log("Normalizing response:", response);
  
  // If response is an array of products (direct return)
  if (Array.isArray(response)) {
    return {
      _id: "",
      user: "",
      products: response,
    } as Wishlist;
  }
  
  // If response has wishlist property
  if (response.wishlist) {
    return response.wishlist;
  }
  
  // If response has data.wishlist
  if (response.data?.wishlist) {
    return response.data.wishlist;
  }
  
  // If response has products array
  if (response.products && Array.isArray(response.products)) {
    return {
      _id: response._id || "",
      user: response.user || "",
      products: response.products,
    } as Wishlist;
  }
  
  // If response has data with products
  if (response.data?.products && Array.isArray(response.data.products)) {
    return {
      _id: response.data._id || "",
      user: response.data.user || "",
      products: response.data.products,
    } as Wishlist;
  }
  
  // If response._id exists (direct wishlist object)
  if (response._id) {
    return response;
  }
  
  // Default: return empty wishlist
  console.warn("Could not parse wishlist response, returning empty:", response);
  return {
    _id: "",
    user: "",
    products: [],
  } as Wishlist;
};

// Create a new wishlist for the authenticated user
export const createWishlist = createAsyncThunk<
  Wishlist,
  void,
  { rejectValue: string }
>("wishlist/createWishlist", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/wishlists/user");
    return normalizeWishlistResponse(response.data);
  } catch (error: any) {
    console.error("Create wishlist error:", error.response?.data);
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
  Wishlist,
  void,
  { rejectValue: string }
>("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/wishlists/user");
    console.log("Fetch wishlist response:", response.data);
    
    const wishlistData = normalizeWishlistResponse(response.data);
    console.log("Normalized wishlist:", wishlistData);
    
    return wishlistData;
  } catch (error: any) {
    console.error("Fetch wishlist error:", error.response);
    if (error.response) {
      // If wishlist doesn't exist (404), return empty wishlist
      if (error.response.status === 404) {
        return {
          _id: "",
          user: "",
          products: [],
        } as Wishlist;
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
    return normalizeWishlistResponse(response.data);
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
    return normalizeWishlistResponse(response.data);
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
        const wishlistData = normalizeWishlistResponse(response.data);
        return { wishlist: wishlistData, action: "removed" };
      } else {
        // Add to wishlist
        const response = await axiosInstance.put(
          "/wishlists/user/product",
          { productId }
        );
        const wishlistData = normalizeWishlistResponse(response.data);
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
        state.wishlist = action.payload;
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