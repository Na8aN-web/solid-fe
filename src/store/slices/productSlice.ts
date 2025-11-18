// src/store/slices/productSlice.ts
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  asyncThunkCreator,
} from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import {
  Product,
  ProductsResponse,
  ProductState,
  NewProduct,
  SearchProductsQuery,
} from "../../services/products/types";

const initialState: ProductState = {
  products: [],
  product: null,
  newArrivals: [],
  featuredProducts: [],
  dealsOfTheDay: [],
  relatedProducts: [],
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
  sortBy: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    filters: {
      categories?: string[];
      brands?: string[];
      vehicleTypes?: string[];
      departments?: string[];
      minPrice?: number;
      maxPrice?: number;
      page?: number;
      limit?: number;
      sortBy?: string;
    } | void,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { products: ProductState };
      const currentPage = filters?.page || state.products.currentPage;
      const itemsPerPage = filters?.limit || state.products.itemsPerPage;
      const sortBy = filters?.sortBy || state.products.sortBy;

      const params = new URLSearchParams();

      // Add pagination parameters
      params.append('page', currentPage.toString());
      params.append('limit', itemsPerPage.toString());

      // Add sorting parameter (use 'sort' not 'sortBy' for backend)
      if (sortBy) {
        params.append('sort', sortBy);
      }

      // Add filters - each category ID as separate param
      if (filters?.categories && filters.categories.length > 0) {
        filters.categories.forEach(cat => params.append('category', cat));
      }

      // Add brand filters - each brand ID as separate param
      if (filters?.brands && filters.brands.length > 0) {
        filters.brands.forEach(brand => params.append('brand', brand));
      }

      // Add vehicle type filters
      if (filters?.vehicleTypes && filters.vehicleTypes.length > 0) {
        filters.vehicleTypes.forEach(type => params.append('vehicleType', type));
      }

      // Add department filters
      if (filters?.departments && filters.departments.length > 0) {
        filters.departments.forEach(dept => params.append('department', dept));
      }

      // Add price range filters
      if (filters?.minPrice !== undefined) {
        params.append('minPrice', filters.minPrice.toString());
      }

      if (filters?.maxPrice !== undefined) {
        params.append('maxPrice', filters.maxPrice.toString());
      }

      const queryString = params.toString();
      const url = queryString ? `/products?${queryString}` : '/products';

      const response = await axiosInstance.get<ProductsResponse>(url);

      return response.data;
    } catch (error: any) {
      console.error('Fetch products error:', error.response?.data || error.message);
      
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch products"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

export const searchProducts = createAsyncThunk<
  ProductsResponse,
  SearchProductsQuery & { 
    sortBy?: string;
    categories?: string[];
    brands?: string[];
  }
>("products/search", async (params, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { products: ProductState };
    const page = params.page || state.products.currentPage;
    const limit = params.limit || state.products.itemsPerPage;
    const sortBy = params.sortBy || state.products.sortBy;

    const requestParams = new URLSearchParams();
    
    // Add search name
    if (params.name) {
      requestParams.append('name', params.name);
    }

    // Add pagination
    requestParams.append('page', page.toString());
    requestParams.append('limit', limit.toString());

    // Add sorting (use 'sort' not 'sortBy')
    if (sortBy && sortBy.trim() !== "") {
      requestParams.append('sort', sortBy);
    }

    // Add category filters
    if (params.categories && params.categories.length > 0) {
      params.categories.forEach(cat => requestParams.append('category', cat));
    }

    // Add brand filters
    if (params.brands && params.brands.length > 0) {
      params.brands.forEach(brand => requestParams.append('brand', brand));
    }

    const url = `/products/search?${requestParams.toString()}`;

    const { data } = await axiosInstance.get<ProductsResponse>(url);
    return data;
  } catch (err: any) {
    console.error('Search products error:', err?.response?.data || err?.message);
    return rejectWithValue(
      err?.response?.data ?? { message: "Failed to search products" }
    );
  }
});

export const fetchProductById = createAsyncThunk<
  { product: Product },
  string,
  { rejectValue: string }
>("product/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<{ product: Product }>(
      `/products/${id}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch products"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

export const fetchRelatedProducts = createAsyncThunk<
  Product[], // This should still be Product[] since we'll extract the products array
  string,
  { rejectValue: string }
>("products/fetchRelated", async (productId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<{ products: Product[] }>( // Update the response type
      `/products/related/${productId}`
    );
    return response.data.products; // Extract the products array from the response
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch related products"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});

export const fetchProductCount = createAsyncThunk(
  "products/fetchProductCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<{ productCount: number }>(
        "/products/count"
      );
      return response.data.productCount;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch product count"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

//new arrival product
export const newProducts = createAsyncThunk<NewProduct[], void>(
  "products/newProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<{ products: NewProduct[] }>(
        "/products/new"
      );
      return response.data.products;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch products"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

export const featuredProducts = createAsyncThunk<NewProduct[], void>(
  "products/featuredProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<{ products: NewProduct[] }>(
        "/products/featured"
      );
      return response.data.products;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch products"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

export const dealsOfTheDay = createAsyncThunk<NewProduct[]>(
  "products/dealsOfTheDay",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<{ products: NewProduct[] }>(
        "/products/deals"
      );
      return response.data.products;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch products"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk<
  ProductsResponse,
  { categoryId: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "products/fetchByCategory",
  async ({ categoryId, page, limit }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { products: ProductState };
      const currentPage = page || state.products.currentPage;
      const itemsPerPage = limit || state.products.itemsPerPage;

      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", itemsPerPage.toString());

      const response = await axiosInstance.get<ProductsResponse>(
        `/products/category/${categoryId}?${params.toString()}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data.message || "Failed to fetch products by category"
      );
    }
  }
);

export const fetchProductsByBrand = createAsyncThunk<
  ProductsResponse,
  string,
  { rejectValue: string }
>("products/fetchByBrand", async (brandName, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<ProductsResponse>(
      `/products/brand/${encodeURIComponent(brandName)}`
    );
    return response.data; // This returns the full ProductsResponse object
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data.message || "Failed to fetch products by brand"
    );
  }
});

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
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product) {
        product.favorite = !product.favorite;
      }
    },
    addFilter: (
      state,
      action: PayloadAction<{ key: keyof typeof state.filters; value: string }>
    ) => {
      const { key, value } = action.payload;
      if (Array.isArray(state.filters[key])) {
        const filterArray = state.filters[key] as string[];
        if (!filterArray.includes(value)) {
          filterArray.push(value);
        }
      }
    },
    removeFilter: (
      state,
      action: PayloadAction<{
        key: "category" | "maker" | "model" | "year";
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = state.filters[key].filter((v) => v !== value);
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
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
      // Use the total from pagination, not the products array length
      state.totalProducts = action.payload.pagination?.total;
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

    builder.addCase(newProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(newProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.newArrivals = action.payload;
    });

    builder.addCase(newProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(featuredProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(featuredProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.featuredProducts = action.payload;
    });

    builder.addCase(featuredProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchRelatedProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRelatedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.relatedProducts = action.payload;
    });
    builder.addCase(fetchRelatedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(dealsOfTheDay.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(dealsOfTheDay.fulfilled, (state, action) => {
      state.loading = false;
      state.dealsOfTheDay = action.payload;
    });

    builder.addCase(dealsOfTheDay.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products; // Access products from the response
      state.totalProducts = action.payload.pagination.total; // Use the total from pagination
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchProductsByBrand.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsByBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products; // Access products from the response
      state.totalProducts = action.payload.pagination.total; // Use the total from pagination
    });
    builder.addCase(fetchProductsByBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // NEW: Add case for search products
    builder.addCase(searchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.pagination?.total;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
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
