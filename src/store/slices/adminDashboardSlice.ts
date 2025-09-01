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
  status: "Delivered" | "Processing" | "Returned";
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

//Product type
export interface Product {
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
}

// Product creation interface
export interface CreateProductData {
  name: string;
  briefDescription: string;
  fullDescription: string;
  images: string[];
  description?: string;
  partNumber?: string;
  category: string;
  department?: string;
  brand: string;
  vehicleType?: string;
  weight?: number;
  packageSize: {
    length: number;
    breadth: number;
    width: number;
  };
  material?: string;
  stockStatus: string;
  quantityInStock: number;
  units?: string;
  sku?: string;
  minStock: number;
  regularPrice: number;
  salesPrice: number;
  discount?: number;
  discountPrice?: number;
  minOrderQuantity: number;
  tieredPricingType: string;
  tieredPricing: {
    quantity: number;
    price: number;
  }[];
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
  createdBy: string;
  store?: string;
}

// Category creation interface
export interface CreateProductCategory {
  name: string;
}

// Category interface
export interface ProductCategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Brand creation interface
export interface CreateProductBrand {
  name: string;
}

// Brand interface
export interface ProductBrand {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Vehicle creation interface
export interface CreateProductVehicleType {
  name: string;
}

// Vehicle interface
export interface ProductVehicleType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types (matching Swagger)
interface UsersCountResponse {
  userCount: number;
}

interface ProductsCountResponse {
  productCount: number;
}

interface ProductsResponse {
  products: Product[];
}

interface CategoriesResponse {
  categories: ProductCategory[];
}
interface CategoryCreateResponse {
  category: ProductCategory;
}
interface BrandsResponse {
  brands: ProductBrand[];
}
interface BrandCreateResponse {
  brand: ProductBrand;
}
interface VehiclesResponse {
  vehicles: ProductVehicleType[];
}
interface VehicleCreateResponse {
  vehicle: ProductVehicleType;
}

export interface AdminDashboardState {
  metrics: DashboardMetrics | null;
  recentOrders: Order[];
  lowStockProducts: LowStockProduct[];
  products: Product[];
  categories: ProductCategory[];
  brands: ProductBrand[];
  vehicles: ProductVehicleType[];
  loading: {
    metrics: boolean;
    orders: boolean;
    lowStock: boolean;
    products: boolean;
    deleteProduct: boolean;
    addProduct: boolean;
    addProductCategory: boolean;
    updateProductCategory: boolean; 
    categories: boolean;
    addProductBrand: boolean;
    updateProductBrand: boolean; 
    brands: boolean;
    addProductVehicleType: boolean;
    updateProductVehicleType: boolean; 
    vehicles: boolean;
  };
  error: {
    metrics: string | null;
    orders: string | null;
    lowStock: string | null;
    products: string | null;
    deleteProduct: string | null;
    addProduct: string | null;
    addProductCategory: string | null;
    updateProductCategory: string | null;
    categories: string | null;
    addProductBrand: string | null;
    updateProductBrand: string | null; 
    brands: string | null;
    addProductVehicleType: string | null;
    updateProductVehicleType: string | null;
    vehicles: string | null;
  };
}

const initialState: AdminDashboardState = {
  metrics: null,
  recentOrders: [],
  lowStockProducts: [],
  products: [],
  categories: [],
  brands: [],
  vehicles: [],
  loading: {
    metrics: false,
    orders: false,
    lowStock: false,
    products: false,
    deleteProduct: false,
    addProduct: false,
    addProductCategory: false,
    updateProductCategory: false,
    categories: false,
    addProductBrand: false,
    updateProductBrand: false,
    brands: false,
    addProductVehicleType: false,
    updateProductVehicleType: false,
    vehicles: false,
  },
  error: {
    metrics: null,
    orders: null,
    lowStock: null,
    products: null,
    deleteProduct: null,
    addProduct: null,
    addProductCategory: null,
    categories: null,
    addProductBrand: null,
    updateProductBrand: null,
    brands: null,
    addProductVehicleType: null,
    updateProductCategory: null,
    updateProductVehicleType: null,
    vehicles: null,
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
      return rejectWithValue(
        "Failed to fetch dashboard metrics. Please try again."
      );
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
          id: "1",
          product: "Toyota Brain Box 2016",
          buyer: "John Doe",
          orderId: "2563823270",
          amount: "₦250,000.00",
          status: "Delivered",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          product: "Honda Parts Kit",
          buyer: "Jane Smith",
          orderId: "2563823271",
          amount: "₦180,000.00",
          status: "Processing",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          product: "Mercedes Engine",
          buyer: "Mike Johnson",
          orderId: "2563823272",
          amount: "₦420,000.00",
          status: "Delivered",
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
      return rejectWithValue(
        "Failed to fetch recent orders. Please try again."
      );
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
      return rejectWithValue(
        "Failed to fetch low stock products. Please try again."
      );
    }
  }
);

// All Product
export const fetchAllProducts = createAsyncThunk(
  "adminDashboard/products",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch products - using the correct response structure from Swagger
      const response = await axiosInstance.get<ProductsResponse>("/products");

      // Handle both possible response structures
      const products = response.data.products || response.data || [];

      if (!Array.isArray(products)) {
        throw new Error("Invalid products data received");
      }

      return products as Product[];
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(
        "Failed to fetch low stock products. Please try again."
      );
    }
  }
);

// fetch categories thunk
export const fetchAllCategories = createAsyncThunk(
  "adminDashboard/categories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<
        CategoriesResponse | ProductCategory[]
      >("/categories");

      const categories: ProductCategory[] = Array.isArray(res.data)
        ? res.data
        : res.data.categories;

      if (!Array.isArray(categories)) {
        throw new Error("Invalid categories data received");
      }
      return categories;
    } catch (error: any) {
      if (error.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      if (error.response?.data?.error)
        return rejectWithValue(error.response.data.error);
      return rejectWithValue("Failed to fetch categories. Please try again.");
    }
  }
);

// fetch brands thunk
export const fetchAllBrands = createAsyncThunk(
  "adminDashboard/brands",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<BrandsResponse | ProductBrand[]>(
        "/brands"
      );

      const brands: ProductBrand[] = Array.isArray(res.data)
        ? res.data
        : res.data.brands;

      if (!Array.isArray(brands)) {
        throw new Error("Invalid brands data received");
      }
      return brands;
    } catch (error: any) {
      if (error.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      if (error.response?.data?.error)
        return rejectWithValue(error.response.data.error);
      return rejectWithValue("Failed to fetch categories. Please try again.");
    }
  }
);

export const fetchAllVehiclesType = createAsyncThunk(
  "adminDashboard/vehicle-types",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<
        VehiclesResponse | ProductVehicleType[]
      >("/vehicle-types");

      const vehicles: ProductVehicleType[] = Array.isArray(res.data)
        ? res.data
        : res.data.vehicles;

      if (!Array.isArray(vehicles)) {
        throw new Error("Invalid vehicles data received");
      }
      return vehicles;
    } catch (error: any) {
      if (error.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      if (error.response?.data?.error)
        return rejectWithValue(error.response.data.error);
      return rejectWithValue("Failed to fetch vehicles. Please try again.");
    }
  }
);

export const addProductCategory = createAsyncThunk(
  "adminDashboard/addProductCategory",
  async (categoryData: CreateProductCategory, { rejectWithValue }) => {
    try {
      // Make POST request to create category
      const response = await axiosInstance.post<CategoryCreateResponse>(
        "/categories",
        categoryData
      );

      return response.data.category; // Return the created category
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add category. Please try again.");
    }
  }
);

export const addProductBrand = createAsyncThunk(
  "adminDashboard/addProductBrand",
  async (brandData: CreateProductBrand, { rejectWithValue }) => {
    try {
      // Make POST request to create category
      const response = await axiosInstance.post<BrandCreateResponse>(
        "/brands",
        brandData
      );

      return response.data.brand; // Return the created brand
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add brand. Please try again.");
    }
  }
);

export const addProductVehicleType = createAsyncThunk(
  "adminDashboard/addProductVehicleType",
  async (vehicleData: CreateProductVehicleType, { rejectWithValue }) => {
    try {
      // Make POST request to create category
      const response = await axiosInstance.post<VehicleCreateResponse>(
        "/vehicle-types",
        vehicleData
      );

      return response.data.vehicle;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add vehicle. Please try again.");
    }
  }
);

// Helper: unwrap either { category: {...} } or plain {...}
function extractCategory(data: any): ProductCategory | null {
  const c = data?.category ?? data?.data?.category ?? data?.data ?? data;
  return c && typeof c._id === "string" && typeof c.name === "string"
    ? c
    : null;
}

// update product category
export interface UpdateProductCategory {
  name?: string;
}
// UPDATE category
export const updateProductCategory = createAsyncThunk<
  ProductCategory,
  { id: string; data: UpdateProductCategory },
  { rejectValue: string }
>(
  "adminDashboard/updateProductCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/categories/${id}`, data);
      const category = res.data;
      if (!category) return rejectWithValue("Invalid category payload");
      return category;
    } catch (err: any) {
      if (err.response?.data?.message)
        return rejectWithValue(err.response.data.message);
      if (err.response?.data?.error)
        return rejectWithValue(err.response.data.error);
      return rejectWithValue("Failed to update category.");
    }
  }
);

export const deleteProductCategory = createAsyncThunk<
  string, // we return the deleted id
  string, // id
  { rejectValue: string }
>("adminDashboard/deleteProductCategory", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/categories/${id}`);
    return id;
  } catch (err: any) {
    if (err.response?.data?.message)
      return rejectWithValue(err.response.data.message);
    if (err.response?.data?.error)
      return rejectWithValue(err.response.data.error);
    return rejectWithValue("Failed to delete category.");
  }
});

// update product brand
export interface UpdateProductBrand {
  name?: string;
}
// UPDATE brand
export const updateProductBrand = createAsyncThunk<
  ProductBrand,
  { id: string; data: UpdateProductBrand },
  { rejectValue: string }
>(
  "adminDashboard/updateProductBrand",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/brands/${id}`, data);
      const brand = res.data;
      if (!brand) return rejectWithValue("Invalid brand payload");
      return brand;
    } catch (err: any) {
      if (err.response?.data?.message)
        return rejectWithValue(err.response.data.message);
      if (err.response?.data?.error)
        return rejectWithValue(err.response.data.error);
      return rejectWithValue("Failed to update brand.");
    }
  }
);

export const deleteProductBrand = createAsyncThunk<
  string, // we return the deleted id
  string, // id
  { rejectValue: string }
>("adminDashboard/deleteProductBrand", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/brands/${id}`);
    return id;
  } catch (err: any) {
    if (err.response?.data?.message)
      return rejectWithValue(err.response.data.message);
    if (err.response?.data?.error)
      return rejectWithValue(err.response.data.error);
    return rejectWithValue("Failed to delete brand.");
  }
});

// update product brand
export interface UpdateProductVehicleType {
  name?: string;
}
// UPDATE vehicle type
export const updateProductVehicleType = createAsyncThunk<
  ProductVehicleType,
  { id: string; data: UpdateProductVehicleType },
  { rejectValue: string }
>(
  "adminDashboard/updateProductVehicleType",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/vehicle-types/${id}`, data);
      const vehicle = res.data;
      if (!vehicle) return rejectWithValue("Invalid vehicle-type payload");
      return vehicle;
    } catch (err: any) {
      if (err.response?.data?.message)
        return rejectWithValue(err.response.data.message);
      if (err.response?.data?.error)
        return rejectWithValue(err.response.data.error);
      return rejectWithValue("Failed to update vehicle-type.");
    }
  }
);

export const deleteProductVehicleType = createAsyncThunk<
  string, // we return the deleted id
  string, // id
  { rejectValue: string }
>("adminDashboard/deleteProductVehicleType", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/vehicle-types/${id}`);
    return id;
  } catch (err: any) {
    if (err.response?.data?.message)
      return rejectWithValue(err.response.data.message);
    if (err.response?.data?.error)
      return rejectWithValue(err.response.data.error);
    return rejectWithValue("Failed to delete vehicle-type.");
  }
});

export const deleteProduct = createAsyncThunk(
  "adminDashboard/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      // Make DELETE request to your API
      await axiosInstance.delete(`/products/${productId}`);

      return productId; // Return the deleted product ID
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to delete product. Please try again.");
    }
  }
);

// Update your addProduct thunk to handle FormData
export const addProduct = createAsyncThunk(
  "adminDashboard/addProduct",
  async (productData: FormData, { rejectWithValue }) => {
    try {
      // Make POST request with FormData
      const response = await axiosInstance.post<{ product: Product }>(
        "/products",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.product; // Return the created product
    } catch (error: any) {
      console.error(
        "Add product error:",
        error.response?.data || error.message
      );

      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add product. Please try again.");
    }
  }
);

export interface CreateProductWithFiles {
  productData: Omit<CreateProductData, "images">;
  imageFiles: File[];
}

// And then create a separate thunk:
export const addProductWithFiles = createAsyncThunk(
  "adminDashboard/addProductWithFiles",
  async (
    { productData, imageFiles }: CreateProductWithFiles,
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      // Add all product data fields to FormData
      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === "object" && !Array.isArray(value)) {
            // Handle nested objects like packageSize
            formData.append(key, JSON.stringify(value));
          } else if (Array.isArray(value)) {
            // Handle arrays like tieredPricing
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Add image files
      imageFiles.forEach((file, index) => {
        formData.append("images", file);
      });

      const response = await axiosInstance.post<{ product: Product }>(
        "/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.product;
    } catch (error: any) {
      console.error(
        "Add product with files error:",
        error.response?.data || error.message
      );

      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add product. Please try again.");
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
        products: null,
        deleteProduct: null,
        addProduct: null,
        addProductCategory: null,
        updateProductCategory: null,
        categories: null,
        addProductBrand: null,
        updateProductBrand: null,
        brands: null,
        addProductVehicleType: null,
        updateProductVehicleType: null,
        vehicles: null,
      };
    },
    refreshDashboard: (state) => {
      // This can be used to trigger a full dashboard refresh
      state.loading = {
        metrics: true,
        orders: true,
        lowStock: true,
        products: true,
        deleteProduct: true,
        addProduct: true,
        addProductCategory: true,
        updateProductCategory: true,
        categories: true,
        addProductBrand: true,
        updateProductBrand: true,
        brands: true,
        addProductVehicleType: true,
        updateProductVehicleType: true,
        vehicles: true,
      };
    },
    // Add a reducer to update individual metrics if needed
    updateMetric: (
      state,
      action: PayloadAction<{ key: keyof DashboardMetrics; value: number }>
    ) => {
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

    //Fetch all products
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading.products = true;
      state.error.products = null;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading.products = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading.products = false;
      state.error.products = action.payload as string;
    });
    // Fetch all categories
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading.categories = true;
      state.error.categories = null;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.loading.categories = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.loading.categories = false;
      state.error.categories = action.payload as string;
    });

    // Delete Product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading.deleteProduct = true;
      state.error.deleteProduct = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading.deleteProduct = false;
      // Remove the deleted product from the products array
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading.deleteProduct = false;
      state.error.deleteProduct = action.payload as string;
    });
    // Add product
    builder.addCase(addProduct.pending, (state) => {
      state.loading.addProduct = true;
      state.error.addProduct = null;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading.addProduct = false;
      // Add the new product to the products array
      state.products.push(action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading.addProduct = false;
      state.error.addProduct = action.payload as string;
    });
    // Add product Category
    builder.addCase(addProductCategory.pending, (state) => {
      state.loading.addProductCategory = true;
      state.error.addProductCategory = null;
    });
    builder.addCase(addProductCategory.fulfilled, (state, action) => {
      state.loading.addProductCategory = false;
      state.categories.push(action.payload);
    });
    builder.addCase(addProductCategory.rejected, (state, action) => {
      state.loading.addProductCategory = false;
      state.error.addProductCategory = action.payload as string;
    });
    // Add product Brand
    builder.addCase(addProductBrand.pending, (state) => {
      state.loading.addProductBrand = true;
      state.error.addProductBrand = null;
    });
    builder.addCase(addProductBrand.fulfilled, (state, action) => {
      state.loading.addProductBrand = false;
      state.brands.push(action.payload);
    });
    builder.addCase(addProductBrand.rejected, (state, action) => {
      state.loading.addProductBrand = false;
      state.error.addProductBrand = action.payload as string;
    });
    // Add product Vehicle Type
    builder.addCase(addProductVehicleType.pending, (state) => {
      state.loading.addProductVehicleType = true;
      state.error.addProductVehicleType = null;
    });
    builder.addCase(addProductVehicleType.fulfilled, (state, action) => {
      state.loading.addProductVehicleType = false;
      state.vehicles.push(action.payload);
    });
    builder.addCase(addProductVehicleType.rejected, (state, action) => {
      state.loading.addProductVehicleType = false;
      state.error.addProductVehicleType = action.payload as string;
    });
    builder.addCase(fetchAllBrands.pending, (state) => {
      state.loading.brands = true;
      state.error.brands = null;
    });
    builder.addCase(fetchAllBrands.fulfilled, (state, action) => {
      state.loading.brands = false;
      state.brands = action.payload;
    });
    builder.addCase(fetchAllBrands.rejected, (state, action) => {
      state.loading.brands = false;
      state.error.brands = action.payload as string;
    });

    builder.addCase(fetchAllVehiclesType.pending, (state) => {
      state.loading.vehicles = true;
      state.error.vehicles = null;
    });
    builder.addCase(fetchAllVehiclesType.fulfilled, (state, action) => {
      state.loading.vehicles = false;
      state.vehicles = action.payload;
    });
    builder.addCase(fetchAllVehiclesType.rejected, (state, action) => {
      state.loading.vehicles = false;
      state.error.vehicles = action.payload as string;
    });
    // UPDATE CATEGORY
    builder
    .addCase(updateProductCategory.pending, (state) => {
      state.loading.updateProductCategory = true; // Use specific key
      state.error.updateProductCategory = null;
    })
    .addCase(updateProductCategory.fulfilled, (state, action) => {
      state.loading.updateProductCategory = false;
      const updated = action.payload;
      const idx = state.categories.findIndex((c) => c._id === updated._id);
      if (idx !== -1) state.categories[idx] = updated;
    })
    .addCase(updateProductCategory.rejected, (state, action) => {
      state.loading.updateProductCategory = false;
      state.error.updateProductCategory =
        (action.payload as string) ?? "Failed to update category.";
    });

    // DELETE CATEGORY
    builder
      .addCase(deleteProductCategory.pending, (state) => {
        state.loading.categories = true; // brief spinner on the list
        state.error.categories = null;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.loading.categories = false;
        const id = action.payload;
        state.categories = state.categories.filter((c) => c._id !== id);
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories =
          (action.payload as string) ?? "Failed to delete category.";
      });

       // UPDATE BRAND
    builder
    .addCase(updateProductBrand.pending, (state) => {
      state.loading.updateProductBrand = true;
      state.error.updateProductBrand = null;
    })
    .addCase(updateProductBrand.fulfilled, (state, action) => {
      state.loading.updateProductBrand = false;
      const updated = action.payload;
      const idx = state.brands.findIndex((b) => b._id === updated._id);
      if (idx !== -1) state.brands[idx] = updated;
    })
    .addCase(updateProductBrand.rejected, (state, action) => {
      state.loading.updateProductBrand = false;
      state.error.updateProductBrand =
        (action.payload as string) ?? "Failed to update brand.";
    });

    // DELETE BRAND
    builder
      .addCase(deleteProductBrand.pending, (state) => {
        state.loading.brands = true;
        state.error.brands = null;
      })
      .addCase(deleteProductBrand.fulfilled, (state, action) => {
        state.loading.brands = false;
        const id = action.payload;
        state.brands = state.brands.filter((b) => b._id !== id);
      })
      .addCase(deleteProductBrand.rejected, (state, action) => {
        state.loading.brands = false;
        state.error.brands =
          (action.payload as string) ?? "Failed to delete brand.";
      });

       // UPDATE VEHICLE-TYPE
    builder
    .addCase(updateProductVehicleType.pending, (state) => {
      state.loading.updateProductVehicleType = true;
      state.error.updateProductVehicleType = null;
    })
    .addCase(updateProductVehicleType.fulfilled, (state, action) => {
      state.loading.updateProductVehicleType = false;
      const updated = action.payload;
      const idx = state.vehicles.findIndex((v) => v._id === updated._id);
      if (idx !== -1) state.vehicles[idx] = updated;
    })
    .addCase(updateProductVehicleType.rejected, (state, action) => {
      state.loading.updateProductVehicleType = false;
      state.error.updateProductVehicleType =
        (action.payload as string) ?? "Failed to update vehicle-type.";
    });

    // DELETE VEHICLE-TYPE
    builder
      .addCase(deleteProductVehicleType.pending, (state) => {
        state.loading.vehicles = true;
        state.error.vehicles = null;
      })
      .addCase(deleteProductVehicleType.fulfilled, (state, action) => {
        state.loading.vehicles = false;
        const id = action.payload;
        state.vehicles = state.vehicles.filter((v) => v._id !== id);
      })
      .addCase(deleteProductVehicleType.rejected, (state, action) => {
        state.loading.vehicles = false;
        state.error.vehicles =
          (action.payload as string) ?? "Failed to delete vehicle-type.";
      });
  },
});

export const { clearDashboardErrors, refreshDashboard, updateMetric } =
  adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
