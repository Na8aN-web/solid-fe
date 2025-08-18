// src/store/slices/categoriesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import { Category, CategoriesResponse, CategoryState } from "../../services/categories/types";

const initialState: CategoryState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
    totalCategories: 0,
};

// Async thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<CategoriesResponse>("/categories");
            // Ensure we always return an array
            const categories = Array.isArray(response.data) ? response.data : [];
            return {
                categories,
                total: categories.length
            };
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch categories");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to fetch a single category by ID
export const fetchCategoryById = createAsyncThunk(
    "categories/fetchCategoryById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<Category>(`/categories/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch category");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to create a new category
export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (categoryData: Omit<Category, '_id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<Category>("/categories", categoryData);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to create category");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to update a category
export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ id, categoryData }: { id: string; categoryData: Partial<Category> }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put<Category>(`/categories/${id}`, categoryData);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to update category");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/categories/${id}`);
            return id;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to delete category");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        clearCategoryError: (state) => {
            state.error = null;
        },
        clearSelectedCategory: (state) => {
            state.category = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all categories
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            // Ensure categories is always an array
            state.categories = Array.isArray(action.payload.categories) ? action.payload.categories : [];
            state.totalCategories = action.payload.total || state.categories.length;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            // Keep categories as empty array on error
            state.categories = [];
            state.totalCategories = 0;
        });

        // Fetch category by ID
        builder.addCase(fetchCategoryById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload;
        });
        builder.addCase(fetchCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create category
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            // Ensure categories is an array before pushing
            if (Array.isArray(state.categories)) {
                state.categories.push(action.payload);
                state.totalCategories += 1;
            } else {
                state.categories = [action.payload];
                state.totalCategories = 1;
            }
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Update category
        builder.addCase(updateCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.categories)) {
                const index = state.categories.findIndex(cat => cat._id === action.payload._id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            }
            if (state.category && state.category._id === action.payload._id) {
                state.category = action.payload;
            }
        });
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Delete category
        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.categories)) {
                state.categories = state.categories.filter(cat => cat._id !== action.payload);
                state.totalCategories = Math.max(0, state.totalCategories - 1);
            }
            if (state.category && state.category._id === action.payload) {
                state.category = null;
            }
        });
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {
    clearCategoryError,
    clearSelectedCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;