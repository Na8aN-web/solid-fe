// src/store/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import { Product, ProductsResponse, ProductState } from "../../services/products/types";

const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 16,
    totalProducts: 0,
    filters: {
        category: [],
        maker: [],
        model: [],
        year: [],
        minPrice: 0,
        maxPrice: 100000,
    },
    sortBy: "Alphabetical Order",
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<ProductsResponse>("/products");
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch products");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const fetchProductById = createAsyncThunk<
  { product: Product },
  string,
  { rejectValue: string }
>(
    "product/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<{ product: Product }>(`/products/${id}`);
            console.log(response.data);
            return response.data; 
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch products");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const fetchProductCount = createAsyncThunk(
    "products/fetchProductCount",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<{ productCount: number }>("/products/count");
            return response.data.productCount;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch product count");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
            state.currentPage = 1; // Reset to first page when changing items per page
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const product = state.products.find(p => p._id === action.payload);
            if (product) {
                product.favorite = !product.favorite;
            }
        },
        addFilter: (state, action: PayloadAction<{ key: keyof typeof state.filters; value: string }>) => {
            const { key, value } = action.payload;
            if (Array.isArray(state.filters[key])) {
                const filterArray = state.filters[key] as string[];
                if (!filterArray.includes(value)) {
                    filterArray.push(value);
                }
            }
        },
        removeFilter: (state, action: PayloadAction<{ key: 'category' | 'maker' | 'model' | 'year'; value: string }>) => {
            const { key, value } = action.payload;
            state.filters[key] = state.filters[key].filter(v => v !== value);
        },
        setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
            state.filters.minPrice = action.payload.min;
            state.filters.maxPrice = action.payload.max;
        },
        clearFilters: (state) => {
            state.filters = {
                category: [],
                maker: [],
                model: [],
                year: [],
                minPrice: 0,
                maxPrice: 100000,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.totalProducts = action.payload.products.length;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchProductCount.fulfilled, (state, action) => {
            state.totalProducts = action.payload;
        });
        builder.addCase(fetchProductCount.rejected, (state, action) => {
            state.error = action.payload as string;
        });
        builder.addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.product; 
        });
        
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

    },
});

export const {
    setCurrentPage,
    setItemsPerPage,
    setSortBy,
    toggleFavorite,
    addFilter,
    removeFilter,
    setPriceRange,
    clearFilters,
} = productSlice.actions;

export default productSlice.reducer;