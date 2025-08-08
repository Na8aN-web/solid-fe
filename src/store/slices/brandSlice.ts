// src/store/slices/brandSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import { Brand, BrandsResponse, BrandState } from "../../services/brands/types";

const initialState: BrandState = {
    brands: [],
    brand: null,
    loading: false,
    error: null,
    totalBrands: 0,
};

export const fetchBrands = createAsyncThunk(
    "brands/fetchBrands",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/brands");
            // Transform the response to match BrandsResponse
            return {
                brands: response.data, // The array from response.data
                total: response.data.length
            };
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch brands");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to fetch a single brand by ID
export const fetchBrandById = createAsyncThunk<
  { brand: Brand },
  string,
  { rejectValue: string }
>(
    "brands/fetchBrandById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<{ brand: Brand }>(`/brands/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch brand");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to create a new brand
export const createBrand = createAsyncThunk<
  Brand,
  Omit<Brand, '_id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>(
    "brands/createBrand",
    async (brandData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<Brand>("/brands", brandData);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to create brand");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to update a brand
export const updateBrand = createAsyncThunk<
  Brand,
  { id: string; brandData: Partial<Brand> },
  { rejectValue: string }
>(
    "brands/updateBrand",
    async ({ id, brandData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put<Brand>(`/brands/${id}`, brandData);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to update brand");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to delete a brand
export const deleteBrand = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
    "brands/deleteBrand",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/brands/${id}`);
            return id;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to delete brand");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        clearBrandError: (state) => {
            state.error = null;
        },
        clearSelectedBrand: (state) => {
            state.brand = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all brands
        builder.addCase(fetchBrands.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchBrands.fulfilled, (state, action) => {
            state.loading = false;
            state.brands = action.payload.brands || [];
            state.totalBrands = action.payload.total || (action.payload.brands ? action.payload.brands.length : 0);
        });
        builder.addCase(fetchBrands.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch brand by ID
        builder.addCase(fetchBrandById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchBrandById.fulfilled, (state, action) => {
            state.loading = false;
            state.brand = action.payload.brand;
        });
        builder.addCase(fetchBrandById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create brand
        builder.addCase(createBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createBrand.fulfilled, (state, action) => {
            state.loading = false;
            if (state.brands) {
                state.brands.push(action.payload);
                state.totalBrands += 1;
            }
        });
        builder.addCase(createBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Update brand
        builder.addCase(updateBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateBrand.fulfilled, (state, action) => {
            state.loading = false;
            if (state.brands) {
                const index = state.brands.findIndex(brand => brand._id === action.payload._id);
                if (index !== -1) {
                    state.brands[index] = action.payload;
                }
            }
            if (state.brand && state.brand._id === action.payload._id) {
                state.brand = action.payload;
            }
        });
        builder.addCase(updateBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Delete brand
        builder.addCase(deleteBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteBrand.fulfilled, (state, action) => {
            state.loading = false;
            if (state.brands) {
                state.brands = state.brands.filter(brand => brand._id !== action.payload);
                state.totalBrands -= 1;
            }
            if (state.brand && state.brand._id === action.payload) {
                state.brand = null;
            }
        });
        builder.addCase(deleteBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {
    clearBrandError,
    clearSelectedBrand,
} = brandSlice.actions;

export default brandSlice.reducer;