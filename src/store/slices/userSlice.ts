import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import { User, userState } from "../../services/user/types";

const initialState: userState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  totalUsers: 0,
  recentlyViewed: [],
};

// get all users
export const getAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch users"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// get all total user count
export const getTotalUserCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("users/getTotalUserCount", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/users/count");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch user count"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// get all user by id
export const getUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("users/getUserById", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch user"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// update user
export const updateUser = createAsyncThunk<
  User,
  { id: string; data: Partial<User> },
  { rejectValue: string }
>("users/updateUser", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to update user"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// delete user
export const deleteUser = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to delete user"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// Add recently viewed products
export const addRecentlyViewed = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/addRecentlyViewed", async (productId, { rejectWithValue }) => {
  try {
    await axiosInstance.put("/users/recently-viewed", {
      productId,
    });
    return productId;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message ||
          "Failed to add product to recently viewed"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

// get recently viewed products
export const getRecentlyViewed = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("users/getRecentlyViewed", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/users/recently-viewed");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get product from recently viewed"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    // get all user
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    // get getTotalUserCount
    builder.addCase(getTotalUserCount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTotalUserCount.fulfilled, (state, action) => {
      state.loading = false;
      state.totalUsers = action.payload;
    });
    builder.addCase(getTotalUserCount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    // get user by id
    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    // update user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((u) => u._id !== action.payload._id);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    // add recently viewed product
    builder.addCase(addRecentlyViewed.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addRecentlyViewed.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.recentlyViewed.includes(action.payload)) {
        state.recentlyViewed.push(action.payload);
      }
    });
    builder.addCase(addRecentlyViewed.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    // get recently viewed product
    builder.addCase(getRecentlyViewed.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getRecentlyViewed.fulfilled, (state, action) => {
      state.loading = false;
      state.recentlyViewed = action.payload;
    });
    builder.addCase(getRecentlyViewed.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});
