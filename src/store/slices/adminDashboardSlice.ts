// src/store/slices/adminDashboardSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

// Types
export interface DashboardMetrics {
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  revenueChange: number;
  customersChange: number;
  productsChange: number;
  ordersChange: number;
}

export interface Order {
  id: string;
  product: string;
  buyer: string;
  orderId: string;
  amount: string;
  status: 'Delivered' | 'Processing' | 'Returned';
  productImage?: string;
  createdAt: string;
}

export interface LowStockProduct {
  id: string;
  name: string;
  currentStock: number;
  minStockLevel: number;
  stockPercentage: number;
}

// API Response Types (matching Swagger)
interface UsersCountResponse {
  userCount: number;
}

interface ProductsCountResponse {
  productCount: number;
}

interface ProductsResponse {
  products: Array<{
    _id: string;
    name: string;
    displayPrice: number;
    regularPrice: number;
    numReviews: number;
    rating: number;
    image: string;
    categoryName: string;
    brandName: string;
    stock?: number;
    quantity?: number;
    minStock?: number;
  }>;
}

export interface AdminDashboardState {
  metrics: DashboardMetrics | null;
  recentOrders: Order[];
  lowStockProducts: LowStockProduct[];
  loading: {
    metrics: boolean;
    orders: boolean;
    lowStock: boolean;
  };
  error: {
    metrics: string | null;
    orders: string | null;
    lowStock: string | null;
  };
}

const initialState: AdminDashboardState = {
  metrics: null,
  recentOrders: [],
  lowStockProducts: [],
  loading: {
    metrics: false,
    orders: false,
    lowStock: false,
  },
  error: {
    metrics: null,
    orders: null,
    lowStock: null,
  },
};

// Async Thunks
export const fetchDashboardMetrics = createAsyncThunk(
  "adminDashboard/fetchMetrics",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch multiple endpoints in parallel
      const [usersResponse, productsResponse] = await Promise.all([
        axiosInstance.get<UsersCountResponse>("/users/count"),
        axiosInstance.get<ProductsCountResponse>("/products/count"),
      ]);

      // Extract counts from the proper response structure
      const totalCustomers = usersResponse.data.userCount || 0;
      const totalProducts = productsResponse.data.productCount || 0;
      
      // Mock data for revenue and orders - replace with real API calls when available
      // You might need to create additional endpoints like:
      // - /orders/count for totalOrders
      // - /orders/revenue or /analytics/revenue for totalRevenue
      const totalRevenue = 250000; 
      const totalOrders = 1250; 

      const metrics: DashboardMetrics = {
        totalRevenue,
        totalCustomers,
        totalProducts,
        totalOrders,
        revenueChange: 24.1,
        customersChange: 12.1,
        productsChange: -10.2,
        ordersChange: 28.8,
      };

      return metrics;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to fetch dashboard metrics. Please try again.");
    }
  }
);

export const fetchRecentOrders = createAsyncThunk(
  "adminDashboard/fetchRecentOrders",
  async (_, { rejectWithValue }) => {
    try {
      // Note: You might need to create an orders endpoint or admin-specific orders endpoint
      // The current API doesn't seem to have orders endpoints based on the Swagger
      // You may need to add endpoints like:
      // - GET /orders?limit=10&sort=-createdAt
      // - GET /admin/orders/recent
      
      // For now, using mock data structure that matches your Order interface
      const mockOrders: Order[] = [
        {
          id: '1',
          product: 'Toyota Brain Box 2016',
          buyer: 'John Doe',
          orderId: '2563823270',
          amount: '₦250,000.00',
          status: 'Delivered',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          product: 'Honda Parts Kit',
          buyer: 'Jane Smith',
          orderId: '2563823271',
          amount: '₦180,000.00',
          status: 'Processing',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          product: 'Mercedes Engine',
          buyer: 'Mike Johnson',
          orderId: '2563823272',
          amount: '₦420,000.00',
          status: 'Delivered',
          createdAt: new Date().toISOString(),
        },
      ];

      return mockOrders;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to fetch recent orders. Please try again.");
    }
  }
);

export const fetchLowStockProducts = createAsyncThunk(
  "adminDashboard/fetchLowStockProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch products - using the correct response structure from Swagger
      const response = await axiosInstance.get<ProductsResponse>("/products");
      
      // Handle both possible response structures
      const products = response.data.products || response.data || [];

      if (!Array.isArray(products)) {
        throw new Error("Invalid products data received");
      }

      // Filter products with low stock
      const lowStockProducts: LowStockProduct[] = products
        .filter((product) => {
          const currentStock = product.stock || product.quantity || 0;
          const minStockLevel = product.minStock || 20;
          return currentStock <= minStockLevel && currentStock > 0; // Only show products that exist but are low
        })
        .map((product) => {
          const currentStock = product.stock || product.quantity || 0;
          const minStockLevel = product.minStock || 20;
          
          return {
            id: product._id,
            name: product.name,
            currentStock,
            minStockLevel,
            stockPercentage: Math.round((currentStock / minStockLevel) * 100),
          };
        })
        .sort((a, b) => a.stockPercentage - b.stockPercentage) // Sort by lowest stock percentage first
        .slice(0, 5); // Limit to 5 items

      return lowStockProducts;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to fetch low stock products. Please try again.");
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    clearDashboardErrors: (state) => {
      state.error = {
        metrics: null,
        orders: null,
        lowStock: null,
      };
    },
    refreshDashboard: (state) => {
      // This can be used to trigger a full dashboard refresh
      state.loading = {
        metrics: true,
        orders: true,
        lowStock: true,
      };
    },
    // Add a reducer to update individual metrics if needed
    updateMetric: (state, action: PayloadAction<{key: keyof DashboardMetrics, value: number}>) => {
      if (state.metrics) {
        state.metrics[action.payload.key] = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch dashboard metrics
    builder.addCase(fetchDashboardMetrics.pending, (state) => {
      state.loading.metrics = true;
      state.error.metrics = null;
    });
    builder.addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
      state.loading.metrics = false;
      state.metrics = action.payload;
    });
    builder.addCase(fetchDashboardMetrics.rejected, (state, action) => {
      state.loading.metrics = false;
      state.error.metrics = action.payload as string;
    });

    // Fetch recent orders
    builder.addCase(fetchRecentOrders.pending, (state) => {
      state.loading.orders = true;
      state.error.orders = null;
    });
    builder.addCase(fetchRecentOrders.fulfilled, (state, action) => {
      state.loading.orders = false;
      state.recentOrders = action.payload;
    });
    builder.addCase(fetchRecentOrders.rejected, (state, action) => {
      state.loading.orders = false;
      state.error.orders = action.payload as string;
    });

    // Fetch low stock products
    builder.addCase(fetchLowStockProducts.pending, (state) => {
      state.loading.lowStock = true;
      state.error.lowStock = null;
    });
    builder.addCase(fetchLowStockProducts.fulfilled, (state, action) => {
      state.loading.lowStock = false;
      state.lowStockProducts = action.payload;
    });
    builder.addCase(fetchLowStockProducts.rejected, (state, action) => {
      state.loading.lowStock = false;
      state.error.lowStock = action.payload as string;
    });
  },
});

export const {
  clearDashboardErrors,
  refreshDashboard,
  updateMetric,
} = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;